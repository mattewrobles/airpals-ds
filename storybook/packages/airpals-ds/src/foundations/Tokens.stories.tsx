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

/* ── Story ───────────────────────────────────────────────── */

export const DevReference: Story = {
  name: 'Dev Reference',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-semibold text-brand-navy dark:text-slate-50">Tokens Reference</h1>
        <p className="mt-2 text-sm text-slate-500">
          Rule: always use <strong>Semantics</strong> tokens. Never hex. Never slate/indigo direct in Figma.
        </p>
      </div>

      {/* SPACING */}
      <Section title="Spacing">
        {[
          { t: 'spacing/0',  css: '--spacing-0',  tw: 'p-0 m-0 gap-0',   px: '0px' },
          { t: 'spacing/1',  css: '--spacing-1',  tw: 'p-1 m-1 gap-1',   px: '4px' },
          { t: 'spacing/2',  css: '--spacing-2',  tw: 'p-2 m-2 gap-2',   px: '8px' },
          { t: 'spacing/3',  css: '--spacing-3',  tw: 'p-3 m-3 gap-3',   px: '12px' },
          { t: 'spacing/4',  css: '--spacing-4',  tw: 'p-4 m-4 gap-4',   px: '16px' },
          { t: 'spacing/5',  css: '--spacing-5',  tw: 'p-5 m-5 gap-5',   px: '20px' },
          { t: 'spacing/6',  css: '--spacing-6',  tw: 'p-6 m-6 gap-6',   px: '24px' },
          { t: 'spacing/8',  css: '--spacing-8',  tw: 'p-8 m-8 gap-8',   px: '32px' },
          { t: 'spacing/10', css: '--spacing-10', tw: 'p-10 m-10 gap-10', px: '40px' },
          { t: 'spacing/12', css: '--spacing-12', tw: 'p-12 m-12 gap-12', px: '48px' },
          { t: 'spacing/16', css: '--spacing-16', tw: 'p-16 m-16 gap-16', px: '64px' },
          { t: 'spacing/20', css: '--spacing-20', tw: 'p-20 m-20 gap-20', px: '80px' },
        ].map((s) => (
          <TokenRow key={s.t} token={s.t} cssVar={s.css} tailwind={s.tw}
            preview={
              <div className="flex items-center gap-2">
                <div className="bg-brand-blue rounded" style={{ width: s.px, height: '12px', minWidth: '2px' }} />
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
