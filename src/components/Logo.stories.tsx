import type { Meta, StoryObj } from '@storybook/react';
import { UsageBlock } from '../shared/UsageBlock';
import React from 'react';
import { Logo } from '../lib/Logo';

const meta: Meta<typeof Logo> = {
  title: 'Brand/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          '## Airpals Logo',
          '',
          'Official Airpals logo in 2 orientations × 3 color variants.',
          '',
          '| Orientation | When to use |',
          '|-------------|-------------|',
          '| `horizontal` | Default — navbar, headers, marketing |',
          '| `symbol` | Favicon, avatar, compact spaces |',
          '',
          '| Color | When to use |',
          '|-------|-------------|',
          '| `original` | Light backgrounds (default) |',
          '| `dark-blue` | Monochrome / print / dark accent bg |',
          '| `white` | Dark/navy backgrounds |',
          '',
          'Figma key (component set): `1299097f3692a6cd9adf26dc7647eeeb484a9b20`',
        ].join('\n'),
      },
    },
  },
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'symbol'] },
    color: { control: 'select', options: ['original', 'dark-blue', 'white'] },
    height: { control: { type: 'number', min: 16, max: 80 } },
  },
};
export default meta;
type Story = StoryObj<typeof Logo>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Logo'}
      types={['LogoOrientation', 'LogoColor', 'LogoProps']}
      jsx={`<Logo />
<Logo orientation="symbol" />
<Logo color="dark-blue" />`}
      figmaKey="1299097f3692a6cd9adf26dc7647eeeb484a9b20"
    />
  ),
};

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    color: 'original',
    height: 30,
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-col gap-0 font-body">
      {/* Light bg */}
      <div className="bg-white p-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-6">On white</p>
        <div className="flex items-center gap-10 flex-wrap">
          <div className="flex flex-col items-start gap-1.5">
            <Logo orientation="horizontal" color="original" height={30} />
            <span className="text-xs text-slate-400 font-mono">original</span>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Logo orientation="horizontal" color="dark-blue" height={30} />
            <span className="text-xs text-slate-400 font-mono">dark-blue</span>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Logo orientation="symbol" color="original" height={30} />
            <span className="text-xs text-slate-400 font-mono">symbol · original</span>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Logo orientation="symbol" color="dark-blue" height={30} />
            <span className="text-xs text-slate-400 font-mono">symbol · dark-blue</span>
          </div>
        </div>
      </div>

      {/* Dark bg */}
      <div className="bg-[#1b306c] p-8">
        <p className="text-xs font-medium text-white/40 uppercase tracking-wide mb-6">On navy</p>
        <div className="flex items-center gap-10 flex-wrap">
          <div className="flex flex-col items-start gap-1.5">
            <Logo orientation="horizontal" color="white" height={30} />
            <span className="text-xs text-white/40 font-mono">white</span>
          </div>
          <div className="flex flex-col items-start gap-1.5">
            <Logo orientation="symbol" color="white" height={30} />
            <span className="text-xs text-white/40 font-mono">symbol · white</span>
          </div>
        </div>
      </div>

      {/* Size scale */}
      <div className="bg-white p-8">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-6">Size scale</p>
        <div className="flex items-end gap-8 flex-wrap">
          {[20, 24, 30, 40, 52].map((h) => (
            <div key={h} className="flex flex-col items-start gap-1.5">
              <Logo orientation="horizontal" color="original" height={h} />
              <span className="text-xs text-slate-400 font-mono">{h}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Symbol: Story = {
  args: {
    orientation: 'symbol',
    color: 'original',
    height: 40,
  },
};
