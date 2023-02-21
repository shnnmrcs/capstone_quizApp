/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    screens: {
      mobile: '480px',
      ...defaultTheme.screens,
    },
    extend: {
      animation: {
        fade: 'fadeOut 1s ease-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
