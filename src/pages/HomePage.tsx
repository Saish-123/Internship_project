import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchShipments } from '../store/shipmentsSlice';
import { StatusBadge, PriorityBadge } from '../components/common/StatusBadge';
import { 
  Search, 
  Truck, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  AlertTriangle, 
  ArrowRight, 
  PlusCircle, 
  Warehouse,
  CheckCircle2,
  Building2
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(state => state.shipments);
  const { activeHub } = useAppSelector(state => state.ui);
  const [trackingInput, setTrackingInput] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchShipments());
    }
  }, [status, dispatch]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trackingInput.trim();
    if (!clean) {
      setSearchError('Please enter a Tracking ID, LR Bilty Number, or E-Way Bill');
      return;
    }

    // Check if shipment exists
    const match = items.find(s => 
      s.id.toUpperCase() === clean.toUpperCase() || 
      s.lrNumber.toUpperCase() === clean.toUpperCase() ||
      s.ewayBillNumber === clean
    );

    if (match) {
      navigate(`/shipments/${match.id}`);
    } else {
      // Navigate to list with search prefilled
      navigate(`/shipments?q=${encodeURIComponent(clean)}`);
    }
  };

  const quickSamples = [
    { label: 'Auto Parts (Pune)', id: 'MFX-2026-BHW-08942' },
    { label: 'Heavy ODC (Uran)', id: 'MFX-2026-JNP-04189' },
    { label: 'Delivered w/ POD', id: 'MFX-2026-VAS-03312' },
    { label: 'Cold Chain (Thane)', id: 'MFX-2026-THN-07102' }
  ];

  // Corridor notices for Mumbai freight routes
  const corridorNotices = [
    {
      corridor: 'Mumbai-Pune Expressway (Ghats)',
      status: 'Normal Flow',
      note: 'Khalapur to Kusgaon clear. Light commercial vehicles smooth via lane 3.',
      severity: 'ok'
    },
    {
      corridor: 'Bhiwandi Mankoli Toll Corridor',
      status: 'Moderate Slowdown',
      note: 'Fastag lane calibration at Padgha toll. 15-min queue for multi-axle trailers.',
      severity: 'warning'
    },
    {
      corridor: 'JNPT Port CFS Gate 2 & Uran Bypass',
      status: 'Heavy Congestion',
      note: 'Export container vessels berthing. Escort required for Over-Dimensional Cargo.',
      severity: 'alert'
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section 
        className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Mumbai Metropolitan Region Freight Network</span>
          </div>

          <h1 id="hero-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Enterprise Freight Haulage &amp; <span className="text-amber-400">Electronic Proof of Delivery</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Fast, accessible tracking for shippers, warehouse dispatchers, and hub managers. Real-time telematics from Bhiwandi and JNPT port to Pune and Nashik industrial corridors.
          </p>

          {/* Quick Tracking Search Box */}
          <form onSubmit={handleTrackSubmit} className="pt-2">
            <div className="bg-white dark:bg-slate-900 p-2 sm:p-2.5 rounded-xl shadow-2xl border-2 border-amber-500/40 flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1 flex items-center">
                <Search className="w-5 h-5 text-slate-400 ml-3 absolute pointer-events-none" aria-hidden="true" />
                <label htmlFor="quick-track-input" className="sr-only">
                  Enter Consignment Tracking Number, LR Bilty Number, or E-Way Bill
                </label>
                <input
                  id="quick-track-input"
                  type="text"
                  value={trackingInput}
                  onChange={(e) => {
                    setTrackingInput(e.target.value);
                    if (searchError) setSearchError('');
                  }}
                  placeholder="Enter Tracking ID (e.g. MFX-2026-BHW-08942) or LR Bilty No..."
                  className="w-full pl-11 pr-4 py-3 text-sm sm:text-base rounded-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-colors focus:ring-2 focus:ring-amber-400"
              >
                <span>Track Consignment</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {searchError && (
              <p role="alert" className="mt-2 text-xs text-rose-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{searchError}</span>
              </p>
            )}

            {/* Quick Sample Queries */}
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Quick Demo Consignments:</span>
              {quickSamples.map(sample => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setTrackingInput(sample.id);
                    navigate(`/shipments/${sample.id}`);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-mono text-[11px] border border-slate-700 transition-colors"
                >
                  {sample.id} ({sample.label})
                </button>
              ))}
            </div>
          </form>
        </div>
      </section>

      {/* KPI Stats Grid */}
      <section aria-label="Fleet operations key indicators">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>Active Fleet on MMR Roads</span>
              <Truck className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              48 Trucks
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>98.6% Fastag GPS reporting</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>Bhiwandi Hub Inward</span>
              <Warehouse className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              1,420 Tonnes
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Daily tonnage processed
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>Delivered with e-POD</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              99.2%
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              Digital signature compliance
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
              <span>Active Assigned Hub</span>
              <Building2 className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-2 truncate" title={activeHub}>
              {activeHub.replace('Bhiwandi Central SuperHub', 'Bhiwandi SuperHub')}
            </div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
              Yard bays 1-6 operational
            </div>
          </div>
        </div>
      </section>

      {/* Corridor Road Condition Bulletins */}
      <section aria-labelledby="corridors-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 id="corridors-heading" className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-500" aria-hidden="true" />
            <span>Mumbai Transit Corridors &amp; Toll Status</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Synced with MSRDC &amp; Traffic Police
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {corridorNotices.map((notice, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                notice.severity === 'alert'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
                  : notice.severity === 'warning'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="text-sm">{notice.corridor}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                  notice.severity === 'alert' ? 'bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100' :
                  notice.severity === 'warning' ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100' :
                  'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100'
                }`}>
                  {notice.status}
                </span>
              </div>
              <p className="opacity-90 leading-relaxed">{notice.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Consignments Section */}
      <section aria-labelledby="recent-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="recent-heading" className="text-lg font-bold text-slate-900 dark:text-white">
              Live Consignment Stream
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Latest shipments dispatched across Mumbai freight hubs
            </p>
          </div>
          <Link
            to="/shipments"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>View All Shipments</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.slice(0, 3).map(shipment => (
            <div
              key={shipment.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                      {shipment.id}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      Bilty: {shipment.lrNumber}
                    </span>
                  </div>
                  <StatusBadge status={shipment.status} size="sm" />
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-1">
                    {shipment.consignor.companyName}
                  </div>
                  <div className="text-slate-500 text-[11px] flex items-center gap-1">
                    <span>{shipment.originHub.split(' ')[0]}</span>
                    <span>&rarr;</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{shipment.destinationHub.split(' ')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 dark:text-slate-400">
                    Cargo: {shipment.cargo.totalWeightKg.toLocaleString()} kg
                  </span>
                  <PriorityBadge priority={shipment.priority} />
                </div>
              </div>

              <div className="pt-4 mt-2">
                <Link
                  to={`/shipments/${shipment.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <span>Track &amp; View POD</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Action CTAs */}
      <section className="bg-amber-50 dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-amber-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Need to Dispatch Goods or Reconcile Hub Manifest?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Book consignments with automated Bilty LR generation, GST e-Way Bill linkage, and immediate driver assignment.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/book"
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Book New Shipment</span>
          </Link>
          <Link
            to="/admin"
            className="px-5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm transition-colors"
          >
            Hub Operations Console
          </Link>
        </div>
      </section>
    </div>
  );
};
