import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
      className="px-1.5 py-0.5 text-xs rounded bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-mono flex-shrink-0"
    >
      {copied ? '✓' : 'copy'}
    </button>
  );
}

const meta: Meta = {
  title: 'Foundations/Shadows',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Shadow Scale',
          '',
          'Elevation system: 5 levels from `xs` (subtle borders) to `2xl` (modals/overlays).',
          '',
          '| Figma Style | Tailwind | Use case |',
          '|-------------|----------|----------|',
          '| `Shadow/xs` | `shadow-sm` | Table rows, inline fields, subtle lift |',
          '| `Shadow/sm` | `shadow` | Cards, dropdowns, default elevation |',
          '| `Shadow/md` | `shadow-md` | Popovers, select menus, date pickers |',
          '| `Shadow/lg` | `shadow-lg` | Drawers, floating panels, notifications |',
          '| `Shadow/xl` | `shadow-xl` | Modals, dialogs, command palette |',
          '| `Shadow/2xl` | `shadow-2xl` | Full-screen overlays, sheets |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const SHADOWS = [
  {
    name: 'Shadow/xs',
    twClass: 'shadow-sm',
    cssValue: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    use: 'Table rows, input fields, badges — subtle separation',
    demo: 'border border-slate-200',
  },
  {
    name: 'Shadow/sm',
    twClass: 'shadow',
    cssValue: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    use: 'Cards, dropdowns, default component elevation',
    demo: '',
  },
  {
    name: 'Shadow/md',
    twClass: 'shadow-md',
    cssValue: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    use: 'Popovers, select menus, date pickers, tooltips',
    demo: '',
  },
  {
    name: 'Shadow/lg',
    twClass: 'shadow-lg',
    cssValue: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    use: 'Floating panels, drawers, toast notifications',
    demo: '',
  },
  {
    name: 'Shadow/xl',
    twClass: 'shadow-xl',
    cssValue: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    use: 'Modals, dialogs, command palette',
    demo: '',
  },
  {
    name: 'Shadow/2xl',
    twClass: 'shadow-2xl',
    cssValue: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    use: 'Full-screen overlays, bottom sheets, onboarding modals',
    demo: '',
  },
];

export const Scale: Story = {
  name: 'Shadow Scale',
  render: () => (
    <div className="bg-slate-50 p-12 font-body min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#1b306c]" style={{ fontFamily: 'Lexend, sans-serif' }}>Shadows</h1>
        <p className="mt-2 text-sm text-slate-500">6-level elevation system. All use Tailwind defaults — no custom shadow tokens needed.</p>
      </div>

      {/* Visual demo */}
      <div className="flex flex-wrap gap-10 items-end mb-16">
        {SHADOWS.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-3">
            <div className={`w-28 h-28 bg-white rounded-xl ${s.twClass} ${s.demo} flex items-center justify-center`}>
              <span className="text-xs font-mono text-slate-400">{s.name}</span>
            </div>
            <span className="text-xs font-mono text-slate-500">{s.twClass}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="grid grid-cols-[80px_140px_1fr_220px] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          <span>Token</span>
          <span>Tailwind</span>
          <span>CSS value</span>
          <span>Use case</span>
        </div>
        {SHADOWS.map((s, i) => (
          <div
            key={s.name}
            className={`grid grid-cols-[80px_140px_1fr_220px] px-4 py-3 items-center gap-4 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
          >
            <span className="font-mono text-xs text-[#0043ff] font-semibold">shadow-{s.name}</span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-600">
              {s.twClass} <CopyBtn value={s.twClass} />
            </span>
            <span className="font-mono text-xs text-slate-400 truncate">{s.cssValue}</span>
            <span className="text-xs text-slate-500">{s.use}</span>
          </div>
        ))}
      </div>

      {/* Usage guide */}
      <div className="mt-10 border border-slate-200 rounded-xl overflow-hidden bg-white">
        <div className="bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          Contextual usage
        </div>
        {[
          { context: 'Data table row (hover)',    shadow: 'shadow-sm',  note: 'Subtle lift on hover — never on default state' },
          { context: 'Card / metric widget',      shadow: 'shadow',     note: 'Default card elevation' },
          { context: 'Dropdown / Select menu',    shadow: 'shadow-md',  note: 'Floats above content without feeling heavy' },
          { context: 'Side panel / Drawer',       shadow: 'shadow-lg',  note: 'Slides in from edge, needs strong separation' },
          { context: 'Modal / Dialog',            shadow: 'shadow-xl',  note: 'Center-screen, blocks background' },
          { context: 'Command palette',           shadow: 'shadow-2xl', note: 'Highest prominence in the UI' },
        ].map((row) => (
          <div key={row.context} className="grid grid-cols-[220px_140px_1fr] px-4 py-2.5 border-t border-slate-200 text-sm">
            <span className="text-[#1b306c] font-medium">{row.context}</span>
            <span className="font-mono text-[#0043ff] text-xs self-center">{row.shadow}</span>
            <span className="text-slate-500 text-xs self-center">{row.note}</span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const OnComponents: Story = {
  name: 'On Components',
  render: () => (
    <div className="bg-slate-100 p-12 font-body">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-8">Shadows in context</p>
      <div className="flex flex-wrap gap-8 items-start">
        {/* Card */}
        <div className="shadow rounded-xl bg-white p-5 w-56">
          <p className="text-xs text-slate-400 mb-1">Card — <span className="font-mono text-[#0043ff]">shadow</span></p>
          <p className="text-sm font-semibold text-[#1b306c]">New Shipment</p>
          <p className="text-xs text-slate-400 mt-1">FedEx Ground · 2–3 days</p>
        </div>
        {/* Dropdown */}
        <div className="shadow-md rounded-xl bg-white py-2 w-48">
          <p className="text-xs text-slate-400 px-4 pb-2">Dropdown — <span className="font-mono text-[#0043ff]">shadow-md</span></p>
          {['Edit', 'Duplicate', 'Archive', 'Delete'].map((opt) => (
            <div key={opt} className={`px-4 py-2 text-sm ${opt === 'Delete' ? 'text-red-500' : 'text-[#1b306c]'} hover:bg-[#e6f1fd] cursor-pointer`}>{opt}</div>
          ))}
        </div>
        {/* Modal */}
        <div className="shadow-xl rounded-2xl bg-white p-6 w-72">
          <p className="text-xs text-slate-400 mb-3">Modal — <span className="font-mono text-[#0043ff]">shadow-xl</span></p>
          <p className="text-base font-semibold text-[#1b306c]">Confirm shipment</p>
          <p className="text-sm text-slate-500 mt-1">This will create a label for FedEx Ground. Proceed?</p>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 px-3 py-2 rounded-lg text-sm bg-slate-100 text-slate-600">Cancel</button>
            <button className="flex-1 px-3 py-2 rounded-lg text-sm bg-[#0043ff] text-white font-medium">Confirm</button>
          </div>
        </div>
      </div>
    </div>
  ),
};
