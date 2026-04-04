"use client";
import { use, useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { MATERIALS } from "@/lib/materials";

const COMPONENT_MAP: Record<string, ReturnType<typeof dynamic>> = {
  "what-is-ai": dynamic(() => import("@/components/Materi1WhatIsAI"), { ssr: false, loading: () => <Loading /> }),
  search: dynamic(() => import("@/components/SearchVisualization"), { ssr: false, loading: () => <Loading /> }),
  "data-science": dynamic(() => import("@/components/Materi3SainsData"), { ssr: false, loading: () => <Loading /> }),
  "eda-visualization": dynamic(() => import("@/components/Materi4Visualisasi"), { ssr: false, loading: () => <Loading /> }),
  "feature-engineering": dynamic(() => import("@/components/FeatureEngineering"), { ssr: false, loading: () => <Loading /> }),
  pca: dynamic(() => import("@/components/PCAVisualization"), { ssr: false, loading: () => <Loading /> }),
  cart: dynamic(() => import("@/components/CARTVisualization"), { ssr: false, loading: () => <Loading /> }),
  "random-forest": dynamic(() => import("@/components/RandomForestViz"), { ssr: false, loading: () => <Loading /> }),
  "model-evaluation": dynamic(() => import("@/components/ModelEvaluation"), { ssr: false, loading: () => <Loading /> }),
  "bias-variance": dynamic(() => import("@/components/BiasVariance"), { ssr: false, loading: () => <Loading /> }),
  knn: dynamic(() => import("@/components/KNNVisualization"), { ssr: false, loading: () => <Loading /> }),
  imbalanced: dynamic(() => import("@/components/ImbalancedClassification"), { ssr: false, loading: () => <Loading /> }),
  "uts-guide": dynamic(() => import("@/components/UTSGuide"), { ssr: false, loading: () => <Loading /> }),
  "uts-practice": dynamic(() => import("@/components/UTSPractice"), { ssr: false, loading: () => <Loading /> }),
};

function Loading() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f7f4" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12, animation: "pulse 1.5s infinite" }}>📚</div>
        <div style={{ color: "#666", fontSize: 14 }}>Memuat materi...</div>
      </div>
      <style>{`@keyframes pulse { 0%,100% { opacity:1; transform:scale(1) } 50% { opacity:0.5; transform:scale(0.95) } }`}</style>
    </div>
  );
}

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

function useSwipeNavigation(prev: string | null, next: string | null) {
  const router = useRouter();
  const touchStart = useRef<{ x: number; y: number; time: number } | null>(null);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    setSwipeProgress(0);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;

    // Only track horizontal swipes (ignore vertical scrolling)
    if (Math.abs(dy) > Math.abs(dx)) return;

    const progress = Math.min(Math.abs(dx) / 120, 1);
    setSwipeProgress(progress);
    if (dx > 30 && prev) setSwipeDir("right");
    else if (dx < -30 && next) setSwipeDir("left");
    else setSwipeDir(null);
  }, [prev, next]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (!touchStart.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    const dt = Date.now() - touchStart.current.time;

    // Must be primarily horizontal, fast enough, and long enough
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 500) {
      if (dx > 0 && prev) {
        router.push(`/materi/${prev}`);
      } else if (dx < 0 && next) {
        router.push(`/materi/${next}`);
      }
    }
    touchStart.current = null;
    setSwipeDir(null);
    setSwipeProgress(0);
  }, [prev, next, router]);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return { swipeDir, swipeProgress };
}

function useKeyboardNavigation(prevSlug: string | null, nextSlug: string | null) {
  const router = useRouter();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft" && prevSlug) {
        router.push(`/materi/${prevSlug}`);
      } else if (e.key === "ArrowRight" && nextSlug) {
        router.push(`/materi/${nextSlug}`);
      } else if (e.key === "Escape") {
        router.push("/");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prevSlug, nextSlug, router]);
}

