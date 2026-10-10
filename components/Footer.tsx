import Link from "next/link";
import { Logo } from "./Logo";
import { AjaxForm } from "./AjaxForm";
import { ArrowRight } from "./Icons";
import { BOOKING_URL, PARTNER_PATH, SIGN_IN_URL, brand, enquiry } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      {enquiry.formAction && (
        <section className={`wrap ${styles.contact}`} aria-labelledby="footer-contact">
          <div className={styles.contactIntro}>
            <h2 id="footer-contact">Get in touch</h2>
            <p>Send us a quick note about your complex, or book a 30-minute discovery call.</p>
            <a href={BOOKING_URL} className="btn btn--gold" target="_blank" rel="noopener">
              Book a Call <ArrowRight />
            </a>
          </div>
          <AjaxForm
            action={enquiry.formAction}
            className={styles.form}
            statusClassName={`${styles.wide} ${styles.submitRow}`}
            submitClassName="btn btn--ghost-light"
            submitLabel="Send Message"
          >
            <input type="hidden" name="_subject" value="thebizz360 website contact (footer)" />
            <div className={styles.field}>
              <label htmlFor="ft-email">Email</label>
              <input id="ft-email" name="email" type="email" autoComplete="email" required maxLength={160} />
            </div>
            <div className={styles.field}>
              <label htmlFor="ft-complex">Complex</label>
              <input id="ft-complex" name="complex" type="text" autoComplete="organization" required maxLength={160} />
            </div>
            <div className={`${styles.field} ${styles.wide}`}>
              <label htmlFor="ft-message">Message</label>
              <textarea id="ft-message" name="message" rows={3} required maxLength={2000} />
            </div>
          </AjaxForm>
        </section>
      )}
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.about}>
          <Logo inverse />
          <p>{brand.tagline}</p>
          <div className={styles.rule} aria-hidden="true" />
        </div>

        <nav aria-label="Footer" className={styles.cols}>
          <div>
            <h2>Explore</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/#food">Food</Link></li>
              <li><Link href="/#work">Work</Link></li>
              <li><Link href="/#how-it-works">How It Works</Link></li>
            </ul>
          </div>
          <div>
            <h2>Partners</h2>
            <ul>
              <li><Link href="/for-complexes/">For Commercial Complexes</Link></li>
              <li><Link href={PARTNER_PATH}>Enquire</Link></li>
              <li><a href={BOOKING_URL} target="_blank" rel="noopener">Book a Call</a></li>
              {enquiry.email && (
                <li><a href={`mailto:${enquiry.email}`}>Contact</a></li>
              )}
            </ul>
          </div>
          <div>
            <h2>Members</h2>
            <ul>
              <li><a href={SIGN_IN_URL}>Sign In</a></li>
            </ul>
          </div>
          <div>
            <h2>Legal</h2>
            <ul>
              <li><Link href="/privacy/">Privacy Policy</Link></li>
              <li><Link href="/terms/">Terms of Service</Link></li>
            </ul>
          </div>
        </nav>
      </div>
      <div className={`wrap ${styles.base}`}>
        <p>© {year} thebizz360. All rights reserved.</p>
        <p>Food, services and business discovery for commercial complexes.</p>
      </div>
    </footer>
  );
}
