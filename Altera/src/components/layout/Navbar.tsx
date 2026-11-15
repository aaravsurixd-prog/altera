'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Menu, X, ArrowUpRight, Compass, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, enterDemoMode } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-obsidian-950/80 backdrop-blur-2xl border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo & Editorial Monogram */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-b from-white/[0.12] to-white/[0.02] border border-white/20 flex items-center justify-center relative overflow-hidden group-hover:border-white/40 shadow-luxury-sm transition-all">
            <span className="text-white font-mono font-medium text-sm tracking-tighter">Λ</span>
            <div className="absolute inset-0 bg-violet-500/[0.08] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-[0.2em] text-white uppercase font-sans">
                ALTERA
              </span>
              <span className="w-1 h-1 rounded-full bg-ice-accent animate-pulse" />
            </div>
            <span className="text-[9px] text-slate-400 tracking-[0.18em] uppercase font-mono hidden sm:inline">
              Personal Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-9">
          <Link
            href="/#philosophy"
            className="text-xs uppercase tracking-widest text-slate-300 hover:text-white font-mono transition-colors"
          >
            Philosophy
          </Link>
          <Link
            href="/#second-self"
            className="text-xs uppercase tracking-widest text-slate-300 hover:text-white font-mono transition-colors flex items-center gap-1.5"
          >
            Second Self
            <span className="text-[9px] text-violet-400 font-mono">01</span>
          </Link>
          <Link
            href="/#future-you"
            className="text-xs uppercase tracking-widest text-slate-300 hover:text-white font-mono transition-colors flex items-center gap-1.5"
          >
            Future You
            <span className="text-[9px] text-sky-400 font-mono">02</span>
          </Link>
          <Link
            href="/#methodology"
            className="text-xs uppercase tracking-widest text-slate-300 hover:text-white font-mono transition-colors"
          >
            Charter
          </Link>
          <Link
            href="/#faq"
            className="text-xs uppercase tracking-widest text-slate-300 hover:text-white font-mono transition-colors"
          >
            Inquiries
          </Link>
        </nav>

        {/* CTA & Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button variant="silver" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Launch Workspace
              </Button>
            </Link>
          ) : (
            <>
              <button
                onClick={enterDemoMode}
                className="text-[11px] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25 transition-all font-mono tracking-wider cursor-pointer"
              >
                Instant Preview
              </button>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="silver" size="sm">
                  Initialize
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.05]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-5 pt-4 pb-7 bg-obsidian-900 border-b border-white/10 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/#second-self"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 py-1"
            >
              01 // Second Self Companion
            </Link>
            <Link
              href="/#future-you"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 py-1"
            >
              02 // Future You Simulator
            </Link>
            <Link
              href="/#methodology"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 py-1"
            >
              03 // Epistemic Charter
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-300 py-1"
            >
              04 // Architectural FAQ
            </Link>
          </nav>
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                enterDemoMode();
              }}
              className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-wider rounded-lg bg-obsidian-800 text-slate-200 border border-white/10"
            >
              Launch Instant Demo
            </button>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-wider rounded-lg border border-white/15 text-white"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-xs font-mono uppercase tracking-wider rounded-lg bg-white text-obsidian-950 font-semibold"
            >
              Initialize Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
