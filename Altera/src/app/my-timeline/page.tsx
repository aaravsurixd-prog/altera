'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '@/lib/auth-context';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { TimelineGoal } from '@/types';
import {
  CalendarRange,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  Sparkles,
  Sliders,
  Filter,
  Check,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function MyTimelinePage() {
  const { timelineGoals, addTimelineGoal, updateTimelineGoal, deleteTimelineGoal } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Milestone Form State
  const [goalTitle, setGoalTitle] = useState('');
  const [goalDesc, setGoalDesc] = useState('');
  const [goalTimeframe, setGoalTimeframe] = useState('Q1 2027');
  const [goalCategory, setGoalCategory] = useState<'career' | 'craft' | 'wellness' | 'intellect' | 'connection'>('career');
  const [dueDate, setDueDate] = useState('2027-03-31');

  const filteredGoals =
    selectedCategory === 'all'
      ? timelineGoals
      : timelineGoals.filter((g) => g.category === selectedCategory);

  const completedCount = timelineGoals.filter((g) => g.status === 'achieved').length;
  const progressPercentage = timelineGoals.length > 0 ? Math.round((completedCount / timelineGoals.length) * 100) : 0;

  const toggleGoalStatus = (goal: TimelineGoal) => {
    let nextStatus: 'not_started' | 'in_progress' | 'achieved' = 'in_progress';
    let nextPct = 50;

    if (goal.status === 'not_started') {
      nextStatus = 'in_progress';
      nextPct = 50;
    } else if (goal.status === 'in_progress') {
      nextStatus = 'achieved';
      nextPct = 100;
      // Confetti burst on achievement!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7c3aed', '#38bdf8', '#ffffff', '#cbd5e1'],
      });
    } else {
      nextStatus = 'not_started';
      nextPct = 0;
    }

    updateTimelineGoal(goal.id, {
      status: nextStatus,
      progressPct: nextPct,
    });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    addTimelineGoal({
      title: goalTitle,
      description: goalDesc,
      targetTimeframe: goalTimeframe,
      category: goalCategory,
      status: 'not_started',
      progressPct: 0,
      dueDate,
    });

    setIsAddModalOpen(false);
    setGoalTitle('');
    setGoalDesc('');
  };

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-slate-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="My Timeline"
          subtitle="Multi-horizon execution roadmap & trajectory milestone tracking"
        />

        <main className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {/* Top Progress Dashboard */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-obsidian-900 to-obsidian-850 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 specular-top shadow-luxury-md">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="silver" size="sm" dot>
                  Roadmap Velocity
                </Badge>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                  {completedCount} OF {timelineGoals.length} MILESTONES COMPLETED
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight editorial-serif">
                Living Trajectory Roadmap
              </h1>
              <p className="text-xs text-slate-300 font-light max-w-xl leading-relaxed">
                Translate possibility branches into irreversible temporal execution. Track milestones across near-term sprints and long-horizon sovereign targets.
              </p>
            </div>

            <div className="flex items-center gap-5 shrink-0">
              <div className="text-right">
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-400 block">
                  Trajectory Completion
                </span>
                <span className="text-3xl font-light font-mono text-white">
                  {progressPercentage}%
                </span>
              </div>
              <Button
                variant="silver"
                size="md"
                onClick={() => setIsAddModalOpen(true)}
                leftIcon={<Plus className="w-4 h-4 text-obsidian-950" />}
              >
                Add Milestone
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-1 text-xs">
            <div className="flex items-center gap-2">
              {[
                { id: 'all', label: 'All Horizons' },
                { id: 'career', label: 'Venture & Career' },
                { id: 'craft', label: 'Deep Craft' },
                { id: 'intellect', label: 'Intellectual Synthesis' },
                { id: 'wellness', label: 'Endurance & Vitality' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-[10.5px] uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white/[0.12] text-white border-white/20 font-semibold shadow-luxury-sm'
                      : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Click status icon to advance: Not Started → In Progress → Achieved
            </span>
          </div>

          {/* Milestones Chronological Grid / Timeline */}
          <div className="space-y-4">
            {filteredGoals.map((goal, idx) => {
              const isAchieved = goal.status === 'achieved';
              const isInProgress = goal.status === 'in_progress';

              return (
                <div
                  key={goal.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-luxury-sm ${
                    isAchieved
                      ? 'bg-obsidian-900/60 border-emerald-500/20'
                      : isInProgress
                      ? 'bg-obsidian-900 border-white/20 shadow-luxury-md'
                      : 'bg-obsidian-900/40 border-white/[0.08]'
                  }`}
                >
                  {/* Left: Timeframe & Status Toggle Button */}
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={() => toggleGoalStatus(goal)}
                      title="Click to advance status"
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all cursor-pointer mt-0.5 shadow-luxury-sm ${
                        isAchieved
                          ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                          : isInProgress
                          ? 'bg-obsidian-850 border-white/30 text-white'
                          : 'bg-obsidian-950 border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20'
                      }`}
                    >
                      {isAchieved ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : isInProgress ? (
                        <Clock className="w-4 h-4 text-violet-400" />
                      ) : (
                        <span className="text-xs font-mono">{idx + 1}</span>
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-obsidian-950 text-slate-300 border border-white/[0.06]">
                          {goal.targetTimeframe}
                        </span>
                        <span className="text-[9.5px] font-mono text-slate-400 uppercase">
                          {goal.category}
                        </span>
                        {goal.scenarioTitle && (
                          <span className="text-[9.5px] font-mono text-violet-400">
                            ↳ {goal.scenarioTitle}
                          </span>
                        )}
                      </div>

                      <h3
                        className={`text-sm sm:text-base font-semibold tracking-wide transition-all ${
                          isAchieved ? 'text-slate-400 line-through opacity-70' : 'text-white'
                        }`}
                      >
                        {goal.title}
                      </h3>

                      <p className="text-xs text-slate-400 font-light leading-relaxed max-w-2xl">
                        {goal.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Progress Meter & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/[0.04]">
                    <div className="w-28 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Progress</span>
                        <span
                          className={
                            isAchieved
                              ? 'text-emerald-400'
                              : isInProgress
                              ? 'text-violet-300'
                              : 'text-slate-400'
                          }
                        >
                          {goal.progressPct}%
                        </span>
                      </div>
                      <div className="w-full h-1 bg-obsidian-950 rounded-full overflow-hidden border border-white/[0.06]">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isAchieved
                              ? 'bg-emerald-400'
                              : isInProgress
                              ? 'bg-gradient-to-r from-violet-500 to-sky-400'
                              : 'bg-slate-700'
                          }`}
                          style={{ width: `${goal.progressPct}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleGoalStatus(goal)}
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                        isAchieved
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                          : isInProgress
                          ? 'bg-violet-950/60 text-violet-300 border-violet-500/30'
                          : 'bg-obsidian-850 text-slate-400 border-white/5'
                      }`}
                    >
                      {isAchieved ? 'Achieved' : isInProgress ? 'In Progress' : 'Pending'}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteTimelineGoal(goal.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded hover:bg-white/[0.05] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ADD MILESTONE MODAL */}
          <Modal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            title="Design New Roadmap Milestone"
            subtitle="Add a sequential target to guide your chosen trajectory."
          >
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Milestone Title</label>
                <input
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  placeholder="e.g. Complete Monograph Draft & Release Alpha Protocol"
                  className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Timeframe</label>
                  <input
                    type="text"
                    value={goalTimeframe}
                    onChange={(e) => setGoalTimeframe(e.target.value)}
                    placeholder="e.g. Q2 2027 or Month 6"
                    className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white font-mono"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Category</label>
                  <select
                    value={goalCategory}
                    onChange={(e) => setGoalCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white font-mono"
                  >
                    <option value="career">Venture & Career</option>
                    <option value="craft">Deep Craft</option>
                    <option value="intellect">Intellectual Synthesis</option>
                    <option value="wellness">Endurance & Vitality</option>
                    <option value="connection">Connection</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Description & Success Metric</label>
                <textarea
                  rows={3}
                  value={goalDesc}
                  onChange={(e) => setGoalDesc(e.target.value)}
                  placeholder="What is the non-negotiable definition of success for this milestone?"
                  className="w-full p-3.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white leading-relaxed font-light"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-white/[0.08]">
                <Button variant="ghost" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="silver" type="submit">
                  Anchor Milestone
                </Button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  );
}
