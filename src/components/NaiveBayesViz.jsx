import { useState, useEffect } from "react";

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => { const c = () => setM(window.innerWidth <= 640); c(); window.addEventListener("resize", c); return () => window.removeEventListener("resize", c); }, []);
  return m;
}

const TH = {
  light: {
    bg: "#faf8f5", bg2: "#fff", bg3: "#f3f0eb", code: "#eae7e0",
    card: "#ffffff", cardBorder: "rgba(0,0,0,0.07)",
    text: "#1a1a2e", sub: "#5a5a70", dim: "#9a9aaa",
    accent: "#4361ee", accent2: "#7209b7", accent3: "#06d6a0", accent4: "#ef476f",
    warm: "#f4a261", blue: "#4895ef", green: "#06d6a0", red: "#ef476f",
    purple: "#7209b7", pink: "#f72585", orange: "#fb8500", cyan: "#00b4d8",
    gold: "#e9c46a",
    glow: "rgba(67,97,238,0.06)", shadow: "0 8px 32px rgba(0,0,0,0.06)",
    divider: "rgba(0,0,0,0.06)",
  },
  dark: {
    bg: "#0c0f1a", bg2: "#111827", bg3: "#1a1f33", code: "#0d1020",
    card: "rgba(22,27,52,0.9)", cardBorder: "rgba(255,255,255,0.06)",
    text: "#e8ecf4", sub: "#94a0b8", dim: "#4a5568",
    accent: "#818cf8", accent2: "#c084fc", accent3: "#34d399", accent4: "#fb7185",
    warm: "#fbbf24", blue: "#60a5fa", green: "#34d399", red: "#fb7185",
    purple: "#c084fc", pink: "#f472b6", orange: "#fb923c", cyan: "#22d3ee",
    gold: "#fbbf24",
    glow: "rgba(129,140,248,0.08)", shadow: "0 8px 32px rgba(0,0,0,0.4)",
    divider: "rgba(255,255,255,0.05)",
  },
};

const SECTIONS = [
  { id: "prob", label: "Probabilitas", icon: "🎲" },
  { id: "cond", label: "Conditional", icon: "🔀" },
  { id: "bayes", label: "Bayes", icon: "⚡" },
  { id: "likelihood", label: "Likelihood", icon: "📊" },
  { id: "nb", label: "Naive Bayes", icon: "🤖" },
  { id: "train", label: "NB Training", icon: "🏋️" },
  { id: "test", label: "NB Testing", icon: "🧪" },
  { id: "problems", label: "Masalah NB", icon: "⚠️" },
  { id: "quiz", label: "Latihan", icon: "📝" },
];

const Badge = ({ children, color }) => (
  <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: color + "18", color, fontSize: 10, fontWeight: 700, letterSpacing: 0.5, border: "1px solid " + color + "30" }}>{children}</span>
);

const Formula = ({ children, t, color }) => (
  <div style={{ display: "inline-block", padding: "10px 18px", borderRadius: 12, background: (color || t.accent) + "0a", border: "1.5px solid " + (color || t.accent) + "25", fontFamily: "'IBM Plex Mono', monospace", fontSize: 15, color: color || t.accent, fontWeight: 600, margin: "6px 0", letterSpacing: 0.3 }}>{children}</div>
);

const Insight = ({ children, t, icon = "💡" }) => (
  <div style={{ margin: "14px 0", padding: "14px 18px", borderRadius: 14, background: t.warm + "0a", borderLeft: "4px solid " + t.warm, display: "flex", gap: 10, alignItems: "flex-start" }}>
    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</span>
    <div style={{ fontSize: 13, color: t.text, lineHeight: 1.7 }}>{children}</div>
  </div>
);

const Card = ({ children, t, color, glow, style: s }) => (
  <div style={{ background: t.card, border: "1px solid " + t.cardBorder, borderRadius: 18, padding: 24, position: "relative", overflow: "hidden", boxShadow: glow ? "0 0 40px " + (color || t.accent) + "12" : t.shadow, ...s }}>
    {color && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, " + color + ", " + color + "40)" }} />}
    {children}
  </div>
);

const StepNum = ({ n, color }) => (
  <div style={{ width: 28, height: 28, borderRadius: "50%", background: color + "18", border: "2px solid " + color + "40", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 800, color, flexShrink: 0 }}>{n}</div>
);

