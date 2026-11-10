'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function LiquidSlide({
  activeKey,
  direction,
  children,
}: {
  activeKey: string;
  direction: number;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-[420px] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={activeKey}
          initial={{ x: direction * 64, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 64, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
