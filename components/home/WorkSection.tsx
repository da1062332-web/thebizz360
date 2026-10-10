import { Pic } from "@/components/Pic";
import { ArrowRight } from "@/components/Icons";
import { Words, m } from "@/components/motion/Words";
import { images } from "@/lib/images";
import { WORK_APP_URL } from "@/lib/site";
import s from "./WorkSection.module.css";

const benefits = [
  { title: "Find relevant services", body: "Locate the services you need inside your own complex." },
  { title: "Discover participating businesses", body: "See which offices and businesses share your building or campus." },
  { title: "Explore collaborations", body: "Spot potential partners a few floors away." },
  { title: "A more relevant community", body: "Connect with the professional community you already work beside." },
];

const directory = [
  { name: "CA & tax consultants", kind: "Professional services" },
  { name: "Printing & branding", kind: "Business services" },
  { name: "Salons & wellness", kind: "Everyday essentials" },
  { name: "Clinics & pharmacies", kind: "Health" },
  { name: "Banks & financial services", kind: "Finance" },
  { name: "Offices & professional firms", kind: "Collaboration" },
];

/*
 * Food -> Work handover (scroll-linked, never blocks scrolling):
 *  the plum surface opens from an inset panel on the ink strip to full bleed,
 *  while a gold line travels across the boundary.
 * Work choreography — editorial and composed, no bounce:
 *  headline words rise through masks -> photo wipes up with a gold edge line
 *  -> phone wipes in from the right -> lede -> benefit rules draw -> CTA.
 */
export function WorkSection() {
  return (
    <div className={s.stage} data-scroll="enter">
      <section id="work" className={`${s.work} on-dark`} aria-labelledby="work-title">
        <span className={s.goldLine} aria-hidden="true" />
        <div className={`wrap ${s.grid}`} data-scroll="through">
          <div className={s.copy} data-scene>
            <p className={s.tag} data-m="fade" style={m({ "--d": "0ms" })}>
              <span className={s.tagDot} aria-hidden="true" /> Work
            </p>
            <h2
              id="work-title"
              className={s.title}
              data-m="words-work"
              style={m({ "--d": "80ms", "--step": "70ms", "--dur": "820ms", "--ease": "var(--ease-edit)" })}
            >
              <Words text="Discover the Businesses Around Your" /> <span className="w"><span style={m({ "--i": 5 })}><em>Workday.</em></span></span>
            </h2>
            <p className={s.lede} data-m="rise" style={m({ "--d": "420ms", "--ease": "var(--ease-edit)" })}>
              From professional services to everyday essentials, explore participating businesses and discover new
              opportunities within your own commercial ecosystem.
            </p>
            <dl className={s.benefits}>
              {benefits.map((b, i) => (
                <div key={b.title} data-m="rise-sm" style={m({ "--d": `${520 + i * 70}ms`, "--ease": "var(--ease-edit)" })}>
                  <span
                    className={s.rule}
                    aria-hidden="true"
                    data-m="line-x"
                    style={m({ "--d": `${480 + i * 70}ms`, "--dur": "700ms", "--ease": "var(--ease-edit)" })}
                  />
                  <dt>{b.title}</dt>
                  <dd>{b.body}</dd>
                </div>
              ))}
            </dl>
            <div data-m="rise" style={m({ "--d": "760ms", "--ease": "var(--ease-edit)" })}>
              <a href={WORK_APP_URL} className="btn btn--gold">
                Explore Work <ArrowRight />
              </a>
            </div>
          </div>

          <div className={s.visual} data-scene>
            <figure
              className={s.photo}
              data-m="wipe-up"
              style={m({ "--d": "120ms", "--dur": "900ms", "--ease": "var(--ease-edit)" })}
            >
              <Pic
                img={images.workMeetingRoom}
                sizes="(max-width: 900px) 92vw, 540px"
                motion="zoom"
                style={m({ "--d": "120ms", "--dur": "1200ms", "--ease": "var(--ease-edit)" })}
              />
            </figure>
            <span
              className={s.edge}
              aria-hidden="true"
              data-m="line-y"
              style={m({ "--d": "520ms", "--dur": "800ms", "--ease": "var(--ease-edit)" })}
            />
            <figure
              className={`phone ${s.phone}`}
              data-m="wipe-right"
              style={m({ "--d": "460ms", "--dur": "820ms", "--ease": "var(--ease-edit)" })}
            >
              <Pic img={images.workApp} sizes="(max-width: 900px) 44vw, 240px" />
            </figure>
          </div>
        </div>

        <div className="wrap">
          <div className={s.board} data-scene>
            <span className={s.boardFrame} aria-hidden="true" data-m="fade" style={m({ "--dur": "900ms" })} />
            <div className={s.boardHead}>
              <p
                className={s.quote}
                data-m="words-work"
                style={m({ "--d": "120ms", "--step": "55ms", "--dur": "760ms", "--ease": "var(--ease-edit)" })}
              >
                <Words text="Your next business connection could be on another floor." />
              </p>
              <p className={s.boardNote} data-m="rise" style={m({ "--d": "520ms", "--ease": "var(--ease-edit)" })}>
                Discovery on Work is designed around your own complex. Participating businesses are presented to members
                of their commercial community rather than published as an open public directory.
              </p>
            </div>
            <div className={s.boardBody}>
              <p className={s.boardLabel} data-m="fade" style={m({ "--d": "200ms" })}>
                Examples of what you might find
              </p>
              <ul className={s.rows}>
                {directory.map((d, i) => (
                  <li key={d.name} data-m="from-left" style={m({ "--d": `${260 + i * 60}ms`, "--dur": "560ms", "--ease": "var(--ease-edit)" })}>
                    <span className={s.rowName}>{d.name}</span>
                    <span
                      className={s.leader}
                      aria-hidden="true"
                      data-m="line-x"
                      style={m({ "--d": `${420 + i * 60}ms`, "--dur": "620ms", "--ease": "var(--ease-edit)" })}
                    />
                    <span className={s.rowKind}>{d.kind}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