function VennSVG({ t }) {
  const [hover, setHover] = useState(null);
  const info = { a: { label: "Event A", desc: "Hujan besok", color: t.blue }, b: { label: "Event B", desc: "Mendung besok", color: t.purple }, ab: { label: "A ∩ B", desc: "Hujan DAN mendung", color: t.accent4 } };
  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox="0 0 340 220" style={{ width: "100%", maxWidth: 360 }}>
        <rect x={10} y={10} width={320} height={200} rx={16} fill="none" stroke={t.dim + "40"} strokeWidth={1.5} strokeDasharray="6 4" />
        <text x={30} y={32} fill={t.dim} fontSize={11} fontWeight={600}>Ω (Sample Space)</text>
        <circle cx={140} cy={115} r={70} fill={hover === "a" || hover === "ab" ? t.blue + "25" : t.blue + "10"} stroke={t.blue} strokeWidth={2} style={{ cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={() => setHover("a")} onMouseLeave={() => setHover(null)} />
        <text x={105} y={110} fill={t.blue} fontSize={13} fontWeight={700}>A</text>
        <circle cx={210} cy={115} r={70} fill={hover === "b" || hover === "ab" ? t.purple + "25" : t.purple + "10"} stroke={t.purple} strokeWidth={2} style={{ cursor: "pointer", transition: "all 0.3s" }} onMouseEnter={() => setHover("b")} onMouseLeave={() => setHover(null)} />
        <text x={235} y={110} fill={t.purple} fontSize={13} fontWeight={700}>B</text>
        <text x={175} y={118} fill={t.accent4} fontSize={11} fontWeight={700} textAnchor="middle" style={{ cursor: "pointer" }} onMouseEnter={() => setHover("ab")} onMouseLeave={() => setHover(null)}>A∩B</text>
      </svg>
      {hover && info[hover] && <div style={{ fontSize: 13, color: info[hover].color, fontWeight: 600, marginTop: 4 }}>{info[hover].label}: {info[hover].desc}</div>}
    </div>
  );
}

function WeatherCalendar({ t }) {
  const days = ["☁️","☁️","☁️","☀️","🌧️","☀️","☁️","☀️","☁️","☀️","☀️","☁️","🌧️","☁️","🌧️","🌧️","🌧️","🌧️","☁️","☀️","🌧️","☁️","☀️","☀️","☁️","☀️","☁️","☀️","☀️","☁️","🌧️"];
  const [filter, setFilter] = useState(null);
  const rainy = days.filter(d => d === "🌧️").length;
  const cloudy = days.filter(d => d === "☁️").length;
  const sunny = days.filter(d => d === "☀️").length;
  const types = [
    { icon: "🌧️", n: rainy, label: "Rainy", color: t.blue },
    { icon: "☁️", n: cloudy, label: "Cloudy", color: t.dim },
    { icon: "☀️", n: sunny, label: "Sunny", color: t.warm },
  ];
  const activeType = types.find(w => w.icon === filter);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 10 }}>
        {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, color: t.dim, fontWeight: 600, padding: 2 }}>{d}</div>
        ))}
        {days.map((d, i) => {
          const isHighlighted = filter === null || d === filter;
          const isFaded = filter !== null && d !== filter;
          return (
            <div key={i} onClick={() => setFilter(filter === d ? null : d)} style={{
              width: "100%", aspectRatio: "1", borderRadius: 8,
              background: isHighlighted ? (d === "🌧️" ? t.blue + "20" : d === "☁️" ? t.dim + "15" : t.warm + "20") : t.bg3,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              border: isHighlighted && filter ? "2px solid " + (d === "🌧️" ? t.blue : d === "☁️" ? t.dim : t.warm) : "1px solid " + t.cardBorder,
              opacity: isFaded ? 0.25 : 1, cursor: "pointer", transition: "all 0.2s",
              transform: isHighlighted && filter ? "scale(1.08)" : "scale(1)",
            }}>{d}</div>
          );
        })}
      </div>
      {filter && activeType && (
        <div style={{ textAlign: "center", padding: "8px 12px", borderRadius: 10, background: activeType.color + "10", border: "1px solid " + activeType.color + "30", marginBottom: 10, animation: "fadeIn 0.2s" }}>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: activeType.color, fontWeight: 700 }}>
            P({activeType.label}) = {activeType.n} / 31 = <strong style={{ fontSize: 16 }}>{(activeType.n / 31).toFixed(3)}</strong>
          </div>
          <div style={{ fontSize: 10, color: t.sub, marginTop: 2 }}>Klik lagi untuk reset, atau klik cuaca lain</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {types.map(w => (
          <button key={w.label} onClick={() => setFilter(filter === w.icon ? null : w.icon)} style={{
            textAlign: "center", padding: "8px 14px", borderRadius: 10,
            background: filter === w.icon ? w.color + "20" : w.color + "0a",
            border: filter === w.icon ? "2px solid " + w.color : "1px solid " + w.color + "25",
            cursor: "pointer", transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 20 }}>{w.icon}</div>
            <div style={{ fontFamily: "monospace", fontWeight: 800, color: w.color, fontSize: 15 }}>{w.n}/31</div>
            <div style={{ fontSize: 10, color: t.sub }}>{w.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function BayesFlowSVG({ t, isMobile }) {
  const bw = isMobile ? 90 : 120, bh = 50, gap = isMobile ? 12 : 30;
  const w = bw * 3 + gap * 4, h = 180;
  const boxes = [
    { x: gap, y: 20, label: "Prior", sub: "P(C)", color: t.blue, desc: "Keyakinan AWAL" },
    { x: gap + bw + gap, y: 20, label: "Likelihood", sub: "P(X|C)", color: t.purple, desc: "Data cocok?" },
    { x: gap * 2 + bw * 2 + gap, y: 20, label: "Posterior", sub: "P(C|X)", color: t.green, desc: "Keyakinan BARU" },
  ];
  return (
    <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: 520 }}>
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={bw} height={bh} rx={12} fill={b.color + "12"} stroke={b.color} strokeWidth={2} />
          <text x={b.x + bw / 2} y={b.y + 20} textAnchor="middle" fill={b.color} fontSize={11} fontWeight={700}>{b.label}</text>
          <text x={b.x + bw / 2} y={b.y + 38} textAnchor="middle" fill={b.color} fontSize={13} fontWeight={800} fontFamily="monospace">{b.sub}</text>
          <text x={b.x + bw / 2} y={b.y + bh + 18} textAnchor="middle" fill={t.sub} fontSize={9}>{b.desc}</text>
          {i < 2 && (<line x1={b.x + bw + 4} y1={b.y + bh / 2} x2={boxes[i + 1].x - 4} y2={boxes[i + 1].y + bh / 2} stroke={t.dim} strokeWidth={2} />)}
        </g>
      ))}
      <text x={w / 2} y={h - 20} textAnchor="middle" fill={t.accent} fontSize={12} fontWeight={700} fontFamily="monospace">P(C|X) = P(X|C) × P(C) / P(X)</text>
    </svg>
  );
}

function LikelihoodCurve({ t }) {
  const [hoverP, setHoverP] = useState(null);
  const w = 360, h = 180, px = 40, py = 20;
  const points = [];
  for (let i = 0; i <= 50; i++) { const p = i / 50; points.push({ p, l: 5 * Math.pow(p, 4) * Math.pow(1 - p, 1) }); }
  const maxL = Math.max(...points.map(pt => pt.l));
  const toX = p => px + p * (w - px - 10);
  const toY = l => h - py - (l / maxL) * (h - py - 20);
  const pathD = points.map((pt, i) => (i === 0 ? "M" : "L") + toX(pt.p) + "," + toY(pt.l)).join(" ");
  return (
    <div>
      <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: 380 }}>
        <line x1={px} y1={h - py} x2={w - 10} y2={h - py} stroke={t.dim + "40"} strokeWidth={1} />
        <line x1={px} y1={10} x2={px} y2={h - py} stroke={t.dim + "40"} strokeWidth={1} />
        <text x={w / 2} y={h - 2} textAnchor="middle" fill={t.sub} fontSize={10}>probability of heads (p)</text>
        <path d={pathD} fill="none" stroke={t.accent} strokeWidth={2.5} strokeLinecap="round" />
        <line x1={toX(0.8)} y1={10} x2={toX(0.8)} y2={h - py} stroke={t.green} strokeWidth={1.5} strokeDasharray="4 3" />
        <circle cx={toX(0.8)} cy={toY(5 * Math.pow(0.8, 4) * 0.2)} r={5} fill={t.green} />
        <text x={toX(0.8)} y={8} textAnchor="middle" fill={t.green} fontSize={9} fontWeight={700}>MLE = 0.8</text>
      </svg>
      <div style={{ textAlign: "center", fontSize: 11, color: t.sub, marginTop: 4 }}>Data: 4H 1T → L(p) = 5p⁴(1-p) → max di p=0.8</div>
    </div>
  );
}

