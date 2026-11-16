import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Shipment, ShipmentFilters, SortField, SortOrder, PaginationState, ProofOfDelivery, ShipmentStatus } from '../types/logistics';
import { mockApi } from '../services/mockApi';

export interface ShipmentsState {
  items: Shipment[];
  selectedShipment: Shipment | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: ShipmentFilters;
  sort: {
    field: SortField;
    order: SortOrder;
  };
  pagination: PaginationState;
  errorSimulationMode: boolean;
}

const initialFilters: ShipmentFilters = {
  searchQuery: '',
  status: 'All',
  originHub: 'All',
  destinationHub: 'All',
  priority: 'All',
  dateRange: 'all',
};

const initialState: ShipmentsState = {
  items: [],
  selectedShipment: null,
  status: 'idle',
  error: null,
  filters: initialFilters,
  sort: {
    field: 'createdAt',
    order: 'desc',
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
  errorSimulationMode: false,
};

export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { shipments: ShipmentsState };
      const data = await mockApi.getShipments({
        simulateError: state.shipments.errorSimulationMode,
      });
      return data;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch shipments';
      return rejectWithValue(msg);
    }
  }
);

export const fetchShipmentById = createAsyncThunk(
  'shipments/fetchShipmentById',
  async (id: string, { rejectWithValue }) => {
    try {
      const shipment = await mockApi.getShipmentById(id);
      if (!shipment) {
        return rejectWithValue(`Shipment ${id} not found.`);
      }
      return shipment;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error fetching shipment details';
      return rejectWithValue(msg);
    }
  }
);

export const createNewShipment = createAsyncThunk(
  'shipments/createNewShipment',
  async (
    payload: Omit<Shipment, 'id' | 'lrNumber' | 'createdAt' | 'status' | 'checkpoints'>,
    { rejectWithValue }
  ) => {
    try {
      const created = await mockApi.createShipment(payload);
      return created;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to book shipment';
      return rejectWithValue(msg);
    }
  }
);

export const submitProofOfDelivery = createAsyncThunk(
  'shipments/submitProofOfDelivery',
  async (
    { id, pod }: { id: string; pod: ProofOfDelivery },
    { rejectWithValue }
  ) => {
    try {
      const updated = await mockApi.submitPOD(id, pod);
      return updated;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to record Proof of Delivery';
      return rejectWithValue(msg);
    }
  }
);

export const updateShipmentStatus = createAsyncThunk(
  'shipments/updateShipmentStatus',
  async (
    { id, status, location, remarks }: { id: string; status: ShipmentStatus; location: string; remarks?: string },
    { rejectWithValue }
  ) => {
    try {
      const updated = await mockApi.updateStatus(id, status, location, remarks);
      return updated;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update status';
      return rejectWithValue(msg);
    }
  }
);

export const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.filters.searchQuery = action.payload;
      state.pagination.currentPage = 1;
    },
    setStatusFilter: (state, action: PayloadAction<ShipmentStatus | 'All'>) => {
      state.filters.status = action.payload;
      state.pagination.currentPage = 1;
    },
    setOriginFilter: (state, action: PayloadAction<string>) => {
      state.filters.originHub = action.payload;
      state.pagination.currentPage = 1;
    },
    setDestinationFilter: (state, action: PayloadAction<string>) => {
      state.filters.destinationHub = action.payload;
      state.pagination.currentPage = 1;
    },
    setPriorityFilter: (state, action: PayloadAction<ShipmentFilters['priority']>) => {
      state.filters.priority = action.payload;
      state.pagination.currentPage = 1;
    },
    setDateRangeFilter: (state, action: PayloadAction<ShipmentFilters['dateRange']>) => {
      state.filters.dateRange = action.payload;
      state.pagination.currentPage = 1;
    },
    resetFilters: (state) => {
      state.filters = initialFilters;
      state.pagination.currentPage = 1;
    },
    setSortField: (state, action: PayloadAction<SortField>) => {
      if (state.sort.field === action.payload) {
        state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.field = action.payload;
        state.sort.order = 'desc';
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
    },
    toggleErrorSimulation: (state) => {
      state.errorSimulationMode = !state.errorSimulationMode;
    },
    clearSelectedShipment: (state) => {
      state.selectedShipment = null;
    },
    resetAllData: (state) => {
      mockApi.resetData();
      state.filters = initialFilters;
      state.pagination.currentPage = 1;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchShipments
      .addCase(fetchShipments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load shipments';
      })

      // fetchShipmentById
      .addCase(fetchShipmentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchShipmentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedShipment = action.payload;
      })
      .addCase(fetchShipmentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Failed to load shipment details';
      })

      // createNewShipment
      .addCase(createNewShipment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.selectedShipment = action.payload;
      })

      // submitProofOfDelivery
      .addCase(submitProofOfDelivery.fulfilled, (state, action) => {
        const index = state.items.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedShipment?.id === action.payload.id) {
          state.selectedShipment = action.payload;
        }
      })

      // updateShipmentStatus
      .addCase(updateShipmentStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        if (state.selectedShipment?.id === action.payload.id) {
          state.selectedShipment = action.payload;
        }
      });
  },
});

export const {
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
  resetAllData,
} = shipmentsSlice.actions;

export default shipmentsSlice.reducer;
