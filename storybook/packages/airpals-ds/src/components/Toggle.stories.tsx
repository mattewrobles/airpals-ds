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

type ToggleSize = 'sm' | 'md';

type ToggleProps = {
  checked?: boolean;
  disabled?: boolean;
  size?: ToggleSize;
  label?: string;
  labelOff?: string;
  labelOn?: string;
  onChange?: (checked: boolean) => void;
};

const sizeMap: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: { track: 'w-8 h-4',  thumb: 'w-3 h-3',  translate: 'translate-x-4' },
  md: { track: 'w-11 h-6', thumb: 'w-5 h-5',  translate: 'translate-x-5' },
};

function Toggle({
  checked: initialChecked = false,
  disabled = false,
  size = 'md',
  label,
  labelOff,
  labelOn,
  onChange,
}: ToggleProps) {
  const [isOn, setIsOn] = useState(initialChecked);
  const { track, thumb, translate } = sizeMap[size];

  const handleClick = () => {
    if (disabled) return;
    const next = !isOn;
    setIsOn(next);
    onChange?.(next);
  };

  const isTextSwitch = labelOff !== undefined && labelOn !== undefined;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center gap-2.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {/* Track */}
      <div
        className={`relative ${track} rounded-full transition-colors duration-200 ${
          isOn ? 'bg-brand-blue' : 'bg-slate-200 dark:bg-slate-600'
        }`}
      >
        {/* Thumb */}
        <span
          className={`absolute top-0.5 left-0.5 ${thumb} rounded-full bg-white shadow transition-transform duration-200 ${
            isOn ? translate : 'translate-x-0'
          }`}
        />
      </div>

      {/* Label */}
      {isTextSwitch ? (
        <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
          {isOn ? labelOn : labelOff}
        </span>
      ) : label ? (
        <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      ) : null}
    </button>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/QCicLCNGhyV9aJrUHZ6C44/Airpals---MVP-WIP?node-id=3672-29542';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    checked:  { control: 'boolean', description: 'Initial checked state (controlled internally with useState)' },
    disabled: { control: 'boolean', description: 'Disables interaction — applies opacity-50 + cursor-not-allowed' },
    size:     { control: 'select', options: ['sm', 'md'], description: 'sm = w-8 h-4 · md = w-11 h-6 (default)' },
    label:    { control: 'text', description: 'Static label shown next to the toggle' },
    labelOff: { control: 'text', description: 'Label text when toggle is OFF (text-switch variant)' },
    labelOn:  { control: 'text', description: 'Label text when toggle is ON (text-switch variant)' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          'Two toggle styles from Airpals Figma:',
          '',
          '- **Simple switch** — track + thumb, optional static label',
          '- **Text switch** — label text changes between `labelOff` and `labelOn` states',
          '',
          'State is managed internally via `useState`. Pass `checked` as the initial value.',
          '',
          'Colors: OFF = `bg-slate-200` · ON = `bg-brand-blue`.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

/* ── Stories ─────────────────────────────────────────────── */

export const Off: Story = {
  args: { checked: false, size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Toggle OFF -->
<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full transition-colors bg-slate-200">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform translate-x-0"></span>
  </div>
</button>`,
      },
    },
  },
};

export const On: Story = {
  args: { checked: true, size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Toggle ON -->
<button type="button" role="switch" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full transition-colors bg-brand-blue">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform translate-x-5"></span>
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
        code: `<!-- Toggle Disabled -->
<button type="button" role="switch" aria-checked="false" disabled class="inline-flex items-center gap-2.5 opacity-50 cursor-not-allowed">
  <div class="relative w-11 h-6 rounded-full bg-slate-200">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-0"></span>
  </div>
</button>`,
      },
    },
  },
};

export const WithLabel: Story = {
  name: 'With Label',
  args: { checked: false, label: 'Auto Saver', size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Toggle with label -->
<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full transition-colors bg-slate-200">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform translate-x-0"></span>
  </div>
  <span class="text-sm text-slate-700 font-normal">Auto Saver</span>
</button>`,
      },
    },
  },
};

