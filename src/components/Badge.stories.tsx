import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Badge } from '../lib/Badge';
import type { BadgeColor, BadgeVariant, BadgeShape, BadgeProps } from '../lib/Badge';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-2011';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color:   { control: 'select', options: ['Primary', 'Secondary', 'Dark', 'Gray', 'Light', 'Warning', 'Danger', 'Success', 'Info'] },
    variant: { control: 'select', options: ['Fill', 'Outline', 'Duo Tone'] },
    shape:   { control: 'select', options: ['Semi', 'Full'], description: 'Semi = r:4 · Full = rounded-full' },
    label:   { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `625-2011` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '54 variants — 9 colors × 3 variants × 2 shapes. Height: `28px` · Padding: `4/12px`.',
          '',
          '| Token | Fill bg | Duo bg | Duo text |',
          '|-------|---------|--------|---------|',
          '| Primary | `#0043ff` | `/10` | `#0043ff` |',
          '| Secondary | `#fc4575` | `/10` | `#fc4575` |',
          '| Dark | `#0a0a0a` | `/10` | `#0a0a0a` |',
          '| Warning | `#f59e0b` | `/10` | `#f59e0b` |',
          '| Danger | `#ef4444` | `/10` | `#ef4444` |',
          '| Success | `#22ad5c` | `/10` | `#22ad5c` |',
          '| Info | `#00a0ff` | `/10` | `#00a0ff` |',
          '| Gray | `#637381` | `/10` | `#637381` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Badge'}
      types={['BadgeColor', 'BadgeVariant', 'BadgeShape', 'BadgeProps']}
      jsx={`<Badge label="In Transit" color="Info" variant="Duo Tone" />`}
      figmaKey="9469c69590accb9b16f66d63f681e74646d930d5"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const Delivered: Story = { args: { label: 'Delivered',      color: 'Success', variant: 'Duo Tone' } };
export const InTransit: Story = { name: 'In Transit', args: { label: 'In Transit', color: 'Info',    variant: 'Duo Tone' } };
export const Pending:   Story = { args: { label: 'Pending Pickup', color: 'Warning', variant: 'Duo Tone' } };
export const Failed:    Story = { args: { label: 'Failed',         color: 'Danger',  variant: 'Duo Tone' } };

export const AllShipmentStatuses: Story = {
  name: 'All Shipment Statuses',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Shipment Status — Duo Tone (recommended)</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="Delivered"      color="Success" variant="Duo Tone" />
          <Badge label="In Transit"     color="Info"    variant="Duo Tone" />
          <Badge label="Pending Pickup" color="Warning" variant="Duo Tone" />
          <Badge label="Failed"         color="Danger"  variant="Duo Tone" />
          <Badge label="Cancelled"      color="Gray"    variant="Duo Tone" />
          <Badge label="Label Created"  color="Light"   variant="Duo Tone" />
          <Badge label="Same-Day"       color="Primary" variant="Duo Tone" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">All Colors — Duo Tone</p>
        <div className="flex flex-wrap gap-2">
          {(['Primary','Secondary','Dark','Gray','Light','Warning','Danger','Success','Info'] as const).map(c => (
            <Badge key={c} label={c} color={c} variant="Duo Tone" />
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">All Variants — Success</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="Fill"     color="Success" variant="Fill" />
          <Badge label="Outline"  color="Success" variant="Outline" />
          <Badge label="Duo Tone" color="Success" variant="Duo Tone" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Shapes</p>
        <div className="flex flex-wrap gap-2">
          <Badge label="Semi (r:4)"          color="Primary" variant="Fill" shape="Semi" />
          <Badge label="Full (rounded-full)"  color="Primary" variant="Fill" shape="Full" />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Delivered (Duo Tone)',
              html: `<span class="inline-flex items-center px-3 py-1 h-7 text-xs font-medium rounded-full bg-[#22ad5c]/10 text-[#22ad5c]">Delivered</span>`,
              jsx: `<Badge label="Delivered" color="Success" variant="Duo Tone" />`,
            },
            {
              label: 'In Transit',
              html: `<span class="inline-flex items-center px-3 py-1 h-7 text-xs font-medium rounded-full bg-[#00a0ff]/10 text-[#00a0ff]">In Transit</span>`,
              jsx: `<Badge label="In Transit" color="Info" variant="Duo Tone" />`,
            },
            {
              label: 'Failed',
              html: `<span class="inline-flex items-center px-3 py-1 h-7 text-xs font-medium rounded-full bg-[#ef4444]/10 text-[#ef4444]">Failed</span>`,
              jsx: `<Badge label="Failed" color="Danger" variant="Duo Tone" />`,
            },
            {
              label: 'Fill',
              html: `<span class="inline-flex items-center px-3 py-1 h-7 text-xs font-medium rounded-full bg-[#0043ff] text-white">Label</span>`,
              jsx: `<Badge label="Label" color="Primary" variant="Fill" />`,
            },
            {
              label: 'Outline',
              html: `<span class="inline-flex items-center px-3 py-1 h-7 text-xs font-medium rounded-full border border-[#0043ff] text-[#0043ff]">Label</span>`,
              jsx: `<Badge label="Label" color="Primary" variant="Outline" />`,
            },
            {
              label: 'Semi shape',
              html: `<span class="inline-flex items-center px-3 py-1 h-7 text-xs font-medium rounded-[4px] bg-[#22ad5c]/10 text-[#22ad5c]">Label</span>`,
              jsx: `<Badge label="Label" color="Success" variant="Duo Tone" shape="Semi" />`,
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
