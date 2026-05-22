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
    version: 'v0.5.0',
    date: '2026-05-21',
    summary: 'Next.js compatibility + Yarn',
    changes: [
      { type: 'new',     text: '"use client" directive added to all 21 components — Next.js App Router ready' },
      { type: 'updated', text: 'package.json exports: types condition moved first for TypeScript 5 moduleResolution' },
      { type: 'updated', text: '@heroicons/react moved to peerDependencies + externalized in Vite build (bundle: ~600KB → ~86KB)' },
      { type: 'updated', text: 'Storybook framework migrated from @storybook/react-vite to @storybook/nextjs' },
      { type: 'new',     text: 'Package manager migrated to Yarn (yarn.lock committed, package-lock.json removed)' },
      { type: 'new',     text: 'Getting Started docs page with install, Next.js setup, TypeScript, and contributing guide' },
      { type: 'fixed',   text: 'Alert: added description prop for single-message use (alongside items[] for bullet lists)' },
      { type: 'fixed',   text: 'Checkbox: added onChange handler — was display-only, now interactive' },
    ],
  },
  {
    version: 'v0.4.0',
    date: '2026-05-14',
    summary: 'Dual HTML/JSX tabs + WCAG badges',
    changes: [
      { type: 'new',     text: 'Shared CodeBlock component with HTML + JSX dual tabs (src/shared/CodeBlock.tsx)' },
      { type: 'updated', text: 'All component stories now use shared CodeBlock — no more inline duplicates' },
      { type: 'new',     text: 'WCAG contrast ratio badges (AA / AAA) on every color swatch in Colors' },
      { type: 'new',     text: 'Download tokens as CSS Variables (tokens.css) and tailwind.config.js' },
      { type: 'new',     text: 'Changelog story (this file)' },
    ],
  },
  {
    version: 'v0.3.0',
    date: '2026-05-14',
    summary: 'New components from Figma REST API',
    changes: [
      { type: 'new',     text: 'Alert — Error + Warning, with/without list items (node 540-106)' },
      { type: 'new',     text: 'Checkbox — 5 states × 3 active modes × 2 sizes (node 594-98)' },
      { type: 'new',     text: 'Textarea — 4 states + helper text + character counter (node 625-3842)' },
      { type: 'new',     text: 'Toggle — 3 styles (Standard / Navy / Subtle) + compact With Text variant (node 625-3651)' },
      { type: 'new',     text: 'Avatar — 5 sizes × 4 corners × Initials / Image + online badge (node 624-1830)' },
      { type: 'new',     text: 'Radio — 4 states × 2 sizes + Radio Group story (node 583-215)' },
      { type: 'updated', text: 'Badge — 9 colors × 3 variants × 2 shapes, exact DS colors from Figma (node 625-2011)' },
      { type: 'updated', text: 'Input — exact border widths and focus color from Figma (node 625-2537)' },
    ],
  },
  {
    version: 'v0.2.0',
    date: '2026-05-14',
    summary: 'Foundations + token downloads',
    changes: [
      { type: 'new',     text: 'Colors story — semantic token swatches with click-to-copy hex / Tailwind / CSS var' },
      { type: 'new',     text: 'Tokens Reference story — spacing, radius, border-width, color tables' },
      { type: 'new',     text: 'Typography story — Lexend + Inter type scale' },
      { type: 'new',     text: 'Spacing story — visual scale with pixel values' },
      { type: 'new',     text: 'Download tokens.json from Tokens Reference and Colors pages' },
      { type: 'new',     text: 'Figma link integration via @storybook/addon-designs' },
    ],
  },
  {
    version: 'v0.1.0',
    date: '2026-05-14',
    summary: 'Initial setup',
    changes: [
      { type: 'new',     text: 'Storybook 8 monorepo at packages/airpals-ds' },
      { type: 'new',     text: 'Tailwind v3 with Airpals brand tokens (brand-blue, brand-navy, brand-pink…)' },
      { type: 'new',     text: 'Button component — 6 types × 3 sizes, Figma component keys table' },
      { type: 'new',     text: 'Chromatic CI via GitHub Actions (project chpt_2b241f1695bf492)' },
      { type: 'new',     text: 'Lexend + Inter loaded via @fontsource' },
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
