"use client";
import { useState, useMemo } from "react";
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

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = MATERIALS;
    if (activeCategory) items = items.filter((m) => m.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.subtitle.toLowerCase().includes(q) ||
          m.topics.some((t) => t.toLowerCase().includes(q))
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
    "foundations",
    "data",
    "models",
    "evaluation",
    "exam",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Ambient gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/[0.04] blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-violet-600/[0.04] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/[0.02] blur-3xl" />
      </div>

      {/* Hero */}
      <header className="relative border-b border-white/[0.06] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-transparent to-violet-950/30" />
        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs font-bold tracking-[3px] text-indigo-400/80 uppercase font-mono">
              CSGE603130
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-medium text-white/40">
              Genap 2025/2026 · Fasilkom UI
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Kecerdasan Artifisial &
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Sains Data Dasar
            </span>
          </h1>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed mb-8">
            Visualisasi interaktif seluruh materi UTS — dari AI fundamentals,
            search algorithms, data science, hingga machine learning models.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              <span>{MATERIALS.length} Materi Interaktif</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span>8 Minggu Perkuliahan</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span className="w-2 h-2 rounded-full bg-rose-500/80" />
              <span>UTS Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search + Filter */}
      <div className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a12]/90 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
              🔍
            </span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari materi, topik, atau keyword..."
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                !activeCategory
                  ? "bg-white/10 text-white border border-white/15"
                  : "text-white/40 hover:text-white/60 border border-transparent"
              }`}
            >
              Semua
            </button>
            {catOrder.map((key) => {
              const cat = CATEGORIES[key];
              return (
                <button
                  key={key}
                  onClick={() =>
                    setActiveCategory(activeCategory === key ? null : key)
                  }
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeCategory === key
                      ? "bg-white/10 text-white border border-white/15"
                      : "text-white/40 hover:text-white/60 border border-transparent"
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/40 text-lg">
              Tidak ada materi yang cocok dengan pencarianmu.
            </p>
          </div>
        )}

        {catOrder.map((catKey) => {
          const items = grouped.get(catKey);
          if (!items || items.length === 0) return null;
          const cat = CATEGORIES[catKey];
          return (
            <section key={catKey} className="mb-14">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl">{cat.icon}</span>
                <h2 className="text-lg font-bold text-white/90 tracking-tight">
                  {cat.label}
                </h2>
                <span className="text-xs font-mono text-white/25 ml-1">
                  {items.length} materi
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((m, i) => (
                  <MaterialCard key={m.slug} material={m} index={i} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8 text-center">
        <p className="text-white/25 text-sm">
          CSGE603130 — Kecerdasan Artifisial dan Sains Data Dasar
        </p>
        <p className="text-white/15 text-xs mt-1">
          Fakultas Ilmu Komputer · Universitas Indonesia · Genap 2025/2026
        </p>
      </footer>
    </div>
  );
}

function MaterialCard({
  material: m,
  index,
}: {
  material: Material;
  index: number;
}) {
  return (
    <Link href={`/materi/${m.slug}`} className="group block">
      <div
        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5 overflow-hidden"
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `linear-gradient(90deg, ${m.color}, ${m.color}60)`,
          }}
        />

        <div className="flex items-start gap-3.5 mb-3">
          <span className="text-2xl flex-shrink-0 mt-0.5">{m.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-[10px] font-bold tracking-wider uppercase font-mono"
                style={{ color: m.color + "cc" }}
              >
                Week {m.week}
              </span>
              {WEEK_DATES[m.week] && (
                <span className="text-[10px] text-white/20">
                  {WEEK_DATES[m.week]}
                </span>
              )}
            </div>
            <h3
              className="text-[15px] font-bold text-white/90 group-hover:text-white transition-colors leading-snug"
            >
              {m.title}
            </h3>
            <p className="text-xs text-white/40 mt-0.5 leading-relaxed">
              {m.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {m.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/[0.04] text-white/35"
            >
              {topic}
            </span>
          ))}
          {m.topics.length > 4 && (
            <span className="text-[10px] text-white/25">
              +{m.topics.length - 4}
            </span>
          )}
        </div>

        {/* Arrow */}
        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
          <span className="text-xs" style={{ color: m.color }}>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
