import type { Metadata } from "next";
import Link from "next/link";
import { SIGN_IN_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section className="wrap" style={{ padding: "clamp(64px, 10vw, 140px) var(--gutter)", textAlign: "center" }}>
      <p className="eyebrow">Error 404</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.4rem)", margin: "18px 0 16px" }}>
        This floor doesn&apos;t exist.
      </h1>
      <p style={{ color: "var(--ink-2)" }}>The page you were looking for could not be found.</p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
        <Link href="/" className="btn btn--outline">
          Back to home
        </Link>
        <a href={SIGN_IN_URL} className="btn btn--ink">
          Sign In to theBizz360
        </a>
      </div>
    </section>
  );
}
