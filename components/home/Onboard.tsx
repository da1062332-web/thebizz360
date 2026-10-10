import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ArrowRight } from "@/components/Icons";
import { m } from "@/components/motion/Words";
import { images } from "@/lib/images";
import { PARTNER_PATH } from "@/lib/site";
import s from "./Onboard.module.css";

const value = [
  "A more connected tenant experience",
  "Better discovery of participating businesses",
  "Convenient access to food and everyday services",
  "A digital layer for commercial community engagement",
];

/* Composed: the tower rises behind a vertical mask while the brand seam draws down;
   copy follows in reading order. The photo drifts gently with scroll. */
export function Onboard() {
  return (
    <section id="for-complexes" className={`${s.section} on-dark`} aria-labelledby="onboard-title">
      <div className={s.grid}>
        <div className={s.copy} data-scene>
          <p className={s.eyebrow} data-m="fade">
            For commercial complexes
          </p>
          <h2 id="onboard-title" className={s.title} data-m="rise" style={m({ "--d": "80ms", "--dur": "640ms", "--ease": "var(--ease-edit)" })}>
            Make Your Commercial Complex More Connected.
          </h2>
          <p className={s.lede} data-m="rise" style={m({ "--d": "200ms" })}>
            Give tenants a simpler way to discover participating food outlets, useful services, and businesses within
            their own commercial ecosystem.
          </p>
          <ol className={s.value}>
            {value.map((v, i) => (
              <li key={v} data-m="rise-sm" style={m({ "--d": `${280 + i * 70}ms` })}>
                <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                {v}
              </li>
            ))}
          </ol>
          <div className={s.ctas} data-m="rise" style={m({ "--d": "560ms" })}>
            <Link href={PARTNER_PATH} className="btn btn--gold">
              Discuss Your Complex <ArrowRight />
            </Link>
            <Link href="/for-complexes/" className="btn btn--ghost-light">
              Learn more
            </Link>
          </div>
          <p className={s.fit} data-m="fade" style={m({ "--d": "680ms" })}>
            Designed for independent commercial buildings, business parks, office campuses, and multi-tenant commercial
            developments, in any city.
          </p>
        </div>
        <div className={s.media} data-scene data-scroll="through">
          <div className={s.mask} data-m="wipe-up" style={m({ "--dur": "1000ms", "--ease": "var(--ease-edit)" })}>
            <Pic
              img={images.workTower}
              sizes="(max-width: 900px) 100vw, 50vw"
              className={s.photo}
              motion="zoom"
              style={m({ "--dur": "1400ms", "--ease": "var(--ease-edit)" })}
            />
          </div>
          <span className={s.seam} aria-hidden="true" data-m="line-y" style={m({ "--d": "300ms", "--dur": "900ms", "--ease": "var(--ease-edit)" })} />
        </div>
      </div>
    </section>
  );
}
