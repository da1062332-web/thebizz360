import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";
import { legalPublished } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the thebizz360 website and platform.",
  alternates: { canonical: "/privacy/" },
  robots: legalPublished ? { index: true, follow: true } : { index: false, follow: true },
};

// TODO(owner): replace the placeholder with the approved Privacy Policy text,
// then set NEXT_PUBLIC_LEGAL_PUBLISHED=true.
export default function PrivacyPage() {
  return <LegalPlaceholder title="Privacy Policy" />;
}
