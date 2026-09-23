/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#4a654a",
        "primary-fixed": "#ccebc8",
        "on-surface": "#191c1b",
        "on-surface-variant": "#434841",
        "surface-container-low": "#f2f4f2",
        "outline-variant": "#c3c8bf",
        "secondary": "#595b84",
        "surface-container-high": "#e6e9e7",
        "secondary-fixed": "#e1e0ff",
      }
    },
  },
  plugins: [],
}
