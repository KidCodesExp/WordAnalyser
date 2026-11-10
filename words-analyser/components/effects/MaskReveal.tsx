'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function MaskReveal({
  activeKey,
  children,
}: {
  activeKey: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-[420px]">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeKey}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          exit={{
            opacity: 0,
            transition: { duration: 0.15, delay: 0.55 },
          }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          style={{ willChange: 'clip-path' }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={`line-${activeKey}`}
        initial={{ left: '0%', opacity: 0 }}
        animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
        transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
        className="pointer-events-none absolute top-2 bottom-2 w-px bg-ink/55 z-20"
      />
    </div>
  );
}
