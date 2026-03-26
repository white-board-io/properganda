import type { Metadata } from "next";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoBar from "./components/LogoBar";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Manifesto from "./components/Manifesto";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Creativity With a Conscience",
  description:
    "Properganda is a purpose-led creative collective helping brands, causes, and communities build sharp identities, thoughtful campaigns, compelling stories, and meaningful conversations.",
  path: "/",
  keywords: [
    "brand identity",
    "campaign design",
    "storytelling agency",
    "creative collective",
    "purpose-led branding",
  ],
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <AboutUs />
        <Services />
        {/* <CaseStudies /> */}
        <Manifesto />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
