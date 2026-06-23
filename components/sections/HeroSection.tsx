"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import HeroVideo from "../ui/HeroVideo";

// ── Shared Responsive Device Interaction Guard Hook ──
function useMobileViewportGuard() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 1024);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);
  return isMobile;
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMobileViewportGuard();
  
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const rx  = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry  = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const sx  = useSpring(x, { stiffness: 180, damping: 18 });
  const sy  = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    x.set(dx * 0.28); y.set(dy * 0.28);
    rx.set((-dy / r.height) * 10);
    ry.set(( dx / r.width ) * 10);
  };
  const onLeave = () => { x.set(0); y.set(0); rx.set(0); ry.set(0); };

  return (
    <motion.div 
      ref={ref} 
      onMouseMove={onMove} 
      onMouseLeave={onLeave} 
      className="hero-magnetic-button-wrapper"
      style={{ 
        x: isMobile ? 0 : sx, 
        y: isMobile ? 0 : sy, 
        rotateX: isMobile ? 0 : rx, 
        rotateY: isMobile ? 0 : ry, 
        display: "inline-block", 
        transformStyle: isMobile ? "flat" : "preserve-3d" 
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroBtn({ label, variant = "gold", onClick }: { label: string; variant?: "gold" | "white"; onClick?: () => void; }) {
  const [hov, setHov] = useState(false);
  const isMobile = useMobileViewportGuard();
  const isGold = variant === "gold";
  const stroke = isGold ? "#C8960C" : "rgba(255,255,255,0.75)";
  const fill   = isGold ? "#C8960C" : "#ffffff";
  const dark   = "#0b0b0b";

  return (
    <Magnetic>
      <button 
        onClick={onClick} 
        onMouseEnter={() => !isMobile && setHov(true)} 
        onMouseLeave={() => setHov(false)} 
        className="hero-nav-cta-btn-node"
        style={{ position: "relative", overflow: "hidden", padding: "clamp(11px,1.4vw,14px) clamp(22px,2.6vw,34px)", border: `1px solid ${stroke}`, background: "transparent", cursor: "pointer", borderRadius: 0, boxShadow: hov && !isMobile ? isGold ? "0 0 32px rgba(200,150,12,0.35)" : "0 0 24px rgba(255,255,255,0.2)" : "none", transition: "box-shadow 0.4s ease" }}
      >
        <motion.span aria-hidden animate={{ x: hov && !isMobile ? "0%" : "-101%" }} transition={{ duration: 0.52, ease: [0.23, 1, 0.32, 1] }} style={{ position: "absolute", inset: 0, background: fill, display: "block", zIndex: 1 }} />
        <span style={{ position: "relative", zIndex: 2, fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(9.5px, 0.9vw, 11px)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: hov && !isMobile ? dark : (isGold ? "#C8960C" : "rgba(255,255,255,0.85)"), transition: "color 0.25s 0.15s", display: "block", whiteSpace: "nowrap" }}>
          {label}
        </span>
      </button>
    </Magnetic>
  );
}

function MLine({ children, delay = 0, gold = false }: { children: React.ReactNode; delay?: number; gold?: boolean; }) {
  return (
    <div style={{ overflow: "hidden", padding: "0.08em 0 0.12em 0", margin: "-0.08em 0 -0.12em 0" }}>
      <motion.div initial={{ y: "108%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} transition={{ duration: 0.88, ease: [0.23, 1, 0.32, 1], delay }}
        style={{
          color: gold ? "#C8960C" : "#ffffff",
          textShadow: "0px 12px 28px rgba(0,0,0,0.85), 0px 3px 8px rgba(0,0,0,0.6)"
        }}>
        {children}
      </motion.div>
    </div>
  );
}

// ── ORIGINAL STUNNING DESKTOP DESIGN SPEC ENGINE (UNTOUCHED) ──
const HS_WHITE: React.CSSProperties = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: "clamp(28px, 3.2vw, 62px)",
  lineHeight: 1.1,
  fontWeight: 400
};

const HS_GOLD: React.CSSProperties =  {
  fontFamily: "'DM Serif Display', serif",
  fontSize: "clamp(40px, 4.2vw, 82px)",
  fontStyle: "italic",
  lineHeight: 1.05,
  marginTop: "0.04em"
};

export default function HeroSection() {
  const isMobile = useMobileViewportGuard();
  const [isExpanded, setIsExpanded] = useState(false);

  const openAdmission = () => {
    const modal = document.getElementById("admModal");
    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');

        /* ── HIGH-PRIORITY ISOLATED MOBILE MEDIA QUERIES ── */
        @media (max-width: 1023px) {
          /* Scale typography text down precisely to look clean inside compact device boundaries */
          .hero-title-white-node { font-size: 24px !important; line-height: 1.2 !important; }
          .hero-title-gold-node { font-size: 28px !important; line-height: 1.15 !important; margin-top: 8px !important; }
          
          /* Pull content padding upwards slightly to safely avoid browser bar collisions */
          .hero-main-layout-container { padding-bottom: clamp(32px, 5vh, 48px) !important; }
          .hero-curriculum-strip-line { font-size: 11px !important; line-height: 1.4 !important; margin-bottom: 20px !important; color: rgba(255,255,255,0.7) !important; }

          /* Stack buttons vertically with identical block width formatting constraints */
          .hero-buttons-responsive-flex-row { flex-direction: column !important; align-items: stretch !important; gap: 12px !important; width: 100% !important; max-width: 290px !important; }
          .hero-magnetic-button-wrapper { width: 100% !important; display: block !important; }
          
          /* Force button container node height to 48px while fully locking the layout border outline paint lines */
          button.hero-nav-cta-btn-node { width: 100% !important; display: flex !important; align-items: center !important; justify-content: center !important; height: 48px !important; padding: 0 !important; border-radius: 0px !important; background: transparent !important; }
        }
      `}} />

      <section id="hero" style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden", backgroundColor: "#000000", margin: 0, padding: 0, display: "flex", alignItems: "center" }}>
        
        <HeroVideo />

        {/* ── AMENDED LIGHTER VIGNETTE OVERLAY ENGINE ── */}
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)" }} />

        {/* Outer Layout Frame Container */}
        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "flex-end" }}>
          
          <div className="hero-main-layout-container" style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)", paddingBottom: "clamp(75px, 8vh, 105px)", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>
            
            {/* Headline Block */}
            <div style={HS_WHITE} className="hero-title-white-node">
              <MLine delay={0.1}>Where musical passion</MLine>
              <MLine delay={0.18}>meets absolute precision.</MLine>
              <div style={HS_GOLD} className="hero-title-gold-node">
                <MLine delay={0.28} gold>Elevating the next generation of exceptional musicians.</MLine>
              </div>
            </div>

            {/* Philosophy Description Subtext */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.72, ease: [0.23, 1, 0.32, 1] }}
              style={{ marginTop: "clamp(14px, 2.2vw, 20px)", width: "100%" }}
            >
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.8rem, 1vw, 0.92rem)", color: "rgba(255,255,255,0.88)", maxWidth: 580, lineHeight: 1.55, marginBottom: "14px", letterSpacing: "0.01em", textShadow: "0 2px 12px rgba(0,0,0,0.95)" }}>
                {isMobile && !isExpanded ? (
                  <>
                    Step into an environment built for true artistic development.{" "}
                    <span 
                      onClick={() => setIsExpanded(true)} 
                      style={{ color: "#C8960C", cursor: "pointer", fontWeight: 600, textDecoration: "underline", marginLeft: "4px", display: "inline-block" }}
                    >
                      Read More
                    </span>
                  </>
                ) : (
                  <>
                    Step into an environment built for true artistic development. We strip away the casual, paint-by-numbers approach to music lessons, replacing it with rigorous technical discipline, authentic mentorship, and a deep respect for the craft.
                    {isMobile && isExpanded && (
                      <span 
                        onClick={() => setIsExpanded(false)} 
                        style={{ color: "#C8960C", cursor: "pointer", fontWeight: 600, textDecoration: "underline", marginLeft: "6px", display: "inline-block" }}
                      >
                        Show Less
                      </span>
                    )}
                  </>
                )}
              </p>

              {/* Streamlined Curriculum Single-Strip Line */}
              <p className="hero-curriculum-strip-line" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.22vw, 18px)", fontWeight: 700, color: "#ffffff", letterSpacing: "0.02em", marginBottom: "clamp(20px, 3.5vh, 32px)", textShadow: "0 2px 10px rgba(0,0,0,0.95)" }}>
                Guitar • Piano • Violin • Keyboard • Drums • Trinity College London Certification
              </p>
              
              {/* Interface Interactive Call Rows */}
              <div className="hero-buttons-responsive-flex-row" style={{ display: "flex", gap: "clamp(10px, 1.2vw, 14px)", flexWrap: "wrap" }}>
                <HeroBtn label="Start Digital Admission" variant="gold" onClick={openAdmission} />
                <HeroBtn label="Explore Programs" variant="white" onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })} />
              </div>
            </motion.div>

          </div>
        </div>

      </section>
    </>
  );
}