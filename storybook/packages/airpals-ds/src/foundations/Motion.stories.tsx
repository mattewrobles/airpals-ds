import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
      className="px-1.5 py-0.5 text-xs rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-mono"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

const meta: Meta = {
  title: 'Foundations/Motion',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Motion Tokens',
          '',
          '**Duration:** 4 values — instant micro-interactions (75ms) to deliberate page transitions (300ms).',
          '**Easing:** 3 curves — `ease-out` default, `ease-in` for exits, `ease-in-out` for loops.',
          '',
          '> Always respect `prefers-reduced-motion`. Use `transition-none` or `motion-safe:` prefix in Tailwind.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const DURATIONS = [
  { name: 'instant',   ms: 75,  twClass: 'duration-75',  use: 'Tooltips, hover highlights, icon swaps' },
  { name: 'fast',      ms: 150, twClass: 'duration-150', use: 'Button press, checkbox check, toggle switch' },
  { name: 'default',   ms: 200, twClass: 'duration-200', use: 'Dropdown open, badge change, input focus ring — default for most' },
  { name: 'slow',      ms: 300, twClass: 'duration-300', use: 'Modal enter, drawer slide, page transition' },
];

const EASINGS = [
  {
    name: 'ease-out',
    twClass: 'ease-out',
    css: 'cubic-bezier(0, 0, 0.2, 1)',
    use: 'Default for enter / appear. Fast start, slow end — feels responsive.',
    label: 'ENTER',
    color: '#0043ff',
  },
  {
    name: 'ease-in',
    twClass: 'ease-in',
    css: 'cubic-bezier(0.4, 0, 1, 1)',
    use: 'Exit / dismiss. Slow start, fast end — element "falls away".',
    label: 'EXIT',
    color: '#1b306c',
  },
  {
    name: 'ease-in-out',
    twClass: 'ease-in-out',
    css: 'cubic-bezier(0.4, 0, 0.2, 1)',
    use: 'Loops, loading spinners, progress bars — symmetric motion.',
    label: 'LOOP',
    color: '#22ad5c',
  },
];

const PATTERNS = [
  { name: 'Button press',       classes: 'transition-colors duration-150 ease-out',          example: 'hover:bg-blue-700 active:scale-[0.98]' },
  { name: 'Dropdown open',      classes: 'transition-all duration-200 ease-out',              example: 'origin-top scale-y-0 → scale-y-100 opacity-0 → opacity-100' },
  { name: 'Modal enter',        classes: 'transition-all duration-300 ease-out',              example: 'scale-95 opacity-0 → scale-100 opacity-100' },
  { name: 'Drawer slide',       classes: 'transition-transform duration-300 ease-out',        example: 'translate-x-full → translate-x-0' },
  { name: 'Toast notification', classes: 'transition-all duration-200 ease-out',              example: 'translate-y-2 opacity-0 → translate-y-0 opacity-100' },
  { name: 'Focus ring',         classes: 'transition-shadow duration-75 ease-out',            example: 'ring-0 → ring-2 ring-[#0043ff]' },
  { name: 'Skeleton shimmer',   classes: 'animate-pulse',                                     example: 'bg-slate-200 → bg-slate-100 (pulse loop)' },
  { name: 'Spinner',            classes: 'animate-spin duration-700',                         example: 'rotate-0 → rotate-360 (infinite loop)' },
];

function DurationDemo({ ms, twClass }: { ms: number; twClass: string }) {
  const [active, setActive] = useState(false);
  return (
    <button
      className={`w-full h-10 rounded-lg bg-[#e6f1fd] text-[#0043ff] text-xs font-medium transition-colors ${twClass} ${active ? 'bg-[#0043ff] text-white' : ''}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {ms}ms
    </button>
  );
}

export const Tokens: Story = {
  name: 'Duration & Easing',
  render: () => (
    <div className="bg-white p-8 font-body min-h-screen space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-[#1b306c]" style={{ fontFamily: 'Lexend, sans-serif' }}>Motion</h1>
        <p className="mt-2 text-sm text-slate-500">Duration × Easing = all transitions in the system.</p>
      </div>

      {/* Duration */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Duration — hover to preview</p>
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[120px_140px_120px_1fr_200px] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            <span>Token</span><span>Tailwind</span><span>Value</span><span>Use case</span><span>Preview</span>
          </div>
          {DURATIONS.map((d, i) => (
            <div key={d.name} className={`grid grid-cols-[120px_140px_120px_1fr_200px] px-4 py-3 items-center gap-4 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              <span className="font-mono text-xs text-[#0043ff] font-semibold">{d.name}</span>
              <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-600">{d.twClass} <CopyBtn value={d.twClass} /></span>
              <span className="font-mono text-xs text-slate-400">{d.ms}ms</span>
              <span className="text-xs text-slate-500">{d.use}</span>
              <DurationDemo ms={d.ms} twClass={d.twClass} />
            </div>
          ))}
        </div>
      </div>

      {/* Easing */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Easing curves</p>
        <div className="grid grid-cols-3 gap-4">
          {EASINGS.map((e) => (
            <div key={e.name} className="border border-slate-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm font-semibold text-[#1b306c]">{e.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: e.color }}>{e.label}</span>
              </div>
              {/* Curve visual — SVG */}
              <svg viewBox="0 0 80 40" className="w-full h-10 mb-3">
                {e.name === 'ease-out' && <path d="M0 40 C20 40 60 0 80 0" stroke={e.color} strokeWidth="2" fill="none" />}
                {e.name === 'ease-in' && <path d="M0 40 C20 40 20 0 80 0" stroke={e.color} strokeWidth="2" fill="none" />}
                {e.name === 'ease-in-out' && <path d="M0 40 C20 40 60 0 80 0" stroke={e.color} strokeWidth="2" fill="none" strokeDasharray="4 2" />}
              </svg>
              <p className="text-xs text-slate-500 mb-2">{e.use}</p>
              <div className="flex items-center gap-1">
                <span className="font-mono text-xs text-slate-400 flex-1">{e.twClass}</span>
                <CopyBtn value={`transition-all duration-200 ${e.twClass}`} />
              </div>
              <p className="font-mono text-[10px] text-slate-300 mt-1">{e.css}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reduced motion */}
      <div className="border border-amber-200 bg-amber-50 rounded-xl p-4">
        <p className="text-xs font-semibold text-amber-700 mb-1">prefers-reduced-motion</p>
        <p className="text-xs text-amber-600">Always wrap decorative animations in <span className="font-mono bg-amber-100 px-1 rounded">motion-safe:</span> prefix. Functional transitions (focus rings, dropdowns) may keep short durations.</p>
        <div className="mt-2 inline-flex items-center gap-1">
          <span className="font-mono text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded">motion-safe:transition-all motion-safe:duration-200</span>
          <CopyBtn value="motion-safe:transition-all motion-safe:duration-200 ease-out" />
        </div>
      </div>
    </div>
  ),
};

export const Patterns: Story = {
  name: 'Common Patterns',
  render: () => (
    <div className="bg-white p-8 font-body">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-6">Copy-ready transition classes for common components</p>
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[200px_1fr_1fr] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          <span>Component</span><span>Transition classes</span><span>State change</span>
        </div>
        {PATTERNS.map((p, i) => (
          <div key={p.name} className={`grid grid-cols-[200px_1fr_1fr] px-4 py-3 items-start gap-4 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
            <span className="text-sm font-medium text-[#1b306c]">{p.name}</span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-[#0043ff] flex-wrap">
              {p.classes} <CopyBtn value={p.classes} />
            </span>
            <span className="font-mono text-xs text-slate-400">{p.example}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};
