import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Component ───────────────────────────────────────────── */
/*
  Figma specs (file 3oMpon9bh8T8d0hFQt7l2g):
  key: 1d0edc6fa49b9640eaf8b2b8661b22af676267d9
  12 variants — Style 1–12
  Separators: arrow (›) / slash (/) / chevron (›)
  With/without home icon
  Colored background variants (bg-[#e6f1fd])
  Links: text-slate-500 hover:text-[#1b306c] text-sm
  Current: text-[#1b306c] font-medium text-sm
  Separator: text-slate-300
*/

type BreadcrumbSeparator = 'slash' | 'chevron' | 'arrow';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  showHomeIcon?: boolean;
  coloredBg?: boolean;
};

const HOME_ICON = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.167 5.833L7 1.167l5.833 4.666V12.25a.583.583 0 01-.583.583H9.333a.583.583 0 01-.583-.583V9.333H5.25v2.917a.583.583 0 01-.583.583H1.75a.583.583 0 01-.583-.583V5.833z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SEPARATORS: Record<BreadcrumbSeparator, string> = {
  slash:   '/',
  chevron: '›',
  arrow:   '→',
};

function Breadcrumbs({ items, separator = 'slash', showHomeIcon = false, coloredBg = false }: BreadcrumbsProps) {
  const sep = SEPARATORS[separator];
  const wrapClass = coloredBg
    ? 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e6f1fd]'
    : 'inline-flex items-center gap-1.5';

  return (
    <nav aria-label="Breadcrumb" className="font-body">
      <ol className={wrapClass}>
        {showHomeIcon && (
          <>
            <li>
              <a href="#" className="text-slate-400 hover:text-[#1b306c] transition-colors" aria-label="Home">
                {HOME_ICON}
              </a>
            </li>
            {items.length > 0 && (
              <li aria-hidden="true" className="text-slate-300 text-sm select-none">{sep}</li>
            )}
          </>
        )}
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              <li>
                {isLast ? (
                  <span className="text-sm font-medium text-[#1b306c]" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href ?? '#'}
                    className="text-sm text-slate-500 hover:text-[#1b306c] transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" className="text-slate-300 text-sm select-none">{sep}</li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  argTypes: {
    separator:   { control: 'select', options: ['slash', 'chevron', 'arrow'] },
    showHomeIcon: { control: 'boolean' },
    coloredBg:   { control: 'boolean', description: 'Wrap in bg-[#e6f1fd] pill' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `1d0edc6fa49b9640eaf8b2b8661b22af676267d9` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '12 variants — separator style × home icon × colored background.',
          '',
          '| Element | Style |',
          '|---------|-------|',
          '| Link | `text-slate-500 hover:text-[#1b306c] text-sm` |',
          '| Current | `text-[#1b306c] font-medium text-sm` |',
          '| Separator | `text-slate-300` |',
          '| Colored bg | `bg-[#e6f1fd] px-3 py-1.5 rounded-lg` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

const defaultItems: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Shipments', href: '#' },
  { label: 'New Shipment' },
];

/* ── Stories ─────────────────────────────────────────────── */

export const Slash: Story = { args: { items: defaultItems, separator: 'slash' } };
export const Chevron: Story = { args: { items: defaultItems, separator: 'chevron' } };
export const Arrow: Story = { args: { items: defaultItems, separator: 'arrow' } };
export const WithHomeIcon: Story = { name: 'With Home Icon', args: { items: defaultItems, separator: 'slash', showHomeIcon: true } };
export const ColoredBackground: Story = { name: 'Colored Background', args: { items: defaultItems, separator: 'slash', coloredBg: true } };
export const TwoLevels: Story = { name: 'Two Levels', args: { items: [{ label: 'Shipments', href: '#' }, { label: 'Order #1234' }] } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-6">
      {[
        { label: 'Slash separator', props: { items: defaultItems, separator: 'slash' as const } },
        { label: 'Chevron separator', props: { items: defaultItems, separator: 'chevron' as const } },
        { label: 'Arrow separator', props: { items: defaultItems, separator: 'arrow' as const } },
        { label: 'With home icon', props: { items: defaultItems, separator: 'slash' as const, showHomeIcon: true } },
        { label: 'Colored background', props: { items: defaultItems, separator: 'slash' as const, coloredBg: true } },
        { label: 'Home icon + colored bg', props: { items: defaultItems, separator: 'chevron' as const, showHomeIcon: true, coloredBg: true } },
        { label: 'Two levels', props: { items: [{ label: 'Shipments', href: '#' }, { label: 'Order #1234' }], separator: 'slash' as const } },
      ].map(({ label, props }) => (
        <div key={label}>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">{label}</p>
          <Breadcrumbs {...props} />
        </div>
      ))}

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<nav aria-label="Breadcrumb">
  <ol class="inline-flex items-center gap-1.5">
    <li><a href="#" class="text-sm text-slate-500 hover:text-[#1b306c]">Dashboard</a></li>
    <li aria-hidden="true" class="text-slate-300 text-sm">/</li>
    <li><a href="#" class="text-sm text-slate-500 hover:text-[#1b306c]">Shipments</a></li>
    <li aria-hidden="true" class="text-slate-300 text-sm">/</li>
    <li><span class="text-sm font-medium text-[#1b306c]" aria-current="page">New Shipment</span></li>
  </ol>
</nav>`}
          jsx={`<Breadcrumbs
  items={[
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Shipments', href: '/shipments' },
    { label: 'New Shipment' },
  ]}
  separator="slash"
/>`}
        />
      </div>
    </div>
  ),
};
