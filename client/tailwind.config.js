/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080D1A',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155'
        }
      }
    },
  },
  plugins: [],
}
