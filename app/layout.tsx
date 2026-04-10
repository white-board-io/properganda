import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import { Toaster } from "sonner";
import { metadataBase, siteConfig } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-google",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const microsoftClarityProjectId =
  process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_PROJECT_ID ?? "w9dr66ijo1";

export const metadata: Metadata = {
  metadataBase,
  category: "business",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.defaultKeywords],
  description: siteConfig.defaultDescription,
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-video-preview": -1,
      "max-image-preview": "large",
    },
  },
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  openGraph: {
    images: ["/images/PROPERGANDA-meta.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} antialiased`}>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${microsoftClarityProjectId}");
          `}
        </Script>
        {children}
        <Toaster position="bottom-center" richColors />
        {/* {process.env.NODE_ENV === "development" ? <BreakpointIndicator /> : null} */}
      </body>
    </html>
  );
}
