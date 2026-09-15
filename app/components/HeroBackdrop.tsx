const REPS = ["Known Attacker", "Reputation Unknown", "Mass Scanner", "Bot / Crawler"];
const POTS = ["Honeytrap", "Cowrie", "Dionaea", "Suricata", "Elasticpot"];
const PROTOS = ["OTHER", "SSH", "SQL", "HTTP", "SMB"];
const COUNTRIES = ["United States", "Netherlands", "China", "India", "Germany", "Russia", "Brazil", "Vietnam"];
const PORTS = [8081, 22, 1433, 5443, 18184, 445, 2087];

function buildLogRows() {
  const base = Date.now();
  const rows = Array.from({ length: 26 }, (_, i) => {
    const d = new Date(base - i * 41000);
    const p = (n: number) => String(n).padStart(2, "0");
    return {
      ts: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`,
      ip: `${20 + ((i * 37) % 200)}.${(i * 53) % 255}.${(i * 91) % 255}.${(i * 17) % 255}`,
      ipDim: i % 3 !== 0,
      rep: REPS[i % REPS.length],
      country: COUNTRIES[i % COUNTRIES.length],
      pot: POTS[i % POTS.length],
      proto: PROTOS[i % PROTOS.length],
      port: PORTS[i % PORTS.length],
      host: "ip-172-31-37-234",
    };
  });
  return [...rows, ...rows];
}

export default function HeroBackdrop() {
  const rows = buildLogRows();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 3D perspective floor grid */}
      <div
        className="absolute -left-[20%] -right-[20%] -bottom-[12%] h-[80%]"
        style={{ perspective: "520px", perspectiveOrigin: "50% 0%" }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(68deg)",
            transformOrigin: "50% 0%",
            backgroundImage:
              "linear-gradient(rgba(244,244,241,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,241,0.09) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            animation: "k-floor 5.5s linear infinite",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 62%)",
            WebkitMaskImage: "linear-gradient(to bottom, #000 0%, transparent 62%)",
          }}
        />
      </div>

      {/* scrolling ingest-log texture */}
      <div
        className="absolute -top-[6%] bottom-[-6%] right-0 overflow-hidden font-mono text-[11.5px] leading-[1.9] opacity-55"
        style={{
          width: "min(78%, 1180px)",
          whiteSpace: "nowrap",
          maskImage:
            "linear-gradient(100deg, transparent 0%, transparent 34%, #000 62%, #000 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(100deg, transparent 0%, transparent 34%, #000 62%, #000 88%, transparent 100%)",
        }}
      >
        <div
          className="grid gap-0.5 pl-[4%]"
          style={{ animation: "k-colup 42s linear infinite" }}
        >
          {rows.map((r, i) => (
            <div
              key={i}
              className="grid gap-[22px] text-text/30"
              style={{ gridTemplateColumns: "150px 118px 132px 92px 88px 62px 50px 140px" }}
            >
              <span>{r.ts}</span>
              <span className={r.ipDim ? "text-[rgba(255,92,120,0.42)]" : "text-[rgba(255,92,120,0.72)]"}>
                {r.ip}
              </span>
              <span>{r.rep}</span>
              <span>{r.country}</span>
              <span className="text-text/42">{r.pot}</span>
              <span>{r.proto}</span>
              <span>{r.port}</span>
              <span className="text-text/22">{r.host}</span>
            </div>
          ))}
        </div>
      </div>

      {/* radar */}
      <div
        className="absolute -right-[6vw] -top-[10vh]"
        style={{
          width: "min(70vh, 52vw)",
          height: "min(70vh, 52vw)",
          opacity: 0.55,
          maskImage: "radial-gradient(closest-side, #000 68%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, #000 68%, transparent 100%)",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 50% 50%, rgba(244,244,241,0.17) 0 1px, transparent 1px 13%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full opacity-55"
          style={{
            background:
              "conic-gradient(from 0deg, var(--accent) 0deg, rgba(201,242,74,0.22) 30deg, transparent 68deg, transparent 360deg)",
            animation: "k-spin 7s linear infinite",
          }}
        />
        <div className="absolute inset-0 rounded-full border border-text/18" />
        <span
          className="absolute size-2 rounded-full bg-accent"
          style={{ top: "34%", left: "58%", animation: "k-blip 3.6s ease-out infinite" }}
        />
        <span
          className="absolute size-1.5 rounded-full bg-accent"
          style={{ top: "62%", left: "36%", animation: "k-blip 4.4s 1.3s ease-out infinite" }}
        />
        <span
          className="absolute size-1.5 rounded-full bg-[#7cc8ff]"
          style={{ top: "48%", left: "72%", animation: "k-blip 5.2s 2.4s ease-out infinite" }}
        />
      </div>

      {/* drifting blur blobs */}
      <div
        className="absolute -left-[10vw] -top-[22vh] rounded-full bg-accent opacity-[0.08] blur-[130px]"
        style={{ width: "48vw", height: "48vw", animation: "k-drift-a 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -bottom-[24vh] right-[18vw] rounded-full bg-[#3f6bff] opacity-10 blur-[140px]"
        style={{ width: "36vw", height: "36vw", animation: "k-drift-b 22s ease-in-out infinite" }}
      />

      {/* scanline + vignettes */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(244,244,241,0.028) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(70% 60% at 14% 42%, rgba(6,6,7,0.92) 0%, rgba(6,6,7,0) 100%)" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,6,7,0.35) 0%, rgba(6,6,7,0) 30%, rgba(6,6,7,0.82) 100%)",
        }}
      />
    </div>
  );
}
