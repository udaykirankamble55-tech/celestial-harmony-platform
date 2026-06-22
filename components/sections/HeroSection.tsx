"use client";

import { useRef, useState } from "react";

import { motion, useMotionValue, useSpring } from "framer-motion";

import HeroVideo from "../ui/HeroVideo";



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

      <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ position: "relative", overflow: "hidden", padding: "clamp(11px,1.4vw,14px) clamp(22px,2.6vw,34px)", border: `1px solid ${stroke}`, background: "transparent", cursor: "none", borderRadius: 0, boxShadow: hov ? isGold ? "0 0 32px rgba(200,150,12,0.35)" : "0 0 24px rgba(255,255,255,0.2)" : "none", transition: "box-shadow 0.4s ease" }}>

        <motion.span aria-hidden animate={{ x: hov ? "0%" : "-101%" }} transition={{ duration: 0.52, ease: [0.23, 1, 0.32, 1] }} style={{ position: "absolute", inset: 0, background: fill, display: "block", zIndex: 1 }} />

        <span style={{ position: "relative", zIndex: 2, fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(9.5px, 0.9vw, 11px)", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: hov ? dark : (isGold ? "#C8960C" : "rgba(255,255,255,0.85)"), transition: "color 0.25s 0.15s", display: "block", whiteSpace: "nowrap" }}>

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

  const openAdmission = () => {

    const modal = document.getElementById("admModal");

    if (modal) {

      modal.style.display = "flex";

      modal.classList.add("open");

      document.body.style.overflow = "hidden";

    }

  };



  return (

    <>

      <style dangerouslySetInnerHTML={{ __html: `

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');

      `}} />



      <section id="hero" style={{ height: "100vh", width: "100%", position: "relative", overflow: "hidden", backgroundColor: "#000000", margin: 0, padding: 0, display: "flex", alignItems: "center" }}>

       

        <HeroVideo />



        {/* ── TONED DOWN VIGNETTE OVERLAY ── */}

        {/* Dropped baseline alpha properties down drastically so video details cut through brightly */}

        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.12) 50%, transparent 100%)" }} />



        {/* Outer Layout Frame Container */}

        <div style={{ position: "absolute", inset: 0, zIndex: 10, display: "flex", alignItems: "flex-end" }}>

         

          {/* ── REBALANCED VERTICAL HEIGHT BUFFER ── */}

          {/* Calibrated down from 120px-160px down to 75px-105px to lower content structure perfectly by 2cm */}

          <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 5vw, 40px)", paddingBottom: "clamp(75px, 8vh, 105px)", display: "flex", flexDirection: "column", alignItems: "flex-start", textAlign: "left" }}>

           

            {/* Headline Block */}

            <div style={HS_WHITE}>

              <MLine delay={0.1}>Where musical passion</MLine>

              <MLine delay={0.18}>meets absolute precision.</MLine>

              <div style={HS_GOLD}>

                <MLine delay={0.28} gold>Elevating the next generation of exceptional musicians.</MLine>

              </div>

            </div>



            {/* Philosophy Description Subtext */}

            <motion.div

              initial={{ opacity: 0, y: 12 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ delay: 0.42, duration: 0.72, ease: [0.23, 1, 0.32, 1] }}

              style={{ marginTop: "clamp(14px, 2.2vw, 20px)" }}

            >

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.8rem, 1vw, 0.92rem)", color: "rgba(255,255,255,0.88)", maxWidth: 580, lineHeight: 1.55, marginBottom: "14px", letterSpacing: "0.01em", textShadow: "0 2px 12px rgba(0,0,0,0.95)" }}>

                Step into an environment built for true artistic development. We strip away the casual, paint-by-numbers approach to music lessons, replacing it with rigorous technical discipline, authentic mentorship, and a deep respect for the craft.

              </p>



              {/* Streamlined Curriculum Single-Strip Line — White & Bold (Size locked at the +1px profile check) */}

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.22vw, 18px)", fontWeight: 700, color: "#ffffff", letterSpacing: "0.02em", marginBottom: "clamp(20px, 3.5vh, 32px)", textShadow: "0 2px 10px rgba(0,0,0,0.95)" }}>

                Guitar • Piano • Violin • Keyboard • Drums • Trinity College London Certification

              </p>

             

              {/* Interface Interactive Call Rows */}

              <div style={{ display: "flex", gap: "clamp(10px, 1.2vw, 14px)", flexWrap: "wrap" }}>

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

