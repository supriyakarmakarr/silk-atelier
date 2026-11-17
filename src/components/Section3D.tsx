import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface Section3DProps {
  children: ReactNode;
  /** 'exit' (hero) renders as-is; 'rise' gives a one-time 3D entrance. */
  variant?: 'rise' | 'exit';
}

/**
 * One-shot 3D entrance: the section tilts up out of depth as it first enters the viewport.
 * Not scroll-linked, so there is no per-frame work while scrolling, and once it finishes the
 * element has no transform (no extra compositor layer, fixed children behave normally).
 */
export function Section3D({ children, variant = 'rise' }: Section3DProps) {
  const reduce = useReducedMotion();
  if (reduce || variant === 'exit') return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 70, rotateX: 7, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1400, transformOrigin: '50% 100%' }}
    >
      {children}
    </motion.div>
  );
}
