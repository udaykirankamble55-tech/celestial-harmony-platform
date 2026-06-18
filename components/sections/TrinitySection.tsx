"use client";
import { useRef, useEffect, useState } from "react";
import { motion, Variants, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ── COMPREHENSIVE RE-ALIGNED ASSET MATRIX ── */
const ALL_ASSETS = [
  { src: "/founder.jpeg", alt: "Johnson Medi Sir — Academy Core Focus", sizeClass: "col-span-2 row-span-2", objPos: "center 8%", featured: true, label: "Principal Director", title: "Johnson Medi Sir" },
  { src: "/examiner1.jpeg", alt: "Official Trinity Evaluation Session 1", sizeClass: "col-span-2 row-span-2", objPos: "top center", featured: true, label: "Live Assessment", title: "Official Trinity Sessions" },
  { src: "/groupclick.jpg", alt: "Celestial Harmony Academy Student Group", sizeClass: "col-span-2 row-span-2", objPos: "center", featured: true, label: "Academy Group", title: "Student Community" },
  { src: "/groupclick2.jpg", alt: "Celestial Harmony Academy Group Session", sizeClass: "col-span-2 row-span-2", objPos: "center", featured: true, label: "Academy Group", title: "Music Ensemble" },
  { src: "/examiner2.jpeg", alt: "Official Trinity Evaluation Session 2", sizeClass: "col-span-2 row-span-2", objPos: "top center", featured: true, label: "Global Validation", title: "100% Passing Metric Record" },
  { src: "/trinityaward.jpeg", alt: "Trinity Validation Award", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  
  { src: "/studentmugshot1.jpeg", alt: "Student Distinction Profile 1", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  { src: "/studentmugshot2.jpeg", alt: "Student Distinction Profile 2", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  { src: "/studentmugshot3.jpeg", alt: "Student Distinction Profile 3", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  { src: "/studentmugshot4.jpeg", alt: "Student Distinction Profile 4", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  { src: "/studentmugshot5.jpeg", alt: "Student Distinction Profile 5", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  { src: "/mugshot6.jpeg", alt: "Student Portrait Highlight 6", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  { src: "/mugshot7.jpeg", alt: "Student Portrait Highlight 7", sizeClass: "col-span-1 row-span-2", objPos: "center 20%" },
  
  { src: "/certificate1.jpeg", alt: "Trinity Grade Certificate 1", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate2.jpeg", alt: "Trinity Grade Certificate 2", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate3.jpeg", alt: "Trinity Grade Certificate 3", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate4.jpeg", alt: "Trinity Grade Certificate 4", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate5.jpeg", alt: "Trinity Grade Certificate 5", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate6.jpeg", alt: "Trinity Grade Certificate 6", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate7.jpeg", alt: "Trinity Grade Certificate 7", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate8.jpeg", alt: "Trinity Grade Certificate 8", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate9.jpeg", alt: "Trinity Grade Certificate 9", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate10.jpeg", alt: "Trinity Grade Certificate 10", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate11.jpeg", alt: "Trinity Grade Certificate 11", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/certificate12.jpeg", alt: "Trinity Grade Certificate 12", sizeClass: "col-span-1 row-span-2", objPos: "center" },
  { src: "/celestial-piano.jpg", alt: "Student practicing piano at the academy", sizeClass: "col-span-1 row-span-2", objPos: "center", featured: false }
];

const REVIEWS = [
  { name: "Mani Jyoti", role: "Parent · Keyboard", stars: 5, text: "My child has been attending keyboard lessons for a few months now and it has been an incredible experience. The curriculum strikes a perfect balance between theory and practical skills. Highly recommended for parents seeking quality music education." },
  { name: "Malla Srikant", role: "Local Guide · Guitar", stars: 5, text: "A complete no brainer choice for anyone. My experience of learning guitar here has been exceptionally good. The structure is clear and the cost is very reasonable compared to other choices in this locality." },
  { name: "Sreekar Chigurupati", role: "Local Guide · Guitar", stars: 5, text: "The best music classes in this part of town without a doubt. I learnt guitar for six months under Johnson Sir and successfully qualified the prestigious Trinity College London Grade 1 examination with confidence." },
  { name: "Geethika", role: "Violin Student", stars: 5, text: "Learning the violin here for a few months has been nothing short of a fantastic experience. Instructors are highly skilled and dedicate equal attention to every single child ensuring absolute mastery." },
  { name: "Jermiya Arikella", role: "Adult Learner · Violin", stars: 5, text: "I am working at an MNC and finally decided to learn the violin at the age of twenty nine. My tutor's teaching methodology is exceptional and deeply thorough. This academy is truly the real deal." },
  { name: "Ashwar Hussain", role: "Parent · Keyboard", stars: 5, text: "A massive vote of thanks to Johnson Sir and the faculty. Their immense patience and genuine passion have been total game changers for my daughter's keyboard skills. We are truly grateful." },
];

const up: Variants = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.23, 1, 0.32, 1] } },
};

const upSmall: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

const stag: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

function MLine({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em" }}>
      <motion.div variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.88, ease: [0.23, 1, 0.32, 1], delay } } }} style={style}>
        {children}
      </motion.div>
    </div>
  );
}

function CollageTile({ 
  img, index, activeGutterIndex, setActiveGutterIndex, setLightboxImg 
}: { 
  img: typeof ALL_ASSETS[0]; index: number; activeGutterIndex: number | null; setActiveGutterIndex: (i: number | null) => void; setLightboxImg: (src: string) => void; 
}) {
  const [hov, setHov] = useState(false);
  const isOrigin = activeGutterIndex === index;

  return (
    <div 
      onMouseEnter={() => {
        setHov(true);
        setActiveGutterIndex(index);
      }}
      onMouseLeave={() => {
        setHov(false);
        setActiveGutterIndex(null);
      }}
      onClick={() => setLightboxImg(img.src)}
      className={`collage-frame-node ${img.sizeClass || ""} ${isOrigin ? "gutter-flow-origin" : ""}`}
      style={{
        transitionDelay: !hov && activeGutterIndex !== null ? `${Math.abs(activeGutterIndex - index) * 0.025}s` : "0s",
        minHeight: img.featured ? "380px" : "310px"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image 
          src={img.src} alt={img.alt} fill className="img-core-asset"
          style={{ objectFit: "cover", objectPosition: img.objPos || "top center" }} 
          draggable={false}
        />
        
        <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "transparent", cursor: "pointer" }} />
        <div className="wall-vignette" style={{ zIndex: 2 }} />

        {img.featured && (
          <div style={{ position: "absolute", bottom: 24, left: 24, zIndex: 3, right: 24, opacity: hov ? 0.15 : 1, transition: "opacity 0.4s" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.15em", color: "#C8960C", background: "rgba(8,8,8,0.85)", padding: "4px 10px", textTransform: "uppercase", borderRadius: "1px" }}>{img.label}</span>
            <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", color: "#ffffff", margin: "6px 0 0 0", fontWeight: 400 }}>{img.title}</h4>
          </div>
        )}

        <div style={{ 
          position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
          opacity: hov ? 1 : 0, visibility: hov ? "visible" : "hidden", transition: "opacity 0.35s ease, visibility 0.35s ease"
        }}>
          <div style={{ overflow: "hidden", padding: "4px 10px" }}>
            <motion.span 
              initial={{ y: "105%" }} 
              animate={{ y: hov ? "0%" : "105%" }} 
              transition={{ duration: 0.38, ease: [0.25, 1, 0.5, 1] }}
              style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "#C8960C", textTransform: "uppercase", background: "rgba(8,8,8,0.92)", padding: "8px 16px", border: "1px solid rgba(200,150,12,0.35)", borderRadius: "1px" }}
            >
              View Full Image ↗
            </motion.span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

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
      const maxTilt = 12;

      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);

      gsap.to(card, {
        rotateX: -dy * maxTilt, rotateY: dx * maxTilt,
        transformPerspective: 1000, x: dx * 10, y: dy * 10,
        duration: 0.3, ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      setHov(false);
      gsap.to(card, {
        rotateX: 0, rotateY: 0, x: 0, y: 0,
        duration: 0.6, ease: 'elastic.out(1, 0.6)'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', () => setHov(true));

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div ref={ref} variants={upSmall} className={`sk-card ${hov ? "is-hovered" : ""}`}
      style={{ position: "relative", background: "rgba(10, 10, 10, 0.85)", border: "1.5px solid rgba(255, 255, 255, 0.08)", padding: "36px 32px", borderRadius: "4px", overflow: "hidden", backdropFilter: "blur(20px)", transformStyle: "preserve-3d", transition: "border-color 0.4s ease, box-shadow 0.4s ease" }}>
      <div className="sk-card-content" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, lineHeight: 1, color: "#C8960C", opacity: 0.12, position: "absolute", top: 12, left: 24, pointerEvents: "none", userSelect: "none" }}>“</div>
          <div style={{ fontSize: 13, color: "#C8960C", letterSpacing: "0.06em", marginBottom: 18 }}>{"★".repeat(r.stars)}</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: 28, textAlign: "justify", textJustify: "inter-word" }}>{r.text}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
          <div style={{ width: 38, height: 34, background: "linear-gradient(135deg, #C8960C, rgba(200,150,12,0.4))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display', serif", fontSize: 15, fontWeight: 700, color: "#080808", borderRadius: "1px" }}>{r.name[0]}</div>
          <div>
            <p className="sk-group-title" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, letterSpacing: "0.12em", color: "#ffffff", textTransform: "uppercase", fontWeight: 700, margin: 0, transition: "text-shadow 0.3s ease" }}>{r.name}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.4)", margin: "4px 0 0 0" }}>{r.role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const transX = useMotionValue(0);
  const transY = useMotionValue(0);

  const springX = useSpring(transX, { stiffness: 140, damping: 14 });
  const springY = useSpring(transY, { stiffness: 140, damping: 14 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cX = rect.left + rect.width / 2;
    const cY = rect.top + rect.height / 2;
    
    const diffX = e.clientX - cX;
    const diffY = e.clientY - cY;
    
    const forceX = Math.max(-2, Math.min(2, diffX * 0.08));
    const forceY = Math.max(-2, Math.min(2, diffY * 0.08));
    
    transX.set(forceX);
    transY.set(forceY);
  };

  const handleMouseLeave = () => {
    transX.set(0);
    transY.set(0);
  };

  return (
    <motion.a
      ref={ref} href={href} target="_blank" rel="noopener"
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="trinity-maps-btn"
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.a>
  );
}

