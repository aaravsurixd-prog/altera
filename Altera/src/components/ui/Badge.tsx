import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'violet' | 'ice' | 'silver' | 'emerald' | 'amber' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'violet',
  size = 'md',
  className,
  dot = false,
}) => {
  const sizeStyles = {
    sm: 'text-[9.5px] px-2 py-0.5 gap-1 tracking-widest uppercase font-mono',
    md: 'text-[11px] px-2.5 py-0.5 gap-1.5 font-mono tracking-wider',
  };

  const variantStyles = {
    violet: 'bg-electric-violet/10 text-violet-200 border border-violet-500/30 shadow-[0_0_12px_rgba(124,58,237,0.15)]',
    ice: 'bg-sky-950/40 text-ice-bright border border-sky-400/30 shadow-[0_0_12px_rgba(56,189,248,0.15)]',
    silver: 'bg-white/[0.04] text-slate-200 border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.06)]',
    emerald: 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30',
    amber: 'bg-amber-950/40 text-amber-300 border border-amber-500/30',
    neutral: 'bg-obsidian-850/90 text-slate-300 border border-white/10',
  };

  const dotColors = {
    violet: 'bg-violet-400 shadow-[0_0_6px_#a78bfa]',
    ice: 'bg-sky-400 shadow-[0_0_6px_#38bdf8]',
    silver: 'bg-slate-200 shadow-[0_0_6px_#ffffff]',
    emerald: 'bg-emerald-400 shadow-[0_0_6px_#34d399]',
    amber: 'bg-amber-400 shadow-[0_0_6px_#fbbf24]',
    neutral: 'bg-slate-400',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full backdrop-blur-md select-none',
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
    >
      {dot && <span className={clsx('w-1 h-1 rounded-full shrink-0 animate-pulse', dotColors[variant])} />}
      {children}
    </span>
  );
};
