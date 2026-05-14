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

type RadioSize = 'sm' | 'md';

type RadioProps = {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: RadioSize;
  onChange?: () => void;
};

const sizeMap: Record<RadioSize, { outer: string; inner: string }> = {
  sm: { outer: 'w-4 h-4', inner: 'w-2 h-2' },
  md: { outer: 'w-5 h-5', inner: 'w-2.5 h-2.5' },
};

function Radio({
  checked = false,
  disabled = false,
  label,
  size = 'md',
  onChange,
}: RadioProps) {
  const { outer, inner } = sizeMap[size];

  const outerClass = [
    outer,
    'rounded-full border-2 transition-colors flex items-center justify-center shrink-0',
    disabled
      ? 'border-slate-200 bg-slate-100 opacity-60 cursor-not-allowed'
      : checked
        ? 'border-brand-blue bg-white cursor-pointer'
        : 'border-slate-300 bg-white cursor-pointer hover:border-slate-400',
  ].join(' ');

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={disabled}
      onClick={!disabled ? onChange : undefined}
      className={`inline-flex items-center gap-2.5 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className={outerClass}>
        {checked && !disabled && (
          <span className={`${inner} bg-brand-blue rounded-full`} />
        )}
        {checked && disabled && (
          <span className={`${inner} bg-slate-400 rounded-full`} />
        )}
      </div>
      {label && (
        <span className={`text-sm ${disabled ? 'text-slate-400' : 'text-slate-700 dark:text-slate-300'}`}>
          {label}
        </span>
      )}
    </button>
  );
}

/* ── RadioGroup ──────────────────────────────────────────── */

type RadioOption = { value: string; label: string };

type RadioGroupProps = {
  options: RadioOption[];
  defaultValue?: string;
  size?: RadioSize;
  disabled?: boolean;
};

function RadioGroup({ options, defaultValue, size = 'md', disabled = false }: RadioGroupProps) {
  const [selected, setSelected] = useState<string>(defaultValue ?? options[0]?.value ?? '');

  return (
    <div role="radiogroup" className="flex flex-col gap-3">
      {options.map((opt) => (
        <Radio
          key={opt.value}
          checked={selected === opt.value}
          label={opt.label}
          size={size}
          disabled={disabled}
          onChange={() => setSelected(opt.value)}
        />
      ))}
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    checked:  { control: 'boolean', description: 'Selected state' },
    disabled: { control: 'boolean', description: 'Disabled — applies opacity-60 + gray styles' },
    label:    { control: 'text',    description: 'Optional label text next to the radio' },
    size:     { control: 'select', options: ['sm', 'md'], description: 'sm = 16px · md = 20px (default)' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          'Radio Indicator (visual circle only) and Radio Button (circle + label) from Airpals Figma.',
          '',
          '**States:** unchecked · checked · disabled',
          '',
          '**Sizes:** sm (16px) · md (20px)',
          '',
          'Use `RadioGroup` for mutually exclusive options — only one can be selected at a time.',
          '',
          '**Carrier selection** is the primary use case in Airpals (FedEx, UPS, USPS, etc.).',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Radio>;

/* ── Stories ─────────────────────────────────────────────── */

export const Unchecked: Story = {
  args: { checked: false, size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Radio unchecked -->
<button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>
</button>`,
      },
    },
  },
};

export const Checked: Story = {
  args: { checked: true, size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Radio checked -->
<button type="button" role="radio" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="w-5 h-5 rounded-full border-2 border-brand-blue bg-white flex items-center justify-center">
    <span class="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>
  </div>
</button>`,
      },
    },
  },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Radio disabled -->
<button type="button" role="radio" aria-checked="false" disabled class="inline-flex items-center gap-2.5 cursor-not-allowed">
  <div class="w-5 h-5 rounded-full border-2 border-slate-200 bg-slate-100 opacity-60 flex items-center justify-center"></div>
</button>`,
      },
    },
  },
};

