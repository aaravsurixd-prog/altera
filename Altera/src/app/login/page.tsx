'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, ArrowRight, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, enterDemoMode } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide your email and credentials.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative z-10 bg-obsidian-950 text-slate-100">
      <div className="w-full max-w-md space-y-8">
        {/* Brand header */}
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
            Access Your Intelligence Core
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Sign in to synchronize with your Second Self and future trajectories.
          </p>
        </div>

        {/* Demo Fast Track Callout */}
        <div className="p-4 rounded-xl bg-obsidian-900 border border-white/10 flex items-center justify-between gap-3 shadow-luxury-sm specular-top">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Instant Sandbox Mode</span>
            </div>
            <p className="text-[11px] text-slate-400 font-light">
              Evaluate full platform pre-populated with Elena Vance profile.
            </p>
          </div>
          <button
            onClick={enterDemoMode}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-obsidian-950 font-semibold text-xs transition-colors cursor-pointer shadow-luxury-sm"
          >
            Launch Demo
          </button>
        </div>

        {/* Form Card */}
        <div className="altera-card rounded-2xl p-7 border border-white/10 space-y-5 specular-top shadow-luxury-md">
          {error && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Sovereign Email</label>
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Passkey / Password</label>
                <Link
                  href="/reset-password"
                  className="text-[11px] font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Forgot passkey?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
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
            </div>

            <Button
              type="submit"
              variant="silver"
              size="md"
              isLoading={isLoading}
              className="w-full mt-2"
            >
              Sign In to Altera
            </Button>
          </form>

          <div className="pt-3 border-t border-white/[0.06] text-center text-xs text-slate-400 font-light">
            Don&rsquo;t have a sovereign profile?{' '}
            <Link href="/signup" className="text-white hover:underline font-medium">
              Create an account
            </Link>
          </div>
        </div>

        {/* Security footnote */}
        <div className="flex items-center justify-center gap-2 text-[10.5px] font-mono text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>ENCRYPTED SESSION // ZERO TELEMETRY BLEED</span>
        </div>
      </div>
    </div>
  );
}
