'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function FlipEffect({ activeKey, children }: { activeKey: string; children: React.ReactNode }) {
  return (
    <div className="relative w-full min-h-[420px]" style={{ perspective: '1400px' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeKey}
          initial={{ rotateY: 180, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -180, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
