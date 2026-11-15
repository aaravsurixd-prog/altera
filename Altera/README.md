# ALTERA — Become More Than One Possibility.

> A premium global AI-powered personal intelligence and future exploration platform.

---

## ✦ Vision & Architecture

Most people live an unexamined default trajectory. **Altera** provides the personal intelligence to interrogate your cognitive principles and simulate the lives you haven't lived yet.

Altera is built around two primary paradigms:
1. **SECOND SELF**: A personalized, epistemically rigorous cognitive sparring companion anchored in your private cryptographic memory vault. It holds you accountable to your own principles, challenges assumptions, and audits high-stakes trade-offs.
2. **FUTURE YOU**: A branching possibility simulator that accepts any career or life dilemma and generates 3 deeply analyzed divergent scenarios (e.g., *The Exponential Builder*, *The Scale Commander*, *The Free Radical*). Possibilities are modeled with explicit opportunities, trade-offs, systemic fragilities, required capabilities, and sequential milestones.

---

## ✦ Key Features

- **Public Landing Page**: Editorial-futuristic hero with real-time interactive trajectory simulator, brand philosophy, dual-engine showcase, epistemic charter, and FAQ.
- **Authentication & Sovereignty**:
  - Full Supabase Auth client & server SSR integration.
  - Zero-barrier Instant Sandbox Mode: Explore immediately with pre-loaded profiles without requiring third-party credentials.
  - Reset password, login, and registration flows with cryptographic password strength analysis.
- **Cognitive Onboarding**: 4-stage wizard calibrating core values, capabilities, exploratory domains, planning horizon (1–10 years), risk tolerance, and north-star aspirations.
- **Personal Dashboard**: Holistic overview of active trajectory branches, memory vault status, roadmap velocity, and one-click sparring triggers.
- **Second Self Companion**:
  - Interactive epistemic chat with memory citations and reflection metadata notes.
  - Memory Vault: Organized across Values, Beliefs, Work Style, Relationships, Experiences, and Ambitions.
  - Granular privacy controls per memory node: `Active` (consulted by AI), `Locked` (read-only), `Quarantined` (fully air-gapped).
- **Future You Explorer**:
  - Input high-stakes career or venture bifurcations.
  - Tri-branch divergence generation with dynamic metrics across *Growth, Risk, Autonomy, Balance, and Impact*.
  - Direct milestone committing into your live roadmap.
- **Parallel Lives**:
  - Side-by-side comparative matrix juxtaposing divergent scenarios dimension by dimension.
  - Structural analysis of trade-offs, upside asymmetry, and systemic failure modes.
- **My Timeline**:
  - Multi-horizon roadmap tracking sequential milestones.
  - Interactive status toggling (`Not Started` → `In Progress` → `Achieved` with celebration feedback).
  - Custom milestone creator and category filters.
- **Settings & Sovereign Data Governance**:
  - Profile parameters editor.
  - AI Engine provider configuration (Local Altera Heuristic Engine, Google Gemini 1.5 Pro, OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet).
  - 1-click JSON vault dump and human-readable Markdown dossier export.
  - Irrevocable vault purging with confirmation protection.

---

## ✦ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom editorial dark tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database & Auth**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`)
- **AI Engine**: Multi-provider server-side pipeline (Gemini / OpenAI / Anthropic) with embedded local semantic reasoning fallback.

---

## ✦ Getting Started

### 1. Installation

```bash
pnpm install
```

### 2. Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# Public App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (Optional for local demo mode; required for cloud sync)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# AI Providers (Optional: Altera includes built-in offline reasoning synthesis)
GEMINI_API_KEY=your-gemini-api-key
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Demo Sandbox Mode
NEXT_PUBLIC_DEMO_MODE=true
```

### 3. Supabase Schema Setup

If connecting to a Supabase project, execute `supabase/schema.sql` in the Supabase SQL Editor. It establishes:
- `profiles` table with Row Level Security (RLS)
- `onboarding_profiles` table with user policies
- `second_self_memories` table with privacy level check constraints
- `second_self_chats` & `second_self_messages` tables
- `future_decisions` & `future_scenarios` tables
- `timeline_milestones` table
- Automated user initialization trigger on `auth.users` insert

### 4. Running the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to experience the platform.
