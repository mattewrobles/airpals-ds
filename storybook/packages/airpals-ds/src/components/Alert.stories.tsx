import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { Alert } from '../lib/Alert';
import type { AlertType, AlertProps } from '../lib/Alert';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=540-106';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    type:  { control: 'select', options: ['Error', 'Warning'] },
    title: { control: 'text' },
    items: { control: 'object', description: 'Optional list items' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `540-106` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Alert banner — 2 types × list/no-list. Radius: `6px` · Padding: `16px` · Gap: `12px`.',
          '',
          '| Token | Error | Warning |',
          '|-------|-------|---------|',
          '| bg | `#fef2f2` | `#fffbeb` |',
          '| icon | `#f87171` | `#fbbf24` |',
          '| title | `#991b1b` · 14px/500 | `#92400e` · 14px/500 |',
          '| list items | `#374151` · 14px/400 | `#374151` · 14px/400 |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

/* ── Stories ─────────────────────────────────────────────── */

export const ErrorSimple: Story = {
  name: 'Error — Simple',
  args: { type: 'Error', title: 'No carriers were found for the selected shipment parameters.' },
};

export const ErrorWithList: Story = {
  name: 'Error — With List',
  args: {
    type: 'Error',
    title: 'Please fix the following errors:',
    items: ['Origin address is required', 'Weight must be greater than 0', 'Dimensions are missing'],
  },
};

export const WarningSimple: Story = {
  name: 'Warning — Simple',
  args: { type: 'Warning', title: 'Carrier account is not connected. Rates may be limited.' },
};

export const WarningWithList: Story = {
  name: 'Warning — With List',
  args: {
    type: 'Warning',
    title: 'Please read carefully before you proceed:',
    items: ['This action cannot be undone', 'All pending shipments will be cancelled'],
  },
};

export const AllTypes: Story = {
  name: 'All Types',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8 max-w-xl">
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Error</p>
        <Alert type="Error" title="No carriers were found for the selected shipment parameters." />
        <Alert type="Error" title="Please fix the following errors:" items={['Origin address is required', 'Weight must be greater than 0', 'Dimensions are missing']} />
      </div>
      <div className="space-y-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Warning</p>
        <Alert type="Warning" title="Carrier account is not connected. Rates may be limited." />
        <Alert type="Warning" title="Please read carefully:" items={['This action cannot be undone', 'All pending shipments will be cancelled']} />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Error — simple',
              html: `<div class="flex gap-3 bg-[#fef2f2] rounded-[6px] p-4">
  <!-- x-circle SVG, text-[#f87171] w-5 h-5 -->
  <p class="text-sm text-[#991b1b] leading-5">Message</p>
</div>`,
              jsx: `<Alert type="Error" title="Message" />`,
            },
            {
              label: 'Error — with list',
              html: `<div class="flex gap-3 bg-[#fef2f2] rounded-[6px] p-4">
  <!-- x-circle SVG, text-[#f87171] -->
  <div class="flex flex-col gap-2">
    <p class="text-sm font-medium text-[#991b1b]">Title</p>
    <ul class="flex flex-col gap-1">
      <li class="text-sm text-[#374151] list-disc ml-4">Item</li>
    </ul>
  </div>
</div>`,
              jsx: `<Alert type="Error" title="Title" items={['Item 1', 'Item 2']} />`,
            },
            {
              label: 'Warning — simple',
              html: `<div class="flex gap-3 bg-[#fffbeb] rounded-[6px] p-4">
  <!-- exclamation-circle SVG, text-[#fbbf24] -->
  <p class="text-sm text-[#92400e] leading-5">Message</p>
</div>`,
              jsx: `<Alert type="Warning" title="Message" />`,
            },
          ].map((s) => (
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
