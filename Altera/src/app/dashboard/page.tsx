'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricBar } from '@/components/ui/MetricBar';
import {
  Brain,
  Compass,
  GitBranch,
  CalendarRange,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Shield,
  Layers,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Plus,
  Cpu
} from 'lucide-react';

export default function DashboardPage() {
  const { user, memories, decisions, timelineGoals } = useAuth();

  const activeDecision = decisions[0];
  const activeMemoriesCount = memories.filter((m) => m.privacyLevel === 'active').length;
  const achievedGoalsCount = timelineGoals.filter((g) => g.status === 'achieved').length;

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-slate-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />

        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Welcome & Horizon Overview Banner */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 p-6 sm:p-8 relative overflow-hidden specular-top shadow-luxury-md">
            <div className="absolute right-0 top-0 w-96 h-96 bg-violet-600/[0.04] rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="silver" size="sm" dot>
                    Neural Mesh Synchronized
                  </Badge>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Planning Horizon // 3-5 Years
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight editorial-serif">
                  Welcome back, <span className="editorial-italic text-slate-200">{user?.fullName || 'Elena'}</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
                  Your Second Self has assimilated {activeMemoriesCount} active memory vectors. Currently modeling 3 divergent trajectories for your frontier inflection.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link href="/second-self">
                  <Button variant="secondary" size="md" leftIcon={<Brain className="w-4 h-4 text-violet-400" />}>
                    Consult Self
                  </Button>
                </Link>
                <Link href="/future-you">
                  <Button variant="silver" size="md" leftIcon={<Compass className="w-4 h-4 text-obsidian-950" />}>
                    Simulate Fork
                  </Button>
                </Link>
              </div>
            </div>

            {/* Precision Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/[0.06]">
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block">
                  Active Memories
                </span>
                <span className="text-2xl font-light text-white font-mono">{activeMemoriesCount}</span>
                <span className="text-[10px] text-slate-400 block font-mono">Encrypted in Ledger</span>
              </div>
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block">
                  Modeled Scenarios
                </span>
                <span className="text-2xl font-light text-sky-400 font-mono">
                  {activeDecision?.scenarios?.length || 3}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Parallel Trajectories</span>
              </div>
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block">
                  Milestones Achieved
                </span>
                <span className="text-2xl font-light text-emerald-400 font-mono">
                  {achievedGoalsCount} / {timelineGoals.length}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Roadmap Velocity</span>
              </div>
              <div>
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block">
                  Autonomy Index
                </span>
                <span className="text-2xl font-light text-violet-300 font-mono">92%</span>
                <span className="text-[10px] text-slate-400 block font-mono">Calendar Sovereignty</span>
              </div>
            </div>
          </div>

          {/* ACTIVE DECISION BIFURCATION SPOTLIGHT */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400">
                  PRIMARY INFLECTION
                </span>
                <h2 className="text-lg font-light text-white tracking-tight editorial-serif">
                  Active Decision Landscape
                </h2>
              </div>
              <Link
                href="/future-you"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <span>Full Lab Model</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {activeDecision && (
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/10 space-y-5 specular-top shadow-luxury-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">DILEMMA</span>
                    <Badge variant="silver" size="sm">3-5 Year Horizon</Badge>
                  </div>
                  <h3 className="text-base sm:text-lg font-light text-white editorial-serif">
                    {activeDecision.dilemmaTitle}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    {activeDecision.contextDescription}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block mb-2.5">
                    Three Alternative Possibilities:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {activeDecision.scenarios.map((scen, idx) => (
                      <div
                        key={scen.id}
                        className="p-4 rounded-xl bg-obsidian-850/80 border border-white/[0.08] hover:border-white/20 transition-all space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant={idx === 0 ? 'violet' : idx === 1 ? 'ice' : 'silver'} size="sm">
                            {scen.scenarioCode}
                          </Badge>
                          <span className="text-[9.5px] font-mono text-slate-400">
                            {scen.possibilityArchetype}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">
                          {scen.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
                          {scen.tagline}
                        </p>
                        <div className="space-y-1.5 pt-1">
                          <MetricBar label="Autonomy" value={scen.metrics.autonomy} color="ice" />
                          <MetricBar label="Impact" value={scen.metrics.impact} color="violet" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* TWO COLUMN GRID: SECOND SELF MEMORY HIGHLIGHTS & ROADMAP MILESTONES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 6 cols: Second Self Spark */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-violet-400">
                    COGNITIVE ENVIRONMENT
                  </span>
                  <h3 className="text-lg font-light text-white editorial-serif">
                    Memory Ledger Highlights
                  </h3>
                </div>
                <Link
                  href="/second-self"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                >
                  <span>Memory Vault ({memories.length})</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {memories.slice(0, 3).map((mem) => (
                  <div
                    key={mem.id}
                    className="p-4 rounded-xl bg-obsidian-900 border border-white/[0.08] space-y-2 shadow-luxury-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">
                        {mem.title}
                      </span>
                      <span className="text-[9.5px] font-mono uppercase text-slate-300 bg-obsidian-950 px-2 py-0.5 rounded border border-white/10">
                        {mem.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {mem.content}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      {mem.tags.map((t) => (
                        <span key={t} className="text-[9.5px] font-mono text-slate-500">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}

                <Link href="/second-self" className="block">
                  <button className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 bg-obsidian-900/40 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>Engage Second Self in Epistemic Sparring →</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right 6 cols: Living Timeline Milestones */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400">
                    MY TIMELINE
                  </span>
                  <h3 className="text-lg font-light text-white editorial-serif">
                    Near-Horizon Milestones
                  </h3>
                </div>
                <Link
                  href="/my-timeline"
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                >
                  <span>Full Roadmap</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {timelineGoals.slice(0, 4).map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 rounded-xl bg-obsidian-900 border border-white/[0.08] flex items-center justify-between gap-4 shadow-luxury-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono uppercase px-1.5 py-0.5 rounded bg-obsidian-950 text-slate-400 border border-white/[0.06]">
                          {goal.targetTimeframe}
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-400 capitalize">
                          {goal.category}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {goal.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 line-clamp-1 font-light">
                        {goal.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full border ${
                          goal.status === 'achieved'
                            ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                            : goal.status === 'in_progress'
                            ? 'bg-violet-950/60 text-violet-300 border-violet-500/30'
                            : 'bg-obsidian-850 text-slate-400 border-white/5'
                        }`}
                      >
                        {goal.status === 'achieved'
                          ? 'Achieved'
                          : goal.status === 'in_progress'
                          ? `${goal.progressPct}%`
                          : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}

                <Link href="/my-timeline" className="block">
                  <button className="w-full py-3 rounded-xl border border-white/10 hover:border-white/20 bg-obsidian-900/40 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer font-mono">
                    <Plus className="w-3.5 h-3.5 text-sky-400" />
                    <span>Manage Roadmap & Milestones →</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
