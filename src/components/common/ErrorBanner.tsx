import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  title = "Connection or Data Fetch Error",
}) => {
  return (
    <div 
      role="alert" 
      aria-live="assertive"
      className="p-5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 my-4 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-rose-100 dark:bg-rose-900/60 rounded-lg text-rose-600 dark:text-rose-400 shrink-0">
            <AlertTriangle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-rose-950 dark:text-rose-100">{title}</h4>
            <p className="text-xs text-rose-800 dark:text-rose-300 mt-1 max-w-xl">{message}</p>
          </div>
        </div>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-colors whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Retry Request</span>
          </button>
        )}
      </div>
    </div>
  );
};
