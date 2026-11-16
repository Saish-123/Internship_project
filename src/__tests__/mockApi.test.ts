import { describe, it, expect } from 'vitest';
import { mockApi } from '../services/mockApi';

describe('mockApi service', () => {
  it('getShipments returns an array of shipments', async () => {
    const data = await mockApi.getShipments();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(1);
  });

  it('getShipmentById returns null for non-existent IDs', async () => {
    const result = await mockApi.getShipmentById('NONEXISTENT-ID-99999');
    expect(result).toBeNull();
  });

  it('getShipmentById finds a shipment by its ID (case-insensitive)', async () => {
    const result = await mockApi.getShipmentById('mfx-2026-bhw-08942');
    expect(result).not.toBeNull();
    expect(result!.id).toBe('MFX-2026-BHW-08942');
  });

  it('getShipmentById finds a shipment by LR number', async () => {
    const result = await mockApi.getShipmentById('LR-MH-98124');
    expect(result).not.toBeNull();
    expect(result!.lrNumber).toBe('LR-MH-98124');
  });

  it('getShipments throws when simulateError is true', async () => {
    await expect(mockApi.getShipments({ simulateError: true })).rejects.toThrow('503');
  });
});
