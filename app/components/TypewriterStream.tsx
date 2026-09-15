"use client";

import { useEffect, useState } from "react";

const STREAM = "분석 리포트 생성 중… 공격 유형: SSH 자격증명 대입";

export default function TypewriterStream() {
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i = i >= STREAM.length ? 0 : i + 1;
      setText(STREAM.slice(0, i));
    }, 95);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="mt-1 block font-mono text-xs">
      {text}
      <span className="inline-block" style={{ animation: "k-blink 1s step-end infinite" }}>
        ▋
      </span>
    </span>
  );
}
