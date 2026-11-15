import React from 'react';

interface MetricBarProps {
  label: string;
  value: number; // 0 - 100
  color?: 'violet' | 'ice' | 'silver' | 'amber' | 'emerald';
  description?: string;
}

export const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  color = 'violet',
  description,
}) => {
  const barGradients = {
    violet: 'from-violet-500 via-indigo-400 to-purple-300 shadow-[0_0_12px_rgba(124,58,237,0.35)]',
    ice: 'from-sky-500 via-cyan-400 to-slate-100 shadow-[0_0_12px_rgba(56,189,248,0.35)]',
    silver: 'from-slate-400 via-slate-200 to-white shadow-[0_0_10px_rgba(255,255,255,0.3)]',
    amber: 'from-amber-600 via-orange-400 to-yellow-200',
    emerald: 'from-emerald-600 via-teal-400 to-emerald-200',
  };

  const textColors = {
    violet: 'text-violet-300',
    ice: 'text-sky-300',
    silver: 'text-slate-200',
    amber: 'text-amber-300',
    emerald: 'text-emerald-300',
  };

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-xs">
        <span className="text-slate-300 font-medium tracking-wide flex items-center gap-1.5">
          {label}
          {description && (
            <span className="text-[9.5px] text-slate-500 font-mono tracking-wider">
              [{description.toUpperCase()}]
            </span>
          )}
        </span>
        <span className={`font-mono font-medium text-xs ${textColors[color]}`}>
          {value}%
        </span>
      </div>
      <div className="w-full h-1 bg-obsidian-950 rounded-full overflow-hidden border border-white/[0.06] p-[0.5px]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barGradients[color]} transition-all duration-700 ease-out`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};
