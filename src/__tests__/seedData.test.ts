import { describe, it, expect } from 'vitest';
import { SEED_SHIPMENTS, MUMBAI_HUBS } from '../data/seedShipments';

describe('Seed Data Quality & Edge Case Coverage', () => {
  it('contains at least 6 shipments across diverse statuses', () => {
    expect(SEED_SHIPMENTS.length).toBeGreaterThanOrEqual(6);
    const statuses = new Set(SEED_SHIPMENTS.map(s => s.status));
    expect(statuses.size).toBeGreaterThanOrEqual(5);
  });

  it('has all 7 Mumbai hubs defined', () => {
    expect(MUMBAI_HUBS.length).toBe(7);
    expect(MUMBAI_HUBS).toContain('Bhiwandi Central SuperHub');
    expect(MUMBAI_HUBS).toContain('JNPT Port Container Terminal CFS');
  });

  it('includes edge case: very long company names exceeding 80 chars', () => {
    const longNames = SEED_SHIPMENTS.filter(
      s => s.consignor.companyName.length > 80 || s.consignee.companyName.length > 80
    );
    expect(longNames.length).toBeGreaterThanOrEqual(1);
  });

  it('includes edge case: missing driver avatar URL', () => {
    const missingAvatars = SEED_SHIPMENTS.filter(s => !s.driver.avatarUrl);
    expect(missingAvatars.length).toBeGreaterThanOrEqual(1);
  });

  it('includes a fully delivered shipment with complete POD', () => {
    const delivered = SEED_SHIPMENTS.filter(s => s.status === 'Delivered' && s.pod);
    expect(delivered.length).toBeGreaterThanOrEqual(1);
    const pod = delivered[0].pod!;
    expect(pod.receivedBy).toBeTruthy();
    expect(pod.otpVerified).toBe(true);
    expect(pod.biltyStamped).toBe(true);
  });

  it('includes a delayed shipment with a delay reason', () => {
    const delayed = SEED_SHIPMENTS.filter(s => s.status === 'Delayed' && s.delayReason);
    expect(delayed.length).toBeGreaterThanOrEqual(1);
  });

  it('all shipments have valid GSTIN formats', () => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9A-Z]{1}Z[0-9A-Z]{1}$/;
    SEED_SHIPMENTS.forEach(s => {
      expect(s.consignor.gstin).toMatch(gstinRegex);
      expect(s.consignee.gstin).toMatch(gstinRegex);
    });
  });

  it('all shipments have at least one checkpoint', () => {
    SEED_SHIPMENTS.forEach(s => {
      expect(s.checkpoints.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('all shipments have positive freight amounts', () => {
    SEED_SHIPMENTS.forEach(s => {
      expect(s.freightAmountInr).toBeGreaterThan(0);
      expect(s.gstAmountInr).toBeGreaterThan(0);
    });
  });

  it('each shipment has a unique ID and LR number', () => {
    const ids = SEED_SHIPMENTS.map(s => s.id);
    const lrs = SEED_SHIPMENTS.map(s => s.lrNumber);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(lrs).size).toBe(lrs.length);
  });
});
