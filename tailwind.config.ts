import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dm: ["DM Mono", "monospace"],
        firacode: ["Fira Code", "monospace"],
        jetbrains: ["JetBrains Mono", "monospace"],
        futsat: ["Fustat", "sans-serif"],
        switzer: [
          "var(--font-switzer-bold)",
          "var(--font-switzer-regular)",
          "sans-serif",
        ],
        switzerBold: ["var(--font-switzer-bold)", "sans-serif"],
        switzerRegular: ["var(--font-switzer-regular)", "sans-serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        brand: {
          primary: "hsl(var(--brand-primary))",
          secondary: "hsl(var(--brand-secondary))",
          accent: "hsl(var(--accent-glow))",
        },
        surface: {
          elevated: "hsl(var(--surface-elevated))",
          interactive: "hsl(var(--surface-interactive))",
        },
        map: {
          background: "hsl(var(--map-background))",
          surface: "hsl(var(--map-surface))",
          "control-bg": "hsl(var(--map-control-bg))",
          "control-border": "hsl(var(--map-control-border))",
          "control-text": "hsl(var(--map-control-text))",
          "popup-bg": "hsl(var(--map-popup-bg))",
          "popup-border": "hsl(var(--map-popup-border))",
        },
        "text-muted": "hsl(var(--text-muted))",
        "text-subtle": "hsl(var(--text-subtle))",
        "border-subtle": "hsl(var(--border-subtle))",
        "border-strong": "hsl(var(--border-strong))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "background-gradient":
          "background-gradient var(--background-gradient-speed, 15s) cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite",
        shimmer: "shimmer 2s linear infinite",
        slideUp: "slideUp 0.3s ease-out",
        slideDown: "slideDown 0.3s ease-in",
        "slow-spin": "spin 10s linear infinite", // Slows down the spin
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
        "background-gradient": {
          "0%, 100%": {
            transform: "translate(0, 0)",
            animationDelay: "var(--background-gradient-delay, 0s)",
          },
          "20%": {
            transform:
              "translate(calc(100% * var(--tx-1, 1)), calc(100% * var(--ty-1, 1)))",
          },
          "40%": {
            transform:
              "translate(calc(100% * var(--tx-2, -1)), calc(100% * var(--ty-2, 1)))",
          },
          "60%": {
            transform:
              "translate(calc(100% * var(--tx-3, 1)), calc(100% * var(--ty-3, -1)))",
          },
          "80%": {
            transform:
              "translate(calc(100% * var(--tx-4, -1)), calc(100% * var(--ty-4, -1)))",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
