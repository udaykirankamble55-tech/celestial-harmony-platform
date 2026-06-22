"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

// ── Shared Responsive Device Interaction Guard Hook ──
function useTouchDeviceGuard() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    const checkDevice = () => {
      setIsTouch(window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);
  return isTouch;
}

const INSTRUMENTS = [
  { name: "Guitar", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80", keywords: ["Classical & Contemporary", "Plectrum & Fingerstyle", "Freestyle for Beginners", "Trinity Grade 1–8"], desc: "From your first chord to Grade 8 distinction we build real technique instead of taking shortcuts. Master both classical and contemporary acoustic styles." },
  { name: "Keyboard & Piano", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80", keywords: ["Scales & Repertoire", "Sight Reading", "Aural Training", "Trinity Grade 1–8"], desc: "Comprehensive keyboard and classical piano methodology. Advanced theory integrated deeply into every lesson with professional diploma tracks available." },
  { name: "Violin", img: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600&q=80", keywords: ["Bow Technique", "Intonation & Vibrato", "Western Classical", "Trinity Grade 1–8"], desc: "Patient and structured progression running from holding the bow correctly to performing advanced Grade 8 repertoire with absolute control and expression." },
  { name: "Drums & Percussion", img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&q=80", keywords: ["Stick Rudiments", "Full Kit Performance", "Rhythm Mastery", "Trinity Grade 1–8"], desc: "From technical rudiments to full kit grooves. Develop your dynamic control, complex fills, and solid musical feel that every professional drummer needs." },
  { name: "Vocals", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80", keywords: ["Breath Control", "Pitch & Diction", "Classical & Contemporary", "All Ages"], desc: "Develop your vocal range with confidence. Master breath management, pitch correction, diction, and dramatic stage presence open to all styles and age groups." },
  { name: "Music Theory", img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80", keywords: ["Staff Notation", "Harmony & Aural", "Sight Reading", "All Levels"], desc: "The definitive backbone of every instrument. Strong musical theory is what separates performers who blindly play from musicians who truly understand." },
];

const up: Variants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.32, 1] } },
};

const liftUpSmall: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.32, 1] } },
};

// ── Smooth Performance-Grade Text Mask Reveal Component ──
function MLine({ children, delay = 0, style, className = "" }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string; }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.84,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reset"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay]);

  return (
    <div className={className} style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em" }}>
      <div ref={ref} style={style}>
        {children}
      </div>
    </div>
  );
}

