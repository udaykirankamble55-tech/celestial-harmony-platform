"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const INSTRUMENTS = [
  { name: "Guitar", img: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&q=80", keywords: ["Classical & Contemporary", "Plectrum & Fingerstyle", "Freestyle for Beginners", "Trinity Grade 1–8"], desc: "From your first chord to Grade 8 distinction we build real technique instead of taking shortcuts. Master both classical and contemporary acoustic styles." },
  { name: "Keyboard & Piano", img: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=600&q=80", keywords: ["Scales & Repertoire", "Sight Reading", "Aural Training", "Trinity Grade 1–8"], desc: "Comprehensive keyboard and classical piano methodology. Advanced theory integrated deeply into every lesson with professional diploma tracks available." },
  { name: "Violin", img: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=600&q=80", keywords: ["Bow Technique", "Intonation & Vibrato", "Western Classical", "Trinity Grade 1–8"], desc: "Patient and structured progression running from holding the bow correctly to performing advanced Grade 8 repertoire with absolute control and expression." },
  { name: "Drums & Percussion", img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=600&q=80", keywords: ["Stick Rudiments", "Full Kit Performance", "Rhythm Mastery", "Trinity Grade 1–8"], desc: "From technical rudiments to full kit grooves. Develop your dynamic control, complex fills, and solid musical feel that every professional drummer needs." },
  { name: "Vocals", img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80", keywords: ["Breath Control", "Pitch & Diction", "Classical & Contemporary", "All Ages"], desc: "Develop your vocal range with confidence. Master breath management, pitch correction, diction, and dramatic stage presence open to all styles and age groups." },
  { name: "Music Theory", img: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80", keywords: ["Staff Notation", "Harmony & Aural", "Sight Reading", "All Levels"], desc: "The definitive backbone of every instrument. Strong musical theory is what separates performers who blindly play from musicians who truly understand." },
];

const up: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.23, 1, 0.32, 1] } },
};
const stag: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function MLine({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em" }}>
      <motion.div variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.88, ease: [0.23, 1, 0.32, 1], delay } } }} style={style}>
        {children}
      </motion.div>
    </div>
  );
}

