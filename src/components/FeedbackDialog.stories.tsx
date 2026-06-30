import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { FeedbackDialog } from '../lib/FeedbackDialog';
import type { FeedbackDialogProps } from '../lib/FeedbackDialog';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=741-40257';

const meta: Meta<typeof FeedbackDialog> = {
  title: 'Components/FeedbackDialog',
  component: FeedbackDialog,
  tags: ['autodocs'],
  argTypes: {
    title:           { control: 'text' },
    description:     { control: 'text' },
    primaryLabel:    { control: 'text' },
    secondaryLabel:  { control: 'text' },
    showImage:       { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showFooter:      { control: 'boolean' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `741-40257`',
          '',
          'Modal dialog for collecting feedback. Width: 420px.',
          '',
          'Sections: header (title + close) · image slot · input slot · description · footer (secondary + primary).',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof FeedbackDialog>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'FeedbackDialog'}
      types={['FeedbackDialogProps']}
      jsx={`<FeedbackDialog
  title="How was your shipment?"
  description="Your feedback helps us improve."
  primaryLabel="Submit"
  secondaryLabel="Skip"
/>`}
      figmaKey=""
    />
  ),
};

export const Default: Story = {
  args: {
    title: 'How was your shipment?',
    description: 'Your feedback helps us improve our service.',
    primaryLabel: 'Submit',
    secondaryLabel: 'Skip',
  },
};

export const NoImage: Story = {
  name: 'No Image',
  args: {
    title: 'Rate this feature',
    description: 'Tell us what you think about multi-carrier shipping.',
    primaryLabel: 'Send',
    secondaryLabel: 'Not now',
    showImage: false,
  },
};

export const NoDescription: Story = {
  name: 'No Description',
  args: {
    title: 'Quick feedback?',
    primaryLabel: 'Submit',
    secondaryLabel: 'Cancel',
    showDescription: false,
  },
};

export const WithCustomInput: Story = {
  name: 'With Input Slot',
  args: {
    title: 'Tell us more',
    showDescription: false,
    primaryLabel: 'Send feedback',
    secondaryLabel: 'Skip',
    inputSlot: (
      <textarea
        placeholder="What could we improve?"
        className="w-full border border-slate-200 rounded-lg p-3 text-sm text-slate-600 resize-none h-24"
      />
    ),
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-slate-50 p-8 font-body space-y-8 flex flex-col items-start">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Default</p>
        <FeedbackDialog title="How was your shipment?" description="Your feedback helps us improve." primaryLabel="Submit" secondaryLabel="Skip" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">No image</p>
        <FeedbackDialog title="Rate this feature" showImage={false} primaryLabel="Send" secondaryLabel="Not now" />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<dialog class="w-[420px] bg-white rounded-lg shadow-lg p-6">
  <header class="flex justify-between items-center mb-4">
    <h3 class="font-semibold text-[#1b306c]">How was your shipment?</h3>
    <button aria-label="Close">×</button>
  </header>
  <!-- image slot, input slot, description -->
  <footer class="flex gap-3 mt-4">
    <button class="btn-secondary flex-1">Skip</button>
    <button class="btn-primary flex-1">Submit</button>
  </footer>
</dialog>`}
          jsx={`<FeedbackDialog
  title="How was your shipment?"
  primaryLabel="Submit"
  secondaryLabel="Skip"
/>`}
        />
      </div>
    </div>
  ),
};
