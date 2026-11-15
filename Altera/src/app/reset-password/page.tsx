'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please provide your account email.');
      return;
    }

    setIsLoading(true);
    setError(null);
    const res = await resetPassword(email);
    setIsLoading(false);

    if (res.success) {
      setIsSubmitted(true);
    } else {
      setError(res.error || 'Password recovery request failed.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 relative z-10 bg-obsidian-950 text-slate-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center font-mono font-medium text-white text-base shadow-luxury-sm">
              Λ
            </div>
            <span className="font-semibold text-lg tracking-[0.2em] text-white uppercase font-sans">
              ALTERA
            </span>
          </Link>
          <h2 className="text-2xl font-light tracking-tight text-white pt-2 editorial-serif">
            Recover Access Token
          </h2>
          <p className="text-xs text-slate-400 font-light">
            Transmit a cryptographic recovery link to re-establish your session.
          </p>
        </div>

        <div className="altera-card rounded-2xl p-7 border border-white/10 space-y-5 specular-top shadow-luxury-md">
          {isSubmitted ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-luxury-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-wide">Transmission Dispatched</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto font-light">
                If an account exists for <span className="text-white font-mono">{email}</span>, a secure recovery sequence has been initiated.
              </p>
              <div className="pt-2">
                <Link href="/login">
                  <Button variant="silver" size="md" className="w-full">
                    Return to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Registered Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 transition-colors"
                  required
                />
              </div>

              <Button
                type="submit"
                variant="silver"
                size="md"
                isLoading={isLoading}
                className="w-full mt-2"
                leftIcon={<KeyRound className="w-4 h-4" />}
              >
                Send Recovery Key
              </Button>

              <div className="pt-2 text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors font-mono"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
