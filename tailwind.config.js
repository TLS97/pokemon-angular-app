/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    colors: {
      purple: '#845EC2',
      blue: '#3B82F6',
      white: '#FFFFFF',

    },
  },
  plugins: [],
};
