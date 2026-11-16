import { Shipment, ProofOfDelivery, ShipmentStatus } from '../types/logistics';
import { SEED_SHIPMENTS } from '../data/seedShipments';

const STORAGE_KEY = 'mef_shipments_v1';
const LATENCY_MS = 350;

function getStoredShipments(): Shipment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SHIPMENTS));
      return SEED_SHIPMENTS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_SHIPMENTS;
  }
}

function saveShipments(shipments: Shipment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
  } catch (err) {
    console.error('Failed to save shipments to storage:', err);
  }
}

// Simulates network latency
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getShipments(options?: { simulateError?: boolean }): Promise<Shipment[]> {
    await sleep(LATENCY_MS);
    if (options?.simulateError) {
      throw new Error("503 Service Unavailable: Unable to connect to Mumbai Freight Gateway. Please retry.");
    }
    return getStoredShipments();
  },

  async getShipmentById(id: string): Promise<Shipment | null> {
    await sleep(LATENCY_MS);
    const shipments = getStoredShipments();
    const cleanId = id.trim().toUpperCase();
    const found = shipments.find(s => 
      s.id.toUpperCase() === cleanId || 
      s.lrNumber.toUpperCase() === cleanId || 
      s.ewayBillNumber === cleanId
    );
    return found || null;
  },

  async createShipment(newShipment: Omit<Shipment, 'id' | 'lrNumber' | 'createdAt' | 'status' | 'checkpoints'>): Promise<Shipment> {
    await sleep(LATENCY_MS);
    const shipments = getStoredShipments();
    const nextSeq = shipments.length + 1;
    const padded = String(nextSeq).padStart(5, '0');
    
    // Determine hub code
    const hubPrefix = newShipment.originHub.includes('Bhiwandi') ? 'BHW' 
      : newShipment.originHub.includes('JNPT') ? 'JNP'
      : newShipment.originHub.includes('Vashi') ? 'VAS'
      : 'BOM';

    const shipmentId = `MFX-2026-${hubPrefix}-${padded}`;
    const lrNumber = `LR-MH-${Math.floor(10000 + Math.random() * 90000)}`;

    const initialCheckpoint = {
      id: `cp-${Date.now()}`,
      name: `${newShipment.originHub} Terminal`,
      location: newShipment.originHub,
      timestamp: new Date().toISOString(),
      status: 'current' as const,
      remarks: 'Consignment booked and dock inward slot allotted',
      lat: 19.2968,
      lng: 73.0631
    };

    const fullShipment: Shipment = {
      ...newShipment,
      id: shipmentId,
      lrNumber,
      createdAt: new Date().toISOString(),
      status: 'Booked',
      currentLocation: newShipment.originHub,
      checkpoints: [initialCheckpoint]
    };

    const updated = [fullShipment, ...shipments];
    saveShipments(updated);
    return fullShipment;
  },

  async updateStatus(
    id: string, 
    status: ShipmentStatus, 
    location: string, 
    remarks?: string
  ): Promise<Shipment> {
    await sleep(LATENCY_MS);
    const shipments = getStoredShipments();
    const index = shipments.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Shipment ${id} not found.`);
    }

    const current = shipments[index];
    const newCheckpoint = {
      id: `cp-${Date.now()}`,
      name: location,
      location,
      timestamp: new Date().toISOString(),
      status: 'current' as const,
      remarks: remarks || `Status transitioned to ${status}`,
      lat: 19.0760,
      lng: 72.8777
    };

    // Mark previous current checkpoints as completed
    const updatedCheckpoints = current.checkpoints.map(cp => 
      cp.status === 'current' ? { ...cp, status: 'completed' as const } : cp
    );
    updatedCheckpoints.push(newCheckpoint);

    const updatedShipment: Shipment = {
      ...current,
      status,
      currentLocation: location,
      checkpoints: updatedCheckpoints,
      delayReason: status === 'Delayed' ? (remarks || 'Traffic congestion') : undefined
    };

    shipments[index] = updatedShipment;
    saveShipments(shipments);
    return updatedShipment;
  },

  async submitPOD(id: string, pod: ProofOfDelivery): Promise<Shipment> {
    await sleep(LATENCY_MS);
    const shipments = getStoredShipments();
    const index = shipments.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Shipment ${id} not found.`);
    }

    const current = shipments[index];
    const updatedCheckpoints = current.checkpoints.map(cp => ({
      ...cp,
      status: 'completed' as const
    }));

    updatedCheckpoints.push({
      id: `cp-${Date.now()}`,
      name: "Consignee Delivery Bay",
      location: current.consignee.address + ", " + current.consignee.city,
      timestamp: pod.deliveredAt,
      status: 'completed',
      remarks: `Delivered to ${pod.receivedBy} (${pod.relation}). POD verified.`,
      lat: 19.1197,
      lng: 72.8697
    });

    const updatedShipment: Shipment = {
      ...current,
      status: 'Delivered',
      actualDelivery: pod.deliveredAt,
      currentLocation: `Delivered - ${current.consignee.city}`,
      checkpoints: updatedCheckpoints,
      pod
    };

    shipments[index] = updatedShipment;
    saveShipments(shipments);
    return updatedShipment;
  },

  resetData(): void {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_SHIPMENTS));
  }
};
