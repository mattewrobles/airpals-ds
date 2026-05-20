import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { Footer } from '../lib/Footer';
import type { FooterProps } from '../lib/Footer';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  argTypes: {
    mobile: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `ddf4c0906a29a7d9dd5ac6cffba9a6fb0aa25bf1` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '2 variants — `Mobile` (True/False).',
          '',
          '| Element | Style |',
          '|---------|-------|',
          '| Background | `bg-[#1b306c]` (brand navy) |',
          '| Links | `text-slate-300 hover:text-white text-sm` |',
          '| Column headings | `text-slate-400 text-xs uppercase tracking-wider` |',
          '| CTA "Subscribe" | `bg-[#0043ff] text-white rounded-lg` |',
          '| Trust bar | SOC 2 · AICPA · 256-bit SSL |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

/* ── Stories ─────────────────────────────────────────────── */

export const Desktop: Story = { args: { mobile: false } };
export const Mobile: Story = { args: { mobile: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="font-body space-y-0">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide px-8 py-3 bg-slate-50">Desktop</p>
        <Footer mobile={false} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide px-8 py-3 bg-slate-50">Mobile</p>
        <Footer mobile={true} />
      </div>
      <div className="bg-slate-50 px-8 py-6">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet — Footer link column</p>
        <CodeBlock
          code={`<footer class="bg-[#1b306c] text-white">
  <div class="max-w-[1440px] mx-auto px-8 pt-12 pb-8">
    <!-- Nav columns -->
    <div class="grid grid-cols-4 gap-8 pb-8 border-b border-white/10">
      <div>
        <h3 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Company</h3>
        <ul class="space-y-2.5">
          <li><a href="#" class="text-sm text-slate-300 hover:text-white transition-colors">About Us</a></li>
          <li><a href="#" class="text-sm text-slate-300 hover:text-white transition-colors">For Companies</a></li>
          <li><a href="#" class="text-sm text-slate-300 hover:text-white transition-colors">Pricing</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>`}
          jsx={`<Footer mobile={false} />`}
        />
      </div>
    </div>
  ),
};
