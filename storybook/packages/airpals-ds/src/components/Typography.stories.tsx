import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Scale reference ─────────────────────────────────────── */
/*
  Airpals Design System — Typography Scale
  Figma file: 3oMpon9bh8T8d0hFQt7l2g
  Figma Variables collection: Breakpoints (Desktop / Mobile modes)

  Fonts:
    Headings   → Lexend SemiBold
    Body/UI    → Inter Regular / SemiBold

  Desktop scale (Tailwind v3):
    h1          48px / lh 52   → text-5xl
    h2          30px / lh 38   → text-3xl
    h3          24px / lh 32   → text-2xl
    h4          18px / lh 24   → text-lg
    subheading  20px / lh 28   → text-xl
    body-lg     18px / lh 28   → text-lg
    body-md     16px / lh 24   → text-base
    body-sm     14px / lh 20   → text-sm
    caption     12px / lh 16   → text-xs

  Mobile scale (Tailwind v3):
    h1          30px / lh 38   → text-3xl
    h2          24px / lh 32   → text-2xl
    h3          20px / lh 28   → text-xl
    h4          16px / lh 22   → text-base
    subheading  18px / lh 24   → text-lg
    body-lg     16px / lh 24   → text-base
    body-md     14px / lh 20   → text-sm
    body-sm     12px / lh 18   → text-xs
    caption     11px / lh 15   → text-[11px]
*/

const SCALE = [
  {
    role: 'h1',
    figmaStyle: 'Desktop/h1 · text-5xl',
    desktopClass: 'text-5xl',
    mobileClass: 'text-3xl',
    desktopSize: '48px',
    mobileSize: '30px',
    desktopLH: '52px',
    mobileLH: '38px',
    font: 'Lexend',
    weight: 'SemiBold',
    sample: 'Ship smarter, ship faster',
  },
  {
    role: 'h2',
    figmaStyle: 'Desktop/h2 · text-3xl',
    desktopClass: 'text-3xl',
    mobileClass: 'text-2xl',
    desktopSize: '30px',
    mobileSize: '24px',
    desktopLH: '38px',
    mobileLH: '32px',
    font: 'Lexend',
    weight: 'SemiBold',
    sample: 'Multi-carrier shipping',
  },
  {
    role: 'h3',
    figmaStyle: 'Desktop/h3 · text-2xl',
    desktopClass: 'text-2xl',
    mobileClass: 'text-xl',
    desktopSize: '24px',
    mobileSize: '20px',
    desktopLH: '32px',
    mobileLH: '28px',
    font: 'Lexend',
    weight: 'SemiBold',
    sample: 'New shipment details',
  },
  {
    role: 'h4',
    figmaStyle: 'Desktop/h4 · text-lg',
    desktopClass: 'text-lg',
    mobileClass: 'text-base',
    desktopSize: '18px',
    mobileSize: '16px',
    desktopLH: '24px',
    mobileLH: '22px',
    font: 'Lexend',
    weight: 'SemiBold',
    sample: 'Shipment #1042',
  },
  {
    role: 'subheading',
    figmaStyle: 'Desktop/subheading · text-xl',
    desktopClass: 'text-xl',
    mobileClass: 'text-lg',
    desktopSize: '20px',
    mobileSize: '18px',
    desktopLH: '28px',
    mobileLH: '24px',
    font: 'Inter',
    weight: 'SemiBold',
    sample: 'Recent shipments',
  },
  {
    role: 'body-lg',
    figmaStyle: 'Desktop/body-lg · text-lg',
    desktopClass: 'text-lg',
    mobileClass: 'text-base',
    desktopSize: '18px',
    mobileSize: '16px',
    desktopLH: '28px',
    mobileLH: '24px',
    font: 'Inter',
    weight: 'Regular',
    sample: 'Track and manage all your shipments in one place.',
  },
  {
    role: 'body-md',
    figmaStyle: 'Desktop/body-md · text-base',
    desktopClass: 'text-base',
    mobileClass: 'text-sm',
    desktopSize: '16px',
    mobileSize: '14px',
    desktopLH: '24px',
    mobileLH: '20px',
    font: 'Inter',
    weight: 'Regular',
    sample: 'Enter the recipient address to continue.',
  },
  {
    role: 'body-sm',
    figmaStyle: 'Desktop/body-sm · text-sm',
    desktopClass: 'text-sm',
    mobileClass: 'text-xs',
    desktopSize: '14px',
    mobileSize: '12px',
    desktopLH: '20px',
    mobileLH: '18px',
    font: 'Inter',
    weight: 'Regular',
    sample: 'Delivered on May 18, 2025 at 3:42 PM',
  },
  {
    role: 'caption',
    figmaStyle: 'Desktop/caption · text-xs',
    desktopClass: 'text-xs',
    mobileClass: 'text-[11px]',
    desktopSize: '12px',
    mobileSize: '11px',
    desktopLH: '16px',
    mobileLH: '15px',
    font: 'Inter',
    weight: 'Regular',
    sample: 'Label generated automatically',
  },
];

