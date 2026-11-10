'use client';

import type { TextStats } from '@/lib/analyze';
import type { EffectKey } from './effects';
import { motion } from 'framer-motion';

const shell = 'rounded-3xl glass p-5 sm:p-7';

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/60 border border-line/60 p-4">
      <div className="text-fluid-sm text-ink/50">{label}</div>
      <div className="text-fluid-xl font-semibold tabular-nums mt-1">{value}</div>
    </div>
  );
}

export function InputPanel({ stats }: { stats: TextStats }) {
  return (
    <div className={shell}>
      <h2 className="text-fluid-lg font-semibold tracking-tight mb-4">Live metrics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Stat label="Words" value={stats.words} />
        <Stat label="Characters" value={stats.chars} />
        <Stat label="Sentences" value={stats.sentences} />
        <Stat label="Read" value={`${stats.readingTime} min`} />
      </div>
    </div>
  );
}

export function AnalyticsPanel({ stats }: { stats: TextStats }) {
  const r = stats.readability;
  const tone = r > 70 ? 'Easy' : r > 50 ? 'Plain' : r > 30 ? 'Complex' : 'Dense';
  return (
    <div className={shell}>
      <div className="flex items-start justify-between mb-5 gap-4 flex-wrap">
        <div>
          <h2 className="text-fluid-lg font-semibold tracking-tight">Analytics</h2>
          <p className="text-fluid-sm text-ink/55 mt-1">
            Flesch reading ease: {r} · {tone}
          </p>
        </div>
        <div className="h-12 w-12 rounded-full border border-line/70 flex items-center justify-center text-fluid-sm font-semibold tabular-nums">
          {r}
        </div>
      </div>

      <div className="mb-6">
        <div className="h-2 w-full rounded-full bg-white/60 border border-line/60 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${r}%` }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-ink"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <Stat label="Avg word" value={stats.avgWordLength} />
        <Stat label="Paragraphs" value={stats.paragraphs} />
        <Stat label="Chars (no space)" value={stats.charsNoSpace} />
      </div>

      <h3 className="text-fluid-sm font-medium text-ink/60 mb-2">Top words</h3>
      {stats.topWords.length === 0 ? (
        <p className="text-fluid-sm text-ink/40">No content yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {stats.topWords.map((w) => (
            <span
              key={w.word}
              className="text-fluid-sm px-3 py-1 rounded-full bg-white/70 border border-line/70"
            >
              {w.word} <span className="text-ink/40 tabular-nums">×{w.count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function HistoryPanel() {
  const items = [
    { title: 'Launch copy v3', meta: '2,140 words · 2h ago' },
    { title: 'Product brief', meta: '880 words · yesterday' },
    { title: 'Email draft — Q3', meta: '312 words · yesterday' },
    { title: 'Notes on minimalism', meta: '1,204 words · 3 days ago' },
  ];
  return (
    <div className={shell}>
      <h2 className="text-fluid-lg font-semibold tracking-tight mb-4">History</h2>
      <ul className="divide-y divide-line/60">
        {items.map((it) => (
          <li key={it.title} className="py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-fluid-base font-medium truncate">{it.title}</div>
              <div className="text-fluid-sm text-ink/50">{it.meta}</div>
            </div>
            <button className="min-touch px-3 py-2 rounded-full bg-white/70 border border-line/70 text-fluid-sm shrink-0">
              Open
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SettingsPanel({
  effect,
  setEffect,
  options,
}: {
  effect: EffectKey;
  setEffect: (k: EffectKey) => void;
  options: { key: EffectKey; label: string }[];
}) {
  return (
    <div className={shell}>
      <h2 className="text-fluid-lg font-semibold tracking-tight mb-1">Settings</h2>
      <p className="text-fluid-sm text-ink/55 mb-5">Choose your tab transition.</p>
      <div className="grid gap-1.5">
        {options.map((o) => {
          const sel = effect === o.key;
          return (
            <button
              key={o.key}
              onClick={() => setEffect(o.key)}
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
    </div>
  );
}
