"use client";
import { useRef, useEffect, useState } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  // FIX: Merged Google (73) and Justdial (239) tracking footprints into a single 312 total ratings block
  { num: "4.9", suf: "★", label: "Google & Justdial", sub: "312 Total Ratings" },
  // FIX: Recalibrated longevity timeline to 11+ years running to align with the 2015 establishment date
  { num: "11",  suf: "+", label: "Years Running",  sub: "Est. 2015"   },
  { num: "100", suf: "%", label: "Trinity Merit",  sub: "Pass Record" },
  { num: "5",   suf: "",  label: "Instruments",    sub: "Including Vocals" },
];

const USPS = [
  { n: "01", title: "Trinity Certified Examinations", body: "Grade 1 to 8 pathways built around Trinity College London syllabi. International certification that remains permanently valid and globally recognised." },
  { n: "02", title: "Individual Attention Always",    body: "Every student gets the same undivided focus. We never rush a concept. You move forward only when you are genuinely ready." },
  { n: "03", title: "All Instruments Provided",       body: "No need to own an instrument to begin. Everything from instruments to study materials and grade books is available at the academy." },
  { n: "04", title: "Flexible Timings And Fees",      body: "Weekday mornings to weekend evenings. A fee structure designed to be highly accessible and never exclusive." },
  { n: "05", title: "Stage And Performance Ready",    body: "Regular academy recitals and professional stage opportunities. We build confident performers ready for real audiences." },
];

const up: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.23, 1, 0.32, 1] } },
};

const upSmall: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

const stag: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function MLine({ children, delay = 0, style, className = "" }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; className?: string; }) {
  return (
    <div className={className} style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em" }}>
      <motion.div variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.88, ease: [0.23, 1, 0.32, 1], delay } } }} style={style}>
        {children}
      </motion.div>
    </div>
  );
}

function Counter({ target, suffix }: { target: number | string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    if (typeof target === "number") {
      gsap.fromTo({ v: 0 }, { v: target }, {
        duration: 1.9, ease: "power2.out",
        onUpdate: function (this: gsap.core.Tween) {
          if (ref.current) ref.current.textContent = Math.round((this.targets()[0] as { v: number }).v) + suffix;
        }
      });
    } else {
      ref.current.textContent = target + suffix;
    }
  }, [inView, target, suffix]);
  return <span ref={ref}>{typeof target === "number" ? "0" + suffix : target + suffix}</span>;
}

function TiltCard({ children, style, className = "" , maxTilt = 12, maxMove = 10 }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; maxTilt?: number; maxMove?: number; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = ref.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / xc;
      const dy = (y - yc) / yc;

      gsap.to(card, {
        rotateX: -dy * maxTilt, rotateY: dx * maxTilt,
        x: dx * maxMove, y: dy * maxMove,
        transformPerspective: 1000, duration: 0.3, ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        rotateX: 0, rotateY: 0, x: 0, y: 0,
        duration: 0.6, ease: 'elastic.out(1, 0.6)'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', () => setIsHovered(true));

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, maxMove]);

  return (
    <div ref={ref} className={`tilt-beam-card ${isHovered ? "is-hovered" : ""} ${className}`} style={{ position: "relative", transformStyle: "preserve-3d", willChange: "transform", ...style }}>
      <div className="tilt-gradient-spin"></div>
      <div className="tilt-inner-bg" style={{ position: "relative", zIndex: 2, background: "#0a0c0f", height: "100%", borderRadius: "1px" }}>
        {children}
      </div>
    </div>
  );
}

function AboutCappedCTAButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);

  const springX = useSpring(mX, { stiffness: 120, damping: 14 });
  const springY = useSpring(mY, { stiffness: 120, damping: 14 });

  const transX = useTransform(springX, [-0.5, 0.5], [-3, 3]); 
  const transY = useTransform(springY, [-0.5, 0.5], [-3, 3]);
  const tiltX = useTransform(springY, [-0.5, 0.5], [6, -6]);   
  const tiltY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  return (
    <motion.a
      ref={ref} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener"
      onMouseMove={(e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mX.set((e.clientX - rect.left) / rect.width - 0.5);
        mY.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { mX.set(0); mY.set(0); }}
      className="about-cta-beam"
      style={{ x: transX, y: transY, rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      <div className="about-cta-inner"></div>
      <span className="about-cta-text">{children}</span>
    </motion.a>
  );
}

function AboutUspStripCard({ item, i, activeIndex, setActiveIndex }: { item: typeof USPS[0]; i: number; activeIndex: number | null; setActiveIndex: (idx: number | null) => void; }) {
  const isHovered = activeIndex === i;

  return (
    <motion.div
      variants={upSmall}
      onMouseEnter={() => setActiveIndex(i)}
      onMouseLeave={() => setActiveIndex(null)}
      className={`contact-premium-card ${isHovered ? "is-hovering" : ""}`}
      style={{
        padding: "1.5px", display: "flex", flexDirection: "column", borderRadius: "4px", position: "relative",
        flex: isHovered ? 1.4 : 1, 
        zIndex: isHovered ? 10 : 1,
        transition: "flex 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease"
      }}
    >
      <div className="contact-beam-spin"></div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: 24, alignItems: "center", background: "#0a0c0f", padding: "22px 26px", borderRadius: "3px", height: "100%" }}>
        <span style={{ 
          fontFamily: "'DM Serif Display', serif", fontSize: isHovered ? "1.8rem" : "1.4rem", 
          color: isHovered ? "#C8960C" : "rgba(200,150,12,0.35)", fontStyle: "italic", 
          lineHeight: 1, flexShrink: 0, transition: "color 0.4s ease, font-size 0.4s ease", minWidth: 32 
        }}>
          {item.n}
        </span>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isHovered ? 13.5 : 12.5, letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, color: isHovered ? "#ffffff" : "rgba(245,240,232,0.8)", marginBottom: 6, transition: "color 0.4s ease, font-size 0.4s ease" }}>
            {item.title}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: isHovered ? "rgba(245,240,232,0.65)" : "rgba(245,240,232,0.45)", lineHeight: 1.75, margin: 0, transition: "color 0.4s ease" }}>
            {item.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FounderCard() {
  const [imgHov, setImgHov] = useState(false);

  return (
    <div 
      onMouseEnter={() => setImgHov(true)}
      onMouseLeave={() => setImgHov(false)}
      className={`contact-premium-card ${imgHov ? "is-hovering" : ""}`}
      style={{ 
        padding: "1.5px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", position: "relative",
        boxShadow: imgHov ? "0 12px 24px rgba(200, 150, 12, 0.08)" : "none",
        transition: "box-shadow 0.4s ease"
      }}
    >
      <div className="contact-beam-spin"></div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", alignContent: "stretch", overflow: "hidden", borderRadius: "3px", background: "#0d0b09", width: "100%" }} className="founder-full-card">
        <div style={{ position: "relative", height: "100%", width: "100%", overflow: "hidden", zIndex: 1 }}>
          <Image src="/founder.jpeg" alt="Johnson Medi — Founder" fill priority
            style={{ objectFit: "cover", transform: imgHov ? "scale(1.04)" : "scale(1)", transition: "transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), filter 0.8s", filter: imgHov ? "brightness(1) contrast(1.05)" : "brightness(0.65) contrast(1.08)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(200,150,12,0.15), transparent)", opacity: imgHov ? 1 : 0, transition: "opacity .5s", pointerEvents: "none" }} />
        </div>

        <div style={{ padding: "clamp(32px,5vw,64px)", background: "#0a0c0f", display: "flex", flexDirection: "column", justifyContent: "center", zIndex: 1 }}>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ marginBottom: 12 }}>
            <MLine delay={0} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(3.8rem,5.5vw,5rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1 }}>
              Johnson Medi
            </MLine>
          </motion.div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "#C8960C", marginBottom: 16, fontWeight: 600 }}>Founder & Principal Instructor</p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", marginBottom: 32, fontWeight: 500 }}>
            Currently Full-Time Head of Performing Arts at <span style={{color: "#C8960C"}}>PREMIER INTERNATIONAL SCHOOL</span>
          </p>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.2rem, 2vw, 1.4rem)", fontStyle: "italic", color: "#C8960C", borderLeft: "2px solid #C8960C", paddingLeft: "16px", marginBottom: "28px", lineHeight: 1.4 }}>
            "Get the best master you can afford, you’ll find him cheapest in the end."
          </p>
          <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,#C8960C,transparent)", marginBottom: 24 }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: 32, textAlign: "justify", textJustify: "inter-word" }}>
            Academy founder with 10+ years of teaching experience. A Trinity College London certified educator who has guided hundreds of students from age 5 to working professionals to Grade certifications in guitar, keyboard, and violin. His philosophy is simple: teach it right, teach it once.
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24 }}>
            {[["10+", "Years Teaching"], ["100%", "Trinity Pass Rate"], ["Grade 1 to 8", "All Instruments"]].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.4rem,2vw,1.8rem)", color: "#C8960C", lineHeight: 1 }}>{v}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: 8 }}>{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const [locHover, setLocHover] = useState(false);
  const [activeUspIndex, setActiveUspIndex] = useState<number | null>(null);

  return (
    <section id="about" style={{ position: "relative", background: "#080808", padding: "120px 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-premium-card { border-radius: 4px; position: relative; padding: 1.5px; background: rgba(255,255,255,0.06); transition: border-color 0.4s ease, box-shadow 0.4s ease; }
        .contact-beam-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; }
        .contact-beam-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; transition: opacity 0.4s ease; }
        .contact-premium-card.is-hovering .contact-beam-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spinGlowAbout 3s linear infinite; }
        .contact-premium-card.is-hovering { border-color: transparent; background: transparent; box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); }

        .tilt-beam-card { border-radius: 2px; position: relative; padding: 2px; background: rgba(255, 255, 255, 0.08); z-index: 1; }
        .tilt-gradient-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; }
        .tilt-gradient-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; transition: opacity 0.4s ease; }
        .tilt-beam-card.is-hovered .tilt-gradient-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spinGlowAbout 3s linear infinite; }
        .tilt-beam-card.is-hovered { box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); background: transparent; border-color: transparent; }
        
        .about-cta-beam { position: relative; overflow: hidden; background: transparent; border: 1px solid rgba(200, 150, 12, 0.4); color: white; padding: 18px 40px; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; line-height: 1; cursor: pointer; transition: border-color 0.4s ease, box-shadow 0.4s ease; white-space: nowrap; border-radius: 2px; }
        .about-cta-beam::before { content: ''; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent 60%, #C8960C 75%, #FFFFFF 85%, #C8960C 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: spinGlowAbout 2.5s linear infinite; opacity: 0; transition: opacity 0.4s ease; z-index: 0; pointer-events: none; }
        .about-cta-inner { position: absolute; inset: 1px; background-image: linear-gradient(to right, #C8960C 50%, #080808 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1; border-radius: 1px; border: none !important; }
        .about-cta-text { position: relative; z-index: 2; transition: color 0.4s ease; }
        .about-cta-beam:hover::before { opacity: 1; }
        .about-cta-beam:hover { box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); border-color: transparent !important; }
        .about-cta-beam:hover .about-cta-inner { background-position: 0 0; }
        .about-cta-beam:hover .about-cta-text { color: #080808 !important; font-weight: 700; }
        
        @keyframes spinGlowAbout { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @media (max-width: 1024px) { .location-strip-grid { grid-template-columns: auto 1fr !important; gap: 20px !important; } .location-strip-grid div:last-child { grid-column: span 2 !important; justify-content: flex-start !important; margin-top: 10px; } }
        @media (max-width: 768px) { .about-main-grid { grid-template-columns: 1fr !important; } .founder-full-card { grid-template-columns: 1fr !important; } }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

        {/* SECTION HEADER CHANNELS */}
        <div style={{ marginBottom: 48 }}>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 12, fontWeight: 500 }}>
            001 — Our Heritage
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.4rem,5.5vw,5.2rem)", fontWeight: 400, color: "#ffffff" }}>Built in KPHB.</MLine>
            <MLine delay={0.12} style={{ fontSize: "clamp(2.4rem,5.5vw,5.2rem)", fontWeight: 400, fontStyle: "italic", background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Designed for Mastery.</MLine>
          </motion.div>
        </div>

        {/* COUNTER METRICS STRIP BANNER */}
        <motion.div variants={stag} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px", marginBottom: 64 }}>
          {STATS.map((s, i) => (
            <motion.div key={i} variants={up} style={{ position: "relative", zIndex: 5, perspective: "1000px" }}>
              <TiltCard maxTilt={12} maxMove={10} style={{ textAlign: "center" }}>
                <div style={{ padding: "clamp(24px,3vw,36px) clamp(16px,2vw,28px)" }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 400, lineHeight: 1, background: "linear-gradient(135deg,#E8B84B 0%,#C8960C 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <Counter target={isNaN(Number(s.num)) ? s.num : Number(s.num)} suffix={s.suf} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: ".22em", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", marginTop: 10 }}>{s.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(200,150,12,0.5)", marginTop: 5 }}>{s.sub}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CORE WORKSPACE DUAL-GRID CANVAS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "stretch", marginBottom: 96 }} className="about-main-grid">
          
          {/* LEFT SIDE BLOCK CONTENT LAYOUT */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <motion.p initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "#C8960C", marginBottom: 18 }}>The Academy</motion.p>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", marginBottom: 24 }}>
                <MLine delay={0} style={{ fontSize: "clamp(1.7rem,3vw,2.8rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.15 }}>A Decade of</MLine>
                <MLine delay={0.1} style={{ fontSize: "clamp(1.7rem,3vw,2.8rem)", fontWeight: 400, fontStyle: "italic", color: "#E8B84B", lineHeight: 1.15 }}>Musical Mastery</MLine>
                <MLine delay={0.2} style={{ fontSize: "clamp(1.7rem,3vw,2.8rem)", fontWeight: 400, fontStyle: "italic", color: "#E8B84B", lineHeight: 1.15 }}>in Hyderabad</MLine>
              </motion.div>
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={up} style={{ width: 40, height: 1, background: "linear-gradient(90deg,#C8960C,transparent)", marginBottom: 28 }} />
              <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={stag} style={{ textAlign: "justify", textJustify: "inter-word" }}>
                <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
                  {/* FIX: Swapped out the old 2014 establishment string vector value for the corrected 2015 marker */}
                  Celestial Harmony is a space where musical mastery meets genuine passion. Founded by Johnson Sir in 2015 we have built a reputation on patience and absolute clarity. Parents and students consistently praise our structured approach ensuring every individual truly understands the music before moving forward.
                </motion.p>
                <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
                  As a Trinity College London Validated Course Provider every lesson is deeply rooted in Staff Notation. This internationally recognised language of music becomes second nature to our students. We focus on building a flawless foundation from day one.
                </motion.p>
                <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: 16 }}>
                  Music for all ages is our reality. We have successfully trained everyone from young beginners to corporate professionals achieving perfect Merit and Distinction records in Trinity Grade Examinations. Learning here means learning it right the first time.
                </motion.p>
              </motion.div>
            </div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={up} style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              <AboutCappedCTAButton href="tel:+919885297005">Call Now</AboutCappedCTAButton>
              <AboutCappedCTAButton href="https://wa.me/919885297005?text=Greetings+Celestial+Harmony+Academy%21+I+would+love+to+connect+and+enquire+about+beginning+my+music+lessons.">WhatsApp Us</AboutCappedCTAButton>
            </motion.div>
          </div>

          {/* RIGHT SIDE BLOCK: FIGMA RESPONSIVE AUTO-LAYOUT USP MATRIX */}
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.1 }} variants={stag} 
            style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%", width: "100%" }}
          >
            {USPS.map((item, i) => (
              <AboutUspStripCard key={i} item={item} i={i} activeIndex={activeUspIndex} setActiveIndex={setActiveUspIndex} />
            ))}
          </motion.div>
        </div>

        {/* ── ENHANCED FACULTY PORTRAIT SECTION ── */}
        <div style={{ marginTop: 80, marginBottom: 80 }}>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 14, textAlign: "center" }}>Our Faculty</motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag}>
            <MLine delay={0} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, fontStyle: "italic", color: "#ffffff", textAlign: "center", marginBottom: "clamp(32px,5vw,52px)" }}>
              The <span style={{ background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Heart</span> of the Academy
            </MLine>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={up}>
            <FounderCard />
          </motion.div>
        </div>

        {/* ── PERMANENT BRAND GEOLOCATION INDEX ANCHOR BAR ── */}
        <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1] }}>
          <div 
            onMouseEnter={() => setLocHover(true)}
            onMouseLeave={() => setLocHover(false)}
            className={`contact-premium-card ${locHover ? "is-hovering" : ""}`} 
            style={{ padding: "1.5px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "4px" }}
          >
            <div className="contact-beam-spin"></div>
            <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", padding: "32px 40px", borderRadius: "3px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "28px", alignItems: "center", width: "100%" }} className="location-strip-grid">
              <svg width="28" height="32" viewBox="0 0 18 22" fill="none" stroke="#C8960C" strokeWidth="1.2" style={{ flexShrink: 0 }}>
                <path d="M9 1C4.58 1 1 4.58 1 9c0 6.75 8 12 8 12s8-5.25 8-12c0-4.42-3.58-8-8-8z"/><circle cx="9" cy="9" r="2.5"/>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, letterSpacing: ".18em", textTransform: "uppercase", color: "#ffffff", fontWeight: 700, margin: 0 }}>Our Location</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "rgba(245,240,232,0.6)", lineHeight: 1.5, margin: 0, paddingRight: "20px" }}>
                  484 MIG 1, First Floor, Beside Vayuputra Towers, KPHB Phase 2, Hyderabad
                </p>
              </div>
              <div style={{ display: "flex", gap: 14, flexShrink: 0, alignItems: "center" }}>
                <AboutCappedCTAButton href="https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad">Open Maps ↗</AboutCappedCTAButton>
                <AboutCappedCTAButton href="tel:+919885297005">+91 98852 97005</AboutCappedCTAButton>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}