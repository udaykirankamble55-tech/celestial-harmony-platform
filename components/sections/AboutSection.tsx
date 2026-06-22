"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

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

const STATS = [
  { num: "4.9", suf: "★", label: "Google & Justdial", sub: "312 Total Ratings" },
  { num: "11",  suf: "+", label: "Years Running",   sub: "Est. 2015"    },
  { num: "100", suf: "%", label: "Trinity Merit",   sub: "Pass Record" },
  { num: "5",   suf: "",  label: "Instruments",    sub: "Including Vocals" },
];

const USPS = [
  { n: "01", title: "Trinity Certified Examinations", body: "Grade 1 to 8 pathways built around Trinity College London syllabi. International certification that remains permanently valid and globally recognised." },
  { n: "02", title: "Individual Attention Always",    body: "Every student gets the same undivided focus. We never rush a concept. You move forward only when you are genuinely ready." },
  { n: "03", title: "All Instruments Provided",       body: "No need to own an instrument to begin. Everything from instruments to study materials and grade books is available at the academy." },
  { n: "04", title: "Flexible Timings And Fees",      body: "Weekday mornings to weekend evenings. A fee structure designed to be highly accessible and never exclusive." },
  { n: "05", title: "Stage And Performance Ready",    body: "Regular academy recitals and professional stage opportunities. We build confident performers ready for real audiences." },
];

// ── Unified Hardware-Accelerated GSAP Viewport Reveal Engine ──
function ScrollReveal({ 
  children, 
  style, 
  className = "", 
  y = 28, 
  stagger = 0, 
  start = "top 90%" 
}: { 
  children: React.ReactNode; 
  style?: React.CSSProperties; 
  className?: string; 
  y?: number; 
  stagger?: number; 
  start?: string; 
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? el.children : el;
      
      gsap.fromTo(targets,
        { opacity: 0, y: y },
        {
          opacity: 1,
          y: 0,
          duration: 0.72,
          stagger: stagger || 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: "play none none reset"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [y, stagger, start]);

  return <div ref={ref} style={style} className={className}>{children}</div>;
}

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

function Counter({ target, suffix }: { target: number | string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  
  useEffect(() => {
    if (!inView || !ref.current) return;
    const numVal = Number(target);
    
    if (!isNaN(numVal)) {
      const isDecimal = numVal % 1 !== 0;
      gsap.fromTo({ v: 0 }, { v: numVal }, {
        duration: 1.6, ease: "power2.out",
        onUpdate: function (this: gsap.core.Tween) {
          if (ref.current) {
            const currentVal = (this.targets()[0] as { v: number }).v;
            ref.current.textContent = (isDecimal ? currentVal.toFixed(1) : Math.round(currentVal).toString()) + suffix;
          }
        }
      });
    } else {
      ref.current.textContent = target + suffix;
    }
  }, [inView, target, suffix]);
  
  return <span ref={ref}>{target + suffix}</span>;
}

function useInView(ref: React.RefObject<Element | null>, options: { once?: boolean; margin?: string }) {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once) observer.unobserve(el);
      }
    }, { rootMargin: options.margin });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options.once, options.margin]);
  return isInView;
}

function TiltCard({ children, style, className = "", maxTilt = 10, maxMove = 8 }: { children: React.ReactNode; style?: React.CSSProperties; className?: string; maxTilt?: number; maxMove?: number; }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = useTouchDeviceGuard();

  useEffect(() => {
    if (isTouchDevice) return; 
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
        transformPerspective: 1000, duration: 0.25, ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', () => setIsHovered(true));

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, maxMove, isTouchDevice]);

  return (
    <div ref={ref} className={`tilt-beam-card ${isHovered && !isTouchDevice ? "is-hovered" : ""} ${className}`} style={{ position: "relative", transformStyle: isTouchDevice ? "flat" : "preserve-3d", willChange: "transform", ...style }}>
      <div className="tilt-gradient-spin"></div>
      <div className="tilt-inner-bg" style={{ position: "relative", zIndex: 2, background: "#0a0c0f", height: "100%", borderRadius: "1px" }}>
        {children}
      </div>
    </div>
  );
}

function AboutCappedCTAButton({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="about-cta-beam">
      <div className="about-cta-inner"></div>
      <span className="about-cta-text">{children}</span>
    </a>
  );
}

