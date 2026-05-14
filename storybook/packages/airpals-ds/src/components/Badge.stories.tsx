import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/* ── Component ───────────────────────────────────────────── */

type BadgeColor = 'Primary' | 'Secondary' | 'Dark' | 'Gray' | 'Light' | 'Warning' | 'Danger' | 'Success' | 'Info';
type BadgeStyle = 'Fill' | 'Outline' | 'Duo Tone';
type BadgeShape = 'Semi' | 'Full';

type BadgeProps = {
  label: string;
  color?: BadgeColor;
  variant?: BadgeStyle;
  shape?: BadgeShape;
};

const colorMap: Record<BadgeColor, { fill: string; outline: string; duo: string }> = {
  Primary:   { fill: 'bg-brand-blue text-white',            outline: 'border border-brand-blue text-brand-blue',              duo: 'bg-brand-blue-light text-brand-blue border border-brand-blue-light' },
  Secondary: { fill: 'bg-brand-pink text-white',            outline: 'border border-brand-pink text-brand-pink',              duo: 'bg-pink-50 text-brand-pink border border-pink-100' },
  Dark:      { fill: 'bg-brand-navy text-white',            outline: 'border border-brand-navy text-brand-navy',              duo: 'bg-brand-blue-light text-brand-navy border border-brand-blue-light' },
  Gray:      { fill: 'bg-slate-500 text-white',             outline: 'border border-slate-400 text-slate-600',                duo: 'bg-slate-100 text-slate-600 border border-slate-200' },
  Light:     { fill: 'bg-slate-200 text-slate-700',         outline: 'border border-slate-300 text-slate-500',                duo: 'bg-slate-50 text-slate-600 border border-slate-200' },
  Warning:   { fill: 'bg-amber-500 text-white',             outline: 'border border-amber-400 text-amber-600',                duo: 'bg-amber-50 text-amber-700 border border-amber-100' },
  Danger:    { fill: 'bg-red-600 text-white',               outline: 'border border-red-500 text-red-600',                   duo: 'bg-red-50 text-red-700 border border-red-100' },
  Success:   { fill: 'bg-green-600 text-white',             outline: 'border border-green-500 text-green-600',               duo: 'bg-green-50 text-green-700 border border-green-100' },
  Info:      { fill: 'bg-brand-electric-blue text-white',   outline: 'border border-brand-electric-blue text-brand-electric-blue', duo: 'bg-blue-50 text-brand-electric-blue border border-blue-100' },
};

function Badge({ label, color = 'Primary', variant = 'Fill', shape = 'Full' }: BadgeProps) {
  const variantKey = variant === 'Duo Tone' ? 'duo' : variant.toLowerCase() as 'fill' | 'outline';
  const cls = colorMap[color][variantKey];
  const radius = shape === 'Full' ? 'rounded-full' : 'rounded-md';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${radius} ${cls}`}>
      {label}
    </span>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    color:   { control: 'select', options: ['Primary', 'Secondary', 'Dark', 'Gray', 'Light', 'Warning', 'Danger', 'Success', 'Info'] },
    variant: { control: 'select', options: ['Fill', 'Outline', 'Duo Tone'] },
    shape:   { control: 'select', options: ['Semi', 'Full'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Airpals badges. Figma Component Set key: `9469c69590accb9b16f66d63f681e74646d930d5`. 54 variants: 9 colors × 3 styles × 2 shapes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

/* ── Stories ─────────────────────────────────────────────── */

export const Default: Story = { args: { label: 'In Transit', color: 'Info' } };
export const Delivered: Story = { args: { label: 'Delivered', color: 'Success', variant: 'Duo Tone' } };
export const Failed: Story = { args: { label: 'Failed', color: 'Danger', variant: 'Duo Tone' } };
export const Pending: Story = { args: { label: 'Pending', color: 'Warning', variant: 'Duo Tone' } };

export const ShipmentStatuses: Story = {
  name: 'Shipment Status Badges',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body min-h-screen space-y-10">
      <div>
        <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">Shipment Status (Duo Tone)</h2>
        <div className="flex flex-wrap gap-2">
          <Badge label="Delivered" color="Success" variant="Duo Tone" />
          <Badge label="In Transit" color="Info" variant="Duo Tone" />
          <Badge label="Pending Pickup" color="Warning" variant="Duo Tone" />
          <Badge label="Failed" color="Danger" variant="Duo Tone" />
          <Badge label="Cancelled" color="Gray" variant="Duo Tone" />
          <Badge label="Label Created" color="Light" variant="Duo Tone" />
        </div>
      </div>

      <div>
        <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">All Colors — Fill</h2>
        <div className="flex flex-wrap gap-2">
          {(['Primary', 'Secondary', 'Dark', 'Gray', 'Light', 'Warning', 'Danger', 'Success', 'Info'] as const).map((c) => (
            <Badge key={c} label={c} color={c} variant="Fill" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">All Colors — Outline</h2>
        <div className="flex flex-wrap gap-2">
          {(['Primary', 'Secondary', 'Dark', 'Gray', 'Light', 'Warning', 'Danger', 'Success', 'Info'] as const).map((c) => (
            <Badge key={c} label={c} color={c} variant="Outline" />
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-heading text-xl font-semibold text-brand-navy dark:text-slate-50 mb-4">Semi vs Full Rounded</h2>
        <div className="flex flex-wrap gap-2">
          <Badge label="rounded-md" color="Primary" variant="Fill" shape="Semi" />
          <Badge label="rounded-full" color="Primary" variant="Fill" shape="Full" />
        </div>
      </div>
    </div>
  ),
};
