"use client";

import { useState, type MouseEvent } from "react";
import { Play } from "@phosphor-icons/react";

type DemoVideoProps = {
  videoId: string;
  title: string;
};

export default function DemoVideo({ videoId, title }: DemoVideoProps) {
  const [playing, setPlaying] = useState(false);

  // On touch devices let the link through so iOS/Android hand it to the YouTube app;
  // on desktop swap the poster for an inline player instead.
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    e.preventDefault();
    setPlaying(true);
  };

  if (playing) {
    return (
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <a
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={`${title} 재생`}
      className="group relative block size-full"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-bg/35 transition-colors group-hover:bg-bg/20" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-accent bg-bg/60 text-accent backdrop-blur-sm transition-transform group-hover:scale-110 sm:size-20">
          <Play size={28} weight="fill" />
        </span>
      </span>
    </a>
  );
}