export default function TrinitySection() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [activeGutterIndex, setActiveGutterIndex] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const handleGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    gridContainerRef.current.style.setProperty("--mouse-x", `${x}px`);
    gridContainerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  useEffect(() => {
    const handleSecurityBlock = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === "development") return;
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleContextMenuBlock = (e: MouseEvent) => {
      if (process.env.NODE_ENV === "development") return;
      e.preventDefault();
    };

    window.addEventListener("keydown", handleSecurityBlock);
    window.addEventListener("contextmenu", handleContextMenuBlock);

    return () => {
      window.removeEventListener("keydown", handleSecurityBlock);
      window.removeEventListener("contextmenu", handleContextMenuBlock);
    };
  }, []);

  return (
    <section id="gallery" style={{ position: "relative", background: "#080808", padding: "120px 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .sk-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(from 0deg, transparent 20%, #C8960C 45%, #ffffff 50%, #C8960C 55%, transparent 80%); animation: rotateBorder 3.5s linear infinite; animation-play-state: paused; opacity: 0; transition: opacity 0.4s ease; z-index: 1; }
        .sk-card::after { content: ''; position: absolute; inset: 1.5px; background: #0a0c0f; border-radius: 3px; z-index: 2; transition: background 0.3s ease; }
        .sk-card-content { position: relative; z-index: 3; transform: translateZ(40px); }
        .sk-card.is-hovered { border-color: transparent !important; box-shadow: 0 24px 50px rgba(200, 150, 12, 0.15); }
        .sk-card.is-hovered::before { opacity: 1; animation-play-state: running; }
        
        /* FIX: Assigned exact matching dimensions so strings align beautifully on small screens */
        .trinity-maps-btn { position: relative; overflow: hidden; background: transparent; border: 1px solid #ffffff; color: white; padding: 18px 0; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; line-height: 1; cursor: pointer; transition: border-color 0.4s ease, box-shadow 0.4s ease; border-radius: 2px; text-decoration: none; user-select: none; width: 340px; max-width: 100%; text-align: center; }
        .trinity-maps-btn::before { content: ''; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent 60%, #C8960C 75%, #FFFFFF 85%, #C8960C 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: rotateBorder 2.5s linear infinite; opacity: 0; transition: opacity 0.4s ease; z-index: 0; pointer-events: none; }
        .trinity-btn-inner { position: absolute; inset: 0; background-image: linear-gradient(to right, #C8960C 50%, #080808 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1; }
        .trinity-btn-text { position: relative; z-index: 2; transition: color 0.4s ease; padding: 0 16px; }
        .trinity-maps-btn:hover::before { opacity: 1; }
        .trinity-maps-btn:hover { box-shadow: 0 0 30px rgba(200, 150, 12, 0.35); border-color: transparent !important; }
        .trinity-maps-btn:hover .trinity-btn-inner { background-position: 0 0; }
        .trinity-maps-btn:hover .trinity-btn-text { color: #080808 !important; }

        .art-wall-collage {
          display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(160px, auto); gap: 20px; position: relative; width: 100%; user-select: none; background: #080808;
        }

        .art-wall-collage::before {
          content: ""; position: absolute; inset: 0; background: #111111; z-index: 0; opacity: 0; transition: opacity 0.4s ease;
        }
        .art-wall-collage.fluid-active::before {
          background-image: radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), #C8960C 0%, rgba(200,150,12,0.4) 40%, transparent 70%);
          opacity: 0.38;
        }

        .collage-frame-node {
          position: relative; overflow: hidden; background: #0d0d0d; border: 1px solid rgba(255,255,255,0.06); border-radius: 2px; cursor: pointer; z-index: 1; transition: border-color 0.45s ease, box-shadow 0.45s ease;
        }

        .collage-frame-node .img-core-asset {
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s ease;
        }
        .collage-frame-node:hover .img-core-asset {
          transform: scale(1.05); filter: brightness(0.35) contrast(1.05);
        }

        .collage-frame-node::after {
          content: ""; position: absolute; inset: -20px; background: transparent; pointer-events: none; z-index: -1; transition: box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .collage-frame-node.gutter-flow-origin {
          border-color: rgba(200, 150, 12, 0.6); box-shadow: 0 0 40px rgba(200, 150, 12, 0.25); z-index: 2;
        }

        .wall-vignette { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.15) 50%, transparent 100%); pointer-events: none; z-index: 2; transition: opacity 0.4s; }
        .collage-frame-node:hover .wall-vignette { opacity: 0.4; }

        .reviews-responsive-grid { display: grid; grid-template-columns: repeat(3, 1fr); }

        @media (max-width: 1024px) { 
          .reviews-responsive-grid { grid-template-columns: repeat(2, 1fr) !important; } 
          .art-wall-collage { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) { 
          .reviews-responsive-grid { grid-template-columns: 1fr !important; } 
          .art-wall-collage { grid-template-columns: repeat(2, 1fr) !important; }
          .col-span-2 { grid-column: span 2 !important; }
        }
        @media (max-width: 480px) {
          .art-wall-collage { grid-template-columns: 1fr !important; }
          .col-span-2 { grid-column: span 1 !important; }
        }

        .col-span-1 { grid-column: span 1; }
        .col-span-2 { grid-column: span 2; }
        .row-span-1 { grid-row: span 1; }
        .row-span-2 { grid-row: span 2; }

        @keyframes rotateBorder { 100% { transform: rotate(360deg); } }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 5 }}>

        {/* ── HEADER SECTION ── */}
        <motion.div variants={stag} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: 72 }}>
          <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 14, fontWeight: 500 }}>003 — Our Gallery</motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.4rem,5.5vw,5.2rem)", fontWeight: 400, color: "#ffffff" }}>A Record of <span style={{ color: "#C8960C" }}>Excellence.</span></MLine>
          </motion.div>
          <motion.div variants={up} style={{ width: 56, height: 1, background: "linear-gradient(90deg, transparent, #C8960C, transparent)", margin: "24px auto 20px" }} />
          <motion.div variants={up} style={{ display: "inline-flex", alignItems: "center", gap: 12, border: "1px solid rgba(200,150,12,0.2)", padding: "12px 28px", background: "rgba(200,150,12,0.04)" }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#C8960C", letterSpacing: "0.05em" }}>★★★★★</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: ".14em", color: "#ffffff", textTransform: "uppercase", fontWeight: 600 }}>100% Merit & Distinction · Every Exam · Every Year</span>
          </motion.div>
        </motion.div>

        {/* ── ARTISTIC IMAGE WALL COLLAGE MATRIX ── */}
        <div 
          ref={gridContainerRef}
          onPointerMove={handleGridPointerMove}
          className={`art-wall-collage ${activeGutterIndex !== null ? "fluid-active" : ""}`} 
          style={{ marginBottom: 120 }}
        >
          {ALL_ASSETS.map((img, index) => (
            <CollageTile 
              key={index}
              img={img}
              index={index}
              activeGutterIndex={activeGutterIndex}
              setActiveGutterIndex={setActiveGutterIndex}
              setLightboxImg={setLightboxImg}
            />
          ))}
        </div>

        {/* ── REVIEWS SECTION TITLES ── */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 12, fontWeight: 500 }}>Real Stories · Google & Justdial Reviews</p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, fontStyle: "italic", color: "#ffffff" }}>
              What Our <span style={{ background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Students Say</span>
            </MLine>
          </motion.div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#C8960C" }}>★★★★★</span>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.5)", fontWeight: 500 }}>4.9 · 312 Total Ratings (73 Google & 239 Justdial)</span>
          </div>
        </div>

        {/* ── PORTFOLIO ALIGNED RESPONSIVE REVIEW CARDS MATRIX ── */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }} variants={stag}
          className="reviews-responsive-grid"
          style={{ gap: "24px", marginBottom: 56, alignItems: "stretch" }}>
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </motion.div>

        {/* ── DUAL SIDE-BY-SIDE MAGNETIC REVIEW RE-CENTERED TRIGGER STRIP ── */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginTop: "64px" }}>
          <MagneticButton href="https://jsdl.in/DT-28Q6IUA6YMQ">
            <div className="trinity-btn-inner"></div>
            <span className="trinity-btn-text">View All 239 Reviews on Justdial ↗</span>
          </MagneticButton>
          <MagneticButton href="https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad">
            <div className="trinity-btn-inner"></div>
            <span className="trinity-btn-text">Read All 73 Reviews on Google Maps ↗</span>
          </MagneticButton>
        </div>

      </div>

      {/* ── IMMERSIVE FULL SCREEN VIEWPORT LIGHTBOX MODAL OVERLAY ── */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(4,4,4,0.97)", backdropFilter: "blur(20px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", cursor: "none", userSelect: "none" }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button 
              onClick={() => setLightboxImg(null)}
              style={{ position: "absolute", top: 32, right: 40, background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "28px", cursor: "none", fontFamily: "sans-serif", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#C8960C")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              ✕
            </button>
            <motion.div 
              initial={{ scale: 0.97, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1100px", maxHeight: "82vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={lightboxImg} alt="Enlarged Certificate Handover View" fill 
                style={{ objectFit: "contain" }} unoptimized draggable={false}
              />
              <div style={{ position: "absolute", inset: 0, zIndex: 99, background: "transparent" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}