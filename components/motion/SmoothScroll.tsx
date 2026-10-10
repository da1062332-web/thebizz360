"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum ("smooth") scrolling for mouse wheels and trackpads, via Lenis.
 * Touch devices keep native scrolling. Skipped entirely for reduced-motion users.
 * Settings match the reference feel the owner asked for (ovienterprises.com).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      overscroll: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      autoRaf: true,
      // Let textareas and selects scroll their own content.
      prevent: (node) => node.nodeName === "TEXTAREA" || node.nodeName === "SELECT",
    });

    // Glide to same-page anchors (e.g. "/#food" while on "/") instead of jumping.
    // Runs before Next.js <Link>, which skips its own handling once default is prevented.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      history.pushState(history.state, "", url.hash);
      lenis.scrollTo(el, {
        duration: 1.4,
        // Move focus for keyboard and screen-reader users once the scroll lands.
        onComplete: () => {
          if (!el.hasAttribute("tabindex") && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
            el.setAttribute("tabindex", "-1");
          }
          el.focus({ preventScroll: true });
        },
      });
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      lenis.destroy();
    };
  }, []);

  return null;
}
