/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fafa',
          100: '#d1f5f5',
          200: '#a3ebeb',
          300: '#75e0e0',
          400: '#47d6d6',
          500: '#069494',
          600: '#057676',
          700: '#045959',
          800: '#023b3b',
          900: '#011e1e',
        },
        secondary: {
          50: '#e6f4ff',
          100: '#cce9ff',
          200: '#99d3ff',
          300: '#66bcff',
          400: '#33a6ff',
          500: '#1892d3',
          600: '#1474a8',
          700: '#0f577e',
          800: '#0a3a54',
          900: '#051d2a',
        },
        accent: {
          50: '#f7faff',
          100: '#eef5ff',
          200: '#deebff',
          300: '#cee0ff',
          400: '#bdd6ff',
          500: '#adccff',
          600: '#8aa3cc',
          700: '#687a99',
          800: '#455266',
          900: '#232933',
        },
        success: {
          500: '#61bf54',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};