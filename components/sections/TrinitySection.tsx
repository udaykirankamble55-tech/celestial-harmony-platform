"use client";
import { useRef, useEffect, useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 1, 0.32, 1] } },
};

const stag: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

function MLine({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useTouchDeviceGuard();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trackingThreshold = isTouch ? "top 100%" : "top 92%";

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
            start: trackingThreshold,
            toggleActions: "play none none reset"
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, isTouch]);

  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em" }}>
      <div ref={ref} style={style}>
        {children}
      </div>
    </div>
  );
}

function CollageTile({ 
  img, index, activeGutterIndex, setActiveGutterIndex, setLightboxImg 
}: { 
  img: typeof ALL_ASSETS[0]; index: number; activeGutterIndex: number | null; setActiveGutterIndex: (i: number | null) => void; setLightboxImg: (src: string) => void; 
}) {
  const [hov, setHov] = useState(false);
  const isTouchDevice = useTouchDeviceGuard();
  const isOrigin = activeGutterIndex === index && !isTouchDevice;

  return (
    <div 
      onMouseEnter={() => !isTouchDevice && (setHov(true), setActiveGutterIndex(index))}
      onMouseLeave={() => !isTouchDevice && (setHov(false), setActiveGutterIndex(null))}
      onClick={() => setLightboxImg(img.src)}
      className={`collage-frame-node ${img.sizeClass || ""} ${isOrigin ? "gutter-flow-origin" : ""}`}
      style={{
        transitionDelay: !hov && activeGutterIndex !== null && !isTouchDevice ? `${Math.abs(activeGutterIndex - index) * 0.025}s` : "0s",
        minHeight: img.featured ? "380px" : "310px"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <Image 
          src={img.src} alt={img.alt} fill className="img-core-asset"
          style={{ objectFit: "cover", objectPosition: img.objPos || "top center" }} 
          sizes="(max-width: 768px) 50vw, 33vw"
          draggable={false}
        />
        <div style={{ position: "absolute", inset: 0, zIndex: 10, background: "transparent", cursor: "pointer" }} />
        <div className="wall-vignette" style={{ zIndex: 2 }} />

        {img.featured && (
          // ── FIXED TYPE ASSIGNMENT: Restored ternary operator completely ──
          <div style={{ position: "absolute", bottom: 24, left: 24, zIndex: 3, right: 24, opacity: hov && !isTouchDevice ? 0.15 : 1, transition: "opacity 0.4s" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.15em", color: "#C8960C", background: "rgba(8,8,8,0.85)", padding: "4px 10px", textTransform: "uppercase", borderRadius: "1px" }}>{img.label}</span>
            <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)", color: "#ffffff", margin: "6px 0 0 0", fontWeight: 400 }}>{img.title}</h4>
          </div>
        )}

        <div style={{ 
          position: "absolute", inset: 0, zIndex: 4, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
          opacity: hov && !isTouchDevice ? 1 : 0, visibility: hov && !isTouchDevice ? "visible" : "hidden", transition: "opacity 0.35s ease, visibility 0.35s ease"
        }}>
          <div style={{ overflow: "hidden", padding: "4px 10px" }}>
            <span style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: "#C8960C", textTransform: "uppercase", background: "rgba(8,8,8,0.92)", padding: "8px 16px", border: "1px solid rgba(200,150,12,0.35)", borderRadius: "1px" }}>
              View Full Image ↗
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ 
  r, globalId, activeMobileId, setActiveMobileId, setIsMarqueePaused
}: { 
  r: typeof REVIEWS[0]; globalId: string; activeMobileId: string | null; setActiveMobileId: (id: string | null) => void; setIsMarqueePaused: (p: boolean) => void; 
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isTouchDevice = useTouchDeviceGuard();

  const isActiveOnMobile = isTouchDevice && activeMobileId === globalId;
  const isCardActive = isTouchDevice ? isActiveOnMobile : isHovered;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;
    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = (x - xc) / xc;
    const dy = (y - yc) / yc;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);

    gsap.to(card, {
      rotateX: -dy * 10, rotateY: dx * 10,
      transformPerspective: 1000, x: dx * 8, y: dy * 8,
      duration: 0.25, ease: 'power2.out'
    });
  };

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    setIsHovered(true);
    setIsMarqueePaused(true);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
    setIsMarqueePaused(false);
    if (ref.current) {
      gsap.to(ref.current, { rotateX: 0, rotateY: 0, x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    }
  };

  return (
    <div 
      ref={ref} 
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => isTouchDevice && (e.stopPropagation(), isActiveOnMobile ? (setActiveMobileId(null), setIsMarqueePaused(false)) : (setActiveMobileId(globalId), setIsMarqueePaused(true)))}
      className={`sk-card ${isCardActive ? "is-hovered" : ""}`}
      style={{ 
        position: "relative", background: "rgba(10, 10, 10, 0.85)", border: "1.5px solid rgba(255, 255, 255, 0.08)", padding: "36px 32px", borderRadius: "4px", overflow: "hidden", backdropFilter: "blur(20px)", transformStyle: isTouchDevice ? "flat" : "preserve-3d", transition: "border-color 0.4s ease, box-shadow 0.4s ease", width: "360px", flexShrink: 0, willChange: "transform"
      }}
    >
      <div className="sk-card-content" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, lineHeight: 1, color: "#C8960C", opacity: 0.12, position: "absolute", top: 12, left: 24, pointerEvents: "none" }}>“</div>
          <div style={{ fontSize: 13, color: "#C8960C", letterSpacing: "0.06em", marginBottom: 18 }}>{"★".repeat(r.stars)}</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: 28, textAlign: "justify" }}>{r.text}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #C8960C, rgba(200,150,12,0.4))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'DM Serif Display', serif", fontSize: 16, fontWeight: 700, color: "#080808", borderRadius: "2px" }}>
            {r.name[0]}
          </div>
          <div>
            <p className="sk-group-title" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, letterSpacing: "0.12em", color: "#ffffff", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>{r.name}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.4)", margin: "4px 0 0 0" }}>{r.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrinitySection() {
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [activeGutterIndex, setActiveGutterIndex] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [activeMobileId, setActiveMobileId] = useState<string | null>(null);
  const isTouchDevice = useTouchDeviceGuard();

  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const visibleAssets = isTouchDevice && !isGalleryExpanded ? ALL_ASSETS.slice(0, 6) : ALL_ASSETS;

  return (
    <section id="gallery" className="gallery-section-global-root" onClick={() => isTouchDevice && (setActiveMobileId(null), setIsMarqueePaused(false))} style={{ position: "relative", background: "#080808", padding: "clamp(60px, 8vw, 120px) 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .sk-card { position: relative; }
        .sk-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: conic-gradient(from 0deg, transparent 20%, #C8960C 45%, #ffffff 50%, #C8960C 55%, transparent 80%); animation: rotateBorder 3.5s linear infinite; animation-play-state: paused; opacity: 0; transition: opacity 0.4s ease; z-index: 1; }
        .sk-card::after { content: ''; position: absolute; inset: 1.5px; background: #0a0c0f; border-radius: 3px; z-index: 2; }
        .sk-card-content { position: relative; z-index: 3; }
        
        .sk-card.is-hovered { border-color: transparent !important; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5), 0 0 12px rgba(200, 150, 12, 0.06) !important; }
        .sk-card.is-hovered::before { opacity: 1; animation-play-state: running; }
        
        .trinity-maps-btn { 
          position: relative; overflow: hidden; background: transparent; border: 1px solid #ffffff; color: white; padding: 18px 0; font-family: 'DM Sans', sans-serif; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; line-height: 1; cursor: pointer; transition: border-color 0.4s ease, box-shadow 0.4s ease; border-radius: 2px; text-decoration: none; width: 340px; max-width: 100%; text-align: center; will-change: transform; backface-visibility: hidden; -webkit-backface-visibility: hidden;
        }
        .trinity-maps-btn::before { content: ''; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent 60%, #C8960C 75%, #FFFFFF 85%, #C8960C 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: rotateBorder 2.5s linear infinite; opacity: 0; transition: opacity 0.4s ease; z-index: 0; }
        .trinity-btn-inner { position: absolute; inset: 0; background-image: linear-gradient(to right, #C8960C 50%, #080808 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.4s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1; border-radius: 1px; }
        .trinity-btn-click-bg { position: absolute; inset: 0; background: #C8960C; z-index: 2; transform: scaleX(0); transform-origin: left; transition: transform 0.15s ease-out; }
        .trinity-btn-text { position: relative; z-index: 3; transition: color 0.4s ease; padding: 0 16px; color: #ffffff; }
        
        @media (hover: hover) and (pointer: fine) {
          .trinity-maps-btn:hover::before { opacity: 1; }
          .trinity-maps-btn:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important; border-color: transparent !important; }
          .trinity-maps-btn:hover .trinity-btn-inner { background-position: 0 0; }
          .trinity-maps-btn:hover .trinity-btn-text { color: #080808 !important; }
        }

        .trinity-maps-btn:active .trinity-btn-click-bg { transform: scaleX(1); transition: transform 0.68s cubic-bezier(0.23, 1, 0.32, 1); }
        .trinity-maps-btn:active .trinity-btn-text { color: #080808 !important; transition: color 0.4s cubic-bezier(0.23, 1, 0.32, 1); }

        .marquee-full-out { overflow: hidden; width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; display: flex; padding: 20px 0; }
        .marquee-track { display: flex; gap: 24px; width: max-content; animation: infiniteMarqueeRow 40s linear infinite; }
        .marquee-track.is-paused { animation-play-state: paused !important; }
        .marquee-content-block { display: flex; gap: 24px; }

        .art-wall-collage { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(160px, auto); gap: 20px; position: relative; width: 100%; user-select: none; background: #080808; }
        .art-wall-collage::before { content: ""; position: absolute; inset: 0; background: #111111; z-index: 0; opacity: 0; transition: opacity 0.4s ease; }
        .art-wall-collage.fluid-active::before { background-image: radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), #C8960C 0%, rgba(200,150,12,0.4) 40%, transparent 70%); opacity: 0.38; }

        .collage-frame-node { position: relative; overflow: hidden; background: #0d0d0d; border: 1px solid rgba(255,255,255,0.06); border-radius: 2px; cursor: pointer; z-index: 1; transition: border-color 0.45s ease, box-shadow 0.45s ease; }
        .collage-frame-node .img-core-asset { transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), filter 0.6s ease; }
        
        @media (hover: hover) and (pointer: fine) {
          .collage-frame-node:hover .img-core-asset { transform: scale(1.04); filter: brightness(0.35) contrast(1.05); }
          .collage-frame-node.gutter-flow-origin { border-color: rgba(200, 150, 12, 0.6); box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5) !important; z-index: 2; }
        }

        .wall-vignette { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.15) 50%, transparent 100%) !important; pointer-events: none; z-index: 2; transition: opacity 0.4s; }
        .collage-frame-node:hover .wall-vignette { opacity: 0.4; }

        @keyframes infiniteMarqueeRow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes rotateBorder { 100% { transform: rotate(360deg); } }

        @media (max-width: 1024px) { 
          .art-wall-collage { grid-template-columns: repeat(3, 1fr) !important; } 
        }
        @media (max-width: 768px) { 
          .art-wall-collage { grid-template-columns: repeat(2, 1fr) !important; .col-span-2 { grid-column: span 2 !important; } } 
        }
        
        @media (max-width: 1023px) { 
          /* ── RESTORED SPACE: Replaced 0px block with beautiful padding properties to cushion the links ── */
          .gallery-section-global-root { padding-bottom: 60px !important; }
          .collage-frame-node { border: 1px solid rgba(200, 150, 12, 0.15) !important; } 
          
          .gallery-responsive-badge-row { display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 8px !important; padding: 14px 20px !important; width: 100% !important; max-width: 310px !important; margin: 16px auto 0 auto !important; box-sizing: border-box !important; }
          .gallery-responsive-badge-text { font-size: 9.5px !important; line-height: 1.4 !important; text-align: center !important; letter-spacing: 0.1em !important; }
          
          .gallery-meta-stack-wrapper { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; margin-top: 16px !important; }
          .gallery-mobile-break { display: block !important; }
          .gallery-meta-rating-text { font-size: 13.5px !important; line-height: 1.5 !important; color: rgba(245,240,232,0.6) !important; font-weight: 500 !important; }
          .gallery-meta-stars { font-size: 15px !important; margin-top: 0px !important; letter-spacing: 2px !important; }
          .gallery-review-subtitle { font-size: 11px !important; line-height: 1.4 !important; max-width: 240px !important; margin-bottom: 12px !important; }

          .gallery-responsive-maps-flex-bar { display: flex !important; flex-direction: column !important; align-items: center !important; gap: 12px !important; margin-top: 32px !important; margin-bottom: 48px !important; width: 100% !important; max-width: 310px !important; margin-left: auto !important; margin-right: auto !important; }
          .trinity-maps-btn { padding: 15px 0 !important; font-size: 10.5px !important; }
        }
        
        .gallery-mobile-break { display: none; }
        .gallery-meta-stack-wrapper { display: flex; align-items: center; gap: 12px; margin-top: 10px; }

        @media (max-width: 480px) { .art-wall-collage { grid-template-columns: 1fr !important; .col-span-2 { grid-column: span 1 !important; } } }
        .col-span-1 { grid-column: span 1; } .col-span-2 { grid-column: span 2; } .row-span-1 { grid-row: span 1; } .row-span-2 { grid-row: span 2; }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 40px)", position: "relative", zIndex: 5 }}>

        {/* HEADER SECTION */}
        <motion.div variants={stag} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: "clamp(40px, 6vw, 72px)" }}>
          <motion.p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 12, fontWeight: 500 }}>003 — Our Gallery</motion.p>
          <div style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.2rem, 4.5vw, 4.6rem)", fontWeight: 400, color: "#ffffff" }}>A Record of <span style={{ color: "#C8960C" }}>Excellence.</span></MLine>
          </div>
          <motion.div style={{ width: 56, height: 1, background: "linear-gradient(90deg, transparent, #C8960C, transparent)", margin: "20px auto 16px" }} />
          
          <motion.div className="gallery-responsive-badge-row" style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(200,150,12,0.2)", padding: "10px 24px", background: "rgba(200,150,12,0.04)" }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#C8960C" }}>★★★★★</span>
            <span className="gallery-responsive-badge-text" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".12em", color: "#ffffff", textTransform: "uppercase", fontWeight: 600 }}>100% Merit & Distinction · Every Exam · Every Year</span>
          </motion.div>
        </motion.div>

        {/* ARTISTIC COLLAGE GRID VIEWPORTS CONTAINER */}
        <div 
          ref={gridContainerRef}
          onPointerMove={(e) => {
            if (isTouchDevice || !gridContainerRef.current) return;
            const rect = gridContainerRef.current.getBoundingClientRect();
            gridContainerRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            gridContainerRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          }}
          className={`art-wall-collage ${activeGutterIndex !== null && !isTouchDevice ? "fluid-active" : ""}`} 
        >
          {visibleAssets.map((img, index) => (
            <CollageTile key={index} img={img} index={index} activeGutterIndex={activeGutterIndex} setActiveGutterIndex={setActiveGutterIndex} setLightboxImg={setLightboxImg} />
          ))}
        </div>

        {/* INTERACTIVE DUAL-STATE TOGGLE CONTROLLER FOR PHONES */}
        {isTouchDevice && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px", marginBottom: "0px" }}>
            {!isGalleryExpanded ? (
              <button 
                onClick={() => setIsGalleryExpanded(true)}
                style={{ background: "transparent", border: "1px solid #C8960C", color: "#C8960C", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 32px", cursor: "pointer", borderRadius: "2px" }}
              >
                View All Gallery Images ({ALL_ASSETS.length})
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsGalleryExpanded(false);
                  document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", padding: "14px 32px", cursor: "pointer", borderRadius: "2px" }}
              >
                Close Gallery Frame ↩
              </button>
            )}
          </div>
        )}

        {/* REVIEWS SECTION HEADER BLOCKS */}
        <div className="gallery-responsive-review-header-box" style={{ marginBottom: 36, marginTop: "clamp(60px, 8vw, 96px)" }}>
          
          <p className="gallery-review-subtitle" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 10, fontWeight: 500 }}>
            Real Stories · Google & Justdial Reviews
          </p>
          
          <div style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(1.6rem, 3.2vw, 2.6rem)", fontWeight: 400, fontStyle: "italic", color: "#ffffff" }}>
              What Our <span style={{ background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Students Say</span>
            </MLine>
          </div>
          
          <div className="gallery-meta-stack-wrapper">
            <span className="gallery-meta-rating-text" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", color: "rgba(245,240,232,0.5)", fontWeight: 500 }}>
              4.9 · 312 Total Ratings <span className="gallery-mobile-break"><br /></span>(73 Google & 239 Justdial)
            </span>
            <span className="gallery-meta-stars" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: "#C8960C" }}>
              ★★★★★
            </span>
          </div>

        </div>

        {/* INFINITE MARQUEE CAROUSEL CANVAS */}
        <div className="marquee-full-out" style={{ marginBottom: "40px" }}>
          <div className={`marquee-track ${isMarqueePaused ? "is-paused" : ""}`}>
            <div className="marquee-content-block">
              {REVIEWS.map((r, i) => <ReviewCard key={`block1-${i}`} r={r} globalId={`block1-${i}`} activeMobileId={activeMobileId} setActiveMobileId={setActiveMobileId} setIsMarqueePaused={setIsMarqueePaused} />)}
            </div>
            <div className="marquee-content-block" aria-hidden="true">
              {REVIEWS.map((r, i) => <ReviewCard key={`block2-${i}`} r={r} globalId={`block2-${i}`} activeMobileId={activeMobileId} setActiveMobileId={setActiveMobileId} setIsMarqueePaused={setIsMarqueePaused} />)}
            </div>
          </div>
        </div>

        {/* INTERACTIVE MAP BUTTON LINKS */}
        <div className="gallery-responsive-maps-flex-bar">
          <a href="https://jsdl.in/DT-28Q6IUA6YMQ" target="_blank" rel="noopener noreferrer" className="trinity-maps-btn">
            <div className="trinity-btn-click-bg"></div><div className="trinity-btn-inner"></div>
            <span className="trinity-btn-text">View All 239 Reviews on Justdial ↗</span>
          </a>
          <a href="https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad" target="_blank" rel="noopener noreferrer" className="trinity-maps-btn">
            <div className="trinity-btn-click-bg"></div><div className="trinity-btn-inner"></div>
            <span className="trinity-btn-text">Read All 73 Reviews on Google Maps ↗</span>
          </a>
        </div>

      </div>

      {/* LIGHTBOX MODAL OVERLAY */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxImg(null)} style={{ position: "fixed", inset: 0, background: "rgba(4,4,4,0.97)", backdropFilter: "blur(20px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", userSelect: "none" }}>
            <button onClick={() => setLightboxImg(null)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "24px", cursor: "pointer", transition: "color 0.3s", zIndex: 10000 }} onMouseEnter={(e) => (e.currentTarget.style.color = "#C8960C")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>✕</button>
            <motion.div initial={{ scale: 0.97, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97, y: 12 }} transition={{ type: "spring", stiffness: 280, damping: 28 }} style={{ position: "relative", width: "100%", height: "100%", maxWidth: "1100px", maxHeight: "82vh" }} onClick={(e) => e.stopPropagation()}>
              <Image src={lightboxImg} alt="Enlarged View" fill sizes="(max-width: 1200px) 100vw" style={{ objectFit: "contain" }} unoptimized draggable={false} />
              <div style={{ position: "absolute", inset: 0, zIndex: 99, background: "transparent" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}