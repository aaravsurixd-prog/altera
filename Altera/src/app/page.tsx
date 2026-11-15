'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { MetricBar } from '@/components/ui/MetricBar';
import { DimensionalMultiverse } from '@/components/visuals/DimensionalMultiverse';
import { NeuralHarmonicCore } from '@/components/visuals/NeuralHarmonicCore';
import { FutureLabCoordinates } from '@/components/visuals/FutureLabCoordinates';
import { useAuth } from '@/lib/auth-context';
import {
  Sparkles,
  Compass,
  Brain,
  GitBranch,
  Shield,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Terminal,
  Activity,
  Layers,
  Scale,
  Zap,
  Cpu
} from 'lucide-react';

const HERO_SIMULATIONS = [
  {
    id: 'studio',
    label: 'Branch 01: The Sovereign Venture Studio',
    archetype: 'The Exponential Builder',
    tagline: 'High equity leverage, fast feedback loops, and 100% architectural autonomy.',
    metrics: { growth: 94, risk: 78, autonomy: 92, balance: 44, impact: 91 },
    bifurcation: 'Trades short-term psychological stability for unbounded compound equity.',
    quote: '“I would rather endure the turbulent uncertainty of my own thesis than execute someone else’s committee compromise.”',
    coordinates: 'BRANCH // 01.A',
  },
  {
    id: 'titan',
    label: 'Branch 02: Frontier Research Lead',
    archetype: 'The Scale Commander',
    tagline: 'Direct command over petascale compute clusters and planetary distribution.',
    metrics: { growth: 82, risk: 34, autonomy: 42, balance: 64, impact: 98 },
    bifurcation: 'Trades calendar sovereignty and IP ownership for massive immediate reach.',
    quote: '“Deploying breakthroughs to 200 million people on day one is worth the friction of organizational diplomacy.”',
    coordinates: 'BRANCH // 02.B',
  },
  {
    id: 'polymath',
    label: 'Branch 03: Autonomous Polymath',
    archetype: 'The Free Radical',
    tagline: 'Monastic 4-hour morning focus, alpine living, and boutique strategic retainers.',
    metrics: { growth: 72, risk: 24, autonomy: 99, balance: 96, impact: 80 },
    bifurcation: 'Trades corporate status games for absolute biological and temporal freedom.',
    quote: '“Your calendar is your only actual philosophy. Everything else is conversational noise.”',
    coordinates: 'BRANCH // 03.C',
  },
];

const FAQS = [
  {
    question: 'How does Second Self differ from generic conversational AI?',
    answer: 'Generic assistants lack memory of who you are, what compromises you regret, or how your mind operates at peak velocity. Second Self is anchored in a sovereign cryptographic memory vault containing your core values, recorded life lessons, work preferences, and non-negotiables. It does not offer polite encouragement; it acts as a hyper-reflective intellectual sparring partner that holds you accountable to your own principles.',
  },
  {
    question: 'Why does Future You model "possibilities" rather than predictions?',
    answer: 'The future is a complex adaptive system, not a predetermined railway track. Claiming to forecast exact life outcomes is epistemic malpractice. Instead, Future You treats long-horizon decisions as dynamic branching cones of probability. It illuminates the unexamined trade-offs, systemic challenges, critical skill acquisitions, and milestones required for each trajectory—giving you sovereign agency over which possibility you choose to actualize.',
  },
  {
    question: 'Who owns and controls my memories and decision data?',
    answer: 'You do, exclusively. Altera was built from the ground up on principles of digital sovereignty. Every memory has an explicit privacy state (Active, Locked, Quarantined) and can be modified or permanently expunged at any instant. Your data is isolated via Row Level Security (RLS) and is never used to train public foundational models.',
  },
  {
    question: 'Can I test Altera immediately without configuring API keys?',
    answer: 'Yes. Altera features an embedded deterministic heuristic cognitive engine that synthesizes realistic, high-signal, multi-dimensional scenarios immediately. You can also securely attach your own Google Gemini, OpenAI, or Anthropic API keys in server environment variables to connect live frontier intelligence.',
  },
];