function AboutUspStripCard({ 
  item, i, activeIndex, setActiveIndex, mobileActiveIndex, setMobileActiveIndex 
}: { 
  item: typeof USPS[0]; i: number; activeIndex: number | null; setActiveIndex: (idx: number | null) => void;
  mobileActiveIndex: number | null; setMobileActiveIndex: (idx: number | null) => void;
}) {
  const isTouchDevice = useTouchDeviceGuard();
  
  const isHovered = activeIndex === i && !isTouchDevice;
  const isMobileActive = mobileActiveIndex === i && isTouchDevice;
  const isCardActive = isTouchDevice ? isMobileActive : isHovered;

  return (
    <div
      onMouseEnter={() => !isTouchDevice && setActiveIndex(i)}
      onMouseLeave={() => !isTouchDevice && setActiveIndex(null)}
      onClick={(e) => {
        if (isTouchDevice) {
          e.preventDefault();
          e.stopPropagation();
          setMobileActiveIndex(mobileActiveIndex === i ? null : i);
        }
      }}
      className={`contact-premium-card about-strip-item-node ${isCardActive ? "is-hovering" : ""}`}
      style={{
        padding: "1.5px", display: "flex", flexDirection: "column", borderRadius: "4px", position: "relative",
        flex: isCardActive ? 1.38 : 1,
        zIndex: isCardActive ? 10 : 1,
        transition: "flex 0.48s cubic-bezier(0.25, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease"
      }}
    >
      <div className="contact-beam-spin"></div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", gap: "clamp(14px, 2.5vw, 20px)", alignItems: "center", background: "#0a0c0f", padding: "14px 24px", borderRadius: "3px", height: "100%" }}>
        <span style={{ 
          fontFamily: "'DM Serif Display', serif", fontSize: isCardActive ? "1.65rem" : "1.35rem", 
          color: isCardActive ? "#C8960C" : "rgba(200,150,12,0.4)", fontStyle: "italic", 
          lineHeight: 1, flexShrink: 0, transition: "color 0.3s ease, font-size 0.3s ease", minWidth: 30 
        }}>
          {item.n}
        </span>
        <div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, color: isCardActive ? "#ffffff" : "rgba(245,240,232,0.85)", marginBottom: 3, transition: "color 0.3s ease" }}>
            {item.title}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: isCardActive ? "rgba(245,240,232,0.7)" : "rgba(245,240,232,0.48)", lineHeight: 1.6, margin: 0, transition: "color 0.3s ease" }}>
            {item.body}
          </p>
        </div>
      </div>
    </div>
  );
}

