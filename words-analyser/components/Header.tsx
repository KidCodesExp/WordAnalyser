'use client';

export default function Header({
  onOpenEffects,
  effectLabel,
}: {
  onOpenEffects: () => void;
  effectLabel: string;
}) {
  return (
    <header className="sticky top-0 z-30 safe-pt safe-px">
      <div className="mx-auto max-w-6xl">
        <div className="mt-3 flex items-center justify-between rounded-2xl glass px-3 sm:px-4 py-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-6 rounded-full bg-ink shrink-0" />
            <span className="text-fluid-sm font-medium tracking-tight truncate">
              Words Analyser
            </span>
          </div>

          <button
            onClick={onOpenEffects}
            className="min-touch px-3 py-2 rounded-full bg-white/70 hover:bg-white text-fluid-sm border border-line/70 flex items-center gap-2 transition"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink/70" />
            <span className="hidden sm:inline">{effectLabel}</span>
            <span className="sm:hidden">Effects</span>
          </button>

          <button
            className="min-touch h-9 w-9 rounded-full bg-white border border-line/70 flex items-center justify-center hover:bg-white/70 transition"
            aria-label="Account"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
