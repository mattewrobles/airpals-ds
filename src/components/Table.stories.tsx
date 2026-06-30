import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { CodeBlock } from '../shared/CodeBlock';
import { UsageBlock } from '../shared/UsageBlock';
import { Table } from '../lib/Table';
import { TableHeader } from '../lib/TableHeader';
import { TableCell } from '../lib/TableCell';
import type { TableProps, TableColumnDef, TableRowData } from '../lib/Table';
import type { TableHeaderSize, TableHeaderType, TableHeaderProps } from '../lib/TableHeader';
import type { TableCellType, TableCellState, TableCellProps } from '../lib/TableCell';

const FIGMA_URL = 'https://www.figma.com/design/3oMpon9bh8T8d0hFQt7l2g/Airpals-Design-system?node-id=742-64015';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    design: { type: 'figma', url: FIGMA_URL },
    docs: {
      description: {
        component: [
          '**Figma node:** `742-64015` — column-first data table.',
          '',
          'Built from `TableHeader` + `TableCell` atoms. Column-first layout (each column = header + cells).',
          '',
          '| Element | Style |',
          '|---------|-------|',
          '| Container | `bg-white rounded-lg shadow-xs` |',
          '| Header active | `border-b 2px navy` |',
          '| Cell hover | `bg-[#f3f4f6]` |',
          '| Cell selected | `bg-[#e6f1fd]` |',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Table>;

const COLUMNS: TableColumnDef[] = [
  { key: 'id',      label: 'Order',    width: 100 },
  { key: 'carrier', label: 'Carrier',  width: 120 },
  { key: 'status',  label: 'Status',   width: 120 },
  { key: 'weight',  label: 'Weight',   width: 100, align: 'right' },
  { key: 'cost',    label: 'Cost',     width: 100, align: 'right' },
];

const ROWS: TableRowData[] = [
  { id: '#1042', carrier: 'FedEx',  status: { text: 'Delivered',  badge: { label: 'Delivered', bg: '#f0fdf4', color: '#22ad5c' } }, weight: '2.4 lbs', cost: '$14.50' },
  { id: '#1041', carrier: 'UPS',    status: { text: 'In Transit', badge: { label: 'In Transit', bg: '#eff6ff', color: '#0043ff' } }, weight: '0.8 lbs', cost: '$9.90' },
  { id: '#1040', carrier: 'USPS',   status: { text: 'Processing', badge: { label: 'Processing', bg: '#fffbeb', color: '#d97706' } }, weight: '5.1 lbs', cost: '$7.20' },
  { id: '#1039', carrier: 'FedEx',  status: { text: 'Delivered',  badge: { label: 'Delivered', bg: '#f0fdf4', color: '#22ad5c' } }, weight: '1.2 lbs', cost: '$12.00' },
];

export const Usage: Story = {
  name: 'Usage',
  parameters: { controls: { disable: true }, docs: { canvas: { sourceState: 'none' } } },
  render: () => (
    <UsageBlock
      component={'Table'}
      types={['TableColumnDef', 'TableCellData', 'TableRowData', 'TableProps']}
      jsx={`<Table
  columns={[
    { key: 'id',      label: 'Order',   width: 100 },
    { key: 'carrier', label: 'Carrier', width: 120 },
    { key: 'status',  label: 'Status',  width: 120 },
  ]}
  rows={[
    { id: '#1042', carrier: 'FedEx', status: { text: 'Delivered', badge: { label: 'Delivered', bg: '#f0fdf4', color: '#22ad5c' } } },
  ]}
/>`}
      figmaKey=""
    />
  ),
};

export const Default: Story = {
  render: () => <Table columns={COLUMNS} rows={ROWS} />,
};

export const Minimal: Story = {
  name: 'Minimal (2 columns)',
  render: () => (
    <Table
      columns={[
        { key: 'id',      label: 'Order',   width: 120 },
        { key: 'carrier', label: 'Carrier', width: 140 },
      ]}
      rows={ROWS.slice(0, 3)}
    />
  ),
};

export const HeaderAtom: Story = {
  name: 'TableHeader atom',
  render: () => (
    <div className="bg-white p-8 font-body space-y-4">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">TableHeader variants</p>
      <div className="flex gap-2 flex-wrap">
        {([
          { label: 'Order', size: 'Large', type: 'Text', active: true },
          { label: 'Cost',  size: 'Large', type: 'Number', active: false },
          { label: '',      size: 'Small', type: 'Empty', active: false },
          { label: 'Carrier', size: 'Small', type: 'Text', active: false, showSort: true },
          { label: 'Status',  size: 'Large', type: 'Text', active: true,  showFilter: true },
        ] as TableHeaderProps[]).map((p, i) => (
          <TableHeader key={i} {...p} width={140} />
        ))}
      </div>
    </div>
  ),
};

export const CellAtom: Story = {
  name: 'TableCell atom',
  render: () => (
    <div className="bg-white p-8 font-body space-y-2">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">TableCell types</p>
      {([
        { type: 'text',         text: 'FedEx Ground' },
        { type: 'text-subtext', text: '#1042', subtext: '2 items' },
        { type: 'link',         text: 'View details', href: '#' },
        { type: 'badge',        badge: { label: 'Delivered', bg: '#f0fdf4', color: '#22ad5c' } },
        { type: 'toggle',       toggleValue: true },
        { type: 'more' },
        { type: 'empty' },
      ] as TableCellProps[]).map((p, i) => (
        <div key={i} className="flex items-center gap-4">
          <span className="text-xs text-slate-400 w-28">{p.type}</span>
          <TableCell {...p} width={200} />
        </div>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="bg-slate-50 p-8 font-body space-y-8">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Full table</p>
        <Table columns={COLUMNS} rows={ROWS} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Code</p>
        <CodeBlock
          code={`<div class="bg-white rounded-lg shadow-xs flex overflow-hidden">
  <!-- column -->
  <div class="flex flex-col" style="width:120px">
    <div class="h-14 px-4 flex items-center border-b-2 border-[#1b306c] font-semibold text-sm text-[#1b306c]">
      Order
    </div>
    <div class="h-10 px-4 flex items-center border-t border-slate-100 text-sm text-slate-600">
      #1042
    </div>
  </div>
  <!-- more columns... -->
</div>`}
          jsx={`<Table columns={columns} rows={rows} />`}
        />
      </div>
    </div>
  ),
};
