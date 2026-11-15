'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Compass,
  Brain,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ title, subtitle }) => {
  const pathname = usePathname();
  const { isDemoMode } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const getPageTitle = () => {
    if (title) return title;
    switch (pathname) {
      case '/dashboard':
        return 'Personal Intelligence Overview';
      case '/second-self':
        return 'Second Self — Cognitive Environment';
      case '/future-you':
        return 'Future You — Exploration Laboratory';
      case '/parallel-lives':
        return 'Parallel Lives — Comparative Synthesis';
      case '/my-timeline':
        return 'My Timeline — Multi-Horizon Roadmap';
      case '/settings':
        return 'Settings & Sovereign Governance';
      case '/onboarding':
        return 'Cognitive Calibration';
      default:
        return 'Altera Intelligence';
    }
  };

  return (
    <header className="h-16 border-b border-white/[0.08] bg-obsidian-950/80 backdrop-blur-2xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div>
          <h1 className="text-xs sm:text-sm font-semibold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            {getPageTitle()}
          </h1>
          {subtitle && <p className="text-[11px] text-slate-400 font-sans hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isDemoMode && (
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-obsidian-850 border border-white/10 text-[10.5px] text-slate-300 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span>SANDBOX // VERIFIED</span>
          </div>
        )}

        <Link href="/second-self" className="hidden sm:inline-block">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Brain className="w-3.5 h-3.5 text-violet-400" />}
          >
            Consult Self
          </Button>
        </Link>

        <Link href="/future-you">
          <Button
            variant="ice"
            size="sm"
            leftIcon={<Compass className="w-3.5 h-3.5 text-sky-400" />}
          >
            Explore Future
          </Button>
        </Link>
      </div>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-obsidian-950 border-b border-white/10 p-4 space-y-2 shadow-2xl z-50 font-mono text-xs uppercase">
          <Link
            href="/dashboard"
            onClick={() => setMobileNavOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            Overview
          </Link>
          <Link
            href="/second-self"
            onClick={() => setMobileNavOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            Second Self Companion
          </Link>
          <Link
            href="/future-you"
            onClick={() => setMobileNavOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            Future You Explorer
          </Link>
          <Link
            href="/parallel-lives"
            onClick={() => setMobileNavOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            Parallel Lives Matrix
          </Link>
          <Link
            href="/my-timeline"
            onClick={() => setMobileNavOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            My Timeline
          </Link>
          <Link
            href="/settings"
            onClick={() => setMobileNavOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5"
          >
            Settings & Privacy
          </Link>
        </div>
      )}
    </header>
  );
};
