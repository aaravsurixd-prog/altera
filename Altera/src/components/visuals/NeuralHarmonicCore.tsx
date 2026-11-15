'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NeuralHarmonicCoreProps {
  isThinking?: boolean;
  activeNodesCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const NeuralHarmonicCore: React.FC<NeuralHarmonicCoreProps> = ({
  isThinking = false,
  activeNodesCount = 6,
  size = 'md',
}) => {
  const dimensions = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-52 h-52',
  };

  return (
    <div className={`relative ${dimensions[size]} flex items-center justify-center select-none`}>
      {/* Outer subtle atmospheric glow */}
      <div className="absolute inset-0 bg-violet-600/[0.08] rounded-full blur-2xl pointer-events-none" />

      {/* Harmonic Silver Orbit 1 */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: isThinking ? 15 : 45, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-1 rounded-full border border-white/[0.08]"
        style={{
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          borderRightColor: 'rgba(124, 58, 237, 0.4)',
        }}
      />

      {/* Harmonic Violet Orbit 2 (Counter-rotation) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: isThinking ? 18 : 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-violet-500/[0.15]"
        style={{
          borderBottomColor: 'rgba(124, 58, 237, 0.6)',
          borderLeftColor: 'rgba(56, 189, 248, 0.4)',
        }}
      />

      {/* Harmonic Ice Ellipse 3 */}
      <motion.div
        animate={{
          scale: isThinking ? [1, 1.08, 1] : [1, 1.03, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: isThinking ? 2 : 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-7 rounded-full border border-sky-400/[0.25]"
      />

      {/* Central Singularity Core */}
      <div className="relative z-10 w-9 h-9 rounded-xl bg-obsidian-900 border border-white/20 flex items-center justify-center shadow-lg shadow-violet-950/50 backdrop-blur-md">
        <span className="font-mono text-xs font-bold text-white tracking-widest">
          Λ
        </span>
        <motion.div
          animate={{ opacity: isThinking ? [0.4, 1, 0.4] : [0.2, 0.5, 0.2] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-violet-600/30 to-sky-400/20"
        />
      </div>

      {/* Orbiting Memory Resonance Nodes */}
      {[0, 1, 2, 3].map((nodeIdx) => {
        const angle = (nodeIdx / 4) * Math.PI * 2;
        return (
          <motion.div
            key={nodeIdx}
            animate={{ rotate: 360 }}
            transition={{
              duration: 30 + nodeIdx * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute w-1.5 h-1.5 rounded-full bg-slate-200 shadow-[0_0_8px_#ffffff]"
              style={{
                top: `${50 + 40 * Math.sin(angle)}%`,
                left: `${50 + 40 * Math.cos(angle)}%`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
