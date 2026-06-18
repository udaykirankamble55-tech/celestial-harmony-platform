"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 208;

const PANEL_WINDOWS = [
  { panel: 0, start: 0,   end: 75  }, 
  { panel: 1, start: 80,  end: 150 }, 
  { panel: 2, start: 155, end: 208 }, 
] as const;

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const rx  = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry  = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const sx  = useSpring(x, { stiffness: 180, damping: 18 });
  const sy  = useSpring(y, { stiffness: 180, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r  = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    x.set(dx * 0.28); y.set(dy * 0.28);
    rx.set((-dy / r.height) * 10);
    ry.set(( dx / r.width ) * 10);
  };
  const onLeave = () => { x.set(0); y.set(0); rx.set(0); ry.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, rotateX: rx, rotateY: ry, display: "inline-block", transformStyle: "preserve-3d" }}>
      {children}
    </motion.div>
  );
}

function HeroBtn({ label, variant = "gold", onClick }: { label: string; variant?: "gold" | "white"; onClick?: () => void; }) {
  const [hov, setHov] = useState(false);
  const isGold = variant === "gold";
  const stroke = isGold ? "#C8960C" : "rgba(255,255,255,0.75)";
  const fill   = isGold ? "#C8960C" : "#ffffff";
  const dark   = "#0b0b0b";

  return (
    <Magnetic>
      <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", overflow: "hidden", padding: "clamp(12px,1.6vw,15px) clamp(24px,3vw,38px)", border: `1px solid ${stroke}`, background: "transparent", cursor: "none", borderRadius: 0, boxShadow: hov ? isGold ? "0 0 32px rgba(200,150,12,0.35), 0 0 8px rgba(200,150,12,0.2)" : "0 0 24px rgba(255,255,255,0.2)" : "none", transition: "box-shadow 0.4s ease" }}>
        <motion.span aria-hidden animate={{ x: hov ? "0%" : "-101%" }} transition={{ duration: 0.52, ease: [0.23, 1, 0.32, 1] }} style={{ position: "absolute", inset: 0, background: fill, display: "block", zIndex: 1 }} />
        <span style={{ position: "relative", zIndex: 2, fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(10px, 1vw, 11.5px)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: hov ? dark : (isGold ? "#C8960C" : "rgba(255,255,255,0.85)"), transition: "color 0.25s 0.15s", display: "block", whiteSpace: "nowrap" }}>
          {label}
        </span>
      </button>
    </Magnetic>
  );
}

function MLine({ children, delay = 0, gold = false }: { children: React.ReactNode; delay?: number; gold?: boolean; }) {
  return (
    <div style={{ overflow: "hidden", padding: "0.1em 0 0.2em 0", margin: "-0.1em 0 -0.2em 0" }}>
      <motion.div initial={{ y: "108%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-108%", opacity: 0 }} transition={{ duration: 0.88, ease: [0.23, 1, 0.32, 1], delay }} 
        style={{ 
          color: gold ? "#C8960C" : "#ffffff", 
          textShadow: "0px 15px 35px rgba(0,0,0,0.85), 0px 4px 10px rgba(0,0,0,0.6)" 
        }}>
        {children}
      </motion.div>
    </div>
  );
}

const HS_WHITE: React.CSSProperties = { 
  fontFamily: "'DM Serif Display', serif", 
  fontSize: "clamp(40px, 4vw, 84px)", 
  lineHeight: 1.05, 
  fontWeight: 400 
};

const HS_GOLD: React.CSSProperties =  { 
  fontFamily: "'DM Serif Display', serif", 
  fontSize: "clamp(60px, 6vw, 120px)", 
  fontStyle: "italic", 
  lineHeight: 0.95, 
  marginTop: "0.02em" 
};

/* ── Panel 2 Gold Subtitle: Rebalanced to be elegantly slightly larger than the white text row ── */
const HS_GOLD_P1: React.CSSProperties = {
  fontFamily: "'DM Serif Display', serif",
  fontSize: "clamp(46px, 4.6vw, 91px)", 
  fontStyle: "italic",
  lineHeight: 1.05,
  marginTop: "0.08em"
};

const HS_WHITE_P2: React.CSSProperties = { 
  ...HS_WHITE,
  fontSize: "clamp(32px, 3.5vw, 68px)", 
};

/* ── Panel 3 Gold Subtitle: Rebalanced to be elegantly slightly larger than the white text row ── */
const HS_GOLD_P2: React.CSSProperties =  { 
  fontFamily: "'DM Serif Display', serif",
  fontSize: "clamp(37px, 3.9vw, 73px)", 
  fontStyle: "italic",
  lineHeight: 1.05,
  marginTop: "0.08em" 
};

function Panel0() {
  return (
    <motion.div key="p0" style={{ gridArea: "1 / 1 / 2 / 2", alignSelf: "end", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.38 }}>
      <div style={HS_WHITE}>
        <MLine delay={0}>Your fingers</MLine>
        <MLine delay={0.1}>already know the notes.</MLine>
        <div style={HS_GOLD}>
          <MLine delay={0.22} gold>We show them the way.</MLine>
        </div>
      </div>
    </motion.div>
  );
}

