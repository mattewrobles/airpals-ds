/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue:           '#0043FF',
          pink:           '#FC4575',
          navy:           '#1B306C',
          'blue-light':   '#E6F1FD',
          'blue-sky':     '#B4D5FF',
          'electric-blue':'#00A0FF',
        },
      },
      fontFamily: {
        heading: ['Lexend', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
