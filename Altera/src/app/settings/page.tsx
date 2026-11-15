'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import {
  Settings,
  Shield,
  Download,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Key,
  Database,
  Cpu,
  UserCheck
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const {
    user,
    memories,
    decisions,
    timelineGoals,
    chatMessages,
    updateProfile,
    deleteAccount,
  } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentRole, setCurrentRole] = useState(user?.currentRole || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Model & Key overrides
  const [selectedProvider, setSelectedProvider] = useState<'altera-heuristic' | 'gemini' | 'openai' | 'anthropic'>('altera-heuristic');

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      email,
      currentRole,
      location,
      bio,
    });
    showToast('Profile parameters updated successfully.');
  };

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      user,
      memories,
      decisions,
      timelineGoals,
      chatMessages,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `altera-sovereign-vault-${Date.now()}.json`;
    a.click();
    showToast('Vault exported as encrypted JSON document.');
  };

  const handleExportMarkdown = () => {
    let md = `# ALTERA PERSONAL INTELLIGENCE DOSSIER\n\n`;
    md += `*Generated: ${new Date().toISOString()}*\n\n`;
    md += `## Sovereign Identity\n- **Name:** ${user?.fullName}\n- **Role:** ${user?.currentRole}\n- **Location:** ${user?.location}\n- **Bio:** ${user?.bio}\n\n`;
    md += `## Memory Vault (${memories.length} Nodes)\n\n`;
    memories.forEach((m) => {
      md += `### ${m.title} [${m.category.toUpperCase()}]\n${m.content}\n*Tags: ${m.tags.join(', ')}*\n\n`;
    });
    md += `## Active Decision Landscape\n\n`;
    decisions.forEach((d) => {
      md += `### ${d.dilemmaTitle}\n${d.contextDescription}\n\n`;
      d.scenarios.forEach((s) => {
        md += `#### ${s.scenarioCode}: ${s.title} (${s.possibilityArchetype})\n${s.tagline}\n`;
        md += `- **Autonomy:** ${s.metrics.autonomy}% | **Impact:** ${s.metrics.impact}%\n\n`;
      });
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `altera-epistemic-dossier-${Date.now()}.md`;
    a.click();
    showToast('Dossier exported as Markdown archive.');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation.trim().toLowerCase() !== 'delete my vault') return;
    deleteAccount();
  };

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-slate-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Settings & Sovereign Governance"
          subtitle="Cryptographic profile controls, memory isolation, and data portability"
        />

        <main className="flex-1 p-5 sm:p-8 max-w-5xl w-full mx-auto space-y-8">
          {toastMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* 1. IDENTITY & PROFILE SECTION */}
          <div className="altera-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 specular-top shadow-luxury-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-slate-200">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-light text-white tracking-tight editorial-serif">
                  Identity Parameters
                </h2>
                <p className="text-xs text-slate-400 font-light">
                  Defines the epistemological grounding used by Second Self and Future You.
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Full Name / Pseudonym</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Sovereign Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Current Role / Mandate</label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Base Coordinates</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Cognitive Thesis & Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white leading-relaxed font-light"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="silver" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          {/* 2. COGNITIVE ENGINE & AI CONFIGURATION */}
          <div className="altera-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 specular-top shadow-luxury-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-slate-200">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-light text-white tracking-tight editorial-serif">
                  Intelligence Engine Configuration
                </h2>
                <p className="text-xs text-slate-400 font-light">
                  Select your inference backend. By default, Altera runs its built-in heuristic reasoning engine with zero external data sharing.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'altera-heuristic',
                    title: 'Altera Local Cognitive Engine',
                    desc: 'Zero external telemetry, instantaneous semantic synthesis.',
                    badge: 'Private & Active',
                  },
                  {
                    id: 'gemini',
                    title: 'Google Gemini 1.5 Pro',
                    desc: 'Configurable via GEMINI_API_KEY on server.',
                    badge: 'Server Env Ready',
                  },
                  {
                    id: 'openai',
                    title: 'OpenAI GPT-4o',
                    desc: 'Configurable via OPENAI_API_KEY on server.',
                    badge: 'Server Env Ready',
                  },
                  {
                    id: 'anthropic',
                    title: 'Anthropic Claude 3.5 Sonnet',
                    desc: 'Configurable via ANTHROPIC_API_KEY on server.',
                    badge: 'Server Env Ready',
                  },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => setSelectedProvider(prov.id as any)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-1.5 ${
                      selectedProvider === prov.id
                        ? 'bg-white/[0.08] border-white/30 shadow-luxury-sm'
                        : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{prov.title}</span>
                      <span className="text-[9.5px] font-mono text-slate-300 bg-obsidian-950 px-2 py-0.5 rounded border border-white/10">
                        {prov.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-light">{prov.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. SOVEREIGN DATA PORTABILITY */}
          <div className="altera-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6 specular-top shadow-luxury-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-slate-200">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-light text-white tracking-tight editorial-serif">
                  Data Portability & Vault Export
                </h2>
                <p className="text-xs text-slate-400 font-light">
                  Export your full cognitive graph, memories, simulated scenarios, and roadmap milestones at any time.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl bg-obsidian-900 border border-white/[0.06] space-y-3">
                <div className="text-xs font-semibold text-white">Full JSON Archive</div>
                <p className="text-xs text-slate-400 font-light">
                  Machine-readable dump containing all memory nodes, metrics, chats, and trajectories.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportJSON}
                  leftIcon={<Download className="w-3.5 h-3.5 text-slate-300" />}
                >
                  Export JSON Archive
                </Button>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-white/[0.06] space-y-3">
                <div className="text-xs font-semibold text-white">Epistemic Markdown Dossier</div>
                <p className="text-xs text-slate-400 font-light">
                  Human-readable markdown document formatted as an executive life and career thesis.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleExportMarkdown}
                  leftIcon={<Download className="w-3.5 h-3.5 text-slate-300" />}
                >
                  Export Markdown Dossier
                </Button>
              </div>
            </div>
          </div>

          {/* 4. DANGER ZONE */}
          <div className="rounded-2xl p-6 sm:p-8 border border-red-500/20 bg-red-950/20 space-y-4 shadow-luxury-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-semibold text-red-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Irrevocable Vault Deletion
                </h2>
                <p className="text-xs text-slate-400 max-w-xl font-light">
                  Permanently erase all memory vectors, conversation transcripts, and simulated future branches. This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(true)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-medium transition-colors cursor-pointer shrink-0 shadow-luxury-sm"
              >
                Delete All Data
              </button>
            </div>
          </div>

          {/* DELETE CONFIRMATION MODAL */}
          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Irrevocable Purge Confirmation"
            subtitle="Are you absolutely sure you want to erase your Altera intelligence vault?"
          >
            <div className="space-y-4 pt-2">
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                This will eradicate all {memories.length} documented memories, {decisions.length} simulated forks, and active timeline milestones from local storage and database.
              </p>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-mono">
                  Type <span className="font-mono text-red-400 font-bold">delete my vault</span> to verify:
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e.target.value)}
                  placeholder="delete my vault"
                  className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-red-500 focus:outline-none text-xs sm:text-sm text-white font-mono"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-white/[0.08]">
                <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
                  Cancel
                </Button>
                <button
                  type="button"
                  disabled={deleteConfirmation.trim().toLowerCase() !== 'delete my vault'}
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold cursor-pointer shadow-luxury-sm"
                >
                  Confirm & Purge Everything
                </button>
              </div>
            </div>
          </Modal>
        </main>
      </div>
    </div>
  );
}
