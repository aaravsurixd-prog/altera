import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'silver' | 'outline' | 'ghost' | 'ice';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg select-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-1 focus:ring-slate-300/40 relative overflow-hidden tracking-wide';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5 h-8',
    md: 'text-xs sm:text-sm px-4.5 py-2 gap-2 h-10',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5 h-12',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-b from-violet-600 via-violet-700 to-violet-800 hover:from-violet-500 hover:to-violet-700 text-white shadow-luxury-md border border-violet-400/30 hover:border-violet-300/50 hover:shadow-glow-violet active:scale-[0.98]',
    silver:
      'bg-gradient-to-b from-white via-slate-100 to-slate-200 hover:from-white hover:to-slate-100 text-obsidian-950 font-semibold shadow-luxury-md border border-white/80 active:scale-[0.98]',
    secondary:
      'bg-obsidian-850 hover:bg-obsidian-800 text-slate-200 border border-white/10 hover:border-white/20 shadow-luxury-sm active:scale-[0.98]',
    outline:
      'bg-transparent hover:bg-white/[0.04] text-slate-300 hover:text-white border border-white/15 hover:border-white/30',
    ghost:
      'bg-transparent hover:bg-white/[0.06] text-slate-400 hover:text-slate-100',
    ice:
      'bg-obsidian-900/90 hover:bg-obsidian-850 text-ice-bright border border-sky-400/40 hover:border-sky-300/70 shadow-luxury-sm hover:shadow-glow-ice active:scale-[0.98]',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-wider">Synchronizing...</span>
        </span>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
