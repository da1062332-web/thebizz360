"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * One small engine for the whole site:
 *  1. Reveals [data-scene] containers once (sets [data-in]; never removed).
 *  2. Feeds scroll progress (--p, 0..1) to [data-scroll] elements, rAF-throttled.
 *       data-scroll="enter"   0 when the top enters the viewport, 1 at ~35% from top
 *       data-scroll="through" 0 entering at the bottom, 1 leaving at the top
 *  3. Marks the header link of the section currently in view.
 * It only runs when the inline head script enabled motion (html.js-motion).
 * Attributes it sets are never rendered by React, so re-renders cannot wipe them.
 */
export function MotionEngine() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    const cleanups: Array<() => void> = [];

    // ---- 3. navigation state (runs even without motion) ----
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-nav]"));
    const here = window.location.pathname;
    for (const a of links) {
      const url = new URL(a.href, window.location.href);
      const isPage = !url.hash && url.pathname === here;
      a.toggleAttribute("data-active", isPage);
      if (isPage) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    }
    const sectionLinks = new Map<string, HTMLAnchorElement>();
    for (const a of links) {
      const url = new URL(a.href, window.location.href);
      if (url.hash && url.pathname === here) sectionLinks.set(url.hash.slice(1), a);
    }
    if (sectionLinks.size) {
      const navIO = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const a = sectionLinks.get(e.target.id);
            if (a) a.toggleAttribute("data-active", e.isIntersecting);
          }
        },
        { rootMargin: "-45% 0px -50% 0px" },
      );
      sectionLinks.forEach((_, id) => {
        const el = document.getElementById(id);
        if (el) navIO.observe(el);
      });
      cleanups.push(() => navIO.disconnect());
    }

    if (!root.classList.contains("js-motion")) {
      return () => cleanups.forEach((fn) => fn());
    }
    root.classList.add("motion-live");

    // Replay the first-paint choreography after client-side navigation.
    if (!firstRun.current) {
      root.classList.remove("motion-go");
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("motion-go")));
    } else if (!root.classList.contains("motion-go")) {
      requestAnimationFrame(() => root.classList.add("motion-go"));
    }
    firstRun.current = false;

    // ---- 1. scene reveals (one-shot) ----
    const revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            revealIO.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    document.querySelectorAll('[data-scene]:not([data-in]):not([data-scene="load"])').forEach((el) => revealIO.observe(el));
    cleanups.push(() => revealIO.disconnect());

    // ---- 2. scroll-linked progress ----
    const all = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll]"));
    const active = new Set<HTMLElement>();
    let raf = 0;
    const measure = (el: HTMLElement, vh: number) => {
      const r = el.getBoundingClientRect();
      const p =
        el.dataset.scroll === "enter" ? (vh - r.top) / (vh * 0.65) : (vh - r.top) / (vh + r.height);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(3));
    };
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      active.forEach((el) => measure(el, vh));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // Initial values for every element, so nothing jumps when it first enters.
    const vh0 = window.innerHeight;
    all.forEach((el) => measure(el, vh0));

    const scrollIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) active.add(el);
          else {
            active.delete(el);
            measure(el, window.innerHeight); // park at 0 or 1
          }
        }
        schedule();
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    all.forEach((el) => scrollIO.observe(el));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    cleanups.push(() => {
      scrollIO.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    });

    // If the visitor switches on reduced motion mid-visit, show everything at rest.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPref = () => {
      if (mq.matches) {
        root.classList.remove("js-motion");
        all.forEach((el) => el.style.removeProperty("--p"));
      }
    };
    mq.addEventListener("change", onPref);
    cleanups.push(() => mq.removeEventListener("change", onPref));

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}

/** Runs before first paint. Enables motion only when it is safe and wanted. */
export const motionBootScript = `(function(){try{var d=document.documentElement;
if(!window.matchMedia||matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window))return;
d.classList.add('js-motion');
var go=function(){requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.add('motion-go');});});};
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',go);}else{go();}
setTimeout(function(){if(!d.classList.contains('motion-live')){d.classList.remove('js-motion');}},3500);
}catch(e){}})();`;
