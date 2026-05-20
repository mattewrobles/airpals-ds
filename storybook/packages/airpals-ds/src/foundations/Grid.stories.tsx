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
  title: 'Foundations/Grid & Breakpoints',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          '## Airpals Grid System',
          '',
          '**Desktop-first B2B product.** 3 breakpoints, 12-column grid, max-width 1440px.',
          '',
          '| Breakpoint | Token | Width | Columns | Gutter | Margin |',
          '|------------|-------|-------|---------|--------|--------|',
          '| Mobile | `sm` | 390px | 4 | 16px | 20px |',
          '| Tablet | `md` | 768px | 8 | 24px | 32px |',
          '| Desktop | `lg` | 1024px+ | 12 | 32px | 32px |',
          '| Wide | `xl` | 1440px | 12 | 32px | 32px (max-w) |',
          '',
          '> Airpals is desktop-first — design at 1440px, adapt down to 390px mobile.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const BREAKPOINTS = [
  { name: 'Mobile',  token: 'sm',  minW: '390px',  cols: 4,  gutter: '16px', margin: '20px',  twPrefix: 'sm:', color: '#e6f1fd' },
  { name: 'Tablet',  token: 'md',  minW: '768px',  cols: 8,  gutter: '24px', margin: '32px',  twPrefix: 'md:', color: '#c7d2fe' },
  { name: 'Desktop', token: 'lg',  minW: '1024px', cols: 12, gutter: '32px', margin: '32px',  twPrefix: 'lg:', color: '#0043ff' },
  { name: 'Wide',    token: 'xl',  minW: '1440px', cols: 12, gutter: '32px', margin: 'auto',  twPrefix: 'xl:', color: '#1b306c' },
];

