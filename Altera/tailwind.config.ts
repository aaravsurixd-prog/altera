import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: {
          950: "#020306",
          900: "#05070c",
          850: "#080c14",
          800: "#0d121d",
          750: "#121826",
          700: "#182133",
          600: "#243049",
          500: "#384766",
        },
        silver: {
          sheen: "#f8fafc",
          bright: "#e2e8f0",
          muted: "#94a3b8",
          dark: "#475569",
          hairline: "rgba(255, 255, 255, 0.08)",
          specular: "rgba(255, 255, 255, 0.16)",
        },
        electric: {
          violet: "#7c3aed",
          violetBright: "#8b5cf6",
          violetGlow: "rgba(124, 58, 237, 0.18)",
          violetDeep: "#4c1d95",
        },
        ice: {
          accent: "#38bdf8",
          bright: "#7dd3fc",
          glow: "rgba(56, 189, 248, 0.18)",
          mist: "#bae6fd",
          deep: "#0369a1",
        },
        altera: {
          950: "#020306",
          900: "#05070c",
          850: "#080c14",
          800: "#0d121d",
          750: "#121826",
          700: "#182133",
          600: "#243049",
          500: "#384766",
          400: "#607bb0",
          300: "#94a9d4",
          200: "#c7d4ee",
          100: "#eaf0fb",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-subtle": "radial-gradient(circle at 50% 0%, rgba(124,58,237,0.07) 0%, rgba(56,189,248,0.03) 40%, transparent 70%)",
        "mesh-luxury": "radial-gradient(at 0% 0%, rgba(124, 58, 237, 0.09) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(56, 189, 248, 0.07) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(8, 12, 20, 0.95) 0px, transparent 100%)",
        "silver-gradient": "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 100%)",
        "specular-line": "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
      },
      boxShadow: {
        "luxury-sm": "0 1px 1px 0 rgba(255, 255, 255, 0.06) inset, 0 8px 16px -6px rgba(0, 0, 0, 0.6)",
        "luxury-md": "0 1px 1px 0 rgba(255, 255, 255, 0.08) inset, 0 16px 32px -10px rgba(0, 0, 0, 0.75)",
        "luxury-lg": "0 1px 2px 0 rgba(255, 255, 255, 0.12) inset, 0 24px 48px -12px rgba(0, 0, 0, 0.85)",
        "glow-violet": "0 0 35px -5px rgba(124, 58, 237, 0.22)",
        "glow-ice": "0 0 35px -5px rgba(56, 189, 248, 0.22)",
      },
      animation: {
        "spin-slow": "spin 40s linear infinite",
        "spin-reverse-slow": "spin 50s linear reverse infinite",
        "pulse-subtle": "pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer-luxury": "shimmerLuxury 6s ease-in-out infinite",
      },
      keyframes: {
        shimmerLuxury: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
