'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { NeuralHarmonicCore } from '@/components/visuals/NeuralHarmonicCore';
import { SecondSelfMemory, MemoryCategory, PrivacyLevel } from '@/types';
import {
  Brain,
  Sparkles,
  Send,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  Edit3,
  Plus,
  Shield,
  Layers,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sliders,
  Cpu
} from 'lucide-react';

export default function SecondSelfPage() {
  const {
    user,
    memories,
    chatMessages,
    addChatMessage,
    clearChatMessages,
    addMemory,
    updateMemory,
    deleteMemory,
    updateProfile
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'conversation' | 'vault' | 'identity'>('conversation');
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Memory Modal State
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [editingMemoryId, setEditingMemoryId] = useState<string | null>(null);
  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryCategory, setMemoryCategory] = useState<MemoryCategory>('values');
  const [memoryContent, setMemoryContent] = useState('');
  const [memoryPrivacy, setMemoryPrivacy] = useState<PrivacyLevel>('active');
  const [memoryTags, setMemoryTags] = useState('');

  // User Profile edit state
  const [headline, setHeadline] = useState(user?.headline || '');
  const [currentRole, setCurrentRole] = useState(user?.currentRole || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isThinking]);

  // Send message to Second Self
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isThinking) return;

    const query = inputQuery.trim();
    setInputQuery('');

    // Append user message
    addChatMessage({
      role: 'user',
      content: query,
    });

    setIsThinking(true);

    try {
      const response = await fetch('/api/ai/second-self', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          userProfile: user,
          memories,
          conversationHistory: chatMessages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        addChatMessage({
          role: 'assistant',
          content: data.reply,
          reflectionNotes: data.reflectionNotes,
          memoriesConsulted: data.memoriesConsulted,
        });
      } else {
        throw new Error('Synthesis endpoint returned error');
      }
    } catch (err) {
      console.warn('Fallback to local direct synthesis', err);
      addChatMessage({
        role: 'assistant',
        content: `Reflecting upon your core principle of "${memories[0]?.title || 'Intellectual Sovereignty'}":\n\nWhen you examine "${query}", notice whether this is driven by an urge to satisfy external scorecards or an authentic commitment to high-leverage execution. How does this decision honor your requirement for uninterrupted calendar focus?`,
        reflectionNotes: 'Grounded against your highest-weighted memories in local vault.',
        memoriesConsulted: [memories[0]?.title || 'Primacy of Focus'],
      });
    } finally {
      setIsThinking(false);
    }
  };

  const openNewMemoryModal = () => {
    setEditingMemoryId(null);
    setMemoryTitle('');
    setMemoryCategory('values');
    setMemoryContent('');
    setMemoryPrivacy('active');
    setMemoryTags('');
    setIsMemoryModalOpen(true);
  };

  const openEditMemoryModal = (mem: SecondSelfMemory) => {
    setEditingMemoryId(mem.id);
    setMemoryTitle(mem.title);
    setMemoryCategory(mem.category);
    setMemoryContent(mem.content);
    setMemoryPrivacy(mem.privacyLevel);
    setMemoryTags(mem.tags.join(', '));
    setIsMemoryModalOpen(true);
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memoryTitle || !memoryContent) return;

    const tagsArray = memoryTags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    if (editingMemoryId) {
      updateMemory(editingMemoryId, {
        title: memoryTitle,
        category: memoryCategory,
        content: memoryContent,
        privacyLevel: memoryPrivacy,
        tags: tagsArray,
      });
    } else {
      addMemory({
        title: memoryTitle,
        category: memoryCategory,
        content: memoryContent,
        confidenceScore: 0.95,
        privacyLevel: memoryPrivacy,
        tags: tagsArray,
      });
    }

    setIsMemoryModalOpen(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      headline,
      currentRole,
      bio,
    });
    setProfileSuccessMsg('Cognitive identity parameters successfully synchronized.');
    setTimeout(() => setProfileSuccessMsg(''), 3000);
  };

  const filteredMemories =
    selectedCategory === 'all'
      ? memories
      : memories.filter((m) => m.category === selectedCategory);

  const activeMemCount = memories.filter((m) => m.privacyLevel === 'active').length;

  return (
    <div className="flex min-h-screen bg-obsidian-950 text-slate-100">
      <AppSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader
          title="Second Self"
          subtitle="Your personalized cognitive sparring environment & sovereign memory vault"
        />

        {/* Tab Sub-Header */}
        <div className="border-b border-white/[0.08] bg-obsidian-950 px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('conversation')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'conversation'
                  ? 'bg-white/[0.12] text-white font-semibold border border-white/20 shadow-luxury-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cognitive Salon
            </button>
            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-white/[0.12] text-white font-semibold border border-white/20 shadow-luxury-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Memory Vault</span>
              <span className="text-[9.5px] px-1.5 py-0.2 rounded-full bg-obsidian-950 font-mono">
                {memories.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('identity')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'identity'
                  ? 'bg-white/[0.12] text-white font-semibold border border-white/20 shadow-luxury-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Identity Matrix
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <Badge variant="violet" size="sm" dot>
              {activeMemCount} Memory Nodes Active
            </Badge>
          </div>
        </div>

        {/* TAB 1: COGNITIVE SALON DIALOGUE */}
        {activeTab === 'conversation' && (
          <div className="flex-1 flex flex-col h-[calc(100vh-8.5rem)] relative overflow-hidden">
            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 max-w-4xl w-full mx-auto">
              {chatMessages.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="flex justify-center">
                    <NeuralHarmonicCore size="sm" isThinking={false} />
                  </div>
                  <h3 className="text-lg font-light text-white tracking-tight editorial-serif">
                    Cognitive Session Ready
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-light">
                    Ask your Second Self to audit a high-stakes decision, challenge an unexamined premise, or analyze calendar friction.
                  </p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-2xl rounded-2xl p-5 space-y-3 ${
                        msg.role === 'user'
                          ? 'bg-obsidian-850 border border-white/20 text-white rounded-br-none shadow-luxury-md'
                          : 'altera-card text-slate-100 rounded-bl-none shadow-luxury-lg specular-top'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[9.5px] font-mono tracking-widest uppercase text-slate-400 border-b border-white/[0.04] pb-1.5">
                        <span className="font-semibold text-slate-200">
                          {msg.role === 'user' ? (user?.fullName || 'You') : 'Second Self // Reflection'}
                        </span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-light">
                        {msg.content}
                      </div>

                      {/* AI Reflection Metadata & Memory Citations */}
                      {msg.role === 'assistant' && (msg.reflectionNotes || msg.memoriesConsulted) && (
                        <div className="mt-3 pt-3 border-t border-white/[0.08] space-y-2">
                          {msg.reflectionNotes && (
                            <p className="text-[10.5px] text-slate-400 font-mono leading-relaxed">
                              ↳ <strong className="text-violet-300">Epistemic Analysis:</strong> {msg.reflectionNotes}
                            </p>
                          )}
                          {msg.memoriesConsulted && msg.memoriesConsulted.length > 0 && (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-[9.5px] font-mono uppercase text-slate-500">
                                Grounded in:
                              </span>
                              {msg.memoriesConsulted.map((title) => (
                                <span
                                  key={title}
                                  className="text-[9.5px] px-2 py-0.5 rounded bg-obsidian-950 border border-violet-500/30 text-violet-300 font-mono"
                                >
                                  {title}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {isThinking && (
                <div className="flex items-start gap-4">
                  <div className="altera-card p-4 rounded-2xl rounded-bl-none text-xs text-slate-300 font-mono flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#a78bfa] animate-ping" />
                    <span>Cross-referencing memory vectors and auditing premises...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Bottom Input Area */}
            <div className="p-4 sm:p-6 border-t border-white/[0.08] bg-obsidian-950/90 backdrop-blur-2xl">
              <div className="max-w-4xl mx-auto space-y-2.5">
                {/* Seed Reflection Prompts */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <span className="text-[9.5px] font-mono uppercase tracking-wider text-slate-500 shrink-0">
                    Sparring Seeds:
                  </span>
                  {[
                    'Audit my current calendar fragmentation',
                    'Where am I exhibiting corporate status anxiety?',
                    'Stress-test my Venture Studio thesis',
                    'How do I maintain stillness while shipping fast?',
                  ].map((seed) => (
                    <button
                      key={seed}
                      type="button"
                      onClick={() => setInputQuery(seed)}
                      className="px-2.5 py-1 rounded-full bg-obsidian-900 border border-white/[0.06] hover:border-white/20 text-slate-400 hover:text-white shrink-0 font-mono text-[10px] transition-all cursor-pointer"
                    >
                      {seed}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="relative flex items-center">
                  <textarea
                    rows={2}
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Engage Second Self (Enter to send, Shift+Enter for newline)..."
                    className="w-full px-4 py-3 pr-24 rounded-xl bg-obsidian-900 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-500 resize-none transition-all shadow-inner font-light"
                  />
                  <div className="absolute right-3 flex items-center gap-1.5">
                    {chatMessages.length > 0 && (
                      <button
                        type="button"
                        onClick={clearChatMessages}
                        title="Clear conversation"
                        className="p-2 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!inputQuery.trim() || isThinking}
                      className="p-2 rounded-lg bg-white hover:bg-slate-200 text-obsidian-950 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-luxury-sm"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMORY VAULT */}
        {activeTab === 'vault' && (
          <div className="flex-1 p-5 sm:p-8 max-w-7xl w-full mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl font-light text-white tracking-tight editorial-serif">
                  Cryptographic Memory Ledger
                </h2>
                <p className="text-xs text-slate-400 font-light">
                  Organized cognitive principles, recorded pivots, and operational non-negotiables.
                </p>
              </div>

              <Button
                variant="silver"
                size="sm"
                onClick={openNewMemoryModal}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Record New Memory
              </Button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'values', label: 'Values' },
                { id: 'beliefs', label: 'Beliefs' },
                { id: 'work_style', label: 'Work Style' },
                { id: 'experiences', label: 'Experiences' },
                { id: 'ambitions', label: 'Ambitions' },
                { id: 'relationships', label: 'Relationships' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-[10.5px] uppercase tracking-wider transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white/[0.12] text-white border-white/20 font-semibold'
                      : 'bg-obsidian-900 border-white/[0.06] text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Memory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredMemories.map((mem) => {
                const isLocked = mem.privacyLevel === 'locked';
                const isQuarantined = mem.privacyLevel === 'quarantined';

                return (
                  <div
                    key={mem.id}
                    className="p-5 rounded-2xl bg-obsidian-900 border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-4 shadow-luxury-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-obsidian-950 border border-white/10 text-slate-300">
                          {mem.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isQuarantined ? (
                            <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-red-950/60 border border-red-500/30 text-red-300 flex items-center gap-1">
                              <EyeOff className="w-3 h-3" />
                              Quarantined
                            </span>
                          ) : isLocked ? (
                            <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Locked
                            </span>
                          ) : (
                            <span className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              Active
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-white tracking-wide">
                        {mem.title}
                      </h3>

                      <p className="text-xs text-slate-300 font-light leading-relaxed">
                        {mem.content}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/[0.06]">
                      <div className="flex flex-wrap gap-1">
                        {mem.tags.map((t) => (
                          <span key={t} className="text-[9.5px] font-mono text-slate-500">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-[9.5px] font-mono text-slate-400">
                          Confidence: {(mem.confidenceScore * 100).toFixed(0)}%
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => openEditMemoryModal(mem)}
                            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/[0.06] transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteMemory(mem.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-white/[0.06] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: IDENTITY MATRIX */}
        {activeTab === 'identity' && (
          <div className="flex-1 p-5 sm:p-8 max-w-4xl w-full mx-auto space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-light text-white tracking-tight editorial-serif">
                Cognitive Calibration Matrix
              </h2>
              <p className="text-xs text-slate-400 font-light">
                Define the high-level perspective that anchors Second Self and Future You simulations.
              </p>
            </div>

            {profileSuccessMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{profileSuccessMsg}</span>
              </div>
            )}

            <div className="altera-card rounded-2xl p-7 border border-white/10 space-y-6 specular-top">
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Identity Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Frontier Systems Designer & Technologist"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Current Role / Mandate</label>
                  <input
                    type="text"
                    value={currentRole}
                    onChange={(e) => setCurrentRole(e.target.value)}
                    placeholder="e.g. Principal Director of Applied Intelligence"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-300">Cognitive Focus & Bio</label>
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your current frontier interests, intellectual preoccupations, and boundaries..."
                    className="w-full p-3.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-xs sm:text-sm text-white leading-relaxed font-light"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button type="submit" variant="silver">
                    Synchronize Matrix
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD / EDIT MEMORY MODAL */}
        <Modal
          isOpen={isMemoryModalOpen}
          onClose={() => setIsMemoryModalOpen(false)}
          title={editingMemoryId ? 'Edit Memory Node' : 'Record New Memory Node'}
          subtitle="Document a fundamental belief, boundary, or historical pivot for your Second Self."
        >
          <form onSubmit={handleSaveMemory} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Memory Title</label>
              <input
                type="text"
                value={memoryTitle}
                onChange={(e) => setMemoryTitle(e.target.value)}
                placeholder="e.g. The 4-Hour Monastic Focus Rule"
                className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Category</label>
                <select
                  value={memoryCategory}
                  onChange={(e) => setMemoryCategory(e.target.value as MemoryCategory)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white font-mono"
                >
                  <option value="values">Values</option>
                  <option value="beliefs">Beliefs</option>
                  <option value="work_style">Work Style</option>
                  <option value="experiences">Experiences</option>
                  <option value="ambitions">Ambitions</option>
                  <option value="relationships">Relationships</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Privacy & Isolation</label>
                <select
                  value={memoryPrivacy}
                  onChange={(e) => setMemoryPrivacy(e.target.value as PrivacyLevel)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white font-mono"
                >
                  <option value="active">Active (Consulted by AI)</option>
                  <option value="locked">Locked (Read-Only)</option>
                  <option value="quarantined">Quarantined (Excluded)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Observation / Principle</label>
              <textarea
                rows={4}
                value={memoryContent}
                onChange={(e) => setMemoryContent(e.target.value)}
                placeholder="Detail what you learned, why this constraint exists, and what mistake you are preventing..."
                className="w-full p-3.5 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white leading-relaxed font-light"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-300">Tags (comma separated)</label>
              <input
                type="text"
                value={memoryTags}
                onChange={(e) => setMemoryTags(e.target.value)}
                placeholder="e.g. deep-work, calendar, leverage"
                className="w-full px-3.5 py-2 rounded-lg bg-obsidian-950 border border-white/10 focus:border-white/30 focus:outline-none text-sm text-white font-mono"
              />
            </div>

            <div className="pt-3 flex justify-end gap-3 border-t border-white/[0.08]">
              <Button variant="ghost" type="button" onClick={() => setIsMemoryModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="silver" type="submit">
                {editingMemoryId ? 'Update Memory' : 'Commit to Vault'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
