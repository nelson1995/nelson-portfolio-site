/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      'backgroundImage':{
        'beige': 'url("../public/svg-icons/circle-scatter-beige.svg")',
        'dark': 'url("../public/svg-icons/circle-scatter-dark.svg")'
      }
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'h1': { fontSize: theme('fontSize.2xl') },
        'h2': { fontSize: theme('fontSize.xl') },
        'h3': { fontSize: theme('fontSize.lg') },
        'h4': { fontSize: theme('fontSize.md') },
        'h5': { fontSize: theme('fontSize.sm') },
        'h6': { fontSize: theme('fontSize.xs') },
      })
    })
  ],
}
