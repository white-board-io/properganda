import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "A Wish for Mom | Mother's Day Coloring Studio",
  description:
    "Color a heartfelt artwork for your mom this Mother's Day. Paint, add stickers, write a wish, then share or print your creation.",
  path: "/mothers-day",
  keywords: [
    "mother's day",
    "coloring page",
    "kids paint app",
    "wish for mom",
    "Properganda Mother's Day campaign",
  ],
});

export default function MothersDayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
