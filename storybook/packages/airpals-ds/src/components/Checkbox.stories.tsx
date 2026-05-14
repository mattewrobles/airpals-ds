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

type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';
type CheckboxSize  = 'sm' | 'md' | 'lg';

type CheckboxProps = {
  state?: CheckboxState;
  size?: CheckboxSize;
  disabled?: boolean;
  label?: string;
  onChange?: (next: CheckboxState) => void;
};

const sizeMap: Record<CheckboxSize, { box: string; icon: string; label: string }> = {
  sm: { box: 'w-4 h-4',   icon: 'w-2.5 h-2.5', label: 'text-sm' },
  md: { box: 'w-5 h-5',   icon: 'w-3 h-3',     label: 'text-sm' },
  lg: { box: 'w-6 h-6',   icon: 'w-3.5 h-3.5', label: 'text-base' },
};

function CheckboxIcon({ state, size }: { state: CheckboxState; size: CheckboxSize }) {
  const { icon } = sizeMap[size];
  if (state === 'checked') {
    return (
      <svg className={icon} viewBox="0 0 16 16" fill="none">
        <path d="M3 8l3.5 3.5L13 4" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (state === 'indeterminate') {
    return (
      <svg className={icon} viewBox="0 0 16 16" fill="none">
        <path d="M3.5 8h9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }
  return null;
}

function Checkbox({ state = 'unchecked', size = 'md', disabled = false, label, onChange }: CheckboxProps) {
  const [internalState, setInternalState] = useState<CheckboxState>(state);
  const currentState = onChange ? state : internalState;

  const handleClick = () => {
    if (disabled) return;
    const next: CheckboxState = currentState === 'checked' ? 'unchecked' : 'checked';
    if (onChange) {
      onChange(next);
    } else {
      setInternalState(next);
    }
  };

  const { box, label: labelSize } = sizeMap[size];
  const isActive = currentState === 'checked' || currentState === 'indeterminate';

  const boxClasses = [
    'rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0',
    box,
    disabled
      ? 'border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800 cursor-not-allowed opacity-60'
      : isActive
        ? 'border-brand-blue bg-brand-blue dark:border-brand-blue dark:bg-brand-blue'
        : 'border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-900 hover:border-brand-blue transition-colors',
  ].join(' ');

  return (
    <label
      className={[
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
      onClick={handleClick}
    >
      <span className={boxClasses}>
        <CheckboxIcon state={currentState} size={size} />
      </span>
      {label && (
        <span className={`${labelSize} ${disabled ? 'text-slate-400 dark:text-slate-600' : 'text-brand-navy dark:text-slate-50'}`}>
          {label}
        </span>
      )}
    </label>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    state:    { control: 'select', options: ['unchecked', 'checked', 'indeterminate'], description: 'Visual state of the checkbox' },
    size:     { control: 'select', options: ['sm', 'md', 'lg'], description: 'sm = 16px · md = 20px · lg = 24px' },
    disabled: { control: 'boolean', description: 'Disables interaction and dims the control' },
    label:    { control: 'text', description: 'Optional label rendered to the right' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `3672-29542`',
          '',
          'Custom styled checkbox — rounded-md (not rounded-full). Uses brand-blue fill when checked or indeterminate.',
          '',
          '| State | Border | Background |',
          '|-------|--------|-----------|',
          '| unchecked | `border-slate-300` | `bg-white` |',
          '| checked | `border-brand-blue` | `bg-brand-blue` |',
          '| indeterminate | `border-brand-blue` | `bg-brand-blue` |',
          '| disabled | `border-slate-200` | `bg-slate-100` — opacity 60% |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

/* ── Stories ─────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { state: 'unchecked', size: 'md', label: 'Select carrier' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Unchecked -->
<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-slate-300 bg-white
               dark:border-slate-600 dark:bg-slate-900 flex items-center justify-center">
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">Select carrier</span>
</label>`,
      },
    },
  },
};

export const Checked: Story = {
  args: { state: 'checked', size: 'md', label: 'UPS Ground' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Checked — brand-blue fill + white checkmark -->
<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-brand-blue bg-brand-blue
               flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4" stroke="white" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">UPS Ground</span>
</label>`,
      },
    },
  },
};

export const Indeterminate: Story = {
  args: { state: 'indeterminate', size: 'md', label: 'All shipments (3 of 8 selected)' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Indeterminate — brand-blue fill + white dash -->
<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-brand-blue bg-brand-blue
               flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 8h9" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">All shipments (3 of 8 selected)</span>
</label>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: { state: 'unchecked', size: 'md', disabled: true, label: 'Overnight (not available)' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Disabled -->
<label class="inline-flex items-center gap-2 cursor-not-allowed">
  <span class="w-5 h-5 rounded-md border-2 border-slate-200 bg-slate-100
               dark:border-slate-700 dark:bg-slate-800
               opacity-60 flex items-center justify-center">
  </span>
  <span class="text-sm text-slate-400 dark:text-slate-600">Overnight (not available)</span>
</label>`,
      },
    },
  },
};

export const WithLabel: Story = {
  name: 'With Label',
  args: { state: 'checked', size: 'md', label: 'FedEx Express — estimated 1 business day' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-brand-blue bg-brand-blue
               flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4" stroke="white" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">
    FedEx Express — estimated 1 business day
  </span>
</label>`,
      },
    },
  },
};

export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const sizes: CheckboxSize[] = ['sm', 'md', 'lg'];
    const states: CheckboxState[] = ['unchecked', 'checked', 'indeterminate'];
    const stateLabels: Record<CheckboxState, string> = {
      unchecked:     'Unchecked',
      checked:       'Checked',
      indeterminate: 'Indeterminate',
    };
    const sizeLabels: Record<CheckboxSize, string> = { sm: 'sm (16px)', md: 'md (20px)', lg: 'lg (24px)' };
    return (
      <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-8">
        {/* State × Size grid */}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">States × Sizes</p>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs text-slate-400 pb-3 pr-8 font-medium">State</th>
                  {sizes.map((s) => (
                    <th key={s} className="text-left text-xs text-slate-400 pb-3 pr-8 font-medium">{sizeLabels[s]}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-3">
                {states.map((st) => (
                  <tr key={st}>
                    <td className="text-xs text-slate-500 pr-8 py-2 align-middle whitespace-nowrap">{stateLabels[st]}</td>
                    {sizes.map((sz) => (
                      <td key={sz} className="pr-8 py-2 align-middle">
                        <Checkbox state={st} size={sz} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disabled row */}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Disabled</p>
          <div className="flex items-center gap-6">
            {sizes.map((sz) => (
              <Checkbox key={sz} state="unchecked" size={sz} disabled label={sizeLabels[sz]} />
            ))}
          </div>
        </div>

        {/* With labels */}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">With Labels (interactive)</p>
          <div className="flex flex-col gap-3">
            <Checkbox state="unchecked"     size="md" label="USPS First Class" />
            <Checkbox state="checked"       size="md" label="UPS Ground" />
            <Checkbox state="indeterminate" size="md" label="All shipments (3 of 8 selected)" />
            <Checkbox state="unchecked"     size="md" label="Overnight (not available)" disabled />
          </div>
        </div>

        {/* Code snippets */}
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
          <div className="space-y-3">
            {[
              {
                label: 'Unchecked',
                code: `<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-slate-300 bg-white
               flex items-center justify-center dark:border-slate-600 dark:bg-slate-900">
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">Label</span>
</label>`,
              },
              {
                label: 'Checked',
                code: `<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-brand-blue bg-brand-blue
               flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 16 16" fill="none">
      <path d="M3 8l3.5 3.5L13 4" stroke="white" stroke-width="2.2"
            stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">Label</span>
</label>`,
              },
              {
                label: 'Indeterminate',
                code: `<label class="inline-flex items-center gap-2 cursor-pointer">
  <span class="w-5 h-5 rounded-md border-2 border-brand-blue bg-brand-blue
               flex items-center justify-center">
    <svg class="w-3 h-3" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 8h9" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
    </svg>
  </span>
  <span class="text-sm text-brand-navy dark:text-slate-50">Label</span>
</label>`,
              },
              {
                label: 'Disabled',
                code: `<label class="inline-flex items-center gap-2 cursor-not-allowed">
  <span class="w-5 h-5 rounded-md border-2 border-slate-200 bg-slate-100
               opacity-60 flex items-center justify-center
               dark:border-slate-700 dark:bg-slate-800">
  </span>
  <span class="text-sm text-slate-400">Label</span>
</label>`,
              },
            ].map((s) => (
              <CodeBlock key={s.label} code={s.code} />
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Checkbox — 3 states, 3 sizes, disabled variant -->
<!-- Checked / Indeterminate: border-brand-blue bg-brand-blue + white SVG icon -->
<!-- Unchecked: border-slate-300 bg-white -->
<!-- Disabled: border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed -->`,
      },
    },
  },
};

