import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoBar from "./components/LogoBar";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Manifesto from "./components/Manifesto";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export const metadata: Metadata = createPageMetadata({
  title: "Properganda",
  description:
    "Properganda is a creative agency for branding, content, films, and digital storytelling with a focus on positive impact.",
  path: "/",
  keywords: [
    "creative collective",
    "purpose-led branding",
    "brand strategy",
    "campaign storytelling",
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
