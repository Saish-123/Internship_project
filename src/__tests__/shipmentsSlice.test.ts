import { describe, it, expect } from 'vitest';
import shipmentsReducer, {
  setSearchQuery,
  setStatusFilter,
  setOriginFilter,
  setDestinationFilter,
  setPriorityFilter,
  setDateRangeFilter,
  resetFilters,
  setSortField,
  setPage,
  setItemsPerPage,
  toggleErrorSimulation,
  clearSelectedShipment,
  ShipmentsState,
} from '../store/shipmentsSlice';

const initialState: ShipmentsState = {
  items: [],
  selectedShipment: null,
  status: 'idle',
  error: null,
  filters: {
    searchQuery: '',
    status: 'All',
    originHub: 'All',
    destinationHub: 'All',
    priority: 'All',
    dateRange: 'all',
  },
  sort: { field: 'createdAt', order: 'desc' },
  pagination: { currentPage: 1, itemsPerPage: 10 },
  errorSimulationMode: false,
};

describe('shipmentsSlice reducers', () => {
  it('returns the initial state on unknown action', () => {
    const result = shipmentsReducer(undefined, { type: 'UNKNOWN' });
    expect(result.status).toBe('idle');
    expect(result.items).toEqual([]);
    expect(result.filters.status).toBe('All');
  });

  it('setSearchQuery updates the query and resets page', () => {
    const state = { ...initialState, pagination: { currentPage: 3, itemsPerPage: 10 } };
    const result = shipmentsReducer(state, setSearchQuery('MFX-2026'));
    expect(result.filters.searchQuery).toBe('MFX-2026');
    expect(result.pagination.currentPage).toBe(1);
  });

  it('setStatusFilter sets the status and resets page', () => {
    const state = { ...initialState, pagination: { currentPage: 2, itemsPerPage: 10 } };
    const result = shipmentsReducer(state, setStatusFilter('Delayed'));
    expect(result.filters.status).toBe('Delayed');
    expect(result.pagination.currentPage).toBe(1);
  });

  it('setOriginFilter sets origin hub', () => {
    const result = shipmentsReducer(initialState, setOriginFilter('Bhiwandi Central SuperHub'));
    expect(result.filters.originHub).toBe('Bhiwandi Central SuperHub');
  });

  it('setDestinationFilter sets destination hub', () => {
    const result = shipmentsReducer(initialState, setDestinationFilter('Pune Chakan Auto Cluster Link'));
    expect(result.filters.destinationHub).toBe('Pune Chakan Auto Cluster Link');
  });

  it('setPriorityFilter sets priority filter', () => {
    const result = shipmentsReducer(initialState, setPriorityFilter('Express'));
    expect(result.filters.priority).toBe('Express');
  });

  it('setDateRangeFilter sets date range', () => {
    const result = shipmentsReducer(initialState, setDateRangeFilter('today'));
    expect(result.filters.dateRange).toBe('today');
  });

  it('resetFilters resets all filters to initial values', () => {
    const modified = shipmentsReducer(initialState, setSearchQuery('test'));
    const modified2 = shipmentsReducer(modified, setStatusFilter('Delayed'));
    const result = shipmentsReducer(modified2, resetFilters());
    expect(result.filters.searchQuery).toBe('');
    expect(result.filters.status).toBe('All');
    expect(result.filters.originHub).toBe('All');
  });

  it('setSortField toggles sort order when same field, changes field otherwise', () => {
    // Default: createdAt desc
    const r1 = shipmentsReducer(initialState, setSortField('createdAt'));
    expect(r1.sort.field).toBe('createdAt');
    expect(r1.sort.order).toBe('asc'); // toggled from desc

    const r2 = shipmentsReducer(r1, setSortField('createdAt'));
    expect(r2.sort.order).toBe('desc'); // toggled back

    // New field resets to desc
    const r3 = shipmentsReducer(initialState, setSortField('weightKg'));
    expect(r3.sort.field).toBe('weightKg');
    expect(r3.sort.order).toBe('desc');
  });

  it('setPage updates current page', () => {
    const result = shipmentsReducer(initialState, setPage(3));
    expect(result.pagination.currentPage).toBe(3);
  });

  it('setItemsPerPage updates items per page and resets to page 1', () => {
    const state = { ...initialState, pagination: { currentPage: 5, itemsPerPage: 10 } };
    const result = shipmentsReducer(state, setItemsPerPage(20));
    expect(result.pagination.itemsPerPage).toBe(20);
    expect(result.pagination.currentPage).toBe(1);
  });

  it('toggleErrorSimulation toggles the flag', () => {
    const r1 = shipmentsReducer(initialState, toggleErrorSimulation());
    expect(r1.errorSimulationMode).toBe(true);
    const r2 = shipmentsReducer(r1, toggleErrorSimulation());
    expect(r2.errorSimulationMode).toBe(false);
  });

  it('clearSelectedShipment resets selectedShipment to null', () => {
    const state = { ...initialState, selectedShipment: { id: 'test' } as any };
    const result = shipmentsReducer(state, clearSelectedShipment());
    expect(result.selectedShipment).toBeNull();
  });
});