// ── Smart Multi-Viewport Program Card Component ──
function ProgramCard({ 
  prog, 
  i, 
  isOpenOnMobile, 
  onToggleMobile 
}: { 
  prog: typeof INSTRUMENTS[0]; 
  i: number;
  isOpenOnMobile: boolean;
  onToggleMobile: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = useTouchDeviceGuard();
  
  const isExpanded = isTouchDevice ? isOpenOnMobile : isHovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.72, delay: i * 0.05, ease: [0.25, 1, 0.32, 1] }}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onClick={() => isTouchDevice && onToggleMobile()}
      className={`prog-luxury-card ${isExpanded ? "is-hovered" : ""}`}
      style={{
        position: "relative",
        height: "440px",
        borderRadius: "2px",
        overflow: "hidden",
        background: "#080808",
        boxShadow: isExpanded ? "0 12px 24px rgba(200, 150, 12, 0.08)" : "0 10px 30px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      <div className="prog-beam-spin"></div>

      {/* Image Compositing Layer */}
      <div style={{ position: "absolute", inset: 2, overflow: "hidden", borderRadius: "1px", zIndex: 1 }}>
        <Image 
          src={prog.img} 
          alt={prog.name} 
          fill 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ 
            objectFit: "cover", 
            transform: isExpanded ? "scale(1.05)" : "scale(1)", 
            filter: isExpanded ? "brightness(0.22) contrast(1.05)" : "brightness(0.85)",
            transition: "transform 0.75s cubic-bezier(0.25, 1, 0.5, 1), filter 0.45s ease" 
          }} 
        />
        <div style={{ position: "absolute", inset: 0, background: isExpanded ? "rgba(8,8,8,0.2)" : "linear-gradient(to top, rgba(8,8,8,0.75) 0%, rgba(8,8,8,0.1) 35%, transparent 100%)", transition: "background 0.45s ease" }} />
      </div>

      {/* Masked Sliding Description Content Box */}
      <div 
        style={{ 
          position: "absolute", 
          left: "clamp(20px, 3vw, 28px)", 
          right: "clamp(20px, 3vw, 28px)", 
          bottom: 0, 
          zIndex: 2,
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "flex-end",
          transform: isExpanded ? "translateY(-28px)" : "translateY(calc(100% - 64px))",
          transition: "transform 0.68s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform"
        }}
      >
        <h3 style={{ 
          fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.5rem, 2vw, 2rem)", 
          color: "#ffffff", fontWeight: 400, margin: 0, paddingBottom: 20, 
          textShadow: isExpanded ? "none" : "0 2px 6px rgba(0,0,0,0.6)"
        }}>
          {prog.name}
        </h3>

        <div style={{ opacity: isExpanded ? 1 : 0, transition: "opacity 0.48s cubic-bezier(0.23, 1, 0.32, 1) 0.08s", paddingBottom: 8 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", lineHeight: "1.65", color: "rgba(245,240,232,0.72)", margin: "0 0 20px 0", textAlign: "justify" }}>
            {prog.desc}
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {prog.keywords.map(k => (
              <span key={k} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, fontWeight: 600, letterSpacing: ".12em", padding: "4px 10px", border: "1px solid rgba(200,150,12,0.3)", color: "#C8960C", textTransform: "uppercase", borderRadius: "1px", backgroundColor: "rgba(8,8,8,0.5)" }}>
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgramsSection() {
  const [trinityHover, setTrinityHover] = useState(false);
  const [mobileActiveCard, setMobileActiveCard] = useState<number | null>(null);
  const isTouchDevice = useTouchDeviceGuard();

  const toggleMobileCard = (idx: number) => {
    setMobileActiveCard(mobileActiveCard === idx ? null : idx);
  };

  return (
    <section id="programs" style={{ position: "relative", background: "#080808", padding: "clamp(60px, 8vw, 120px) 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .prog-luxury-card { border-radius: 2px; position: relative; }
        .prog-beam-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: 0; }
        .prog-beam-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; }
        
        .programs-highlight-strip { 
          position: relative; 
          border-radius: 4px; 
          overflow: hidden; 
          padding: 1px; 
          background: rgba(200, 150, 12, 0.45); 
          transition: background 0.4s ease, box-shadow 0.4s ease; 
        }
        .programs-highlight-strip::before { 
          content: ""; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          width: 300%; 
          height: 300%; 
          background: transparent; 
          opacity: 0; 
          transition: opacity 0.4s ease; 
          z-index: 1; 
          pointer-events: none; 
        }

        @media (hover: hover) and (pointer: fine) {
          .prog-luxury-card.is-hovered .prog-beam-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spin 3s linear infinite; }
          
          .programs-highlight-strip.is-hovered {
            background: transparent !important; 
            box-shadow: 0 12px 28px rgba(200, 150, 12, 0.12);
          }
          .programs-highlight-strip.is-hovered::before { 
            opacity: 1;
            background: conic-gradient(from 0deg, transparent 40%, #C8960C 55%, #FFFFFF 70%, #FFFFFF 94%, #C8960C 100%); 
            animation: spinLaserTrack 2.5s linear infinite; 
          }
        }

        @media (max-width: 1023px) {
          .prog-luxury-card { border: 1px solid rgba(200, 150, 12, 0.15) !important; background: #0a0c0f !important; }
          .programs-highlight-strip { 
            border: 1px solid rgba(200, 150, 12, 0.45) !important; 
            background: #0a0c0f !important; 
            padding: 0 !important; 
          }
        }
        
        @keyframes spinLaserTrack { 
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 40px)", position: "relative", zIndex: 5 }}>
        
        {/* SECTION HEADER BLOCK */}
        <div style={{ margin: "0 0 clamp(40px, 5vw, 64px) 0" }}>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 10, fontWeight: 500 }}>
            002 — What We Offer
          </motion.p>
          
          <div style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.6rem)", fontWeight: 400, color: "#ffffff" }}>
              Our <span style={{ background: "linear-gradient(135deg, #E8B84B, #C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Specialisations.</span>
            </MLine>
          </div>
          
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={liftUpSmall} style={{ width: 56, height: 1, background: "linear-gradient(90deg,#C8960C,transparent)", margin: "20px 0 16px 0" }} />
          
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={liftUpSmall} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.6)", maxWidth: "540px", lineHeight: "1.7", margin: 0 }}>
            Every musical course is built purposefully around the Trinity College London Grade Examination framework with strong foundational Staff Notation teaching initialized from lesson one.
          </motion.p>
        </div>

        {/* Instruments Grid Container */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(280px, 30vw, 360px), 1fr))", gap: "20px", marginBottom: "clamp(48px, 6vw, 80px)" }}>
          {INSTRUMENTS.map((prog, i) => (
            <ProgramCard 
              key={i} 
              prog={prog} 
              i={i} 
              isOpenOnMobile={mobileActiveCard === i}
              onToggleMobile={() => toggleMobileCard(i)}
            />
          ))}
        </div>

        {/* ── TRINITY SHOWCASE STRIP (Corrected state listeners to use setTrinityHover) ── */}
        <motion.div 
          onMouseEnter={() => !isTouchDevice && setTrinityHover(true)}
          onMouseLeave={() => setTrinityHover(false)}
          initial={{ opacity: 0, y: 32 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }} 
          transition={{ duration: 0.72, ease: [0.25, 1, 0.32, 1] }}
          className={`programs-highlight-strip ${trinityHover && !isTouchDevice ? "is-hovered" : ""}`} 
        >
          <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", padding: "clamp(24px, 5vw, 56px) clamp(24px, 4vw, 48px)", borderRadius: "3px", display: "flex", flexWrap: "wrap", gap: 36, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
            
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "#C8960C", fontWeight: 600, marginBottom: 12 }}>Our Specialisation</p>
              
              <div style={{ fontFamily: "'DM Serif Display', serif", marginBottom: 16 }}>
                <MLine delay={0} style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", color: "#FFFFFF", fontWeight: 400, lineHeight: 1.15 }}>Trinity College London</MLine>
                <MLine delay={0.12} style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", color: "#C8960C", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15 }}>Grade Examinations</MLine>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.6)", lineHeight: 1.8, maxWidth: 540, marginBottom: 24, textAlign: "justify" }}>
                We specialise completely in teaching Staff Notation and systematically guiding students through the prestigious Trinity College London Grade Examination curriculum from absolute primary beginners in UKG to senior working corporate professionals. Our historical tracking credentials remain uniform: 100% Merit and Distinction results regardless of age milestones or initial coordination levels.
              </p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["Grade 1–8", "ATCL / LTCL Diploma", "Validated Provider", "60+ Countries", "Staff Notation First", "All Ages"].map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: ".14em", padding: "4px 10px", border: "1px solid rgba(200,150,12,.25)", color: "#C8960C", textTransform: "uppercase" }}>{t}</span>
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 20, flexShrink: 0 }}>
              {[["Students from", "UKG to Age 40+"], ["Results Tracked", "100% Merit & Distinction"], ["Methodology System", "Staff Notation First"]].map(([l, v], i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: 4, fontWeight: 600 }}>{l}</p>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)", color: "#ffffff", margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}