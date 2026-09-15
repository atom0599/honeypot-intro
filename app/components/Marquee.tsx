type MarqueeProps = {
  text: string;
  direction?: "left" | "right";
  variant?: "accent" | "subtle";
};

export default function Marquee({ text, direction = "left", variant = "accent" }: MarqueeProps) {
  const isAccent = variant === "accent";
  return (
    <section
      className={`overflow-hidden border-y py-3.5 ${
        isAccent
          ? "border-bg/25 bg-accent text-bg"
          : "border-text/8 bg-text/4 text-text/40"
      }`}
      style={{
        backgroundImage: isAccent
          ? "repeating-linear-gradient(45deg, rgba(6,6,7,0.11) 0 5px, rgba(6,6,7,0) 5px 13px)"
          : "repeating-linear-gradient(45deg, rgba(244,244,241,0.05) 0 5px, rgba(244,244,241,0) 5px 13px)",
      }}
    >
      <div
        className={`marquee-track font-mono text-xs font-bold tracking-wide ${
          direction === "left" ? "marquee-track--l" : "marquee-track--r"
        }`}
      >
        <span className="pr-9">{text}&nbsp;</span>
        <span className="pr-9">{text}&nbsp;</span>
      </div>
    </section>
  );
}
