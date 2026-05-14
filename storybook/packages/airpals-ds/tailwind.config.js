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
  safelist: [
    // spacing
    { pattern: /^(p|m|gap|px|py|pt|pb|pl|pr)-(0|1|2|3|4|5|6|8|10|12|16|20)$/ },
    // border radius
    { pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
    // brand colors
    { pattern: /^(bg|text|border)-(brand-(blue|pink|navy|blue-light|blue-sky|electric-blue))$/ },
    // slate
    { pattern: /^(bg|text|border)-slate-(50|100|200|300|400|500|600|700|800|900)$/ },
    // sizing
    { pattern: /^(text)-(xs|sm|base|lg|xl|2xl|3xl|4xl)$/ },
    { pattern: /^font-(normal|medium|semibold|bold)$/ },
  ],
  plugins: [],
};
