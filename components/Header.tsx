import Link from "next/link";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { BOOKING_URL, PARTNER_PATH, SIGN_IN_URL } from "@/lib/site";
import styles from "./Header.module.css";

export const navLinks = [
  { href: "/#food", label: "Food", tone: "food" },
  { href: "/#work", label: "Work", tone: "work" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/for-complexes/", label: "For Complexes" },
] as const;

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label="thebizz360 home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className={styles.nav}>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link} data-nav data-tone={"tone" in l ? l.tone : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a href={BOOKING_URL} className={`btn btn--outline btn--sm ${styles.signin}`} target="_blank" rel="noopener">
          Book a Call
        </a>
        <a href={SIGN_IN_URL} className={`btn btn--ink btn--sm ${styles.signin}`}>
          Sign In
        </a>

        <MobileNav links={navLinks.map(({ href, label }) => ({ href, label }))} signInUrl={SIGN_IN_URL} bookingUrl={BOOKING_URL} partnerPath={PARTNER_PATH} />
      </div>
    </header>
  );
}
