import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'shipper' | 'hub_manager' | 'driver';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
  timestamp: number;
}

export interface UIState {
  theme: 'light' | 'dark';
  highContrast: boolean;
  wireframeMode: boolean;
  userRole: UserRole;
  activeHub: string;
  offlineStatus: boolean;
  sidebarOpen: boolean;
  toasts: ToastMessage[];
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const initialState: UIState = {
  theme: getInitialTheme(),
  highContrast: false,
  wireframeMode: false,
  userRole: 'hub_manager',
  activeHub: 'Bhiwandi Central SuperHub',
  offlineStatus: typeof navigator !== 'undefined' ? !navigator.onLine : false,
  sidebarOpen: false,
  toasts: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof document !== 'undefined') {
        if (state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      if (typeof document !== 'undefined') {
        if (state.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
      if (typeof document !== 'undefined') {
        if (state.highContrast) {
          document.documentElement.classList.add('high-contrast');
        } else {
          document.documentElement.classList.remove('high-contrast');
        }
      }
    },
    toggleWireframeMode: (state) => {
      state.wireframeMode = !state.wireframeMode;
    },
    setUserRole: (state, action: PayloadAction<UserRole>) => {
      state.userRole = action.payload;
    },
    setActiveHub: (state, action: PayloadAction<string>) => {
      state.activeHub = action.payload;
    },
    setOfflineStatus: (state, action: PayloadAction<boolean>) => {
      state.offlineStatus = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    addToast: (state, action: PayloadAction<Omit<ToastMessage, 'id' | 'timestamp'>>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      state.toasts.push({
        ...action.payload,
        id,
        timestamp: Date.now(),
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleHighContrast,
  toggleWireframeMode,
  setUserRole,
  setActiveHub,
  setOfflineStatus,
  setSidebarOpen,
  addToast,
  removeToast,
} = uiSlice.actions;

export default uiSlice.reducer;
