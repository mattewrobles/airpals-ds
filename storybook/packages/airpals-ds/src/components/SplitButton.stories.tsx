import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';

/* ── Component ───────────────────────────────────────────── */
/*
  Figma specs (file 3oMpon9bh8T8d0hFQt7l2g):
  key: ccd1ef4b71562bc9f214b6bbe7c75f0d5fff4be2
  24 variants — Size: XS/S/M/L × Type: Primary/Secondary/Info/Success/Warning/Danger
  Left part: main action button
  Right part: chevron dropdown trigger — 1px separator
  Types match semantic color system (same as badges)
*/

type SplitButtonSize = 'XS' | 'S' | 'M' | 'L';
type SplitButtonType = 'Primary' | 'Secondary' | 'Info' | 'Success' | 'Warning' | 'Danger';

type SplitButtonProps = {
  label?: string;
  size?: SplitButtonSize;
  type?: SplitButtonType;
  disabled?: boolean;
  onClick?: () => void;
  options?: string[];
};

const CHEVRON_DOWN = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type ColorTokens = {
  main: string;
  divider: string;
  hover: string;
  text: string;
};

const typeTokens: Record<SplitButtonType, ColorTokens> = {
  Primary:   { main: 'bg-[#0043ff]',  divider: 'bg-blue-500',   hover: 'hover:bg-blue-700',  text: 'text-white' },
  Secondary: { main: 'bg-[#e6f1fd]',  divider: 'bg-blue-200',   hover: 'hover:bg-blue-200',  text: 'text-[#0043ff]' },
  Info:      { main: 'bg-[#00a0ff]',  divider: 'bg-sky-400',    hover: 'hover:bg-sky-600',   text: 'text-white' },
  Success:   { main: 'bg-[#22ad5c]',  divider: 'bg-green-500',  hover: 'hover:bg-green-700', text: 'text-white' },
  Warning:   { main: 'bg-[#f59e0b]',  divider: 'bg-amber-400',  hover: 'hover:bg-amber-600', text: 'text-white' },
  Danger:    { main: 'bg-[#ef4444]',  divider: 'bg-red-400',    hover: 'hover:bg-red-600',   text: 'text-white' },
};

const sizeTokens: Record<SplitButtonSize, { px: string; py: string; text: string; chevronPx: string }> = {
  XS: { px: 'px-2',   py: 'py-1',   text: 'text-xs',  chevronPx: 'px-1.5' },
  S:  { px: 'px-3',   py: 'py-1.5', text: 'text-sm',  chevronPx: 'px-2' },
  M:  { px: 'px-4',   py: 'py-2',   text: 'text-sm',  chevronPx: 'px-2.5' },
  L:  { px: 'px-5',   py: 'py-2.5', text: 'text-base', chevronPx: 'px-3' },
};

function SplitButton({
  label = 'Action',
  size = 'M',
  type = 'Primary',
  disabled = false,
  onClick,
  options = ['Edit', 'Duplicate', 'Archive', 'Delete'],
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const { main, divider, hover, text } = typeTokens[type];
  const { px, py, text: textSize, chevronPx } = sizeTokens[size];
  const disabledClass = disabled ? 'opacity-40 cursor-not-allowed' : '';

  return (
    <div className="relative inline-flex font-body">
      <button
        disabled={disabled}
        onClick={onClick}
        className={`${px} ${py} ${textSize} font-medium ${main} ${text} ${!disabled ? hover : ''} ${disabledClass} rounded-l-lg transition-colors`}
      >
        {label}
      </button>
      <span className={`w-px self-stretch ${divider} opacity-40`} />
      <button
        disabled={disabled}
        onClick={() => !disabled && setOpen((v) => !v)}
        className={`${chevronPx} ${py} ${main} ${text} ${!disabled ? hover : ''} ${disabledClass} rounded-r-lg transition-colors`}
        aria-label="More options"
      >
        {CHEVRON_DOWN}
      </button>

      {open && !disabled && (
        <div className="absolute top-full left-0 mt-1 min-w-[140px] bg-white border border-slate-200 rounded-lg shadow-md z-10 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setOpen(false)}
              className="w-full text-left px-3 py-2 text-sm text-[#1b306c] hover:bg-[#e6f1fd] transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=686-680';

const meta: Meta<typeof SplitButton> = {
  title: 'Components/Split Button',
  component: SplitButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['XS', 'S', 'M', 'L'] },
    type: { control: 'select', options: ['Primary', 'Secondary', 'Info', 'Success', 'Warning', 'Danger'] },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma key:** `ccd1ef4b71562bc9f214b6bbe7c75f0d5fff4be2` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          '24 variants — `Size` (XS/S/M/L) × `Type` (Primary/Secondary/Info/Success/Warning/Danger).',
          '',
          'Left = main action. Right = chevron that opens a dropdown. Divided by a 1px separator.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SplitButton>;

/* ── Stories ─────────────────────────────────────────────── */

export const Primary: Story = { args: { label: 'New Shipment', type: 'Primary', size: 'M' } };
export const Secondary: Story = { args: { label: 'New Shipment', type: 'Secondary', size: 'M' } };
export const Success: Story = { args: { label: 'Confirm', type: 'Success', size: 'M' } };
export const Warning: Story = { args: { label: 'Review', type: 'Warning', size: 'M' } };
export const Danger: Story = { args: { label: 'Delete', type: 'Danger', size: 'M' } };
export const Disabled: Story = { args: { label: 'New Shipment', type: 'Primary', size: 'M', disabled: true } };

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Types — Size M</p>
        <div className="flex flex-wrap gap-3">
          {(['Primary', 'Secondary', 'Info', 'Success', 'Warning', 'Danger'] as const).map((t) => (
            <SplitButton key={t} label={t} type={t} size="M" />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Sizes — Primary</p>
        <div className="flex items-center gap-3">
          {(['XS', 'S', 'M', 'L'] as const).map((s) => (
            <SplitButton key={s} label={s} type="Primary" size={s} />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Disabled state</p>
        <div className="flex flex-wrap gap-3">
          {(['Primary', 'Success', 'Danger'] as const).map((t) => (
            <SplitButton key={t} label={t} type={t} size="M" disabled />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippet</p>
        <CodeBlock
          code={`<div class="relative inline-flex">
  <button class="px-4 py-2 text-sm font-medium bg-[#0043ff] text-white hover:bg-blue-700 rounded-l-lg">
    New Shipment
  </button>
  <span class="w-px self-stretch bg-blue-500 opacity-40"></span>
  <button class="px-2.5 py-2 bg-[#0043ff] text-white hover:bg-blue-700 rounded-r-lg">
    <!-- chevron icon -->
  </button>
</div>`}
          jsx={`<SplitButton label="New Shipment" type="Primary" size="M" />`}
        />
      </div>
    </div>
  ),
};
