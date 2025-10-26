/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Open Sans'", "ui-sans-serif", "system-ui"]
      },
      colors: {
        primary: {
          DEFAULT: "#2A4B8D",
          50: "#f1f5ff",
          100: "#e1e9ff",
          200: "#c3d3ff",
          300: "#9db4ff",
          400: "#7090f7",
          500: "#4c6cd4",
          600: "#3750aa",
          700: "#2a3f87",
          800: "#22336c",
          900: "#1f2b57"
        },
        severity: {
          critical: "#d32f2f",
          high: "#f44336",
          medium: "#ff9800",
          low: "#4caf50"
        }
      },
      boxShadow: {
        header: "0 10px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
