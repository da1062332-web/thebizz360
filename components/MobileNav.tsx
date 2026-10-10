"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Close, Menu } from "./Icons";
import styles from "./Header.module.css";

type Props = { links: { href: string; label: string }[]; signInUrl: string; bookingUrl: string; partnerPath: string };

export function MobileNav({ links, signInUrl, bookingUrl, partnerPath }: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={styles.mobile}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="mobile-menu"
        data-open={open || undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <Close /> : <Menu />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {/* Always rendered so it can animate; `inert` + visibility keep it out of reach when closed. */}
      <div id="mobile-menu" ref={panelRef} className={styles.panel} data-open={open || undefined} inert={!open} data-lenis-prevent>
        <nav aria-label="Mobile">
          <ul>
            {links.map((l, i) => (
              <li key={l.href} style={{ "--i": i } as CSSProperties}>
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.panelCtas} style={{ "--i": links.length } as CSSProperties}>
          <a href={signInUrl} className="btn btn--ink btn--block">
            Sign In to theBizz360
          </a>
          <a href={bookingUrl} className="btn btn--outline btn--block" target="_blank" rel="noopener">
            Book a Call
          </a>
          <Link href={partnerPath} className="btn btn--outline btn--block" onClick={() => setOpen(false)}>
            Bring theBizz360 to Your Complex
          </Link>
        </div>
      </div>
    </div>
  );
}
