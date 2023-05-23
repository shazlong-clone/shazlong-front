/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      green: '#3bb54a',
      white: '#fff',
      gray: '#262626',
      balck: '#000',
      cyan: '#3591a6',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
