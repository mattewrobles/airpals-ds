"use client";

import React from 'react';
import { Button } from './Button';

// Figma 741-40257 — FeedbackDialog
// w: 420px, bg white, rounded-8, shadow/lg
// Sections: header (title + close), image slot, input slot, description, footer (secondary + primary btn)

export type FeedbackDialogProps = {
  title?: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  showImage?: boolean;
  imageSlot?: React.ReactNode;
  inputSlot?: React.ReactNode;
  showDescription?: boolean;
  showFooter?: boolean;
  onClose?: () => void;
  onPrimary?: () => void;
  onSecondary?: () => void;
  className?: string;
};

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="#1b306c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function FeedbackDialog({
  title = 'Feedback',
  description = 'Let us know how we can improve your experience.',
  primaryLabel = 'Submit',
  secondaryLabel = 'Cancel',
  showImage = true,
  imageSlot,
  inputSlot,
  showDescription = true,
  showFooter = true,
  onClose,
  onPrimary,
  onSecondary,
  className = '',
}: FeedbackDialogProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1), 0px 4px 6px -4px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: 420,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 8 }}>
        <span style={{
          flex: 1, minWidth: 0,
          fontFamily: 'Inter, sans-serif', fontWeight: 600,
          fontSize: 16, lineHeight: '24px', color: '#1b306c',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {title}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexShrink: 0 }}
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {/* Image slot */}
      {showImage && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          {imageSlot ?? (
            <div style={{
              width: 162, height: 162,
              borderRadius: 12,
              backgroundColor: '#e6f1fd',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 48 }}>📦</span>
            </div>
          )}
        </div>
      )}

      {/* Input slot */}
      {inputSlot && (
        <div style={{ width: '100%' }}>
          {inputSlot}
        </div>
      )}

      {/* Description */}
      {showDescription && (
        <div style={{ paddingTop: 0, paddingBottom: 12, width: '100%' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontWeight: 400,
            fontSize: 14, lineHeight: '20px', color: '#475569',
            margin: 0,
          }}>
            {description}
          </p>
        </div>
      )}

      {/* Footer */}
      {showFooter && (
        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <Button
            type="Secondary"
            label={secondaryLabel}
            onClick={onSecondary}
            className="flex-1"
          />
          <Button
            type="Primary"
            label={primaryLabel}
            onClick={onPrimary}
            className="flex-1"
          />
        </div>
      )}
    </div>
  );
}
