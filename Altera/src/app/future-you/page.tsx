'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MetricBar } from '@/components/ui/MetricBar';
import { FutureLabCoordinates } from '@/components/visuals/FutureLabCoordinates';
import { FutureScenario, ScenarioMilestone } from '@/types';
import {
  Compass,
  Sparkles,
  ArrowRight,
  GitBranch,
  Zap,
  Scale,
  Brain,
  CheckCircle2,
  Clock,
  Plus,
  GitCompare,
  Sliders,
  AlertTriangle,
  Cpu
} from 'lucide-react';

export default function FutureYouPage() {
  const { decisions, addDecision, addTimelineGoal, user } = useAuth();

  const [activeDecisionIndex, setActiveDecisionIndex] = useState(0);
  const currentDecision = decisions[activeDecisionIndex] || decisions[0];

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isSimulatingModalOpen, setIsSimulatingModalOpen] = useState(false);

  // New Dilemma form state
  const [dilemmaTitle, setDilemmaTitle] = useState('');
  const [contextDescription, setContextDescription] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('3-5 years');
  const [coreTradeoff, setCoreTradeoff] = useState('Autonomy vs. Scale');
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedMilestoneMsg, setAddedMilestoneMsg] = useState<string | null>(null);

  const selectedScenario: FutureScenario | undefined = currentDecision?.scenarios?.[selectedScenarioIndex];

  // Submit new decision simulation
  const handleSimulateNewFork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dilemmaTitle.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/ai/future-you', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dilemma: dilemmaTitle,
          context: contextDescription,
          timeHorizon,
          tradeoff: coreTradeoff,
          userProfile: user,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addDecision({
          id: 'dec_' + Date.now(),
          userId: user?.id || 'usr_anon',
          dilemmaTitle,
          contextDescription,
          timeHorizon,
          coreTradeoff,
          tags: ['Custom Simulation', timeHorizon],
          scenarios: data.scenarios,
          createdAt: new Date().toISOString(),
        });
        setActiveDecisionIndex(0);
        setSelectedScenarioIndex(0);
        setIsSimulatingModalOpen(false);
        setDilemmaTitle('');
        setContextDescription('');
      }
    } catch (err) {
      console.error('Failed to generate scenarios', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCommitMilestone = (milestone: ScenarioMilestone, scenarioTitle: string) => {
    addTimelineGoal({
      scenarioId: selectedScenario?.id,
      scenarioTitle,
      title: milestone.title,
      description: milestone.description,
      targetTimeframe: milestone.timeframe,
      category: 'career',
      status: 'not_started',
      progressPct: 0,
    });
    setAddedMilestoneMsg(`Committed "${milestone.title}" to My Timeline.`);
    setTimeout(() => setAddedMilestoneMsg(null), 3500);
  };

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-slate-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Future You"
          subtitle="Tri-branch trajectory exploration laboratory & decision divergence"
        />

        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Epistemic disclaimer banner */}
          <div className="p-3.5 rounded-xl bg-obsidian-900 border border-white/[0.08] flex items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-accent animate-pulse" />
              <span className="font-light">
                <strong className="text-white font-medium">Laboratory Protocol:</strong> Modeling emergent branches of high-leverage potential. These are designed to illuminate trade-offs, never to guarantee deterministic outcomes.
              </span>
            </div>
            <Link
              href="/parallel-lives"
              className="text-slate-300 hover:text-white font-mono text-xs hidden sm:flex items-center gap-1 shrink-0"
            >
              <span>Side-by-Side Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {addedMilestoneMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{addedMilestoneMsg}</span>
            </div>
          )}

          {/* ACTIVE DILEMMA HEADER */}
          <div className="altera-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 specular-top">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="ice" size="sm">
                    {currentDecision?.timeHorizon || '3-5 Years'}
                  </Badge>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    DECISION FORK #{activeDecisionIndex + 1}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl font-light text-white tracking-tight editorial-serif">
                  {currentDecision?.dilemmaTitle}
                </h1>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Button
                  variant="silver"
                  size="sm"
                  onClick={() => setIsSimulatingModalOpen(true)}
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Model New Dilemma
                </Button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-4xl">
              {currentDecision?.contextDescription}
            </p>

            {/* Visual Laboratory Coordinate Widget */}
            <FutureLabCoordinates
              activeArchetype={selectedScenario?.possibilityArchetype}
              horizon={currentDecision?.timeHorizon}
              divergenceLevel={selectedScenario?.metrics.autonomy || 85}
            />

            <div className="p-3.5 rounded-xl bg-obsidian-950 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Scale className="w-4 h-4 text-violet-400 shrink-0" />
                <span>
                  <strong className="text-slate-300">Core Epistemic Tension:</strong> {currentDecision?.coreTradeoff}
                </span>
              </div>
              <Link href="/parallel-lives">
                <Button variant="ghost" size="sm" rightIcon={<GitCompare className="w-3.5 h-3.5 text-slate-300" />}>
                  Compare in Matrix
                </Button>
              </Link>
            </div>
          </div>

          {/* THREE DIVERGENT BRANCH SELECTOR */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Divergent Possibility Branches ({currentDecision?.scenarios?.length || 3})
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Select branch to inspect</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {currentDecision?.scenarios?.map((scen, idx) => {
                const isSelected = selectedScenarioIndex === idx;
                return (
                  <button
                    key={scen.id}
                    type="button"
                    onClick={() => setSelectedScenarioIndex(idx)}
                    className={`p-6 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-obsidian-900 border-white/30 shadow-luxury-lg ring-1 ring-white/20 specular-top'
                        : 'bg-obsidian-900/60 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant={idx === 0 ? 'violet' : idx === 1 ? 'ice' : 'silver'} size="sm">
                          {scen.scenarioCode}
                        </Badge>
                        <span className="text-[9.5px] font-mono text-slate-400">
                          {scen.possibilityArchetype}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-white tracking-wide">
                        {scen.title}
                      </h3>

                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {scen.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] space-y-2 w-full">
                      <div className="flex justify-between text-[10.5px] font-mono">
                        <span className="text-slate-400">Autonomy</span>
                        <span className="text-sky-300">{scen.metrics.autonomy}%</span>
                      </div>
                      <div className="flex justify-between text-[10.5px] font-mono">
                        <span className="text-slate-400">Impact</span>
                        <span className="text-violet-300">{scen.metrics.impact}%</span>
                      </div>
                      <div className="flex justify-between text-[10.5px] font-mono">
                        <span className="text-slate-400">Balance</span>
                        <span className="text-emerald-300">{scen.metrics.balance}%</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DEEP DIVE INTO SELECTED SCENARIO */}
          {selectedScenario && (
            <div className="altera-card rounded-2xl p-6 sm:p-9 border border-white/10 space-y-8 specular-top">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="silver" size="md">
                      {selectedScenario.scenarioCode}: {selectedScenario.possibilityArchetype}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">Trajectory Diagnostic</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight editorial-serif">
                    {selectedScenario.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
                    {selectedScenario.description}
                  </p>
                </div>

                {/* Scenario Metric Gauge */}
                <div className="bg-obsidian-950 p-5 rounded-xl border border-white/[0.08] min-w-[260px] space-y-2.5 shadow-luxury-sm">
                  <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block pb-1 border-b border-white/[0.04]">
                    Branch Metrics Index
                  </span>
                  <MetricBar label="Growth" value={selectedScenario.metrics.growth} color="violet" />
                  <MetricBar label="Risk" value={selectedScenario.metrics.risk} color="amber" />
                  <MetricBar label="Autonomy" value={selectedScenario.metrics.autonomy} color="ice" />
                  <MetricBar label="Balance" value={selectedScenario.metrics.balance} color="emerald" />
                  <MetricBar label="Impact" value={selectedScenario.metrics.impact} color="silver" />
                </div>
              </div>

              {/* 4 Pillars: Opportunities, Trade-offs, Challenges, Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. Asymmetric Opportunities */}
                <div className="p-5 rounded-xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Asymmetric Upside</span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedScenario.opportunities.map((opp, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed font-light">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{opp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. Non-Negotiable Trade-offs */}
                <div className="p-5 rounded-xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase tracking-wider">
                    <Scale className="w-4 h-4" />
                    <span>Non-Negotiable Cost / Sacrifice</span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedScenario.tradeoffs.map((trade, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed font-light">
                        <span className="text-amber-400 font-bold mt-0.5">•</span>
                        <span>{trade}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Systemic Challenges & Failure Modes */}
                <div className="p-5 rounded-xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Systemic Fragilities & Obstacles</span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedScenario.systemicChallenges.map((chal, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed font-light">
                        <span className="text-red-400 font-bold mt-0.5">•</span>
                        <span>{chal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. Critical Skills & Capabilities */}
                <div className="p-5 rounded-xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-mono uppercase tracking-wider">
                    <Brain className="w-4 h-4" />
                    <span>Required Core Capabilities</span>
                  </div>
                  <ul className="space-y-2.5">
                    {selectedScenario.criticalSkills.map((skill, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2.5 leading-relaxed font-light">
                        <span className="text-sky-400 font-bold mt-0.5">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Milestones Sequence */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
                      MILESTONES SEQUENCE
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-white tracking-wide">
                      Sequential Execution Pathway
                    </h3>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                    Click to commit milestone to My Timeline
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedScenario.milestones.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-xl bg-obsidian-900 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-3 shadow-luxury-sm"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-obsidian-950 border border-white/10 text-slate-300">
                            {m.timeframe}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {m.status === 'achieved' ? 'Achieved' : m.status === 'in_progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-white">{m.title}</h4>
                        <p className="text-xs text-slate-400 font-light leading-relaxed">
                          {m.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/[0.04] flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleCommitMilestone(m, selectedScenario.title)}
                          className="text-[10.5px] text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Commit to Timeline</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SIMULATE NEW FORK MODAL */}
          <Modal
            isOpen={isSimulatingModalOpen}
            onClose={() => setIsSimulatingModalOpen(false)}
            title="Model a New Decision Bifurcation"
            subtitle="Input a career fork, venture pivot, or life transition to synthesize 3 alternative possibilities."
            maxWidth="xl"
          >
            <form onSubmit={handleSimulateNewFork} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Dilemma Title</label>
                <input
                  type="text"
                  value={dilemmaTitle}
                  onChange={(e) => setDilemmaTitle(e.target.value)}
                  placeholder="e.g. Relocating to Tokyo to launch an Asian AI research lab vs. Remaining in Zurich"
                  className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Context & Key Stakes</label>
                <textarea
                  rows={3}
                  value={contextDescription}
                  onChange={(e) => setContextDescription(e.target.value)}
                  placeholder="Provide background on the partners involved, capital requirements, and personal motivations..."
                  className="w-full p-3.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white leading-relaxed font-light"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Time Horizon</label>
                  <select
                    value={timeHorizon}
                    onChange={(e) => setTimeHorizon(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white font-mono"
                  >
                    <option value="1-2 years">1-2 years (Tactical)</option>
                    <option value="3-5 years">3-5 years (Strategic)</option>
                    <option value="5-10 years">5-10 years (Generational)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Core Tension / Trade-off</label>
                  <input
                    type="text"
                    value={coreTradeoff}
                    onChange={(e) => setCoreTradeoff(e.target.value)}
                    placeholder="e.g. Family stability vs. Uncapped growth"
                    className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-white/[0.08]">
                <Button variant="ghost" type="button" onClick={() => setIsSimulatingModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="silver"
                  type="submit"
                  isLoading={isGenerating}
                  leftIcon={<Sparkles className="w-4 h-4 text-obsidian-950" />}
                >
                  Synthesize Scenarios
                </Button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  );
}
