import type { Metadata } from "next";
import Link from "next/link";
import { Pic } from "@/components/Pic";
import { ArrowRight } from "@/components/Icons";
import { EnquiryPanel } from "@/components/EnquiryPanel";
import { JsonLd } from "@/components/JsonLd";
import { images } from "@/lib/images";
import { SIGN_IN_URL, SITE_URL } from "@/lib/site";
import { m } from "@/components/motion/Words";
import s from "./page.module.css";

const title = "Tenant Experience Platform for Commercial Complexes";
const description =
  "Bring thebizz360 to your commercial complex: food ordering from participating outlets and business discovery for tenants, in one connected platform.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/for-complexes/" },
  openGraph: { title: `${title} | thebizz360`, description, url: "/for-complexes/" },
  twitter: { title: `${title} | thebizz360`, description },
};

const propertyTypes = [
  { name: "Independent commercial buildings", body: "Single towers where tenants rarely know what the floor below offers." },
  { name: "Business parks", body: "Multi-building campuses with food courts, services and many offices." },
  { name: "Office campuses", body: "Shared amenities and service providers serving a large workforce." },
  { name: "Multi-tenant developments", body: "Mixed commercial properties combining offices, retail and food." },
];

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "For Commercial Complexes", item: `${SITE_URL}/for-complexes/` },
  ],
};

export default function ForComplexesPage() {
  return (
    <>
      <section className={s.hero} aria-labelledby="fc-title" data-scene="load">
        <div className={`wrap ${s.heroGrid}`}>
          <div>
            <nav aria-label="Breadcrumb" className={s.crumbs} data-m="fade">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">For Commercial Complexes</span>
            </nav>
            <h1 id="fc-title" className={s.title} data-m="rise" style={m({ "--d": "80ms", "--dur": "700ms", "--ease": "var(--ease-edit)" })}>
              <span className={s.kicker}>For property managers &amp; owners</span>
              A tenant experience platform for commercial complexes.
            </h1>
            <p className={s.lede} data-m="rise" style={m({ "--d": "240ms" })}>
              thebizz360 gives the people who work in your property one place to order from participating food outlets
              and discover the businesses and services around them. It is built to be adopted by commercial complexes
              across cities, regions and markets.
            </p>
            <div className={s.ctas} data-m="rise" style={m({ "--d": "340ms" })}>
              <Link href="#enquire" className="btn btn--ink">
                Discuss Your Complex <ArrowRight />
              </Link>
              <Link href="/#how-it-works" className="btn btn--outline">
                How it works for members
              </Link>
            </div>
          </div>
          <div className={s.heroMedia} data-m="wipe-up" style={m({ "--d": "140ms", "--dur": "900ms", "--ease": "var(--ease-edit)" })}>
            <Pic img={images.workTower} sizes="(max-width: 900px) 92vw, 460px" className={s.heroPhoto} priority />
          </div>
        </div>
      </section>

      <section className={s.tenants} aria-labelledby="fc-tenants">
        <div className="wrap">
          <h2 id="fc-tenants" className={s.h2}>
            What your tenants get
          </h2>
          <div className={s.duo} data-scene>
            <article className={s.food} data-m="wipe-left" style={m({ "--dur": "760ms", "--ease": "var(--ease-edit)" })}>
              <div>
                <p className={s.label}>Food</p>
                <h3>Everyday convenience</h3>
                <p>
                  Employees discover participating food outlets inside the complex, browse categories and offers, and
                  order meals to their office instead of queuing downstairs.
                </p>
              </div>
              <figure className={`phone ${s.phone}`}>
                <Pic img={images.foodApp} sizes="200px" />
              </figure>
            </article>
            <article className={s.work} data-m="wipe-right" style={m({ "--d": "120ms", "--dur": "760ms", "--ease": "var(--ease-edit)" })}>
              <div>
                <p className={s.label}>Work</p>
                <h3>Professional discovery</h3>
                <p>
                  Tenants find accountants, printers, clinics, salons and other participating businesses in their own
                  commercial ecosystem, and spot collaboration opportunities a few floors away.
                </p>
              </div>
              <figure className={`phone ${s.phone}`}>
                <Pic img={images.workApp} sizes="200px" />
              </figure>
            </article>
          </div>
        </div>
      </section>

      <section className={s.types} aria-labelledby="fc-types">
        <div className={`wrap ${s.typesGrid}`} data-scene>
          <div>
            <h2 id="fc-types" className={s.h2}>
              Designed for multi-tenant commercial properties
            </h2>
            <p className={s.muted}>
              Every complex is its own ecosystem. thebizz360 organises discovery around the community of a single
              property, so participating businesses reach the tenants they actually serve.
            </p>
          </div>
          <ul className={s.typeList}>
            {propertyTypes.map((t, i) => (
              <li key={t.name} data-m="rise" style={m({ "--d": `${120 + i * 80}ms` })}>
                <h3>{t.name}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={s.model} aria-labelledby="fc-model">
        <div className={`wrap ${s.modelInner}`} data-scene>
          <h2 id="fc-model" className={s.h2} data-m="rise">
            Ecosystem-specific discovery
          </h2>
          <p>
            thebizz360 is not an open public directory. Listings are designed to be presented to members of the
            commercial community they belong to. This public website describes the platform only. It does not publish
            tenant listings or account details, and access to the application is handled by the application itself.
          </p>
          <p className={s.muted}>
            Already part of a participating complex? <a href={SIGN_IN_URL}>Sign in to thebizz360</a>.
          </p>
        </div>
      </section>

      <section id="enquire" className={`${s.enquire} on-dark`} aria-labelledby="fc-enquire">
        <div className={`wrap ${s.enquireGrid}`} data-scene>
          <div>
            <p className={s.eyebrowGold}>Start a conversation</p>
            <h2 id="fc-enquire" className={s.enquireTitle} data-m="rise" style={m({ "--d": "80ms" })}>
              Bring theBizz360 to your complex.
            </h2>
            <p className={s.enquireLede}>
              Tell us about your property and we will get in touch to discuss whether thebizz360 is a fit for your
              tenants.
            </p>
          </div>
          <EnquiryPanel />
        </div>
      </section>
      <JsonLd data={breadcrumbLd} />
    </>
  );
}
