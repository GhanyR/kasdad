"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { MATERIALS, CATEGORIES, type Material } from "@/lib/materials";

const WEEK_DATES: Record<number, string> = {
  1: "2–9 Feb 2026",
  2: "11–18 Feb 2026",
  3: "18–25 Feb 2026",
  4: "23–25 Feb 2026",
  5: "2–4 Mar 2026",
  6: "9–11 Mar 2026",
  7: "16–25 Mar 2026",
  8: "30 Mar – 1 Apr 2026",
};

const themes = {
  light: {
    bg: "#f8f7f4", bg2: "#ffffff", surface: "#f0eff2",
    text: "#1a1a2e", textMuted: "#6b6b80", textDim: "#9999aa",
    accent: "#5046e5", accent2: "#e5466b",
    border: "#e5e5ea", borderLight: "#f0f0f4",
    cardBg: "#ffffff", cardBorder: "rgba(0,0,0,0.06)", cardHover: "rgba(0,0,0,0.02)",
    heroBg: "linear-gradient(135deg, #f0f0ff 0%, #fff5f5 50%, #f0fff5 100%)",
    searchBg: "rgba(0,0,0,0.03)", searchBorder: "rgba(0,0,0,0.08)",
    navBg: "rgba(248,247,244,0.92)",
    pillBg: "rgba(0,0,0,0.04)", pillText: "#666",
    pillActiveBg: "#5046e5", pillActiveText: "#fff",
    footerText: "#aaa",
    progressBg: "rgba(0,0,0,0.06)", progressFill: "#5046e5",
    checkBg: "#e8f5e9", checkColor: "#16a34a",
  },
  dark: {
    bg: "#0a0a12", bg2: "#111119", surface: "#15151f",
    text: "#e8e8f2", textMuted: "#8888a0", textDim: "#555570",
    accent: "#8b80ff", accent2: "#ff6b9d",
    border: "#222235", borderLight: "#1a1a2e",
    cardBg: "rgba(255,255,255,0.03)", cardBorder: "rgba(255,255,255,0.06)", cardHover: "rgba(255,255,255,0.06)",
    heroBg: "linear-gradient(135deg, #0a0a20 0%, #120a14 50%, #0a120a 100%)",
    searchBg: "rgba(255,255,255,0.04)", searchBorder: "rgba(255,255,255,0.08)",
    navBg: "rgba(10,10,18,0.92)",
    pillBg: "rgba(255,255,255,0.06)", pillText: "#888",
    pillActiveBg: "#8b80ff", pillActiveText: "#fff",
    footerText: "#444",
    progressBg: "rgba(255,255,255,0.08)", progressFill: "#8b80ff",
    checkBg: "rgba(22,163,74,0.15)", checkColor: "#4ade80",
  },
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function useProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const saved = localStorage.getItem("kasdad-progress");
      if (saved) setCompleted(new Set(JSON.parse(saved)));
    } catch {}
  }, []);
  const toggle = (slug: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      localStorage.setItem("kasdad-progress", JSON.stringify([...next]));
      return next;
    });
  };
  return { completed, toggle };
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const t = dark ? themes.dark : themes.light;
  const isMobile = useIsMobile();
  const { completed, toggle } = useProgress();

  const filtered = useMemo(() => {
    let items = MATERIALS;
    if (activeCategory) items = items.filter((m) => m.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.topics.some((tp) => tp.toLowerCase().includes(q))
      );
    }
    return items;
  }, [search, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, Material[]>();
    for (const m of filtered) {
      const list = map.get(m.category) || [];
      list.push(m);
      map.set(m.category, list);
    }
    return map;
  }, [filtered]);

  const catOrder: (keyof typeof CATEGORIES)[] = [
    "foundations", "data", "models", "evaluation", "exam",
  ];

  const progressCount = completed.size;
  const totalCount = MATERIALS.length;
  const progressPct = Math.round((progressCount / totalCount) * 100);

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.text, fontFamily: "'Segoe UI', -apple-system, system-ui, sans-serif", transition: "background 0.4s, color 0.4s" }}>
      {/* Hero */}
      <header style={{ background: t.heroBg, borderBottom: `1px solid ${t.border}`, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "36px 16px 28px" : "52px 24px 44px", position: "relative" }}>
          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            style={{
              position: "absolute", top: isMobile ? 16 : 24, right: isMobile ? 16 : 24,
              width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
              background: dark ? "#333" : "#ddd",
              transition: "background 0.3s",
              display: "flex", alignItems: "center", padding: "0 3px",
            }}
          >
            <div style={{
              width: 22, height: 22, borderRadius: 11,
              background: dark ? "#0a0a12" : "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              transform: dark ? "translateX(24px)" : "translateX(0)",
              transition: "transform 0.3s, background 0.3s",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12,
            }}>
              {dark ? "🌙" : "☀️"}
            </div>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: isMobile ? 10 : 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: isMobile ? 10 : 11, fontWeight: 700, letterSpacing: 3, color: t.accent, textTransform: "uppercase", fontFamily: "monospace" }}>
              CSGE603130
            </span>
            <span style={{ color: t.textDim }}>•</span>
            <span style={{ fontSize: isMobile ? 11 : 12, color: t.textMuted }}>
              Genap 2025/2026 · Fasilkom UI
            </span>
          </div>
          <h1 style={{ fontSize: isMobile ? 26 : 40, fontWeight: 800, letterSpacing: -1, lineHeight: 1.15, marginBottom: isMobile ? 10 : 14 }}>
            <span style={{ color: t.text }}>Kecerdasan Artifisial &</span>
            <br />
            <span style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.accent2})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" }}>
              Sains Data Dasar
            </span>
          </h1>
          <p style={{ color: t.textMuted, fontSize: isMobile ? 13 : 16, maxWidth: 560, lineHeight: 1.7, marginBottom: isMobile ? 16 : 24 }}>
            Visualisasi interaktif seluruh materi UTS — dari AI fundamentals,
            search algorithms, data science, hingga machine learning models, built by{" "}
            <a href="https://www.instagram.com/ghanyrasyid_/" target="_blank" rel="noopener noreferrer" style={{ color: t.textMuted, textDecoration: "none", borderBottom: `1px dotted ${t.textDim}`, paddingBottom: 1 }}>Ghany</a>.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 16, flexWrap: "wrap", marginBottom: 16 }}>
            {[
              { color: "#16a34a", label: `${MATERIALS.length} Materi Interaktif` },
              { color: "#d97706", label: "8 Minggu Perkuliahan" },
              { color: "#dc2626", label: "UTS Ready" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: isMobile ? 11 : 13, color: t.textMuted }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: item.color }} />
                {item.label}
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ maxWidth: 360 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: t.textMuted }}>
                Progress Belajar
              </span>
              <span style={{ fontSize: 11, fontWeight: 700, color: t.accent }}>
                {progressCount}/{totalCount} ({progressPct}%)
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: t.progressBg, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 3,
                background: `linear-gradient(90deg, ${t.accent}, ${t.accent2})`,
                width: `${progressPct}%`,
                transition: "width 0.5s ease",
              }} />
            </div>
          </div>
        </div>
      </header>

      {/* Search + Filter */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: `1px solid ${t.border}`,
        background: t.navBg, backdropFilter: "blur(16px)",
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          padding: isMobile ? "8px 12px" : "10px 24px",
          display: "flex", alignItems: "center", gap: isMobile ? 8 : 12,
          flexDirection: isMobile ? "column" : "row",
        }}>
          <div style={{ position: "relative", width: "100%", maxWidth: isMobile ? "100%" : 360 }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: t.textDim }}>🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari materi, topik, atau keyword..."
              style={{
                width: "100%", background: t.searchBg, border: `1px solid ${t.searchBorder}`,
                borderRadius: 10, padding: "9px 14px 9px 36px", fontSize: 13,
                color: t.text, outline: "none", fontFamily: "inherit",
              }}
            />
          </div>
          <div className="filter-scroll" style={{
            display: "flex", gap: 4, overflowX: "auto",
            width: isMobile ? "100%" : "auto",
            paddingBottom: isMobile ? 2 : 0,
          }}>
            <FilterPill active={!activeCategory} onClick={() => setActiveCategory(null)} t={t}>Semua</FilterPill>
            {catOrder.map((key) => {
              const cat = CATEGORIES[key];
              return (
                <FilterPill key={key} active={activeCategory === key} onClick={() => setActiveCategory(activeCategory === key ? null : key)} t={t}>
                  {cat.icon} {isMobile ? "" : cat.label}
                  {isMobile && <span style={{ fontSize: 10 }}>{cat.label.split(" ")[0]}</span>}
                </FilterPill>
              );
            })}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "20px 12px" : "36px 24px" }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ color: t.textMuted, fontSize: 16 }}>Tidak ada materi yang cocok.</p>
          </div>
        )}

        {catOrder.map((catKey) => {
          const items = grouped.get(catKey);
          if (!items || items.length === 0) return null;
          const cat = CATEGORIES[catKey];
          return (
            <section key={catKey} style={{ marginBottom: isMobile ? 28 : 44 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: isMobile ? 18 : 20 }}>{cat.icon}</span>
                <h2 style={{ fontSize: isMobile ? 15 : 17, fontWeight: 700, color: t.text, margin: 0 }}>{cat.label}</h2>
                <span style={{ fontSize: 12, color: t.textDim, fontFamily: "monospace" }}>{items.length}</span>
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(300px, 1fr))",
                gap: isMobile ? 8 : 12,
              }}>
                {items.map((m) => (
                  <MaterialCard key={m.slug} material={m} t={t} isCompleted={completed.has(m.slug)} onToggleComplete={toggle} isMobile={isMobile} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${t.border}`, padding: isMobile ? "20px 12px" : "28px 24px", textAlign: "center" }}>
        <p style={{ color: t.footerText, fontSize: isMobile ? 11 : 13 }}>CSGE603130 — Kecerdasan Artifisial dan Sains Data Dasar</p>
        <p style={{ color: t.footerText, fontSize: isMobile ? 10 : 11, marginTop: 4, opacity: 0.7 }}>Fakultas Ilmu Komputer · Universitas Indonesia · Genap 2025/2026</p>
      </footer>
    </div>
  );
}

function FilterPill({ active, onClick, children, t }: { active: boolean; onClick: () => void; children: React.ReactNode; t: typeof themes.light }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
      background: active ? t.pillActiveBg : t.pillBg,
      color: active ? t.pillActiveText : t.pillText,
      fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
      transition: "all 0.2s", fontFamily: "inherit",
      display: "flex", alignItems: "center", gap: 4,
    }}>
      {children}
    </button>
  );
}

function MaterialCard({ material: m, t, isCompleted, onToggleComplete, isMobile }: {
  material: Material; t: typeof themes.light; isCompleted: boolean; onToggleComplete: (slug: string) => void; isMobile: boolean;
}) {
  return (
    <div style={{ position: "relative" }}>
      <Link href={`/materi/${m.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{
          borderRadius: 14, border: `1px solid ${isCompleted ? t.checkColor + "40" : t.cardBorder}`, background: t.cardBg,
          padding: isMobile ? "14px 14px" : "18px 20px", transition: "all 0.25s", cursor: "pointer",
          position: "relative", overflow: "hidden",
          ...(isCompleted ? { borderLeftWidth: 3, borderLeftColor: t.checkColor } : {}),
        }}
          onMouseEnter={(e) => { if (!isMobile) { e.currentTarget.style.borderColor = m.color + "50"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${m.color}12`; } }}
          onMouseLeave={(e) => { if (!isMobile) { e.currentTarget.style.borderColor = isCompleted ? t.checkColor + "40" : t.cardBorder; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; } }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: isMobile ? 10 : 12, marginBottom: isMobile ? 6 : 10 }}>
            <span style={{ fontSize: isMobile ? 20 : 24, flexShrink: 0, marginTop: 2 }}>{m.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "monospace", color: m.color }}>
                  Week {m.week}
                </span>
                {WEEK_DATES[m.week] && (
                  <span style={{ fontSize: 10, color: t.textDim }}>{WEEK_DATES[m.week]}</span>
                )}
                {isCompleted && (
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: t.checkBg, color: t.checkColor }}>
                    Selesai
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: isMobile ? 14 : 15, fontWeight: 700, color: t.text, margin: 0, lineHeight: 1.3 }}>{m.title}</h3>
              <p style={{ fontSize: isMobile ? 11 : 12, color: t.textMuted, margin: "3px 0 0", lineHeight: 1.4 }}>{m.subtitle}</p>
            </div>
          </div>
          {!isMobile && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {m.topics.slice(0, 4).map((topic) => (
                <span key={topic} style={{
                  fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 6,
                  background: t.pillBg, color: t.textMuted,
                }}>{topic}</span>
              ))}
              {m.topics.length > 4 && (
                <span style={{ fontSize: 10, color: t.textDim }}>+{m.topics.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </Link>
      {/* Completion toggle button */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleComplete(m.slug); }}
        style={{
          position: "absolute", top: isMobile ? 10 : 14, right: isMobile ? 10 : 14,
          width: 24, height: 24, borderRadius: 6,
          border: `2px solid ${isCompleted ? t.checkColor : t.cardBorder}`,
          background: isCompleted ? t.checkBg : "transparent",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s", zIndex: 2,
          padding: 0,
        }}
        title={isCompleted ? "Tandai belum selesai" : "Tandai sudah selesai"}
      >
        {isCompleted && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.checkColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        )}
      </button>
    </div>
  );
}