function NBTreeSVG({ t }) {
  return (
    <svg viewBox="0 0 480 240" style={{ width: "100%", maxWidth: 500 }}>
      <rect x={190} y={10} width={100} height={40} rx={12} fill={t.accent + "15"} stroke={t.accent} strokeWidth={2} />
      <text x={240} y={35} textAnchor="middle" fill={t.accent} fontSize={12} fontWeight={700}>Class Y</text>
      {[80, 240, 400].map((fx, i) => (
        <g key={i}>
          <line x1={240} y1={50} x2={fx} y2={100} stroke={t.dim} strokeWidth={1.5} />
          <rect x={fx - 50} y={100} width={100} height={36} rx={10} fill={[t.blue, t.purple, t.green][i] + "12"} stroke={[t.blue, t.purple, t.green][i]} strokeWidth={1.5} />
          <text x={fx} y={122} textAnchor="middle" fill={[t.blue, t.purple, t.green][i]} fontSize={11} fontWeight={600}>Feature X{i + 1}</text>
        </g>
      ))}
      <text x={160} y={165} textAnchor="middle" fill={t.red} fontSize={9} fontWeight={700}>❌ Independen!</text>
      <text x={320} y={165} textAnchor="middle" fill={t.red} fontSize={9} fontWeight={700}>❌ Independen!</text>
      <text x={240} y={200} textAnchor="middle" fill={t.text} fontSize={11} fontWeight={700} fontFamily="monospace">P(X|Y=c) = P(X₁|c) × P(X₂|c) × P(X₃|c)</text>
      <text x={240} y={225} textAnchor="middle" fill={t.sub} fontSize={10}>Asumsi naive: fitur independen given kelas</text>
    </svg>
  );
}

function GaussianVis({ t, mean, variance, x, label, color }) {
  const std = Math.sqrt(variance);
  const w = 200, h = 80, px = 10;
  const points = [];
  const lo = mean - 3.5 * std, hi = mean + 3.5 * std;
  for (let i = 0; i <= 60; i++) { const xv = lo + (i / 60) * (hi - lo); points.push({ x: xv, y: (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((xv - mean) / std, 2)) }); }
  const maxY = Math.max(...points.map(p => p.y));
  const toX = v => px + ((v - lo) / (hi - lo)) * (w - 2 * px);
  const toY = v => h - 15 - (v / maxY) * (h - 25);
  const pathD = points.map((p, i) => (i === 0 ? "M" : "L") + toX(p.x) + "," + toY(p.y)).join(" ");
  const xDensity = (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
  return (
    <div style={{ textAlign: "center" }}>
      <svg viewBox={"0 0 " + w + " " + h} style={{ width: "100%", maxWidth: 200 }}>
        <path d={pathD + " L" + toX(hi) + "," + (h - 15) + " L" + toX(lo) + "," + (h - 15) + " Z"} fill={color + "15"} />
        <path d={pathD} fill="none" stroke={color} strokeWidth={2} />
        <line x1={toX(x)} y1={5} x2={toX(x)} y2={h - 15} stroke={t.red} strokeWidth={1.5} strokeDasharray="3 2" />
        <circle cx={toX(x)} cy={toY(xDensity)} r={3.5} fill={t.red} />
        <text x={toX(mean)} y={h - 3} textAnchor="middle" fill={color} fontSize={8} fontWeight={600}>μ={mean}</text>
      </svg>
      <div style={{ fontSize: 10, color: t.sub }}>{label}</div>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: t.red, fontWeight: 700 }}>f({x}) ≈ {xDensity.toFixed(4)}</div>
    </div>
  );
}

