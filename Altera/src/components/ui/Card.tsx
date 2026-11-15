import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: 'none' | 'violet' | 'ice';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glow = 'none',
  interactive = false,
  className,
  ...props
}) => {
  const glowStyles = {
    none: '',
    violet: 'card-glow-violet hover:border-violet-500/40 hover:shadow-glow-violet',
    ice: 'card-glow-ice hover:border-sky-400/40 hover:shadow-glow-ice',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'altera-card rounded-xl p-6 relative overflow-hidden',
          interactive && 'cursor-pointer hover:-translate-y-0.5 transition-all duration-300',
          glowStyles[glow],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
