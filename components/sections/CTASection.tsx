"use client";
import { useRef, useEffect, useState } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const up: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.23, 1, 0.32, 1] } },
};
const stag: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

/* ── Masked Reveal Row Component for Smooth Text Slide-Up ── */
function MLine({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em", display: "block" }}>
      <motion.div 
        variants={{ 
          hidden: { y: "105%", opacity: 0 }, 
          show: { y: "0%", opacity: 1, transition: { duration: 0.85, ease: [0.23, 1, 0.32, 1], delay } } 
        }} 
        style={{ display: "block", ...style }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Controlled Interactive Capped Magnetic 3D Tilt Button Component ── */
function CappedCTAButton({ 
  children, onClick, href, isPrimary 
}: { 
  children: React.ReactNode; onClick?: () => void; href?: string; isPrimary: boolean; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  const springX = useSpring(mX, { stiffness: 120, damping: 14 });
  const springY = useSpring(mY, { stiffness: 120, damping: 14 });

  const translateMoveX = useTransform(springX, [-0.5, 0.5], [-3, 3]); 
  const translateMoveY = useTransform(springY, [-0.5, 0.5], [-3, 3]);
  const surfaceTiltX = useTransform(springY, [-0.5, 0.5], [6, -6]);   
  const surfaceTiltY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  const handlePointerMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mX.set((e.clientX - rect.left) / rect.width - 0.5);
    mY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerMouseLeave = () => {
    mX.set(0);
    mY.set(0);
  };

  const internalContent = (
    <div className="cta-btn-slider-wrapper">
      <div className={isPrimary ? "cta-primary-slider" : "cta-secondary-slider"} />
      <span className="cta-btn-inner-label">{children}</span>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handlePointerMouseMove}
      onMouseLeave={handlePointerMouseLeave}
      className="cta-button-responsive-wrapper"
      style={{
        x: translateMoveX,
        y: translateMoveY,
        rotateX: surfaceTiltX,
        rotateY: surfaceTiltY,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        display: "inline-block"
      }}
    >
      {href ? (
        <a href={href} target="_blank" rel="noopener" className={isPrimary ? "cta-master-btn active-prime" : "cta-master-btn active-ghost"}>
          {internalContent}
        </a>
      ) : (
        <button onClick={onClick} className={isPrimary ? "cta-master-btn active-prime" : "cta-master-btn active-ghost"}>
          {internalContent}
        </button>
      )}
    </motion.div>
  );
}

/* ── Redesigned Symmetrical Metrics Bar Sub-Component ── */
function HeroMetricsBar() {
  const [hoveredIdx, setHoveredIndex] = useState<number | null>(null);

  const METRIC_ITEMS = [
    {
      label: "CALL US",
      value: "+91 98852 97005",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.85a16 16 0 006.29 6.29l1.21-1.22a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      )
    },
    {
      label: "OUR LOCATION",
      value: "KPHB Phase 2",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      )
    },
    {
      label: "GOOGLE & JUSTDIAL",
      value: "4.9 Rating 312 Reviews",
      icon: (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ transform: "translateY(-0.5px)" }}>
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 15.01l8.2-1.192z"/>
        </svg>
      )
    }
  ];

  return (
    // FIX: Shifted metric row container styling dynamically over to raw responsive tracking sheets
    <div className="hero-metrics-flex-bar" style={{ alignItems: "center", justifyContent: "center", width: "100%", maxWidth: "920px", margin: "44px auto 0 auto" }}>
      {METRIC_ITEMS.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <div key={idx} onMouseEnter={() => setHoveredIndex(idx)} onMouseLeave={() => setHoveredIndex(null)} style={{ display: "flex", alignItems: "center", position: "relative" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", cursor: "default" }}>
              
              {/* Top Row Block */}
              <div style={{ 
                fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", fontWeight: 700, 
                color: isHovered ? "#C8960C" : "#ffffff", letterSpacing: "0.02em", 
                transition: "color 0.35s ease, text-shadow 0.35s ease", 
                textShadow: isHovered ? "0 0 12px rgba(200, 150, 12, 0.4)" : "none",
                textAlign: "center"
              }}>
                {item.value}
              </div>

              {/* Bottom Row Block */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "6px" }}>
                <span style={{ 
                  display: "flex", alignItems: "center", 
                  color: isHovered ? "#C8960C" : "rgba(245,240,232,0.35)", 
                  transition: "color 0.35s ease" 
                }}>
                  {item.icon}
                </span>
                <span style={{ 
                  fontFamily: "'DM Sans', sans-serif", fontSize: "9.5px", fontWeight: 700, 
                  letterSpacing: "0.18em", color: isHovered ? "rgba(255,255,255,0.6)" : "rgba(245,240,232,0.35)", 
                  textTransform: "uppercase", transition: "color 0.35s ease"
                }}>
                  {item.label}
                </span>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── MAIN CTA BLOCK MODULE ── */
export default function CTASection() {
  const openModal = () => {
    const el = document.getElementById("admModal");
    if (el) { el.classList.add("open"); document.body.style.overflow = "hidden"; }
  };

  return (
    <section className="sec pt-section pb-section" style={{ background: "#080808", position: "relative", overflow: "hidden", padding: "85px 0" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* FIX: Enforced native border-box constraints completely to protect padding bounds */
        .cta-master-btn, .cta-master-btn *, .cta-master-btn *::before { box-sizing: border-box !important; }

        .cta-master-btn { position: relative; overflow: hidden; background: transparent; display: inline-flex; align-items: center; justify-content: center; padding: 0; cursor: pointer; text-decoration: none; border-radius: 2px; transition: box-shadow 0.4s ease, border-color 0.4s ease; outline: none; width: 244px; }
        .cta-btn-slider-wrapper { position: relative; padding: 20px 0; display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; border-radius: 1px; z-index: 2; overflow: hidden; }
        .cta-btn-inner-label { position: relative; z-index: 3; font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 700; transition: color 0.4s ease; line-height: 1; }

        /* FIX: Maintained solid baseline borders initially so containers do not layout jitter on translation active modes */
        .cta-master-btn.active-prime { border: 1px solid rgba(200, 150, 12, 0.4); }
        .cta-master-btn.active-prime::before { content: ''; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent 60%, #C8960C 75%, #FFFFFF 85%, #C8960C 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: spinConic 2.5s linear infinite; opacity: 0; transition: opacity 0.4s ease; z-index: 1; pointer-events: none; }
        .cta-primary-slider { position: absolute; inset: 0; background-image: linear-gradient(to right, #C8960C 50%, #0d0d0d 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.45s cubic-bezier(0.25, 1, 0.5, 1); z-index: 2; }
        .cta-master-btn.active-prime .cta-btn-inner-label { color: #ffffff; }
        .cta-master-btn.active-prime:hover::before { opacity: 1; }
        .cta-master-btn.active-prime:hover { box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); border-color: rgba(200, 150, 12, 0.8) !important; }
        .cta-master-btn.active-prime:hover .cta-primary-slider { background-position: 0 0; }
        .cta-master-btn.active-prime:hover .cta-btn-inner-label { color: #080808; }

        .cta-master-btn.active-ghost { border: 1px solid rgba(255, 255, 255, 0.15); }
        .cta-secondary-slider { position: absolute; inset: 0; background: transparent; transition: background 0.35s ease; z-index: 2; }
        .cta-master-btn.active-ghost .cta-btn-inner-label { color: rgba(255, 255, 255, 0.7); }
        .cta-master-btn.active-ghost:hover { border-color: #ffffff; box-shadow: 0 12px 24px rgba(255, 255, 255, 0.03); }
        .cta-master-btn.active-ghost:hover .cta-secondary-slider { background: rgba(255, 255, 255, 0.05); }
        .cta-master-btn.active-ghost:hover .cta-btn-inner-label { color: #ffffff; }

        /* FIX: Responsive flex logic sheet metrics injected into core styles compilation */
        .hero-metrics-flex-bar { display: flex; gap: 60px; }

        @media (max-width: 820px) {
          .hero-metrics-flex-bar { flex-direction: column !important; gap: 36px !important; }
        }
        @media (max-width: 768px) {
          .cta-button-responsive-wrapper { width: 100% !important; display: block !important; margin-bottom: 12px; }
          .cta-master-btn { width: 100% !important; max-width: 340px !important; }
        }

        @keyframes spinConic { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
      `}} />

      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, backgroundImage: "radial-gradient(ellipse at center, rgba(200, 150, 12, 0.05) 0%, transparent 75%)", pointerEvents: "none", zIndex: 1 }} />
      
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 5, textAlign: "center" }}>
        
        <motion.div variants={stag} initial="hidden" whileInView="show" viewport={{ once: false, margin: "-40px" }}>
          
          <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 16, fontWeight: 500 }}>
            The Right Way to Learn Music
          </motion.p>
          
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 5.5vw, 4.6rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-0.01em", margin: 0 }}>
              <MLine delay={0.04}>Your seat is</MLine>
              <MLine delay={0.12}>
                <span style={{ fontStyle: "italic", background: "linear-gradient(135deg, #E8B84B, #C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>waiting for you.</span>
              </MLine>
            </h2>
          </div>
          
          <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.55)", maxWidth: 540, margin: "0 auto 36px auto", lineHeight: 1.75, textAlign: "center" }}>
            Every great musician started exactly where you are right now. Your individual path toward creative mastery begins with a single focused note under expert guidance.
            <br/><br/>
            <span style={{ color: "#ffffff", fontWeight: 600, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase" }}>
              Guitar &nbsp;&nbsp; Piano &nbsp;&nbsp; Violin &nbsp;&nbsp; Keyboard &nbsp;&nbsp; Drums &nbsp;&nbsp; Music Theory
            </span>
          </motion.p>
          
          <motion.div variants={up} style={{ display: "flex", gap: "16px", justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: "0px" }}>
            <CappedCTAButton onClick={openModal} isPrimary={true}>
              Start Admission →
            </CappedCTAButton>
            <CappedCTAButton href="https://wa.me/919885297005?text=Greetings+Celestial+Harmony+Academy%21+I+would+love+to+connect+and+enquire+about+beginning+my+music+lessons." isPrimary={false}>
              WhatsApp Us
            </CappedCTAButton>
          </motion.div>

          <motion.div variants={up}>
            <HeroMetricsBar />
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}