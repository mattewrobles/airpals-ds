import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Avatar } from '../lib/Avatar';
import type { AvatarSize, AvatarCorner, AvatarVariant, AvatarProps } from '../lib/Avatar';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=624-1830';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size:     { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], description: 'xs=24 · sm=38 · md=42 · lg=52 · xl=80' },
    corner:   { control: 'select', options: ['Square', 'Semi', 'Radius', 'Full'], description: 'Corner style' },
    variant:  { control: 'select', options: ['Image', 'Initials'] },
    initials: { control: 'text', description: '2-letter initials' },
    badge:    { control: 'boolean', description: 'Online status badge (green dot)' },
    src:      { control: 'text', description: 'Image URL (variant=Image only)' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `624-1830` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '5 sizes × 4 corners × 2 variants × badge on/off.',
          '',
          '| Size | px | Initials font |',
          '|------|----|---------------|',
          '| xs | 24×24 | 10px/600 |',
          '| sm | 38×38 | 14px/600 |',
          '| md | 42×42 | 16px/600 |',
          '| lg | 52×52 | 20px/600 |',
          '| xl | 80×80 | 28px/600 |',
          '',
          'Initials bg: `#0043ff` · Badge: `#22c55e` with white border.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Avatar'}
      types={['AvatarSize', 'AvatarCorner', 'AvatarVariant', 'AvatarProps']}
      jsx={`<Avatar initials="MA" size="md" />`}
      figmaKey="70ec4ea20c9aeec1abd83e30ef58feac189dab3e"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = {
  args: { size: 'md', corner: 'Full', variant: 'Initials', initials: 'TG' },
};

export const WithBadge: Story = {
  name: 'With Badge',
  args: { size: 'md', corner: 'Full', variant: 'Initials', initials: 'TG', badge: true },
};

export const XSmall: Story = { args: { size: 'xs', corner: 'Full', variant: 'Initials', initials: 'TG' } };
export const Small:  Story = { args: { size: 'sm', corner: 'Full', variant: 'Initials', initials: 'TG' } };
export const Large:  Story = { args: { size: 'lg', corner: 'Full', variant: 'Initials', initials: 'TG' } };
export const XLarge: Story = { args: { size: 'xl', corner: 'Full', variant: 'Initials', initials: 'TG' } };

export const AllSizes: Story = {
  name: 'All Sizes & Corners',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Sizes — Full Radius</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
            <div key={s} className="flex flex-col items-center gap-2">
              <Avatar size={s} corner="Full" initials="TG" />
              <span className="text-xs text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Corners — md size</p>
        <div className="flex items-center gap-4">
          {(['Square', 'Semi', 'Radius', 'Full'] as const).map(c => (
            <div key={c} className="flex flex-col items-center gap-2">
              <Avatar size="md" corner={c} initials="TG" />
              <span className="text-xs text-slate-400">{c}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">With Badge</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
            <Avatar key={s} size={s} corner="Full" initials="TG" badge />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Image Variant (placeholder)</p>
        <div className="flex items-end gap-4">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(s => (
            <Avatar key={s} size={s} corner="Full" variant="Image" initials="TG" />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Initials — md, Full Radius',
              html: `<div class="w-[42px] h-[42px] rounded-full bg-[#0043ff] flex items-center justify-center">
  <span class="text-base font-semibold text-white leading-none">TG</span>
</div>`,
              jsx: `<Avatar size="md" corner="Full" initials="TG" />`,
            },
            {
              label: 'With Badge',
              html: `<div class="relative inline-flex">
  <div class="w-[42px] h-[42px] rounded-full bg-[#0043ff] flex items-center justify-center">
    <span class="text-base font-semibold text-white leading-none">TG</span>
  </div>
  <span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#22c55e] border-2 border-white"></span>
</div>`,
              jsx: `<Avatar size="md" corner="Full" initials="TG" badge />`,
            },
            {
              label: 'xl size',
              html: `<div class="w-20 h-20 rounded-full bg-[#0043ff] flex items-center justify-center">
  <span class="text-[28px] font-semibold text-white leading-none">TG</span>
</div>`,
              jsx: `<Avatar size="xl" corner="Full" initials="TG" />`,
            },
          ].map(s => (
            <div key={s.label}>
              <p className="text-xs text-slate-400 mb-1">{s.label}</p>
              <CodeBlock code={s.html} jsx={s.jsx} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
