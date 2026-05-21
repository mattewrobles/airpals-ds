import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Toggle } from '../lib/Toggle';
import type { ToggleStyle, ToggleProps } from '../lib/Toggle';

/* Local helper — stateful toggle with label */
function ToggleWithLabel({ labelOff, labelOn }: { labelOff: string; labelOn: string }) {
  const [on, setOn] = useState(false);
  return (
    <div className="inline-flex items-center gap-3">
      <Toggle style="Navy" active={on} onToggle={() => setOn(v => !v)} />
      <span className="text-sm font-medium text-[#1b306c]">{on ? labelOn : labelOff}</span>
    </div>
  );
}

/* ── Meta ────────────────────────────────────────────────── */

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=625-3651';

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
    style:  { control: 'select', options: ['Standard', 'Navy', 'Subtle'], description: 'Visual style' },
    label:  { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `625-3651` · File `3oMpon9bh8T8d0hFQt7l2g`',
          '',
          'Toggle switch — 9 visual styles, 55×32px track, 28×28px knob.',
          '',
          '| Style | OFF track | ON track | Knob |',
          '|-------|-----------|----------|------|',
          '| Standard | `#e5e7eb` | `#e5e7eb` | white→`#0043ff` |',
          '| Navy (recommended) | `#1b306c` | `#0043ff` | white |',
          '| Subtle | `#eaeefb` | `#eaeefb` | white→`#0043ff` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Toggle'}
      types={['ToggleStyle', 'ToggleProps']}
      jsx={`<Toggle label="Dark mode" />`}
      figmaKey="4188d5d41c0cf2e87430bf735c7b2066a50b25fb"
    />
  ),
};

/* ── Stories ─────────────────────────────────────────────── */

export const NavyOff: Story = {
  name: 'Navy — OFF',
  args: { style: 'Navy', active: false },
};

export const NavyOn: Story = {
  name: 'Navy — ON',
  args: { style: 'Navy', active: true },
};

export const StandardStyle: Story = {
  name: 'Standard Style',
  args: { style: 'Standard', active: false },
};

export const WithTextLabel: Story = {
  name: 'With Text Label',
  render: () => <ToggleWithLabel labelOff="Auto Saver Off" labelOn="Auto Saver On" />,
};

export const AllStyles: Story = {
  name: 'All Styles',
  render: () => (
    <div className="bg-white p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">Toggle Styles</p>
        <div className="space-y-4">
          {(['Navy', 'Standard', 'Subtle'] as const).map(s => (
            <div key={s} className="flex items-center gap-8">
              <span className="text-xs text-slate-500 w-20">{s}</span>
              <Toggle style={s} active={false} />
              <Toggle style={s} active={true} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4">With Label</p>
        <ToggleWithLabel labelOff="Auto Saver Off" labelOn="Auto Saver On" />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code Snippets</p>
        <div className="space-y-3">
          {[
            {
              label: 'Navy — OFF',
              html: `<button role="switch" aria-checked="false"
  class="relative w-[55px] h-8 rounded-full bg-[#1b306c]">
  <span class="absolute top-0.5 translate-x-0.5 w-7 h-7 rounded-full bg-white shadow"></span>
</button>`,
              jsx: `<Toggle style="Navy" active={false} />`,
            },
            {
              label: 'Navy — ON',
              html: `<button role="switch" aria-checked="true"
  class="relative w-[55px] h-8 rounded-full bg-[#0043ff]">
  <span class="absolute top-0.5 translate-x-[27px] w-7 h-7 rounded-full bg-white shadow"></span>
</button>`,
              jsx: `<Toggle style="Navy" active={true} />`,
            },
            {
              label: 'Standard — OFF / ON',
              html: `<!-- OFF -->
<button class="relative w-[55px] h-8 rounded-full bg-[#e5e7eb]">
  <span class="absolute top-0.5 translate-x-0.5 w-7 h-7 rounded-full bg-white shadow"></span>
</button>
<!-- ON -->
<button class="relative w-[55px] h-8 rounded-full bg-[#e5e7eb]">
  <span class="absolute top-0.5 translate-x-[27px] w-7 h-7 rounded-full bg-[#0043ff] shadow"></span>
</button>`,
              jsx: `<Toggle style="Standard" active={false} />
<Toggle style="Standard" active={true} />`,
            },
            {
              label: 'With Text Label',
              html: `<div class="inline-flex items-center gap-3">
  <button role="switch" aria-checked="true"
    class="relative w-[50px] h-[26px] rounded-full bg-[#0043ff]">
    <span class="absolute top-1 translate-x-[27px] w-[18px] h-[18px] rounded-full bg-white shadow"></span>
  </button>
  <span class="text-sm font-medium text-[#1b306c]">Auto Saver On</span>
</div>`,
              jsx: `<ToggleWithLabel labelOff="Auto Saver Off" labelOn="Auto Saver On" />`,
            },
          ].map(s => (
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
