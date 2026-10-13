"use client";

import { useEffect, useRef } from "react";

const navItems = [
  { label: "#pipeline", href: "#pipeline" },
  { label: "#data", href: "#data" },
  { label: "#ai", href: "#ai" },
  { label: "#stack", href: "#stack" },
  { label: "#screens", href: "#implementation" },
  { label: "#demo", href: "#demo" },
  { label: "#team", href: "#team" },
];

export default function Nav() {
  const logoARef = useRef<HTMLSpanElement>(null);
  const logoBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const swap = window.scrollY > 140;
      const a = logoARef.current;
      const b = logoBRef.current;
      if (!a || !b) return;
      a.style.opacity = swap ? "0" : "1";
      a.style.transform = swap ? "translateY(-8px)" : "translateY(0)";
      b.style.opacity = swap ? "1" : "0";
      b.style.transform = swap ? "translateY(0)" : "translateY(8px)";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[80] flex items-center justify-between gap-4 px-4 py-4 sm:px-10"
      style={{ background: "linear-gradient(to bottom, rgba(6,6,7,0.92), rgba(6,6,7,0))" }}
    >
      <a href="#top" className="flex items-center gap-2.5 text-[17px] font-bold tracking-[-0.02em]">
        <span
          className="block size-2.5 shrink-0 rounded-full bg-accent"
          style={{ animation: "k-pulse 1.6s ease-in-out infinite" }}
        />
        <span className="relative inline-block whitespace-nowrap">
          <span
            ref={logoARef}
            className="inline-block transition-[opacity,transform] duration-300 ease-out"
          >
            정사평
          </span>
          <span
            ref={logoBRef}
            className="absolute left-0 top-0 opacity-0 transition-[opacity,transform] duration-300 ease-out"
            style={{
              transform: "translateY(8px)",
              fontSize: "clamp(12px, 1.2vw, 15px)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            허니팟 기반 사이버 공격 분석 시스템
          </span>
        </span>
      </a>
      <nav className="hidden flex-wrap items-center justify-end gap-2 font-mono text-[11px] sm:flex sm:gap-3">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="pill-nav">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
