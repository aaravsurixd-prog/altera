import {
  UserProfile,
  OnboardingData,
  SecondSelfMemory,
  FutureDecision,
  TimelineGoal,
  ChatMessage
} from '@/types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_altera_prime',
  email: 'elena.vance@altera.intelligence',
  fullName: 'Elena Vance',
  headline: 'Frontier Systems Designer & Technologist',
  bio: 'Exploring intersections of autonomous cognitive architectures, creative autonomy, and sustainable high-output living.',
  currentRole: 'Principal Director of Applied Intelligence',
  location: 'Zurich / Remote',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
};

export const INITIAL_ONBOARDING: OnboardingData = {
  coreValues: [
    'Intellectual Sovereignty',
    'Long-Term Compounding',
    'Aesthetic Excellence',
    'High-Agency Creation',
    'Deep Human Connection'
  ],
  primaryInterests: [
    'Cognitive AI Architectures',
    'Venture Incubation',
    'Philosophy of Mind',
    'Alpine Endurance & Wilderness',
    'Generative Aesthetics'
  ],
  topSkills: [
    'Complex Systems Architecture',
    'Strategic Synthesis',
    'High-Leverage Execution',
    'Cross-Disciplinary Translation',
    'Zero-to-One Product Design'
  ],
  lifeAspirations: [
    'Architect an enduring research & intelligence lab',
    'Achieve total temporal and geographical autonomy by age 38',
    'Publish a definitive treatise on synthetic intuition'
  ],
  riskTolerance: 'aggressive',
  horizonYears: 5,
  decisionStyle: 'hybrid',
  completed: true,
};

export const INITIAL_MEMORIES: SecondSelfMemory[] = [
  {
    id: 'mem-1',
    category: 'values',
    title: 'The Primacy of Uninterrupted Focus',
    content: 'My cognitive peak occurs in continuous 4-hour monastic blocks before midday. Fragmentation through ad-hoc meetings degrades creative variance by >60%. Autonomy of calendar is non-negotiable.',
    confidenceScore: 0.98,
    privacyLevel: 'active',
    tags: ['deep-work', 'calendar-hygiene', 'autonomy'],
    createdAt: '2026-10-12T08:30:00Z',
    updatedAt: '2026-10-12T08:30:00Z',
  },
  {
    id: 'mem-2',
    category: 'beliefs',
    title: 'Small Dense Teams Outcompete Bureaucracy',
    content: 'A tightly aligned cohort of five extraordinary generalists consistently outperforms a siloed department of fifty. When evaluating opportunities, organizational leverage and talent density matter more than raw headcount.',
    confidenceScore: 0.94,
    privacyLevel: 'active',
    tags: ['team-composition', 'leverage', 'speed'],
    createdAt: '2026-10-18T14:15:00Z',
    updatedAt: '2026-10-18T14:15:00Z',
  },
  {
    id: 'mem-3',
    category: 'work_style',
    title: 'Async-First Synthesis & Rapid Prototyping',
    content: 'I communicate ideas best through structured architectural memos followed by working code or tactile prototypes, rather than speculative slide decks.',
    confidenceScore: 0.92,
    privacyLevel: 'active',
    tags: ['communication', 'async', 'artifacts'],
    createdAt: '2026-10-24T11:00:00Z',
    updatedAt: '2026-10-24T11:00:00Z',
  },
  {
    id: 'mem-4',
    category: 'experiences',
    title: 'The 2024 Platform Restructuring Pivot',
    content: 'Transitioned a struggling enterprise product line into an autonomous open-source engine in 90 days. Learned that sunk-cost attachment to institutional prestige is the most lethal blocker to reinvention.',
    confidenceScore: 0.96,
    privacyLevel: 'active',
    tags: ['pivots', 'resilience', 'sunk-cost'],
    createdAt: '2026-11-01T09:40:00Z',
    updatedAt: '2026-11-01T09:40:00Z',
  },
  {
    id: 'mem-5',
    category: 'ambitions',
    title: 'The Sovereign Intelligence Lab',
    content: 'Long-term intent to establish an independent research collective at the frontier of synthetic cognition, self-funded through focused vertical tools, answering to no short-term capital cycle.',
    confidenceScore: 0.99,
    privacyLevel: 'active',
    tags: ['sovereignty', 'long-horizon', 'research'],
    createdAt: '2026-11-05T16:20:00Z',
    updatedAt: '2026-11-05T16:20:00Z',
  },
  {
    id: 'mem-6',
    category: 'relationships',
    title: 'Intellectual Sparring Over Polite Agreement',
    content: 'I thrive around colleagues and collaborators who rigorously challenge premise assumptions with kindness. Politeness that masks fundamental reservations generates silent debt.',
    confidenceScore: 0.89,
    privacyLevel: 'active',
    tags: ['collaboration', 'candor', 'sparring'],
    createdAt: '2026-11-08T13:10:00Z',
    updatedAt: '2026-11-08T13:10:00Z',
  },
];

