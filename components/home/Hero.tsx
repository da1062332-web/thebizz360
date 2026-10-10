import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ArrowRight } from "@/components/Icons";
import { m } from "@/components/motion/Words";
import { images } from "@/lib/images";
import { SIGN_IN_URL } from "@/lib/site";
import s from "./Hero.module.css";

/*
 * Hero choreography (first paint, ~1.1s total, text readable by ~0.6s):
 *  kicker -> headline words rise through masks -> lede -> CTAs -> partner link
 *  stage: orange field wipes up, plum field wipes down, Food phone is flung in
 *  with a spring, Work phone glides in from the right, labels settle last.
 */
const word = (text: string, i: number, className?: string) => (
  <span className="w">
    <span className={className} style={m({ "--i": i })}>
      {text}
    </span>
  </span>
);

export function Hero() {
  return (
    <section className={s.hero} aria-labelledby="hero-title" data-scene="load">
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <h1 id="hero-title" className={s.title}>
            <span className={s.kicker} data-m="rise-sm" style={m({ "--d": "0ms" })}>
              Food ordering &amp; business discovery for commercial complexes
            </span>{" "}
            <span
              className={s.headline}
              data-m="words"
              style={m({ "--d": "90ms", "--step": "80ms", "--dur": "760ms", "--ease": "var(--ease-edit)" })}
            >
              {word("Your", 0)} {word("Complex.", 1)} {word("More", 2, s.more)}{" "}
              {word("Connected.", 3, s.connected)}
            </span>
          </h1>
          <p className={s.lede} data-m="rise" style={m({ "--d": "420ms" })}>
            Order from participating food outlets, discover useful services, and connect with businesses around your
            workplace, all through one digital ecosystem.
          </p>
          <div className={s.ctas} data-m="rise" style={m({ "--d": "520ms" })}>
            <a href={SIGN_IN_URL} className="btn btn--ink">
              Sign In to theBizz360 <ArrowRight />
            </a>
            <Link href="#platform" className="btn btn--outline">
              Discover the Platform
            </Link>
          </div>
          <div data-m="fade" style={m({ "--d": "680ms" })}>
            <Link href="/for-complexes/" className={s.partner}>
              <span>Manage a commercial property?</span> For Commercial Complexes <ArrowRight />
            </Link>
          </div>
        </div>

        <div className={s.stage} data-scroll="through">
          <div
            className={s.slabFood}
            aria-hidden="true"
            data-m="wipe-up"
            style={m({ "--d": "120ms", "--dur": "760ms", "--ease": "var(--ease-edit)" })}
          >
            <span className={s.slabLabel} data-m="pop" style={m({ "--d": "880ms", "--dur": "520ms", "--ease": "var(--ease-pop)" })}>
              Food
            </span>
          </div>
          <div
            className={s.slabWork}
            aria-hidden="true"
            data-m="wipe-down"
            style={m({ "--d": "240ms", "--dur": "760ms", "--ease": "var(--ease-edit)" })}
          >
            <span className={s.slabLabel} data-m="fade" style={m({ "--d": "960ms" })}>
              Work
            </span>
          </div>
          <figure
            className={`phone ${s.phoneFood}`}
            data-m="fling"
            style={m({ "--d": "380ms", "--dur": "820ms", "--ease": "var(--ease-spring)" })}
          >
            <Pic img={images.foodApp} sizes="(max-width: 900px) 46vw, 270px" priority />
          </figure>
          <figure
            className={`phone ${s.phoneWork}`}
            data-m="from-right"
            style={m({ "--d": "520ms", "--dur": "820ms", "--ease": "var(--ease-edit)" })}
          >
            <Pic img={images.workApp} sizes="(max-width: 900px) 46vw, 270px" priority />
          </figure>
          <p className={s.caption} data-m="fade" style={m({ "--d": "1000ms" })}>
            Actual thebizz360 app screens. One app, with a single switch between Food and Work.
          </p>
        </div>
      </div>
    </section>
  );
}
