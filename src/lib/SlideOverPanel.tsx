"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './Button';

/**
 * Right-side billing panel (~440px). Any close path (X, Esc, backdrop, Cancel) asks before
 * discarding when `dirty` is true, so a half-filled address or a new card is never lost silently.
 */
export type SlideOverPanelProps = {
  open: boolean;
  title: string;
  subtitle?: string;
  /** When true, every close path asks before discarding. */
  dirty: boolean;
  onClose: () => void;
  onSave: () => void;
  canSave: boolean;
  /** Shown above the buttons while canSave is false. */
  saveHint?: string;
  children: React.ReactNode;
};

export function SlideOverPanel({
  open,
  title,
  subtitle,
  dirty,
  onClose,
  onSave,
  canSave,
  saveHint,
  children,
}: SlideOverPanelProps) {
  const [confirmDiscard, setConfirmDiscard] = useState(false)
  const [wasOpen, setWasOpen] = useState(open)
  if (open !== wasOpen) {
    setWasOpen(open)
    if (!open) setConfirmDiscard(false)
  }

  const requestClose = () => (dirty ? setConfirmDiscard(true) : onClose())

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return
      if (confirmDiscard) setConfirmDiscard(false)
      else if (dirty) setConfirmDiscard(true)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, dirty, confirmDiscard, onClose])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={requestClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-[440px] bg-background-primary shadow-2xl border-l border-border-primary flex flex-col"
          >
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border-primary shrink-0">
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-text-primary font-heading">{title}</h2>
                {subtitle && <p className="text-xs text-text-secondary mt-0.5 truncate">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={requestClose}
                className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">{children}</div>

            <div className="px-5 py-4 border-t border-border-primary shrink-0 bg-background-primary">
              {confirmDiscard ? (
                <div role="alertdialog" aria-label="Discard changes?" className="flex items-center justify-between gap-3">
                  <p className="text-sm text-text-primary">Discard your changes?</p>
                  <div className="flex items-center gap-2">
                    <Button label="Keep editing" variant="outline" onClick={() => setConfirmDiscard(false)} className="!min-w-0" />
                    <Button label="Discard" variant="primary" onClick={onClose} className="!min-w-0" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {!canSave && saveHint && <p className="text-[11px] text-text-secondary text-right">{saveHint}</p>}
                  <div className="flex items-center justify-end gap-2">
                    <Button label="Cancel" variant="outline" onClick={requestClose} className="!min-w-0" />
                    <Button label="Save changes" variant="primary" disabled={!canSave} onClick={onSave} className="!min-w-0" />
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
