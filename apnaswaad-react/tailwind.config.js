/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peach': {
          50: '#FFF8F0',
          100: '#FFF3E0',
          200: '#FFE0B2',
        },
        'indigo': {
          50: '#E8EAF6',
          100: '#C5CAE9',
          900: '#1A237E',
        },
        'gold': {
          500: '#FFD700',
        },
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'source-sans': ['Source Sans Pro', 'sans-serif'],
      },
      animation: {
        'slide-in': 'slideIn 0.8s ease-out forwards',
        'tilt': 'tilt 0.4s ease',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideIn: {
          'from': { opacity: '0', transform: 'translateX(-20px)' },
          'to': { opacity: '1', transform: 'translateX(0)' },
        },
        tilt: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(251, 191, 36, 0.5)',
        'glow-lg': '0 0 30px rgba(251, 191, 36, 0.7)',
      },
    },
  },
  plugins: [],
}
