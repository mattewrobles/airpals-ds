"use client";

import React from 'react';
import { Button } from './Button';

export type ButtonDoubleSize = 'sm' | 'lg';

export type ButtonDoubleProps = {
  primaryLabel: string;
  secondaryLabel?: string;
  size?: ButtonDoubleSize;
  onPrimary?: () => void;
  onSecondary?: () => void;
  primaryDisabled?: boolean;
  secondaryDisabled?: boolean;
  className?: string;
};

// Figma node 741-40277 — modal/card footer action area
// Small = 48px container, buttons flex-1 (fill width)
// Large = 64px container, buttons shrink-0 (fixed min-width)
export function ButtonDouble({
  primaryLabel,
  secondaryLabel,
  size = 'sm',
  onPrimary,
  onSecondary,
  primaryDisabled = false,
  secondaryDisabled = false,
  className = '',
}: ButtonDoubleProps) {
  const hasTwoButtons = Boolean(secondaryLabel);
  const isLarge = size === 'lg';

  const containerPadding = isLarge ? 'py-3' : 'py-2';
  const containerRadius = isLarge ? 'rounded-bl-xl rounded-br-xl' : 'rounded-bl-lg rounded-br-lg';
  const rowWidth = hasTwoButtons && !isLarge ? 'w-full' : hasTwoButtons ? '' : 'w-full justify-end';
  const btnFlex = hasTwoButtons && !isLarge ? 'flex-1' : 'shrink-0';

  return (
    <div className={`bg-transparent flex items-end justify-center ${containerPadding} ${containerRadius} ${className}`}>
      <div className={`flex items-start gap-3 ${rowWidth}`}>
        {hasTwoButtons && (
          <Button
            label={secondaryLabel!}
            type="Secondary"
            state={secondaryDisabled ? 'Disabled' : 'Default'}
            onClick={onSecondary}
            className={btnFlex}
          />
        )}
        <Button
          label={primaryLabel}
          type="Primary"
          state={primaryDisabled ? 'Disabled' : 'Default'}
          onClick={onPrimary}
          className={btnFlex}
        />
      </div>
    </div>
  );
}
