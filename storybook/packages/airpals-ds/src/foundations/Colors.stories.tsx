import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic color tokens for Airpals DS. Collections: TailwindCSS → Primitives → Semantics. Always use Semantics tokens in components — never primitives or hex directly.',
      },
    },
  },
};
export default meta;

/* ── helpers ─────────────────────────────────────────────── */

type Swatch = { name: string; var: string; tailwind: string; hex: string };

function SwatchGrid({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div className="mb-10">
      <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {swatches.map((s) => (
          <div key={s.name} className="flex flex-col gap-1.5">
            <div
              className="h-14 w-full rounded-xl border border-slate-200 dark:border-slate-700"
              style={{ background: `var(${s.var})` }}
            />
            <p className="text-sm font-medium text-brand-navy dark:text-slate-50">{s.name}</p>
            <p className="font-mono text-xs text-slate-500">{s.tailwind}</p>
            <p className="font-mono text-xs text-slate-400">{s.hex}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── data ────────────────────────────────────────────────── */

const primitives: Swatch[] = [
  { name: 'brand/blue',           var: '--primitive-brand-blue',          tailwind: 'bg-brand-blue',        hex: '#0043FF' },
  { name: 'brand/pink',           var: '--primitive-brand-pink',          tailwind: 'bg-brand-pink',        hex: '#FC4575' },
  { name: 'brand/navy',           var: '--primitive-brand-navy',          tailwind: 'bg-brand-navy',        hex: '#1B306C' },
  { name: 'brand/blue-light',     var: '--primitive-brand-blue-light',    tailwind: 'bg-brand-blue-light',  hex: '#E6F1FD' },
  { name: 'brand/blue-sky',       var: '--primitive-brand-blue-sky',      tailwind: 'bg-brand-blue-sky',    hex: '#B4D5FF' },
  { name: 'brand/electric-blue',  var: '--primitive-brand-electric-blue', tailwind: 'bg-brand-electric-blue', hex: '#00A0FF' },
];

const backgroundTokens: Swatch[] = [
  { name: 'background/primary',   var: '--color-bg-primary',   tailwind: 'bg-white / dark:bg-slate-900',      hex: '#ffffff / #0f172a' },
  { name: 'background/secondary', var: '--color-bg-secondary', tailwind: 'bg-brand-blue-light / slate-800',   hex: '#E6F1FD / #1e293b' },
  { name: 'background/tertiary',  var: '--color-bg-tertiary',  tailwind: 'bg-brand-blue-sky / slate-700',     hex: '#B4D5FF / #334155' },
  { name: 'background/accent',    var: '--color-bg-accent',    tailwind: 'bg-brand-blue',                     hex: '#0043FF' },
  { name: 'background/accent-subtle',   var: '--color-bg-accent-subtle',   tailwind: 'bg-indigo-100 / indigo-950', hex: '#e0e7ff / #1e1b4b' },
  { name: 'background/accent-contrast', var: '--color-bg-accent-contrast', tailwind: 'bg-brand-navy',             hex: '#1B306C' },
  { name: 'background/disable',   var: '--color-bg-disable',   tailwind: 'bg-slate-200 / slate-500',         hex: '#e2e8f0 / #64748b' },
];

const textTokens: Swatch[] = [
  { name: 'text/primary',    var: '--color-text-primary',   tailwind: 'text-brand-navy / slate-50',   hex: '#1B306C / #f8fafc' },
  { name: 'text/secondary',  var: '--color-text-secondary', tailwind: 'text-slate-600 / slate-400',   hex: '#475569 / #94a3b8' },
  { name: 'text/tertiary',   var: '--color-text-tertiary',  tailwind: 'text-slate-500 / slate-400',   hex: '#64748b / #94a3b8' },
  { name: 'text/disable',    var: '--color-text-disable',   tailwind: 'text-slate-300 / slate-600',   hex: '#cbd5e1 / #475569' },
  { name: 'text/accent',     var: '--color-text-accent',    tailwind: 'text-brand-blue / blue-light', hex: '#0043FF / #E6F1FD' },
  { name: 'text/on-accent',  var: '--color-text-on-accent', tailwind: 'text-white',                   hex: '#ffffff' },
  { name: 'text/invert',     var: '--color-text-invert',    tailwind: 'text-white / slate-900',       hex: '#ffffff / #0f172a' },
];

const borderTokens: Swatch[] = [
  { name: 'border/primary',   var: '--color-border-primary',   tailwind: 'border-slate-200 / slate-700', hex: '#e2e8f0 / #334155' },
  { name: 'border/secondary', var: '--color-border-secondary', tailwind: 'border-slate-300 / slate-800', hex: '#cbd5e1 / #1e293b' },
  { name: 'border/accent',    var: '--color-border-accent',    tailwind: 'border-brand-blue',             hex: '#0043FF' },
];

const iconTokens: Swatch[] = [
  { name: 'icon/primary',   var: '--color-icon-primary',   tailwind: 'text-brand-navy / slate-200', hex: '#1B306C / #e2e8f0' },
  { name: 'icon/secondary', var: '--color-icon-secondary', tailwind: 'text-slate-500',              hex: '#64748b' },
  { name: 'icon/tertiary',  var: '--color-icon-tertiary',  tailwind: 'text-slate-300 / slate-400',  hex: '#cbd5e1 / #94a3b8' },
  { name: 'icon/accent',    var: '--color-icon-accent',    tailwind: 'text-brand-blue',             hex: '#0043FF' },
  { name: 'icon/disable',   var: '--color-icon-disable',   tailwind: 'text-slate-300 / slate-600',  hex: '#cbd5e1 / #475569' },
];

const ilustracionesTokens: Swatch[] = [
  { name: 'ilustraciones/background', var: '--color-ilus-background', tailwind: 'bg-brand-blue-light',     hex: '#E6F1FD' },
  { name: 'ilustraciones/details',    var: '--color-ilus-details',    tailwind: 'bg-brand-electric-blue',  hex: '#00A0FF' },
  { name: 'ilustraciones/contorn',    var: '--color-ilus-contorn',    tailwind: 'bg-brand-navy',            hex: '#1B306C' },
  { name: 'ilustraciones/clothes',    var: '--color-ilus-clothes',    tailwind: 'bg-brand-blue-sky',        hex: '#B4D5FF' },
];

/* ── story ───────────────────────────────────────────────── */

type Story = StoryObj;

export const AllTokens: Story = {
  name: 'All Tokens',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 min-h-screen font-body">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Airpals Color Tokens</h1>
        <p className="mt-2 text-sm text-slate-500">
          Rule: always use <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">Semantics</code> tokens in components.
          Never primitives directly. Never hex.
        </p>
      </div>
      <SwatchGrid title="Primitives — Brand" swatches={primitives} />
      <SwatchGrid title="Semantics — Background" swatches={backgroundTokens} />
      <SwatchGrid title="Semantics — Text" swatches={textTokens} />
      <SwatchGrid title="Semantics — Border" swatches={borderTokens} />
      <SwatchGrid title="Semantics — Icon" swatches={iconTokens} />
      <SwatchGrid title="Semantics — Ilustraciones" swatches={ilustracionesTokens} />
    </div>
  ),
};
