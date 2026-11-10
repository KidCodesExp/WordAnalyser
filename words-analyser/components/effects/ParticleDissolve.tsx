'use client';

import { AnimatePresence, motion } from 'framer-motion';

function ParticleBurst({ burstKey }: { burstKey: string }) {
  return (
    <div
      key={burstKey}
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      aria-hidden
    >
      {Array.from({ length: 30 }).map((_, i) => {
        const angle = (i / 30) * Math.PI * 2 + Math.random() * 0.6;
        const dist = 90 + Math.random() * 140;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: [0, x * 0.4, x],
              y: [0, y * 0.4, y],
              opacity: [0, 0.9, 0],
              scale: [0, 1.1, 0],
            }}
            transition={{
              duration: 0.9,
              delay: Math.random() * 0.12,
              ease: 'easeOut',
            }}
            className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-ink/60"
          />
        );
      })}
    </div>
  );
}

export default function ParticleDissolve({
  activeKey,
  children,
}: {
  activeKey: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative w-full min-h-[420px]">
      <ParticleBurst burstKey={activeKey} />
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeKey}
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            transition: { delay: 0.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.3, ease: 'easeIn' },
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
