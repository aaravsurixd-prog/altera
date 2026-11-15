'use client';

import React from 'react';

interface FutureLabCoordinatesProps {
  activeArchetype?: string;
  horizon?: string;
  divergenceLevel?: number;
}

export const FutureLabCoordinates: React.FC<FutureLabCoordinatesProps> = ({
  activeArchetype = 'The Exponential Builder',
  horizon = '3-5 Years',
  divergenceLevel = 88,
}) => {
  return (
    <div className="relative w-full rounded-2xl bg-obsidian-900 border border-white/[0.08] p-5 sm:p-6 overflow-hidden select-none">
      {/* Background Precision Coordinate Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="labGrid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#labGrid)" />
        </svg>
      </div>

      {/* Top Telemetry Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian-950 border border-white/10 font-mono text-[10px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-ice-accent animate-pulse" />
            <span>LAB PROTOCOL // BIFURCATION MATRIX</span>
          </div>
          <span className="font-mono text-[10px] text-slate-500 hidden sm:inline">
            COORDINATES: 47.3769° N, 8.5417° E
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px]">
          <div>
            <span className="text-slate-500 uppercase">Horizon: </span>
            <span className="text-slate-200">{horizon}</span>
          </div>
          <div>
            <span className="text-slate-500 uppercase">Divergence: </span>
            <span className="text-ice-bright font-semibold">{divergenceLevel}%</span>
          </div>
        </div>
      </div>

      {/* Tri-Branch Divergence Vector Graphic */}
      <div className="relative z-10 py-6 flex items-center justify-center">
        <svg className="w-full max-w-xl h-28" viewBox="0 0 600 120" fill="none">
          {/* Origin Node */}
          <circle cx="60" cy="60" r="4" fill="#ffffff" />
          <circle cx="60" cy="60" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <text x="60" y="85" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
            PRESENT
          </text>

          {/* Path A Vector (Violet - Upper curve) */}
          <path
            d="M 60 60 C 180 60, 260 20, 520 20"
            stroke="rgba(124, 58, 237, 0.75)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="520" cy="20" r="4" fill="#c4b5fd" />
          <text x="532" y="24" fill="#c4b5fd" fontSize="9" fontFamily="monospace">
            PATH A // VENTURE SOVEREIGN
          </text>

          {/* Path B Vector (Ice Blue - Middle horizontal) */}
          <path
            d="M 60 60 C 200 60, 300 60, 520 60"
            stroke="rgba(56, 189, 248, 0.75)"
            strokeWidth="1.5"
          />
          <circle cx="520" cy="60" r="4" fill="#38bdf8" />
          <text x="532" y="64" fill="#7dd3fc" fontSize="9" fontFamily="monospace">
            PATH B // TITAN RESEARCH
          </text>

          {/* Path C Vector (Silver - Lower curve) */}
          <path
            d="M 60 60 C 180 60, 260 100, 520 100"
            stroke="rgba(226, 232, 240, 0.75)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <circle cx="520" cy="100" r="4" fill="#ffffff" />
          <text x="532" y="104" fill="#e2e8f0" fontSize="9" fontFamily="monospace">
            PATH C // SOVEREIGN POLYMATH
          </text>
        </svg>
      </div>
    </div>
  );
};
