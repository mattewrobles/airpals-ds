import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'Foundations/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Semantic color tokens for Airpals DS. Always use **Semantics** tokens in components — never primitives or hex directly. Click any value to copy it.',
      },
    },
  },
};
export default meta;

/* ── Copy hook ───────────────────────────────────────────── */

function useCopy(timeout = 1400) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), timeout);
  };
  return { copy, copied };
}

/* ── Swatch card ─────────────────────────────────────────── */

type Swatch = { name: string; var: string; tailwind: string; hex: string };

function SwatchCard({ s }: { s: Swatch }) {
  const { copy, copied } = useCopy();
  return (
    <div className="flex flex-col gap-1.5">
      {/* Color block — click to copy hex */}
      <button
        onClick={() => copy(s.hex.split(' /')[0])}
        title={`Copy ${s.hex}`}
        className="group relative h-14 w-full rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
        style={{ background: `var(${s.var})` }}
      >
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 text-xs font-mono text-white font-medium">
          {copied === s.hex.split(' /')[0] ? '✓ copied' : s.hex.split(' /')[0]}
        </span>
      </button>

      {/* Token name */}
      <p className="text-sm font-medium text-brand-navy dark:text-slate-50 leading-tight">{s.name}</p>

      {/* Tailwind — click to copy */}
      <button
        onClick={() => copy(s.tailwind)}
        title={`Copy ${s.tailwind}`}
        className="font-mono text-xs text-brand-blue dark:text-brand-electric-blue text-left hover:underline"
      >
        {copied === s.tailwind ? '✓ copied' : s.tailwind}
      </button>

      {/* CSS var — click to copy */}
      <button
        onClick={() => copy(`var(${s.var})`)}
        title={`Copy var(${s.var})`}
        className="font-mono text-xs text-slate-400 text-left hover:underline"
      >
        {copied === `var(${s.var})` ? '✓ copied' : `var(${s.var})`}
      </button>
    </div>
  );
}

function SwatchGrid({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div className="mb-10">
      <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {swatches.map((s) => <SwatchCard key={s.name} s={s} />)}
      </div>
    </div>
  );
}

/* ── Download JSON ───────────────────────────────────────── */

function DownloadJSON({ all }: { all: Swatch[] }) {
  const handleDownload = () => {
    const json: Record<string, { cssVar: string; tailwind: string; hex: string }> = {};
    all.forEach((s) => {
      json[s.name] = { cssVar: `var(${s.var})`, tailwind: s.tailwind, hex: s.hex };
    });
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'airpals-color-tokens.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-brand-navy dark:text-slate-50 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 12l-4-4h2.5V3h3v5H12L8 12zM3 13h10v1H3v-1z"/>
      </svg>
      Download tokens.json
    </button>
  );
}

/* ── data ────────────────────────────────────────────────── */

const primitives: Swatch[] = [
  { name: 'brand/blue',          var: '--primitive-brand-blue',          tailwind: 'bg-brand-blue',           hex: '#0043FF' },
  { name: 'brand/pink',          var: '--primitive-brand-pink',          tailwind: 'bg-brand-pink',           hex: '#FC4575' },
  { name: 'brand/navy',          var: '--primitive-brand-navy',          tailwind: 'bg-brand-navy',           hex: '#1B306C' },
  { name: 'brand/blue-light',    var: '--primitive-brand-blue-light',    tailwind: 'bg-brand-blue-light',     hex: '#E6F1FD' },
  { name: 'brand/blue-sky',      var: '--primitive-brand-blue-sky',      tailwind: 'bg-brand-blue-sky',       hex: '#B4D5FF' },
  { name: 'brand/electric-blue', var: '--primitive-brand-electric-blue', tailwind: 'bg-brand-electric-blue', hex: '#00A0FF' },
];

const backgroundTokens: Swatch[] = [
  { name: 'background/primary',         var: '--color-bg-primary',         tailwind: 'bg-white dark:bg-slate-900',        hex: '#ffffff / #0f172a' },
  { name: 'background/secondary',        var: '--color-bg-secondary',        tailwind: 'bg-brand-blue-light dark:bg-slate-800', hex: '#E6F1FD / #1e293b' },
  { name: 'background/tertiary',         var: '--color-bg-tertiary',         tailwind: 'bg-brand-blue-sky dark:bg-slate-700',   hex: '#B4D5FF / #334155' },
  { name: 'background/accent',           var: '--color-bg-accent',           tailwind: 'bg-brand-blue',                    hex: '#0043FF' },
  { name: 'background/accent-subtle',    var: '--color-bg-accent-subtle',    tailwind: 'bg-indigo-100 dark:bg-indigo-950', hex: '#e0e7ff / #1e1b4b' },
  { name: 'background/accent-contrast',  var: '--color-bg-accent-contrast',  tailwind: 'bg-brand-navy',                    hex: '#1B306C' },
  { name: 'background/disable',          var: '--color-bg-disable',          tailwind: 'bg-slate-200 dark:bg-slate-500',   hex: '#e2e8f0 / #64748b' },
];

