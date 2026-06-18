"use client";
import dynamic from "next/dynamic";
import SmoothScroll   from "@/components/ui/SmoothScroll";
import Cursor         from "@/components/ui/Cursor";
import Navbar         from "@/components/ui/Navbar";
import AdmissionModal from "@/components/ui/AdmissionModal";
import MarqueeBand    from "@/components/ui/MarqueeBand";

const HeroSection     = dynamic(()=>import("@/components/sections/HeroSection"),     {ssr:false});
const AboutSection    = dynamic(()=>import("@/components/sections/AboutSection"),    {ssr:false});
const ProgramsSection = dynamic(()=>import("@/components/sections/ProgramsSection"), {ssr:false});
const TrinitySection  = dynamic(()=>import("@/components/sections/TrinitySection"),  {ssr:false});
const ContactSection  = dynamic(()=>import("@/components/sections/ContactSection"),  {ssr:false});
const CTASection      = dynamic(()=>import("@/components/sections/CTASection"),      {ssr:false});
const Footer          = dynamic(()=>import("@/components/sections/Footer"),          {ssr:false});

export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBand />
        <AboutSection />
        <ProgramsSection />
        <TrinitySection />
        <ContactSection />
        <CTASection />
        <Footer />
      </main>
      <AdmissionModal />
    </SmoothScroll>
  );
}
