'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Badge } from '@/components/ui/Badge';
import {
  LayoutDashboard,
  Brain,
  Compass,
  GitCompare,
  CalendarRange,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const NAV_ITEMS = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Second Self',
    href: '/second-self',
    icon: Brain,
    badge: 'Neural',
    color: 'violet',
  },
  {
    name: 'Future You',
    href: '/future-you',
    icon: Compass,
    badge: 'Lab',
    color: 'ice',
  },
  {
    name: 'Parallel Lives',
    href: '/parallel-lives',
    icon: GitCompare,
    badge: 'Matrix',
    color: 'silver',
  },
  {
    name: 'My Timeline',
    href: '/my-timeline',
    icon: CalendarRange,
    badge: 'Roadmap',
    color: 'neutral',
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    badge: null,
  },
];

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout, isDemoMode } = useAuth();

  return (
    <aside className="w-64 bg-obsidian-950 border-r border-white/[0.08] flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/[0.07]">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/[0.14] to-white/[0.03] border border-white/20 flex items-center justify-center font-mono font-medium text-white text-xs shadow-luxury-sm">
            Λ
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-[0.18em] text-xs uppercase font-sans">
                ALTERA
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-[9px] text-slate-400 font-mono tracking-widest uppercase">
              {isDemoMode ? 'SANDBOX // PREVIEW' : 'SYNCHRONIZED'}
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-5 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400">
          Core Workspaces
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono tracking-wide transition-all group ${
                isActive
                  ? 'bg-white/[0.08] text-white font-medium border border-white/15 shadow-luxury-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
                <span className="font-sans text-xs tracking-normal">{item.name}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9.5px] px-1.5 py-0.5 rounded font-mono ${
                    item.color === 'violet'
                      ? 'bg-electric-violet/20 text-violet-300 border border-violet-500/30'
                      : item.color === 'ice'
                      ? 'bg-sky-950/60 text-sky-300 border border-sky-400/30'
                      : 'bg-obsidian-850 text-slate-400 border border-white/10'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Cognitive Intelligence Status & User Profile */}
      <div className="p-3 border-t border-white/[0.07] space-y-3 bg-obsidian-900/60">
        <div className="p-3 rounded-lg bg-obsidian-850 border border-white/[0.08] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-violet-400" />
              Cognitive Mesh
            </span>
            <Badge variant="silver" size="sm" dot>
              Active
            </Badge>
          </div>
          <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">
            Synthesizing across 6 memory matrices & 3 divergent future branches.
          </p>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between p-2 rounded-lg bg-obsidian-850/80 border border-white/[0.06]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/20 flex items-center justify-center text-xs font-semibold text-slate-200 shrink-0 font-mono">
              {user?.fullName?.charAt(0) || 'E'}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-medium text-white truncate font-sans">
                {user?.fullName || 'Elena Vance'}
              </span>
              <span className="text-[10px] text-slate-400 truncate font-mono">
                {user?.currentRole || 'Principal Architect'}
              </span>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 text-slate-400 hover:text-red-400 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
