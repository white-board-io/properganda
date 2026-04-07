import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import CommandmentsPageClient from "./CommandmentsPageClient";

export const metadata: Metadata = createPageMetadata({
  title: "10 Commandments for Conscious Creativity",
  description:
    "Explore Properganda's 10 Commandments, a concise creative philosophy for building brands, campaigns, and stories with clarity, honesty, and real-world impact.",
  path: "/commandments",
  keywords: [
    "creative philosophy",
    "brand manifesto",
    "creative principles",
    "conscious creativity",
    "Properganda commandments",
  ],
});

export default function CommandmentsPage() {
  return <CommandmentsPageClient />;
}
