import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  path?: `/${string}` | "/";
};

const DEFAULT_SITE_URL = "https://properganda.in";

function normalizeSiteUrl(url: string): string {
  const trimmedUrl = url.trim();

  if (!trimmedUrl) {
    return DEFAULT_SITE_URL;
  }

  const withProtocol = /^https?:\/\//i.test(trimmedUrl)
    ? trimmedUrl
    : `https://${trimmedUrl}`;

  return withProtocol.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Properganda",
  siteUrl: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      DEFAULT_SITE_URL,
  ),
  defaultDescription:
    "Properganda is a creative collective that helps brands, causes, and communities build memorable identities, campaigns, stories, and conversations with conscience.",
  defaultKeywords: [
    "Properganda",
    "brand strategy",
    "creative agency",
    "branding agency",
    "campaign strategy",
    "storytelling studio",
    "communications agency",
    "purpose-driven marketing",
  ],
} as const;

export const metadataBase = new URL(siteConfig.siteUrl);

export function absoluteUrl(path: `/${string}` | "/" = "/"): string {
  return new URL(path, metadataBase).toString();
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  keywords = [],
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: [...siteConfig.defaultKeywords, ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      description,
      type: "website",
      locale: "en_US",
      title: socialTitle,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
    },
    twitter: {
      description,
      card: "summary",
      title: socialTitle,
    },
  };
}
