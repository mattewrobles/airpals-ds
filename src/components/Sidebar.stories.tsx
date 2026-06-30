import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { UsageBlock } from '../shared/UsageBlock';
import { Sidebar, SidebarItem } from '../lib/Sidebar';
import type { SidebarItemState, SidebarItemProps, SidebarProps } from '../lib/Sidebar';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-64588';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const TruckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    activeItem: { control: 'text' },
    userName: { control: 'text' },
  },
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `742-64588` (SidebarItem) · `742-64604` (full Sidebar)',
          '',
          '| State | Width |',
          '|-------|-------|',
          '| Expanded | 256px |',
          '| Collapsed | 66px (icon only) |',
          '',
          'SidebarItem states: Default · Selected · Hover',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Sidebar'}
      types={['SidebarItemState', 'SidebarItemProps', 'SidebarNavItem', 'SidebarProps']}
      jsx={`<Sidebar
  activeItem="shipments"
  onItemClick={(id) => setActive(id)}
/>`}
      figmaKey=""
    />
  ),
};

export const Expanded: Story = {
  name: 'Expanded',
  render: () => {
    const [active, setActive] = useState('shipments');
    return (
      <div style={{ height: 600 }}>
        <Sidebar activeItem={active} onItemClick={setActive} />
      </div>
    );
  },
};

export const Collapsed: Story = {
  name: 'Collapsed',
  render: () => {
    const [active, setActive] = useState('shipments');
    return (
      <div style={{ height: 600 }}>
        <Sidebar collapsed activeItem={active} onItemClick={setActive} />
      </div>
    );
  },
};

export const Toggleable: Story = {
  name: 'Toggleable',
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [active, setActive] = useState('shipments');
    return (
      <div style={{ height: 600, display: 'flex' }}>
        <Sidebar
          collapsed={collapsed}
          onCollapseToggle={() => setCollapsed(c => !c)}
          activeItem={active}
          onItemClick={setActive}
        />
        <div className="flex-1 bg-slate-50 p-8">
          <p className="text-sm text-slate-500">Active: <strong>{active}</strong></p>
        </div>
      </div>
    );
  },
};

export const ItemAtom: Story = {
  name: 'SidebarItem atom',
  render: () => (
    <div className="bg-white p-6 font-body space-y-2 w-64">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">States</p>
      {([
        { label: 'Default',  state: 'Default',  icon: <HomeIcon /> },
        { label: 'Selected', state: 'Selected', icon: <TruckIcon /> },
        { label: 'Hover',    state: 'Hover',    icon: <ChartIcon /> },
        { label: 'With badge', state: 'Default', icon: <TruckIcon />, badge: 'BETA' },
      ] as SidebarItemProps[]).map((p, i) => (
        <SidebarItem key={i} {...p} />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-slate-50 p-8 font-body space-y-8 flex flex-row gap-8 items-start">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Expanded</p>
        <div style={{ height: 520 }}>
          <Sidebar activeItem="shipments" />
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Collapsed</p>
        <div style={{ height: 520 }}>
          <Sidebar collapsed activeItem="shipments" />
        </div>
      </div>
    </div>
  ),
};
