# thebizz360 marketing website

Public marketing site for thebizz360, the food ordering and business discovery platform for commercial complexes.
It is separate from the production application at https://www.app.thebizz360.com/login and does not touch its code,
routes or authentication.

## Stack

- Next.js 15 (App Router) with **static export**: `npm run build` writes plain HTML/CSS/JS to `out/`.
- Plain CSS with design tokens (`app/globals.css`) and CSS Modules per component. No UI framework.
- One small client component (mobile menu). Everything else is server-rendered at build time.
- Fonts are self-hosted at build time by `next/font` (Unbounded, Fraunces, Manrope).

## Commands

```bash
npm install
npm run dev        # local development on http://localhost:3000
npm run images     # rebuild images, logo mark, icons and share image from assets/ (only when sources change)
npm run build      # static export to out/
npm start          # preview out/ on http://localhost:3000
npm run typecheck
```

## Configuration

All outbound destinations live in `lib/site.ts` and are set with build-time environment variables.
Copy `.env.example` to `.env.local` (or set the variables in your host) and rebuild.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public URL of this marketing site. Drives canonicals, sitemap, robots.txt, Open Graph, JSON-LD. |
| `NEXT_PUBLIC_FOOD_APP_URL` / `NEXT_PUBLIC_WORK_APP_URL` | Optional app entry points for "Explore Food/Work". Default to the login URL. |
| `NEXT_PUBLIC_ENQUIRY_FORM_ACTION` | Form endpoint for the footer contact form and the `/enquire/` page. Defaults to `https://formspree.io/f/xzzonkoy`. |
| `NEXT_PUBLIC_BOOKING_URL` | "Book a Call" destination. Defaults to `https://cal.com/qloax-contact/discovery-call-30-min`. |
| `NEXT_PUBLIC_ENQUIRY_URL` | External enquiry page, shown as a button. |
| `NEXT_PUBLIC_ENQUIRY_EMAIL` | Partnership email, shown as a button and as "Contact" in the footer. |
| `NEXT_PUBLIC_LEGAL_PUBLISHED` | `true` once real Privacy/Terms text exists. Until then those pages are `noindex`. |

The sign-in URL is fixed in `lib/site.ts` as `https://www.app.thebizz360.com/login`.

## Structure

```
app/                  routes: / , /for-complexes/ , /privacy/ , /terms/ , 404, sitemap, robots, manifest
components/           Header, Footer, Logo, EnquiryPanel, Pic (responsive images)
components/home/      homepage sections (Hero, Food, Work, Connected, HowItWorks, Communities, Onboard, FinalCta)
lib/site.ts           brand facts and every configurable URL
lib/images.ts         image registry with dimensions and alt text
assets/source/        original screenshots and photos (+ CREDITS.md)
assets/brand/         logo-source.png, the owner-supplied logo all marks and icons are built from
scripts/build-images.mjs  crops, redacts and converts images to WebP, builds OG image and icons
```

## Motion system

No animation library. One small client component plus CSS.

- `components/motion/MotionEngine.tsx` contains the boot script and the engine. The boot script runs in `<head>` and enables motion only when the visitor has not asked for reduced motion. If the engine has not started after 3.5 s, it switches motion off so nothing stays hidden. The engine reveals `[data-scene]` containers once, feeds scroll progress `--p` to `[data-scroll]` elements with one rAF-throttled listener, and marks the active nav link.
- `app/motion.css` holds the timing and easing tokens and every reveal role (`data-m="rise | words-food | words-work | panel | circle | wipe-up | pop | fling | line-x | draw …"`). Delays are set per element with `--d`.
- `components/motion/Words.tsx` splits headlines into word masks while keeping real spaces in the HTML.
- Content is visible by default. Hidden pre-reveal states exist only under `html.js-motion`, so the site still works without JavaScript, with reduced motion turned on, or if a script fails.
- Reveals are one-shot. Scroll-linked motion is limited to subtle parallax, a gentle recede as the Food visual leaves, and the Food-to-Work panel opening with its travelling gold line.

## Launch checklist

**Must do before launch**

1. **Test the enquiry channels.** Forms post to Formspree and "Book a Call" opens Cal.com (defaults in `lib/site.ts`). Send one test from the footer form and one from `/enquire/`, confirm both arrive, and confirm the Formspree form has been activated.
2. **Decide where this site is hosted and set `NEXT_PUBLIC_SITE_URL`.** The app already serves `www.thebizz360.com/login`. If this site also goes on `www.thebizz360.com`, route `/login` and every other app path to the application at the proxy or CDN. Then make sure only one `robots.txt` and one `sitemap.xml` is served at the root.
3. **Supply the Privacy Policy and Terms of Service.** Replace the placeholder text in `app/privacy/page.tsx` and `app/terms/page.tsx`, then set `NEXT_PUBLIC_LEGAL_PUBLISHED=true`. The enquiry form states that details are used only to respond to the enquiry, so the policy must say the same.
4. **Approve the product screenshots.** They show a user greeting ("Sneha") and real category prices. The featured tenant's name, description and rating are blurred and live complex statistics are cropped out. If preferred, replace them with screenshots of a demo account and run `npm run images`.

**Should do**

5. Confirm the application itself sends `noindex` or requires authentication on all private routes. robots.txt is not access control.
6. Add dedicated Food and Work app URLs if the application has them.
7. Register the site in Google Search Console and Bing Webmaster Tools, then submit `sitemap.xml`.
8. Validate the live pages with Google's Rich Results Test and a social card preview.
9. Run Lighthouse on the deployed URL on mobile.
10. Add a privacy-friendly analytics tool if needed, and update the Privacy Policy to match.

**Later, only when real**

- Publish a complex-specific landing page only for a complex that has joined, contains useful public information, and has approved what is shown.
- Add testimonials, partner logos or statistics only when they are genuine and approved.

## Brand rules used in copy

- Brand name in prose: **thebizz360**. CTA labels keep the wording from the brief ("Sign In to theBizz360", "Bring theBizz360 to Your Complex").
- No single property, city or region is used as positioning.
- No ratings, prices, partner names, adoption numbers or security guarantees are claimed in copy or structured data.
