/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── Brand primitives ─────────────────────────────────────
        brand: {
          blue:           '#0043FF',
          pink:           '#FC4575',
          navy:           '#1B306C',
          'blue-light':   '#E6F1FD',
          'blue-sky':     '#B4D5FF',
          'electric-blue':'#00A0FF',
        },

        // ── Semantic — Surface (backgrounds) ─────────────────────
        surface: {
          primary:     'var(--color-bg-primary)',
          secondary:   'var(--color-bg-secondary)',
          tertiary:    'var(--color-bg-tertiary)',
          accent:      'var(--color-bg-accent)',
          'accent-subtle':   'var(--color-bg-accent-subtle)',
          'accent-contrast': 'var(--color-bg-accent-contrast)',
          transparent: 'var(--color-bg-primary-transparent)',
          disable:     'var(--color-bg-disable)',
          success:     'var(--color-bg-success)',
          error:       'var(--color-bg-error)',
          warning:     'var(--color-bg-warning)',
          info:        'var(--color-bg-info)',
        },

        // ── Semantic — Ink (text) ─────────────────────────────────
        ink: {
          primary:    'var(--color-text-primary)',
          secondary:  'var(--color-text-secondary)',
          tertiary:   'var(--color-text-tertiary)',
          disable:    'var(--color-text-disable)',
          accent:     'var(--color-text-accent)',
          'on-accent':'var(--color-text-on-accent)',
          invert:     'var(--color-text-invert)',
          success:    'var(--color-text-success)',
          error:      'var(--color-text-error)',
          warning:    'var(--color-text-warning)',
          info:       'var(--color-text-info)',
        },

        // ── Semantic — Line (borders) ─────────────────────────────
        line: {
          primary:   'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          accent:    'var(--color-border-accent)',
          disable:   'var(--color-border-disable)',
          focus:     'var(--color-border-focus)',
          error:     'var(--color-border-error)',
          success:   'var(--color-border-success)',
          invert:    'var(--color-border-invert)',
        },

        // ── Semantic — Icon ───────────────────────────────────────
        icon: {
          primary:    'var(--color-icon-primary)',
          secondary:  'var(--color-icon-secondary)',
          tertiary:   'var(--color-icon-tertiary)',
          disable:    'var(--color-icon-disable)',
          accent:     'var(--color-icon-accent)',
          'on-accent':'var(--color-icon-on-accent)',
          invert:     'var(--color-icon-invert)',
          success:    'var(--color-icon-success)',
          error:      'var(--color-icon-error)',
          warning:    'var(--color-icon-warning)',
          info:       'var(--color-icon-info)',
        },
      },

      fontFamily: {
        heading: ['Lexend', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },

      // ── Typography scale ──────────────────────────────────────
      fontSize: {
        'ds-h1': ['var(--type-h1-size)', { lineHeight: 'var(--type-h1-lh)', fontWeight: 'var(--type-h1-weight)' }],
        'ds-h2': ['var(--type-h2-size)', { lineHeight: 'var(--type-h2-lh)', fontWeight: 'var(--type-h2-weight)' }],
        'ds-h3': ['var(--type-h3-size)', { lineHeight: 'var(--type-h3-lh)', fontWeight: 'var(--type-h3-weight)' }],
        'ds-h4': ['var(--type-h4-size)', { lineHeight: 'var(--type-h4-lh)', fontWeight: 'var(--type-h4-weight)' }],
        'ds-sub':['var(--type-sub-size)',{ lineHeight: 'var(--type-sub-lh)', fontWeight: 'var(--type-sub-weight)' }],
        'ds-lg': ['var(--type-lg-size)', { lineHeight: 'var(--type-lg-lh)', fontWeight: 'var(--type-lg-weight)' }],
        'ds-md': ['var(--type-md-size)', { lineHeight: 'var(--type-md-lh)', fontWeight: 'var(--type-md-weight)' }],
        'ds-sm': ['var(--type-sm-size)', { lineHeight: 'var(--type-sm-lh)', fontWeight: 'var(--type-sm-weight)' }],
        'ds-xs': ['var(--type-xs-size)', { lineHeight: 'var(--type-xs-lh)', fontWeight: 'var(--type-xs-weight)' }],
      },
    },
  },
  safelist: [
    // ── Spacing — integers ───────────────────────────────────────
    { pattern: /^(p|m|gap|px|py|pt|pb|pl|pr)-(0|1|2|3|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/ },
    // ── Spacing — decimals ────────────────────────────────────────
    { pattern: /^(p|m|gap|px|py|pt|pb|pl|pr)-(0\.5|1\.5|2\.5|3\.5)$/ },
    // ── Border radius ─────────────────────────────────────────────
    { pattern: /^rounded(-none|-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/ },
    // ── Border width ──────────────────────────────────────────────
    { pattern: /^border-(0|2|4|8)$/ },

    // ── Semantic — surface ────────────────────────────────────────
    { pattern: /^bg-surface-(primary|secondary|tertiary|accent|accent-subtle|accent-contrast|transparent|disable|success|error|warning|info)$/ },
    // ── Semantic — ink ────────────────────────────────────────────
    { pattern: /^text-ink-(primary|secondary|tertiary|disable|accent|on-accent|invert|success|error|warning|info)$/ },
    // ── Semantic — line ───────────────────────────────────────────
    { pattern: /^border-line-(primary|secondary|accent|disable|focus|error|success|invert)$/ },
    // ── Semantic — icon ───────────────────────────────────────────
    { pattern: /^(bg|text)-icon-(primary|secondary|tertiary|disable|accent|on-accent|invert|success|error|warning|info)$/ },

    // ── Brand colors ──────────────────────────────────────────────
    { pattern: /^(bg|text|border)-(brand-(blue|pink|navy|blue-light|blue-sky|electric-blue))$/ },
    // ── Slate ─────────────────────────────────────────────────────
    { pattern: /^(bg|text|border)-slate-(50|100|200|300|400|500|600|700|800|900|950)$/ },

    // ── Text size ─────────────────────────────────────────────────
    { pattern: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/ },
    { pattern: /^text-ds-(h1|h2|h3|h4|sub|lg|md|sm|xs)$/ },
    // ── Font weight ───────────────────────────────────────────────
    { pattern: /^font-(normal|medium|semibold|bold)$/ },
    // ── Font family ───────────────────────────────────────────────
    { pattern: /^font-(heading|body)$/ },
  ],
  plugins: [],
};
