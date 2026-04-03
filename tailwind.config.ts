import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0A0F1E",
        "bg-secondary": "#111827",
        "bg-card": "#1F2937",
        "bg-hover": "#374151",
        "accent-orange": "#FF9900",
        critical: "#EF4444",
        high: "#F97316",
        normal: "#6B7280",
        success: "#22C55E",
        "text-primary": "#F9FAFB",
        "text-secondary": "#9CA3AF",
        border: "#374151",
        "border-orange": "#FF9900",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      animation: {
        "pulse-red": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-in-right": "slideInRight 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
