import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Changelog',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Version history of the Airpals Design System. New entries go at the top.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ── Types ───────────────────────────────────────────────── */

type ChangeType = 'new' | 'updated' | 'fixed' | 'removed';

type Change = {
  type: ChangeType;
  text: string;
};

type Release = {
  version: string;
  date: string;
  summary: string;
  changes: Change[];
};

/* ── Badge ───────────────────────────────────────────────── */

const typeMeta: Record<ChangeType, { label: string; cls: string }> = {
  new:     { label: 'New',     cls: 'bg-[#22ad5c]/10 text-[#22ad5c]' },
  updated: { label: 'Updated', cls: 'bg-[#0043ff]/10 text-[#0043ff]' },
  fixed:   { label: 'Fixed',   cls: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
  removed: { label: 'Removed', cls: 'bg-[#ef4444]/10 text-[#ef4444]' },
};

function TypeBadge({ type }: { type: ChangeType }) {
  const m = typeMeta[type];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium font-mono ${m.cls}`}>
      {m.label}
    </span>
  );
}

/* ── Release card ────────────────────────────────────────── */

function ReleaseCard({ release }: { release: Release }) {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm font-semibold text-brand-navy dark:text-slate-50">{release.version}</span>
          <span className="text-xs text-slate-400">{release.date}</span>
        </div>
        <span className="text-xs text-slate-500">{release.summary}</span>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800">
        {release.changes.map((c, i) => (
          <li key={i} className="flex items-start gap-3 px-5 py-2.5">
            <TypeBadge type={c.type} />
            <span className="text-sm text-slate-700 dark:text-slate-300 leading-5 pt-0.5">{c.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Data ────────────────────────────────────────────────── */

const releases: Release[] = [
  {
    version: 'v0.5.6',
    date: '2026-07-23',
    summary: 'Footer responsive fix',
    changes: [
      { type: 'fixed', text: 'Footer: third links column clipping at sub-1280px viewports — removed flexShrink:0, changed to flex:0 1 640px, LinksColumn now uses flex:1 + minWidth:0; gap between newsletter and links reduced from 120 to 64' },
    ],
  },
  {
    version: 'v0.5.5',
    date: '2026-07-23',
    summary: 'SkeletonTableRow mobile',
    changes: [
      { type: 'fixed', text: 'SkeletonTableRow: row overflows viewport on mobile — capped at 3 visible columns via useIsMobile, added width:100% to container' },
    ],
  },
  {
    version: 'v0.5.4',
    date: '2026-07-23',
    summary: 'Skeleton + FeedbackDialog fluid width',
    changes: [
      { type: 'fixed', text: 'SkeletonCard: hardcoded width:240 → width:100%, maxWidth:240' },
      { type: 'fixed', text: 'SkeletonTableRow: cells used flex:1 0 0 (flex-shrink:0) causing overflow — changed to flex:1 1 0 + minWidth:0; overflow:hidden on row container' },
      { type: 'fixed', text: 'FeedbackDialog: hardcoded width:420 → width:100%, maxWidth:420' },
    ],
  },
  {
    version: 'v0.5.3',
    date: '2026-07-23',
    summary: 'DataCard mobile layout + Sidebar overflow',
    changes: [
      { type: 'fixed', text: 'DataCard Vertical/Horizontal: text, content and stepper overlapping on mobile — dedicated column layout via useIsMobile (thumbnail + title row on top, data + stepper row below)' },
      { type: 'fixed', text: 'Sidebar collapsed: skeleton bars overflowing the 66px collapsed container — overflow:hidden + flexShrink:0 added to containerStyle' },
    ],
  },
  {
    version: 'v0.5.2',
    date: '2026-07-23',
    summary: 'Responsive components audit — all components adapt to mobile viewport',
    changes: [
      { type: 'new',     text: 'useIsMobile hook — SSR-safe window.matchMedia at 768px breakpoint, exported from package root' },
      { type: 'updated', text: 'Navbar: auto-collapses to mobile layout on ≤768px; mobile width 375 → width:100%' },
      { type: 'updated', text: 'Footer: auto-switches to mobile layout on ≤768px; mobile width 390 → width:100%' },
      { type: 'updated', text: 'Sidebar: auto-collapses on mobile via useIsMobile' },
      { type: 'updated', text: 'Table: wrapped in overflow-x:auto scroll container with minWidth:max-content on inner div' },
      { type: 'updated', text: 'InfoCard: fixed width:385 → width:100%, maxWidth:385' },
      { type: 'updated', text: 'InfoSection: fluid layout, column flip on mobile (card first, illustration second), gap 127→32' },
      { type: 'updated', text: 'Breadcrumbs: flexWrap:wrap on <ol>, removed whiteSpace:nowrap from links' },
      { type: 'new',     text: 'Typography story: Medium weight (500) variants documented for body-lg, body-md, body-sm, caption' },
    ],
  },
  {
    version: 'v0.5.1',
    date: '2026-07-22',
    summary: '8 bug fixes · token sync · TypeScript fix',
    changes: [
      { type: 'fixed',   text: 'Tag: wrong brand blue rgba(55,88,249) → rgba(0,67,255) in Default and Focus states' },
      { type: 'fixed',   text: 'Textarea: controlled/uncontrolled conflict (value + defaultValue passed simultaneously); charCount goes stale when external value resets' },
      { type: 'fixed',   text: 'Input: border-surface-disable wrong semantic token (surface is background, not border) → border-line-disable; hardcoded border/helper colors → semantic tokens; controlled/uncontrolled conflict' },
      { type: 'fixed',   text: 'Table: isNumber detection was col.type === "text" && align === "right" → now correctly col.type === "number"; hardcoded #ffffff and #e5e7eb → CSS vars' },
      { type: 'fixed',   text: 'Checkbox: .indeterminate DOM property never set — CSS :indeterminate selector never matched → useEffect sets it imperatively' },
      { type: 'fixed',   text: 'Stepper: group-hover highlighted both buttons simultaneously → individual hover: per button' },
      { type: 'fixed',   text: 'Sidebar: fontFamily Lexend on "Sign out" link in collapsed state → Inter' },
      { type: 'fixed',   text: 'ToggleWithText: bg-surface-secondary/50 opacity modifier broken in Tailwind v3 with CSS var hex values → bg-surface-tertiary' },
      { type: 'updated', text: 'tokens.css: synced with Figma Semantics — new primitives (gray-50/150/400/600/800, brand extended), corrected background/tertiary, background/disabled, text/disabled, border/error, border/success values; new semantic tokens: critical, ship, interactive-hover/pressed, overlay, backdrop, surbase-dashboard, on-* variants' },
      { type: 'updated', text: 'tailwind.config.js: surface/ink/line/icon color objects and safelist extended with all new semantic tokens' },
      { type: 'fixed',   text: 'TableCellType: added "number" to union — TypeScript TS2367 error on col.type === "number" comparison' },
      { type: 'updated', text: 'tokens.css typography: desktop scale line-heights corrected to exact Figma values (h1: 1.083, h3: 1.333, h4: 1.333, body-lg: 1.556, body-md: 1.5, body-sm: 1.429, caption: 1.333)' },
      { type: 'new',     text: 'tokens.css: medium (500) and semibold (600) weight variants for body-lg, body-md, body-sm — --type-lg-weight-md/sb, --type-md-weight-md/sb, --type-sm-weight-md/sb, --type-xs-weight-md' },
      { type: 'new',     text: 'tokens.css: full mobile type scale — --type-*-m-size / --type-*-m-lh for h1–h4, subheading, body-lg/md/sm, caption. Auto-applied via @media (max-width: 768px)' },
    ],
  },
  {
    version: 'v0.5.0',
    date: '2026-06-29',
    summary: '17 new components · full Storybook docs · motion tokens',
    changes: [
      { type: 'new',     text: 'Accordion + AccordionGroup — Small/Large sizes, optional icon, controlled + uncontrolled, disabled state' },
      { type: 'new',     text: 'ButtonDouble — two-action button for confirm/cancel patterns' },
      { type: 'new',     text: 'DataCard — metric card with label, value, optional trend badge and sparkline slot' },
      { type: 'new',     text: 'Divider — horizontal rule with optional label, DS-matching weight and color' },
      { type: 'new',     text: 'FeedbackDialog — modal for collecting 1–5 star feedback with optional comment textarea' },
      { type: 'new',     text: 'IconButton — icon-only button, 5 sizes, all Button type variants, tooltip support' },
      { type: 'new',     text: 'InfoCard — feature card with image, title, paragraph, optional chip and CTA' },
      { type: 'new',     text: 'InfoSection — two-column layout block for landing/marketing pages, illustration + InfoCard' },
      { type: 'new',     text: 'ProgressStep — labeled step indicator with active/inactive state, icon slot' },
      { type: 'new',     text: 'Rating — 1–5 stars, read-only or interactive, Normal/Small sizes' },
      { type: 'new',     text: 'Sidebar — collapsible navigation with icon + label items, active state, collapse toggle' },
      { type: 'new',     text: 'Skeleton / SkeletonCard / SkeletonTableRow — loading placeholders for text lines, cards, and table rows' },
      { type: 'new',     text: 'Stepper — numeric input +/− with min/max/step, form-compatible' },
      { type: 'new',     text: 'Table + TableHeader + TableCell — full data table system with sorting, checkboxes, badge/avatar/text cell types' },
      { type: 'new',     text: 'Motion tokens in tokens.css — --motion-fast (100ms), --motion-base (200ms), --motion-slow (350ms) with Material Motion easing curves (--ease-out, --ease-in, --ease-std, --ease-spring). All transitions in DS components use these tokens. prefers-reduced-motion respected globally.' },
      { type: 'new',     text: 'Storybook: 35 story files covering all 38 components — every component fully documented with usage, props table, and code examples' },
      { type: 'removed', text: 'ButtonDemo — internal prototype component removed from public exports' },
      { type: 'updated', text: 'index.ts: full barrel export of all 38 components and their prop types' },
    ],
  },
  {
    version: 'v0.4.2',
    date: '2026-06-16',
    summary: 'Turbopack exports fix',
    changes: [
      { type: 'fixed',   text: 'package.json exports: added "./dist/style.css" path — Turbopack requires exact path match (Jimmy was importing airpals-ds/dist/style.css which failed with only ./style.css in exports)' },
    ],
  },
  {
    version: 'v0.4.1',
    date: '2026-06-16',
    summary: 'ButtonDemo component',
    changes: [
      { type: 'new',     text: 'ButtonDemo — internal demo button from Figma node 850-1930 (brand-pink background, rounded-xl)' },
    ],
  },
  {
    version: 'v0.4.0',
    date: '2026-06-01',
    summary: 'Tailwind preset + Tag fix + Storybook docs improvements',
    changes: [
      { type: 'new',     text: 'tailwind.preset.js — ships all DS tokens as a Tailwind preset; consuming projects can now use brand-blue, brand-navy, surface-*, ink-* classes without defining them manually' },
      { type: 'new',     text: 'Colors.stories.tsx — semantic token swatches with click-to-copy hex / Tailwind / CSS var + WCAG contrast ratio badges (AA / AAA) on every swatch' },
      { type: 'new',     text: 'Shared CodeBlock component (src/shared/CodeBlock.tsx) with HTML + JSX dual tabs — all component stories updated to use it' },
      { type: 'new',     text: 'Download tokens as CSS Variables (tokens.css) and tailwind.config.js from Tokens Reference + Colors pages' },
      { type: 'fixed',   text: 'Tag: full rewrite to match Figma node 625-4040 — default bg-brand-blue/8 (no border), hover bg-surface-accent + white text, disable bg-surface-disable + navy text. Sizing: px-3.5 py-[5px] rounded-md text-base' },
    ],
  },
  {
    version: 'v0.3.3',
    date: '2026-05-27',
    summary: 'Deps fix + Tailwind v3 content fix',
    changes: [
      { type: 'fixed',   text: '@heroicons/react back to dependencies at ^1.0.6 (v1) — installs automatically with the package' },
      { type: 'updated', text: 'tailwindcss added to peerDependencies — required in consuming project for Tailwind classes to work' },
      { type: 'fixed',   text: 'README: critical Tailwind v3 fix — content array must include node_modules/airpals-ds/dist or component styles get purged (colors/spacing not showing)' },
    ],
  },
  {
    version: 'v0.3.2',
    date: '2026-05-27',
    summary: 'tokens.css shipped in package + sideEffects fix',
    changes: [
      { type: 'updated', text: 'package.json files: added src/tokens/tokens.css — CSS token file now included in npm package' },
      { type: 'fixed',   text: 'sideEffects: ["**/*.css"] — prevents bundlers from tree-shaking CSS imports' },
    ],
  },
  {
    version: 'v0.3.0',
    date: '2026-05-27',
    summary: 'Semantic token system + Alert rewrite',
    changes: [
      { type: 'new',     text: 'tokens.css: status primitive scales (green/red/amber/blue 50–950) + status semantic tokens for bg/text/icon/border in light and dark mode' },
      { type: 'new',     text: 'tokens.css: typography scale tokens (--type-h1 through --type-xs with size, line-height and weight)' },
      { type: 'updated', text: 'tailwind.config.js: semantic color groups surface/ink/line/icon mapped to CSS vars + ds-* fontSize scale + updated safelist patterns' },
      { type: 'updated', text: 'Alert: full rewrite — 5 use cases (error/warning/success/info/alert) replacing 2-type system, new border prop, all colors via semantic tokens' },
      { type: 'updated', text: 'All 21 components migrated from hardcoded hex to semantic Tailwind classes (surface-accent, ink-primary, line-focus, etc.)' },
      { type: 'new',     text: 'Dark mode ready — components now respond to .dark class via CSS variable swapping (was broken with hardcoded hex)' },
    ],
  },
  {
    version: 'v0.2.3',
    date: '2026-05-27',
    summary: 'Tailwind + Icons fix',
    changes: [
      { type: 'fixed',   text: 'Storybook viteFinal: PostCSS not passed to Vite internal — Tailwind styles were imported but never processed' },
      { type: 'fixed',   text: 'tailwind.config.js content: added .storybook/**/*.{ts,tsx} — classes used in stories/preview were being purged' },
      { type: 'fixed',   text: 'tailwind.css: @import (Google Fonts) moved before @tailwind base — CSS spec requires @import first' },
      { type: 'fixed',   text: 'Icon.tsx: silent .catch(() => null) replaced with console.warn — icons were failing invisibly' },
    ],
  },
  {
    version: 'v0.2.1',
    date: '2026-05-21',
    summary: 'Source files + copy-paste usage',
    changes: [
      { type: 'new',     text: 'src/lib/*.tsx source files now shipped inside the npm package — copy any component directly into your project and edit freely' },
      { type: 'updated', text: 'package.json files field includes src/lib and src/shared alongside dist' },
      { type: 'fixed',   text: 'Navbar: replaced hardcoded "airpals" text with <Logo color="dark-blue" /> component' },
      { type: 'fixed',   text: 'Footer: replaced hardcoded "airpals" text with <Logo color="white" /> in both mobile and desktop layouts' },
      { type: 'fixed',   text: 'Icon palette: duplicate "tag" entry removed — was causing icon accumulation bug when switching Outline/Solid variants' },
    ],
  },
  {
    version: 'v0.2.0',
    date: '2026-05-21',
    summary: 'Controlled components + forwardRef + Next.js App Router',
    changes: [
      { type: 'new',     text: '"use client" directive added to all 21 components — Next.js App Router ready out of the box' },
      { type: 'updated', text: 'Button: forwardRef, explicit type="button", className + aria-label props' },
      { type: 'updated', text: 'Input: forwardRef, controlled/uncontrolled hybrid (value + defaultValue + onChange), useEffect sync, htmlFor label, aria-invalid' },
      { type: 'updated', text: 'Textarea: forwardRef, same controlled pattern as Input, character counter uses live value' },
      { type: 'updated', text: 'Dropdown: forwardRef, onChange callback, ARIA listbox/option roles, hidden input for form name' },
      { type: 'updated', text: 'RadioButton: rewritten with native sr-only <input type="radio"> for keyboard nav, form submission and screen readers' },
      { type: 'fixed',   text: 'Toggle: knob no longer escapes track — added left-0 + overflow-hidden, translate-x corrected to 25px' },
      { type: 'fixed',   text: 'ToggleWithText compact: symmetric 4px padding on both sides (translate-x-1 off, translate-x-[22px] on)' },
      { type: 'updated', text: '@heroicons/react moved to peerDependencies + externalized in Vite build (bundle: ~600KB → ~86KB)' },
    ],
  },
  {
    version: 'v0.1.0',
    date: '2026-05-14',
    summary: 'Initial release',
    changes: [
      { type: 'new',     text: 'Storybook 8 setup with @storybook/nextjs framework' },
      { type: 'new',     text: '21 components: Alert, Avatar, AvatarGroup, Badge, Breadcrumbs, Button, Checkbox, ClickableLink, Dropdown, Footer, Icon, Input, Logo, Navbar, Pagination, Radio, SplitButton, Tag, Textarea, Toggle, ToggleWithText' },
      { type: 'new',     text: 'Tailwind v3 with Airpals brand tokens (brand-blue #0043FF, brand-navy #1B306C, brand-pink #FC4575)' },
      { type: 'new',     text: 'Foundations: Colors, Typography, Spacing, Grid & Breakpoints, Shadows, Tokens Reference, Getting Started' },
      { type: 'new',     text: 'Chromatic CI via GitHub Actions — Storybook deploys on every push to main' },
      { type: 'new',     text: 'Lexend + Inter loaded via @fontsource' },
      { type: 'new',     text: 'Vite lib build — outputs ESM + CJS + TypeScript declarations' },
    ],
  },
];

/* ── Story ───────────────────────────────────────────────── */

export const AllReleases: Story = {
  name: 'Changelog',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body max-w-3xl space-y-4">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Changelog</h1>
        <p className="mt-2 text-sm text-slate-500">Airpals Design System — version history. Latest first.</p>
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          {(['new', 'updated', 'fixed', 'removed'] as ChangeType[]).map(t => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      </div>
      {releases.map(r => <ReleaseCard key={r.version} release={r} />)}
    </div>
  ),
};
