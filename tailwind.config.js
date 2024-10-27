/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-dark': '#010101',
        'cyber-primary': '#740000',
        'cyber-secondary': '#825353',
        'cyber-light': '#D9D9D9',
      },
      fontFamily: {
        'tektur': ['Tektur', 'sans-serif'],
      },
    },
  },
  plugins: [],
};