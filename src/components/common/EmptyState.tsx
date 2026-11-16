import React from 'react';
import { PackageOpen, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  actionText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No shipments found",
  description = "No consignments match your current search and filter criteria. Try adjusting your query or resetting all filters.",
  onReset,
  actionText = "Reset All Filters",
}) => {
  return (
    <div 
      className="p-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center flex flex-col items-center justify-center my-6"
      role="status"
    >
      <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
        <PackageOpen className="w-8 h-8" aria-hidden="true" />
      </div>
      <h3 className="text-base font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mt-1.5 mb-6">
        {description}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-500 dark:text-slate-950 shadow-sm focus:ring-2 focus:ring-amber-500 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
