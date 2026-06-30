"use client";

import React, { useState, useId } from 'react';

// Figma 740-28025 (atom) + 740-27940 (group)
// Sizes: Small (20px title, 12px padding) | Large (24px title, 16px padding)
// Container: bg #e6f1fd, border-b #e5e7eb, rounded-3xl (24px)
// Disabled: bg #f1f5f9, text/chevron #cbd5e1
// Focus ring: 2px white offset + 4px #4f46e5
// Chevron: rotates 180° when open

export type AccordionSize = 'Small' | 'Large';

export type AccordionProps = {
  title: string;
  children: React.ReactNode;
  size?: AccordionSize;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export type AccordionGroupItem = {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
};

export type AccordionGroupProps = {
  items: AccordionGroupItem[];
  size?: AccordionSize;
  className?: string;
};

const ChevronIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Accordion({
  title,
  children,
  size = 'Small',
  icon,
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  disabled = false,
  className = '',
}: AccordionProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const triggerId = useId();
  const panelId = useId();

  const isLarge = size === 'Large';

  const toggle = () => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onToggle?.(next);
  };

  // Sizes
  const headerPx  = isLarge ? 'px-4 py-4' : 'px-3 py-3';
  const headerGap  = isLarge ? 'gap-3'    : 'gap-2';
  const titleSize  = isLarge ? 'text-2xl leading-8' : 'text-xl leading-7';
  const iconSize   = isLarge ? 20 : 18;
  const chevronPx  = isLarge ? 24 : 18;
  const bodyPad    = isLarge ? 'p-4' : 'p-3';
  const bodyText   = isLarge ? 'text-base leading-6' : 'text-sm leading-5';

  // Colors
  const bgColor     = disabled ? 'bg-[#f1f5f9]' : 'bg-[#e6f1fd]';
  const titleColor  = disabled ? 'text-[#cbd5e1]' : 'text-[#1b306c]';
  const chevronColor = disabled ? '#cbd5e1' : '#1b306c';
  const bodyColor   = disabled ? 'text-[#cbd5e1]' : 'text-[#1b306c]';

  return (
    <div
      className={`${bgColor} border-b border-[#e5e7eb] rounded-3xl w-full overflow-hidden ${className}`}
    >
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={toggle}
        className={[
          `flex items-center w-full text-left ${headerPx} ${headerGap}`,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4f46e5]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        {icon && (
          <span
            aria-hidden="true"
            style={{ width: iconSize, height: iconSize }}
            className="shrink-0 flex items-center justify-center"
          >
            {icon}
          </span>
        )}

        <span
          className={`flex-1 min-w-0 font-semibold font-['Lexend'] ${titleSize} ${titleColor}`}
        >
          {title}
        </span>

        <span
          aria-hidden="true"
          className="shrink-0 transition-transform duration-[var(--motion-base)]"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronIcon size={chevronPx} color={chevronColor} />
        </span>
      </button>

      {/* Body — CSS height transition */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className="overflow-hidden transition-all duration-[var(--motion-base)] ease-[var(--ease-std)]"
        style={{ maxHeight: isOpen ? '999px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div className={`${bodyPad} ${bodyText} ${bodyColor} font-normal font-['Inter']`}>
          {children}
        </div>
      </div>
    </div>
  );
}

export function AccordionGroup({ items, size = 'Small', className = '' }: AccordionGroupProps) {
  const isLarge = size === 'Large';
  const gap = isLarge ? 'gap-6' : 'gap-5';
  return (
    <div className={`flex flex-col ${gap} w-full ${className}`}>
      {items.map((item, i) => (
        <Accordion
          key={i}
          title={item.title}
          size={size}
          icon={item.icon}
          defaultOpen={item.defaultOpen}
          disabled={item.disabled}
        >
          {item.content}
        </Accordion>
      ))}
    </div>
  );
}
