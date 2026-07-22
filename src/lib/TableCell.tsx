"use client";

import React, { useState } from 'react';
import { ToggleSimple } from './Toggle';
import { ClickableLink } from './ClickableLink';

// Figma 742-59045 — DataTableCell atom (Small size)
// Types: text, text-subtext, link, badge, more, toggle, empty
// States: default (transparent), hover (#f3f4f6), selected (#e6f1fd), disabled (opacity 0.5)

export type TableCellType = 'text' | 'text-subtext' | 'link' | 'badge' | 'more' | 'toggle' | 'empty' | 'number';
export type TableCellState = 'default' | 'hover' | 'selected' | 'disabled';

export type TableCellBadge = {
  label: string;
  bg?: string;
  color?: string;
};

export type TableCellProps = {
  type?: TableCellType;
  text?: string;
  subtext?: string;
  href?: string;
  badge?: TableCellBadge;
  state?: TableCellState;
  toggleValue?: boolean;
  onToggleChange?: (v: boolean) => void;
  onMoreClick?: () => void;
  onLinkClick?: () => void;
  width?: number | string;
  className?: string;
};

const STATE_BG: Record<TableCellState, string> = {
  default: 'transparent',
  hover: '#f3f4f6',
  selected: '#e6f1fd',
  disabled: 'transparent',
};

function MoreIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="5" r="1.5" fill="#475569" />
      <circle cx="10" cy="10" r="1.5" fill="#475569" />
      <circle cx="10" cy="15" r="1.5" fill="#475569" />
    </svg>
  );
}

export function TableCell({
  type = 'text',
  text = 'Text',
  subtext,
  href,
  badge,
  state = 'default',
  toggleValue = false,
  onToggleChange,
  onMoreClick,
  onLinkClick,
  width,
  className = '',
}: TableCellProps) {
  const isDisabled = state === 'disabled';

  const base: React.CSSProperties = {
    backgroundColor: STATE_BG[state],
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    boxSizing: 'border-box',
    flex: '1 0 0',
    minHeight: 0,
    width: width ?? '100%',
    opacity: isDisabled ? 0.5 : 1,
  };

  if (type === 'empty') {
    return <div style={{ ...base, padding: 0 }} className={className} />;
  }

  if (type === 'more') {
    return (
      <div style={{ ...base, justifyContent: 'center', padding: '7px 10px' }} className={className}>
        <button
          onClick={onMoreClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: 0 }}
          aria-label="More options"
        >
          <MoreIcon />
        </button>
      </div>
    );
  }

  if (type === 'link') {
    return (
      <div style={base} className={className}>
        <ClickableLink label={text ?? ''} color="Blue" form="Line" size="sm" onClick={onLinkClick} href={href} />
      </div>
    );
  }

  if (type === 'badge') {
    const b = badge ?? { label: text, bg: '#0043ff', color: '#ffffff' };
    return (
      <div style={base} className={className}>
        <span style={{
          backgroundColor: b.bg ?? '#0043ff',
          color: b.color ?? '#ffffff',
          borderRadius: 20,
          padding: '4px 8px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: 12,
          lineHeight: '16px',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          {b.label}
        </span>
      </div>
    );
  }

  if (type === 'toggle') {
    return (
      <div style={base} className={className}>
        <ToggleSimple
          checked={toggleValue}
          onChange={onToggleChange}
        />
      </div>
    );
  }

  // text or text-subtext
  return (
    <div style={{ ...base, flexDirection: 'column', alignItems: 'flex-start', gap: 0 }} className={className}>
      <span style={{
        fontFamily: 'Inter, sans-serif', fontWeight: 600,
        fontSize: 14, lineHeight: '20px',
        color: isDisabled ? '#9ca3af' : '#1b306c',
        width: '100%',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {text}
      </span>
      {(type === 'text-subtext') && subtext && (
        <span style={{
          fontFamily: 'Inter, sans-serif', fontWeight: 400,
          fontSize: 12, lineHeight: '16px',
          color: isDisabled ? '#9ca3af' : '#475569',
          width: '100%',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {subtext}
        </span>
      )}
    </div>
  );
}
