"use client";
import { createContext, useContext, useCallback, useRef, useEffect } from "react";

interface TabNavigation {
  /** Array of tab/section IDs in order */
  tabIds: string[];
  /** Current active tab ID */
  currentTabId: string;
  /** Function to set the active tab */
  setTab: (id: string) => void;
}

interface SwipeNavigationContextValue {
  /** Register component's tab navigation. Returns unregister function. */
  register: (nav: TabNavigation) => () => void;
  /** Called by materi page when swipe-right (next) is detected. Returns true if handled by tabs. */
  handleSwipeNext: () => boolean;
  /** Called by materi page when swipe-left (prev) is detected. Returns true if handled by tabs. */
  handleSwipePrev: () => boolean;
}

const SwipeNavigationContext = createContext<SwipeNavigationContextValue>({
  register: () => () => {},
  handleSwipeNext: () => false,
  handleSwipePrev: () => false,
});

export function useSwipeNavigationProvider() {
  const navRef = useRef<TabNavigation | null>(null);

  const register = useCallback((nav: TabNavigation) => {
    navRef.current = nav;
    return () => {
      if (navRef.current === nav) navRef.current = null;
    };
  }, []);

  const handleSwipeNext = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return false;
    const idx = nav.tabIds.indexOf(nav.currentTabId);
    if (idx < nav.tabIds.length - 1) {
      nav.setTab(nav.tabIds[idx + 1]);
      return true; // handled
    }
    return false; // at last tab, let materi page navigate to next material
  }, []);

  const handleSwipePrev = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return false;
    const idx = nav.tabIds.indexOf(nav.currentTabId);
    if (idx > 0) {
      nav.setTab(nav.tabIds[idx - 1]);
      return true; // handled
    }
    return false; // at first tab, let materi page navigate to prev material
  }, []);

  return { register, handleSwipeNext, handleSwipePrev };
}

export { SwipeNavigationContext };

/** Hook for components to register their tab navigation with the swipe system */
export function useTabSwipe(tabIds: string[], currentTabId: string, setTab: (id: string) => void) {
  const ctx = useContext(SwipeNavigationContext);

  // Keep the ref updated with latest values
  const latestRef = useRef({ tabIds, currentTabId, setTab });
  latestRef.current = { tabIds, currentTabId, setTab };

  useEffect(() => {
    const proxy: TabNavigation = {
      get tabIds() { return latestRef.current.tabIds; },
      get currentTabId() { return latestRef.current.currentTabId; },
      get setTab() { return latestRef.current.setTab; },
    };
    return ctx.register(proxy);
  }, [ctx]);
}