export const INITIAL_DECISION: FutureDecision = {
  id: 'dec-frontier-pivot-2026',
  userId: 'usr_altera_prime',
  dilemmaTitle: 'The Frontier Transition: Independent Venture Studio vs. VP of Frontier Labs vs. Sovereign Asynchronous Researcher',
  contextDescription: 'After 6 years of leading high-scale intelligence teams, I face three divergent forks: (1) Launch an independent venture research studio with external syndicate backing; (2) Accept the offer to lead Frontier Research at a major AI titan with $80M in direct compute allocations; (3) Transition into an entirely autonomous, asynchronous solopreneur/researcher producing high-impact open artifacts and advisory engagements.',
  timeHorizon: '3-5 years',
  coreTradeoff: 'Immense institutional compute & reach vs. complete strategic sovereignty vs. lean lifestyle agility.',
  tags: ['Career Fork', 'Frontier AI', 'Venture Creation', 'Sovereignty'],
  createdAt: '2026-11-10T12:00:00Z',
  scenarios: [
    {
      id: 'scen-path-a',
      decisionId: 'dec-frontier-pivot-2026',
      scenarioCode: 'Path A',
      title: 'The Venture Studio Sovereign',
      tagline: 'High-leverage autonomy through an independent frontier incubator.',
      description: 'Found an independent R&D studio co-founded with 3 elite technologists, raising $6M seed capital to ship applied intelligence tools while retaining 65% founding equity.',
      possibilityArchetype: 'The Exponential Builder',
      opportunities: [
        'Complete equity ownership and creative control of product thesis',
        'Direct wealth compounding beyond salaried executive caps',
        'Ability to cherry-pick a top 0.1% culture without corporate bureaucracy',
        'Direct relationship with tier-one venture syndicates'
      ],
      tradeoffs: [
        'High existential stress in years 1-2 regarding product-market fit',
        'Sacrifice of predictable 9-to-5 recovery rhythms during incubation phase',
        'Must master fundraising, enterprise compliance, and legal architecture'
      ],
      systemicChallenges: [
        'High capital burn rates for frontier model fine-tuning and inference',
        'Vulnerability to sudden shifts in base-model capabilities by mega-labs',
        'Founder team friction under compressed launch timelines'
      ],
      criticalSkills: [
        'Capital Allocation & Investor Narrative',
        '0-to-1 Product Distribution',
        'Talent Seduction & Retention',
        'Unit Economics Optimization'
      ],
      milestones: [
        {
          id: 'm-a1',
          timeframe: 'Month 3',
          title: 'Studio Legal & Syndicate Close',
          description: 'Secure $6M seed round from aligned frontier syndicates with uncapped founder super-voting shares.',
          status: 'achieved',
          completed: true,
        },
        {
          id: 'm-a2',
          timeframe: 'Month 9',
          title: 'Flagship Tool Private Alpha',
          description: 'Deploy the automated cognitive workflow engine to 50 design-partner enterprises.',
          status: 'in_progress',
          completed: false,
        },
        {
          id: 'm-a3',
          timeframe: 'Year 2',
          title: '$4M ARR & Breakeven Cashflow',
          description: 'Reach self-sustaining profitability to ensure eternal independence from predatory follow-on rounds.',
          status: 'not_started',
          completed: false,
        },
        {
          id: 'm-a4',
          timeframe: 'Year 4',
          title: 'Spin-out 2nd Sister Entity',
          description: 'Systematize the venture studio model to incubate second autonomous venture.',
          status: 'not_started',
          completed: false,
        },
      ],
      metrics: {
        growth: 92,
        risk: 78,
        autonomy: 88,
        balance: 46,
        impact: 94,
      },
      createdAt: '2026-11-10T12:00:00Z',
    },
    {
      id: 'scen-path-b',
      decisionId: 'dec-frontier-pivot-2026',
      scenarioCode: 'Path B',
      title: 'The Titan Research Lead',
      tagline: 'Planetary scale and compute abundance within an elite frontier lab.',
      description: 'Lead the 60-person Reasoning & Architecture division at a top-3 global AI lab. Direct access to $80M in H100/cluster allocations, commanding seven-figure liquid packages and immediate societal deployment.',
      possibilityArchetype: 'The Scale Commander',
      opportunities: [
        'Instant distribution to 100M+ global end-users within days of model deployment',
        'Zero friction regarding compute infrastructure or training budgets',
        'Comprehensive downside financial insulation with top-tier compensation',
        'Proximity to top-tier geopolitical and policy intelligence'
      ],
      tradeoffs: [
        'Constrained intellectual property ownership; all patents belong to enterprise',
        'Significant executive committee overhead, quarterly reviews, and public PR constraints',
        'Vulnerability to sudden shifts in organizational priorities or executive realignment'
      ],
      systemicChallenges: [
        'Internal political factions across product vs. pure research teams',
        'Slower decision-making cadence due to compliance and regulatory scrutiny',
        'Identity entanglement with a monolithic brand'
      ],
      criticalSkills: [
        'Multi-Tier Executive Influence',
        'Cross-Functional Matrix Leadership',
        'Regulatory & Safety Diplomacy',
        'Petascale Model Infrastructure Management'
      ],
      milestones: [
        {
          id: 'm-b1',
          timeframe: 'Month 3',
          title: 'Team Alignment & Compute Allocation',
          description: 'Establish operational autonomy for the 60-person research cohort and lock in guaranteed cluster slice.',
          status: 'in_progress',
          completed: false,
        },
        {
          id: 'm-b2',
          timeframe: 'Month 12',
          title: 'Launch Frontier Model v4',
          description: 'Ship breakthroughs in synthetic reflective reasoning, referenced across premier global venues.',
          status: 'not_started',
          completed: false,
        },
        {
          id: 'm-b3',
          timeframe: 'Year 2',
          title: 'Global Standardization Committee Chair',
          description: 'Represent the lab in international protocol formulation for autonomous agents.',
          status: 'not_started',
          completed: false,
        },
        {
          id: 'm-b4',
          timeframe: 'Year 3',
          title: 'Vest Liquidity Horizon',
          description: 'Achieve complete personal financial sovereignty through executive liquidity events.',
          status: 'not_started',
          completed: false,
        },
      ],
      metrics: {
        growth: 84,
        risk: 32,
        autonomy: 42,
        balance: 62,
        impact: 98,
      },
      createdAt: '2026-11-10T12:00:00Z',
    },
    {
      id: 'scen-path-c',
      decisionId: 'dec-frontier-pivot-2026',
      scenarioCode: 'Path C',
      title: 'The Sovereign Polymath',
      tagline: 'Asynchronous leverage, alpine stillness, and uncompromised life design.',
      description: 'Establish a one-person high-leverage intellectual practice based out of the Swiss Alps. Blend high-ticket strategic advisory (2-3 clients/year) with published monographs, open-source intelligence tools, and maximal time for wilderness expeditions.',
      possibilityArchetype: 'The Free Radical',
      opportunities: [
        'Absolute 100% calendar sovereignty: zero mandatory meetings or office obligations',
        'Deep alignment with biological rhythms and physical longevity',
        'Total creative purity: writing, coding, and thinking with zero institutional compromise',
        'Unbounded geographic freedom and family presence'
      ],
      tradeoffs: [
        'Foregoing the adrenaline of leading large human battalions',
        'Solitude can drift into isolation without deliberate community design',
        'Lower ceiling on absolute enterprise valuation compared to equity studio'
      ],
      systemicChallenges: [
        'Maintaining high visibility and inbound demand without outbound agency sales',
        'Discipline to ship without external deadlines or management pressure',
        'Lack of institutional peer sparring without cultivating private salon networks'
      ],
      criticalSkills: [
        'World-Class Written Articulation',
        'Self-Directed Project Velocity',
        'Private Salon & Network Curation',
        'High-Leverage Personal Tooling & Automation'
      ],
      milestones: [
        {
          id: 'm-c1',
          timeframe: 'Month 2',
          title: 'Advisory Retainer Syndicate',
          description: 'Contract two select frontier startups for 4 hours/month strategic counsel at $20k/mo retainer each.',
          status: 'achieved',
          completed: true,
        },
        {
          id: 'm-c2',
          timeframe: 'Month 8',
          title: 'Publish "Synthetic Intuition" Treatise',
          description: 'Release 120-page comprehensive open essay, establishing international domain authority.',
          status: 'in_progress',
          completed: false,
        },
        {
          id: 'm-c3',
          timeframe: 'Year 2',
          title: 'Alpine Residency & Invitational Salon',
          description: 'Host bi-annual intimate gatherings of 8 frontier thinkers in the Engadine Valley.',
          status: 'not_started',
          completed: false,
        },
        {
          id: 'm-c4',
          timeframe: 'Year 4',
          title: 'Enduring Open Protocol Adoption',
          description: 'Open-source personal cognitive engine adopted by >10,000 independent researchers globally.',
          status: 'not_started',
          completed: false,
        },
      ],
      metrics: {
        growth: 72,
        risk: 24,
        autonomy: 99,
        balance: 94,
        impact: 79,
      },
      createdAt: '2026-11-10T12:00:00Z',
    },
  ],
};