const textTokens: Swatch[] = [
  { name: 'text/primary',   var: '--color-text-primary',   tailwind: 'text-brand-navy dark:text-slate-50',  hex: '#1B306C / #f8fafc' },
  { name: 'text/secondary', var: '--color-text-secondary', tailwind: 'text-slate-600 dark:text-slate-400',  hex: '#475569 / #94a3b8' },
  { name: 'text/tertiary',  var: '--color-text-tertiary',  tailwind: 'text-slate-500 dark:text-slate-400',  hex: '#64748b / #94a3b8' },
  { name: 'text/disable',   var: '--color-text-disable',   tailwind: 'text-slate-300 dark:text-slate-600',  hex: '#cbd5e1 / #475569' },
  { name: 'text/accent',    var: '--color-text-accent',    tailwind: 'text-brand-blue dark:text-brand-blue-light', hex: '#0043FF / #E6F1FD' },
  { name: 'text/on-accent', var: '--color-text-on-accent', tailwind: 'text-white',                          hex: '#ffffff' },
  { name: 'text/invert',    var: '--color-text-invert',    tailwind: 'text-white dark:text-slate-900',      hex: '#ffffff / #0f172a' },
];

const borderTokens: Swatch[] = [
  { name: 'border/primary',   var: '--color-border-primary',   tailwind: 'border-slate-200 dark:border-slate-700', hex: '#e2e8f0 / #334155' },
  { name: 'border/secondary', var: '--color-border-secondary', tailwind: 'border-slate-300 dark:border-slate-800', hex: '#cbd5e1 / #1e293b' },
  { name: 'border/accent',    var: '--color-border-accent',    tailwind: 'border-brand-blue',                      hex: '#0043FF' },
];

const iconTokens: Swatch[] = [
  { name: 'icon/primary',   var: '--color-icon-primary',   tailwind: 'text-brand-navy dark:text-slate-200', hex: '#1B306C / #e2e8f0' },
  { name: 'icon/secondary', var: '--color-icon-secondary', tailwind: 'text-slate-500',                      hex: '#64748b' },
  { name: 'icon/tertiary',  var: '--color-icon-tertiary',  tailwind: 'text-slate-300 dark:text-slate-400',  hex: '#cbd5e1 / #94a3b8' },
  { name: 'icon/accent',    var: '--color-icon-accent',    tailwind: 'text-brand-blue',                     hex: '#0043FF' },
  { name: 'icon/disable',   var: '--color-icon-disable',   tailwind: 'text-slate-300 dark:text-slate-600',  hex: '#cbd5e1 / #475569' },
];

const ilustracionesTokens: Swatch[] = [
  { name: 'ilustraciones/background', var: '--color-ilus-background', tailwind: 'bg-brand-blue-light',     hex: '#E6F1FD' },
  { name: 'ilustraciones/details',    var: '--color-ilus-details',    tailwind: 'bg-brand-electric-blue',  hex: '#00A0FF' },
  { name: 'ilustraciones/contorn',    var: '--color-ilus-contorn',    tailwind: 'bg-brand-navy',            hex: '#1B306C' },
  { name: 'ilustraciones/clothes',    var: '--color-ilus-clothes',    tailwind: 'bg-brand-blue-sky',        hex: '#B4D5FF' },
];

const allSwatches = [...primitives, ...backgroundTokens, ...textTokens, ...borderTokens, ...iconTokens, ...ilustracionesTokens];

/* ── story ───────────────────────────────────────────────── */

type Story = StoryObj;

export const AllTokens: Story = {
  name: 'All Tokens',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 min-h-screen font-body">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Airpals Color Tokens</h1>
          <p className="mt-2 text-sm text-slate-500">
            Always use <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">Semantics</code> tokens.
            Never primitives or hex directly. <strong>Click any value to copy.</strong>
          </p>
        </div>
        <DownloadJSON all={allSwatches} />
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
