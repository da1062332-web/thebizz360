/**
 * Single source of truth for brand facts and every outbound destination.
 * Values come from build-time environment variables (see .env.example).
 */

const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

/** Production login of the existing application. Do not change without approval. */
export const SIGN_IN_URL = "https://www.thebizz360.com/login";

export const SITE_URL = (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://www.thebizz360.com").replace(
  /\/+$/,
  "",
);

export const FOOD_APP_URL = clean(process.env.NEXT_PUBLIC_FOOD_APP_URL) ?? SIGN_IN_URL;
export const WORK_APP_URL = clean(process.env.NEXT_PUBLIC_WORK_APP_URL) ?? SIGN_IN_URL;

/** Formspree endpoint for the footer contact form and the enquiry page. */
const DEFAULT_FORM_ACTION = "https://formspree.io/f/xzzonkoy";

/** Cal.com page for booking a discovery call. */
const DEFAULT_BOOKING_URL = "https://cal.com/qloax-contact/discovery-call-30-min";

export const enquiry = {
  formAction: clean(process.env.NEXT_PUBLIC_ENQUIRY_FORM_ACTION) ?? DEFAULT_FORM_ACTION,
  url: clean(process.env.NEXT_PUBLIC_ENQUIRY_URL),
  email: clean(process.env.NEXT_PUBLIC_ENQUIRY_EMAIL),
};

export const BOOKING_URL = clean(process.env.NEXT_PUBLIC_BOOKING_URL) ?? DEFAULT_BOOKING_URL;

export const enquiryConfigured = Boolean(enquiry.formAction || enquiry.url || enquiry.email);

/** Every "Bring theBizz360 to Your Complex" CTA lands here first. */
export const PARTNER_PATH = "/enquire/";

export const legalPublished = process.env.NEXT_PUBLIC_LEGAL_PUBLISHED === "true";

export const brand = {
  name: "thebizz360",
  tagline: "One connected platform for food, services, and business discovery within your commercial complex.",
  description:
    "Discover food outlets, order meals to your office, and explore participating businesses and services within your commercial complex with thebizz360.",
};

if (!enquiryConfigured && process.env.NODE_ENV === "production") {
  console.warn(
    "\n[thebizz360] No enquiry destination configured. Set NEXT_PUBLIC_ENQUIRY_FORM_ACTION, " +
      "NEXT_PUBLIC_ENQUIRY_URL or NEXT_PUBLIC_ENQUIRY_EMAIL before launch.\n",
  );
}
