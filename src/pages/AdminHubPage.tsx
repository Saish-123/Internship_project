import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { updateShipmentStatus } from '../store/shipmentsSlice';
import { addToast } from '../store/uiSlice';
import { ShipmentStatus } from '../types/logistics';
import { 
  Sliders, 
  Warehouse, 
  Truck, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Building2, 
  Send,
  Zap,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

interface DockBay {
  bayNumber: number;
  status: 'Occupied' | 'Available' | 'Maintenance';
  truckNumber?: string;
  driverName?: string;
  cargoType?: string;
  destination?: string;
  dockedAt?: string;
}

const initialDocks: DockBay[] = [
  {
    bayNumber: 1,
    status: 'Occupied',
    truckNumber: 'MH-04-GP-8291',
    driverName: 'Tukaram More',
    cargoType: 'Automotive Precision Parts',
    destination: 'Pune Chakan Hub',
    dockedAt: '10:45 AM'
  },
  {
    bayNumber: 2,
    status: 'Occupied',
    truckNumber: 'MH-46-AR-4019',
    driverName: 'Balwant Singh',
    cargoType: 'Over-Dimensional Transformer',
    destination: 'Taloja Industrial',
    dockedAt: '11:15 AM'
  },
  {
    bayNumber: 3,
    status: 'Available'
  },
  {
    bayNumber: 4,
    status: 'Occupied',
    truckNumber: 'MH-03-CP-9102',
    driverName: 'Ramesh Sawant',
    cargoType: 'Agro Alphonso Pulp',
    destination: 'Andheri MIDC',
    dockedAt: '01:20 PM'
  },
  {
    bayNumber: 5,
    status: 'Available'
  },
  {
    bayNumber: 6,
    status: 'Maintenance'
  }
];

export const AdminHubPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.shipments);
  const { activeHub } = useAppSelector(state => state.ui);

  const [docks, setDocks] = useState<DockBay[]>(initialDocks);
  const [selectedShipmentId, setSelectedShipmentId] = useState<string>(items[0]?.id || '');
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('In Transit');
  const [checkpointLocation, setCheckpointLocation] = useState('Majiwada Flyover Junction, Thane');
  const [checkpointRemarks, setCheckpointRemarks] = useState('Cleared Fastag toll lane. Proceeding towards destination.');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusTransition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipmentId) return;

    setIsUpdating(true);
    try {
      await dispatch(updateShipmentStatus({
        id: selectedShipmentId,
        status: newStatus,
        location: checkpointLocation.trim(),
        remarks: checkpointRemarks.trim() || undefined
      })).unwrap();

      dispatch(addToast({
        type: 'success',
        title: 'Status Updated Live',
        message: `Consignment ${selectedShipmentId} updated to "${newStatus}" at ${checkpointLocation}.`
      }));
    } catch {
      dispatch(addToast({
        type: 'error',
        title: 'Update Failed',
        message: 'Could not transition shipment status.'
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReleaseBay = (bayNumber: number) => {
    setDocks(prev => prev.map(d => d.bayNumber === bayNumber ? { bayNumber, status: 'Available' } : d));
    dispatch(addToast({
      type: 'info',
      title: 'Loading Dock Released',
      message: `Bay ${bayNumber} is now marked Available for inward haulers.`
    }));
  };

  const handleAllotBay = (bayNumber: number) => {
    setDocks(prev => prev.map(d => d.bayNumber === bayNumber ? {
      bayNumber,
      status: 'Occupied',
      truckNumber: `MH-04-TR-${Math.floor(1000 + Math.random() * 9000)}`,
      driverName: 'Assigned Driver',
      cargoType: 'Consolidated General Cargo',
      destination: 'Vashi APMC',
      dockedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : d));
    dispatch(addToast({
      type: 'success',
      title: 'Bay Allotted',
      message: `Bay ${bayNumber} allotted to incoming linehaul truck.`
    }));
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Warehouse className="w-7 h-7 text-amber-500" aria-hidden="true" />
            <span>Hub Manager Operations Console</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time yard management, loading bay allocation &amp; manifest reconciliation at <strong className="text-slate-800 dark:text-slate-200">{activeHub}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
            Yard Telemetry: Synchronized
          </span>
        </div>
      </div>

      {/* Yard Throughput KPIs */}
      <section aria-label="Yard performance metrics">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Active Dock Utilization
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {docks.filter(d => d.status === 'Occupied').length} / {docks.length} Bays
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
              2 Bays ready for immediate docking
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Avg Turnaround Time
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              38 Mins
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Weighbridge to gate-out exit
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Inward Freight Today
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              840 Tonnes
            </div>
            <div className="text-[11px] text-amber-600 dark:text-amber-400 mt-1 font-medium">
              18 Trailers processed
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Security Inspection
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              100%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              E-Way bills verified via RFID
            </div>
          </div>
        </div>
      </section>

      {/* Loading Dock Bay Allocation Matrix */}
      <section 
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
        aria-labelledby="dock-matrix-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 id="dock-matrix-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-500" aria-hidden="true" />
              <span>Loading Bay &amp; Unloading Dock Allocation</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time bay occupancy for Bhiwandi Mankoli Terminal Gate
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500">
            Bays 1-6 High-Deck Ramps
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {docks.map(dock => {
            const isOccupied = dock.status === 'Occupied';
            const isAvailable = dock.status === 'Available';

            return (
              <div 
                key={dock.bayNumber}
                className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                  isOccupied
                    ? 'border-amber-300 dark:border-amber-800/60 bg-amber-50/40 dark:bg-amber-950/20'
                    : isAvailable
                    ? 'border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    Bay #{dock.bayNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    isOccupied 
                      ? 'bg-amber-200 text-amber-900 dark:bg-amber-900 dark:text-amber-100' 
                      : isAvailable 
                      ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900 dark:text-emerald-100' 
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    {dock.status}
                  </span>
                </div>

                {isOccupied ? (
                  <div className="space-y-1 text-xs">
                    <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {dock.truckNumber} ({dock.driverName})
                    </div>
                    <div className="text-slate-600 dark:text-slate-400 text-[11px] truncate">
                      Cargo: {dock.cargoType}
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Dest: {dock.destination} &bull; Docked: {dock.dockedAt}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 py-3">
                    Bay empty and ready for incoming trailer docking.
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                  {isOccupied ? (
                    <button
                      type="button"
                      onClick={() => handleReleaseBay(dock.bayNumber)}
                      className="w-full py-1.5 px-3 rounded text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                      Release Bay &amp; Print Gate Pass
                    </button>
                  ) : isAvailable ? (
                    <button
                      type="button"
                      onClick={() => handleAllotBay(dock.bayNumber)}
                      className="w-full py-1.5 px-3 rounded text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      Allot Incoming Truck
                    </button>
                  ) : (
                    <span className="text-[11px] text-slate-400 italic">Scheduled Maintenance</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Live Consignment Status Transition Tool */}
      <section 
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
        aria-labelledby="transition-heading"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Sliders className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <h2 id="transition-heading" className="text-base font-bold text-slate-900 dark:text-white">
            Live Checkpoint &amp; Consignment Status Dispatcher
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Simulate a real-time status update or GPS toll checkpoint scan for any active consignment in the system.
        </p>

        <form onSubmit={handleStatusTransition} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label htmlFor="shipment-selector" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Active Consignment
            </label>
            <select
              id="shipment-selector"
              value={selectedShipmentId}
              onChange={(e) => setSelectedShipmentId(e.target.value)}
              className="w-full text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
            >
              {items.map(s => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.status} ({s.cargo.goodsType.slice(0, 30)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="new-status" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Transition Status To:
            </label>
            <select
              id="new-status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
            >
              <option value="In Transit">In Transit</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delayed">Delayed (Exception)</option>
              <option value="Inwarded at Hub">Inwarded at Hub</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <label htmlFor="checkpoint-location" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Checkpoint Location / Toll Plaza
            </label>
            <input
              id="checkpoint-location"
              type="text"
              required
              value={checkpointLocation}
              onChange={(e) => setCheckpointLocation(e.target.value)}
              placeholder="e.g. Khalapur Toll Plaza, Expressway"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="checkpoint-remarks" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Dispatcher Remarks / Delay Advisory
            </label>
            <input
              id="checkpoint-remarks"
              type="text"
              value={checkpointRemarks}
              onChange={(e) => setCheckpointRemarks(e.target.value)}
              placeholder="e.g. Weighbridge cleared, proceeding to Pune dock"
              className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 text-slate-900 dark:text-white"
            />
          </div>

          <div className="sm:col-span-2 pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{isUpdating ? 'Broadcasting Update...' : 'Broadcast Real-time Checkpoint Update'}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
