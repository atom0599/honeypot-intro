"use client";

import { useEffect } from "react";

/**
 * Marks [data-reveal] and [data-rule] nodes data-revealed="true" (see globals.css for the
 * actual transition) the first time each scrolls into view, staggered a little per batch.
 * Mount this once near the root — it has no output of its own.
 */
export default function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const rules = Array.from(document.querySelectorAll<HTMLElement>("[data-rule]"));

    const io = new IntersectionObserver(
      (entries) => {
        const hits = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        hits.forEach((entry, i) => {
          const el = entry.target as HTMLElement;
          el.style.transitionDelay = `${Math.min(i * 90, 360)}ms`;
          el.dataset.revealed = "true";
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );
    reveals.forEach((el) => io.observe(el));

    const ro = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          ro.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );
    rules.forEach((el) => ro.observe(el));

    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return null;
}
