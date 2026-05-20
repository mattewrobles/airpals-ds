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
  title: 'Foundations/Z-Index',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Z-Index Stack',
          '',
          'Stacking context map — prevents layer conflicts between overlapping UI elements.',
          '',
          '| Layer | z-index | Tailwind | Element |',
          '|-------|---------|----------|---------|',
          '| base | 0 | `z-0` | Page content, table rows |',
          '| raised | 10 | `z-10` | Sticky table headers, hover cards |',
          '| dropdown | 20 | `z-20` | Dropdowns, select menus, popovers |',
          '| sticky | 30 | `z-30` | Sticky navbar, sidebar |',
          '| overlay | 40 | `z-40` | Modal backdrop |',
          '| modal | 50 | `z-50` | Modals, dialogs, drawers |',
          '| toast | 60 | (custom) | Toast notifications — above modals |',
          '| tooltip | 70 | (custom) | Tooltips — always on top |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const LAYERS = [
  { name: 'base',     z: 0,  twClass: 'z-0',         custom: false, color: '#f1f5f9', textColor: '#94a3b8', elements: 'Page content, table rows, static elements' },
  { name: 'raised',   z: 10, twClass: 'z-10',         custom: false, color: '#e6f1fd', textColor: '#0043ff', elements: 'Sticky table headers, hover states, row actions' },
  { name: 'dropdown', z: 20, twClass: 'z-20',         custom: false, color: '#dbeafe', textColor: '#1d4ed8', elements: 'Dropdowns, select menus, popovers, date pickers' },
  { name: 'sticky',   z: 30, twClass: 'z-30',         custom: false, color: '#c7d2fe', textColor: '#4338ca', elements: 'Sticky navbar, sticky sidebar, floating action button' },
  { name: 'overlay',  z: 40, twClass: 'z-40',         custom: false, color: '#1b306c', textColor: '#e2e8f0', elements: 'Modal backdrop / scrim — semi-transparent dark layer' },
  { name: 'modal',    z: 50, twClass: 'z-50',         custom: false, color: '#0043ff', textColor: '#ffffff', elements: 'Modals, dialogs, drawers, command palette' },
  { name: 'toast',    z: 60, twClass: '[z-index:60]', custom: true,  color: '#7c3aed', textColor: '#ffffff', elements: 'Toast notifications — must appear above modals' },
  { name: 'tooltip',  z: 70, twClass: '[z-index:70]', custom: true,  color: '#1b306c', textColor: '#ffffff', elements: 'Tooltips — always on top of everything' },
];

const CONFLICTS = [
  {
    problem: 'Dropdown hidden behind sticky nav',
    cause: 'Nav uses z-30, dropdown uses z-10',
    fix: 'Upgrade dropdown to z-20 — always higher than sticky headers, lower than nav',
  },
  {
    problem: 'Toast behind modal',
    cause: 'Toast z-50, modal also z-50 — render order wins',
    fix: 'Toast = [z-index:60], modal = z-50. Always.',
  },
  {
    problem: 'Tooltip clipped inside overflow-hidden parent',
    cause: 'Parent has overflow:hidden, creates new stacking context',
    fix: 'Render tooltip via portal (React Portal or Floating UI) at document root',
  },
  {
    problem: 'Popover behind modal backdrop',
    cause: 'Popover z-20, backdrop z-40',
    fix: 'Popovers inside modals inherit modal context — use relative z inside modal only',
  },
];

export const Stack: Story = {
  name: 'Layer Stack',
  render: () => (
    <div className="bg-white p-8 font-body min-h-screen space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-[#1b306c]" style={{ fontFamily: 'Lexend, sans-serif' }}>Z-Index</h1>
        <p className="mt-2 text-sm text-slate-500">8-layer stacking system. Assign once, never fight again.</p>
      </div>

      {/* Visual stack */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Visual stack — lowest to highest</p>
        <div className="flex items-end gap-2 h-64 p-4 bg-slate-50 rounded-xl border border-slate-200">
          {[...LAYERS].reverse().map((layer, i) => (
            <div
              key={layer.name}
              className="flex-1 rounded-t-lg flex flex-col items-center justify-end pb-2 transition-all"
              style={{
                backgroundColor: layer.color,
                height: `${20 + (LAYERS.length - 1 - i) * 28}px`,
                minHeight: 32,
              }}
            >
              <span className="text-[10px] font-mono font-semibold" style={{ color: layer.textColor }}>{layer.z}</span>
              <span className="text-[9px] font-mono mt-0.5" style={{ color: layer.textColor }}>{layer.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[100px_80px_180px_80px_1fr] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          <span>Layer</span><span>z-index</span><span>Tailwind</span><span>Custom</span><span>Elements</span>
        </div>
        {LAYERS.map((l, i) => (
          <div
            key={l.name}
            className={`grid grid-cols-[100px_80px_180px_80px_1fr] px-4 py-3 items-center gap-4 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
          >
            <span className="font-mono text-xs font-semibold" style={{ color: l.color === '#f1f5f9' ? '#94a3b8' : l.color }}>{l.name}</span>
            <span className="font-mono text-xs text-slate-600 font-bold">{l.z}</span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-[#0043ff]">{l.twClass} <CopyBtn value={l.twClass} /></span>
            <span>{l.custom ? <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-mono">CSS</span> : <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-mono">TW</span>}</span>
            <span className="text-xs text-slate-500">{l.elements}</span>
          </div>
        ))}
      </div>

      {/* Custom CSS vars */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          CSS custom properties (for toast + tooltip)
        </div>
        <div className="p-4 font-mono text-xs text-slate-600 bg-slate-900 rounded-b-xl">
          <pre className="text-green-400">{`/* globals.css */
:root {
  --z-toast:   60;
  --z-tooltip: 70;
}`}</pre>
          <pre className="text-slate-400 mt-2">{`/* usage */
.toast   { z-index: var(--z-toast); }
.tooltip { z-index: var(--z-tooltip); }`}</pre>
        </div>
      </div>
    </div>
  ),
};

export const CommonConflicts: Story = {
  name: 'Common Conflicts',
  render: () => (
    <div className="bg-white p-8 font-body">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-6">Layer conflicts devs hit most often</p>
      <div className="space-y-3">
        {CONFLICTS.map((c) => (
          <div key={c.problem} className="border border-slate-200 rounded-xl p-5">
            <p className="text-sm font-semibold text-red-600 mb-1">⚠ {c.problem}</p>
            <p className="text-xs text-slate-500 mb-2"><strong>Cause:</strong> {c.cause}</p>
            <p className="text-xs text-[#0043ff]"><strong>Fix:</strong> {c.fix}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};
