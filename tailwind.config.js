/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0F172A', // Slate 900
        surface: '#1E293B', // Slate 800
        surfaceHover: '#334155', // Slate 700
        primary: '#6366F1', // Indigo 500
        primaryHover: '#4F46E5', // Indigo 600
        secondary: '#A855F7', // Purple 500
        accent: '#38BDF8', // Sky 400
        success: '#10B981', // Emerald 500
        danger: '#EF4444', // Red 500
        warning: '#F59E0B', // Amber 500
        textMain: '#F8FAFC', // Slate 50
        textMuted: '#94A3B8', // Slate 400
        border: '#334155' // Slate 700
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #6366F1, #A855F7)',
      }
    },
  },
  plugins: [],
}