function TypographyScale({ platform = 'desktop' }: { platform?: 'desktop' | 'mobile' }) {
  const isDesktop = platform === 'desktop';

  return (
    <div className="font-body bg-white divide-y divide-slate-100">
      {SCALE.map((s) => {
        const twClass  = isDesktop ? s.desktopClass : s.mobileClass;
        const size     = isDesktop ? s.desktopSize  : s.mobileSize;
        const lh       = isDesktop ? s.desktopLH    : s.mobileLH;
        const isLexend = s.font === 'Lexend';

        return (
          <div key={s.role} className="flex items-start gap-6 px-8 py-5">
            {/* Meta */}
            <div className="w-52 flex-shrink-0 pt-1">
              <div className="text-xs font-mono text-[#0043ff] mb-0.5">{twClass}</div>
              <div className="text-xs text-slate-400">{size} / lh {lh}</div>
              <div className="text-xs text-slate-400">{s.font} · {s.weight}</div>
              <div className="text-xs text-slate-300 mt-1 truncate">{s.figmaStyle}</div>
            </div>

            {/* Sample */}
            <div
              className={`flex-1 text-[#1b306c] leading-tight ${twClass}`}
              style={isLexend ? { fontFamily: 'Lexend, sans-serif', fontWeight: 600, lineHeight: lh } : { lineHeight: lh }}
            >
              {s.sample}
            </div>

            {/* Role badge */}
            <div className="w-20 flex-shrink-0 pt-1 text-right">
              <span className="inline-block text-xs font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
                {s.role}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const meta: Meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '## Airpals Typography Scale',
          '',
          'Two fonts: **Lexend SemiBold** (headings h1–h4) · **Inter** (subheading, body, caption).',
          '',
          'Variables in Figma: `Breakpoints` collection → `Desktop` / `Mobile` modes.',
          'Bind `font-size` to `h1 · text-5xl/size`, switch frame mode = sizes adapt automatically.',
          '',
          '| Role | Figma Style | Desktop | Mobile | Tailwind D | Tailwind M |',
          '|------|-------------|---------|--------|------------|------------|',
          ...SCALE.map(s =>
            `| \`${s.role}\` | \`${s.figmaStyle}\` | ${s.desktopSize} | ${s.mobileSize} | \`${s.desktopClass}\` | \`${s.mobileClass}\` |`
          ),
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ── Stories ─────────────────────────────────────────────── */

export const Desktop: Story = {
  name: 'Scale — Desktop',
  render: () => (
    <div>
      <div className="px-8 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">Desktop scale</span>
        <span className="text-xs text-slate-300">·</span>
        <span className="text-xs text-slate-400">Lexend SemiBold for headings · Inter for body</span>
      </div>
      <TypographyScale platform="desktop" />
    </div>
  ),
};

export const Mobile: Story = {
  name: 'Scale — Mobile',
  render: () => (
    <div>
      <div className="px-8 py-3 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
        <span className="text-xs font-mono text-slate-400 uppercase tracking-wide">Mobile scale</span>
        <span className="text-xs text-slate-300">·</span>
        <span className="text-xs text-slate-400">Reduced sizes — same weights and fonts</span>
      </div>
      <TypographyScale platform="mobile" />
    </div>
  ),
};

export const Comparison: Story = {
  name: 'Desktop vs Mobile',
  render: () => (
    <div className="font-body">
      <div className="grid grid-cols-2 divide-x divide-slate-200">
        <div>
          <div className="px-8 py-3 bg-[#e6f1fd] text-xs font-mono text-[#1b306c] uppercase tracking-wide font-semibold">
            Desktop
          </div>
          <TypographyScale platform="desktop" />
        </div>
        <div>
          <div className="px-8 py-3 bg-slate-100 text-xs font-mono text-slate-500 uppercase tracking-wide font-semibold">
            Mobile
          </div>
          <TypographyScale platform="mobile" />
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="font-body bg-white p-8 space-y-10">

      {/* Headings */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Headings — Lexend SemiBold</p>
        <div className="space-y-4">
          {(['h1','h2','h3','h4'] as const).map(role => {
            const s = SCALE.find(x => x.role === role)!;
            return (
              <div key={role} className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-[#0043ff] w-20 flex-shrink-0">{s.desktopClass}</span>
                <span
                  className={`text-[#1b306c] ${s.desktopClass}`}
                  style={{ fontFamily: 'Lexend, sans-serif', fontWeight: 600 }}
                >
                  {s.sample}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Body & UI — Inter</p>
        <div className="space-y-3">
          {(['subheading','body-lg','body-md','body-sm','caption'] as const).map(role => {
            const s = SCALE.find(x => x.role === role)!;
            return (
              <div key={role} className="flex items-baseline gap-4">
                <span className="text-xs font-mono text-[#0043ff] w-20 flex-shrink-0">{s.desktopClass}</span>
                <span className={`text-[#1b306c] ${s.desktopClass}`}>{s.sample}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Code */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<!-- Headings (Lexend SemiBold) -->
<h1 class="text-5xl font-semibold leading-[52px]" style="font-family: Lexend">Ship smarter</h1>
<h2 class="text-3xl font-semibold leading-[38px]" style="font-family: Lexend">Multi-carrier</h2>
<h3 class="text-2xl font-semibold leading-8"       style="font-family: Lexend">New shipment</h3>
<h4 class="text-lg  font-semibold leading-6"       style="font-family: Lexend">Order #1042</h4>

<!-- Body (Inter) -->
<p class="text-base leading-6">Enter the recipient address to continue.</p>
<p class="text-sm  leading-5">Delivered on May 18, 2025 at 3:42 PM</p>
<p class="text-xs  leading-4">Label generated automatically</p>

<!-- Mobile override (e.g. inside @media or Tailwind responsive prefix) -->
<h1 class="text-3xl md:text-5xl font-semibold leading-[38px] md:leading-[52px]">Ship smarter</h1>`}
          jsx={`// Desktop
<h1 className="text-5xl font-semibold" style={{ fontFamily: 'Lexend' }}>Ship smarter</h1>

// Mobile responsive
<h1 className="text-3xl md:text-5xl font-semibold" style={{ fontFamily: 'Lexend' }}>
  Ship smarter
</h1>`}
        />
      </div>
    </div>
  ),
};