function ProbSection({ t, isMobile }) {
  const [showAxioms, setShowAxioms] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent} glow>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: 2, marginBottom: 6 }}>KONSEP DASAR</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Apa itu Probabilitas?</div>
          <div style={{ fontSize: 14, color: t.sub, marginTop: 6 }}>Angka antara <strong style={{ color: t.accent }}>0</strong> (mustahil) dan <strong style={{ color: t.accent }}>1</strong> (pasti)</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 8 }}>🗓️ Contoh: Cuaca Januari</div>
            <WeatherCalendar t={t} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.purple, marginBottom: 8 }}>🔵 Himpunan & Event</div>
            <VennSVG t={t} />
            <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7, marginTop: 8 }}><strong style={{ color: t.text }}>Sample Space (Ω)</strong> = semua kemungkinan. <strong style={{ color: t.text }}>Event</strong> = sebagian dari Ω.</div>
          </div>
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 10 }}>
        {[
          { icon: "🎯", title: "Klasik", desc: "Semua outcome sama mungkin", ex: "Dadu fair → 1/6", color: t.blue, formula: "P(E) = |E| / |Ω|" },
          { icon: "📊", title: "Frekuensi Relatif", desc: "Dari data historis", ex: "9 hujan dari 31 → 9/31", color: t.purple, formula: "P(E) = #kejadian / #total" },
          { icon: "🧠", title: "Subjektif", desc: "Penilaian ahli", ex: "Dokter: 70% sembuh", color: t.green, formula: "P(E) = expert judgment" },
        ].map((m, i) => (
          <Card key={i} t={t} color={m.color} style={{ padding: 16 }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{m.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: m.color, marginBottom: 4 }}>{m.title}</div>
            <div style={{ fontSize: 12, color: t.sub, marginBottom: 8, lineHeight: 1.5 }}>{m.desc}</div>
            <div style={{ padding: "6px 10px", borderRadius: 8, background: m.color + "0a", fontFamily: "monospace", fontSize: 11, color: m.color, fontWeight: 600 }}>{m.formula}</div>
            <div style={{ fontSize: 11, color: t.dim, marginTop: 6, fontStyle: "italic" }}>→ {m.ex}</div>
          </Card>
        ))}
      </div>
      <Card t={t} style={{ padding: 18 }}>
        <div onClick={() => setShowAxioms(!showAxioms)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.text }}>📐 Aksioma & Aturan Probabilitas</div>
          <span style={{ color: t.dim, transition: "transform 0.3s", transform: showAxioms ? "rotate(180deg)" : "" }}>▾</span>
        </div>
        {showAxioms && (
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 8 }}>
            {[
              { name: "Non-negatif", formula: "P(A) ≥ 0", desc: "Probabilitas selalu positif", color: t.blue },
              { name: "Normalisasi", formula: "P(Ω) = 1", desc: "Total semua = 1", color: t.green },
              { name: "Union (OR)", formula: "P(A∪B) = P(A)+P(B)−P(A∩B)", desc: "A atau B terjadi", color: t.purple },
              { name: "Joint (AND)", formula: "P(A∩B) = P(A,B)", desc: "A dan B bersamaan", color: t.accent },
              { name: "Komplemen", formula: "P(Aᶜ) = 1 − P(A)", desc: "A TIDAK terjadi", color: t.red },
              { name: "Bounds", formula: "0 ≤ P(A) ≤ 1", desc: "Selalu 0 sampai 1", color: t.warm },
            ].map((r, i) => (
              <div key={i} style={{ padding: "10px 12px", borderRadius: 10, background: r.color + "06", borderLeft: "3px solid " + r.color + "40" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: r.color }}>{r.name}</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: t.text, margin: "4px 0" }}>{r.formula}</div>
                <div style={{ fontSize: 10, color: t.sub }}>{r.desc}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function CondSection({ t, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.purple} glow>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Conditional Probability</div>
          <div style={{ fontSize: 14, color: t.sub, marginTop: 4 }}>P(A) <strong style={{ color: t.purple }}>JIKA DIKETAHUI</strong> B sudah terjadi</div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 16 }}><Formula t={t} color={t.purple}>P(A|B) = P(A,B) / P(B)</Formula></div>
        <Insight t={t} icon="🌧️">P(besok hujan | hari ini mendung) ≠ P(besok hujan). Informasi baru mengubah probabilitas!</Insight>
      </Card>
      <Card t={t} color={t.blue}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.blue, marginBottom: 10 }}>🔗 Product Rule</div>
        <div style={{ textAlign: "center" }}><Formula t={t} color={t.blue}>P(A,B) = P(A|B) × P(B) = P(B|A) × P(A)</Formula></div>
        <Insight t={t} icon="🔑">Kedua bentuk hasilnya SAMA = P(A,B). Ini fondasi Bayes Theorem!</Insight>
      </Card>
      <Card t={t} color={t.green}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.green, marginBottom: 10 }}>📊 Law of Total Probability</div>
        <div style={{ textAlign: "center", marginBottom: 14 }}><Formula t={t} color={t.green}>P(A) = Σ P(A|Cᵢ) × P(Cᵢ)</Formula></div>
        <div style={{ padding: 16, borderRadius: 12, background: t.bg3 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 10 }}>Contoh: Peluang mahasiswa dapat A?</div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[{ label: "P(A|kacamata)", val: "0.4", color: t.blue }, { label: "P(A|tidak)", val: "0.2", color: t.purple }, { label: "P(kacamata)", val: "0.3", color: t.green }].map(d => (
              <div key={d.label} style={{ padding: 10, borderRadius: 8, background: d.color + "0a", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: t.sub }}>{d.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 800, color: d.color }}>{d.val}</div>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 13, color: t.text, lineHeight: 2, textAlign: "center" }}>
            P(A) = <span style={{ color: t.blue }}>0.4</span>×<span style={{ color: t.green }}>0.3</span> + <span style={{ color: t.purple }}>0.2</span>×0.7 = <strong style={{ color: t.accent }}>0.26</strong>
          </div>
        </div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        <Card t={t} color={t.warm} style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.warm, marginBottom: 8 }}>🔓 Independence</div>
          <Formula t={t} color={t.warm}>P(A|B) = P(A)</Formula>
          <div style={{ fontSize: 11, color: t.sub, marginTop: 8, lineHeight: 1.6 }}>Tahu B tidak mengubah peluang A. → P(A,B) = P(A)×P(B)</div>
        </Card>
        <Card t={t} color={t.cyan} style={{ padding: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: t.cyan, marginBottom: 8 }}>🔐 Conditional Independence</div>
          <Formula t={t} color={t.cyan}>P(A|B,C) = P(A|C)</Formula>
          <div style={{ fontSize: 11, color: t.sub, marginTop: 8, lineHeight: 1.6 }}>Begitu C diketahui, B tidak relevan untuk A. <strong style={{ color: t.red }}>Ini yang dipakai Naive Bayes!</strong></div>
        </Card>
      </div>
    </div>
  );
}

