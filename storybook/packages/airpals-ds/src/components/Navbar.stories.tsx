import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { Navbar } from '../lib/Navbar';
import type { NavbarProps } from '../lib/Navbar';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    mobile:    { control: 'boolean' },
    collapsed: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `3a3f1b66137b2a2319c8482b6c2f6e4f19f0f403` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '3 variants — `Mobile` (True/False) × `Collapsed` (True/False).',
          '',
          '| Variant | Size | Notes |',
          '|---------|------|-------|',
          '| Desktop | 1440×108px | Logo + nav links + search + CTA |',
          '| Mobile | 390×64px | Logo + hamburger |',
          '| Mobile expanded | 390×auto | Full nav menu dropdown |',
          '',
          'CTA button: `bg-[#0043ff] text-white rounded-lg` — "Dashboard →"',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Navbar>;

/* ── Stories ─────────────────────────────────────────────── */

export const Desktop: Story = { args: { mobile: false } };
export const MobileCollapsed: Story = { name: 'Mobile — Collapsed', args: { mobile: true, collapsed: true } };
export const MobileExpanded: Story = { name: 'Mobile — Expanded', args: { mobile: true, collapsed: false } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-slate-50 font-body space-y-8 pb-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide px-8 pt-8 pb-3">Desktop (1440px)</p>
        <Navbar mobile={false} />
      </div>

      <div className="px-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Mobile — Collapsed</p>
        <Navbar mobile={true} collapsed={true} />
      </div>

      <div className="px-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Mobile — Expanded</p>
        <Navbar mobile={true} collapsed={false} />
      </div>

      <div className="px-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet — Desktop</p>
        <CodeBlock
          code={`<nav class="bg-white border-b border-slate-200 w-full">
  <div class="max-w-[1440px] mx-auto px-8 h-[108px] flex items-center justify-between gap-8">
    <span class="font-bold text-xl text-[#1b306c]">airpals</span>
    <div class="flex items-center gap-6">
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">Services ▾</a>
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">About Us</a>
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">For Companies</a>
      <a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff]">Pricing</a>
    </div>
    <a href="#" class="bg-[#0043ff] text-white text-sm font-medium rounded-lg px-4 py-2">Dashboard →</a>
  </div>
</nav>`}
          jsx={`<Navbar mobile={false} />`}
        />
      </div>
    </div>
  ),
};
