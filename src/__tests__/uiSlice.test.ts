import { describe, it, expect } from 'vitest';
import uiReducer, {
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
  UIState,
} from '../store/uiSlice';

const initialState: UIState = {
  theme: 'light',
  highContrast: false,
  wireframeMode: false,
  userRole: 'hub_manager',
  activeHub: 'Bhiwandi Central SuperHub',
  offlineStatus: false,
  sidebarOpen: false,
  toasts: [],
};

describe('uiSlice reducers', () => {
  it('toggleTheme switches between light and dark', () => {
    const r1 = uiReducer(initialState, toggleTheme());
    expect(r1.theme).toBe('dark');
    const r2 = uiReducer(r1, toggleTheme());
    expect(r2.theme).toBe('light');
  });

  it('setTheme explicitly sets the theme', () => {
    const result = uiReducer(initialState, setTheme('dark'));
    expect(result.theme).toBe('dark');
  });

  it('toggleHighContrast flips the flag', () => {
    const r1 = uiReducer(initialState, toggleHighContrast());
    expect(r1.highContrast).toBe(true);
    const r2 = uiReducer(r1, toggleHighContrast());
    expect(r2.highContrast).toBe(false);
  });

  it('toggleWireframeMode flips the flag', () => {
    const r1 = uiReducer(initialState, toggleWireframeMode());
    expect(r1.wireframeMode).toBe(true);
  });

  it('setUserRole changes the user role', () => {
    const result = uiReducer(initialState, setUserRole('shipper'));
    expect(result.userRole).toBe('shipper');
  });

  it('setActiveHub changes the active hub', () => {
    const result = uiReducer(initialState, setActiveHub('JNPT Port Container Terminal CFS'));
    expect(result.activeHub).toBe('JNPT Port Container Terminal CFS');
  });

  it('setOfflineStatus updates the flag', () => {
    const result = uiReducer(initialState, setOfflineStatus(true));
    expect(result.offlineStatus).toBe(true);
  });

  it('setSidebarOpen controls sidebar state', () => {
    const result = uiReducer(initialState, setSidebarOpen(true));
    expect(result.sidebarOpen).toBe(true);
  });

  it('addToast appends a toast with generated id and timestamp', () => {
    const result = uiReducer(initialState, addToast({
      type: 'success',
      title: 'Shipment Booked',
      message: 'MFX-2026-BHW-00007 created',
    }));
    expect(result.toasts.length).toBe(1);
    expect(result.toasts[0].title).toBe('Shipment Booked');
    expect(result.toasts[0].type).toBe('success');
    expect(result.toasts[0].id).toMatch(/^toast-/);
    expect(result.toasts[0].timestamp).toBeGreaterThan(0);
  });

  it('removeToast removes the correct toast by id', () => {
    const withToast = uiReducer(initialState, addToast({ type: 'info', title: 'Test' }));
    const toastId = withToast.toasts[0].id;
    const result = uiReducer(withToast, removeToast(toastId));
    expect(result.toasts.length).toBe(0);
  });

  it('addToast can stack multiple toasts', () => {
    let state = uiReducer(initialState, addToast({ type: 'success', title: 'First' }));
    state = uiReducer(state, addToast({ type: 'error', title: 'Second' }));
    state = uiReducer(state, addToast({ type: 'warning', title: 'Third' }));
    expect(state.toasts.length).toBe(3);
    expect(state.toasts[0].title).toBe('First');
    expect(state.toasts[2].title).toBe('Third');
  });
});
