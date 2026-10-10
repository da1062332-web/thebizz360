import Link from "next/link";

/** Shown until the business supplies real legal text. Pages using it are noindex. */
export function LegalPlaceholder({ title }: { title: string }) {
  return (
    <section className="wrap" style={{ padding: "clamp(48px, 8vw, 104px) var(--gutter)", maxWidth: 820 }}>
      <p className="eyebrow">Legal</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", margin: "18px 0 24px" }}>
        {title}
      </h1>
      <p>
        The thebizz360 {title.toLowerCase()} is being finalised and will be published on this page.
      </p>
      <p>
        If you are a member of a participating complex, the terms shown inside the application apply to your use of it.
      </p>
      <p>
        <Link href="/" className="text-link">
          Back to home
        </Link>
      </p>
    </section>
  );
}
