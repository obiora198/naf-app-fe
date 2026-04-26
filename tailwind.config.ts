import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Warm Luxury Palette
        "naf-navy": {
          DEFAULT: "#0F172A",
          light: "#1E293B",
          dark: "#020617",
        },
        "naf-gold": {
          DEFAULT: "#C9A84C",
          light: "#E0CC8A",
          dark: "#A07D2E",
          muted: "#D4B96E",
        },
        "naf-cream": {
          DEFAULT: "#FAF8F5",
          dark: "#F0ECE4",
        },
        "naf-sky": {
          DEFAULT: "#0EA5E9",
          light: "#F0F9FF",
          dark: "#0369A1",
        },
        "naf-emerald": {
          DEFAULT: "#059669",
          light: "#ECFDF5",
        },
        // Keep naf-slate for backward compat but shift to cream
        "naf-slate": {
          DEFAULT: "#FAF8F5",
          dark: "#0F172A",
        },
      },
      borderRadius: {
        "3xl": "0.75rem",
        "4xl": "1rem",
        "5xl": "1.25rem",
      },
      boxShadow: {
        "premium": "0 4px 24px -4px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.04)",
        "premium-hover": "0 16px 40px -8px rgba(15, 23, 42, 0.1), 0 4px 12px rgba(15, 23, 42, 0.04)",
        "gold": "0 8px 32px -4px rgba(201, 168, 76, 0.25)",
        "card": "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s infinite linear",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
