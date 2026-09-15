"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollHud() {
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const [hudVisible, setHudVisible] = useState(false);

  useEffect(() => {
    const scrollPct = () =>
      Math.min(100, (window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * 100);

    const onScroll = () => {
      const p = scrollPct();
      if (barRef.current) barRef.current.style.width = `${p}%`;
      if (dotRef.current) dotRef.current.style.width = `${p}%`;
    };

    const onMove = (e: MouseEvent) => {
      const el = coordRef.current;
      if (!el) return;
      const p = Math.round(scrollPct());
      el.textContent = `x:${String(Math.round(e.clientX)).padStart(4, "0")} y:${String(Math.round(e.clientY)).padStart(4, "0")} p:${String(p).padStart(3, "0")}%`;
    };

    const onResize = () => {
      setHudVisible(innerWidth >= 940 && innerHeight >= 700);
    };

    onResize();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div ref={barRef} className="fixed left-0 top-0 z-[90] h-0.5 w-0 bg-accent" />

      {hudVisible && (
        <>
          <div
            ref={coordRef}
            className="pointer-events-none fixed bottom-3.5 left-4 z-[70] font-mono text-[10px] tracking-[0.12em] text-text/34 sm:left-10"
          >
            x:0000 y:0000 p:000%
          </div>
          <div className="pointer-events-none fixed bottom-3.5 right-4 z-[70] flex items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-text/34 sm:right-10">
            <span>SCROLL VECTOR</span>
            <span className="block h-[3px] w-[60px] overflow-hidden rounded-full bg-text/14">
              <span ref={dotRef} className="block h-[3px] w-0 bg-accent" />
            </span>
          </div>
        </>
      )}
    </>
  );
}
