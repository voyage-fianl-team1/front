/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'matchgi-gray': '#9A9B9F',
        'matchgi-black': '#38393C',
        'matchgi-lightgray': '#F4F5F5',
        'matchgi-bordergray': '#DCDDE0',
        'matchgi-btnblue': '#14308B',
        'matchgi-white': '#FCFCFC',
      },
      fontFamily: {
        Noto: 'Noto Sans CJK KR',
        SD: 'Apple SD Gothic Neo',
      },
    },
  },
  plugins: [],
};
