import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FoodSection } from "@/components/home/FoodSection";
import { WorkSection } from "@/components/home/WorkSection";
import { Connected } from "@/components/home/Connected";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Communities } from "@/components/home/Communities";
import { Onboard } from "@/components/home/Onboard";
import { FinalCta } from "@/components/home/FinalCta";
import { JsonLd } from "@/components/JsonLd";
import { SIGN_IN_URL, SITE_URL, brand } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const appLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${SITE_URL}/#app`,
  name: "thebizz360",
  url: SIGN_IN_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  description: brand.description,
  publisher: { "@id": `${SITE_URL}/#organization` },
  featureList: [
    "Discover participating food outlets within a commercial complex",
    "Browse food categories and offers and order to your office",
    "Discover participating businesses and professional services within your complex",
  ],
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FoodSection />
      <WorkSection />
      <Connected />
      <HowItWorks />
      <Communities />
      <Onboard />
      <FinalCta />
      <JsonLd data={appLd} />
    </>
  );
}
