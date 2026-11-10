'use client';

import { useMemo, useRef, useState } from 'react';
import Header from './Header';
import TabBar from './TabBar';
import EffectSelector from './EffectSelector';
import MagneticButton from './MagneticButton';
import effects, { type EffectKey } from './effects';
import { analyzeText } from '@/lib/analyze';
import {
  InputPanel,
  AnalyticsPanel,
  HistoryPanel,
  SettingsPanel,
} from './panels';

const TABS = [
  { key: 'input', label: 'Text Input' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'history', label: 'History' },
  { key: 'settings', label: 'Settings' },
];

const EFFECT_OPTIONS: { key: EffectKey; label: string }[] = [
  { key: 'flip', label: '3D Card Flip' },
  { key: 'liquid', label: 'Liquid Morph Slide' },
  { key: 'depth', label: 'Glass Depth Push' },
  { key: 'mask', label: 'Mask Reveal Wipe' },
  { key: 'particle', label: 'Particle Dissolve' },
];

export default function Dashboard() {
  const [tab, setTab] = useState('input');
  const [effect, setEffect] = useState<EffectKey>('liquid');
  const [direction, setDirection] = useState(1);
  const [text, setText] = useState('');
  const [selectorOpen, setSelectorOpen] = useState(false);
  const stats = useMemo(() => analyzeText(text), [text]);
  const prevIdxRef = useRef(TABS.findIndex((t) => t.key === tab));

  const onTab = (key: string) => {
    const idx = TABS.findIndex((t) => t.key === key);
    if (idx === -1 || key === tab) return;
    setDirection(idx > prevIdxRef.current ? 1 : -1);
    prevIdxRef.current = idx;
    setTab(key);
  };

  const EffectComp = effects[effect];
  const effectLabel = EFFECT_OPTIONS.find((e) => e.key === effect)!.label;

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header
        onOpenEffects={() => setSelectorOpen(true)}
        effectLabel={effectLabel}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <section className="pt-6 sm:pt-10">
          <div className="mb-5 flex items-end justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <p className="text-fluid-sm text-ink/50">Workspace</p>
              <h1 className="text-fluid-2xl font-semibold tracking-tight leading-[1.05]">
                Analyse your words.
              </h1>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-fluid-sm text-ink/60 tabular-nums">
              <span>{stats.words} words</span>
              <span>·</span>
              <span>{stats.readingTime} min read</span>
            </div>
          </div>

          <div className="relative rounded-3xl bg-white inset-shadow border border-line/70 focus-within:border-ink/20 transition">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or write your text here…"
              className="w-full min-h-[180px] sm:min-h-[220px] resize-none rounded-3xl bg-transparent p-5 sm:p-7 outline-none text-fluid-base leading-relaxed placeholder:text-ink/35"
            />
            <div className="flex items-center justify-between gap-3 px-4 pb-3">
              <div className="text-fluid-sm text-ink/50 tabular-nums">
                {stats.chars} chars · {stats.sentences} sentences
              </div>
              <MagneticButton
                onClick={() => onTab('analytics')}
                className="min-touch px-4 py-2 rounded-full bg-ink text-paper text-fluid-sm font-medium"
              >
                Analyse
              </MagneticButton>
            </div>
          </div>
        </section>

        <TabBar tabs={TABS} active={tab} onChange={onTab} />

        <div className="mt-6">
          <EffectComp activeKey={tab} direction={direction}>
            {tab === 'input' && <InputPanel stats={stats} />}
            {tab === 'analytics' && <AnalyticsPanel stats={stats} />}
            {tab === 'history' && <HistoryPanel />}
            {tab === 'settings' && (
              <SettingsPanel
                effect={effect}
                setEffect={setEffect}
                options={EFFECT_OPTIONS}
              />
            )}
          </EffectComp>
        </div>
      </main>

      <EffectSelector
        open={selectorOpen}
        onClose={() => setSelectorOpen(false)}
        value={effect}
        onChange={setEffect}
        options={EFFECT_OPTIONS}
      />
    </div>
  );
}
