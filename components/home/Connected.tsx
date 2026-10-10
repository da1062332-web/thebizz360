import { Pic } from "@/components/Pic";
import { m } from "@/components/motion/Words";
import { images } from "@/lib/images";
import s from "./Connected.module.css";

/* Split-panel reveal: the two halves wipe in from opposite edges and meet at the seam,
   then the app's Food | Work switch settles onto it. */
export function Connected() {
  return (
    <section id="platform" className={s.section} aria-labelledby="platform-title">
      <div className={`wrap ${s.head}`} data-scene>
        <p className="eyebrow" data-m="fade">
          One platform, two experiences
        </p>
        <h2 id="platform-title" className={s.title} data-m="rise" style={m({ "--d": "80ms", "--dur": "640ms" })}>
          Everything Around Your Workplace. Connected.
        </h2>
        <p className={s.lede} data-m="rise" style={m({ "--d": "200ms" })}>
          thebizz360 helps members make better use of the ecosystem around them. Together, Food and Work create a more
          useful digital experience for employees, businesses, and commercial communities.
        </p>
      </div>

      <div className={`wrap ${s.split}`} data-scene>
        <article className={s.food} data-m="wipe-left" style={m({ "--dur": "760ms", "--ease": "var(--ease-edit)" })}>
          <div className={s.media}>
            <Pic
              img={images.foodDesk}
              sizes="(max-width: 800px) 92vw, 560px"
              className={s.photo}
              alt=""
              motion="zoom"
              style={m({ "--dur": "1100ms", "--ease": "var(--ease-edit)" })}
            />
          </div>
          <div className={s.body} data-m="rise-sm" style={m({ "--d": "320ms" })}>
            <p className={s.label}>Food</p>
            <h3>Everyday convenience</h3>
            <p>Meals, categories and offers from participating outlets in your complex, ordered from your desk.</p>
          </div>
        </article>

        <div
          className={s.switch}
          aria-hidden="true"
          data-m="settle"
          style={m({ "--d": "620ms", "--dur": "520ms", "--ease": "var(--ease-spring)" })}
        >
          <span className={s.knobFood}>Food</span>
          <span className={s.knobWork}>Work</span>
        </div>

        <article
          className={s.work}
          data-m="wipe-right"
          style={m({ "--d": "120ms", "--dur": "760ms", "--ease": "var(--ease-edit)" })}
        >
          <div className={s.media}>
            <Pic
              img={images.workLobby}
              sizes="(max-width: 800px) 92vw, 560px"
              className={s.photo}
              alt=""
              motion="zoom"
              style={m({ "--d": "120ms", "--dur": "1100ms", "--ease": "var(--ease-edit)" })}
            />
          </div>
          <div className={s.body} data-m="rise-sm" style={m({ "--d": "420ms" })}>
            <p className={s.label}>Work</p>
            <h3>Service discovery &amp; professional connectivity</h3>
            <p>Find participating businesses and services, and the people behind them, a few floors away.</p>
          </div>
        </article>
      </div>
      <p className={`wrap ${s.note}`}>Both live in one app. Members switch between them with a single toggle.</p>
    </section>
  );
}
