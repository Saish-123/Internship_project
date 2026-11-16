import React from 'react';
import { ShipmentStatus, CargoPriority } from '../../types/logistics';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  AlertTriangle, 
  PackageCheck, 
  Warehouse, 
  Zap, 
  Thermometer, 
  ShieldAlert 
} from 'lucide-react';

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs sm:text-sm';

  switch (status) {
    case 'Delivered':
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-700 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          <span>Delivered</span>
        </span>
      );
    case 'In Transit':
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-blue-100 text-blue-900 border border-blue-300 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-700 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <Truck className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" aria-hidden="true" />
          <span>In Transit</span>
        </span>
      );
    case 'Out for Delivery':
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-indigo-100 text-indigo-900 border border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-700 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <PackageCheck className="w-3.5 h-3.5 text-indigo-700 dark:text-indigo-400" aria-hidden="true" />
          <span>Out for Delivery</span>
        </span>
      );
    case 'Delayed':
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-amber-100 text-amber-950 border border-amber-400 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" aria-hidden="true" />
          <span>Delayed</span>
        </span>
      );
    case 'Inwarded at Hub':
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-purple-100 text-purple-900 border border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-700 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <Warehouse className="w-3.5 h-3.5 text-purple-700 dark:text-purple-400" aria-hidden="true" />
          <span>Inwarded at Hub</span>
        </span>
      );
    case 'Exception':
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-red-100 text-red-900 border border-red-300 dark:bg-red-950 dark:text-red-200 dark:border-red-700 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-700 dark:text-red-400" aria-hidden="true" />
          <span>Exception</span>
        </span>
      );
    case 'Booked':
    default:
      return (
        <span 
          className={`inline-flex items-center gap-1.5 font-semibold rounded-full bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 ${sizeClasses}`}
          role="status"
          aria-label={`Status: ${status}`}
        >
          <Clock className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" aria-hidden="true" />
          <span>Booked</span>
        </span>
      );
  }
};

interface PriorityBadgeProps {
  priority: CargoPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  switch (priority) {
    case 'Express':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800">
          <Zap className="w-3 h-3 text-rose-600" aria-hidden="true" />
          Express
        </span>
      );
    case 'Over-Dimensional (ODC)':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800">
          <AlertTriangle className="w-3 h-3 text-amber-600" aria-hidden="true" />
          ODC (Heavy)
        </span>
      );
    case 'Temperature-Controlled':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-cyan-50 text-cyan-900 border border-cyan-300 dark:bg-cyan-950 dark:text-cyan-200 dark:border-cyan-800">
          <Thermometer className="w-3 h-3 text-cyan-600" aria-hidden="true" />
          Reefer / Cold
        </span>
      );
    case 'Standard':
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
          Standard
        </span>
      );
  }
};
