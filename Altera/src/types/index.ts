// ==============================================================================
// ALTERA CORE TYPE DEFINITIONS
// "Become more than one possibility."
// ==============================================================================

export type PrivacyLevel = 'active' | 'locked' | 'quarantined';

export type MemoryCategory = 
  | 'values' 
  | 'beliefs' 
  | 'work_style' 
  | 'relationships' 
  | 'experiences' 
  | 'ambitions';

export interface SecondSelfMemory {
  id: string;
  category: MemoryCategory;
  title: string;
  content: string;
  confidenceScore: number; // 0.0 - 1.0
  privacyLevel: PrivacyLevel;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  reflectionNotes?: string;
  timestamp: string;
  memoriesConsulted?: string[];
}

export interface ScenarioMetric {
  growth: number;    // 0 - 100
  risk: number;      // 0 - 100
  autonomy: number;  // 0 - 100
  balance: number;   // 0 - 100
  impact: number;    // 0 - 100
}

export interface ScenarioMilestone {
  id: string;
  timeframe: string; // e.g. "Month 3", "Year 1", "Year 3"
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'achieved';
  completed?: boolean;
}

export interface FutureScenario {
  id: string;
  decisionId: string;
  scenarioCode: string; // e.g. "Path A", "Path B", "Path C"
  title: string;
  tagline: string;
  description: string;
  possibilityArchetype: string; // e.g. "The Exponential Leap", "The Deep Specialist", "The Sovereign Hybrid"
  opportunities: string[];
  tradeoffs: string[];
  systemicChallenges: string[];
  criticalSkills: string[];
  milestones: ScenarioMilestone[];
  metrics: ScenarioMetric;
  createdAt: string;
}

export interface FutureDecision {
  id: string;
  userId: string;
  dilemmaTitle: string;
  contextDescription: string;
  timeHorizon: string; // e.g. "1-2 years", "3-5 years", "10 years"
  coreTradeoff: string;
  tags: string[];
  scenarios: FutureScenario[];
  createdAt: string;
}

export interface TimelineGoal {
  id: string;
  scenarioId?: string;
  scenarioTitle?: string;
  title: string;
  description: string;
  targetTimeframe: string;
  category: 'career' | 'craft' | 'wellness' | 'intellect' | 'connection';
  status: 'not_started' | 'in_progress' | 'achieved';
  progressPct: number;
  dueDate?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  headline: string;
  bio: string;
  currentRole: string;
  location: string;
  avatarUrl?: string;
}

export interface OnboardingData {
  coreValues: string[];
  primaryInterests: string[];
  topSkills: string[];
  lifeAspirations: string[];
  riskTolerance: 'conservative' | 'balanced' | 'aggressive' | 'non-linear';
  horizonYears: number;
  decisionStyle: 'analytical' | 'intuitive' | 'hybrid' | 'experimental';
  completed: boolean;
}

export interface UserSession {
  user: UserProfile | null;
  onboarding: OnboardingData | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
}
