import Link from "next/link";
import { ArrowRight } from "./Icons";
import { AjaxForm } from "./AjaxForm";
import { BOOKING_URL, enquiry } from "@/lib/site";
import s from "./EnquiryPanel.module.css";

const mailBody = encodeURIComponent(
  [
    "Hello thebizz360 team,",
    "",
    "We would like to discuss bringing thebizz360 to our commercial complex.",
    "",
    "Name:",
    "Company / property name:",
    "City or location:",
    "Approximate number of tenants or offices (if known):",
    "Message:",
  ].join("\n"),
);

/**
 * Partnership enquiry. Renders only channels that are actually configured.
 * The form posts to the configured Formspree endpoint (see lib/site.ts) and confirms in place.
 */
export function EnquiryPanel() {
  const { formAction, url, email } = enquiry;

  if (!formAction && !url && !email) {
    return (
      <div className={s.placeholder} role="note">
        <p className={s.phTitle}>Enquiry destination not configured</p>
        <p>
          This is a placeholder for the site owner. Set <code>NEXT_PUBLIC_ENQUIRY_FORM_ACTION</code>,{" "}
          <code>NEXT_PUBLIC_ENQUIRY_URL</code> or <code>NEXT_PUBLIC_ENQUIRY_EMAIL</code> and rebuild the site to
          publish a working enquiry channel here.
        </p>
      </div>
    );
  }

  return (
    <div className={s.panel}>
      {formAction && (
        <AjaxForm
          action={formAction}
          className={s.form}
          statusClassName={`${s.wide} ${s.submitRow}`}
          submitClassName="btn btn--gold"
          submitLabel={
            <>
              Discuss Your Complex <ArrowRight />
            </>
          }
        >
          <input type="hidden" name="_subject" value="thebizz360 commercial complex enquiry" />
          <div className={s.field}>
            <label htmlFor="enq-name">Name</label>
            <input id="enq-name" name="name" type="text" autoComplete="name" required maxLength={120} />
          </div>
          <div className={s.field}>
            <label htmlFor="enq-email">Work email</label>
            <input id="enq-email" name="email" type="email" autoComplete="email" required maxLength={160} />
          </div>
          <div className={s.field}>
            <label htmlFor="enq-complex">Complex or property name</label>
            <input id="enq-complex" name="complex" type="text" autoComplete="organization" required maxLength={160} />
          </div>
          <div className={s.field}>
            <label htmlFor="enq-city">City or location</label>
            <input id="enq-city" name="city" type="text" autoComplete="address-level2" required maxLength={120} />
          </div>
          <div className={`${s.field} ${s.wide}`}>
            <label htmlFor="enq-tenants">
              Approximate number of tenants or offices <span>(optional)</span>
            </label>
            <select id="enq-tenants" name="tenants" defaultValue="">
              <option value="">Not sure / prefer not to say</option>
              <option>Under 25</option>
              <option>25 to 100</option>
              <option>100 to 250</option>
              <option>More than 250</option>
            </select>
          </div>
          <div className={`${s.field} ${s.wide}`}>
            <label htmlFor="enq-message">
              Message <span>(optional)</span>
            </label>
            <textarea id="enq-message" name="message" rows={4} maxLength={2000} />
          </div>
          <p className={`${s.privacy} ${s.wide}`}>
            We use these details only to respond to your enquiry. Read our{" "}
            <Link href="/privacy/">Privacy Policy</Link>.
          </p>
        </AjaxForm>
      )}

      <div className={s.alt}>
        <p className={s.altLabel}>Prefer to talk it through?</p>
        <div className={s.altLinks}>
          <a href={BOOKING_URL} className="btn btn--ghost-light" target="_blank" rel="noopener">
            Book a 30-min Discovery Call <ArrowRight />
          </a>
          {url && (
            <a href={url} className="btn btn--ghost-light" rel="noopener">
              Open the enquiry form <ArrowRight />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}?subject=${encodeURIComponent("thebizz360 for our commercial complex")}&body=${mailBody}`}
              className="btn btn--ghost-light"
            >
              Email {email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
