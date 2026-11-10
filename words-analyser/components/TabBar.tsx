'use client';

import { motion } from 'framer-motion';

type Tab = { key: string; label: string };

export default function TabBar({
  tabs,
  active,
  onChange,
}: {
  tabs: Tab[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="mt-8 sm:mt-10 -mx-1 px-1 overflow-x-auto">
      <div className="inline-flex gap-1 p-1 rounded-full glass">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => onChange(t.key)}
              className="relative min-touch px-4 py-2 rounded-full text-fluid-sm font-medium whitespace-nowrap"
            >
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-full bg-ink"
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-paper' : 'text-ink/65'}`}>
                {t.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
