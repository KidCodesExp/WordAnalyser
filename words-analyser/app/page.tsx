'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background3D from '@/components/Background3D';
import LoadingScreen from '@/components/LoadingScreen';
import LoginCard from '@/components/LoginCard';
import Dashboard from '@/components/Dashboard';

type Phase = 'loading' | 'login' | 'app';

export default function Page() {
  const [phase, setPhase] = useState<Phase>('loading');

  return (
    <>
      <Background3D />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === 'loading' && (
            <LoadingScreen key="loading" onDone={() => setPhase('login')} />
          )}
          {phase === 'login' && (
            <LoginCard key="login" onLogin={() => setPhase('app')} />
          )}
          {phase === 'app' && <Dashboard key="app" />}
        </AnimatePresence>
      </div>
    </>
  );
}
