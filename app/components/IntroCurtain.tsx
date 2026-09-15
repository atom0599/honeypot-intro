"use client";

import { useEffect, useRef } from "react";

export default function IntroCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const loadRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (curtainRef.current) curtainRef.current.style.display = "none";
      return;
    }

    const t0 = Date.now();
    const loadTimer = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - t0) / 1150) * 100));
      if (loadRef.current) loadRef.current.textContent = String(p).padStart(3, "0");
      if (barRef.current) barRef.current.style.width = `${p}%`;
      if (p >= 100) clearInterval(loadTimer);
    }, 40);

    const hideTimer = setTimeout(() => {
      if (curtainRef.current) curtainRef.current.style.display = "none";
    }, 2250);

    return () => {
      clearInterval(loadTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
      style={{ animation: "k-curtain 1.05s 1.1s cubic-bezier(.76,0,.24,1) forwards" }}
      aria-hidden="true"
    >
      <div
        className="grid justify-items-center gap-3.5"
        style={{ animation: "k-curtain-in 2.1s cubic-bezier(.2,.7,.2,1) forwards" }}
      >
        <div
          className="font-display font-bold leading-none tracking-[-0.06em]"
          style={{ fontSize: "clamp(44px, 9vw, 110px)" }}
        >
          정사평<span className="text-accent">.</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-text/45">
          <span>INITIALIZING HONEYPOT NODES</span>
          <span ref={loadRef} className="text-accent">
            000
          </span>
        </div>
        <div
          className="h-0.5 overflow-hidden bg-text/12"
          style={{ width: "clamp(140px, 24vw, 260px)" }}
        >
          <div
            ref={barRef}
            className="h-0.5 w-0 bg-accent"
            style={{ transition: "width .1s linear" }}
          />
        </div>
      </div>
    </div>
  );
}
