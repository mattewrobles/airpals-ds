import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta: Meta = {
  title: 'Foundations/Tokens Reference',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Complete token reference for Airpals devs. Copy the Tailwind class or CSS variable directly.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

/* ── Copy button ─────────────────────────────────────────── */

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="ml-1 px-1.5 py-0.5 text-xs rounded bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-mono"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

/* ── Token row ───────────────────────────────────────────── */

function TokenRow({
  token, cssVar, tailwind, preview, note,
}: {
  token: string;
  cssVar?: string;
  tailwind: string;
  preview?: React.ReactNode;
  note?: string;
}) {
  return (
    <tr className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <td className="px-4 py-2.5 font-mono text-xs text-brand-navy dark:text-slate-200 whitespace-nowrap">{token}</td>
      <td className="px-4 py-2.5">
        {cssVar && (
          <span className="inline-flex items-center font-mono text-xs text-slate-500">
            {cssVar}<CopyButton value={cssVar} />
          </span>
        )}
      </td>
      <td className="px-4 py-2.5">
        <span className="inline-flex items-center font-mono text-xs text-brand-blue dark:text-brand-blue-light">
          {tailwind}<CopyButton value={tailwind} />
        </span>
      </td>
      <td className="px-4 py-2.5">{preview}</td>
      {note && <td className="px-4 py-2.5 text-xs text-slate-400">{note}</td>}
    </tr>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-heading text-lg font-semibold text-brand-navy dark:text-slate-50 mb-3">{title}</h2>
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Token</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">CSS Var</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Tailwind</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wide">Preview</th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Download all tokens ─────────────────────────────────── */

function DownloadAllTokens() {
  const handleDownload = () => {
    const tokens = {
      spacing: {
        px: '1px', '0': '0px', '0.5': '2px', '1': '4px', '1.5': '6px',
        '2': '8px', '2.5': '10px', '3': '12px', '3.5': '14px', '4': '16px',
        '5': '20px', '6': '24px', '7': '28px', '8': '32px', '9': '36px',
        '10': '40px', '11': '44px', '12': '48px', '14': '56px', '16': '64px',
        '20': '80px', '24': '96px', '28': '112px', '32': '128px', '36': '144px',
        '40': '160px', '44': '176px', '48': '192px', '52': '208px', '56': '224px',
        '60': '240px', '64': '256px', '72': '288px', '80': '320px', '96': '384px',
      },
      borderRadius: {
        none: '0px', sm: '2px', default: '4px', md: '6px', lg: '8px',
        xl: '12px', '2xl': '16px', '3xl': '24px', full: '9999px',
      },
      borderWidth: { '0': '0px', default: '1px', '2': '2px', '4': '4px', '8': '8px' },
      colors: {
        'brand/blue': '#0043FF', 'brand/pink': '#FC4575', 'brand/navy': '#1B306C',
        'brand/blue-light': '#E6F1FD', 'brand/blue-sky': '#B4D5FF', 'brand/electric-blue': '#00A0FF',
      },
    };
    const blob = new Blob([JSON.stringify(tokens, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'airpals-tokens.json';
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

/* ── Story ───────────────────────────────────────────────── */

export const DevReference: Story = {
  name: 'Dev Reference',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Tokens Reference</h1>
          <p className="mt-2 text-sm text-slate-500">
            Always use <strong>Semantics</strong> tokens. Never hex. <strong>Click CSS var or Tailwind class to copy.</strong>
          </p>
        </div>
        <DownloadAllTokens />
      </div>

      {/* SPACING */}
      <Section title="Spacing">
        {[
          { t: 'spacing/px',   css: '--spacing-px',   tw: 'p-px',    px: '1px' },
          { t: 'spacing/0',    css: '--spacing-0',    tw: 'p-0',     px: '0px' },
          { t: 'spacing/0.5',  css: '--spacing-0-5',  tw: 'p-0.5',   px: '2px' },
          { t: 'spacing/1',    css: '--spacing-1',    tw: 'p-1',     px: '4px' },
          { t: 'spacing/1.5',  css: '--spacing-1-5',  tw: 'p-1.5',   px: '6px' },
          { t: 'spacing/2',    css: '--spacing-2',    tw: 'p-2',     px: '8px' },
          { t: 'spacing/2.5',  css: '--spacing-2-5',  tw: 'p-2.5',   px: '10px' },
          { t: 'spacing/3',    css: '--spacing-3',    tw: 'p-3',     px: '12px' },
          { t: 'spacing/3.5',  css: '--spacing-3-5',  tw: 'p-3.5',   px: '14px' },
          { t: 'spacing/4',    css: '--spacing-4',    tw: 'p-4',     px: '16px' },
          { t: 'spacing/5',    css: '--spacing-5',    tw: 'p-5',     px: '20px' },
          { t: 'spacing/6',    css: '--spacing-6',    tw: 'p-6',     px: '24px' },
          { t: 'spacing/7',    css: '--spacing-7',    tw: 'p-7',     px: '28px' },
          { t: 'spacing/8',    css: '--spacing-8',    tw: 'p-8',     px: '32px' },
          { t: 'spacing/9',    css: '--spacing-9',    tw: 'p-9',     px: '36px' },
          { t: 'spacing/10',   css: '--spacing-10',   tw: 'p-10',    px: '40px' },
          { t: 'spacing/11',   css: '--spacing-11',   tw: 'p-11',    px: '44px' },
          { t: 'spacing/12',   css: '--spacing-12',   tw: 'p-12',    px: '48px' },
          { t: 'spacing/14',   css: '--spacing-14',   tw: 'p-14',    px: '56px' },
          { t: 'spacing/16',   css: '--spacing-16',   tw: 'p-16',    px: '64px' },
          { t: 'spacing/20',   css: '--spacing-20',   tw: 'p-20',    px: '80px' },
          { t: 'spacing/24',   css: '--spacing-24',   tw: 'p-24',    px: '96px' },
          { t: 'spacing/28',   css: '--spacing-28',   tw: 'p-28',    px: '112px' },
          { t: 'spacing/32',   css: '--spacing-32',   tw: 'p-32',    px: '128px' },
          { t: 'spacing/36',   css: '--spacing-36',   tw: 'p-36',    px: '144px' },
          { t: 'spacing/40',   css: '--spacing-40',   tw: 'p-40',    px: '160px' },
          { t: 'spacing/44',   css: '--spacing-44',   tw: 'p-44',    px: '176px' },
          { t: 'spacing/48',   css: '--spacing-48',   tw: 'p-48',    px: '192px' },
          { t: 'spacing/52',   css: '--spacing-52',   tw: 'p-52',    px: '208px' },
          { t: 'spacing/56',   css: '--spacing-56',   tw: 'p-56',    px: '224px' },
          { t: 'spacing/60',   css: '--spacing-60',   tw: 'p-60',    px: '240px' },
          { t: 'spacing/64',   css: '--spacing-64',   tw: 'p-64',    px: '256px' },
          { t: 'spacing/72',   css: '--spacing-72',   tw: 'p-72',    px: '288px' },
          { t: 'spacing/80',   css: '--spacing-80',   tw: 'p-80',    px: '320px' },
          { t: 'spacing/96',   css: '--spacing-96',   tw: 'p-96',    px: '384px' },
        ].map((s) => (
          <TokenRow key={s.t} token={s.t} cssVar={s.css} tailwind={s.tw}
            preview={
              <div className="flex items-center gap-2">
                <div className="bg-brand-blue rounded flex-shrink-0"
                  style={{ width: s.px === '0px' ? '2px' : Math.min(parseInt(s.px), 200) + 'px', height: '12px', opacity: s.px === '0px' ? 0.2 : 1 }} />
                <span className="text-xs text-slate-400">{s.px}</span>
              </div>
            }
          />
        ))}
      </Section>

      {/* BORDER RADIUS */}
      <Section title="Border Radius">
        {[
          { t: 'radius/none',    css: '--radius-none',    tw: 'rounded-none', px: '0px',    use: 'Tables, separators' },
          { t: 'radius/sm',      css: '--radius-sm',      tw: 'rounded-sm',   px: '2px',    use: 'Inline elements' },
          { t: 'radius/default', css: '--radius-default',  tw: 'rounded',      px: '4px',    use: 'Small elements' },
          { t: 'radius/md',      css: '--radius-md',      tw: 'rounded-md',   px: '6px',    use: 'Badges, tags' },
          { t: 'radius/lg',      css: '--radius-lg',      tw: 'rounded-lg',   px: '8px',    use: 'Inputs, buttons' },
          { t: 'radius/xl',      css: '--radius-xl',      tw: 'rounded-xl',   px: '12px',   use: 'Cards, dropdowns' },
          { t: 'radius/2xl',     css: '--radius-2xl',     tw: 'rounded-2xl',  px: '16px',   use: 'Modals, panels' },
          { t: 'radius/3xl',     css: '--radius-3xl',     tw: 'rounded-3xl',  px: '24px',   use: 'Hero elements' },
          { t: 'radius/full',    css: '--radius-full',    tw: 'rounded-full', px: '9999px', use: 'Avatars, pills' },
        ].map((r) => (
          <TokenRow key={r.t} token={r.t} cssVar={r.css} tailwind={r.tw}
            preview={
              <div className="flex items-center gap-2">
                <div className="bg-brand-blue-light border border-brand-blue w-8 h-8"
                  style={{ borderRadius: r.px }} />
                <span className="text-xs text-slate-400">{r.use}</span>
              </div>
            }
          />
        ))}
      </Section>

      {/* BORDER WIDTH */}
      <Section title="Border Width">
        {[
          { t: 'border/0',       css: '--border-0',       tw: 'border-0',  px: '0px', use: 'Remove border' },
          { t: 'border/default', css: '--border-default',  tw: 'border',    px: '1px', use: 'Cards, inputs, tables' },
          { t: 'border/2',       css: '--border-2',       tw: 'border-2',  px: '2px', use: 'Input focus/selected' },
          { t: 'border/4',       css: '--border-4',       tw: 'border-4',  px: '4px', use: 'Strong emphasis (rare)' },
          { t: 'border/8',       css: '--border-8',       tw: 'border-8',  px: '8px', use: 'Decorative / accents' },
        ].map((b) => (
          <TokenRow key={b.t} token={b.t} cssVar={b.css} tailwind={b.tw}
            preview={
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-white dark:bg-slate-900 border-brand-blue w-10 h-6"
                  style={{ borderWidth: b.px, borderStyle: 'solid', borderColor: '#0043FF' }} />
                <span className="text-xs text-slate-400">{b.use}</span>
              </div>
            }
          />
        ))}
      </Section>

      {/* BACKGROUND */}
      <Section title="Background Tokens">
        {[
          { t: 'background/primary',        css: '--color-bg-primary',        tw: 'bg-white dark:bg-slate-900' },
          { t: 'background/secondary',       css: '--color-bg-secondary',       tw: 'bg-brand-blue-light dark:bg-slate-800' },
          { t: 'background/tertiary',        css: '--color-bg-tertiary',        tw: 'bg-brand-blue-sky dark:bg-slate-700' },
          { t: 'background/accent',          css: '--color-bg-accent',          tw: 'bg-brand-blue' },
          { t: 'background/accent-subtle',   css: '--color-bg-accent-subtle',   tw: 'bg-indigo-100 dark:bg-indigo-950' },
          { t: 'background/accent-contrast', css: '--color-bg-accent-contrast', tw: 'bg-brand-navy' },
          { t: 'background/disable',         css: '--color-bg-disable',         tw: 'bg-slate-200 dark:bg-slate-500' },
        ].map((b) => (
          <TokenRow key={b.t} token={b.t} cssVar={b.css} tailwind={b.tw}
            preview={<div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700" style={{ background: `var(${b.css})` }} />}
          />
        ))}
      </Section>

      {/* TEXT */}
      <Section title="Text Tokens">
        {[
          { t: 'text/primary',   css: '--color-text-primary',   tw: 'text-brand-navy dark:text-slate-50' },
          { t: 'text/secondary', css: '--color-text-secondary',  tw: 'text-slate-600 dark:text-slate-400' },
          { t: 'text/tertiary',  css: '--color-text-tertiary',   tw: 'text-slate-500 dark:text-slate-400' },
          { t: 'text/disable',   css: '--color-text-disable',    tw: 'text-slate-300 dark:text-slate-600' },
          { t: 'text/accent',    css: '--color-text-accent',     tw: 'text-brand-blue dark:text-brand-blue-light' },
          { t: 'text/on-accent', css: '--color-text-on-accent',  tw: 'text-white' },
          { t: 'text/invert',    css: '--color-text-invert',     tw: 'text-white dark:text-slate-900' },
        ].map((t) => (
          <TokenRow key={t.t} token={t.t} cssVar={t.css} tailwind={t.tw}
            preview={<span className="text-sm font-medium" style={{ color: `var(${t.css})` }}>Airpals</span>}
          />
        ))}
      </Section>

      {/* BORDER */}
      <Section title="Border Tokens">
        {[
          { t: 'border/primary',   css: '--color-border-primary',   tw: 'border-slate-200 dark:border-slate-700' },
          { t: 'border/secondary', css: '--color-border-secondary',  tw: 'border-slate-300 dark:border-slate-800' },
          { t: 'border/accent',    css: '--color-border-accent',     tw: 'border-brand-blue' },
        ].map((b) => (
          <TokenRow key={b.t} token={b.t} cssVar={b.css} tailwind={b.tw}
            preview={<div className="w-12 h-6 rounded-md bg-white dark:bg-slate-900" style={{ border: `2px solid var(${b.css})` }} />}
          />
        ))}
      </Section>

      {/* ICON TOKENS */}
      <Section title="Icon Tokens">
        {[
          { t: 'icon/primary',    css: '--color-icon-primary',    tw: 'text-brand-navy dark:text-slate-200' },
          { t: 'icon/secondary',  css: '--color-icon-secondary',  tw: 'text-slate-500' },
          { t: 'icon/tertiary',   css: '--color-icon-tertiary',   tw: 'text-slate-300 dark:text-slate-400' },
          { t: 'icon/accent',     css: '--color-icon-accent',     tw: 'text-brand-blue' },
          { t: 'icon/on-accent',  css: '--color-icon-on-accent',  tw: 'text-white' },
          { t: 'icon/invert',     css: '--color-icon-invert',     tw: 'text-white dark:text-slate-900' },
          { t: 'icon/disable',    css: '--color-icon-disable',    tw: 'text-slate-300 dark:text-slate-600' },
        ].map((t) => (
          <TokenRow key={t.t} token={t.t} cssVar={t.css} tailwind={t.tw}
            preview={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ color: `var(${t.css})` }}>
                <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12zm1-9H9v2H7v2h2v2h2v-2h2v-2h-2V7z"
                  fill="currentColor"/>
              </svg>
            }
          />
        ))}
      </Section>

      {/* ILLUSTRATION SEMANTICS */}
      <Section title="Illustration Tokens">
        {[
          { t: 'ilus/background', css: '--color-ilus-background', tw: '(custom — bg-brand-blue-light)',      note: 'Background fill of illustrations' },
          { t: 'ilus/details',    css: '--color-ilus-details',    tw: '(custom — text-brand-electric-blue)', note: 'Highlights, details, shine' },
          { t: 'ilus/contorn',    css: '--color-ilus-contorn',    tw: '(custom — text-brand-navy)',          note: 'Outlines and strokes' },
          { t: 'ilus/clothes',    css: '--color-ilus-clothes',    tw: '(custom — bg-brand-blue-sky)',        note: 'Clothing, secondary shapes' },
        ].map((b) => (
          <TokenRow key={b.t} token={b.t} cssVar={b.css} tailwind={b.tw}
            preview={
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700"
                  style={{ background: `var(${b.css})` }} />
                <span className="text-xs text-slate-400">{b.note}</span>
              </div>
            }
          />
        ))}
      </Section>

      {/* PATTERNS */}
      <div className="mb-10">
        <h2 className="font-heading text-lg font-semibold text-brand-navy dark:text-slate-50 mb-3">Common Patterns</h2>
        <div className="grid gap-4">
          {[
            {
              label: 'Card',
              code: 'bg-white border border-slate-200 rounded-xl p-4\ndark:bg-slate-900 dark:border-slate-700',
            },
            {
              label: 'Input',
              code: 'w-full border border-slate-200 rounded-lg px-3 py-2 text-base\ntext-brand-navy placeholder:text-slate-300\nfocus:outline-none focus:border-2 focus:border-brand-blue\ndark:bg-slate-900 dark:border-slate-700 dark:text-slate-50',
            },
            {
              label: 'Button Primary',
              code: 'bg-brand-blue text-white font-medium text-sm px-4 py-2 rounded-lg\nhover:opacity-90 transition-opacity\ndisabled:opacity-50 disabled:cursor-not-allowed',
            },
            {
              label: 'Badge — Status',
              code: 'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium\n/* Success */ bg-green-50 text-green-700\n/* Warning */ bg-amber-50 text-amber-700\n/* Error   */ bg-red-50 text-red-700\n/* Info    */ bg-blue-50 text-blue-700',
            },
          ].map((p) => (
            <div key={p.label} className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm font-medium text-brand-navy dark:text-slate-50">{p.label}</span>
                <CopyButton value={p.code} />
              </div>
              <pre className="px-4 py-3 text-xs font-mono text-slate-600 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900">
                {p.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
