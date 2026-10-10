import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { m } from "@/components/motion/Words";
import { PARTNER_PATH, SIGN_IN_URL } from "@/lib/site";
import s from "./FinalCta.module.css";

/* Closing beat: the brand ring draws its Food and Work halves, then the line lands. */
export function FinalCta() {
  return (
    <section className={s.section} aria-labelledby="final-title">
      <div className={`wrap ${s.inner}`} data-scene>
        <span className={s.mark} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" focusable="false">
            <path
              d="M32 12a20 20 0 0 0 0 40"
              fill="none"
              stroke="var(--orange)"
              strokeWidth="9"
              strokeLinecap="round"
              pathLength={1}
              data-m="draw"
              style={m({ "--dur": "700ms", "--ease": "var(--ease-edit)" })}
            />
            <path
              d="M32 52a20 20 0 0 0 0-40"
              fill="none"
              stroke="var(--violet)"
              strokeWidth="9"
              strokeLinecap="round"
              pathLength={1}
              data-m="draw"
              style={m({ "--d": "160ms", "--dur": "700ms", "--ease": "var(--ease-edit)" })}
            />
            <circle cx="32" cy="32" r="5" fill="currentColor" data-m="fade" style={m({ "--d": "600ms" })} />
          </svg>
        </span>
        <h2 id="final-title" className={s.title} data-m="rise" style={m({ "--d": "200ms", "--dur": "700ms", "--ease": "var(--ease-edit)" })}>
          Your Workplace Has More to Offer. <span>Discover It.</span>
        </h2>
        <p className={s.lede} data-m="rise" style={m({ "--d": "340ms" })}>
          From your next meal to your next business connection, explore more of the ecosystem around you.
        </p>
        <div className={s.ctas} data-m="rise" style={m({ "--d": "440ms" })}>
          <a href={SIGN_IN_URL} className="btn btn--ink">
            Sign In to theBizz360 <ArrowRight />
          </a>
          <Link href={PARTNER_PATH} className="btn btn--outline">
            Bring theBizz360 to Your Complex
          </Link>
        </div>
      </div>
    </section>
  );
}
