"use client";
import { use } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MATERIALS } from "@/lib/materials";

const COMPONENT_MAP: Record<string, ReturnType<typeof dynamic>> = {
  "what-is-ai": dynamic(() => import("@/components/Materi1WhatIsAI"), { ssr: false }),
  search: dynamic(() => import("@/components/SearchVisualization"), { ssr: false }),
  "data-science": dynamic(() => import("@/components/Materi3SainsData"), { ssr: false }),
  "eda-visualization": dynamic(() => import("@/components/Materi4Visualisasi"), { ssr: false }),
  "feature-engineering": dynamic(() => import("@/components/FeatureEngineering"), { ssr: false }),
  pca: dynamic(() => import("@/components/PCAVisualization"), { ssr: false }),
  cart: dynamic(() => import("@/components/CARTVisualization"), { ssr: false }),
  "random-forest": dynamic(() => import("@/components/RandomForestViz"), { ssr: false }),
  "model-evaluation": dynamic(() => import("@/components/ModelEvaluation"), { ssr: false }),
  "bias-variance": dynamic(() => import("@/components/BiasVariance"), { ssr: false }),
  knn: dynamic(() => import("@/components/KNNVisualization"), { ssr: false }),
  imbalanced: dynamic(() => import("@/components/ImbalancedClassification"), { ssr: false }),
  "uts-guide": dynamic(() => import("@/components/UTSGuide"), { ssr: false }),
  "uts-practice": dynamic(() => import("@/components/UTSPractice"), { ssr: false }),
};

export default function MateriPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const material = MATERIALS.find((m) => m.slug === slug);
  const Component = COMPONENT_MAP[slug];

  if (!material || !Component) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🤷</span>
        <h1 className="text-2xl font-bold text-white/80">Materi tidak ditemukan</h1>
        <Link
          href="/"
          className="text-indigo-400 hover:text-indigo-300 text-sm font-medium"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const currentIdx = MATERIALS.findIndex((m) => m.slug === slug);
  const prev = currentIdx > 0 ? MATERIALS[currentIdx - 1] : null;
  const next =
    currentIdx < MATERIALS.length - 1 ? MATERIALS[currentIdx + 1] : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Floating nav bar */}
      <nav className="sticky top-0 z-[200] border-b border-white/[0.06] bg-[#0a0a12]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors shrink-0"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium hidden sm:inline">Beranda</span>
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-lg shrink-0">{material.icon}</span>
            <div className="min-w-0">
              <span
                className="text-[10px] font-bold tracking-wider uppercase font-mono"
                style={{ color: material.color + "cc" }}
              >
                Week {material.week}
              </span>
              <h1 className="text-sm font-bold text-white/90 truncate leading-tight">
                {material.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {prev && (
              <Link
                href={`/materi/${prev.slug}`}
                className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                title={prev.title}
              >
                <span>←</span>
                <span className="hidden md:inline">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/materi/${next.slug}`}
                className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
                title={next.title}
              >
                <span className="hidden md:inline">{next.title}</span>
                <span>→</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Component */}
      <main className="flex-1">
        <Component />
      </main>

      {/* Bottom nav */}
      <div className="border-t border-white/[0.06] bg-[#0a0a12]">
        <div className="max-w-4xl mx-auto px-6 py-6 flex justify-between items-center gap-4">
          {prev ? (
            <Link
              href={`/materi/${prev.slug}`}
              className="flex items-center gap-3 group"
            >
              <span className="text-white/20 group-hover:text-white/40 transition-colors">
                ←
              </span>
              <div>
                <div className="text-[10px] text-white/25 uppercase tracking-wider">
                  Sebelumnya
                </div>
                <div className="text-sm font-semibold text-white/50 group-hover:text-white/70 transition-colors">
                  {prev.icon} {prev.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          <Link
            href="/"
            className="text-xs text-white/25 hover:text-white/50 transition-colors font-medium"
          >
            Lihat Semua Materi
          </Link>
          {next ? (
            <Link
              href={`/materi/${next.slug}`}
              className="flex items-center gap-3 group text-right"
            >
              <div>
                <div className="text-[10px] text-white/25 uppercase tracking-wider">
                  Selanjutnya
                </div>
                <div className="text-sm font-semibold text-white/50 group-hover:text-white/70 transition-colors">
                  {next.icon} {next.title}
                </div>
              </div>
              <span className="text-white/20 group-hover:text-white/40 transition-colors">
                →
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
