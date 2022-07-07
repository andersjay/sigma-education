/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          '500': '#121214'
        }
      }
    },
  },
  plugins: [],
}