export const WithLabel: Story = {
  name: 'With Label',
  args: { checked: true, label: 'FedEx Ground', size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Radio with label -->
<button type="button" role="radio" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="w-5 h-5 rounded-full border-2 border-brand-blue bg-white flex items-center justify-center">
    <span class="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>
  </div>
  <span class="text-sm text-slate-700">FedEx Ground</span>
</button>`,
      },
    },
  },
};

export const RadioGroupStory: Story = {
  name: 'Radio Group',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Select Carrier</p>
      <RadioGroup
        defaultValue="fedex"
        options={[
          { value: 'fedex', label: 'FedEx Ground' },
          { value: 'ups',   label: 'UPS Standard' },
          { value: 'usps',  label: 'USPS Priority' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Radio group — carrier selection -->
<div role="radiogroup" class="flex flex-col gap-3">

  <!-- FedEx Ground — selected -->
  <button type="button" role="radio" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
    <div class="w-5 h-5 rounded-full border-2 border-brand-blue bg-white flex items-center justify-center">
      <span class="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>
    </div>
    <span class="text-sm text-slate-700">FedEx Ground</span>
  </button>

  <!-- UPS Standard — unselected -->
  <button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
    <div class="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>
    <span class="text-sm text-slate-700">UPS Standard</span>
  </button>

  <!-- USPS Priority — unselected -->
  <button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
    <div class="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>
    <span class="text-sm text-slate-700">USPS Priority</span>
  </button>

</div>`,
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-10">

      {/* State grid */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">States × Sizes</p>
        <div className="grid grid-cols-4 gap-x-10 gap-y-5 items-center max-w-sm">
          <span className="text-[10px] text-slate-400 uppercase tracking-wide"></span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">Unchecked</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">Checked</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">Disabled</span>

          <span className="text-xs text-slate-500">md</span>
          <Radio size="md" checked={false} />
          <Radio size="md" checked={true} />
          <Radio size="md" checked={false} disabled />

          <span className="text-xs text-slate-500">sm</span>
          <Radio size="sm" checked={false} />
          <Radio size="sm" checked={true} />
          <Radio size="sm" checked={false} disabled />
        </div>
      </div>

      {/* With labels */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">With Labels</p>
        <div className="space-y-3">
          <Radio checked={true}  label="FedEx Ground" size="md" />
          <Radio checked={false} label="UPS Standard"  size="md" />
          <Radio checked={false} label="USPS Priority" size="md" disabled />
        </div>
      </div>

      {/* Radio groups */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Radio Groups</p>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-xs text-slate-400 mb-3">Select Carrier</p>
            <RadioGroup
              defaultValue="fedex"
              options={[
                { value: 'fedex', label: 'FedEx Ground' },
                { value: 'ups',   label: 'UPS Standard' },
                { value: 'usps',  label: 'USPS Priority' },
              ]}
            />
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-3">Pickup Window</p>
            <RadioGroup
              defaultValue="morning"
              options={[
                { value: 'morning',   label: 'Morning (8am – 12pm)' },
                { value: 'afternoon', label: 'Afternoon (12pm – 5pm)' },
              ]}
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Code snippets */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Radio unchecked — md',
              code: `<button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>\n</button>`,
            },
            {
              label: 'Radio checked — md',
              code: `<button type="button" role="radio" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="w-5 h-5 rounded-full border-2 border-brand-blue bg-white flex items-center justify-center">\n    <span class="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>\n  </div>\n</button>`,
            },
            {
              label: 'Radio with label',
              code: `<button type="button" role="radio" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="w-5 h-5 rounded-full border-2 border-brand-blue bg-white flex items-center justify-center">\n    <span class="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>\n  </div>\n  <span class="text-sm text-slate-700">FedEx Ground</span>\n</button>`,
            },
            {
              label: 'Radio sm — unchecked',
              code: `<button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="w-4 h-4 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>\n</button>`,
            },
            {
              label: 'Disabled checked',
              code: `<button type="button" role="radio" aria-checked="true" disabled class="inline-flex items-center gap-2.5 cursor-not-allowed">\n  <div class="w-5 h-5 rounded-full border-2 border-slate-200 bg-slate-100 opacity-60 flex items-center justify-center">\n    <span class="w-2.5 h-2.5 bg-slate-400 rounded-full"></span>\n  </div>\n  <span class="text-sm text-slate-400">USPS Priority</span>\n</button>`,
            },
          ].map((s) => (
            <CodeBlock key={s.label} code={s.code} />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Radio group — carrier selection -->
<div role="radiogroup" class="flex flex-col gap-3">
  <button type="button" role="radio" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
    <div class="w-5 h-5 rounded-full border-2 border-brand-blue bg-white flex items-center justify-center">
      <span class="w-2.5 h-2.5 bg-brand-blue rounded-full"></span>
    </div>
    <span class="text-sm text-slate-700">FedEx Ground</span>
  </button>
  <button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
    <div class="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>
    <span class="text-sm text-slate-700">UPS Standard</span>
  </button>
  <button type="button" role="radio" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
    <div class="w-5 h-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center"></div>
    <span class="text-sm text-slate-700">USPS Priority</span>
  </button>
</div>`,
      },
    },
  },
};