function ProgramCard({ prog, i }: { prog: typeof INSTRUMENTS[0]; i: number }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
      className={`prog-luxury-card ${hov ? "is-hovered" : ""}`}
      style={{
        position: "relative",
        height: "460px",
        borderRadius: "2px",
        overflow: "hidden",
        cursor: "pointer",
        background: "#080808",
        boxShadow: hov ? "0 12px 24px rgba(200, 150, 12, 0.08)" : "0 10px 30px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1)"
      }}
    >
      <div className="prog-beam-spin"></div>

      <div style={{ position: "absolute", inset: 2, overflow: "hidden", borderRadius: "1px", zIndex: 1 }}>
        <Image 
          src={prog.img} 
          alt={prog.name} 
          fill 
          style={{ 
            objectFit: "cover", 
            transform: hov ? "scale(1.06)" : "scale(1)", 
            filter: hov ? "brightness(0.25) contrast(1.05)" : "brightness(0.95)",
            transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease" 
          }} 
        />
        <div style={{ position: "absolute", inset: 0, background: hov ? "rgba(8,8,8,0.3)" : "linear-gradient(to top, rgba(8,8,8,0.7) 0%, rgba(8,8,8,0.1) 30%, transparent 100%)", transition: "background 0.5s ease" }} />
      </div>

      <div 
        style={{ 
          position: "absolute", 
          left: 28, right: 28, bottom: 0, zIndex: 2,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          transform: hov ? "translateY(-32px)" : "translateY(calc(100% - 68px))",
          transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)"
        }}
      >
        <h3 style={{ 
          fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)", 
          color: "#ffffff", fontWeight: 400, margin: 0, paddingBottom: 24, 
          textShadow: hov ? "none" : "0 2px 8px rgba(0,0,0,0.5)"
        }}>
          {prog.name}
        </h3>

        <div style={{ opacity: hov ? 1 : 0, transition: "opacity 0.4s ease 0.05s", paddingBottom: 8 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: "1.7", color: "rgba(245,240,232,0.75)", margin: "0 0 24px 0", textAlign: "justify", textJustify: "inter-word" }}>
            {prog.desc}
          </p>
          
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {prog.keywords.map(k => (
              <span key={k} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: ".14em", padding: "5px 12px", border: "1px solid rgba(200,150,12,0.35)", color: "#C8960C", textTransform: "uppercase", borderRadius: "1px", backgroundColor: "rgba(8,8,8,0.4)" }}>
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
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  const springX = useSpring(mX, { stiffness: 140, damping: 16 });
  const springY = useSpring(mY, { stiffness: 140, damping: 16 });

  const transX = useTransform(springX, [-0.5, 0.5], [-1.5, 1.5]);
  const transY = useTransform(springY, [-0.5, 0.5], [-1.5, 1.5]);
  const tiltX = useTransform(springY, [-0.5, 0.5], [4, -4]);   
  const tiltY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handlePointerMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mX.set((e.clientX - rect.left) / rect.width - 0.5);
    mY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerMouseLeave = () => {
    setTrinityHover(false);
    mX.set(0);
    mY.set(0);
  };

  return (
    <section id="programs" style={{ position: "relative", background: "#080808", padding: "120px 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .prog-luxury-card { border-radius: 2px; position: relative; }
        .prog-beam-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: 0; }
        .prog-beam-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; transition: opacity 0.4s ease; }
        .prog-luxury-card.is-hovered .prog-beam-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spin 3s linear infinite; }
        
        /* FIX: Bound the laser sweep engine safely directly to the pseudo element of our target frame class */
        .programs-highlight-strip { position: relative; border-radius: 4px; overflow: hidden; padding: 2px; background: rgba(255, 255, 255, 0.06); transition: box-shadow 0.4s ease; }
        .programs-highlight-strip::before { content: ""; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: transparent; transform: translate(-50%, -50%) rotate(0deg); opacity: 0; transition: opacity 0.4s ease; z-index: 1; pointer-events: none; }
        
        /* FIX: Highly amplified white core color stops for extreme light bloom performance */
        .programs-highlight-strip.is-hovered::before { 
          opacity: 1;
          background: conic-gradient(from 0deg, transparent 40%, #C8960C 55%, #FFFFFF 70%, #FFFFFF 96%, #C8960C 100%); 
          animation: spinLaserTrack 2.4s linear infinite; 
          filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.55));
        }
        
        @keyframes spinLaserTrack { 
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 5 }}>
        
        <div style={{ marginBottom: 64 }}>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 12, fontWeight: 500 }}>
            002 — What We Offer
          </motion.p>
          
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.4rem,5.5vw,5.2rem)", fontWeight: 400, color: "#ffffff" }}>
              {/* FIX: Bounded the headline word and fullstop inside your luxury golden gradient container */}
              Our <span style={{ background: "linear-gradient(135deg, #E8B84B, #C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Specialisations.</span>
            </MLine>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={up} style={{ width: 56, height: 1, background: "linear-gradient(90deg,#C8960C,transparent)", margin: "24px 0 20px 0" }} />
          
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(245,240,232,0.6)", maxWidth: "560px", lineHeight: "1.7", margin: 0 }}>
            Every musical course is built purposefully around the Trinity College London Grade Examination framework with strong foundational Staff Notation teaching initialized from lesson one.
          </motion.p>
        </div>

        {/* Instruments Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", marginBottom: 80 }}>
          {INSTRUMENTS.map((prog, i) => (
            <ProgramCard key={i} prog={prog} i={i} />
          ))}
        </div>

        {/* ── TRINITY SHOWCASE STRIP WITH STABLE CAPPED MAGNETIC 3D TILT ── */}
        <motion.div 
          ref={cardRef}
          onMouseMove={handlePointerMouseMove}
          onMouseLeave={handlePointerMouseLeave}
          onMouseEnter={() => setTrinityHover(true)}
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className={`programs-highlight-strip ${trinityHover ? "is-hovered" : ""}`} 
          style={{ 
            x: transX,
            y: transY,
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: "preserve-3d",
            perspective: "1000px",
            boxShadow: trinityHover ? "0 12px 24px rgba(200, 150, 12, 0.08)" : "none"
          }}
        >
          {/* Internal Content Shield Board */}
          <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", padding: "56px 48px", borderRadius: "3px", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "space-between", transform: "translateZ(20px)", width: "100%" }}>
            
            <div style={{ flex: 1, minWidth: 260 }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "#C8960C", fontWeight: 600, marginBottom: 12 }}>Our Specialisation</p>
              
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", marginBottom: 20 }}>
                <MLine delay={0} style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#FFFFFF", fontWeight: 400, lineHeight: 1.15 }}>Trinity College London</MLine>
                <MLine delay={0.12} style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", color: "#C8960C", fontWeight: 400, fontStyle: "italic", lineHeight: 1.15 }}>Grade Examinations</MLine>
              </motion.div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.6)", lineHeight: 1.85, maxWidth: 540, marginBottom: 28, textAlign: "justify", textJustify: "inter-word" }}>
                We specialise completely in teaching Staff Notation and systematically guiding students through the prestigious Trinity College London Grade Examination curriculum from absolute primary beginners in UKG to senior working corporate professionals. Our historical tracking credentials remain uniform: 100% Merit and Distinction results regardless of age milestones or initial coordination levels.
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Grade 1–8", "ATCL / LTCL Diploma", "Validated Provider", "60+ Countries", "Staff Notation First", "All Ages"].map(t => (
                  <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: ".16em", padding: "5px 12px", border: "1px solid rgba(200,150,12,.3)", color: "#C8960C", textTransform: "uppercase" }}>{t}</span>
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 28, flexShrink: 0 }}>
              {[["Students from", "UKG to Age 40+"], ["Results Tracked", "100% Merit & Distinction"], ["Methodology System", "Staff Notation First"]].map(([l, v], i) => (
                <div key={i}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginBottom: 6, fontWeight: 600 }}>{l}</p>
                  <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.2rem,1.8vw,1.45rem)", color: "#ffffff", margin: 0 }}>{v}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}