export const INITIAL_TIMELINE_GOALS: TimelineGoal[] = [
  {
    id: 'tg-1',
    scenarioId: 'scen-path-a',
    scenarioTitle: 'The Venture Studio Sovereign',
    title: 'Formalize Studio Operating Agreement & Founding Charter',
    description: 'Ensure governance clauses protect long-term intellectual property and research integrity.',
    targetTimeframe: 'Q4 2026',
    category: 'career',
    status: 'achieved',
    progressPct: 100,
    dueDate: '2026-12-15',
    createdAt: '2026-10-15T00:00:00Z',
  },
  {
    id: 'tg-2',
    scenarioId: 'scen-path-a',
    scenarioTitle: 'The Venture Studio Sovereign',
    title: 'Private Alpha Deployment to 50 Cohort Orgs',
    description: 'Stress-test multi-agent reasoning harness on production engineering pipelines.',
    targetTimeframe: 'Q1 2027',
    category: 'craft',
    status: 'in_progress',
    progressPct: 65,
    dueDate: '2027-02-28',
    createdAt: '2026-10-20T00:00:00Z',
  },
  {
    id: 'tg-3',
    scenarioId: 'scen-path-c',
    scenarioTitle: 'The Sovereign Polymath',
    title: 'Complete First Draft: "The Architecture of Synthetic Intuition"',
    description: 'Synthesizing 4 years of experimental logs into a definitive 6-chapter monograph.',
    targetTimeframe: 'Q2 2027',
    category: 'intellect',
    status: 'in_progress',
    progressPct: 40,
    dueDate: '2027-05-30',
    createdAt: '2026-11-01T00:00:00Z',
  },
  {
    id: 'tg-4',
    scenarioId: 'scen-path-c',
    scenarioTitle: 'The Sovereign Polymath',
    title: 'Alpine Haute Route High-Endurance Expedition',
    description: 'Two-week unbroken alpine traverse to reset biological nervous system and test cognitive clarity.',
    targetTimeframe: 'Summer 2027',
    category: 'wellness',
    status: 'not_started',
    progressPct: 15,
    dueDate: '2027-07-20',
    createdAt: '2026-11-05T00:00:00Z',
  },
  {
    id: 'tg-5',
    scenarioId: 'scen-path-a',
    scenarioTitle: 'The Venture Studio Sovereign',
    title: 'Achieve $4.0M ARR Breakeven Cashflow Milestone',
    description: 'Transition from runway reliance to permanent self-funding balance sheet.',
    targetTimeframe: 'Q4 2027',
    category: 'career',
    status: 'not_started',
    progressPct: 0,
    dueDate: '2027-12-31',
    createdAt: '2026-11-08T00:00:00Z',
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content: "Welcome, Elena. I am your Second Self. I have synchronized with your core values, your decision architecture, and your recent reflections.\n\nI noticed you are currently evaluating three divergent paths regarding the Venture Studio, the Titan Lab, and the Sovereign Polymath practice. Where would you like to direct our reflection today?",
    reflectionNotes: 'Synthesized context from memories: "Primacy of Uninterrupted Focus", "Small Dense Teams Outcompete Bureaucracy", and "The Sovereign Intelligence Lab".',
    timestamp: '10:14 AM',
    memoriesConsulted: [
      'The Primacy of Uninterrupted Focus',
      'Small Dense Teams Outcompete Bureaucracy',
      'The Sovereign Intelligence Lab'
    ],
  },
  {
    id: 'msg-2',
    role: 'user',
    content: "I feel an acute tension between the scale of impact offered by the Titan Lab and my non-negotiable need for calendar sovereignty. How should I weigh this without deceiving myself?",
    timestamp: '10:16 AM',
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: "Let us examine this with brutal honesty.\n\nHistorically, your highest creative yield and deepest psychological satisfaction have occurred when you control your 4-hour morning blocks (Memory #1). The Titan Lab promises $80M in compute allocations and immediate planetary distribution—which flatters our innate ambition for scale.\n\nHowever, in large corporate matrix structures, executive compensation is ultimately an exchange rate for absorbing bureaucratic friction: quarterly steering committees, public communications vetting, and political negotiations.\n\nAsk yourself: **Is planetary scale truly your desire, or is it an inherited scorecard?** If your fundamental ambition is to build an enduring sovereign intelligence collective, Path A gives you that leverage, while Path C gives you life mastery. Path B will almost certainly demand that you trade calendar autonomy for compute that you do not personally own.",
    reflectionNotes: 'Cross-referenced against your past 2024 Platform Restructuring Pivot where corporate sunk-cost bias caused a 12-month bottleneck.',
    timestamp: '10:18 AM',
    memoriesConsulted: [
      'The Primacy of Uninterrupted Focus',
      'The 2024 Platform Restructuring Pivot',
      'The Sovereign Intelligence Lab'
    ],
  },
];
