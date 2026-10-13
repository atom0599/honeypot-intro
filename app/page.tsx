import { Fragment } from "react";
import Image from "next/image";
import {
  Browsers,
  Play,
  Cpu,
  Database,
  HardDrives,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react/ssr";
import Nav from "./components/Nav";
import IntroCurtain from "./components/IntroCurtain";
import ScrollHud from "./components/ScrollHud";
import RevealObserver from "./components/RevealObserver";
import HeroBackdrop from "./components/HeroBackdrop";
import LiveFeed from "./components/LiveFeed";
import TypewriterStream from "./components/TypewriterStream";
import Marquee from "./components/Marquee";
import ParallaxWord from "./components/ParallaxWord";

const P = ["var(--p0)", "var(--p1)", "var(--p2)", "var(--p3)"];
const hue = (i: number) => P[i % P.length];

const heroSpecs = [
  { label: "HONEYPOTS", value: "25종", note: "Docker 기반 서비스별 허니팟 상시 운용", color: P[0] },
  { label: "ACCURACY", value: "0.9995", note: "LightGBM 5개 라벨 분류 정확도 (v5)", color: P[1] },
  { label: "F1 SCORE", value: "0.9981", note: "클래스 불균형을 반영한 Macro F1 (v5)", color: P[2] },
  { label: "REPORT", value: "Claude", note: "LLM 기반 한국어 분석 리포트", color: P[3] },
];

const problems = [
  {
    no: "001",
    title: "로그는 쌓이지만 분류는 사람의 몫이다",
    body: "허니팟과 보안 장비는 이미 충분한 로그를 남기지만, 그 로그가 어떤 공격이고 얼마나 위험한지는 사람이 직접 읽고 판단해야 합니다.",
  },
  {
    no: "002",
    title: "실제 공격 데이터를 구하기 어렵다",
    body: "공개 데이터셋은 오래되고 환경이 다릅니다. T-Pot 허니팟은 지금 이 순간 들어오는 실제 공격을 그대로 기록합니다.",
  },
  {
    no: "003",
    title: "탐지와 해설 사이가 끊겨 있다",
    body: "LightGBM이 유형을 분류해도 대응 가이드는 별도 작업이었습니다. Claude가 분류 결과를 바로 이어받아 리포트를 씁니다.",
  },
];

const pipeline = [
  { no: "001", title: "인터넷 공격자", tag: "실제 외부 공격", desc: "포트 스캔 · 계정 무차별 대입 · 악성코드 다운로드" },
  { no: "002", title: "T-Pot 허니팟", tag: "25종 · 공격 유도", desc: "cowrie · dionaea 등 가짜 서비스 · Suricata 네트워크 탐지 · 접속·명령 로그 기록" },
  { no: "003", title: "Logstash", tag: "정규화 · 적재", desc: "허니팟별 로그 형식 통일 · IP 위치(geoip) 부여 · Elasticsearch logstash-* 저장" },
  { no: "004", title: "ml-classifier", tag: "규칙 + ML 교차검증", desc: "규칙이 1차 판정 · LightGBM 교차검증 · MITRE ATT&CK 점수화 · 30초 주기" },
  { no: "005", title: "llm-analyzer", tag: "Claude API 한국어 해설", desc: "Anthropic Claude API · 공격 요약 · 대응 방안 · 공격 기법(TTP) 추론" },
  { no: "006", title: "데이터 저장", tag: "Elasticsearch · PostgreSQL", desc: "ES: 로그 · 분류 · 해설 결과(ml-analysis-*, llm-analysis-*) · PostgreSQL: 사용자 · 프로젝트" },
  { no: "007", title: "Spring Boot 백엔드", tag: "API · 인증", desc: "회원가입 · JWT 로그인 · 권한 관리 · 분석 결과 조회 API" },
  { no: "008", title: "Next.js 대시보드", tag: "한국어 화면", desc: "공격 현황 · 통계 · 위험도별 이벤트 목록 · 한국어 해설 · 대응 방안" },
  { no: "009", title: "어택맵 · 리포트", tag: "실시간 · PDF", desc: "세계 지도 위 실시간 공격 표시 · threat-console PDF 리포트" },
];

const dataStats = [
  { label: "HONEYPOTS", value: "25종", note: "허니팟 컨테이너 상시 운용", color: P[1] },
  { label: "SERVICES", value: "SSH·웹·DB·ICS", note: "다양한 서비스를 모사", color: P[2] },
  { label: "SOURCE", value: "실제 트래픽", note: "시나리오로 합성하지 않음", color: P[3] },
];

const prep = [
  { no: "1", title: "피처 추출", desc: "출발지 IP·포트, 프로토콜, 바이트 수 등 22개 네트워크 흐름 피처 선택", out: "→ 22 features", arrow: true },
  { no: "2", title: "정제 및 변환", desc: "결측치 zero-filling, 수치형 정규화, 범주형 인코딩 적용", out: "→ clean dataset", arrow: true },
  { no: "3", title: "라벨 분류", desc: "공격 특성에 따라 Recon·Brute Force·Intrusion·Malware·Etc 5개 클래스로 분류", out: "→ 5 classes", arrow: false },
];

const aiStats = [
  { label: "ACCURACY", value: "0.9995", note: "LightGBM 5개 라벨 분류 Accuracy (v5)", color: P[0] },
  { label: "F1 SCORE", value: "0.9981", note: "Macro F1 Score (v5)", color: P[1] },
  { label: "REPORT ENGINE", value: "Claude", note: "위협 원인·위험도·대응 방안 한국어 리포트 생성", color: P[2] },
];

const stack = [
  { label: "허니팟 · 수집", icon: ShieldCheck, color: P[0], items: ["T-Pot", "Suricata", "Cowrie", "p0f", "Logstash"] },
  { label: "저장 · 검색", icon: Database, color: P[1], items: ["Elasticsearch", "PostgreSQL"] },
  { label: "데이터 처리 · ML", icon: Cpu, color: P[2], items: ["Python", "Pandas", "LightGBM"] },
  { label: "AI 분석", icon: Sparkle, color: P[3], items: ["Anthropic Claude API", "Server-Sent Events"] },
  { label: "백엔드", icon: HardDrives, color: P[0], items: ["Spring Boot", "Spring Security (JWT)", "JPA"] },
  { label: "프론트엔드", icon: Browsers, color: P[1], items: ["Next.js", "TypeScript", "Tailwind CSS"] },
];

const features = [
  { no: "001", tag: "STREAM", title: "LLM 실시간 스트리밍", desc: "Claude API의 위협 분석 결과를 SSE로 받아 리포트가 작성되는 과정을 그대로 보여준다.", highlight: true },
  { no: "002", tag: "VISUALIZE", title: "공격 흐름 시각화", desc: "수집된 공격 데이터를 그래프로 재구성해 공격 경로와 빈도를 한눈에 파악한다.", highlight: false },
  { no: "003", tag: "CLASSIFY", title: "5개 클래스 자동 분류", desc: "LightGBM이 공격 유형을 실시간으로 예측하고 라벨을 자동으로 태깅한다.", highlight: false },
  { no: "004", tag: "MITRE", title: "MITRE ATT&CK 매핑", desc: "탐지된 공격을 MITRE ATT&CK 상위 기법에 대응시켜 대응 방안을 제시한다.", highlight: false },
  { no: "005", tag: "PDF", title: "PDF 리포트 자동 생성", desc: "위협 분석 리포트를 정리된 PDF 문서로 즉시 출력한다.", highlight: false },
  { no: "006", tag: "AUTH", title: "Spring 기반 인증 연동", desc: "RESTful API와 JWT 인증으로 위협 콘솔 접근을 안전하게 제어한다.", highlight: false },
];

const team = [
  { color: P[0], photo: "/team/lee-hyun.png", name: "이현", role: "TEAM LEAD / AI", focus: "AI 설계 및 구현, 데이터셋 전처리 및 학습", social: "@liiillh_", contact: "atom11201202@gmail.com" },
  { color: P[1], photo: "/team/kim-donghyun.png", name: "김동현", role: "HONEYPOT / INTEGRATION", focus: "허니팟 구축 및 로그 수집, 프로젝트 통합", social: "@_.29i8", contact: "kdh200022@gmail.com" },
  { color: P[2], photo: "/team/hong-youngjae.png", name: "홍영재", role: "LLM / FRONTEND", focus: "LLM 설계, 프론트엔드 구축", social: "@h2_zerojae", contact: "evan3055@naver.com" },
  { color: P[3], photo: "/team/lee-jaemin.png", name: "이재민", role: "BACKEND / DATABASE", focus: "백엔드 및 데이터베이스(DB) 구축", social: "@dlwoals02", contact: "ljm5021@naver.com" },
];

function SectionKicker({ no, label, suffix }: { no: string; label: string; suffix?: string }) {
  return (
    <div
      data-reveal
      className="flex items-center gap-4 font-mono text-[10.5px] tracking-[0.22em] text-text/42"
    >
      <span className="text-accent">{no}</span>
      <span>{label}</span>
      <span data-rule className="h-px flex-1 bg-text/12" />
      {suffix && <span>{suffix}</span>}
    </div>
  );
}

function Watermark({ no }: { no: string }) {
  return (
    <span
      className="hidden font-display font-bold leading-[0.8] tracking-[-0.05em] text-transparent sm:block"
      style={{
        fontSize: "clamp(56px, 10vw, 150px)",
        WebkitTextStroke: "1.4px rgba(244,244,241,0.18)",
      }}
    >
      {no}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <IntroCurtain />
      <ScrollHud />
      <RevealObserver />
      <Nav />

      <main id="top" className="relative min-h-screen overflow-x-hidden bg-bg text-text">
        {/* Hero */}
        <section
          id="hero"
          className="relative overflow-hidden"
          style={{ padding: "clamp(96px, 16vh, 168px) clamp(16px, 3vw, 40px) clamp(52px, 8vh, 96px)" }}
        >
          <HeroBackdrop />

          <div
            data-reveal
            className="relative z-[1] flex flex-wrap items-start justify-between gap-5 font-mono text-[10.5px] tracking-[0.2em] text-text/42"
          >
            <span
              className="inline-flex items-center gap-3 font-sans font-bold text-white"
              style={{
                fontSize: "clamp(17px, 1.9vw, 24px)",
                letterSpacing: "-0.015em",
                textShadow: "0 2px 18px rgba(6,6,7,0.95), 0 0 6px rgba(6,6,7,0.9)",
              }}
            >
              <span className="block size-2.5 rounded-full bg-accent" />
              허니팟 기반 사이버 공격 분석 시스템
            </span>
            <span className="rounded-full border border-text/20 bg-bg px-3.5 py-1.5 font-medium text-text">
              2026 CAPSTONE / GRADUATION PROJECT
            </span>
          </div>

          <h1
            className="relative z-[1] mt-6 grid font-display font-bold leading-none tracking-[-0.045em]"
            style={{ fontSize: "clamp(40px, 8.4vw, 132px)" }}
          >
            <span className="block overflow-hidden pb-[0.04em]">
              <span className="block" style={{ animation: "k-line 1.1s 1.5s cubic-bezier(.16,1,.3,1) both" }}>
                공격을 유인하고,
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <span
                className="flex items-start gap-[0.24em]"
                style={{ animation: "k-line 1.1s 1.64s cubic-bezier(.16,1,.3,1) both" }}
              >
                <span className="text-transparent" style={{ WebkitTextStroke: "1.4px rgba(244,244,241,0.55)" }}>
                  패턴을
                </span>
                <span className="block h-[1.06em] overflow-hidden text-accent">
                  <span
                    className="block"
                    style={{ animation: "k-roll 9s 2.9s cubic-bezier(.76,0,.24,1) infinite" }}
                  >
                    <span className="block h-[1.06em]">학습한다.</span>
                    <span className="block h-[1.06em]">분류한다.</span>
                    <span className="block h-[1.06em]">해설한다.</span>
                    <span className="block h-[1.06em]">학습한다.</span>
                  </span>
                </span>
              </span>
            </span>
          </h1>

          <div data-reveal className="relative z-[1] mt-4.5 flex flex-wrap items-center gap-3">
            <span
              className="inline-block rounded-full bg-accent px-4 py-2 font-mono text-[10.5px] font-medium tracking-[0.16em] text-bg"
              style={{ rotate: "-4deg" }}
            >
              CAPSTONE 2026
            </span>
            <span className="font-mono text-[10.5px] tracking-[0.2em] text-text/38">
              HONEYPOT × MACHINE LEARNING × LLM
            </span>
          </div>

          <div data-reveal className="relative z-[1] mt-6 sm:mt-11">
            <p
              className="max-w-[46ch] font-sans leading-[1.85] text-text/66"
              style={{ fontSize: "clamp(14px, 1.2vw, 17px)" }}
            >
              전 세계에서 들어오는 실제 공격 트래픽을 허니팟으로 수집하고, LightGBM과 Claude가 자동으로
              공격 유형을 분류하고 한국어로 해설하는 시스템입니다.
            </p>
          </div>

          <div
            data-reveal
            className="relative z-[1] mt-9 grid gap-2.5 sm:mt-16"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}
          >
            {heroSpecs.map((s) => (
              <div
                key={s.label}
                className="card-lift grid gap-2 rounded-[20px] border border-text/10 bg-panel p-5.5"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-text/40">| {s.label}</span>
                <span
                  className="font-bold tracking-[-0.03em]"
                  style={{ fontSize: "clamp(24px, 2.6vw, 34px)", color: s.color }}
                >
                  {s.value}
                </span>
                <span className="font-sans text-xs leading-relaxed text-text/50">{s.note}</span>
              </div>
            ))}
          </div>
        </section>

        <Marquee text="25 HONEYPOTS · T-POT · LIGHTGBM · CLAUDE REPORT · NEXT.JS DASHBOARD ·" />

        {/* Sample log feed */}
        <section style={{ padding: "clamp(40px, 7vh, 80px) clamp(16px, 3vw, 40px) 0" }}>
          <div data-reveal>
            <LiveFeed />
          </div>
        </section>

        {/* Problem */}
        <section style={{ padding: "clamp(72px, 12vh, 140px) clamp(16px, 3vw, 40px)" }}>
          <SectionKicker no="001" label="ISSUE" />
          <div
            className="mt-6 grid sm:mt-12"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(28px, 5vw, 80px)" }}
          >
            <div data-reveal>
              <span className="mb-3.5 block font-mono text-[11px] tracking-[0.2em] text-accent">WHY SLOW</span>
              <h2
                className="font-display font-bold leading-[1.04] tracking-[-0.04em]"
                style={{ fontSize: "clamp(28px, 4.2vw, 62px)" }}
              >
                탐지가 느린 이유는
                <br />
                <span className="text-accent">데이터가 아니라</span>
                <br />
                해석이다
              </h2>
              <p className="mt-6 max-w-[44ch] font-sans text-[14.5px] leading-[1.9] text-text/60">
                침입 탐지는 보통 로그를 사람이 읽고 판단해야 해서 느리고, 공격 유형 분류 모델을 학습시킬
                실제 공격 트래픽도 구하기 어렵습니다.
              </p>
            </div>
            <div className="grid gap-2.5">
              {problems.map((p) => (
                <div
                  key={p.no}
                  data-reveal
                  className="card-lift grid grid-cols-[62px_1fr] gap-4 rounded-[22px] border border-text/10 bg-panel p-6 sm:p-7.5"
                >
                  <span className="font-mono text-xs tracking-[0.16em] text-accent">{p.no}</span>
                  <div>
                    <h3
                      className="font-sans font-semibold leading-[1.45]"
                      style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2.5 font-sans text-[13px] leading-[1.8] text-text/54">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pipeline */}
        <section
          id="pipeline"
          className="border-y border-text/8 bg-panel-2"
          style={{ padding: "clamp(60px, 10vh, 120px) clamp(16px, 3vw, 40px)" }}
        >
          <SectionKicker no="002" label="PIPELINE" suffix="9 STAGES" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 sm:mt-12">
            <div data-reveal>
              <span className="mb-3.5 block font-mono text-[11px] tracking-[0.2em] text-accent">FLOW</span>
              <h2
                className="font-display font-bold leading-[1.05] tracking-[-0.04em]"
                style={{ fontSize: "clamp(28px, 4.2vw, 60px)" }}
              >
                공격이 들어와
                <br />
                리포트가 되기까지
              </h2>
              <p className="mt-5 max-w-[44ch] font-sans text-[14.5px] leading-[1.9] text-text/58">
                T-Pot 본체는 수정하지 않고, 분석 기능을 사이드카 컨테이너로 얹는다
              </p>
            </div>
            <Watermark no="002" />
          </div>

          <div className="relative mt-8 max-w-[1080px] sm:mt-16" style={{ paddingLeft: "clamp(22px, 3.4vw, 48px)" }}>
            <div className="absolute bottom-3.5 left-0 top-3.5 w-px bg-text/14" />
            <div className="grid gap-2.5">
              {pipeline.map((step, i) => (
                <div
                  key={step.no}
                  data-reveal
                  className="relative grid items-center gap-4 rounded-[20px] border border-text/9 bg-panel p-5 transition-all duration-300 ease-out hover:translate-x-1.5 hover:border-accent sm:gap-10 sm:p-6.5"
                  style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)" }}
                >
                  <span
                    className="absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-accent"
                    style={{ left: "calc(-1 * clamp(22px, 3.4vw, 48px))" }}
                  />
                  <div className="flex items-baseline gap-3.5">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-text/36">{step.no}</span>
                    <span
                      className="font-sans font-semibold tracking-[-0.02em]"
                      style={{ fontSize: "clamp(17px, 1.9vw, 25px)" }}
                    >
                      {step.title}
                    </span>
                  </div>
                  <div className="grid gap-1.5">
                    <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: hue(i) }}>
                      {step.tag}
                    </span>
                    <span className="font-sans text-[13px] leading-[1.75] text-text/56">{step.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data collection */}
        <section id="data" style={{ padding: "clamp(72px, 12vh, 140px) clamp(16px, 3vw, 40px)" }}>
          <SectionKicker no="003" label="DATA COLLECTION" />
          <div className="mt-6 flex flex-wrap items-end gap-6 sm:mt-12" style={{ gap: "clamp(16px, 3vw, 48px)" }}>
            <span
              data-reveal
              className="block font-display font-bold leading-[0.8] tracking-[-0.06em]"
              style={{ fontSize: "clamp(84px, 17vw, 230px)", animation: "k-float 6s ease-in-out infinite" }}
            >
              20<span className="text-accent">+</span>
            </span>
            <div data-reveal className="grid gap-2.5 pb-1.5 sm:pb-5.5">
              <span className="font-mono text-[10.5px] tracking-[0.18em] text-text/42">| HONEYPOT CONTAINERS</span>
              <span className="font-sans font-semibold" style={{ fontSize: "clamp(17px, 1.9vw, 23px)" }}>
                허니팟 컨테이너 20대 이상 상시 운용
              </span>
              <span className="max-w-[44ch] font-sans text-[13.5px] leading-[1.8] text-text/56">
                SSH·웹·DB·산업제어(ICS) 등 서비스별 허니팟 25종을 배포하고, Suricata·p0f·Cowrie 등
                센서가 원본 로그를 Logstash를 거쳐 Elasticsearch로 모읍니다.
              </span>
            </div>
          </div>
          <div
            data-reveal
            className="mt-7 grid overflow-hidden rounded-[24px] border border-text/10 bg-panel sm:mt-14"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
          >
            {dataStats.map((d) => (
              <div key={d.label} className="grid gap-2.5 border-l border-text/9 p-6 first:border-l-0 sm:p-9">
                <span className="font-mono text-[10px] tracking-[0.18em] text-text/40">| {d.label}</span>
                <span
                  className="font-bold tracking-[-0.035em]"
                  style={{ fontSize: "clamp(22px, 3.2vw, 40px)", color: d.color }}
                >
                  {d.value}
                </span>
                <span className="font-sans text-[12.5px] text-text/50">{d.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Preprocessing */}
        <section
          className="border-y border-text/8 bg-panel-2"
          style={{ padding: "clamp(60px, 10vh, 120px) clamp(16px, 3vw, 40px)" }}
        >
          <SectionKicker no="004" label="PREPROCESSING" />
          <h2
            data-reveal
            className="mt-6 font-display font-bold tracking-[-0.035em] sm:mt-11"
            style={{ fontSize: "clamp(24px, 3.2vw, 44px)" }}
          >
            원본 로그를 학습 가능한 형태로
          </h2>
          <div className="mt-7 flex flex-wrap items-stretch sm:mt-13">
            {prep.map((p) => (
              <Fragment key={p.no}>
                <div data-reveal className="flex min-w-[240px] flex-1 basis-[260px] items-stretch">
                  <div className="card-lift flex-1 grid content-start gap-3 rounded-[22px] border border-text/10 bg-panel p-6 sm:p-8">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-text/40">STEP {p.no}</span>
                    <span className="font-sans font-semibold" style={{ fontSize: "clamp(17px, 1.9vw, 22px)" }}>
                      {p.title}
                    </span>
                    <span className="font-sans text-[13px] leading-[1.8] text-text/55">{p.desc}</span>
                    <span className="font-mono text-[11px] text-accent">{p.out}</span>
                  </div>
                  {p.arrow && (
                    <div className="flex items-center justify-center px-2 font-mono text-base text-text/38 sm:w-[54px]">
                      →
                    </div>
                  )}
                </div>
              </Fragment>
            ))}
          </div>
        </section>

        {/* AI engine */}
        <section id="ai" style={{ padding: "clamp(72px, 12vh, 140px) clamp(16px, 3vw, 40px)" }}>
          <SectionKicker no="005" label="AI ENGINE" />
          <div
            className="mt-6 grid items-end sm:mt-12"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(24px, 4vw, 72px)" }}
          >
            <div data-reveal>
              <span className="mb-3.5 block font-mono text-[11px] tracking-[0.2em] text-accent">ENGINE</span>
              <h2
                className="font-display font-bold leading-[1.05] tracking-[-0.04em]"
                style={{ fontSize: "clamp(28px, 4.2vw, 58px)" }}
              >
                LightGBM과{" "}
                <span className="text-transparent" style={{ WebkitTextStroke: "1.4px rgba(244,244,241,0.5)" }}>
                  Claude
                </span>
                를
                <br />한 흐름으로
              </h2>
            </div>
            <p data-reveal className="max-w-[46ch] font-sans text-[14.5px] leading-[1.9] text-text/58">
              LightGBM이 공격 유형과 위험도를 판정하고, Claude가 판정 결과와 원본 로그를 함께 읽어 분석
              리포트와 대응 가이드를 스트리밍으로 생성합니다.
            </p>
          </div>
          <div
            data-reveal
            className="mt-7 grid overflow-hidden rounded-[26px] border border-text/12 bg-panel sm:mt-14"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {aiStats.map((a) => (
              <div key={a.label} className="grid gap-3 border-l border-text/9 p-7 first:border-l-0 sm:p-11">
                <span className="font-mono text-[10px] tracking-[0.18em] text-text/40">| {a.label}</span>
                <span
                  className="font-bold leading-none tracking-[-0.045em]"
                  style={{ fontSize: "clamp(36px, 4.6vw, 64px)", color: a.color }}
                >
                  {a.value}
                </span>
                <span className="font-sans text-[12.5px] leading-[1.7] text-text/50">{a.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section
          id="stack"
          className="border-y border-text/8 bg-panel-2"
          style={{ padding: "clamp(60px, 10vh, 120px) clamp(16px, 3vw, 40px)" }}
        >
          <SectionKicker no="006" label="TECH STACK" />
          <div className="mt-6 grid gap-2.5 sm:mt-11">
            {stack.map((g) => {
              const Icon = g.icon;
              return (
              <div
                key={g.label}
                data-reveal
                className="grid items-center gap-3.5 rounded-[22px] border border-text/9 bg-panel p-5 sm:p-7.5"
                style={{ gridTemplateColumns: "minmax(0,1fr)" }}
              >
                <span
                  className="flex items-center gap-2.5 font-sans font-semibold tracking-[-0.02em]"
                  style={{ fontSize: "clamp(17px, 1.9vw, 25px)", color: g.color }}
                >
                  <Icon weight="light" className="size-[0.85em] shrink-0" />
                  {g.label}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-text/16 px-4.5 py-2.5 font-mono text-sm text-text/90 transition-all duration-300 hover:-translate-y-[2px] hover:border-accent hover:bg-accent hover:text-bg"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </section>

        {/* Implementation */}
        <section id="implementation" style={{ padding: "clamp(72px, 12vh, 140px) clamp(16px, 3vw, 40px)" }}>
          <SectionKicker no="007" label="IMPLEMENTATION" suffix="6 FEATURES" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 sm:mt-12">
            <div data-reveal>
              <span className="mb-3.5 block font-mono text-[11px] tracking-[0.2em] text-accent">SCREENS</span>
              <h2 className="font-display font-bold tracking-[-0.04em]" style={{ fontSize: "clamp(28px, 4.2vw, 58px)" }}>
                구현 결과
              </h2>
            </div>
            <Watermark no="007" />
          </div>
          <div
            className="mt-7 grid gap-2.5 sm:mt-13"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))" }}
          >
            {features.map((f) => (
              <div
                key={f.no}
                data-reveal
                className={`card-lift grid content-start gap-3 rounded-[24px] border p-6 sm:p-9 ${
                  f.highlight
                    ? "border-accent bg-accent text-bg"
                    : "border-text/10 bg-panel text-text"
                }`}
                style={{ minHeight: 240 }}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] opacity-55">
                  {f.no} / {f.tag}
                </span>
                <span
                  className="font-sans font-semibold leading-[1.35]"
                  style={{ fontSize: "clamp(18px, 2vw, 24px)" }}
                >
                  {f.title}
                </span>
                <span className="font-sans text-[13.5px] leading-[1.8] opacity-66">{f.desc}</span>
                {f.highlight && <TypewriterStream />}
              </div>
            ))}
          </div>
        </section>

        {/* Demo video */}
        <section
          id="demo"
          className="border-t border-text/8"
          style={{ padding: "clamp(72px, 12vh, 140px) clamp(16px, 3vw, 40px)" }}
        >
          <SectionKicker no="008" label="DEMO" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6 sm:mt-12">
            <div data-reveal>
              <span className="mb-3.5 block font-mono text-[11px] tracking-[0.2em] text-accent">VIDEO</span>
              <h2 className="font-display font-bold tracking-[-0.04em]" style={{ fontSize: "clamp(28px, 4.2vw, 58px)" }}>
                시연 영상
              </h2>
            </div>
            <Watermark no="008" />
          </div>
          <div
            data-reveal
            className="mt-7 grid aspect-video w-full max-w-[1080px] place-items-center rounded-[24px] border border-dashed border-text/16 bg-panel sm:mt-13"
          >
            <div className="grid justify-items-center gap-4 text-center">
              <span className="flex size-16 items-center justify-center rounded-full border border-accent text-accent">
                <Play size={26} weight="fill" />
              </span>
              <span className="font-mono text-[11px] tracking-[0.18em] text-text/45">COMING SOON</span>
              <span className="font-sans text-sm text-text/60">시연 영상이 이곳에 들어갈 예정입니다</span>
            </div>
          </div>
        </section>

        {/* Team */}
        <section
          id="team"
          className="border-t border-text/8 bg-panel-2"
          style={{ padding: "clamp(60px, 10vh, 120px) clamp(16px, 3vw, 40px)" }}
        >
          <SectionKicker no="009" label="TEAM" suffix="4 MEMBERS" />
          <div
            className="mt-7 grid gap-2.5 sm:mt-13"
            style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}
          >
            {team.map((m) => (
              <div
                key={m.name}
                data-reveal
                className="card-lift grid content-start gap-3.5 rounded-[24px] border border-text/10 bg-panel p-6 sm:p-8"
              >
                <Image
                  src={m.photo}
                  alt={`${m.name} 캐릭터`}
                  width={480}
                  height={405}
                  className="size-[96px] rounded-[18px] border object-contain"
                  style={{
                    borderColor: `color-mix(in srgb, ${m.color} 45%, transparent)`,
                    background: `color-mix(in srgb, ${m.color} 8%, transparent)`,
                  }}
                />
                <div className="grid gap-1">
                  <span className="font-sans text-lg font-semibold">{m.name}</span>
                  <span className="font-mono text-[10.5px] tracking-[0.14em]" style={{ color: m.color }}>
                    {m.role}
                  </span>
                </div>
                <span className="font-sans text-[12.5px] leading-[1.75] text-text/54">{m.focus}</span>
                <div className="grid gap-1">
                  <a
                    href={`https://instagram.com/${m.social.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all font-mono text-[11.5px] text-text/42 transition-colors hover:text-accent"
                  >
                    {m.social}
                  </a>
                  <a
                    href={`mailto:${m.contact}`}
                    className="break-all font-mono text-[11.5px] text-text/42 transition-colors hover:text-accent"
                  >
                    {m.contact}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-7 flex justify-center sm:mt-12">
            <a
              href="https://github.com/Donghyun0918/honeypot-threat-analyzer"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-mono text-[12.5px] font-medium tracking-[0.1em] text-bg transition-transform duration-300 hover:-translate-y-[3px]"
            >
              #githubrepository ↗
            </a>
          </div>
        </section>

        <Marquee
          text="#STAYSECURE · T-POT · COWRIE · SURICATA · 0.9995 ACCURACY · SPRING BOOT + LIGHTGBM ·"
          direction="right"
          variant="subtle"
        />

        <footer style={{ padding: "clamp(44px, 8vh, 96px) clamp(16px, 3vw, 40px) 64px" }}>
          <ParallaxWord>
            <div
              className="font-display font-bold leading-[0.86] tracking-[-0.06em]"
              style={{ fontSize: "clamp(28px, 7.5vw, 110px)" }}
            >
              정사평<span className="text-accent">.</span>
            </div>
          </ParallaxWord>
          <div className="mt-6.5 flex flex-wrap justify-between gap-4 font-mono text-[11px] tracking-[0.14em] text-text/40">
            <span>허니팟 기반 사이버 공격 분석 시스템 · JBU Univ. 졸업작품</span>
            <span>정사평 / 2026</span>
          </div>
        </footer>
      </main>
    </>
  );
}
