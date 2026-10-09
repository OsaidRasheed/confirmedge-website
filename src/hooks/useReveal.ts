import { useEffect, useRef } from "react";

/**
 * Scroll-reveal hook: attach the returned ref to an element with the
 * `reveal` class; it gains `is-visible` when entering the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

/** Reveals every `.reveal` descendant of the referenced container, with stagger. */
export function useRevealGroup<T extends HTMLElement = HTMLDivElement>(staggerMs = 90) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const idx = items.indexOf(el);
          el.style.transitionDelay = `${Math.max(idx, 0) * staggerMs}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
