'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function LoginCard({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setTimeout(onLogin, 900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[100dvh] flex items-center justify-center safe-px safe-pt safe-pb py-10"
    >
      <div className="w-full max-w-sm">
        <div className="rounded-3xl glass p-7 sm:p-8">
          <div className="mb-7">
            <div className="h-9 w-9 rounded-2xl bg-ink mb-5" />
            <h1 className="text-fluid-xl font-semibold tracking-tight">Welcome back.</h1>
            <p className="text-fluid-sm text-ink/55 mt-1">Sign in to your workspace.</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="relative block">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                autoComplete="email"
                className="float-label-input peer w-full min-touch rounded-2xl bg-white/70 border border-line/70 px-4 pt-5 pb-2 text-fluid-base outline-none focus:border-ink/30 transition"
              />
              <span className="float-label pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fluid-sm text-ink/45 transition-all duration-200">
                Email
              </span>
            </label>

            <label className="relative block">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
                autoComplete="current-password"
                className="float-label-input peer w-full min-touch rounded-2xl bg-white/70 border border-line/70 px-4 pt-5 pb-2 text-fluid-base outline-none focus:border-ink/30 transition"
              />
              <span className="float-label pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-fluid-sm text-ink/45 transition-all duration-200">
                Password
              </span>
            </label>

            <MagneticButton
              type="submit"
              disabled={busy}
              className="w-full min-touch mt-2 px-5 py-3 rounded-2xl bg-ink text-paper text-fluid-sm font-medium disabled:opacity-60"
            >
              {busy ? 'Signing in…' : 'Sign in'}
            </MagneticButton>
          </form>

          <div className="mt-5 text-center text-fluid-sm text-ink/50">
            No account?{' '}
            <button
              type="button"
              onClick={onLogin}
              className="text-ink underline underline-offset-4"
            >
              Continue as guest
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-fluid-sm text-ink/40">Words Analyser · v1.0</p>
      </div>
    </motion.div>
  );
}
