import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { UsageBlock } from '../shared/UsageBlock';

const meta: Meta = {
  title: 'Brand/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Icons',
          '',
          'The Airpals DS v2.5 icon set uses **Lucide React** (1,500+ icons, consistent stroke style).',
          '',
          '### Usage in your project',
          '```bash',
          'yarn add lucide-react',
          '```',
          '```tsx',
          "import { Mail, Truck } from 'lucide-react';",
          '',
          '// Size via size prop or className',
          '<Mail size={20} className="text-[#0043ff]" />',
          '<Truck className="w-5 h-5 text-[#1b306c]" />',
          '```',
          '',
          '### DS Icon component',
          '```tsx',
          "import { Icon } from 'airpals-ds';",
          '<Icon name="package" size={20} />',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={[]}
      types={[]}
      jsx={`import { Mail, Truck } from 'lucide-react';\n\n<Mail size={20} className="text-[#0043ff]" />\n<Truck size={24} className="text-[#1b306c]" />`}
      figmaKey="318727013b1e24c56a6a066facec0b6c01bbb069"
    />
  ),
};

// Curated Airpals icon set — Lucide names (kebab-case for display, PascalCase for component)
const AIRPALS_ICONS = [
  'mail', 'mail-open', 'bell',
  'user', 'users', 'user-plus', 'user-minus',
  'building-2',
  'map-pin', 'map', 'globe',
  'truck', 'send', 'archive',
  'box', 'package',
  'check', 'check-circle', 'x', 'x-circle',
  'alert-triangle', 'alert-circle', 'info',
  'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
  'circle-arrow-right', 'refresh-cw', 'arrow-left-right',
  'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
  'search', 'filter', 'sliders-horizontal',
  'plus', 'plus-circle', 'minus',
  'pencil', 'pen-line', 'trash-2', 'file', 'file-text',
  'clipboard', 'clipboard-copy', 'clipboard-check',
  'calendar', 'clock',
  'tag', 'menu', 'more-horizontal', 'more-vertical',
  'share-2', 'link', 'external-link',
  'eye', 'eye-off', 'lock', 'unlock',
  'credit-card', 'dollar-sign',
  'bar-chart', 'pie-chart', 'trending-up',
  'settings', 'wrench',
  'home', 'inbox',
  'image', 'camera', 'qr-code', 'printer',
  'phone', 'smartphone',
  'star', 'heart', 'flag', 'bookmark',
  'log-out',
];

function toComponentName(name: string): string {
  return name.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

export const IconPalette: Story = {
  name: 'Icon Palette',
  render: () => {
    const [query, setQuery] = useState('');
    const [size, setSize] = useState(24);
    const [copied, setCopied] = useState('');

    const filtered = AIRPALS_ICONS.filter((n) => {
      const compName = toComponentName(n);
      return (
        (LucideIcons as Record<string, unknown>)[compName] &&
        (!query || n.toLowerCase().includes(query.toLowerCase()))
      );
    });

    const copy = (name: string) => {
      const compName = toComponentName(name);
      const imp = `import { ${compName} } from 'lucide-react';`;
      navigator.clipboard.writeText(imp);
      setCopied(name);
      setTimeout(() => setCopied(''), 1400);
    };

    return (
      <div className="bg-white p-6 font-body">
        {/* Controls */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-[#dfe4ea] rounded-lg px-3 py-1.5 text-sm outline-none focus:border-[#0043ff] w-56"
          />
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Size</span>
            {([16, 20, 24] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={[
                  'px-2 py-1 text-xs rounded font-mono transition-colors',
                  size === s
                    ? 'bg-[#0043ff] text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200',
                ].join(' ')}
              >
                {s}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 ml-auto">{filtered.length} icons · click to copy import</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2">
          {filtered.map((name) => {
            const compName = toComponentName(name);
            const Comp = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; 'aria-hidden'?: boolean }>>)[compName];
            if (!Comp) return null;
            return (
              <button
                key={name}
                onClick={() => copy(name)}
                title={`Copy import for ${compName}`}
                className={[
                  'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center',
                  copied === name
                    ? 'border-[#0043ff] bg-[#e6f1fd] text-[#0043ff]'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50 text-[#1b306c]',
                ].join(' ')}
              >
                <Comp size={size} aria-hidden={true} />
                <span className="text-[10px] font-mono text-slate-400 leading-tight break-all">{name}</span>
              </button>
            );
          })}
        </div>

        {/* Usage code */}
        <div className="mt-8 bg-slate-900 rounded-xl p-5 text-sm font-mono text-slate-300">
          <p className="text-slate-500 text-xs mb-3 uppercase tracking-wide">Example</p>
          <p>
            <span className="text-[#7dd3fc]">import</span>
            {' { '}
            <span className="text-[#fde68a]">Mail</span>
            {', '}
            <span className="text-[#fde68a]">Truck</span>
            {' } '}
            <span className="text-[#7dd3fc]">from</span>
            {' '}
            <span className="text-[#86efac]">'lucide-react'</span>
            ;
          </p>
          <p className="mt-2 text-slate-400">
            {'<'}<span className="text-[#fde68a]">Mail</span>
            {' '}
            <span className="text-[#c4b5fd]">size</span>
            =
            <span className="text-[#86efac]">{'{20}'}</span>
            {' '}
            <span className="text-[#c4b5fd]">className</span>
            =
            <span className="text-[#86efac]">"text-[#0043ff]"</span>
            {' />'}
          </p>
        </div>
      </div>
    );
  },
};

export const SizeComparison: Story = {
  name: 'Size Comparison',
  render: () => {
    const icons = ['mail', 'truck', 'user', 'check-circle', 'arrow-right', 'settings'];
    return (
      <div className="bg-white p-6">
        <div className="flex flex-col gap-6">
          {([16, 20, 24] as const).map((size) => (
            <div key={size} className="flex items-center gap-6">
              <span className="text-xs font-mono text-slate-400 w-8">{size}px</span>
              <div className="flex items-center gap-4">
                {icons.map((name) => {
                  const compName = toComponentName(name);
                  const Comp = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean }>>)[compName];
                  return Comp ? (
                    <Comp key={name} size={size} className="text-[#1b306c]" aria-hidden={true} />
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
