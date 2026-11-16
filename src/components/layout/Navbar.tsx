import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { 
  toggleTheme, 
  toggleHighContrast, 
  toggleWireframeMode, 
  setUserRole, 
  setActiveHub,
  UserRole 
} from '../../store/uiSlice';
import { MUMBAI_HUBS } from '../../data/seedShipments';
import { 
  Truck, 
  Sun, 
  Moon, 
  Eye, 
  Grid3X3, 
  Menu, 
  X, 
  PlusCircle, 
  LayoutDashboard, 
  Sliders, 
  User, 
  Building2,
  WifiOff
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { theme, highContrast, wireframeMode, userRole, activeHub, offlineStatus } = useAppSelector(state => state.ui);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { to: '/', label: 'Quick Track', icon: Truck },
    { to: '/shipments', label: 'Consignments', icon: LayoutDashboard },
    { to: '/book', label: 'Book Dispatch', icon: PlusCircle },
    { to: '/admin', label: 'Hub Operations', icon: Sliders },
    { to: '/profile', label: 'Preferences', icon: User },
    { to: '/wireframes', label: 'Wireframes', icon: Grid3X3 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {offlineStatus && (
        <div 
          role="status" 
          aria-live="polite" 
          className="bg-amber-500 text-slate-950 font-semibold text-xs py-1 px-4 text-center flex items-center justify-center gap-1.5"
        >
          <WifiOff className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Offline Mode Active — Running from local PWA cache. New entries will sync when reconnected.</span>
        </div>
      )}

      {/* Top Banner & Quick Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg p-1"
              aria-label="Mumbai Express Freight Home"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                <Truck className="w-5 h-5 text-slate-950" aria-hidden="true" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block leading-none">
                  MUMBAI EXPRESS
                </span>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mt-0.5">
                  Freight &amp; e-POD
                </span>
              </div>
            </Link>

            {/* Active Hub Pill (Desktop) */}
            <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-700/80 text-xs">
              <Building2 className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
              <label htmlFor="navbar-hub-select" className="sr-only">Select Logistics Hub</label>
              <select
                id="navbar-hub-select"
                value={activeHub}
                onChange={(e) => dispatch(setActiveHub(e.target.value))}
                className="bg-slate-800 text-slate-200 border border-slate-700 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-amber-400"
              >
                {MUMBAI_HUBS.map(hub => (
                  <option key={hub} value={hub}>{hub}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map(link => {
              const active = isActive(link.to);
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors focus:ring-2 focus:ring-amber-400 ${
                    active 
                      ? 'bg-amber-500 text-slate-950 shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Utility Toolbar: Accessibility, Theme, Wireframe toggle */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Wireframe Blueprint Mode Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleWireframeMode())}
              aria-pressed={wireframeMode}
              title="Toggle Wireframe Blueprint Overlay Mode"
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                wireframeMode 
                  ? 'bg-cyan-600 text-white ring-2 ring-cyan-300' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Grid3X3 className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only text-[11px]">Wireframe</span>
            </button>

            {/* High Contrast Mode Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleHighContrast())}
              aria-pressed={highContrast}
              title="Toggle High Contrast Mode (WCAG AAA)"
              className={`p-2 rounded-lg transition-colors ${
                highContrast 
                  ? 'bg-white text-slate-950 font-bold' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">High Contrast</span>
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {/* Role Switcher Pill */}
            <div className="text-[11px] bg-slate-800 px-2 py-1 rounded border border-slate-700 flex items-center gap-1">
              <span className="text-slate-400">Role:</span>
              <select
                aria-label="User role switcher"
                value={userRole}
                onChange={(e) => dispatch(setUserRole(e.target.value as UserRole))}
                className="bg-transparent text-amber-400 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="hub_manager" className="bg-slate-900 text-white">Hub Manager</option>
                <option value="shipper" className="bg-slate-900 text-white">Shipper</option>
                <option value="driver" className="bg-slate-900 text-white">Fleet Driver</option>
              </select>
            </div>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <div className="flex sm:hidden items-center gap-1">
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-slate-400 hover:text-white"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:ring-2 focus:ring-amber-400"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-900 px-4 pt-2 pb-5 space-y-2">
          <nav aria-label="Mobile Navigation" className="space-y-1">
            {navLinks.map(link => {
              const active = isActive(link.to);
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    active 
                      ? 'bg-amber-500 text-slate-950 font-bold' 
                      : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Active Hub:</span>
              <select
                value={activeHub}
                onChange={(e) => dispatch(setActiveHub(e.target.value))}
                className="bg-slate-800 text-white rounded p-1 text-xs"
              >
                {MUMBAI_HUBS.map(hub => (
                  <option key={hub} value={hub}>{hub}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => dispatch(toggleWireframeMode())}
                className="text-xs px-2.5 py-1.5 rounded bg-slate-800 text-slate-200 flex items-center gap-1.5"
              >
                <Grid3X3 className="w-3.5 h-3.5" />
                <span>Blueprint: {wireframeMode ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => dispatch(toggleHighContrast())}
                className="text-xs px-2.5 py-1.5 rounded bg-slate-800 text-slate-200 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>High Contrast</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
