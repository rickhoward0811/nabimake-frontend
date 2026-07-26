/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rosa-claro': '#FCE4EC',
        'rosa-medio': '#F8BBD0',
        'rosa-escuro': '#E91E63',
        'bege-claro': '#F5F0E8',
        'marrom': '#C4A882',
        'marrom-escuro': '#3D2C1E',
        'pink-50': '#FCE4EC',
        'pink-200': '#F8BBD0',
        'pink-300': '#F48FB1',
        'pink-500': '#E91E63',
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'corpo': ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}