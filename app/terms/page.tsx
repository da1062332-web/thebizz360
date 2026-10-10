import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";
import { legalPublished } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for the thebizz360 website and platform.",
  alternates: { canonical: "/terms/" },
  robots: legalPublished ? { index: true, follow: true } : { index: false, follow: true },
};

// TODO(owner): replace the placeholder with the approved Terms of Service text,
// then set NEXT_PUBLIC_LEGAL_PUBLISHED=true.
export default function TermsPage() {
  return <LegalPlaceholder title="Terms of Service" />;
}
