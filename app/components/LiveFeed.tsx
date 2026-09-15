"use client";

import { useEffect, useState } from "react";

const IPS = [
  "45.148.10.72",
  "193.32.162.14",
  "141.98.11.203",
  "222.186.30.9",
  "89.248.165.40",
  "185.220.101.7",
  "61.177.173.18",
  "167.94.138.61",
  "104.248.19.88",
  "20.115.42.101",
];

const REPS: ["Known Attacker" | "Reputation Unknown" | "Mass Scanner" | "Bot / Crawler"][] = [
  ["Known Attacker"],
  ["Reputation Unknown"],
  ["Mass Scanner"],
  ["Bot / Crawler"],
];

const COUNTRIES: [string, string][] = [
  ["United States", "🇺🇸"],
  ["Netherlands", "🇳🇱"],
  ["China", "🇨🇳"],
  ["India", "🇮🇳"],
  ["Germany", "🇩🇪"],
  ["Russia", "🇷🇺"],
  ["Brazil", "🇧🇷"],
  ["Vietnam", "🇻🇳"],
];

const HONEYPOTS = ["Honeytrap", "Cowrie", "Dionaea", "Suricata", "Elasticpot"];
const PROTOCOLS = ["OTHER", "SSH", "SQL", "HTTP", "SMB"];
const PORTS = [2087, 5443, 8081, 8091, 8095, 18184, 445, 1433, 22];
const HOSTNAME = "ip-172-31-37-234";

type Row = {
  id: number;
  time: string;
  ip: string;
  rep: "Known Attacker" | "Reputation Unknown" | "Mass Scanner" | "Bot / Crawler";
  flag: string;
  country: string;
  pot: string;
  proto: string;
  port: number;
};

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

function repClass(rep: Row["rep"]) {
  if (rep === "Known Attacker") return "text-accent";
  if (rep === "Mass Scanner") return "text-text/75";
  return "text-text/42";
}

function makeRow(): Row {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const [country, flag] = pick(COUNTRIES);
  return {
    id: Math.random(),
    time: `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`,
    ip: pick(IPS),
    rep: pick(REPS)[0],
    flag,
    country,
    pot: pick(HONEYPOTS),
    proto: pick(PROTOCOLS),
    port: pick(PORTS),
  };
}

const COLUMNS = ["TIME", "SOURCE IP", "IP REPUTATION", "", "COUNTRY", "HONEYPOT", "PROTOCOL", "PORT", "T-POT HOSTNAME"];

export default function LiveFeed() {
  const [feed, setFeed] = useState<Row[]>([]);
  const [count, setCount] = useState(1284);

  useEffect(() => {
    // Rows use Math.random()/Date, so they can only be generated post-mount (computing them
    // during render would mismatch the server-rendered HTML). Seeding here, once, is the safe spot.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeed(Array.from({ length: 9 }, makeRow));
    const id = setInterval(() => {
      setFeed((prev) => [makeRow(), ...prev].slice(0, 9));
      setCount((c) => c + 1);
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-[26px] border border-text/10 bg-panel-2 overflow-hidden">
      <div className="flex items-center gap-3 border-b border-text/8 px-5 py-4 font-mono text-[10.5px] tracking-[0.2em] text-text/45">
        <span
          className="block size-2 rounded-full bg-accent"
          style={{ animation: "k-pulse 1.3s ease-in-out infinite" }}
        />
        <span>LIVE FEED · T-POT ATTACK MAP</span>
        <span className="flex-1" />
        <span>{count.toLocaleString()} EVENTS / SESSION</span>
      </div>
      <div className="relative h-[280px] overflow-x-auto overflow-y-hidden">
        <table className="w-full min-w-[860px] border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-text/8 text-left text-[10px] tracking-[0.14em] text-text/40">
              {COLUMNS.map((col, i) => (
                <th key={i} className="px-3 py-2 font-medium first:pl-5 last:pr-5">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {feed.map((row) => (
              <tr
                key={row.id}
                className="whitespace-nowrap border-b border-text/5"
                style={{ animation: "k-in .45s ease both" }}
              >
                <td className="px-3 py-2 pl-5 text-text/36">{row.time}</td>
                <td className="px-3 py-2 text-text/85">{row.ip}</td>
                <td className={`px-3 py-2 font-semibold ${repClass(row.rep)}`}>{row.rep}</td>
                <td className="px-3 py-2 text-sm">{row.flag}</td>
                <td className="px-3 py-2 text-text/60">{row.country}</td>
                <td className="px-3 py-2 font-semibold text-text/85">{row.pot}</td>
                <td className="px-3 py-2">
                  <span className="rounded-full border border-text/16 px-2.5 py-1 text-[10px] tracking-[0.08em] text-text/70">
                    {row.proto}
                  </span>
                </td>
                <td className="px-3 py-2 text-text/70">{row.port}</td>
                <td className="px-3 py-2 pr-5 text-text/34">{HOSTNAME}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[88px] bg-gradient-to-b from-transparent to-panel-2" />
      </div>
    </div>
  );
}
