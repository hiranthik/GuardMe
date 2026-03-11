// tailwind.config.ts
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // You already have this
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        // Light mode
        tremor: {
          brand: {
            faint: "#eff6ff",      // blue-50
            muted: "#bfdbfe",      // blue-200
            subtle: "#60a5fa",     // blue-400
            DEFAULT: "#3b82f6",    // blue-500
            emphasis: "#1d4ed8",   // blue-700
            inverted: "#ffffff",   // white
          },
          background: {
            muted: "#f8fafc",      // slate-50
            subtle: "#f1f5f9",     // slate-100
            DEFAULT: "#ffffff",    // white
            emphasis: "#334155",   // slate-700
          },
          border: {
            DEFAULT: "#e2e8f0",    // slate-200
          },
          ring: {
            DEFAULT: "#e2e8f0",    // slate-200
          },
          content: {
            subtle: "#94a3b8",     // slate-400
            DEFAULT: "#64748b",    // slate-500
            emphasis: "#334155",   // slate-700
            strong: "#0f172a",     // slate-900
            inverted: "#ffffff",   // white
          },
        },
      },
      boxShadow: {
        // Tremor UI components
        "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        "tremor-small": "0.375rem",
        "tremor-default": "0.5rem",
        "tremor-full": "9999px",
      },
      fontSize: {
        "tremor-label": ["0.75rem", { lineHeight: "1rem" }],
        "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
        "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
        "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
      },
    },
  },
  // If you want the colors to work inside the chart, 
  // you often need to safelist the fill classes
  safelist: [
    {
      pattern:
        /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
    },
  ],
  plugins: [require("@tailwindcss/forms")],
};

export default config;