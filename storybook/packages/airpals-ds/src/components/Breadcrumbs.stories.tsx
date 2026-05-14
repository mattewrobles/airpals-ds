import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">HTML + Tailwind</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
          className="px-2 py-1 text-xs rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="px-4 py-3 text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto bg-white dark:bg-slate-900 leading-relaxed">
        {code}
      </pre>
    </div>
  );
}

/* ── Component ───────────────────────────────────────────── */

type BreadcrumbSeparator = 'arrow' | 'chevron' | 'slash';
type BreadcrumbBackground = 'white' | 'blue' | 'navy';

type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  showHome?: boolean;
  activeColor?: boolean;
  background?: BreadcrumbBackground;
};

function SeparatorIcon({ type }: { type: BreadcrumbSeparator }) {
  if (type === 'arrow') {
    return (
      <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 8H12M12 8L9 5M12 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (type === 'slash') {
    return <span className="text-slate-400 text-sm select-none">/</span>;
  }
  // chevron (default)
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? 'w-4 h-4'} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5L8 2L14 6.5V14H10V10H6V14H2V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Breadcrumbs({
  items,
  separator = 'chevron',
  showHome = false,
  activeColor = false,
  background = 'white',
}: BreadcrumbsProps) {
  const isColoredBg = background === 'blue' || background === 'navy';

  const wrapperCls = [
    'inline-flex px-4 py-2 rounded-lg',
    background === 'blue'  ? 'bg-brand-blue' :
    background === 'navy'  ? 'bg-brand-navy' :
    'bg-white dark:bg-slate-900',
  ].join(' ');

  const prevItemCls = isColoredBg
    ? 'text-white/70 text-sm hover:text-white transition-colors'
    : 'text-slate-600 text-sm hover:text-brand-navy dark:text-slate-400 dark:hover:text-slate-50 transition-colors';

  const activeItemCls = isColoredBg
    ? 'text-white text-sm font-medium'
    : activeColor
      ? 'text-brand-blue text-sm font-medium dark:text-brand-blue'
      : 'text-slate-900 text-sm font-medium dark:text-slate-50';

  const sepCls = isColoredBg ? 'text-white/50' : '';

  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: 'Home' }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb">
      <ol className={`${wrapperCls} flex items-center gap-1 flex-wrap`}>
        {allItems.map((item, idx) => {
          const isLast = idx === allItems.length - 1;
          const isHome = showHome && idx === 0;

          return (
            <li key={idx} className="flex items-center gap-1">
              {/* Separator (not before first item) */}
              {idx > 0 && (
                <span className={sepCls}>
                  <SeparatorIcon type={separator} />
                </span>
              )}

              {isLast ? (
                <span className={activeItemCls} aria-current="page">
                  {isHome ? <HomeIcon className={`w-4 h-4 ${isColoredBg ? 'text-white' : activeColor ? 'text-brand-blue' : 'text-slate-900 dark:text-slate-50'}`} /> : item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? '#'}
                  className={`${prevItemCls} flex items-center gap-1`}
                >
                  {isHome ? <HomeIcon className={`w-4 h-4 ${isColoredBg ? 'text-white/70' : 'text-slate-600 dark:text-slate-400'}`} /> : item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const DEFAULT_ITEMS: BreadcrumbItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Marketing' },
];

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    separator:   { control: 'select', options: ['arrow', 'chevron', 'slash'], description: 'Separator style between items' },
    background:  { control: 'select', options: ['white', 'blue', 'navy'], description: 'Background context — white = default, blue/navy = inverted' },
    showHome:    { control: 'boolean', description: 'Prepend a home icon as first item' },
    activeColor: { control: 'boolean', description: 'Highlight last (current) item in brand-blue' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          'Navigation breadcrumbs for the Airpals dashboard.',
          '',
          '| Prop | Options | Default |',
          '|------|---------|---------|',
          '| `separator` | `arrow` · `chevron` · `slash` | `chevron` |',
          '| `background` | `white` · `blue` · `navy` | `white` |',
          '| `showHome` | boolean | `false` |',
          '| `activeColor` | boolean | `false` |',
          '',
          'The last item in `items[]` is always treated as the current page (`aria-current="page"`).',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { items: DEFAULT_ITEMS, separator: 'chevron' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Breadcrumbs — chevron separator -->
<nav aria-label="Breadcrumb">
  <ol class="inline-flex items-center gap-1 flex-wrap px-4 py-2 rounded-lg bg-white">
    <li class="flex items-center gap-1">
      <a href="#" class="text-slate-600 text-sm hover:text-brand-navy transition-colors">Home</a>
    </li>
    <li class="flex items-center gap-1">
      <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <a href="#" class="text-slate-600 text-sm hover:text-brand-navy transition-colors">Projects</a>
    </li>
    <li class="flex items-center gap-1">
      <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="text-slate-900 text-sm font-medium" aria-current="page">Marketing</span>
    </li>
  </ol>
</nav>`,
      },
    },
  },
};

export const WithArrow: Story = {
  args: { items: DEFAULT_ITEMS, separator: 'arrow' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Arrow separator: replace chevron path with arrow path -->
<svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 16 16" fill="none">
  <path d="M4 8H12M12 8L9 5M12 8L9 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
      },
    },
  },
};

export const WithSlash: Story = {
  args: { items: DEFAULT_ITEMS, separator: 'slash' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Slash separator -->
<span class="text-slate-400 text-sm select-none">/</span>`,
      },
    },
  },
};

export const WithHomeIcon: Story = {
  name: 'With Home Icon',
  args: { items: [{ label: 'Projects', href: '#' }, { label: 'Marketing' }], separator: 'chevron', showHome: true },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Home icon as first item -->
<li class="flex items-center gap-1">
  <a href="#" class="flex items-center gap-1 text-slate-600 hover:text-brand-navy transition-colors">
    <svg class="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M2 6.5L8 2L14 6.5V14H10V10H6V14H2V6.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </a>
</li>`,
      },
    },
  },
};

export const ActiveHighlighted: Story = {
  name: 'Active Highlighted',
  args: { items: DEFAULT_ITEMS, separator: 'chevron', activeColor: true },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Current page item highlighted in brand-blue -->
<span class="text-brand-blue text-sm font-medium" aria-current="page">Marketing</span>`,
      },
    },
  },
};

export const BlueBg: Story = {
  name: 'Blue Background',
  args: { items: DEFAULT_ITEMS, separator: 'chevron', background: 'blue' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Inverted — blue background -->
<nav aria-label="Breadcrumb">
  <ol class="inline-flex items-center gap-1 flex-wrap px-4 py-2 rounded-lg bg-brand-blue">
    <li class="flex items-center gap-1">
      <a href="#" class="text-white/70 text-sm hover:text-white transition-colors">Home</a>
    </li>
    <!-- separator: text-white/50 -->
    <!-- active: text-white text-sm font-medium -->
  </ol>
</nav>`,
      },
    },
  },
};

export const NavyBg: Story = {
  name: 'Navy Background',
  args: { items: DEFAULT_ITEMS, separator: 'chevron', background: 'navy' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Inverted — navy background -->
<ol class="inline-flex items-center gap-1 flex-wrap px-4 py-2 rounded-lg bg-brand-navy">
  <!-- same inverted pattern as blue -->
</ol>`,
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8">

      <div className="space-y-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Separators</p>
        <div className="flex flex-col gap-3">
          <Breadcrumbs items={DEFAULT_ITEMS} separator="chevron" />
          <Breadcrumbs items={DEFAULT_ITEMS} separator="arrow" />
          <Breadcrumbs items={DEFAULT_ITEMS} separator="slash" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">With Home Icon</p>
        <Breadcrumbs items={[{ label: 'Projects', href: '#' }, { label: 'Marketing' }]} showHome />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Active Color</p>
        <Breadcrumbs items={DEFAULT_ITEMS} activeColor />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Inverted Backgrounds</p>
        <div className="flex flex-col gap-3">
          <Breadcrumbs items={DEFAULT_ITEMS} background="blue" />
          <Breadcrumbs items={DEFAULT_ITEMS} background="navy" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Longer Path</p>
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '#' },
            { label: 'Shipments', href: '#' },
            { label: 'Outbound', href: '#' },
            { label: 'SHP-00123' },
          ]}
          separator="chevron"
          activeColor
        />
      </div>

      {/* ── Code snippets ── */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Default (chevron)',
              code: `<nav aria-label="Breadcrumb">
  <ol class="inline-flex items-center gap-1 flex-wrap px-4 py-2 rounded-lg bg-white dark:bg-slate-900">
    <li>
      <a href="#" class="text-slate-600 text-sm hover:text-brand-navy dark:text-slate-400 transition-colors">Home</a>
    </li>
    <li class="flex items-center gap-1">
      <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <a href="#" class="text-slate-600 text-sm hover:text-brand-navy dark:text-slate-400 transition-colors">Projects</a>
    </li>
    <li class="flex items-center gap-1">
      <svg class="w-3.5 h-3.5 text-slate-400" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span class="text-slate-900 text-sm font-medium dark:text-slate-50" aria-current="page">Marketing</span>
    </li>
  </ol>
</nav>`,
            },
            {
              label: 'Active highlighted',
              code: `<!-- Last item highlighted in brand-blue -->
<span class="text-brand-blue text-sm font-medium dark:text-brand-blue" aria-current="page">
  Marketing
</span>`,
            },
            {
              label: 'Inverted (blue bg)',
              code: `<ol class="inline-flex items-center gap-1 flex-wrap px-4 py-2 rounded-lg bg-brand-blue">
  <li>
    <a href="#" class="text-white/70 text-sm hover:text-white transition-colors">Home</a>
  </li>
  <li class="flex items-center gap-1">
    <svg class="w-3.5 h-3.5 text-white/50" viewBox="0 0 16 16" fill="none">
      <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span class="text-white text-sm font-medium" aria-current="page">Marketing</span>
  </li>
</ol>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
};
