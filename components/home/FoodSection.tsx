import { Pic } from "@/components/Pic";
import { ArrowRight, Check } from "@/components/Icons";
import { Words, m } from "@/components/motion/Words";
import { images } from "@/lib/images";
import { FOOD_APP_URL } from "@/lib/site";
import s from "./FoodSection.module.css";

const benefits = [
  "Discover food options within the complex",
  "Browse available food categories and offers",
  "Order conveniently from your workplace",
];

const skips = [
  { strike: "The queue", line: "Skip it." },
  { strike: "The walk downstairs", line: "Not needed." },
  { strike: "Waiting around", line: "Less of it." },
  { strike: "Leaving your desk", line: "Order from it." },
];

/*
 * Food choreography — comic campaign energy, kept short:
 *  copy scene:   tag -> headline words slide in with speed lines (overshoot)
 *                -> hand-drawn underline -> lede -> ticks spring -> CTA -> speech bubble pops last
 *  visual scene: comic panel snaps open -> thali emerges through a circle
 *                -> phone is flung in -> "One delivery" sticker pops
 *  strip scene:  strike-throughs draw across each "thing you skip"
 */
export function FoodSection() {
  return (
    <section id="food" className={s.food} aria-labelledby="food-title" data-scroll="through">
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy} data-scene>
          <p className={s.tag} data-m="from-left" style={m({ "--d": "0ms", "--dur": "420ms" })}>
            <span className={s.tagDot} aria-hidden="true" /> Food
          </p>
          <p
            className={s.bubble}
            lang="hi-Latn"
            data-m="pop"
            style={m({ "--d": "720ms", "--dur": "560ms", "--ease": "var(--ease-pop)", "--r0": "-16deg" })}
          >
            Bhook Lagi? <strong>Office Se Hi Order Karo!</strong>
          </p>
          <h2
            id="food-title"
            className={s.title}
            data-m="words-food"
            style={m({ "--d": "60ms", "--step": "60ms", "--dur": "560ms", "--ease": "var(--ease-spring)" })}
          >
            <span className="speed" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <Words
              text="Hungry? Your Favourite Food Is Closer Than You Think."
              render={(w) =>
                w === "Closer" ? (
                  <span className={s.scribble}>
                    {w}
                    <svg viewBox="0 0 240 16" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                      <path
                        d="M3 10 C 40 3, 78 14, 118 7 S 196 4, 237 9"
                        pathLength={1}
                        data-m="draw"
                        style={m({ "--d": "640ms", "--dur": "520ms" })}
                      />
                    </svg>
                  </span>
                ) : (
                  w
                )
              }
            />
          </h2>
          <p className={s.lede} data-m="rise" style={m({ "--d": "380ms" })}>
            Explore participating food outlets inside your complex, discover available offers, and order meals directly
            from your office.
          </p>
          <ul className={`checks ${s.checks}`}>
            {benefits.map((b, i) => (
              <li key={b} data-m="rise-sm" style={m({ "--d": `${460 + i * 70}ms`, "--dur": "420ms" })}>
                <span className="tick" data-m="pop" style={m({ "--d": `${500 + i * 70}ms`, "--dur": "420ms", "--ease": "var(--ease-pop)", "--r0": "0deg" })}>
                  <Check />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <div data-m="rise" style={m({ "--d": "640ms", "--ease": "var(--ease-spring)" })}>
            <a href={FOOD_APP_URL} className="btn btn--comic">
              Explore Food <ArrowRight />
            </a>
          </div>
        </div>

        <div className={s.visual} data-scene>
          <div className={s.exit}>
            <figure
              className={s.photo}
              data-m="panel"
              style={m({ "--d": "60ms", "--dur": "760ms", "--ease": "var(--ease-spring)" })}
            >
              <Pic
                img={images.foodThali}
                sizes="(max-width: 900px) 92vw, 560px"
                motion="circle"
                style={m({ "--d": "260ms", "--dur": "820ms", "--ease": "var(--ease-edit)" })}
              />
            </figure>
            <figure
              className={`phone ${s.phone}`}
              data-m="fling"
              style={m({ "--d": "420ms", "--dur": "760ms", "--ease": "var(--ease-spring)" })}
            >
              <Pic img={images.foodApp} sizes="(max-width: 900px) 44vw, 240px" />
            </figure>
            <p
              className={s.sticker}
              aria-hidden="true"
              data-m="pop"
              style={m({ "--d": "820ms", "--dur": "520ms", "--ease": "var(--ease-pop)", "--r0": "24deg" })}
            >
              Order multiple shops.
              <br />
              <strong>One delivery.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className={s.strip} data-scene>
        <ul className={`wrap ${s.skips}`} aria-label="What you can skip">
          {skips.map((k, i) => (
            <li key={k.strike} data-m="rise-sm" style={m({ "--d": `${i * 80}ms`, "--dur": "380ms" })}>
              <s>
                {k.strike}
                <span
                  className={s.strikeLine}
                  aria-hidden="true"
                  data-m="line-x"
                  style={m({ "--d": `${180 + i * 80}ms`, "--dur": "320ms", "--ease": "var(--ease-out)" })}
                />
              </s>
              <span className={s.skipLine}>{k.line}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
