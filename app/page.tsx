import Header from "./components/Header";
import Hero from "./components/Hero";
import LogoBar from "./components/LogoBar";
import CreativeCollective from "./components/CreativeCollective";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import Manifesto from "./components/Manifesto";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoBar />
        <CreativeCollective />
        <Services />
        <CaseStudies />
        <Manifesto />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
