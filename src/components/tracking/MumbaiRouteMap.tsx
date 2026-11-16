import React from 'react';
import { RouteCheckpoint, ShipmentStatus } from '../../types/logistics';
import { Truck } from 'lucide-react';

interface MumbaiRouteMapProps {
  checkpoints: RouteCheckpoint[];
  status: ShipmentStatus;
  currentLocation: string;
}

export const MumbaiRouteMap: React.FC<MumbaiRouteMapProps> = ({
  checkpoints,
  status,
  currentLocation,
}) => {
  // Bounding box approximate coordinates for Mumbai MMR:
  // Lat: 18.6 to 19.4 N, Lng: 72.7 to 73.9 E
  const minLat = 18.6;
  const maxLat = 19.4;
  const minLng = 72.7;
  const maxLng = 73.9;

  const width = 500;
  const height = 280;

  const project = (lat: number, lng: number) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * (width - 80) + 40;
    // Invert Y because latitude goes up north while SVG Y goes down
    const y = height - (((lat - minLat) / (maxLat - minLat)) * (height - 60) + 30);
    return { x: Math.max(30, Math.min(width - 30, x)), y: Math.max(25, Math.min(height - 25, y)) };
  };

  const points = checkpoints.map(cp => ({
    ...cp,
    ...project(cp.lat, cp.lng)
  }));

  const pathD = points.length > 0 
    ? points.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '')
    : '';

  const activeCheckpoint = checkpoints.find(c => c.status === 'current') || checkpoints[checkpoints.length - 1];
  const activeCoord = activeCheckpoint ? project(activeCheckpoint.lat, activeCheckpoint.lng) : { x: 250, y: 140 };

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 shadow-md relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Mumbai Metropolitan Region (MMR) Live Telematics
          </h4>
        </div>
        <span className="text-[11px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/80">
          Corridor: {currentLocation}
        </span>
      </div>

      <div className="w-full relative overflow-x-auto">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-auto max-h-[300px] select-none"
          role="img"
          aria-label="Route map visualization of Mumbai Metropolitan Region showing checkpoints and truck position"
        >
          {/* Background gridlines for industrial look */}
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            </pattern>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          <rect width={width} height={height} fill="#090d16" />
          <rect width={width} height={height} fill="url(#grid)" />

          {/* Key Geographic references in Mumbai */}
          <text x="50" y="45" fill="#475569" fontSize="10" fontWeight="bold">ARABIAN SEA</text>
          <text x="380" y="45" fill="#334155" fontSize="10">WESTERN GHATS</text>

          {/* Route Line */}
          {pathD && (
            <>
              <path
                d={pathD}
                fill="none"
                stroke="#1e293b"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={pathD}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="3.5"
                strokeDasharray={status === 'Delivered' ? 'none' : '6 4'}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Checkpoint Nodes */}
          {points.map((pt, idx) => {
            const isDone = pt.status === 'completed';
            const isCurr = pt.status === 'current';

            return (
              <g key={pt.id || idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isCurr ? 8 : 5}
                  fill={isCurr ? '#f59e0b' : isDone ? '#10b981' : '#64748b'}
                  stroke="#0f172a"
                  strokeWidth="2"
                />
                {isCurr && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="14"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    className="animate-pulse"
                  />
                )}
                {/* Text Label */}
                <text
                  x={pt.x}
                  y={pt.y + (idx % 2 === 0 ? -12 : 18)}
                  textAnchor="middle"
                  fill={isCurr ? '#fbbf24' : '#e2e8f0'}
                  fontSize="9.5"
                  fontWeight={isCurr ? 'bold' : 'normal'}
                >
                  {pt.name}
                </text>
              </g>
            );
          })}

          {/* Live Truck Marker */}
          {activeCoord && (
            <g transform={`translate(${activeCoord.x - 12}, ${activeCoord.y - 12})`}>
              <circle cx="12" cy="12" r="16" fill="#f59e0b" fillOpacity="0.25" />
            </g>
          )}
        </svg>
      </div>

      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Completed Checkpoint
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse" /> Live Truck Position
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block" /> Next Toll / CFS
          </span>
        </div>
        <div className="flex items-center gap-1 text-slate-300">
          <Truck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
          <span>GPS Refresh: Live (Every 60s)</span>
        </div>
      </div>
    </div>
  );
};
