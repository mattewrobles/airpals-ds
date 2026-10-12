import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { UsageBlock } from '../shared/UsageBlock';
import { SlideOverPanel } from '../lib/SlideOverPanel';
import { Button } from '../lib/Button';
import { Input } from '../lib/Input';

const meta: Meta<typeof SlideOverPanel> = {
  title: 'Components/SlideOverPanel',
  component: SlideOverPanel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Right-side panel (max 440px) for editing flows like billing address or card. Any close path (X, Esc, backdrop, Cancel) asks "Discard your changes?" when `dirty` is true.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SlideOverPanel>;

export const Usage: Story = {
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component="SlideOverPanel"
      types={['SlideOverPanelProps']}
      jsx={`<SlideOverPanel
  open={open}
  title="Billing address"
  dirty={dirty}
  canSave={valid}
  saveHint="Fill every required field"
  onClose={() => setOpen(false)}
  onSave={save}
>
  {/* form fields */}
</SlideOverPanel>`}
    />
  ),
};

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    return (
      <div className="p-8">
        <Button label="Open panel" variant="primary" onClick={() => setOpen(true)} />
        <SlideOverPanel
          open={open}
          title="Billing address"
          subtitle="Used on every invoice"
          dirty={name.length > 0}
          canSave={name.length > 2}
          saveHint="Enter a company name"
          onClose={() => { setOpen(false); setName(''); }}
          onSave={() => { setOpen(false); setName(''); }}
        >
          <Input label="Company name" value={name} onChange={setName} />
        </SlideOverPanel>
      </div>
    );
  },
};
