/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "basic": "#111111",
        "main": "#16ABF8",
        "second": "#888888",
        "very-high": "#ED4C5C",
        "high": "#F8A541",
        "medium": "#00A790",
        "low": "#428BC1",
        "very-low": "#8942C1"
      }
    },
  },
  plugins: [],
}