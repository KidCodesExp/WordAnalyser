'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function DepthPush({
  activeKey,
  children,
}: {
  activeKey: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-[420px]" style={{ perspective: '1200px' }}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeKey}
          initial={{ scale: 0.94, opacity: 0, filter: 'blur(18px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 0.94, opacity: 0, filter: 'blur(18px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: 'transform, filter, opacity' }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
