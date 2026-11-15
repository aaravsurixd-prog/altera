'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { Sparkles, Eye, EyeOff, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup, enterDemoMode } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = calculateStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !fullName) {
      setError('Please fill in all requested fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const res = await signup(email, password, fullName);
    setIsLoading(false);

    if (res.success) {
      router.push('/onboarding');
    } else {
      setError(res.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative z-10 bg-obsidian-950 text-slate-100">
      <div className="w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center font-mono font-medium text-white text-base shadow-luxury-sm">
              Λ
            </div>
            <span className="font-semibold text-lg tracking-[0.2em] text-white uppercase font-sans">
              ALTERA
            </span>
          </Link>
          <h2 className="text-2xl font-light tracking-tight text-white pt-2 editorial-serif">
            Establish Your Identity
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Begin the calibration of your personal intelligence and future projections.
          </p>
        </div>

        {/* Demo Fast Track Callout */}
        <div className="p-3.5 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-between gap-3 shadow-luxury-sm specular-top">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Skip Registration</span>
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              Test drive the platform with pre-populated Elena Vance profile.
            </p>
          </div>
          <button
            onClick={enterDemoMode}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-obsidian-950 font-semibold text-xs transition-colors cursor-pointer shadow-luxury-sm"
          >
            Instant Demo
          </button>
        </div>

        {/* Card */}
        <div className="altera-card rounded-2xl p-7 border border-white/10 space-y-5 specular-top shadow-luxury-md">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Full Name / Pseudonym</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Julian Vance"
                className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Primary Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Secure Passphrase</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength indicators */}
              {password.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="grid grid-cols-4 gap-1 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full rounded-full transition-colors ${
                          strength >= step
                            ? strength >= 3
                              ? 'bg-emerald-400'
                              : 'bg-white'
                            : 'bg-obsidian-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[9.5px] text-slate-400 font-mono uppercase tracking-wider">
                    {strength <= 1 ? 'Fragile' : strength === 2 ? 'Adequate' : strength === 3 ? 'Resilient' : 'Optimal Cryptographic Strength'}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="silver"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Continue to Calibration →
            </Button>
          </form>

          <div className="pt-3 border-t border-white/[0.06] text-center text-xs text-slate-400 font-light">
            Already calibrated?{' '}
            <Link href="/login" className="text-white hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center text-[10.5px] font-mono text-slate-500 leading-relaxed uppercase">
          Zero Data Harvesting Guarantee // Cryptographic Isolation
        </div>
      </div>
    </div>
  );
}
