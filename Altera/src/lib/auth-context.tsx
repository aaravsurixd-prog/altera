'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserProfile,
  OnboardingData,
  SecondSelfMemory,
  FutureDecision,
  TimelineGoal,
  ChatMessage
} from '@/types';
import {
  INITIAL_USER,
  INITIAL_ONBOARDING,
  INITIAL_MEMORIES,
  INITIAL_DECISION,
  INITIAL_TIMELINE_GOALS,
  INITIAL_CHAT_MESSAGES
} from './mock-data';
import { isSupabaseConfigured, createClient } from './supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  onboarding: OnboardingData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  memories: SecondSelfMemory[];
  decisions: FutureDecision[];
  timelineGoals: TimelineGoal[];
  chatMessages: ChatMessage[];
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password?: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  enterDemoMode: () => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateOnboarding: (data: Partial<OnboardingData>) => void;
  addMemory: (memory: Omit<SecondSelfMemory, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMemory: (id: string, updates: Partial<SecondSelfMemory>) => void;
  deleteMemory: (id: string) => void;
  addDecision: (decision: FutureDecision) => void;
  addTimelineGoal: (goal: Omit<TimelineGoal, 'id' | 'createdAt'>) => void;
  updateTimelineGoal: (id: string, updates: Partial<TimelineGoal>) => void;
  deleteTimelineGoal: (id: string) => void;
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChatMessages: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'altera_user',
  ONBOARDING: 'altera_onboarding',
  MEMORIES: 'altera_memories',
  DECISIONS: 'altera_decisions',
  TIMELINE: 'altera_timeline',
  CHAT: 'altera_chat',
  DEMO: 'altera_demo_mode',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [memories, setMemories] = useState<SecondSelfMemory[]>(INITIAL_MEMORIES);
  const [decisions, setDecisions] = useState<FutureDecision[]>([INITIAL_DECISION]);
  const [timelineGoals, setTimelineGoals] = useState<TimelineGoal[]>(INITIAL_TIMELINE_GOALS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from LocalStorage or Supabase
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
      const storedOnboarding = localStorage.getItem(STORAGE_KEYS.ONBOARDING);
      const storedMemories = localStorage.getItem(STORAGE_KEYS.MEMORIES);
      const storedDecisions = localStorage.getItem(STORAGE_KEYS.DECISIONS);
      const storedTimeline = localStorage.getItem(STORAGE_KEYS.TIMELINE);
      const storedChat = localStorage.getItem(STORAGE_KEYS.CHAT);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        // Default to Elena Vance preloaded state for seamless preview
        setUser(INITIAL_USER);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(INITIAL_USER));
      }

      if (storedOnboarding) {
        setOnboarding(JSON.parse(storedOnboarding));
      } else {
        setOnboarding(INITIAL_ONBOARDING);
        localStorage.setItem(STORAGE_KEYS.ONBOARDING, JSON.stringify(INITIAL_ONBOARDING));
      }

      if (storedMemories) {
        setMemories(JSON.parse(storedMemories));
      } else {
        setMemories(INITIAL_MEMORIES);
        localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(INITIAL_MEMORIES));
      }

      if (storedDecisions) {
        setDecisions(JSON.parse(storedDecisions));
      } else {
        setDecisions([INITIAL_DECISION]);
        localStorage.setItem(STORAGE_KEYS.DECISIONS, JSON.stringify([INITIAL_DECISION]));
      }

      if (storedTimeline) {
        setTimelineGoals(JSON.parse(storedTimeline));
      } else {
        setTimelineGoals(INITIAL_TIMELINE_GOALS);
        localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(INITIAL_TIMELINE_GOALS));
      }

      if (storedChat) {
        setChatMessages(JSON.parse(storedChat));
      } else {
        setChatMessages(INITIAL_CHAT_MESSAGES);
        localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(INITIAL_CHAT_MESSAGES));
      }
    } catch (e) {
      console.warn('Local storage hydration fallback:', e);
      setUser(INITIAL_USER);
      setOnboarding(INITIAL_ONBOARDING);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync helpers
  const saveToStorage = (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'default-password-123',
        });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            headline: 'Explorer of Possibilities',
            bio: '',
            currentRole: 'Researcher & Designer',
            location: 'Global',
          };
          setUser(profile);
          saveToStorage(STORAGE_KEYS.USER, profile);
          setIsDemoMode(false);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Demo / Local Auth fallback
      const profile: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email,
        fullName: email.split('@')[0].replace('.', ' '),
        headline: 'Explorer of Alternative Futures',
        bio: 'Reflecting on personal intelligence and long-horizon trajectories.',
        currentRole: 'Systems Designer',
        location: 'Global',
      };
      setUser(profile);
      saveToStorage(STORAGE_KEYS.USER, profile);
      setIsDemoMode(true);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Authentication failed' };
    }
  };

  const signup = async (email: string, password?: string, fullName?: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || 'default-password-123',
          options: {
            data: { full_name: fullName || email.split('@')[0] },
          },
        });
        if (error) throw error;
        if (data.user) {
          const profile: UserProfile = {
            id: data.user.id,
            email,
            fullName: fullName || email.split('@')[0],
            headline: 'Explorer of Possibilities',
            bio: '',
            currentRole: 'Strategic Thinker',
            location: 'Global',
          };
          setUser(profile);
          saveToStorage(STORAGE_KEYS.USER, profile);
          setIsDemoMode(false);
          setIsLoading(false);
          return { success: true };
        }
      }

      const profile: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        email,
        fullName: fullName || email.split('@')[0],
        headline: 'Explorer of Possibilities',
        bio: '',
        currentRole: 'Strategic Thinker',
        location: 'Global',
      };
      setUser(profile);
      saveToStorage(STORAGE_KEYS.USER, profile);
      setIsDemoMode(true);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    router.push('/');
  };

  const resetPassword = async (email: string) => {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return { success: false, error: error.message };
    }
    return { success: true };
  };

  const enterDemoMode = () => {
    setUser(INITIAL_USER);
    setOnboarding(INITIAL_ONBOARDING);
    setMemories(INITIAL_MEMORIES);
    setDecisions([INITIAL_DECISION]);
    setTimelineGoals(INITIAL_TIMELINE_GOALS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setIsDemoMode(true);
    saveToStorage(STORAGE_KEYS.USER, INITIAL_USER);
    saveToStorage(STORAGE_KEYS.ONBOARDING, INITIAL_ONBOARDING);
    saveToStorage(STORAGE_KEYS.MEMORIES, INITIAL_MEMORIES);
    saveToStorage(STORAGE_KEYS.DECISIONS, [INITIAL_DECISION]);
    saveToStorage(STORAGE_KEYS.TIMELINE, INITIAL_TIMELINE_GOALS);
    saveToStorage(STORAGE_KEYS.CHAT, INITIAL_CHAT_MESSAGES);
    router.push('/dashboard');
  };

  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...profileUpdates };
    setUser(updated);
    saveToStorage(STORAGE_KEYS.USER, updated);
  };

  const updateOnboarding = (dataUpdates: Partial<OnboardingData>) => {
    const updated = onboarding ? { ...onboarding, ...dataUpdates } : ({ ...INITIAL_ONBOARDING, ...dataUpdates });
    setOnboarding(updated);
    saveToStorage(STORAGE_KEYS.ONBOARDING, updated);
  };

  const addMemory = (memoryData: Omit<SecondSelfMemory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newMem: SecondSelfMemory = {
      ...memoryData,
      id: 'mem_' + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newMem, ...memories];
    setMemories(updated);
    saveToStorage(STORAGE_KEYS.MEMORIES, updated);
  };

  const updateMemory = (id: string, updates: Partial<SecondSelfMemory>) => {
    const updated = memories.map(m => m.id === id ? { ...m, ...updates, updatedAt: new Date().toISOString() } : m);
    setMemories(updated);
    saveToStorage(STORAGE_KEYS.MEMORIES, updated);
  };

  const deleteMemory = (id: string) => {
    const updated = memories.filter(m => m.id !== id);
    setMemories(updated);
    saveToStorage(STORAGE_KEYS.MEMORIES, updated);
  };

  const addDecision = (decision: FutureDecision) => {
    const updated = [decision, ...decisions];
    setDecisions(updated);
    saveToStorage(STORAGE_KEYS.DECISIONS, updated);
  };

  const addTimelineGoal = (goalData: Omit<TimelineGoal, 'id' | 'createdAt'>) => {
    const newGoal: TimelineGoal = {
      ...goalData,
      id: 'tg_' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updated = [...timelineGoals, newGoal];
    setTimelineGoals(updated);
    saveToStorage(STORAGE_KEYS.TIMELINE, updated);
  };

  const updateTimelineGoal = (id: string, updates: Partial<TimelineGoal>) => {
    const updated = timelineGoals.map(g => g.id === id ? { ...g, ...updates } : g);
    setTimelineGoals(updated);
    saveToStorage(STORAGE_KEYS.TIMELINE, updated);
  };

  const deleteTimelineGoal = (id: string) => {
    const updated = timelineGoals.filter(g => g.id !== id);
    setTimelineGoals(updated);
    saveToStorage(STORAGE_KEYS.TIMELINE, updated);
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: 'msg_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    saveToStorage(STORAGE_KEYS.CHAT, updated);
  };

  const clearChatMessages = () => {
    setChatMessages([]);
    saveToStorage(STORAGE_KEYS.CHAT, []);
  };

  const deleteAccount = () => {
    localStorage.clear();
    setUser(null);
    setOnboarding(null);
    setMemories([]);
    setDecisions([]);
    setTimelineGoals([]);
    setChatMessages([]);
    router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        onboarding,
        isAuthenticated: Boolean(user),
        isLoading,
        isDemoMode,
        memories,
        decisions,
        timelineGoals,
        chatMessages,
        login,
        signup,
        logout,
        resetPassword,
        enterDemoMode,
        updateProfile,
        updateOnboarding,
        addMemory,
        updateMemory,
        deleteMemory,
        addDecision,
        addTimelineGoal,
        updateTimelineGoal,
        deleteTimelineGoal,
        addChatMessage,
        clearChatMessages,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
