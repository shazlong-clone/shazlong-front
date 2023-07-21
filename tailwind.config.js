/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        green: '#3bb54a',
        white: '#fff',
        gray: '#262626',
        balck: '#000',
        cyan: '#3591a6',
      },
      keyframes: {
        rclock: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        raclock: {
          '0%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        rclock: 'rclock 300ms 1 forwards',
        raclock: 'raclock 300ms 1 forwards',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
