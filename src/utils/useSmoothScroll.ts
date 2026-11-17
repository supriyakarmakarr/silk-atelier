import { useEffect } from 'react';
import Lenis from 'lenis';

let instance: Lenis | null = null;

/** Smooth-scroll to an element id. Uses Lenis when active, native smooth scroll otherwise. */
export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: id === 'home' ? 0 : -72, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      allowNestedScroll: true,
    });
    instance = lenis;
    let id = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      instance = null;
    };
  }, []);
}
