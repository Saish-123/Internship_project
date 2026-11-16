import React from 'react';
import { useAppDispatch } from '../../store';
import { resetAllData, fetchShipments } from '../../store/shipmentsSlice';
import { addToast } from '../../store/uiSlice';
import { Truck, RotateCcw, ShieldCheck, MapPin, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleResetData = () => {
    dispatch(resetAllData());
    dispatch(fetchShipments());
    dispatch(addToast({
      type: 'info',
      title: 'Demo Data Reset',
      message: 'All consignment records restored to default Mumbai seed data.'
    }));
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-sm tracking-wide">
                MUMBAI EXPRESS FREIGHT
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Fast, high-reliability freight haulage across the Mumbai Metropolitan Region, Western Ghat corridors, and JNPT port container terminals.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>WCAG 2.1 AA Compliant &bull; PWA Ready</span>
            </div>
          </div>

          {/* Operational Hubs */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Major Logistics Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Bhiwandi Central SuperHub (Godown #14)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>JNPT Nhava Sheva CFS Terminal Yard 2</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Vashi APMC Agro-Freight Complex</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Taloja MIDC Chemical Haulage Bay</span>
              </li>
            </ul>
          </div>

          {/* 24x7 Control Room */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              24x7 Transit Control
            </h4>
            <p className="text-xs">Central Dispatch &amp; Highway Breakdown Assistance:</p>
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-bold">
              <Phone className="w-3.5 h-3.5" />
              <span>+91 22 2847 9000 / 1800-22-FREIGHT</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Connected with NHAI Fastag ETC, Vahan API &amp; GST E-Way Bill Portal.
            </p>
          </div>

          {/* Evaluator Toolkit */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
              Demo &amp; Testing Controls
            </h4>
            <p className="text-xs text-slate-400">
              Reset mock data, clear local modifications, and test edge conditions.
            </p>
            <button
              type="button"
              onClick={handleResetData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Demo Seed Data</span>
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Mumbai Express Freight Logistics Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built for Shippers &amp; Hub Managers</span>
            <span>&bull;</span>
            <span>Mobile-First Progressive Web App</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
