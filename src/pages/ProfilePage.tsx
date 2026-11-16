import React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { 
  toggleTheme, 
  toggleHighContrast, 
  toggleWireframeMode, 
  setUserRole, 
  setActiveHub, 
  addToast,
  UserRole 
} from '../store/uiSlice';
import { resetAllData, fetchShipments } from '../store/shipmentsSlice';
import { MUMBAI_HUBS } from '../data/seedShipments';
import { 
  User, 
  Building2, 
  Eye, 
  Sun, 
  Moon, 
  Grid3X3, 
  Database, 
  Wifi, 
  ShieldCheck, 
  Key, 
  RotateCcw,
  Smartphone
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme, highContrast, wireframeMode, userRole, activeHub, offlineStatus } = useAppSelector(state => state.ui);
  const { items } = useAppSelector(state => state.shipments);

  const handleReset = () => {
    dispatch(resetAllData());
    dispatch(fetchShipments());
    dispatch(addToast({
      type: 'info',
      title: 'Demo Data Restored',
      message: 'Restored original Mumbai Metropolitan Region seed consignments.'
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Operator Profile &amp; Hub Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage operational roles, assigned warehouse hubs, accessibility preferences, and offline caching.
        </p>
      </div>

      {/* User Identity Card */}
      <section 
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        aria-labelledby="user-info-heading"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
            RD
          </div>
          <div>
            <h2 id="user-info-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              Rajesh Digambar Deshmukh
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Senior Logistics &amp; Yard Operations Manager &bull; Bhiwandi Node
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200 uppercase">
                {userRole.replace('_', ' ')}
              </span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GST Verified</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Role Switcher */}
        <div className="w-full sm:w-auto bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <label htmlFor="role-select" className="block text-slate-500 font-semibold mb-1">
            Simulate Persona / Role:
          </label>
          <select
            id="role-select"
            value={userRole}
            onChange={(e) => {
              dispatch(setUserRole(e.target.value as UserRole));
              dispatch(addToast({
                type: 'info',
                title: 'Role Switched',
                message: `Active persona changed to ${e.target.value}.`
              }));
            }}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-3 py-1.5 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500"
          >
            <option value="hub_manager">Hub Manager (Bhiwandi / JNPT)</option>
            <option value="shipper">Commercial Shipper / Consignor</option>
            <option value="driver">Commercial Fleet Driver</option>
          </select>
        </div>
      </section>

      {/* Hub Operations Preference */}
      <section 
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
        aria-labelledby="hub-heading"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Building2 className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <h2 id="hub-heading" className="text-base font-bold text-slate-900 dark:text-white">
            Assigned Logistics Hub Corridor
          </h2>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400">
          Your default terminal determines quick consignment filtering, dock bay notifications, and weighbridge telemetry.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {MUMBAI_HUBS.map(hub => {
            const isSelected = activeHub === hub;
            return (
              <button
                key={hub}
                type="button"
                onClick={() => dispatch(setActiveHub(hub))}
                className={`p-3.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/60 dark:bg-amber-950/20 text-slate-900 dark:text-white shadow-sm ring-1 ring-amber-500'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{hub}</span>
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* Accessibility & Display Preferences */}
      <section 
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5"
        aria-labelledby="accessibility-heading"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Eye className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <h2 id="accessibility-heading" className="text-base font-bold text-slate-900 dark:text-white">
            Accessibility &amp; Display (WCAG 2.1 AA/AAA)
          </h2>
        </div>

        <div className="space-y-4">
          {/* High contrast mode */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                High Contrast Display Mode
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enhances border contrast to 7:1 for maximum outdoor sunlight legibility in logistics yards.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(toggleHighContrast())}
              aria-pressed={highContrast}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                highContrast 
                  ? 'bg-slate-950 text-white border-white dark:bg-white dark:text-slate-950' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              {highContrast ? 'Enabled (AAA)' : 'Disabled'}
            </button>
          </div>

          {/* Theme mode */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Color Theme
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch between Light mode and Dark Slate mode for night driving and dock operations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              className="px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
            >
              {theme === 'dark' ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </button>
          </div>

          {/* Wireframe blueprint toggle */}
          <div className="flex items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Wireframe Blueprint Mode
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Displays structural wireframe guides and component blueprints across all screens.
              </p>
            </div>
            <button
              type="button"
              onClick={() => dispatch(toggleWireframeMode())}
              aria-pressed={wireframeMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                wireframeMode 
                  ? 'bg-cyan-600 text-white border-cyan-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>{wireframeMode ? 'Blueprint Active' : 'Off'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Offline Storage & PWA Telematics */}
      <section 
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
        aria-labelledby="pwa-heading"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Wifi className="w-5 h-5 text-amber-500" aria-hidden="true" />
          <h2 id="pwa-heading" className="text-base font-bold text-slate-900 dark:text-white">
            Progressive Web App (PWA) &amp; Offline Cache
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-semibold">Service Worker:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>v1.0.0 Active (sw.js)</span>
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-semibold">Cached Consignments:</span>
            <span className="font-bold text-slate-900 dark:text-white mt-0.5 block font-mono">
              {items.length} Shipments saved locally
            </span>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
            <span className="text-slate-400 block font-semibold">Network State:</span>
            <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
              {offlineStatus ? 'Offline (PWA Cache)' : 'Online (Gigabit Fiber / 5G)'}
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Demo Seed Data to Factory Default</span>
          </button>
        </div>
      </section>
    </div>
  );
};