export default function MateriPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const material = MATERIALS.find((m) => m.slug === slug);
  const Component = COMPONENT_MAP[slug];
  const isMobile = useIsMobile();

  const currentIdx = MATERIALS.findIndex((m) => m.slug === slug);
  const prev = currentIdx > 0 ? MATERIALS[currentIdx - 1] : null;
  const next = currentIdx < MATERIALS.length - 1 ? MATERIALS[currentIdx + 1] : null;

  const { swipeDir, swipeProgress } = useSwipeNavigation(
    prev?.slug ?? null,
    next?.slug ?? null
  );

  useKeyboardNavigation(prev?.slug ?? null, next?.slug ?? null);

  // Auto-mark as read after 10 seconds
  useEffect(() => {
    if (!material) return;
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem("kasdad-progress");
        const set = new Set<string>(saved ? JSON.parse(saved) : []);
        if (!set.has(slug)) {
          set.add(slug);
          localStorage.setItem("kasdad-progress", JSON.stringify([...set]));
        }
      } catch {}
    }, 10000);
    return () => clearTimeout(timer);
  }, [slug, material]);

  if (!material || !Component) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, background: "#f8f7f4", color: "#333" }}>
        <span style={{ fontSize: 64 }}>🤷</span>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>Materi tidak ditemukan</h1>
        <Link href="/" style={{ color: "#5046e5", fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {/* Swipe edge indicators */}
      {isMobile && swipeDir === "right" && prev && (
        <div style={{
          position: "fixed", top: 0, left: 0, bottom: 0, width: 60, zIndex: 10000,
          background: `linear-gradient(90deg, rgba(80,70,229,${0.15 * swipeProgress}), transparent)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", transition: "opacity 0.15s",
        }}>
          <div style={{
            fontSize: 20, opacity: swipeProgress,
            transform: `translateX(${-10 + swipeProgress * 10}px)`,
          }}>
            ←
          </div>
        </div>
      )}
      {isMobile && swipeDir === "left" && next && (
        <div style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 60, zIndex: 10000,
          background: `linear-gradient(270deg, rgba(80,70,229,${0.15 * swipeProgress}), transparent)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none", transition: "opacity 0.15s",
        }}>
          <div style={{
            fontSize: 20, opacity: swipeProgress,
            transform: `translateX(${10 - swipeProgress * 10}px)`,
          }}>
            →
          </div>
        </div>
      )}

      {/* Floating back button */}
      <Link
        href="/"
        style={{
          position: "fixed", top: isMobile ? 8 : 12, left: isMobile ? 8 : 12, zIndex: 9999,
          display: "flex", alignItems: "center", gap: 6,
          padding: isMobile ? "6px 10px" : "8px 14px", borderRadius: 12,
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          color: "#333", fontSize: isMobile ? 12 : 13, fontWeight: 600, textDecoration: "none",
          transition: "all 0.2s",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>{isMobile ? "" : "Beranda"}</span>
      </Link>

      {/* Material progress indicator (top right) */}
      <div style={{
        position: "fixed", top: isMobile ? 8 : 12, right: isMobile ? 8 : 12, zIndex: 9999,
        display: "flex", alignItems: "center", gap: 6,
        padding: isMobile ? "6px 10px" : "8px 14px", borderRadius: 12,
        background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        fontSize: isMobile ? 11 : 12, fontWeight: 600, color: "#555",
      }}>
        <span>{material.icon}</span>
        <span>{currentIdx + 1}/{MATERIALS.length}</span>
      </div>

      {/* Floating prev/next - responsive */}
      <div style={{
        position: "fixed", bottom: isMobile ? 12 : 16, left: "50%", transform: "translateX(-50%)", zIndex: 9999,
        display: "flex", alignItems: "center", gap: isMobile ? 4 : 8,
        padding: isMobile ? "4px 6px" : "6px 8px", borderRadius: 14,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)",
        border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        maxWidth: isMobile ? "calc(100vw - 24px)" : "auto",
      }}>
        {prev ? (
          <Link href={`/materi/${prev.slug}`} style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: isMobile ? "6px 8px" : "6px 12px", borderRadius: 10, fontSize: isMobile ? 11 : 12, fontWeight: 600,
            color: "#555", textDecoration: "none", background: "rgba(0,0,0,0.04)",
            transition: "all 0.2s",
            maxWidth: isMobile ? 120 : "none",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            <span style={{ flexShrink: 0 }}>←</span>
            <span style={{ flexShrink: 0 }}>{prev.icon}</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{isMobile ? "" : prev.title}</span>
          </Link>
        ) : <div />}
        <Link href="/" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: 32, height: 32, borderRadius: 8, background: "rgba(0,0,0,0.04)",
          color: "#555", textDecoration: "none", fontSize: 14, flexShrink: 0,
        }}>
          ⌂
        </Link>
        {next ? (
          <Link href={`/materi/${next.slug}`} style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: isMobile ? "6px 8px" : "6px 12px", borderRadius: 10, fontSize: isMobile ? 11 : 12, fontWeight: 600,
            color: "#555", textDecoration: "none", background: "rgba(0,0,0,0.04)",
            transition: "all 0.2s",
            maxWidth: isMobile ? 120 : "none",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{isMobile ? "" : next.title}</span>
            <span style={{ flexShrink: 0 }}>{next.icon}</span>
            <span style={{ flexShrink: 0 }}>→</span>
          </Link>
        ) : <div />}
      </div>

      {/* Swipe hint - shown briefly on first visit */}
      <SwipeHint isMobile={isMobile} hasPrev={!!prev} hasNext={!!next} />

      {/* Component renders full-page */}
      <Component />
    </div>
  );
}

function SwipeHint({ isMobile, hasPrev, hasNext }: { isMobile: boolean; hasPrev: boolean; hasNext: boolean }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isMobile) return;
    try {
      const seen = localStorage.getItem("kasdad-swipe-hint-seen");
      if (!seen) {
        setShow(true);
        localStorage.setItem("kasdad-swipe-hint-seen", "1");
        const timer = setTimeout(() => setShow(false), 3500);
        return () => clearTimeout(timer);
      }
    } catch {}
  }, [isMobile]);

  if (!show || !isMobile) return null;

  return (
    <div style={{
      position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      zIndex: 10001, pointerEvents: "none",
      background: "rgba(0,0,0,0.75)", color: "#fff",
      padding: "16px 24px", borderRadius: 16,
      display: "flex", alignItems: "center", gap: 12,
      fontSize: 14, fontWeight: 600,
      animation: "fadeIn 0.3s ease, fadeInUp 0.3s ease",
    }}>
      {hasPrev && <span style={{ animation: "swipeHint 1.2s infinite" }}>←</span>}
      <span>Swipe untuk navigasi</span>
      {hasNext && <span style={{ animation: "swipeHintRight 1.2s infinite" }}>→</span>}
    </div>
  );
}
