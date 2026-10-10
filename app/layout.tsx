import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Unbounded } from "next/font/google";
// Global tokens and base styles must load before component CSS modules.
import "./globals.css";
import "./motion.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { MotionEngine, motionBootScript } from "@/components/motion/MotionEngine";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import "lenis/dist/lenis.css";
import { SITE_URL, brand } from "@/lib/site";

const unbounded = Unbounded({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-unbounded",
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const defaultTitle = "thebizz360 | Food Ordering & Business Discovery for Commercial Complexes";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: defaultTitle, template: "%s | thebizz360" },
  description: brand.description,
  applicationName: "thebizz360",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "thebizz360",
    title: defaultTitle,
    description: brand.description,
    url: "/",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "thebizz360 Food and Work app screens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: brand.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#fbf5ec",
  width: "device-width",
  initialScale: 1,
};

const orgLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "thebizz360",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/brand/logo-mark-512.png`,
      description: brand.tagline,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "thebizz360",
      url: `${SITE_URL}/`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the boot script adds motion classes to <html> before hydration.
    <html
      lang="en"
      className={`${unbounded.variable} ${fraunces.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        <MotionEngine />
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