const LAYOUTS = [
  {
    name: 'Dashboard — Sidebar + Main',
    description: 'Primary app layout. Sidebar fixed, content fills rest.',
    code: `<div class="flex h-screen">
  <!-- Sidebar: fixed 240px -->
  <aside class="w-60 flex-shrink-0 border-r border-slate-200 bg-white">
    <!-- nav items -->
  </aside>
  <!-- Main content: fills remaining space -->
  <main class="flex-1 overflow-auto p-8">
    <!-- page content -->
  </main>
</div>`,
  },
  {
    name: 'Data Table Page',
    description: 'Full-width table with page header and filters.',
    code: `<div class="max-w-[1440px] mx-auto px-8 py-6">
  <!-- Header row -->
  <div class="flex items-center justify-between mb-6">
    <h1 class="text-3xl font-semibold text-[#1b306c]">Shipments</h1>
    <button class="bg-[#0043ff] text-white px-4 py-2 rounded-lg text-sm font-medium">
      New Shipment
    </button>
  </div>
  <!-- Filters row -->
  <div class="flex gap-3 mb-4"> <!-- filter chips --> </div>
  <!-- Table -->
  <div class="border border-slate-200 rounded-xl overflow-hidden">
    <table class="w-full text-sm"> <!-- ... --> </table>
  </div>
</div>`,
  },
  {
    name: 'Settings — Two Column',
    description: 'Left nav + right content. Common for settings and profile pages.',
    code: `<div class="max-w-[1440px] mx-auto px-8 py-6">
  <div class="grid grid-cols-[240px_1fr] gap-8">
    <!-- Left nav -->
    <nav class="space-y-1">
      <a class="block px-3 py-2 text-sm font-medium text-[#1b306c] bg-[#e6f1fd] rounded-lg">
        General
      </a>
      <a class="block px-3 py-2 text-sm text-slate-500 hover:text-[#1b306c] rounded-lg">
        Billing
      </a>
    </nav>
    <!-- Content -->
    <div class="space-y-6">
      <!-- settings sections -->
    </div>
  </div>
</div>`,
  },
  {
    name: 'Cards Grid — Metrics',
    description: '4-column metric cards. Responsive: 1 col mobile → 2 tablet → 4 desktop.',
    code: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">Shipments Today</p>
    <p class="text-3xl font-semibold text-[#1b306c] mt-1">142</p>
    <p class="text-xs text-[#22ad5c] mt-1">↑ 12% vs yesterday</p>
  </div>
  <!-- repeat × 4 -->
</div>`,
  },
  {
    name: 'Form — Centered narrow',
    description: 'Login, onboarding, confirmation dialogs. Max-width 480px, centered.',
    code: `<div class="min-h-screen flex items-center justify-center bg-slate-50 px-4">
  <div class="w-full max-w-[480px] bg-white border border-slate-200 rounded-2xl p-8 shadow">
    <h1 class="text-2xl font-semibold text-[#1b306c] mb-6">Create account</h1>
    <!-- form fields -->
    <button class="w-full bg-[#0043ff] text-white py-2.5 rounded-lg font-medium mt-4">
      Continue
    </button>
  </div>
</div>`,
  },
];

const CONTAINER = `<!-- Standard page container -->
<div class="max-w-[1440px] mx-auto px-8">
  <!-- content -->
</div>

<!-- Responsive padding -->
<div class="max-w-[1440px] mx-auto px-5 md:px-8">
  <!-- content -->
</div>`;

export const Breakpoints: Story = {
  name: 'Breakpoints',
  render: () => (
    <div className="bg-white p-8 font-body min-h-screen space-y-10">
      <div>
        <h1 className="text-3xl font-semibold text-[#1b306c]" style={{ fontFamily: 'Lexend, sans-serif' }}>Grid & Breakpoints</h1>
        <p className="mt-2 text-sm text-slate-500">Desktop-first. Design at 1440px, scale down. Max container: <span className="font-mono bg-slate-100 px-1 rounded">max-w-[1440px] mx-auto px-8</span>.</p>
      </div>

      {/* Breakpoint visual */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Breakpoint scale</p>
        <div className="flex items-end gap-3">
          {BREAKPOINTS.map((bp) => (
            <div key={bp.name} className="flex-1 rounded-xl overflow-hidden border border-slate-200">
              <div className="h-3" style={{ backgroundColor: bp.color }} />
              <div className="p-3 bg-white">
                <p className="font-mono text-xs font-bold text-[#1b306c]">{bp.token}</p>
                <p className="text-xs text-slate-400">{bp.minW}</p>
                <p className="text-xs text-slate-400">{bp.cols} col</p>
                <p className="font-mono text-xs text-[#0043ff] mt-1">{bp.twPrefix}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="grid grid-cols-[120px_100px_80px_80px_80px_160px] bg-slate-50 px-4 py-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
          <span>Breakpoint</span><span>Min width</span><span>Columns</span><span>Gutter</span><span>Margin</span><span>Tailwind prefix</span>
        </div>
        {BREAKPOINTS.map((bp, i) => (
          <div key={bp.name} className={`grid grid-cols-[120px_100px_80px_80px_80px_160px] px-4 py-3 items-center gap-4 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
            <span className="text-sm font-semibold text-[#1b306c]">{bp.name}</span>
            <span className="font-mono text-xs text-slate-600">{bp.minW}</span>
            <span className="font-mono text-xs text-slate-600">{bp.cols}</span>
            <span className="font-mono text-xs text-slate-600">{bp.gutter}</span>
            <span className="font-mono text-xs text-slate-600">{bp.margin}</span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-[#0043ff]">{bp.twPrefix}* <CopyBtn value={bp.twPrefix} /></span>
          </div>
        ))}
      </div>

      {/* Container */}
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-50 px-4 py-2 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Standard container</span>
          <CopyBtn value="max-w-[1440px] mx-auto px-8" />
        </div>
        <pre className="p-4 bg-slate-900 text-xs font-mono text-green-400 rounded-b-xl overflow-x-auto">{CONTAINER}</pre>
      </div>
    </div>
  ),
};

export const CommonLayouts: Story = {
  name: 'Common Layouts',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Copy-ready layout patterns for Airpals pages</p>

      {LAYOUTS.map((layout) => (
        <div key={layout.name} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="bg-slate-50 px-4 py-3 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#1b306c]">{layout.name}</p>
              <p className="text-xs text-slate-400 mt-0.5">{layout.description}</p>
            </div>
            <CopyBtn value={layout.code} />
          </div>
          <pre className="p-4 bg-slate-900 text-xs font-mono text-slate-300 overflow-x-auto rounded-b-xl">{layout.code}</pre>
        </div>
      ))}
    </div>
  ),
};
