'use client';

import { useEffect, useRef } from 'react';
import { useRipple } from './Ripple';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
};

export default function MagneticButton({ children, className = '', strength = 0.3, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const { onPointerDown } = useRipple();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const mx = (e.clientX - (r.left + r.width / 2)) * strength;
      const my = (e.clientY - (r.top + r.height / 2)) * strength;
      el.style.setProperty('--mx', `${mx}px`);
      el.style.setProperty('--my', `${my}px`);
    };
    const leave = () => {
      el.style.setProperty('--mx', '0px');
      el.style.setProperty('--my', '0px');
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return (
    <button
      ref={ref}
      {...rest}
      onPointerDown={(e) => {
        onPointerDown(e);
        rest.onPointerDown?.(e);
      }}
      className={`ripple-host magnetic-btn will-change-transform ${className}`}
    >
      {children}
    </button>
  );
}
