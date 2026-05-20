import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
      className="ml-1 px-1.5 py-0.5 text-xs rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-mono flex-shrink-0"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Type Scale',
          '',
          'Two fonts: **Lexend SemiBold** (h1–h4) · **Inter Regular / SemiBold** (subheading, body, caption).',
          '',
          'Figma Variables collection: `Breakpoints` → modes `Desktop` / `Mobile`.',
          'Each `font-size` property is bound to a variable (e.g. `h1 · text-5xl/size`).',
          '',
          '> **Medium weight removed.** Only Regular + SemiBold. No perceptual diff at small B2B UI sizes.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

type TypeSpec = {
  style: string;
  figmaVar: string;
  group: string;
  twClass: string;
  twMobileClass: string;
  size: string;
  mobileSize: string;
  lh: string;
  mobileLH: string;
  weight: string;
  font: 'heading' | 'body';
  sample: string;
};

const typeScale: TypeSpec[] = [
  /* ── Headings (Lexend SemiBold) ─────────────────────────── */
  {
    style: 'h1 · text-5xl', figmaVar: 'h1 · text-5xl/size', group: 'Headings',
    twClass: 'text-5xl font-semibold', twMobileClass: 'text-3xl font-semibold',
    size: '48px', mobileSize: '30px', lh: '52px', mobileLH: '38px',
    weight: 'SemiBold', font: 'heading',
    sample: 'Ship smarter, ship faster',
  },
  {
    style: 'h2 · text-3xl', figmaVar: 'h2 · text-3xl/size', group: 'Headings',
    twClass: 'text-3xl font-semibold', twMobileClass: 'text-2xl font-semibold',
    size: '30px', mobileSize: '24px', lh: '38px', mobileLH: '32px',
    weight: 'SemiBold', font: 'heading',
    sample: 'Multi-carrier shipping',
  },
  {
    style: 'h3 · text-2xl', figmaVar: 'h3 · text-2xl/size', group: 'Headings',
    twClass: 'text-2xl font-semibold', twMobileClass: 'text-xl font-semibold',
    size: '24px', mobileSize: '20px', lh: '32px', mobileLH: '28px',
    weight: 'SemiBold', font: 'heading',
    sample: 'New shipment details',
  },
  {
    style: 'h4 · text-lg', figmaVar: 'h4 · text-lg/size', group: 'Headings',
    twClass: 'text-lg font-semibold', twMobileClass: 'text-base font-semibold',
    size: '18px', mobileSize: '16px', lh: '24px', mobileLH: '22px',
    weight: 'SemiBold', font: 'heading',
    sample: 'Shipment #1042',
  },
  /* ── Subheading (Inter SemiBold only) ───────────────────── */
  {
    style: 'subheading · SemiBold', figmaVar: 'subheading · text-xl/size', group: 'Subheading',
    twClass: 'text-xl font-semibold', twMobileClass: 'text-lg font-semibold',
    size: '20px', mobileSize: '18px', lh: '28px', mobileLH: '24px',
    weight: 'SemiBold', font: 'body',
    sample: 'Recent shipments',
  },
  /* ── Body Large (Inter) ──────────────────────────────────── */
  {
    style: 'body-lg · Regular', figmaVar: 'body-lg · text-lg/size', group: 'Body Large',
    twClass: 'text-lg font-normal', twMobileClass: 'text-base font-normal',
    size: '18px', mobileSize: '16px', lh: '28px', mobileLH: '24px',
    weight: 'Regular', font: 'body',
    sample: 'Track your shipments with full visibility across all carriers.',
  },
  {
    style: 'body-lg · SemiBold', figmaVar: 'body-lg · text-lg/size', group: 'Body Large',
    twClass: 'text-lg font-semibold', twMobileClass: 'text-base font-semibold',
    size: '18px', mobileSize: '16px', lh: '28px', mobileLH: '24px',
    weight: 'SemiBold', font: 'body',
    sample: 'Delivered — 3 of 3 packages',
  },
  /* ── Body Medium (Inter) ─────────────────────────────────── */
  {
    style: 'body-md · Regular', figmaVar: 'body-md · text-base/size', group: 'Body Medium',
    twClass: 'text-base font-normal', twMobileClass: 'text-sm font-normal',
    size: '16px', mobileSize: '14px', lh: '24px', mobileLH: '20px',
    weight: 'Regular', font: 'body',
    sample: 'Origin address, suite 400, Brooklyn NY 11201',
  },
  {
    style: 'body-md · SemiBold', figmaVar: 'body-md · text-base/size', group: 'Body Medium',
    twClass: 'text-base font-semibold', twMobileClass: 'text-sm font-semibold',
    size: '16px', mobileSize: '14px', lh: '24px', mobileLH: '20px',
    weight: 'SemiBold', font: 'body',
    sample: 'Carrier · Service · Cost',
  },
  /* ── Body Small (Inter) ──────────────────────────────────── */
  {
    style: 'body-sm · Regular', figmaVar: 'body-sm · text-sm/size', group: 'Body Small',
    twClass: 'text-sm font-normal', twMobileClass: 'text-xs font-normal',
    size: '14px', mobileSize: '12px', lh: '20px', mobileLH: '18px',
    weight: 'Regular', font: 'body',
    sample: 'Estimated delivery: Thursday, May 15 by 8pm',
  },
  {
    style: 'body-sm · SemiBold', figmaVar: 'body-sm · text-sm/size', group: 'Body Small',
    twClass: 'text-sm font-semibold', twMobileClass: 'text-xs font-semibold',
    size: '14px', mobileSize: '12px', lh: '20px', mobileLH: '18px',
    weight: 'SemiBold', font: 'body',
    sample: 'Delivered · In Transit · Pending',
  },
  /* ── Caption (Inter) ─────────────────────────────────────── */
  {
    style: 'caption · Regular', figmaVar: 'caption · text-xs/size', group: 'Caption',
    twClass: 'text-xs font-normal', twMobileClass: 'text-[11px] font-normal',
    size: '12px', mobileSize: '11px', lh: '16px', mobileLH: '15px',
    weight: 'Regular', font: 'body',
    sample: 'Created May 14, 2026 at 9:41 AM',
  },
  {
    style: 'caption · SemiBold', figmaVar: 'caption · text-xs/size', group: 'Caption',
    twClass: 'text-xs font-semibold', twMobileClass: 'text-[11px] font-semibold',
    size: '12px', mobileSize: '11px', lh: '16px', mobileLH: '15px',
    weight: 'SemiBold', font: 'body',
    sample: 'LABEL CREATED · SAME-DAY',
  },
];

