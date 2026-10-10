import { SIGN_IN_URL } from "@/lib/site";
import { m } from "@/components/motion/Words";
import s from "./HowItWorks.module.css";

const steps = [
  {
    n: "01",
    title: "Sign In",
    body: "Access the platform through the existing thebizz360 login.",
    link: { href: SIGN_IN_URL, label: "Go to sign in" },
  },
  {
    n: "02",
    title: "Choose Your Experience",
    body: "Explore Food for ordering, and Work for business and service discovery.",
  },
  {
    n: "03",
    title: "Discover Your Ecosystem",
    body: "Find participating food outlets, services, and businesses relevant to your complex.",
  },
];

/* Restrained: rules draw left to right, then each step rises in reading order. */
export function HowItWorks() {
  return (
    <section id="how-it-works" className={s.section} aria-labelledby="how-title">
      <div className="wrap">
        <div className={s.head} data-scene>
          <p className="eyebrow" data-m="fade">
            How it works
          </p>
          <h2 id="how-title" className={s.title} data-m="rise" style={m({ "--d": "80ms" })}>
            Three steps to the ecosystem around you.
          </h2>
        </div>
        <ol className={s.steps} data-scene>
          {steps.map((st, i) => (
            <li key={st.n}>
              <span
                className={s.rule}
                aria-hidden="true"
                data-m="line-x"
                style={m({ "--d": `${i * 120}ms`, "--dur": "640ms", "--ease": "var(--ease-edit)" })}
              />
              <div data-m="rise" style={m({ "--d": `${120 + i * 120}ms` })}>
                <span className={s.num} aria-hidden="true">
                  {st.n}
                </span>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
                {st.link && (
                  <a href={st.link.href} className="text-link">
                    {st.link.label}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
