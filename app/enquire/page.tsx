import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryPanel } from "@/components/EnquiryPanel";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight } from "@/components/Icons";
import { BOOKING_URL, SITE_URL } from "@/lib/site";
import { m } from "@/components/motion/Words";
import s from "./page.module.css";

const title = "Enquire: Bring thebizz360 to Your Complex";
const description =
  "Tell us about your commercial complex or book a 30-minute discovery call to discuss bringing thebizz360 to your tenants.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/enquire/" },
  openGraph: { title: `${title} | thebizz360`, description, url: "/enquire/" },
  twitter: { title: `${title} | thebizz360`, description },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Enquire", item: `${SITE_URL}/enquire/` },
  ],
};

export default function EnquirePage() {
  return (
    <>
      <section className={`${s.page} on-dark`} aria-labelledby="enq-title" data-scene="load">
        <div className={`wrap ${s.grid}`}>
          <div>
            <nav aria-label="Breadcrumb" className={s.crumbs} data-m="fade">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span aria-current="page">Enquire</span>
            </nav>
            <p className={s.eyebrow}>Start a conversation</p>
            <h1 id="enq-title" className={s.title} data-m="rise" style={m({ "--d": "80ms" })}>
              Bring theBizz360 to your complex.
            </h1>
            <p className={s.lede} data-m="rise" style={m({ "--d": "200ms" })}>
              Tell us about your property and we will get in touch to discuss whether thebizz360 is a fit for your
              tenants. Prefer to talk now? Pick a time that suits you.
            </p>
            <a
              href={BOOKING_URL}
              className={`btn btn--gold ${s.book}`}
              target="_blank"
              rel="noopener"
              data-m="rise"
              style={m({ "--d": "280ms" })}
            >
              Book a 30-min Discovery Call <ArrowRight />
            </a>
            <ol className={s.steps}>
              <li>Send the form or book a call.</li>
              <li>We learn about your property and tenants.</li>
              <li>We agree whether and how to bring thebizz360 to your complex.</li>
            </ol>
          </div>
          <EnquiryPanel />
        </div>
      </section>
      <JsonLd data={breadcrumbLd} />
    </>
  );
}
