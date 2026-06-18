import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        ink: "#050508",
        void: "#080810",
        surface: "#0e0e18",
        panel: "#13131f",
        gold: "#c9a227",
        "gold-light": "#f0c040",
        cyan: "#00d4ff",
        "cyan-dim": "#0099cc",
        violet: "#7c3aed",
        "violet-light": "#a855f7",
        cream: "#f5f0e8",
        silver: "#a8b0c0",
        muted: "#4a4d5a",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 3s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee2": "marquee2 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGold: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
