import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import * as HeroOutline from '@heroicons/react/24/outline';
import * as HeroSolid from '@heroicons/react/24/solid';

const meta: Meta = {
  title: 'Brand/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Icons',
          '',
          'The Airpals DS icon set is **HeroIcons v2** (451 icons, Outline + Solid).',
          '',
          '### Usage in your project',
          '```bash',
          'npm install @heroicons/react',
          '```',
          '```tsx',
          "import { EnvelopeIcon, UserGroupIcon } from '@heroicons/react/24/outline';",
          "import { EnvelopeIcon } from '@heroicons/react/24/solid';",
          '',
          '// Size via width/height prop or className',
          '<EnvelopeIcon className="w-5 h-5 text-[#0043ff]" />',
          '```',
          '',
          '### Figma DS naming → HeroIcons',
          '`Icon/Outline/envelope` → `EnvelopeIcon` from `@heroicons/react/24/outline`',
          '`Icon/Solid/envelope` → `EnvelopeIcon` from `@heroicons/react/24/solid`',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

// Curated set of icons used in Airpals DS / app
const AIRPALS_ICONS = [
  'envelope', 'envelope-open', 'bell', 'bell-slash',
  'user', 'user-group', 'user-plus', 'user-minus', 'users',
  'building-office', 'building-office-2',
  'map-pin', 'map', 'globe-alt',
  'truck', 'paper-airplane', 'archive-box', 'archive-box-arrow-down',
  'cube', 'cube-transparent',
  'check', 'check-circle', 'x-mark', 'x-circle',
  'exclamation-triangle', 'exclamation-circle', 'information-circle',
  'arrow-right', 'arrow-left', 'arrow-up', 'arrow-down',
  'arrow-right-circle', 'arrow-path', 'arrows-right-left',
  'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down',
  'magnifying-glass', 'funnel', 'adjustments-horizontal',
  'plus', 'plus-circle', 'minus', 'minus-circle',
  'pencil', 'pencil-square', 'trash', 'document', 'document-text',
  'clipboard', 'clipboard-document', 'clipboard-document-check',
  'calendar', 'calendar-days', 'clock',
  'tag', 'tag', 'bars-3', 'ellipsis-horizontal', 'ellipsis-vertical',
  'share', 'link', 'external-link', 'arrow-top-right-on-square',
  'eye', 'eye-slash', 'lock-closed', 'lock-open',
  'credit-card', 'banknotes', 'receipt-percent',
  'chart-bar', 'chart-pie', 'presentation-chart-line',
  'cog', 'cog-6-tooth', 'wrench', 'wrench-screwdriver',
  'home', 'inbox', 'inbox-arrow-down', 'inbox-stack',
  'photo', 'camera', 'qr-code', 'printer',
  'phone', 'device-phone-mobile',
  'star', 'heart', 'flag', 'bookmark',
  'logout' as string,
];

function toComponentName(name: string): string {
  return name.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('') + 'Icon';
}

export const IconPalette: Story = {
  name: 'Icon Palette',
  render: () => {
    const [query, setQuery] = useState('');
    const [variant, setVariant] = useState<'outline' | 'solid'>('outline');
    const [size, setSize] = useState(24);
    const [copied, setCopied] = useState('');

    const lib = variant === 'outline' ? HeroOutline : HeroSolid;
    const filtered = AIRPALS_ICONS.filter((n) => {
      const compName = toComponentName(n);
      return (
        (lib as Record<string, unknown>)[compName] &&
        (!query || n.toLowerCase().includes(query.toLowerCase()))
      );
    });

    const copy = (name: string) => {
      const imp = `import { ${toComponentName(name)} } from '@heroicons/react/24/${variant}';`;
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
          <div className="flex rounded-lg border border-[#dfe4ea] overflow-hidden">
            {(['outline', 'solid'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={[
                  'px-3 py-1.5 text-sm font-medium transition-colors',
                  variant === v
                    ? 'bg-[#0043ff] text-white'
                    : 'bg-white text-[#637381] hover:bg-slate-50',
                ].join(' ')}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
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
            const Comp = (lib as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[compName];
            if (!Comp) return null;
            return (
              <button
                key={name + variant}
                onClick={() => copy(name)}
                title={`Copy import for ${compName}`}
                className={[
                  'flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center',
                  copied === name
                    ? 'border-[#0043ff] bg-[#e6f1fd] text-[#0043ff]'
                    : 'border-transparent hover:border-slate-200 hover:bg-slate-50 text-[#1b306c]',
                ].join(' ')}
              >
                <Comp width={size} height={size} aria-hidden="true" />
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
            <span className="text-[#fde68a]">EnvelopeIcon</span>
            {' } '}
            <span className="text-[#7dd3fc]">from</span>
            {' '}
            <span className="text-[#86efac]">'@heroicons/react/24/outline'</span>
            ;
          </p>
          <p className="mt-2 text-slate-400">
            {'<'}<span className="text-[#fde68a]">EnvelopeIcon</span>
            {' '}
            <span className="text-[#c4b5fd]">className</span>
            =
            <span className="text-[#86efac]">"w-5 h-5 text-[#0043ff]"</span>
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
    const icons = ['envelope', 'truck', 'user', 'check-circle', 'arrow-right', 'cog-6-tooth'];
    return (
      <div className="bg-white p-6">
        <div className="flex flex-col gap-6">
          {([16, 20, 24] as const).map((size) => (
            <div key={size} className="flex items-center gap-6">
              <span className="text-xs font-mono text-slate-400 w-8">{size}px</span>
              <div className="flex items-center gap-4">
                {icons.map((name) => {
                  const compName = toComponentName(name);
                  const Comp = (HeroOutline as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>)[compName];
                  return Comp ? (
                    <Comp key={name} width={size} height={size} className="text-[#1b306c]" aria-hidden="true" />
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
