"use client";

import React from 'react';

// Figma 742-59653 — DataTableHeader atom
// Small: h-40, px-12 | Large: h-56, px-16
// Text type active = border-bottom 2px navy; others = 1px slate

export type TableHeaderSize = 'Small' | 'Large';
export type TableHeaderType = 'Text' | 'Number' | 'Empty';

export type TableHeaderProps = {
  label?: string;
  size?: TableHeaderSize;
  type?: TableHeaderType;
  active?: boolean;
  showSort?: boolean;
  showFilter?: boolean;
  width?: number | string;
  className?: string;
};

function SortIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8 3v10M4 7l4-4 4 4" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M2 4h12M5 8h6M7 12h2" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TableHeader({
  label = 'Header',
  size = 'Small',
  type = 'Text',
  active = true,
  showSort = false,
  showFilter = false,
  width,
  className = '',
}: TableHeaderProps) {
  const isSmall = size === 'Small';
  const h = isSmall ? 40 : 56;
  const px = isSmall ? 12 : 16;
  const gap = isSmall ? 8 : 12;

  const base: React.CSSProperties = {
    backgroundColor: '#ffffff',
    borderBottom: active ? '2px solid #1b306c' : '1px solid #e2e8f0',
    height: h,
    minHeight: h,
    maxHeight: h,
    padding: `0 ${px}px`,
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    flexShrink: 0,
    width: width ?? '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    fontSize: isSmall ? 14 : 18,
    lineHeight: isSmall ? '20px' : '28px',
    color: '#475569',
    flex: 1,
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  if (type === 'Empty') {
    return <div style={base} className={className} />;
  }

  if (type === 'Number') {
    return (
      <div style={{ ...base, justifyContent: 'flex-end', gap }} className={className}>
        {showSort && <SortIcon />}
        <span style={{ ...labelStyle, flex: 'none', textAlign: 'right' }}>{label}</span>
        {showFilter && <FilterIcon />}
      </div>
    );
  }

  // Text (default)
  return (
    <div style={{ ...base, gap }} className={className}>
      <span style={labelStyle}>{label}</span>
      {(showSort || showFilter) && (
        <div style={{ display: 'flex', gap, alignItems: 'center', flexShrink: 0 }}>
          {showSort && <SortIcon />}
          {showFilter && <FilterIcon />}
        </div>
      )}
    </div>
  );
}
