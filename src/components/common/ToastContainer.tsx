import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { removeToast } from '../../store/uiSlice';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(state => state.ui.toasts);

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      dispatch(removeToast(toasts[0].id));
    }, 4500);
    return () => clearTimeout(timer);
  }, [toasts, dispatch]);

  if (toasts.length === 0) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      role="region"
      aria-label="System notifications"
    >
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-200 ${
              isSuccess 
                ? 'bg-emerald-950/90 text-emerald-100 border-emerald-700' 
                : isError 
                ? 'bg-rose-950/90 text-rose-100 border-rose-700' 
                : isWarning 
                ? 'bg-amber-950/90 text-amber-100 border-amber-700' 
                : 'bg-slate-900/90 text-slate-100 border-slate-700'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" aria-hidden="true" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" aria-hidden="true" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" aria-hidden="true" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-400" aria-hidden="true" />}
            </div>

            <div className="flex-1 text-xs">
              <h5 className="font-bold text-sm leading-tight text-white">{toast.title}</h5>
              {toast.message && <p className="mt-0.5 opacity-90">{toast.message}</p>}
            </div>

            <button
              type="button"
              onClick={() => dispatch(removeToast(toast.id))}
              aria-label="Dismiss notification"
              className="shrink-0 p-1 rounded hover:bg-white/10 text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
