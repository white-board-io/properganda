import type { Metadata } from "next";
import ComingSoon from "./components/ComingSoon";
import { createPageMetadata } from "@/lib/seo";

// Temporary hold for the in-progress homepage sections.
// Re-enable these imports when we're ready to restore the full marketing site.
// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import LogoBar from "./components/LogoBar";
// import AboutUs from "./components/AboutUs";
// import Services from "./components/Services";
// import CaseStudies from "./components/CaseStudies";
// import Manifesto from "./components/Manifesto";
// import CTA from "./components/CTA";
// import Footer from "./components/Footer";

export const metadata: Metadata = createPageMetadata({
  title: "Coming Soon",
  description:
    "Properganda is putting the finishing touches on a new digital experience. The full marketing site is coming soon.",
  path: "/",
  keywords: [
    "coming soon",
    "creative collective",
    "purpose-led branding",
    "brand strategy",
    "campaign storytelling",
  ],
});

export default function Home() {
  return (
    <>
      <ComingSoon />
      {/*
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <AboutUs />
        <Services />
        <CaseStudies />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
      */}
    </>
  );
}