function BayesSection({ t, isMobile }) {
  const [showCalc, setShowCalc] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent} glow>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Bayes Theorem</div>
          <div style={{ fontSize: 14, color: t.sub, marginTop: 4 }}>Cara "membalik" conditional probability</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><BayesFlowSVG t={t} isMobile={isMobile} /></div>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: "16px 28px", borderRadius: 16, background: t.accent + "0a", border: "2px solid " + t.accent + "30" }}>
            <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 800, color: t.text, lineHeight: 1.8 }}>P(<span style={{ color: t.green }}>C|X</span>) = <span style={{ color: t.purple }}>P(X|C)</span> × <span style={{ color: t.blue }}>P(C)</span> / P(X)</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 8, marginTop: 16 }}>
          {[{ sym: "P(C|X)", name: "Posterior", desc: "Yang dicari", color: t.green }, { sym: "P(X|C)", name: "Likelihood", desc: "Data cocok?", color: t.purple }, { sym: "P(C)", name: "Prior", desc: "Keyakinan awal", color: t.blue }, { sym: "P(X)", name: "Evidence", desc: "Normalizer", color: t.dim }].map((p, i) => (
            <div key={i} style={{ textAlign: "center", padding: 10, borderRadius: 10, background: p.color + "08" }}>
              <div style={{ fontFamily: "monospace", fontWeight: 800, fontSize: 14, color: p.color }}>{p.sym}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: p.color, marginTop: 2 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: t.sub, marginTop: 2 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card t={t} color={t.orange}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.orange, marginBottom: 10 }}>🌧️ Contoh: Prediksi Hujan</div>
        <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7, marginBottom: 12 }}>Hitung: <strong style={{ color: t.text }}>P(hujan | langit tidak mendung)</strong></div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
          {[{ label: "P(R=1)", val: "0.3", desc: "Peluang hujan", color: t.blue }, { label: "P(C=1|R=1)", val: "0.8", desc: "Mendung saat hujan", color: t.purple }, { label: "P(C=1|R=0)", val: "0.3", desc: "Mendung saat cerah", color: t.green }].map((d, i) => (
            <div key={i} style={{ padding: 12, borderRadius: 10, background: d.color + "08", textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: d.color, fontWeight: 600 }}>{d.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 900, color: d.color }}>{d.val}</div>
              <div style={{ fontSize: 10, color: t.sub }}>{d.desc}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowCalc(!showCalc)} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: showCalc ? t.orange + "20" : t.bg3, color: showCalc ? t.orange : t.sub }}>
          {showCalc ? "✕ Tutup" : "📐 Lihat Hitungan Lengkap"}
        </button>
        {showCalc && (
          <div style={{ marginTop: 12, padding: 14, borderRadius: 12, background: t.code, fontFamily: "monospace", fontSize: 12, lineHeight: 2, color: t.sub }}>
            <div style={{ fontWeight: 700, color: t.orange, marginBottom: 4 }}>Step 1: Komplemen</div>
            <div>P(C=0|R=1) = 1 - 0.8 = 0.2</div>
            <div>P(C=0|R=0) = 1 - 0.3 = 0.7</div>
            <div style={{ fontWeight: 700, color: t.orange, marginTop: 8, marginBottom: 4 }}>Step 2: Law of Total Prob</div>
            <div>P(C=0) = 0.2×0.3 + 0.7×0.7 = 0.06 + 0.49 = <strong style={{ color: t.text }}>0.55</strong></div>
            <div style={{ fontWeight: 700, color: t.orange, marginTop: 8, marginBottom: 4 }}>Step 3: Bayes!</div>
            <div>P(R=1|C=0) = 0.2×0.3 / 0.55 = 0.06/0.55 = <strong style={{ color: t.green, fontSize: 14 }}>0.109 ≈ 10.9%</strong></div>
          </div>
        )}
      </Card>
    </div>
  );
}

function LikelihoodSection({ t, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent2} glow>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Likelihood</div>
          <div style={{ fontSize: 14, color: t.sub, marginTop: 4 }}>Seberapa masuk akal parameter θ <strong style={{ color: t.accent2 }}>given data</strong></div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 16 }}><Formula t={t} color={t.accent2}>L(θ|X) = P(X|θ)</Formula></div>
        <Insight t={t} icon="🪙">Koin dilempar 5× → 4H 1T. Kalau p=0.5, L=0.031. Kalau p=0.8, L=0.41. <strong>p=0.8 lebih masuk akal!</strong></Insight>
      </Card>
      <Card t={t} color={t.accent2}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.accent2, marginBottom: 10 }}>📈 Kurva Likelihood</div>
        <div style={{ display: "flex", justifyContent: "center" }}><LikelihoodCurve t={t} /></div>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        <Card t={t} color={t.blue} style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.blue, marginBottom: 8 }}>🔢 I.I.D. Likelihood</div>
          <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7, marginBottom: 10 }}>Data independen & identik → likelihood = perkalian:</div>
          <Formula t={t} color={t.blue}>L(θ) = Π P(xᵢ|θ)</Formula>
        </Card>
        <Card t={t} color={t.green} style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.green, marginBottom: 8 }}>📉 Log-Likelihood</div>
          <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7, marginBottom: 10 }}>Perkalian angka kecil → 0! Pakai log → jadi penjumlahan.</div>
          <Formula t={t} color={t.green}>LL(θ) = Σ log P(xᵢ|θ)</Formula>
        </Card>
      </div>
    </div>
  );
}

function NBSection({ t, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent} glow>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: t.text }}>Naive Bayes Classifier</div>
          <div style={{ fontSize: 14, color: t.sub, marginTop: 4 }}><strong style={{ color: t.accent }}>Generative classifier</strong> pakai Bayes Theorem</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><NBTreeSVG t={t} /></div>
      </Card>
      <Card t={t} color={t.purple}>
        <div style={{ fontSize: 14, fontWeight: 700, color: t.purple, marginBottom: 12 }}>🧮 Rumus Inti</div>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ display: "inline-block", padding: "14px 24px", borderRadius: 14, background: t.purple + "08", border: "1.5px solid " + t.purple + "25" }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: t.text, lineHeight: 2 }}>
              <span style={{ color: t.green }}>P(y=c|x)</span> ∝ <span style={{ color: t.blue }}>P(y=c)</span> × <span style={{ color: t.purple }}>Π P(xᵢ|c)</span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
          <div style={{ padding: 14, borderRadius: 12, background: t.bg3 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 6 }}>Asumsi "Naive" (independen):</div>
            <Formula t={t} color={t.purple}>P(x|c) = P(x₁|c) × P(x₂|c) × ...</Formula>
          </div>
          <div style={{ padding: 14, borderRadius: 12, background: t.bg3 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.text, marginBottom: 6 }}>Prediksi (argmax):</div>
            <Formula t={t} color={t.green}>ŷ = argmax_c [ P(c) × Π P(xᵢ|c) ]</Formula>
          </div>
        </div>
        <Insight t={t}>P(x) sama untuk semua kelas → cukup bandingkan P(c) × P(x|c)!</Insight>
      </Card>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
        <Card t={t} color={t.blue} style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.blue, marginBottom: 8 }}>⚡ Discriminative</div>
          <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7 }}>Langsung model P(y|x). Contoh: <strong style={{ color: t.text }}>KNN, Decision Tree</strong></div>
        </Card>
        <Card t={t} color={t.green} style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: t.green, marginBottom: 8 }}>🧬 Generative (NB!)</div>
          <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.7 }}>Model P(x|y) lalu balik pakai Bayes → P(y|x). <strong style={{ color: t.text }}>Perlu prior + likelihood</strong></div>
        </Card>
      </div>
    </div>
  );
}