function Panel1() {
  return (
    <motion.div key="p1" style={{ gridArea: "1 / 1 / 2 / 2", alignSelf: "end", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", textAlign: "right" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.38 }}>
      <div style={HS_WHITE}>
        <MLine delay={0}>Not just</MLine>
        <MLine delay={0.1}>music lessons</MLine>
        <div style={HS_GOLD_P1}>
          <MLine delay={0.22} gold>A Trinity College London</MLine>
          <MLine delay={0.32} gold>certificate you'll carry for life.</MLine>
        </div>
      </div>
    </motion.div>
  );
}

function Panel2() {
  return (
    <motion.div key="p2" style={{ gridArea: "1 / 1 / 2 / 2", alignSelf: "end", width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.38 }}>
      <div style={{ ...HS_WHITE_P2, transformOrigin: "bottom left" }}>
        <MLine delay={0}>Every great musician</MLine>
        <MLine delay={0.1}>started exactly where you are.</MLine>
        <div style={HS_GOLD_P2}> 
          <MLine delay={0.22} gold>You bring the ambition.</MLine>
          <MLine delay={0.32} gold>We're the right way to make it happen.</MLine>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.72, ease: [0.23, 1, 0.32, 1] }} style={{ marginTop: "clamp(16px, 2.5vw, 24px)" }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.85rem, 1.15vw, 1rem)", color: "rgba(245,240,232,0.68)", maxWidth: 520, lineHeight: 1.6, marginBottom: "clamp(20px, 3vw, 32px)", letterSpacing: "0.02em", textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>
          Master guitar, piano, violin, keyboard, or drums — training built for any age and every stage.
        </p>
        <div style={{ display: "flex", gap: "clamp(10px, 1.4vw, 16px)", flexWrap: "wrap" }}>
          <HeroBtn label="Begin Your Journey" variant="gold" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
          <HeroBtn label="Explore Programs" variant="white" onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const containerRef    = useRef<HTMLDivElement>(null);
  const canvasRef       = useRef<HTMLCanvasElement>(null);
  const currentPanelRef = useRef<number>(-1);
  const [panel, setPanel] = useState<number>(-1);

  useEffect(() => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const loaded = new Set<number>();

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i - 1;
      img.onload = () => {
        loaded.add(idx);
        if (i === 1) { resizeCanvas(); renderFrame(0); }
      };
      img.src = `/sequence/frame_${String(i).padStart(3, "0")}.png`;
      images.push(img);
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width        = window.innerWidth  * dpr;
      canvas.height       = window.innerHeight * dpr;
      canvas.style.width  = window.innerWidth  + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const renderFrame = (idx: number) => {
      const img = images[idx];
      if (!img || !loaded.has(idx)) return;
      const cW = canvas.width, cH = canvas.height;
      const r  = Math.max(cW / img.naturalWidth, cH / img.naturalHeight);
      const dw = img.naturalWidth  * r;
      const dh = img.naturalHeight * r;
      ctx.clearRect(0, 0, cW, cH);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight,
                    (cW - dw) / 2, (cH - dh) / 2, dw, dh);
    };

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=12000", 
        pin: true,
        scrub: 0.55,
        onUpdate(self) {
          const animationEndThreshold = 0.70; 
          const animProgress = Math.min(1, self.progress / animationEndThreshold);
          
          const idx = Math.min(
            TOTAL_FRAMES - 1,
            Math.round(animProgress * (TOTAL_FRAMES - 1))
          );
          renderFrame(idx);

          let next = -1;
          if (idx >= 0 && idx <= 75) next = 0;
          else if (idx >= 80 && idx <= 150) next = 1;
          else if (idx >= 155) next = 2; 

          if (next !== currentPanelRef.current) {
            currentPanelRef.current = next;
            setPanel(next);
          }
        },
      });
    }, container);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gsapCtx.revert();
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');
        @keyframes border-spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
      `}</style>

      <div ref={containerRef} id="hero" style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden", backgroundColor: "#000000", margin: 0, padding: 0 }}>
        
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%", objectFit: "cover", verticalAlign: "top" }} />

        <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />

        <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", maxWidth: 1280, height: "100%", margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)", paddingBottom: "clamp(24px, 4vh, 40px)", display: "grid", gridTemplateColumns: "1fr" }}>
            <AnimatePresence>
              {panel === 0 && <Panel0 />}
              {panel === 1 && <Panel1 />}
              {panel === 2 && <Panel2 />}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {panel === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{ position: "absolute", right: "clamp(24px, 4vw, 40px)", bottom: "clamp(24px, 4vh, 40px)", zIndex: 10 }}
            >
              <div style={{ position: "relative", overflow: "hidden", padding: "14px 28px", borderRadius: "3px", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "380px" }}>
                <div style={{ position: "absolute", top: "50%", left: "50%", width: "300%", height: "300%", background: "conic-gradient(from 0deg, transparent 75%, #C8960C 90%, transparent 100%)", transform: "translate(-50%, -50%) rotate(0deg)", animation: "border-spin 3.5s linear infinite", zIndex: 0 }} />
                <div style={{ position: "absolute", inset: "1px", background: "#0b0b0b", zIndex: 1 }} />
                
                <div style={{ position: "relative", zIndex: 2, fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(10px, 1vw, 11px)", letterSpacing: "0.15em", color: "rgba(245,240,232,0.85)", textTransform: "uppercase", display: "flex", alignItems: "flex-start", gap: "12px", fontWeight: 500, lineHeight: 1.5 }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C8960C", display: "block", boxShadow: "0 0 8px #C8960C", flexShrink: 0, marginTop: "6px" }} />
                  <span>
                    Scrolly Canvas Experience.<br/>
                    <span style={{ color: "rgba(245,240,232,0.5)" }}>Scroll fast / medium pace for best viewing experience.</span>
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}