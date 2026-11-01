"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";

export const LIVE_DEMO_URL = "http://43.202.214.157:8002/";

// Operating window in KST: 2026-11-03 00:00 – 2026-11-04 23:59
const OPEN_AT = Date.parse("2026-11-03T00:00:00+09:00");
const CLOSE_AT = Date.parse("2026-11-05T00:00:00+09:00");

type Status = "upcoming" | "live" | "closed";

function getStatus(now: number): Status {
  if (now < OPEN_AT) return "upcoming";
  if (now < CLOSE_AT) return "live";
  return "closed";
}

const statusLabel: Record<Status, string> = {
  upcoming: "운영 예정",
  live: "운영 중",
  closed: "운영 종료",
};

function useStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => setStatus(getStatus(Date.now()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}

function StatusDot({ status }: { status: Status | null }) {
  const live = status === "live";
  return (
    <span
      className={`block size-2 shrink-0 rounded-full ${live ? "bg-accent" : "bg-text/35"}`}
      style={live ? { animation: "k-pulse 1.6s ease-in-out infinite" } : undefined}
    />
  );
}

/** Large card for the demo section. */
export default function LiveDemoLink() {
  const status = useStatus();
  const closed = status === "closed";

  return (
    <div className="grid gap-5 rounded-[24px] border border-text/16 bg-panel p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
      <div className="grid gap-3">
        <span className="flex items-center gap-2.5 font-mono text-[10.5px] tracking-[0.2em] text-text/50">
          <StatusDot status={status} />
          LIVE DEMO{status && ` · ${statusLabel[status]}`}
        </span>
        <span className="font-sans text-lg font-semibold sm:text-xl">실제 대시보드를 직접 사용해 보세요</span>
        <span className="font-sans text-[13px] leading-[1.75] text-text/54">
          운영 기간 <span className="text-text">11월 3일(화) – 11월 4일(수)</span> · 기간 외에는 접속되지 않습니다.
        </span>
        <span className="break-all font-mono text-[11.5px] text-text/40">{LIVE_DEMO_URL}</span>
      </div>
      <a
        href={LIVE_DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={closed}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-sans text-[15px] font-bold tracking-[-0.01em] transition-transform duration-300 ${
          closed
            ? "pointer-events-none border border-text/16 text-text/40"
            : "bg-accent text-bg hover:-translate-y-[3px]"
        }`}
      >
        {closed ? "운영 종료" : "시연 사이트 열기"}
        {!closed && <ArrowUpRight size={17} weight="bold" />}
      </a>
    </div>
  );
}

/** Compact pill for the hero. Hidden once the window has passed. */
export function LiveDemoPill() {
  const status = useStatus();
  if (status === "closed") return null;

  return (
    <a
      href={LIVE_DEMO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-bg/70 px-4 py-2 font-mono text-[10.5px] font-medium tracking-[0.16em] text-accent backdrop-blur-sm transition-colors hover:bg-accent hover:text-bg"
    >
      <StatusDot status={status} />
      LIVE DEMO · 11.03–11.04
      <ArrowUpRight size={12} weight="bold" />
    </a>
  );
}
