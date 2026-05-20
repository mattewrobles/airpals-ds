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
    // spacing — full Tailwind scale (integers)
    { pattern: /^(p|m|gap|px|py|pt|pb|pl|pr)-(0|1|2|3|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/ },
    // spacing — decimal values (0.5, 1.5, 2.5, 3.5)
    { pattern: /^(p|m|gap|px|py|pt|pb|pl|pr)-(0\.5|1\.5|2\.5|3\.5)$/ },
    // border radius
    { pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
    // border width
    { pattern: /^border-(0|2|4|8)$/ },
    // brand colors
    { pattern: /^(bg|text|border)-(brand-(blue|pink|navy|blue-light|blue-sky|electric-blue))$/ },
    // slate
    { pattern: /^(bg|text|border)-slate-(50|100|200|300|400|500|600|700|800|900)$/ },
    // text size + weight
    { pattern: /^(text)-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/ },
    { pattern: /^font-(normal|medium|semibold|bold)$/ },
  ],
  plugins: [],
};
