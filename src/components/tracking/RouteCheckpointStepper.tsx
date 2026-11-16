import React from 'react';
import { RouteCheckpoint, ShipmentStatus } from '../../types/logistics';
import { CheckCircle2, Navigation, Clock, MapPin, AlertCircle } from 'lucide-react';

interface RouteCheckpointStepperProps {
  checkpoints: RouteCheckpoint[];
  status: ShipmentStatus;
  delayReason?: string;
}

export const RouteCheckpointStepper: React.FC<RouteCheckpointStepperProps> = ({
  checkpoints,
  status,
  delayReason,
}) => {
  const completedCount = checkpoints.filter(c => c.status === 'completed').length;
  const progressPercent = Math.min(100, Math.round((completedCount / (checkpoints.length || 1)) * 100));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Navigation className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            <span>Transit Checkpoint Timeline &amp; Geolocation</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time GPS pings synced with Fastag Electronic Toll Collection
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Route Progress:
          </span>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div 
        className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden" 
        role="progressbar" 
        aria-valuenow={progressPercent} 
        aria-valuemin={0} 
        aria-valuemax={100}
        aria-label="Shipment route completion progress"
      >
        <div 
          className={`h-full transition-all duration-500 rounded-full ${
            status === 'Delayed' ? 'bg-amber-500' : status === 'Delivered' ? 'bg-emerald-500' : 'bg-blue-600'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {status === 'Delayed' && delayReason && (
        <div 
          role="alert" 
          className="p-3 bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 rounded-lg flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200"
        >
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <span className="font-bold">Active Transit Advisory: </span>
            {delayReason}
          </div>
        </div>
      )}

      {/* Checkpoints Stepper */}
      <ol 
        className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 space-y-6 py-2"
        aria-label="Route checkpoints timeline"
      >
        {checkpoints.map((cp, idx) => {
          const isCompleted = cp.status === 'completed';
          const isCurrent = cp.status === 'current';
          const isUpcoming = cp.status === 'upcoming';

          return (
            <li key={cp.id || idx} className="ml-6 relative">
              {/* Stepper node circle */}
              <div 
                className={`absolute -left-[35px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 ${
                  isCompleted 
                    ? 'bg-emerald-600 text-white' 
                    : isCurrent 
                    ? 'bg-amber-500 text-white animate-pulse' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}
                aria-hidden="true"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isCurrent ? (
                  <MapPin className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
              </div>

              {/* Checkpoint Details */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h4 className={`text-sm font-bold ${
                    isCurrent 
                      ? 'text-amber-600 dark:text-amber-400' 
                      : isCompleted 
                      ? 'text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {cp.name}
                  </h4>
                  {isCurrent && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
                      Current Location
                    </span>
                  )}
                </div>

                <time 
                  dateTime={cp.timestamp} 
                  className="text-xs font-mono text-slate-500 dark:text-slate-400"
                >
                  {new Date(cp.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, {' '}
                  {new Date(cp.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                </time>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {cp.location}
              </p>

              {cp.remarks && (
                <p className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2 rounded border border-slate-100 dark:border-slate-800/80 mt-1.5 inline-block">
                  {cp.remarks}
                </p>
              )}

              <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1">
                GPS: {cp.lat.toFixed(4)}° N, {cp.lng.toFixed(4)}° E
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
