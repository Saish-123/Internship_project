import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number; view?: 'table' | 'cards' }> = ({ 
  count = 4, 
  view = 'table' 
}) => {
  return (
    <div 
      className="space-y-4 animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading shipments data..."
    >
      <div className="sr-only">Loading consignments and tracking details...</div>

      {view === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: count }).map((_, i) => (
            <div 
              key={i} 
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3"
            >
              <div className="flex justify-between items-center">
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-full w-20" />
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex gap-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-48" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32" />
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24 ml-auto" />
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="p-4 flex items-center justify-between gap-4">
                <div className="space-y-1.5 w-1/4">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-1/2" />
                </div>
                <div className="space-y-1.5 w-1/3">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-3/5" />
                </div>
                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-24" />
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-20" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