function TrainSection({ t, isMobile }) {
  const [showCalcNum, setShowCalcNum] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent3} glow>
        <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 12 }}>Training Phase: Estimasi θ</div>
        <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.7, marginBottom: 14 }}>NB cuma hitung <strong style={{ color: t.accent3 }}>frekuensi</strong> dari data training.</div>
        <div style={{ padding: 16, borderRadius: 14, background: t.blue + "06", border: "1px solid " + t.blue + "20", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><StepNum n="1" color={t.blue} /><div style={{ fontSize: 14, fontWeight: 700, color: t.blue }}>Prior: θc = Nc / N</div></div>
          <div style={{ padding: 10, borderRadius: 8, background: t.code, fontFamily: "monospace", fontSize: 12, color: t.text }}>14 data, 9 ya, 5 tidak → P(ya) = <strong style={{ color: t.blue }}>9/14</strong>, P(tidak) = <strong style={{ color: t.red }}>5/14</strong></div>
        </div>
        <div style={{ padding: 16, borderRadius: 14, background: t.purple + "06", border: "1px solid " + t.purple + "20", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><StepNum n="2a" color={t.purple} /><div style={{ fontSize: 14, fontWeight: 700, color: t.purple }}>Fitur Kategorikal → Frekuensi</div></div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr><th style={{ padding: "8px 10px", textAlign: "left", color: t.dim, borderBottom: "1px solid " + t.divider }}>Organisasi</th><th style={{ padding: "8px", textAlign: "center", color: t.blue, borderBottom: "1px solid " + t.divider }}>ya (÷9)</th><th style={{ padding: "8px", textAlign: "center", color: t.red, borderBottom: "1px solid " + t.divider }}>tidak (÷5)</th></tr></thead>
              <tbody>{[["sosial", "2/9", "3/5"], ["keilmuan", "4/9", "0/5 ⚠️"], ["olahraga", "3/9", "2/5"]].map((r, i) => (<tr key={i}><td style={{ padding: "6px 10px", color: t.text }}>{r[0]}</td><td style={{ padding: "6px", textAlign: "center", fontFamily: "monospace", color: t.blue }}>{r[1]}</td><td style={{ padding: "6px", textAlign: "center", fontFamily: "monospace", color: t.red }}>{r[2]}</td></tr>))}</tbody>
            </table>
          </div>
        </div>
        <div style={{ padding: 16, borderRadius: 14, background: t.green + "06", border: "1px solid " + t.green + "20" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><StepNum n="2b" color={t.green} /><div style={{ fontSize: 14, fontWeight: 700, color: t.green }}>Fitur Numerik → Mean & Variance (Gaussian)</div></div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr><th style={{ padding: "8px", textAlign: "left", color: t.dim, borderBottom: "1px solid " + t.divider }}>Parameter</th><th style={{ padding: "8px", textAlign: "center", color: t.blue, borderBottom: "1px solid " + t.divider }}>ya</th><th style={{ padding: "8px", textAlign: "center", color: t.red, borderBottom: "1px solid " + t.divider }}>tidak</th></tr></thead>
              <tbody>{[["μ ujian tulis", "73", "74.6"], ["σ² ujian tulis", "38", "62.30"], ["μ wawancara", "79.11", "86.2"], ["σ² wawancara", "104.4", "94.70"]].map((r, i) => (<tr key={i}><td style={{ padding: "6px 10px", color: t.text, fontWeight: 600 }}>{r[0]}</td><td style={{ padding: "6px", textAlign: "center", fontFamily: "monospace", color: t.blue }}>{r[1]}</td><td style={{ padding: "6px", textAlign: "center", fontFamily: "monospace", color: t.red }}>{r[2]}</td></tr>))}</tbody>
            </table>
          </div>
          <button onClick={() => setShowCalcNum(!showCalcNum)} style={{ marginTop: 10, padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: t.green + "15", color: t.green }}>{showCalcNum ? "✕ Tutup" : "📐 Cara hitung Gaussian density"}</button>
          {showCalcNum && (
            <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: t.code, fontFamily: "monospace", fontSize: 11, lineHeight: 1.8, color: t.sub }}>
              <div style={{ fontWeight: 700, color: t.green }}>f(x) = (1/√(2πσ²)) × exp(-(x-μ)²/(2σ²))</div>
              <div style={{ marginTop: 6, fontWeight: 700, color: t.green }}>P(tulis=60|ya): μ=73, σ²=38</div>
              <div>= (1/√(238.16)) × exp(-(60-73)²/(2×38))</div>
              <div>= 0.0647 × 0.108 ≈ <strong style={{ color: t.text }}>0.007</strong></div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function TestSection({ t, isMobile }) {
  const [step, setStep] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent4} glow>
        <div style={{ fontSize: 18, fontWeight: 800, color: t.text, marginBottom: 14 }}>Testing Phase: Prediksi!</div>
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto" }}>
          {[{ title: "Data masuk", color: t.accent }, { title: "Likelihood", color: t.purple }, { title: "Posterior", color: t.blue }, { title: "Prediksi!", color: t.green }].map((s, i) => (
            <button key={i} onClick={() => setStep(i)} style={{ flex: 1, padding: "10px 6px", borderRadius: 10, border: "1.5px solid " + (step === i ? s.color : t.cardBorder), background: step === i ? s.color + "10" : "transparent", cursor: "pointer", textAlign: "center", minWidth: 70 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: step === i ? s.color : t.dim }}>{i + 1}</div>
              <div style={{ fontSize: 9, color: step === i ? s.color : t.dim, fontWeight: 600 }}>{s.title}</div>
            </button>
          ))}
        </div>
        {step >= 0 && <div style={{ padding: 12, borderRadius: 10, background: t.bg3, marginBottom: 12, fontFamily: "monospace", fontSize: 12, color: t.text }}>X = (olahraga, tulis=60, waw=62, komunikasi=tinggi)</div>}
        {step >= 1 && (
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead><tr>{["", "Organisasi", "Tulis", "Wawancara", "Komunikasi", "P(X|c)"].map(h => (<th key={h} style={{ padding: "8px", textAlign: "center", color: t.dim, borderBottom: "1px solid " + t.divider, fontSize: 10 }}>{h}</th>))}</tr></thead>
              <tbody>
                <tr><td style={{ padding: 8, color: t.blue, fontWeight: 700 }}>ya</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>3/9</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>0.007</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>0.01</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>6/9</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace", color: t.blue, fontWeight: 700 }}>1.55e-05</td></tr>
                <tr><td style={{ padding: 8, color: t.red, fontWeight: 700 }}>tidak</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>2/5</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>0.009</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>0.002</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace" }}>2/5</td><td style={{ padding: 8, textAlign: "center", fontFamily: "monospace", color: t.red, fontWeight: 700 }}>2.88e-06</td></tr>
              </tbody>
            </table>
          </div>
        )}
        {step >= 2 && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 14 }}>
            <div style={{ padding: 14, borderRadius: 12, background: t.blue + "08", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: t.sub }}>P(ya|X) ∝ 9/14 × 1.55e-05</div>
              <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 900, color: t.blue }}>= 1.0e-05</div>
            </div>
            <div style={{ padding: 14, borderRadius: 12, background: t.red + "08", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: t.sub }}>P(tidak|X) ∝ 5/14 × 2.88e-06</div>
              <div style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 900, color: t.red }}>= 1.03e-06</div>
            </div>
          </div>
        )}
        {step >= 3 && (
          <div style={{ padding: 16, borderRadius: 14, background: t.green + "0a", border: "2px solid " + t.green + "30", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: t.green }}>✅ Prediksi: Exchange = YA</div>
            <div style={{ fontSize: 12, color: t.sub, marginTop: 4 }}>1.0e-05 {">"} 1.03e-06</div>
          </div>
        )}
        {step >= 1 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.accent4, marginBottom: 10 }}>Gaussian Density (fitur numerik):</div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr", gap: 8 }}>
              <GaussianVis t={t} mean={73} variance={38} x={60} label="Tulis|ya" color={t.blue} />
              <GaussianVis t={t} mean={74.6} variance={62.3} x={60} label="Tulis|tdk" color={t.red} />
              <GaussianVis t={t} mean={79.11} variance={104.4} x={62} label="Waw|ya" color={t.blue} />
              <GaussianVis t={t} mean={86.2} variance={94.7} x={62} label="Waw|tdk" color={t.red} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function ProblemsSection({ t, isMobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.red}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.red, marginBottom: 10 }}>⚠️ Zero-Frequency Problem</div>
        <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.7, marginBottom: 12 }}>P(keilmuan|tidak) = <strong style={{ color: t.red }}>0/5 = 0</strong> → seluruh posterior = 0!</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          <div style={{ padding: 14, borderRadius: 12, background: t.red + "08", border: "1px solid " + t.red + "20" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.red, marginBottom: 6 }}>❌ Tanpa Laplace</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: t.sub, lineHeight: 1.8 }}>P(keilmuan|tidak) = 0/5 = 0<br />P(tidak|X) = ... × <strong style={{ color: t.red }}>0</strong> × ... = <strong style={{ color: t.red }}>0</strong></div>
          </div>
          <div style={{ padding: 14, borderRadius: 12, background: t.green + "08", border: "1px solid " + t.green + "20" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: t.green, marginBottom: 6 }}>✅ Laplace Smoothing (+1)</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: t.sub, lineHeight: 1.8 }}>P(keilmuan|tidak) = (1+0)/(3+5) = <strong style={{ color: t.green }}>1/8</strong><br />P(sosial|tidak) = (1+3)/(3+5) = 4/8<br />P(olahraga|tidak) = (1+2)/(3+5) = 3/8</div>
          </div>
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: t.sub }}><strong style={{ color: t.text }}>Rumus:</strong> θ = (1 + Nₐ) / (K + Nᵢ), K = jumlah kategori</div>
      </Card>
      <Card t={t} color={t.warm}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.warm, marginBottom: 10 }}>🕳️ Missing Values</div>
        <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.7 }}>Fitur hilang? <strong style={{ color: t.text }}>Skip aja!</strong> Karena asumsi independen, kita marginalize out fitur missing.</div>
        <div style={{ marginTop: 10, padding: 12, borderRadius: 10, background: t.code, fontFamily: "monospace", fontSize: 12, color: t.sub, lineHeight: 1.8 }}>Data: (?, tulis=60, waw=62, tinggi)<br />→ P(ya|X) ∝ P(ya) × P(tulis=60|ya) × P(waw=62|ya) × P(tinggi|ya)</div>
      </Card>
      <Card t={t} color={t.cyan}>
        <div style={{ fontSize: 16, fontWeight: 700, color: t.cyan, marginBottom: 10 }}>🔀 Variasi Naive Bayes</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 8 }}>
          {[{ name: "Gaussian NB", desc: "Fitur kontinu → normal", color: t.blue }, { name: "Multinomial NB", desc: "Fitur = count (BoW)", color: t.purple }, { name: "Bernoulli NB", desc: "Fitur = binary (0/1)", color: t.green }, { name: "Categorical NB", desc: "Fitur = kategori", color: t.warm }].map((v, i) => (
            <div key={i} style={{ padding: 10, borderRadius: 10, background: v.color + "08", textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: v.color }}>{v.name}</div>
              <div style={{ fontSize: 10, color: t.sub, marginTop: 4 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function QuizSection({ t, isMobile }) {
  const [q, setQ] = useState(0);
  const [sel, setSel] = useState(null);
  const [show, setShow] = useState(false);
  const qs = [
    { q: "P(A∪B) = P(A) + P(B) - P(A∩B). Ini disebut?", opts: ["Product rule", "Union rule", "Complement rule", "Bayes rule"], ans: 1, exp: "Union rule: peluang A ATAU B." },
    { q: "Jika P(A|B) = P(A), maka A dan B...", opts: ["Mutually exclusive", "Independent", "Berkorelasi", "Conditional independent"], ans: 1, exp: "Tahu B tidak mengubah P(A) → independen." },
    { q: "P(C|X) ∝ P(X|C) × P(C). P(X|C) disebut?", opts: ["Prior", "Posterior", "Likelihood", "Evidence"], ans: 2, exp: "Likelihood = seberapa cocok data X kalau C benar." },
    { q: "Naive Bayes 'naive' karena...", opts: ["Sederhana", "Asumsi fitur independen given kelas", "Tidak perlu training", "Untuk data kecil"], ans: 1, exp: "Asumsi: P(X|c) = Π P(xᵢ|c). Fitur independen given kelas." },
    { q: "P(keilmuan|tidak)=0 → Laplace menambahkan...", opts: ["0", "1 ke setiap count", "Mean", "Variance"], ans: 1, exp: "Laplace: +1 ke numerator, +K ke denominator." },
    { q: "Fitur numerik di NB diasumsikan distribusi...", opts: ["Uniform", "Poisson", "Gaussian", "Binomial"], ans: 2, exp: "Gaussian NB: density normal dengan μ dan σ² per kelas." },
  ];
  const cq = qs[q];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Card t={t} color={t.accent} glow>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: t.text }}>📝 Quick Quiz</div>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: t.accent }}>{q + 1}/{qs.length}</div>
        </div>
        <div style={{ height: 3, background: t.bg3, borderRadius: 3, marginBottom: 16 }}><div style={{ height: "100%", width: ((q + 1) / qs.length * 100) + "%", background: t.accent, borderRadius: 3, transition: "width 0.4s" }} /></div>
        <div style={{ fontSize: 14, color: t.text, lineHeight: 1.7, fontWeight: 600, marginBottom: 16 }}>{cq.q}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14 }}>
          {cq.opts.map((o, i) => {
            const isAns = show && i === cq.ans;
            const isWrong = show && sel === i && i !== cq.ans;
            return (
              <button key={i} onClick={() => !show && setSel(i)} style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 14px", borderRadius: 10, background: isAns ? t.green + "15" : isWrong ? t.red + "15" : sel === i ? t.accent + "0a" : t.bg3, border: "1.5px solid " + (isAns ? t.green : isWrong ? t.red : sel === i ? t.accent : t.cardBorder), cursor: show ? "default" : "pointer", fontSize: 13, color: isAns ? t.green : isWrong ? t.red : t.text, fontFamily: "inherit", fontWeight: isAns ? 700 : 400 }}>
                {o} {isAns && "✓"} {isWrong && "✗"}
              </button>
            );
          })}
        </div>
        {!show ? (
          <button onClick={() => sel !== null && setShow(true)} disabled={sel === null} style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: sel === null ? "not-allowed" : "pointer", background: sel === null ? t.bg3 : t.accent, color: sel === null ? t.dim : "#fff", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>Cek Jawaban</button>
        ) : (
          <div>
            <div style={{ padding: 12, borderRadius: 10, background: t.code, fontSize: 12, color: t.sub, lineHeight: 1.7, marginBottom: 10 }}>{cq.exp}</div>
            <button onClick={() => { setQ((q + 1) % qs.length); setSel(null); setShow(false); }} style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: t.accent, color: "#fff", fontWeight: 700, fontSize: 13, fontFamily: "inherit" }}>{q === qs.length - 1 ? "🔄 Ulang" : "Berikutnya →"}</button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function ProbabilityNaiveBayes() {
  const [dark, setDark] = useState(false);
  const [section, setSection] = useState("prob");
  const isMobile = useIsMobile();
  const t = dark ? TH.dark : TH.light;
  try { const { useTabSwipe } = require("@/lib/SwipeNavigationContext"); useTabSwipe(SECTIONS.map(s => s.id), section, setSection); } catch {}

  const renderSection = () => {
    switch (section) {
      case "prob": return <ProbSection t={t} isMobile={isMobile} />;
      case "cond": return <CondSection t={t} isMobile={isMobile} />;
      case "bayes": return <BayesSection t={t} isMobile={isMobile} />;
      case "likelihood": return <LikelihoodSection t={t} isMobile={isMobile} />;
      case "nb": return <NBSection t={t} isMobile={isMobile} />;
      case "train": return <TrainSection t={t} isMobile={isMobile} />;
      case "test": return <TestSection t={t} isMobile={isMobile} />;
      case "problems": return <ProblemsSection t={t} isMobile={isMobile} />;
      case "quiz": return <QuizSection t={t} isMobile={isMobile} />;
      default: return null;
    }
  };
  const curIdx = SECTIONS.findIndex(s => s.id === section);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Segoe UI', -apple-system, sans-serif", transition: "background 0.4s, color 0.4s", overflowX: "hidden" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-thumb{background:${t.dim}40;border-radius:4px}button{transition:all 0.2s ease}strong{color:${t.text};font-weight:700}`}</style>
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>
        <header style={{ padding: "20px 0 12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.accent, letterSpacing: 2.5, marginBottom: 4 }}>KASDAD · WEEK 7</div>
              <h1 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, lineHeight: 1.1, color: t.text }}>Probability & <span style={{ color: t.accent }}>Naive Bayes</span></h1>
            </div>
            <button onClick={() => setDark(!dark)} style={{ width: 40, height: 40, borderRadius: 10, border: "1px solid " + t.cardBorder, background: t.card, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{dark ? "☀️" : "🌙"}</button>
          </div>
          <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 4, WebkitOverflowScrolling: "touch" }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setSection(s.id)} style={{ padding: isMobile ? "6px 8px" : "7px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: section === s.id ? t.accent + "15" : "transparent", color: section === s.id ? t.accent : t.dim, fontWeight: section === s.id ? 700 : 500, fontSize: isMobile ? 10 : 11, whiteSpace: "nowrap", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
                <span style={{ fontSize: isMobile ? 11 : 13 }}>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </header>
        <main style={{ padding: "16px 0 40px" }} key={section}><div style={{ animation: "fadeIn 0.4s both" }}>{renderSection()}</div></main>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "0 0 60px" }}>
          {curIdx > 0 ? <button onClick={() => setSection(SECTIONS[curIdx - 1].id)} style={{ padding: "10px 18px", borderRadius: 10, border: "1px solid " + t.cardBorder, background: t.card, color: t.sub, cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>← {SECTIONS[curIdx - 1].label}</button> : <div />}
          {curIdx < SECTIONS.length - 1 ? <button onClick={() => setSection(SECTIONS[curIdx + 1].id)} style={{ padding: "10px 18px", borderRadius: 10, border: "1px solid " + t.accent + "40", background: t.accent + "10", color: t.accent, cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit" }}>{SECTIONS[curIdx + 1].label} →</button> : <div />}
        </div>
        <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 3, background: t.bg3, zIndex: 100 }}><div style={{ height: "100%", background: "linear-gradient(90deg, " + t.accent + ", " + t.purple + ")", width: ((curIdx + 1) / SECTIONS.length * 100) + "%", transition: "width 0.4s" }} /></div>
      </div>
    </div>
  );
}
