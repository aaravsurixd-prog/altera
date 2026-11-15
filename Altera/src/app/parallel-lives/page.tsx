'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricBar } from '@/components/ui/MetricBar';
import {
  GitCompare,
  ArrowRight,
  Sparkles,
  Zap,
  Scale,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Plus
} from 'lucide-react';

export default function ParallelLivesPage() {
  const { decisions, addTimelineGoal } = useAuth();
  const currentDecision = decisions[0];
  const scenarios = currentDecision?.scenarios || [];

  const [committedMsg, setCommittedMsg] = useState<string | null>(null);

  const handleCommitAllMilestones = (scenarioIndex: number) => {
    const scen = scenarios[scenarioIndex];
    if (!scen) return;

    scen.milestones.forEach((m) => {
      addTimelineGoal({
        scenarioId: scen.id,
        scenarioTitle: scen.title,
        title: m.title,
        description: m.description,
        targetTimeframe: m.timeframe,
        category: 'career',
        status: m.status,
        progressPct: m.status === 'achieved' ? 100 : m.status === 'in_progress' ? 50 : 0,
      });
    });

    setCommittedMsg(`Committed all milestones for "${scen.title}" into My Timeline.`);
    setTimeout(() => setCommittedMsg(null), 3500);
  };

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-slate-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Parallel Lives"
          subtitle="Side-by-side scenario comparison matrix & trajectory diff analysis"
        />

        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Header Description */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="silver" size="sm">
                  Comparative Matrix
                </Badge>
                <span className="text-xs font-mono text-slate-400">
                  {currentDecision?.dilemmaTitle}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight editorial-serif">
                Parallel Trajectory Synthesis
              </h1>
              <p className="text-xs text-slate-400 max-w-2xl font-light">
                Juxtapose divergent futures across critical life dimensions to reveal the hidden trade-offs before committing irrecoverable years.
              </p>
            </div>

            <Link href="/future-you">
              <Button variant="secondary" size="sm" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Modify Dilemma
              </Button>
            </Link>
          </div>

          {committedMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{committedMsg}</span>
            </div>
          )}

          {/* SYNTHESIS HIGHLIGHT ROW: DIMENSION LEADERS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-1.5 shadow-luxury-sm">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-violet-400 block">
                Maximum Calendar Sovereignty
              </span>
              <div className="text-sm font-semibold text-white font-sans">Path C: The Sovereign Polymath</div>
              <p className="text-xs text-slate-400 font-light">
                99% Autonomy, zero mandatory meetings, maximal restorative health.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-1.5 shadow-luxury-sm">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-sky-400 block">
                Maximum Societal Reach
              </span>
              <div className="text-sm font-semibold text-white font-sans">Path B: The Titan Research Lead</div>
              <p className="text-xs text-slate-400 font-light">
                98% Impact rating, petascale compute clusters, immediate distribution to 100M+ users.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-1.5 shadow-luxury-sm">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-300 block">
                Maximum Uncapped Equity
              </span>
              <div className="text-sm font-semibold text-white font-sans">Path A: The Venture Sovereign</div>
              <p className="text-xs text-slate-400 font-light">
                94% Growth leverage, founding super-voting equity, uncompromised product vision.
              </p>
            </div>
          </div>

          {/* SIDE-BY-SIDE MATRIX TABLE */}
          <div className="altera-card rounded-2xl border border-white/10 overflow-x-auto specular-top">
            <table className="w-full text-left border-collapse min-w-[850px]">
              {/* Header row: Scenario Titles */}
              <thead>
                <tr className="border-b border-white/[0.08] bg-obsidian-950/60">
                  <th className="p-5 text-[10.5px] font-mono uppercase tracking-widest text-slate-400 w-1/4">
                    Dimension
                  </th>
                  {scenarios.map((scen, idx) => (
                    <th key={scen.id} className="p-5 w-1/4 align-top">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant={idx === 0 ? 'violet' : idx === 1 ? 'ice' : 'silver'} size="sm">
                            {scen.scenarioCode}
                          </Badge>
                          <span className="text-[9.5px] font-mono text-slate-400">
                            {scen.possibilityArchetype}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-white">
                          {scen.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-light line-clamp-2">
                          {scen.tagline}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06] text-xs">
                {/* Row: Metrics Radar */}
                <tr>
                  <td className="p-5 font-mono text-[10.5px] text-slate-400 uppercase tracking-widest">
                    Balance Profile
                  </td>
                  {scenarios.map((scen) => (
                    <td key={scen.id} className="p-5 align-top space-y-2">
                      <MetricBar label="Autonomy" value={scen.metrics.autonomy} color="ice" />
                      <MetricBar label="Impact" value={scen.metrics.impact} color="violet" />
                      <MetricBar label="Risk" value={scen.metrics.risk} color="amber" />
                      <MetricBar label="Balance" value={scen.metrics.balance} color="emerald" />
                    </td>
                  ))}
                </tr>

                {/* Row: Primary Opportunity */}
                <tr>
                  <td className="p-5 font-mono text-[10.5px] text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Upside Asymmetry</span>
                  </td>
                  {scenarios.map((scen) => (
                    <td key={scen.id} className="p-5 align-top space-y-2">
                      <ul className="space-y-1.5 text-slate-300 font-light">
                        {scen.opportunities.slice(0, 3).map((opp, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Row: Hard Trade-offs */}
                <tr>
                  <td className="p-5 font-mono text-[10.5px] text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" />
                    <span>Cost / Sacrifice</span>
                  </td>
                  {scenarios.map((scen) => (
                    <td key={scen.id} className="p-5 align-top space-y-2">
                      <ul className="space-y-1.5 text-slate-300 font-light">
                        {scen.tradeoffs.slice(0, 3).map((trade, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{trade}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Row: Systemic Vulnerabilities */}
                <tr>
                  <td className="p-5 font-mono text-[10.5px] text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Systemic Fragility</span>
                  </td>
                  {scenarios.map((scen) => (
                    <td key={scen.id} className="p-5 align-top space-y-2">
                      <ul className="space-y-1.5 text-slate-300 font-light">
                        {scen.systemicChallenges.slice(0, 2).map((chal, i) => (
                          <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                            <span className="text-red-400 font-bold">•</span>
                            <span>{chal}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Row: Required Capabilities */}
                <tr>
                  <td className="p-5 font-mono text-[10.5px] text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5" />
                    <span>Key Capabilities</span>
                  </td>
                  {scenarios.map((scen) => (
                    <td key={scen.id} className="p-5 align-top">
                      <div className="flex flex-wrap gap-1.5">
                        {scen.criticalSkills.map((s, i) => (
                          <span
                            key={i}
                            className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-obsidian-850 border border-white/[0.08] text-slate-300"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Row: Milestone Horizon */}
                <tr>
                  <td className="p-5 font-mono text-[10.5px] text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Year 1-2 Target</span>
                  </td>
                  {scenarios.map((scen) => {
                    const m = scen.milestones[1] || scen.milestones[0];
                    return (
                      <td key={scen.id} className="p-5 align-top space-y-1">
                        <span className="text-[9.5px] font-mono text-violet-400 block">
                          {m?.timeframe}
                        </span>
                        <div className="font-semibold text-white">{m?.title}</div>
                        <p className="text-slate-400 leading-relaxed font-light">{m?.description}</p>
                      </td>
                    );
                  })}
                </tr>

                {/* Row: Actions */}
                <tr className="bg-obsidian-950/40">
                  <td className="p-5 font-mono text-[10.5px] text-slate-400 uppercase tracking-widest">
                    Commit To Roadmap
                  </td>
                  {scenarios.map((scen, idx) => (
                    <td key={scen.id} className="p-5 align-top">
                      <Button
                        variant={idx === 0 ? 'silver' : 'outline'}
                        size="sm"
                        onClick={() => handleCommitAllMilestones(idx)}
                        leftIcon={<Plus className="w-3.5 h-3.5" />}
                        className="w-full"
                      >
                        Adopt Path Milestones
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
