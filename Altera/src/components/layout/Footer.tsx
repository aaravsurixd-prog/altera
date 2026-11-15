'use client';

import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-altera-950/90 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 mt-auto z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand & Manifesto */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/30 to-sky-500/20 border border-violet-500/40 flex items-center justify-center font-mono font-bold text-white text-sm">
              Λ
            </div>
            <span className="font-semibold text-lg tracking-widest text-white uppercase font-sans">
              ALTERA
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            The personal intelligence and future exploration architecture. Designed for sovereign thinkers, frontier builders, and those who refuse to collapse into a single preordained life.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-500">
            TAGLINE: &ldquo;Become more than one possibility.&rdquo;
          </div>
        </div>

        {/* Column 1: Core Platforms */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200">
            Platforms
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/second-self" className="hover:text-white transition-colors">
                Second Self Intelligence
              </Link>
            </li>
            <li>
              <Link href="/future-you" className="hover:text-white transition-colors">
                Future You Trajectory Engine
              </Link>
            </li>
            <li>
              <Link href="/parallel-lives" className="hover:text-white transition-colors">
                Parallel Lives Synthesis
              </Link>
            </li>
            <li>
              <Link href="/my-timeline" className="hover:text-white transition-colors">
                Multi-Horizon Roadmap
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Governance & Ethics */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200">
            Philosophy
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#methodology" className="hover:text-white transition-colors">
                Possibility vs. Prediction
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-white transition-colors">
                Cryptographic Memory Vaults
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-white transition-colors">
                Data Sovereign Rights
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="hover:text-white transition-colors">
                Epistemic Humility Charter
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Global Access */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-wider text-slate-200">
            Coordinates
          </h4>
          <div className="text-xs font-mono text-slate-400 space-y-1.5 leading-relaxed">
            <div>Zurich • San Francisco • Tokyo</div>
            <div>Latency: 14ms (Distributed Mesh)</div>
            <div>Protocol: TLS 1.3 / AES-256 GCM</div>
            <div className="text-violet-400 pt-1">Status: All Nodes Nominal</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} ALTERA INTELLIGENCE AG. All rights reserved.</p>
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <span>Security Level: Sovereign</span>
          <span>Zero Telemetry Leaks</span>
        </div>
      </div>
    </footer>
  );
};