function FounderCard() {
  const [imgHov, setImgHov] = useState(false);
  const isTouchDevice = useTouchDeviceGuard();

  return (
    <div 
      onMouseEnter={() => !isTouchDevice && setImgHov(true)}
      onMouseLeave={() => !isTouchDevice && setImgHov(false)}
      className={`contact-premium-card ${imgHov && !isTouchDevice ? "is-hovering" : ""}`}
      style={{ padding: "1.5px", background: "rgba(255,255,255,0.06)", borderRadius: "4px", position: "relative", transition: "box-shadow 0.4s ease" }}
    >
      <div className="contact-beam-spin"></div>
      
      {/* Asymmetrical grid wrapper matches image_579bfd.jpg perfectly */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", alignContent: "stretch", overflow: "hidden", borderRadius: "3px", background: "#0a0c0f", width: "100%" }} className="founder-full-card">
        
        <div className="founder-card-image-wrapper" style={{ position: "relative", width: "100%", height: "100%", minHeight: "520px", overflow: "hidden", zIndex: 1 }}>
          <Image src="/founder.jpeg" alt="Johnson Medi — Founder" fill priority sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", transform: imgHov && !isTouchDevice ? "scale(1.02)" : "scale(1)", transition: "transform 0.6s ease, filter 0.6s ease", filter: imgHov && !isTouchDevice ? "brightness(0.95)" : "brightness(0.72)" }} />
        </div>

        {/* Proportioned internal text padding and concise biography lines mirror image_579bfd.jpg exactly */}
        <div style={{ padding: "48px clamp(24px, 4vw, 48px) 40px clamp(24px, 4vw, 48px)", background: "#0a0c0f", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 1 }}>
          <div>
            <div style={{ marginBottom: 4 }}>
              <MLine delay={0} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.1 }}>
                Johnson Medi
              </MLine>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9.5, letterSpacing: ".24em", textTransform: "uppercase", color: "#C8960C", marginBottom: 16, fontWeight: 600 }}>Founder & Principal Instructor</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "0.04em", color: "rgba(255,255,255,0.6)", marginBottom: 20, lineHeight: 1.5 }}>
              Currently Full-Time Head of Performing Arts at <span style={{color: "#C8960C", fontWeight: 500}}>PREMIER INTERNATIONAL SCHOOL</span>
            </p>
            <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.1rem, 1.6vw, 1.25rem)", fontStyle: "italic", color: "#C8960C", borderLeft: "2px solid #C8960C", paddingLeft: "14px", marginBottom: "24px", lineHeight: 1.45 }}>
              "Get the best master you can afford, you’ll find him cheapest in the end."
            </p>
            <div style={{ width: 30, height: 1, background: "linear-gradient(90deg,#C8960C,transparent)", marginBottom: 24 }} />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: 0, textAlign: "justify" }}>
              Academy founder with 10+ years of teaching experience. A Trinity College London certified educator who has guided hundreds of students from age 5 to working professionals to Grade certifications in guitar, keyboard, and violin. His philosophy is simple: teach it right, teach it once.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, gap: "10px" }}>
            {[["10+", "Years Teaching"], ["100%", "Trinity Pass Rate"], ["Grade 1 to 8", "All Instruments"]].map(([v, l]) => (
              <div key={l}>
                <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)", color: "#C8960C", lineHeight: 1 }}>{v}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: 6 }}>{l}</p>
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
  const [mobileActiveUsp, setMobileActiveUsp] = useState<number | null>(null);
  const isTouchDevice = useTouchDeviceGuard();

  return (
    <section id="about" onClick={() => isTouchDevice && setMobileActiveUsp(null)} style={{ position: "relative", background: "#080808", padding: "clamp(60px, 8vw, 120px) 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-premium-card { border-radius: 4px; position: relative; padding: 1.5px; background: rgba(255,255,255,0.06); transition: border-color 0.4s ease, box-shadow 0.4s ease; }
        .contact-beam-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; }
        .contact-beam-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; }
        
        .contact-premium-card.is-hovering .contact-beam-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spinGlowAbout 3s linear infinite; }
        .contact-premium-card.is-hovering { border-color: transparent !important; background: transparent; box-shadow: 0 12px 32px rgba(200, 150, 12, 0.15) !important; }
        .tilt-beam-card.is-hovered .tilt-gradient-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spinGlowAbout 3s linear infinite; }
        .tilt-beam-card.is-hovered { border-color: transparent !important; background: transparent; box-shadow: 0 12px 32px rgba(200, 150, 12, 0.15) !important; }
        
        @media (hover: hover) and (pointer: fine) {
          .about-cta-beam:hover::before { opacity: 1; }
          .about-cta-beam:hover { box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); border-color: transparent !important; }
          .about-cta-beam:hover .about-cta-inner { background-position: 0 0; }
          .about-cta-beam:hover .about-cta-text { color: #080808 !important; font-weight: 700; }
        }

        @media (max-width: 1023px) {
          .contact-premium-card { border: 1px solid rgba(200, 150, 12, 0.15) !important; background: #0a0c0f !important; box-shadow: none !important; }
          .tilt-beam-card { border: 1px solid rgba(200, 150, 12, 0.15) !important; background: #0a0c0f !important; box-shadow: none !important; }
        }

        .tilt-beam-card { border-radius: 2px; position: relative; padding: 2px; background: rgba(255, 255, 255, 0.08); z-index: 1; transition: border-color 0.4s ease, box-shadow 0.4s ease; }
        .tilt-gradient-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; }
        .tilt-gradient-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; }
        
        .about-cta-beam { position: relative; overflow: hidden; background: transparent; border: 1px solid rgba(200, 150, 12, 0.4); color: white; padding: 16px 36px; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600; display: inline-flex; align-items: center; justify-content: center; line-height: 1; cursor: pointer; transition: border-color 0.4s ease, box-shadow 0.4s ease; white-space: nowrap; border-radius: 2px; }
        .about-cta-beam::before { content: ''; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent 60%, #C8960C 75%, #FFFFFF 85%, #C8960C 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: spinGlowAbout 2.5s linear infinite; opacity: 0; transition: opacity 0.4s ease; z-index: 0; pointer-events: none; }
        .about-cta-inner { position: absolute; inset: 1px; background-image: linear-gradient(to right, #C8960C 50%, #080808 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1; border-radius: 1px; }
        .about-cta-text { position: relative; z-index: 2; transition: color 0.4s ease; }
        
        .about-cta-beam:active .about-cta-inner { background-position: 0 0 !important; }
        .about-cta-beam:active .about-cta-text { color: #080808 !important; font-weight: 700; }

        .stats-responsive-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: clamp(48px, 6vw, 80px); }

        @keyframes spinGlowAbout { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

        @media (max-width: 1024px) { 
          .stats-responsive-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .location-strip-grid { grid-template-columns: auto 1fr !important; gap: 20px !important; } 
          .location-strip-grid div:last-child { grid-column: span 2 !important; justify-content: flex-start !important; margin-top: 8px; } 
          .about-main-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 768px) { 
          .founder-full-card { grid-template-columns: 1fr !important; } 
          .founder-card-image-wrapper { aspect-ratio: auto !important; height: 460px !important; }
        }
        @media (max-width: 520px) {
          .stats-responsive-grid { grid-template-columns: 1fr !important; }
          .location-strip-grid { grid-template-columns: 1fr !important; gap: 16px !important; padding: 24px !important; }
          .location-strip-grid div:last-child { grid-column: span 1 !important; flex-direction: column; align-items: stretch; margin-top: 4px; gap: 10px !important; }
          .location-strip-grid div:last-child a { width: 100%; text-align: center; }
        }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 40px)", position: "relative", zIndex: 1 }}>

        {/* SECTION HEADER */}
        <div style={{ marginBottom: "clamp(32px, 4vw, 48px)" }}>
          <ScrollReveal y={24}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 10, fontWeight: 500 }}>
              001 — Our Heritage
            </p>
          </ScrollReveal>
          <div style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.6rem)", fontWeight: 400, color: "#ffffff" }}>Built in KPHB.</MLine>
            <MLine delay={0.1} style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.6rem)", fontWeight: 400, fontStyle: "italic", background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Designed for Mastery.</MLine>
          </div>
        </div>

        {/* STATS GRID */}
        <ScrollReveal stagger={0.12} y={32} className="stats-responsive-grid">
          {STATS.map((s, i) => (
            <div key={i} style={{ position: "relative", zIndex: 5, perspective: isTouchDevice ? "none" : "1000px" }}>
              <TiltCard maxTilt={10} maxMove={8} style={{ textAlign: "center", height: "100%" }}>
                <div style={{ padding: "clamp(20px, 2.5vw, 32px) clamp(14px, 1.8vw, 24px)" }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2rem, 3.5vw, 3.2rem)", fontWeight: 400, lineHeight: 1, background: "linear-gradient(135deg,#E8B84B 0%,#C8960C 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <Counter target={isNaN(Number(s.num)) ? s.num : Number(s.num)} suffix={s.suf} />
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: ".2em", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", marginTop: 8 }}>{s.label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, color: "rgba(200,150,12,0.5)", marginTop: 4 }}>{s.sub}</div>
                </div>
              </TiltCard>
            </div>
          ))}
        </ScrollReveal>

        {/* BALANCED EQUAL-HEIGHT LAYOUT GRID CANVAS */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(32px, 5vw, 64px)", alignItems: "stretch", marginBottom: "clamp(54px, 8vw, 96px)" }} className="about-main-grid">
          
          {/* LEFT PANEL */}
          <ScrollReveal y={20} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
            <div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: "#C8960C", marginBottom: 14 }}>The Academy</p>
              
              <div style={{ fontFamily: "'DM Serif Display', serif", marginBottom: 18 }}>
                <MLine delay={0} style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)", fontWeight: 400, color: "#ffffff", lineHeight: 1.15 }}>A Decade of</MLine>
                <MLine delay={0.08} style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#E8B84B", lineHeight: 1.15 }}>Musical Mastery</MLine>
                <MLine delay={0.15} style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.4rem)", fontWeight: 400, fontStyle: "italic", color: "#E8B84B", lineHeight: 1.15 }}>in Hyderabad</MLine>
              </div>
              
              <div style={{ width: 40, height: 1, background: "linear-gradient(90deg,#C8960C,transparent)", marginBottom: 24 }} />
              
              <div style={{ textAlign: "justify" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: 14 }}>
                  Celestial Harmony is a space where musical mastery meets genuine passion. Founded by Johnson Sir in 2015 we have built a reputation on patience and absolute clarity. Parents and students consistently praise our structured approach ensuring every individual truly understands the music before moving forward.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: 14 }}>
                  As a Trinity College London Validated Course Provider every lesson is deeply rooted in Staff Notation. This internationally recognised language of music becomes second nature to our students. We focus on building a flawless foundation from day one.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: 14 }}>
                  Music for all ages is our reality. We have successfully trained everyone from young beginners to corporate professionals achieving perfect Merit and Distinction records in Trinity Grade Examinations. Learning here means learning it right the first time.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
              <AboutCappedCTAButton href="tel:+919885297005">Call Now</AboutCappedCTAButton>
              <AboutCappedCTAButton href="https://wa.me/919885297005?text=Greetings+Celestial+Harmony+Academy%21+I+would+love+to+connect+and+enquire+about+beginning+my+music+lessons.">WhatsApp Us</AboutCappedCTAButton>
            </div>
          </ScrollReveal>

          {/* RIGHT PANEL: ACCORDION USP STRIPS STACK CONTAINER */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px", width: "100%", height: isTouchDevice ? "480px" : "100%" }}>
            {USPS.map((item, i) => (
              <AboutUspStripCard 
                key={i} item={item} i={i} 
                activeIndex={activeUspIndex} setActiveIndex={setActiveUspIndex} 
                mobileActiveIndex={mobileActiveUsp} setMobileActiveIndex={setMobileActiveUsp}
              />
            ))}
          </div>
        </div>

        {/* FACULTY PORTRAIT SECTION */}
        <div style={{ marginTop: 60, marginBottom: 60 }}>
          <ScrollReveal start="top 94%" y={24}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 12, textAlign: "center" }}>Our Faculty</p>
          </ScrollReveal>
          <div style={{ fontFamily: "'DM Serif Display', serif", marginBottom: "clamp(28px, 4vw, 44px)" }}>
            <MLine delay={0} style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, fontStyle: "italic", color: "#ffffff", textAlign: "center" }}>
              The <span style={{ background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Heart</span> of the Academy
            </MLine>
          </div>
          <ScrollReveal start="top 94%" y={32}>
            <FounderCard />
          </ScrollReveal>
        </div>

        {/* GEOLOCATION STRIP BAR */}
        <ScrollReveal y={32}>
          <div 
            onMouseEnter={() => !isTouchDevice && setLocHover(true)}
            onMouseLeave={() => !isTouchDevice && setLocHover(false)}
            className={`contact-premium-card ${locHover && !isTouchDevice ? "is-hovering" : ""}`} 
            style={{ padding: "1.5px", background: "rgba(255, 255, 255, 0.06)", borderRadius: "4px" }}
          >
            <div className="contact-beam-spin"></div>
            <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", padding: "clamp(24px, 3.5vw, 36px) clamp(24px, 4vw, 40px)", borderRadius: "3px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "24px", alignItems: "center", width: "100%" }} className="location-strip-grid">
              <svg width="24" height="28" viewBox="0 0 18 22" fill="none" stroke="#C8960C" strokeWidth="1.2" style={{ flexShrink: 0 }}>
                <path d="M9 1C4.58 1 1 4.58 1 9c0 6.75 8 12 8 12s8-5.25 8-12c0-4.42-3.58-8-8-8z"/><circle cx="9" cy="9" r="2.5"/>
              </svg>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, letterSpacing: ".16em", textTransform: "uppercase", color: "#ffffff", fontWeight: 700, margin: 0 }}>Our Location</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(245,240,232,0.6)", lineHeight: 1.4, margin: 0, paddingRight: "10px" }}>
                  484 MIG 1, First Floor, Beside Vayuputra Towers, KPHB Phase 2, Hyderabad
                </p>
              </div>
              
              <div style={{ display: "flex", gap: 12, flexShrink: 0, alignItems: "center" }}>
                <AboutCappedCTAButton href="https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad">Open Maps ↗</AboutCappedCTAButton>
                <AboutCappedCTAButton href="tel:+919885297005">+91 98852 97005</AboutCappedCTAButton>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}