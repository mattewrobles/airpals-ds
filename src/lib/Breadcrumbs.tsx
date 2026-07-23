"use client";

import React from 'react';
import { ChevronRightIcon, ArrowRightIcon } from '@heroicons/react/solid';

// Figma 779-1625 (atom) + 625-2136 (full)
// Active/last item: Inter SemiBold 16px, #1b306c (text/primary)
// Inactive items: Inter Regular 16px, #475569 (text/secondary)
// Separator options: chevron-right (default) | slash "/" | arrow →
// Gap: 10px between items + separators
// Optional leading icon (18px) on any item

export type BreadcrumbSeparator = 'chevron' | 'slash' | 'arrow';

export type BreadcrumbItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: BreadcrumbSeparator;
  className?: string;
};

const ChevronRight = () => (
  <ChevronRightIcon style={{ width: 18, height: 18, color: '#94a3b8', flexShrink: 0 }} aria-hidden="true" />
);

const ArrowRight = () => (
  <ArrowRightIcon style={{ width: 18, height: 18, color: '#94a3b8', flexShrink: 0 }} aria-hidden="true" />
);

function Separator({ type }: { type: BreadcrumbSeparator }) {
  if (type === 'slash') {
    return (
      <span
        aria-hidden="true"
        style={{ color: '#1b306c', fontSize: 16, fontWeight: 600, lineHeight: '24px', width: 18, textAlign: 'center', flexShrink: 0 }}
      >
        /
      </span>
    );
  }
  if (type === 'arrow') return <ArrowRight />;
  return <ChevronRight />;
}

export function Breadcrumbs({ items, separator = 'chevron', className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {item.icon && (
                  <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', width: 18, height: 18, color: isLast ? '#1b306c' : '#475569', flexShrink: 0 }}>
                    {item.icon}
                  </span>
                )}
                {isLast ? (
                  <span
                    aria-current="page"
                    style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: '#1b306c', whiteSpace: 'nowrap', fontFamily: 'Inter' }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href ?? '#'}
                    style={{ fontSize: 16, fontWeight: 400, lineHeight: '24px', color: '#475569', textDecoration: 'none', fontFamily: 'Inter' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#1b306c')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast && (
                <li aria-hidden="true" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                  <Separator type={separator} />
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
