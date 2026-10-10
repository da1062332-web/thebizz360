import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ArrowRight } from "@/components/Icons";
import { images } from "@/lib/images";
import { PARTNER_PATH } from "@/lib/site";
import { m } from "@/components/motion/Words";
import s from "./Communities.module.css";

const groups = [
  {
    label: "Inside the complex",
    items: [
      {
        who: "Employees & professionals",
        what: "Discover food, services, and businesses available within your complex.",
        uses: ["Food", "Work"],
      },
      {
        who: "Offices & businesses",
        what: "Help the relevant tenant community discover the services your business offers.",
        uses: ["Work"],
      },
      {
        who: "Food outlets & shops",
        what: "Reach participating members of the commercial ecosystem.",
        uses: ["Food", "Work"],
      },
    ],
  },
  {
    label: "Running the complex",
    items: [
      {
        who: "Property managers",
        what: "Offer tenants a more connected digital experience across participating businesses and services.",
        uses: [],
      },
      {
        who: "Commercial complex owners",
        what: "Explore a platform designed to support digital discovery and convenience across multi-tenant commercial properties.",
        uses: [],
      },
    ],
  },
];

export function Communities() {
  return (
    <section id="communities" className={s.section} aria-labelledby="communities-title">
      <div className={`wrap ${s.grid}`}>
        <div className={s.aside} data-scene>
          <p className="eyebrow" data-m="fade">Who it&apos;s for</p>
          <h2 id="communities-title" className={s.title} data-m="rise" style={m({ "--d": "80ms" })}>
            Built for Commercial Communities.
          </h2>
          <p className={s.lede} data-m="rise" style={m({ "--d": "180ms" })}>
            A commercial complex is a small economy. thebizz360 gives every part of it a reason to connect.
          </p>
          <div className={s.photoMask} data-m="rounded" style={m({ "--d": "200ms", "--dur": "900ms", "--ease": "var(--ease-edit)" })}>
            <Pic
              img={images.workLounge}
              sizes="(max-width: 900px) 92vw, 420px"
              className={s.photo}
              motion="zoom"
              style={m({ "--d": "200ms", "--dur": "1200ms", "--ease": "var(--ease-edit)" })}
            />
          </div>
          <div data-m="rise" style={m({ "--d": "420ms" })}>
            <Link href={PARTNER_PATH} className="btn btn--ink">
              Bring theBizz360 to Your Complex <ArrowRight />
            </Link>
          </div>
        </div>

        <div className={s.list}>
          {groups.map((g) => (
            <div key={g.label} className={s.group} data-scene>
              <h3 className={s.groupLabel} data-m="fade">{g.label}</h3>
              <ul>
                {g.items.map((it, i) => (
                  <li key={it.who} className={s.row} data-m="rise" style={m({ "--d": `${100 + i * 90}ms` })}>
                    <p className={s.who}>{it.who}</p>
                    <p className={s.what}>{it.what}</p>
                    {it.uses.length > 0 && (
                      <p className={s.uses}>
                        <span className="sr-only">Uses: </span>
                        {it.uses.map((u) => (
                          <span key={u} data-tone={u.toLowerCase()}>
                            {u}
                          </span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
