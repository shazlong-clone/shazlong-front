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
        scalldown: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
        scallup: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        openchat: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        closechat: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        rclock: 'rclock 300ms 1 forwards',
        raclock: 'raclock 300ms 1 forwards',
        scalldown: 'scalldown 300ms   1 forwards',
        scallup: 'scallup  300ms  1 forwards',
        openchat: 'openchat  300ms cubic-bezier(0, 0, 0.74, 1.29) 1 forwards',
        closechat: 'closechat  300ms   1 forwards',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwindcss-rtl'),
  ],
  corePlugins: {
    preflight: false,
  },
};