export default function LandingPage() {
  const { enterDemoMode } = useAuth();
  const [activeSimIndex, setActiveSimIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activeSim = HERO_SIMULATIONS[activeSimIndex];

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950 text-slate-100 overflow-x-hidden selection:bg-violet-600 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* CINEMATIC HERO SECTION */}
        <section className="relative px-4 sm:px-6 lg:px-8 pt-12 pb-24 md:pt-24 md:pb-36 overflow-hidden">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-electric-violet/[0.05] rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-ice-accent/[0.035] rounded-full blur-[130px] pointer-events-none" />

          <div className="max-w-7xl mx-auto space-y-12 relative z-10">
            {/* Top Telemetry Tag */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 text-[10.5px] font-mono text-slate-300 shadow-luxury-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ice-accent animate-pulse" />
                <span className="tracking-[0.16em] uppercase">
                  PERSONAL INTELLIGENCE & FUTURE ARCHITECTURE
                </span>
                <span className="text-slate-600">//</span>
                <span className="text-violet-300 font-semibold">V2.4 LUXURY</span>
              </motion.div>
            </div>

            {/* Main Editorial Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-6 max-w-4xl mx-auto text-center"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white editorial-title">
                Become more than{' '}
                <span className="editorial-italic font-normal bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  one possibility.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
                Most people live an unexamined default trajectory. Altera provides the personal intelligence to interrogate your cognitive principles and simulate the lives you haven&rsquo;t lived yet.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <button
                onClick={enterDemoMode}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-b from-white via-slate-100 to-slate-200 hover:from-white hover:to-slate-100 text-obsidian-950 font-semibold text-sm shadow-luxury-lg border border-white/80 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <span>Enter Instant Platform</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <Link href="/signup" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full">
                  Create Sovereign Profile
                </Button>
              </Link>
            </motion.div>

            {/* BESPOKE 3D TRAJECTORY LAB WIDGET */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="pt-8 max-w-6xl mx-auto"
            >
              <div className="rounded-2xl border border-white/10 bg-obsidian-900/90 backdrop-blur-2xl p-6 sm:p-9 shadow-luxury-lg relative overflow-hidden specular-top">
                {/* Header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa] animate-pulse" />
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Multiverse Trajectory Lab // Active
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                        3-5 Year Decision Bifurcation Matrix
                      </span>
                    </div>
                  </div>

                  {/* Brushed Silver & Obsidian Selector */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-950 border border-white/[0.08] overflow-x-auto shadow-inner">
                    {HERO_SIMULATIONS.map((sim, idx) => (
                      <button
                        key={sim.id}
                        onClick={() => setActiveSimIndex(idx)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 cursor-pointer ${
                          activeSimIndex === idx
                            ? 'bg-white/[0.14] text-white font-semibold border border-white/20 shadow-luxury-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {sim.coordinates}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Grid with 3D Multiverse Canvas */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
                  {/* Left Column: Archetype Details */}
                  <div className="lg:col-span-4 space-y-5">
                    <div className="flex items-center gap-2">
                      <Badge variant={activeSimIndex === 0 ? 'violet' : activeSimIndex === 1 ? 'ice' : 'silver'} size="sm">
                        {activeSim.archetype}
                      </Badge>
                      <span className="text-[10px] font-mono text-slate-500">
                        {activeSim.coordinates}
                      </span>
                    </div>

                    <h3 className="text-2xl font-light text-white tracking-tight editorial-serif">
                      {activeSim.label}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {activeSim.tagline}
                    </p>

                    <div className="p-4 rounded-xl bg-obsidian-950/70 border border-white/[0.06] space-y-1.5">
                      <span className="text-[9.5px] font-mono uppercase tracking-widest text-slate-500 block">
                        Structural Bifurcation
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {activeSim.bifurcation}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 italic editorial-serif border-t border-white/[0.06] pt-3">
                      {activeSim.quote}
                    </div>
                  </div>

                  {/* Center Column: Interactive 3D Dimensional Multiverse */}
                  <div className="lg:col-span-4 h-64 sm:h-72 flex items-center justify-center relative rounded-2xl bg-obsidian-950/50 border border-white/[0.04]">
                    <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-500 tracking-wider">
                      INTERACTIVE 3D ORBITAL // DRAG TO ROTATE
                    </div>
                    <DimensionalMultiverse activePathIndex={activeSimIndex} />
                  </div>

                  {/* Right Column: Precision Gauge */}
                  <div className="lg:col-span-4 bg-obsidian-950/80 p-5 rounded-xl border border-white/[0.08] space-y-3.5 shadow-luxury-sm">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        Telemetry Indices
                      </span>
                      <span className="text-[10px] font-mono text-ice-accent">Simulated</span>
                    </div>

                    <MetricBar
                      label="Financial & Equity Growth"
                      value={activeSim.metrics.growth}
                      color="violet"
                      description="Compounding"
                    />
                    <MetricBar
                      label="Existential & Market Risk"
                      value={activeSim.metrics.risk}
                      color="amber"
                      description="Volatility"
                    />
                    <MetricBar
                      label="Calendar & Strategic Autonomy"
                      value={activeSim.metrics.autonomy}
                      color="ice"
                      description="Sovereignty"
                    />
                    <MetricBar
                      label="Biological & Restorative Balance"
                      value={activeSim.metrics.balance}
                      color="emerald"
                      description="Longevity"
                    />
                    <MetricBar
                      label="Societal & Systemic Impact"
                      value={activeSim.metrics.impact}
                      color="silver"
                      description="Reach"
                    />

                    <div className="pt-2 text-center">
                      <button
                        onClick={enterDemoMode}
                        className="text-xs text-slate-300 hover:text-white font-mono flex items-center justify-center gap-1 mx-auto cursor-pointer"
                      >
                        Inspect branch in platform →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BRAND MANIFESTO SECTION */}
        <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-obsidian-900/40 relative">
          <div className="max-w-5xl mx-auto space-y-10 text-center">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400">
              MANIFESTO // 01
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight editorial-title max-w-3xl mx-auto">
              We do not predict the future.{' '}
              <span className="editorial-italic text-slate-400">
                We illuminate its geometry.
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-light">
              Conventional life path decisions are made in emotional fog, dictated by inherited scorecards, prestige traps, and fear of divergence. Altera gives you the instruments to navigate with crystalline clarity.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                <span className="text-xs font-mono text-violet-400">01 // REASONING</span>
                <h4 className="text-base font-medium text-white">Private Cognitive Memory</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  A personal intelligence that understands your non-negotiables, past pivots, and mental models—holding you accountable to your own philosophy.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                <span className="text-xs font-mono text-sky-400">02 // EXPLORATION</span>
                <h4 className="text-base font-medium text-white">Tri-Branch Divergence</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Simulate high-leverage venture forks, institutional mandates, and decoupled polymath lifestyles before committing irrecoverable decades.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-3">
                <span className="text-xs font-mono text-slate-300">03 // SOVEREIGNTY</span>
                <h4 className="text-base font-medium text-white">Zero Data Harvesting</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Complete user-level isolation, air-gapped memory controls, and full data portability. Your cognition is your sovereign asset.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE PLATFORMS: SECOND SELF & FUTURE YOU */}
        <section id="second-self" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-obsidian-950">
          <div className="max-w-7xl mx-auto space-y-24">
            {/* Platform 1: SECOND SELF */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-violet-400 tracking-wider">PILLAR I</span>
                  <Badge variant="violet" size="sm">Cognitive Companion</Badge>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight editorial-serif">
                  Second Self:{' '}
                  <span className="editorial-italic text-violet-300">Your Epistemic Sparring Partner</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Second Self is not a sycophantic chatbot. It is constructed strictly upon your documented principles, past pivotal lessons, and calendar non-negotiables. It actively challenges your cognitive biases, highlights hidden ego traps, and references your past experiences before you make costly compromises.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span><strong>Sovereign Memory Vault:</strong> Organize values, beliefs, and experiences with 3-tier privacy isolation (Active, Locked, Quarantined).</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                    <span><strong>Epistemic Sparring:</strong> Rigorous reflection notes that cite exact memory vectors behind every perspective.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/second-self">
                    <Button variant="silver" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Enter Second Self Environment
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Bespoke Visual Mockup: Neural Resonance Environment */}
              <div className="lg:col-span-6">
                <div className="altera-card rounded-2xl p-7 border border-white/10 space-y-5 specular-top">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        Cognitive Reflection Session
                      </span>
                    </div>
                    <Badge variant="violet" size="sm">Active Mesh</Badge>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <NeuralHarmonicCore size="md" />
                  </div>

                  <div className="p-4 rounded-xl bg-obsidian-950 border border-white/[0.06] space-y-2">
                    <div className="text-[10px] font-mono text-violet-400 uppercase">
                      ↳ Epistemic Note // Second Self
                    </div>
                    <p className="text-xs text-slate-300 italic editorial-serif leading-relaxed">
                      &ldquo;You are currently rationalizing a compromise on calendar sovereignty for institutional prestige. Remember Memory #1: uninterrupted 4-hour morning focus has yielded 100% of your breakthrough output.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform 2: FUTURE YOU */}
            <div id="future-you" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Bespoke Visual Mockup: Future Lab Coordinates */}
              <div className="lg:col-span-6 order-2 lg:order-1">
                <div className="altera-card rounded-2xl p-7 border border-white/10 space-y-5 specular-top">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                        Possibility Simulator // Lab Mode
                      </span>
                    </div>
                    <Badge variant="ice" size="sm">3 Branches</Badge>
                  </div>

                  <FutureLabCoordinates />

                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono pt-1">
                    <div className="p-2 rounded bg-obsidian-950 border border-white/[0.06]">
                      <span className="text-violet-400 block font-semibold">PATH A</span>
                      <span className="text-slate-400">Venture Sovereign</span>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950 border border-white/[0.06]">
                      <span className="text-sky-400 block font-semibold">PATH B</span>
                      <span className="text-slate-400">Titan Research</span>
                    </div>
                    <div className="p-2 rounded bg-obsidian-950 border border-white/[0.06]">
                      <span className="text-slate-200 block font-semibold">PATH C</span>
                      <span className="text-slate-400">Free Radical</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-sky-400 tracking-wider">PILLAR II</span>
                  <Badge variant="ice" size="sm">Possibility Simulator</Badge>
                </div>

                <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight editorial-serif">
                  Future You:{' '}
                  <span className="editorial-italic text-sky-300">The Exploration Laboratory</span>
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Input any high-stakes career or life dilemma. Receive 3 deeply synthesized divergent scenarios—revealing the exact asymmetric opportunities, unavoidable trade-offs, systemic fragilities, and required capabilities for each.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Tri-Branch Divergence:</strong> Models exponential venture paths, scale institutional mandates, and decoupled polymath lifestyles simultaneously.</span>
                  </div>
                  <div className="flex items-start gap-3 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span><strong>Parallel Lives Matrix:</strong> Compare paths side-by-side across Growth, Risk, Autonomy, Balance, and Impact.</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/future-you">
                    <Button variant="ice" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Explore Possibility Lab
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHODOLOGY & CHARTER */}
        <section id="methodology" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-obsidian-900/30">
          <div className="max-w-4xl mx-auto space-y-12 text-center">
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                EPISTEMIC HUMILITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight editorial-serif">
                Possibility, Never Deterministic Prophecy.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
                We believe that claiming to predict the future is digital astrology. Altera provides the structural instruments so that you exercise uncompromised human agency.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-2">
                <span className="text-xs font-mono text-violet-400">01 // CONE OF AGENCY</span>
                <h4 className="text-sm font-semibold text-white">Expand Peripheral Vision</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Illuminates high-upside paths that you would otherwise prematurely discount due to short-term peer conformity.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-2">
                <span className="text-xs font-mono text-sky-400">02 // TRADE-OFF CLARITY</span>
                <h4 className="text-sm font-semibold text-white">Make The Cost Explicit</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Every exceptional path extracts a price. If you choose planetary scale, you pay in calendar friction. We illuminate the cost before you pay it.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-obsidian-900 border border-white/[0.08] space-y-2">
                <span className="text-xs font-mono text-slate-300">03 // SEQUENTIAL EXECUTION</span>
                <h4 className="text-sm font-semibold text-white">Living Milestones</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed">
                  Commit preferred possibility milestones directly into your roadmap timeline to turn abstract dreams into irreversible execution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INQUIRIES & FAQ */}
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-obsidian-950">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400">
                CLARITY // FAQ
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight editorial-serif">
                Architectural Inquiries
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/[0.08] bg-obsidian-900/60 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] cursor-pointer"
                    >
                      <span className="text-sm font-medium text-white tracking-wide">{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-white' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3 font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CINEMATIC FINAL CTA */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] relative overflow-hidden text-center bg-obsidian-900/50">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <Badge variant="silver" size="sm">
              Sovereign Access // Open
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight editorial-title">
              Ready to explore your{' '}
              <span className="editorial-italic text-slate-300">alternative futures?</span>
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light">
              Step into the platform right now. Review pre-loaded strategic vectors or input your own pivotal life fork.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={enterDemoMode}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-obsidian-950 font-semibold text-sm shadow-luxury-lg border border-white/80 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Launch Instant Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Initialize Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
