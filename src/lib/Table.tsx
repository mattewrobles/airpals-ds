"use client";

import React from 'react';
import { TableHeader } from './TableHeader';
import { TableCell } from './TableCell';
import type { TableCellType, TableCellState, TableCellBadge } from './TableCell';

// Figma 742-64015 — Data-cell/Simple/Desktop
// Column-first layout: each column = header + divider + cells
// bg white, rounded-8, shadow xs (0 1px 2px rgba(0,0,0,0.05))

export type TableColumnDef = {
  key: string;
  label: string;
  type?: TableCellType;
  width?: number;
  align?: 'left' | 'right';
};

export type TableCellData = {
  text?: string;
  subtext?: string;
  href?: string;
  badge?: TableCellBadge;
  state?: TableCellState;
};

export type TableRowData = {
  [key: string]: string | TableCellData | undefined;
};

export type TableProps = {
  columns: TableColumnDef[];
  rows: TableRowData[];
  className?: string;
  style?: React.CSSProperties;
};

export function Table({ columns, rows, className = '', style }: TableProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
        display: 'flex',
        overflow: 'hidden',
        ...style,
      }}
    >
      {columns.map((col) => {
        const isNumber = col.type === 'text' && col.align === 'right';
        return (
          <div
            key={col.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: col.width ?? 160,
              flexShrink: 0,
            }}
          >
            {/* Header */}
            <TableHeader
              label={col.label}
              size="Large"
              type={isNumber ? 'Number' : 'Text'}
              active
              width="100%"
            />

            {/* Rows */}
            {rows.map((row, i) => {
              const raw = row[col.key];
              const cellData: TableCellData =
                typeof raw === 'string' ? { text: raw } : (raw as TableCellData) ?? {};

              return (
                <React.Fragment key={i}>
                  {/* Divider */}
                  <div style={{ height: 1, backgroundColor: '#e5e7eb', flexShrink: 0 }} />
                  {/* ponytail: wrapper gives equal row height; TableCell fills it */}
                  <div style={{ flex: '1 0 0', minHeight: 48, display: 'flex', alignItems: 'stretch' }}>
                    <TableCell
                      type={col.type ?? 'text'}
                      text={cellData.text}
                      subtext={cellData.subtext}
                      href={cellData.href}
                      badge={cellData.badge}
                      state={cellData.state ?? 'default'}
                      width="100%"
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
