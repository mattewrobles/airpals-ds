import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { ClickableLink } from '../lib/ClickableLink';
import type { LinkColor, LinkState, ClickableLinkProps } from '../lib/ClickableLink';

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof ClickableLink> = {
  title: 'Components/Clickable Link',
  component: ClickableLink,
  tags: ['autodocs'],
  argTypes: {
    color:    { control: 'select', options: ['Blue', 'Dark Blue'] },
    state:    { control: 'select', options: ['Default', 'Hover'] },
    label:    { control: 'text' },
    external: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `4e5c28ed2e0dfb47fc837943f3fa38f896fd51db` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '4 variants — `State` (Default/Hover) × `Color` (Blue/Dark Blue).',
          '',
          '| Color | Default | Hover |',
          '|-------|---------|-------|',
          '| Blue | `text-[#0043ff]` | `+ underline` |',
          '| Dark Blue | `text-[#1b306c]` | `text-[#0043ff] + underline` |',
          '',
          'Used inline: table cells, form helper text, body copy links.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof ClickableLink>;

/* ── Stories ─────────────────────────────────────────────── */

export const Blue: Story = { args: { label: 'View shipment details', color: 'Blue' } };
export const DarkBlue: Story = { name: 'Dark Blue', args: { label: 'View shipment details', color: 'Dark Blue' } };
export const BlueHover: Story = { name: 'Blue — Hover', args: { label: 'View shipment details', color: 'Blue', state: 'Hover' } };
export const DarkBlueHover: Story = { name: 'Dark Blue — Hover', args: { label: 'View shipment details', color: 'Dark Blue', state: 'Hover' } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Colors</p>
        <div className="flex flex-col gap-2">
          <ClickableLink label="Blue link — default" color="Blue" />
          <ClickableLink label="Blue link — hover" color="Blue" state="Hover" />
          <ClickableLink label="Dark Blue link — default" color="Dark Blue" />
          <ClickableLink label="Dark Blue link — hover" color="Dark Blue" state="Hover" />
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">In context — table cell</p>
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#e6f1fd] border-b border-slate-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#1b306c]">Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#1b306c]">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#1b306c]">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { order: '#1001', status: 'In Transit' },
                { order: '#1002', status: 'Delivered' },
                { order: '#1003', status: 'Pending' },
              ].map((row) => (
                <tr key={row.order} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3 text-[#1b306c] font-medium">{row.order}</td>
                  <td className="px-4 py-3 text-slate-500">{row.status}</td>
                  <td className="px-4 py-3">
                    <ClickableLink label="View details" color="Blue" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">External link</p>
        <ClickableLink label="FedEx tracking" color="Blue" external />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<!-- Blue -->
<a href="#" class="text-sm font-medium text-[#0043ff] hover:underline transition-colors">
  View shipment details
</a>

<!-- Dark Blue -->
<a href="#" class="text-sm font-medium text-[#1b306c] hover:text-[#0043ff] hover:underline transition-colors">
  View shipment details
</a>`}
          jsx={`<ClickableLink label="View shipment details" color="Blue" />
<ClickableLink label="View shipment details" color="Dark Blue" />`}
        />
      </div>
    </div>
  ),
};
