'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Compass,
  Brain,
  ShieldCheck,
  Target,
  Sliders,
  CheckCircle2
} from 'lucide-react';

const VALUE_OPTIONS = [
  'Intellectual Sovereignty',
  'Long-Term Compounding',
  'Aesthetic Rigor',
  'High-Agency Creation',
  'Deep Biological Health',
  'Temporal Autonomy',
  'Small Elite Cohorts',
  'Unfiltered Candor',
  'Monastic Focus',
  'Global Societal Impact'
];

const SKILL_OPTIONS = [
  'Systems Architecture',
  '0-to-1 Venture Incubation',
  'Frontier AI & Cognitive Models',
  'Capital Allocation & Strategy',
  'High-Leverage Writing & Synthesis',
  'Cross-Disciplinary Translation',
  'Deep Technical Engineering',
  'Product Design & Aesthetics',
  'Negotiation & Coalition Building',
  'Alpine / Physical Resilience'
];

const INTEREST_OPTIONS = [
  'Autonomous AI Agents',
  'Decoupled Polymath Living',
  'Philosophy of Mind & Epistemology',
  'Frontier Biotech & Longevity',
  'Micro-Venture Studios',
  'Decentralized Protocols & DAOs',
  'Generative Creative Mediums',
  'High-Stakes Crisis Decision-Making'
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, updateOnboarding, addMemory } = useAuth();

  const [step, setStep] = useState(1);
  const [selectedValues, setSelectedValues] = useState<string[]>([
    'Intellectual Sovereignty',
    'Long-Term Compounding',
    'Aesthetic Rigor'
  ]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Systems Architecture',
    'Frontier AI & Cognitive Models',
    'High-Leverage Writing & Synthesis'
  ]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Autonomous AI Agents',
    'Micro-Venture Studios'
  ]);
  const [riskTolerance, setRiskTolerance] = useState<'conservative' | 'balanced' | 'aggressive' | 'non-linear'>('aggressive');
  const [horizonYears, setHorizonYears] = useState(5);
  const [decisionStyle, setDecisionStyle] = useState<'analytical' | 'intuitive' | 'hybrid' | 'experimental'>('hybrid');
  const [aspirationText, setAspirationText] = useState(
    'Found an enduring autonomous research lab and achieve complete calendar sovereignty by 2030.'
  );
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleComplete = async () => {
    setIsSynthesizing(true);

    // Save onboarding preferences
    updateOnboarding({
      coreValues: selectedValues,
      primaryInterests: selectedInterests,
      topSkills: selectedSkills,
      lifeAspirations: [aspirationText],
      riskTolerance,
      horizonYears,
      decisionStyle,
      completed: true,
    });

    // Seed Second Self with initial memory from onboarding values
    addMemory({
      category: 'values',
      title: 'Foundational Operating Principles (Calibration Seed)',
      content: `Core Values: ${selectedValues.join(', ')}. Stated high-horizon ambition: "${aspirationText}". Risk tolerance: ${riskTolerance}. Horizon: ${horizonYears} years.`,
      confidenceScore: 0.99,
      privacyLevel: 'active',
      tags: ['onboarding', 'core-values', 'seed-calibration'],
    });

    // Simulate synthesis pause for premium feel
    setTimeout(() => {
      setIsSynthesizing(false);
      router.push('/dashboard');
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative z-10 bg-obsidian-950 text-slate-100">
      <div className="w-full max-w-2xl space-y-8">
        {/* Top Progress Tracker */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ice-accent animate-pulse" />
              <span>CALIBRATION PROTOCOL</span>
            </span>
            <span className="tracking-widest">STAGE {step} // 4</span>
          </div>
          <div className="grid grid-cols-4 gap-2 h-1 bg-obsidian-900 rounded-full overflow-hidden p-0 border border-white/[0.08]">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-full rounded-full transition-all duration-300 ${
                  step >= s ? 'bg-gradient-to-r from-violet-500 via-sky-400 to-white' : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Card Container */}
        <div className="altera-card rounded-2xl p-7 sm:p-9 border border-white/10 relative overflow-hidden specular-top shadow-luxury-md">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Badge variant="silver" size="sm">Step 01 // Epistemic Principles</Badge>
                  <h2 className="text-2xl font-light text-white tracking-tight editorial-serif">
                    Select Your Sovereign Values
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    Your Second Self will use these to audit your future choices against self-deception. Select 3 to 5 principles.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {VALUE_OPTIONS.map((val) => {
                    const isSelected = selectedValues.includes(val);
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => toggleItem(selectedValues, setSelectedValues, val)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white/[0.12] border-white/30 text-white shadow-luxury-sm'
                            : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/15'
                        }`}
                      >
                        <span className="font-light tracking-wide">{val}</span>
                        {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    variant="silver"
                    onClick={() => setStep(2)}
                    disabled={selectedValues.length === 0}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Proceed to Capabilities
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Badge variant="ice" size="sm">Step 02 // Domains & Capabilities</Badge>
                  <h2 className="text-2xl font-light text-white tracking-tight editorial-serif">
                    Map Your High-Leverage Capabilities
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    Future You models which capabilities unlock disproportionate asymmetry in divergent futures.
                  </p>
                </div>

                <div className="space-y-4 pt-1">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                      Primary Leverage Skills
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SKILL_OPTIONS.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleItem(selectedSkills, setSelectedSkills, skill)}
                            className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono ${
                              isSelected
                                ? 'bg-sky-950/70 border-sky-400/50 text-sky-200'
                                : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-2">
                      Exploratory Domains
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INTEREST_OPTIONS.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleItem(selectedInterests, setSelectedInterests, interest)}
                            className={`px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer font-mono ${
                              isSelected
                                ? 'bg-electric-violet/20 border-violet-400/50 text-violet-200'
                                : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.06]">
                  <Button variant="ghost" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="silver" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Configure Horizons
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Badge variant="violet" size="sm">Step 03 // Horizons & Risk Calibration</Badge>
                  <h2 className="text-2xl font-light text-white tracking-tight editorial-serif">
                    Calibrate Temporal Horizon & Risk
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    Defines how aggressively scenarios will diverge from orthodox career paths.
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  {/* Time Horizon Slider */}
                  <div className="space-y-2 bg-obsidian-950 p-4 rounded-xl border border-white/[0.08]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">Trajectory Planning Horizon</span>
                      <span className="font-mono text-white font-semibold">{horizonYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={horizonYears}
                      onChange={(e) => setHorizonYears(parseInt(e.target.value))}
                      className="w-full accent-white cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>1 Year (Tactical)</span>
                      <span>5 Years (Strategic)</span>
                      <span>10 Years (Generational)</span>
                    </div>
                  </div>

                  {/* Risk Profile Selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                      Risk & Variance Appetite
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'conservative', label: 'Conservative', desc: 'Predictable downside' },
                        { id: 'balanced', label: 'Balanced', desc: 'Steady compounding' },
                        { id: 'aggressive', label: 'Aggressive', desc: 'High asymmetry' },
                        { id: 'non-linear', label: 'Non-Linear', desc: 'Extreme variance' },
                      ].map((risk) => (
                        <button
                          key={risk.id}
                          type="button"
                          onClick={() => setRiskTolerance(risk.id as any)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            riskTolerance === risk.id
                              ? 'bg-white/[0.12] border-white/30 text-white shadow-luxury-sm'
                              : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-white'
                          }`}
                        >
                          <div className="text-xs font-semibold">{risk.label}</div>
                          <div className="text-[9.5px] text-slate-400 mt-0.5">{risk.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Decision Style */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                      Epistemic Decision Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'analytical', label: 'Analytical' },
                        { id: 'intuitive', label: 'Intuitive' },
                        { id: 'hybrid', label: 'Hybrid' },
                        { id: 'experimental', label: 'Experimental' },
                      ].map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setDecisionStyle(style.id as any)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-mono transition-all cursor-pointer ${
                            decisionStyle === style.id
                              ? 'bg-sky-950/70 border-sky-400/60 text-sky-200 shadow-luxury-sm'
                              : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-white'
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.06]">
                  <Button variant="ghost" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="silver" onClick={() => setStep(4)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Final Aspiration
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Badge variant="silver" size="sm">Step 04 // Synthesis Seed</Badge>
                  <h2 className="text-2xl font-light text-white tracking-tight editorial-serif">
                    What Is Your Defining Long-Horizon Ambition?
                  </h2>
                  <p className="text-xs text-slate-400 font-light">
                    Articulate the north star you would attempt if reputational failure were stripped of social stigma.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <textarea
                    rows={4}
                    value={aspirationText}
                    onChange={(e) => setAspirationText(e.target.value)}
                    placeholder="e.g. Build an enduring sovereign intelligence collective and achieve total calendar autonomy."
                    className="w-full p-4 rounded-xl bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 leading-relaxed font-light"
                  />
                  <div className="text-[10px] text-slate-500 font-mono">
                    This forms the immutable anchor for your Second Self reflection matrix.
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/[0.06]">
                  <Button variant="ghost" onClick={() => setStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button
                    variant="silver"
                    onClick={handleComplete}
                    isLoading={isSynthesizing}
                    leftIcon={<Sparkles className="w-4 h-4 text-obsidian-950" />}
                  >
                    {isSynthesizing ? 'Calibrating Neural Matrix...' : 'Complete Calibration'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