export const TextSwitch: Story = {
  name: 'Text Switch',
  args: { checked: false, labelOff: 'Light mode', labelOn: 'Dark mode', size: 'md' },
  parameters: {
    docs: {
      source: {
        language: 'html',
        code: `<!-- Text switch variant — label changes with state -->
<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full transition-colors bg-slate-200">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform translate-x-0"></span>
  </div>
  <span class="text-sm text-slate-700 font-medium">Light mode</span>
</button>

<!-- ON state -->
<button type="button" role="switch" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full transition-colors bg-brand-blue">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform translate-x-5"></span>
  </div>
  <span class="text-sm text-slate-700 font-medium">Dark mode</span>
</button>`,
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-white dark:bg-slate-900 p-8 font-body space-y-10">

      {/* Size × State grid */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Size × State</p>
        <div className="grid grid-cols-3 gap-x-10 gap-y-5 items-center max-w-xs">
          {/* Header row */}
          <span className="text-[10px] text-slate-400 uppercase tracking-wide"></span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">OFF</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wide">ON</span>

          {/* md */}
          <span className="text-xs text-slate-500">md</span>
          <Toggle size="md" checked={false} />
          <Toggle size="md" checked={true} />

          {/* sm */}
          <span className="text-xs text-slate-500">sm</span>
          <Toggle size="sm" checked={false} />
          <Toggle size="sm" checked={true} />

          {/* disabled */}
          <span className="text-xs text-slate-500">disabled</span>
          <Toggle size="md" checked={false} disabled />
          <Toggle size="md" checked={true} disabled />
        </div>
      </div>

      {/* With labels */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">With Labels</p>
        <div className="space-y-4">
          <Toggle size="md" checked={false} label="Auto Saver" />
          <Toggle size="md" checked={true}  label="Auto Saver" />
          <Toggle size="sm" checked={false} label="Notifications" />
        </div>
      </div>

      {/* Text switch */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Text Switch</p>
        <div className="space-y-4">
          <Toggle size="md" checked={false} labelOff="Light mode" labelOn="Dark mode" />
          <Toggle size="md" checked={true}  labelOff="Light mode" labelOn="Dark mode" />
          <Toggle size="md" checked={false} labelOff="Standard"   labelOn="Express" />
        </div>
      </div>

      {/* Code snippets */}
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Toggle OFF — md',
              code: `<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="relative w-11 h-6 rounded-full bg-slate-200">\n    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-0 transition-transform"></span>\n  </div>\n</button>`,
            },
            {
              label: 'Toggle ON — md',
              code: `<button type="button" role="switch" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="relative w-11 h-6 rounded-full bg-brand-blue">\n    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-5 transition-transform"></span>\n  </div>\n</button>`,
            },
            {
              label: 'Toggle sm — OFF',
              code: `<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="relative w-8 h-4 rounded-full bg-slate-200">\n    <span class="absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow translate-x-0 transition-transform"></span>\n  </div>\n</button>`,
            },
            {
              label: 'With label',
              code: `<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">\n  <div class="relative w-11 h-6 rounded-full bg-slate-200">\n    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-0 transition-transform"></span>\n  </div>\n  <span class="text-sm text-slate-700">Auto Saver</span>\n</button>`,
            },
            {
              label: 'Disabled',
              code: `<button type="button" role="switch" aria-checked="false" disabled class="inline-flex items-center gap-2.5 opacity-50 cursor-not-allowed">\n  <div class="relative w-11 h-6 rounded-full bg-slate-200">\n    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-0"></span>\n  </div>\n</button>`,
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
        code: `<!-- Simple toggle — OFF / ON / Disabled -->
<button type="button" role="switch" aria-checked="false" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full bg-slate-200">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-0 transition-transform"></span>
  </div>
</button>

<button type="button" role="switch" aria-checked="true" class="inline-flex items-center gap-2.5 cursor-pointer">
  <div class="relative w-11 h-6 rounded-full bg-brand-blue">
    <span class="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow translate-x-5 transition-transform"></span>
  </div>
</button>`,
      },
    },
  },
};
