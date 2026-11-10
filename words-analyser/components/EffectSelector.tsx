'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { EffectKey } from './effects';

type Option = { key: EffectKey; label: string };

export default function EffectSelector({
  open,
  onClose,
  value,
  onChange,
  options,
}: {
  open: boolean;
  onClose: () => void;
  value: EffectKey;
  onChange: (k: EffectKey) => void;
  options: Option[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/10 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="fixed z-50 inset-x-0 bottom-0 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] rounded-t-3xl sm:rounded-3xl glass p-5 safe-pb"
          >
            <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-ink/15 sm:hidden" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-fluid-lg font-semibold tracking-tight">Tab transition</h3>
              <button
                onClick={onClose}
                className="min-touch h-9 w-9 rounded-full bg-white border border-line/70 flex items-center justify-center text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60dvh] overflow-y-auto">
              {options.map((o) => {
                const sel = value === o.key;
                return (
                  <button
                    key={o.key}
                    onClick={() => onChange(o.key)}
                    className={`w-full flex items-center justify-between gap-3 p-3 rounded-2xl border text-left transition ${
                      sel
                        ? 'bg-white border-ink/20'
                        : 'bg-white/40 border-line/70 hover:bg-white/70'
                    }`}
                  >
                    <span className="text-fluid-sm font-medium">{o.label}</span>
                    <span
                      className={`h-4 w-4 rounded-full border shrink-0 ${
                        sel ? 'bg-ink border-ink' : 'border-line'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