function groupRows(scale: TypeSpec[]) {
  const seen = new Set<string>();
  return scale.map((t) => {
    const isFirst = !seen.has(t.group);
    seen.add(t.group);
    return { ...t, isFirst };
  });
}

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => {
    const rows = groupRows(typeScale);
    return (
      <div className="bg-white p-8 font-body min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#1b306c]" style={{ fontFamily: 'Lexend, sans-serif' }}>
            Typography
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Headings h1–h4: <strong>Lexend SemiBold</strong> · Body & Caption: <strong>Inter Regular / SemiBold</strong>
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Figma collection: <span className="font-mono bg-slate-100 px-1 rounded">Breakpoints</span> — bind font-size to variable, switch mode Desktop/Mobile
          </p>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[200px_1fr_220px_72px_72px] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            <span>Style</span>
            <span>Sample</span>
            <span>Tailwind class</span>
            <span>Size</span>
            <span>Weight</span>
          </div>

          {rows.map((t, i) => (
            <div
              key={t.style}
              className={[
                'grid grid-cols-[200px_1fr_220px_72px_72px] px-4 py-3 items-center gap-4',
                'border-t border-slate-200',
                t.isFirst && i !== 0 ? 'border-t-2 border-t-slate-300' : '',
                i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50',
              ].join(' ')}
            >
              <span className="font-mono text-xs text-slate-500 leading-tight">{t.style}</span>
              <span
                className={`${t.twClass} text-[#1b306c] truncate`}
                style={t.font === 'heading' ? { fontFamily: 'Lexend, sans-serif' } : undefined}
              >
                {t.sample}
              </span>
              <span className="inline-flex items-center font-mono text-xs text-[#0043ff]">
                {t.twClass}
                <CopyBtn value={t.twClass} />
              </span>
              <span className="font-mono text-xs text-slate-400">{t.size}</span>
              <span className="font-mono text-xs text-slate-400">{t.weight}</span>
            </div>
          ))}
        </div>

        {/* Figma variables map */}
        <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-[#e6f1fd] px-4 py-2 text-xs font-semibold text-[#1b306c] uppercase tracking-wide">
            Figma Variable → Breakpoint values
          </div>
          <div className="grid grid-cols-[200px_100px_100px_180px_180px] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-400 uppercase tracking-wide border-b border-slate-200">
            <span>Variable</span>
            <span>Desktop</span>
            <span>Mobile</span>
            <span>Tailwind (desktop)</span>
            <span>Tailwind (mobile)</span>
          </div>
          {typeScale.filter(t => t.weight === 'SemiBold' || t.group === 'Body Large' || t.style.includes('Regular')).filter((t, i, arr) => arr.findIndex(x => x.figmaVar === t.figmaVar) === i).map((t) => (
            <div key={t.figmaVar} className="grid grid-cols-[200px_100px_100px_180px_180px] px-4 py-2.5 border-b border-slate-100 text-xs">
              <span className="font-mono text-[#0043ff]">{t.figmaVar}</span>
              <span className="font-mono text-slate-600">{t.size}</span>
              <span className="font-mono text-slate-400">{t.mobileSize}</span>
              <span className="inline-flex items-center font-mono text-slate-600">{t.twClass.split(' ')[0]}<CopyBtn value={t.twClass} /></span>
              <span className="inline-flex items-center font-mono text-slate-400">{t.twMobileClass.split(' ')[0]}<CopyBtn value={t.twMobileClass} /></span>
            </div>
          ))}
        </div>

        {/* When to use */}
        <div className="mt-8 border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            When to use
          </div>
          {[
            { style: 'h1 – h4',        use: 'Page titles, modal headers, section titles. Lexend SemiBold always.' },
            { style: 'subheading',      use: 'Panel section titles, card headers. Regular = descriptive, SemiBold = interactive.' },
            { style: 'body-lg',         use: 'Primary body copy — descriptions, onboarding, empty states.' },
            { style: 'body-md',         use: 'Default UI — table cells, form labels, list items. Most used.' },
            { style: 'body-sm',         use: 'Secondary info — helper text, metadata, timestamps, tooltips.' },
            { style: 'caption',         use: 'Labels, tags, all-caps status pills, fine print.' },
          ].map((row) => (
            <div key={row.style} className="grid grid-cols-[180px_1fr] px-4 py-2.5 border-t border-slate-200">
              <span className="text-sm font-semibold text-[#1b306c] font-mono">{row.style}</span>
              <span className="text-sm text-slate-500">{row.use}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const MobileScale: Story = {
  name: 'Mobile Scale',
  render: () => {
    const rows = groupRows(typeScale);
    return (
      <div className="bg-white p-8 font-body">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-[#1b306c]" style={{ fontFamily: 'Lexend, sans-serif' }}>Mobile Scale</h2>
          <p className="mt-1 text-sm text-slate-400">Same weights, reduced sizes. Switch Figma frame mode to Mobile.</p>
        </div>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[200px_1fr_220px_72px] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            <span>Style</span><span>Sample</span><span>Tailwind class</span><span>Size</span>
          </div>
          {rows.map((t, i) => (
            <div
              key={t.style}
              className={[
                'grid grid-cols-[200px_1fr_220px_72px] px-4 py-3 items-center gap-4 border-t border-slate-200',
                t.isFirst && i !== 0 ? 'border-t-2 border-t-slate-300' : '',
                i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50',
              ].join(' ')}
            >
              <span className="font-mono text-xs text-slate-500">{t.style}</span>
              <span className={`${t.twMobileClass} text-[#1b306c] truncate`} style={t.font === 'heading' ? { fontFamily: 'Lexend, sans-serif' } : undefined}>
                {t.sample}
              </span>
              <span className="inline-flex items-center font-mono text-xs text-[#0043ff]">
                {t.twMobileClass}<CopyBtn value={t.twMobileClass} />
              </span>
              <span className="font-mono text-xs text-slate-400">{t.mobileSize}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
