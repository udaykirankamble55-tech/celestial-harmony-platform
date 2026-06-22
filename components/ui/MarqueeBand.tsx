"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "Guitar",
  "Keyboard",
  "Violin",
  "Piano",
  "Drums",
  "Trinity Grade Exams",
  "Staff Notation",
  "Music for All Ages",
  "KPHB Hyderabad",
  "Est. 2015", // Fixed: Synchronized establishment timeline precisely with core branding targets
  "100% Distinction Record",
  "The Right Way to Learn Music"
];

// Tripled array pool to guarantee seamless loops on ultra-wide 4K/8K viewports
const marqueePool = [...ITEMS, ...ITEMS, ...ITEMS];

export default function MarqueeBand() {
  return (
    <div 
      className="marquee-container-node" 
      style={{ 
        borderTop: "1px solid rgba(255, 255, 255, 0.06)", 
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)", 
        padding: "16px 0", 
        background: "rgba(10, 12, 15, 0.4)",
        backdropFilter: "blur(8px)",
        position: "relative", 
        zIndex: 10,
        width: "100%",
        overflow: "hidden"
      }}
    >
      {/* Structural Scoped Animation Style Playhead Injector */}
      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-moving-rail {
          display: flex;
          width: max-content;
          animation: loopMarqueeTrack 32s linear infinite;
          will-change: transform;
        }
        .marquee-container-node:hover .marquee-moving-rail {
          animation-play-state: paused;
        }
        @keyframes loopMarqueeTrack {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
      `}} />

      {/* Premium Gradient Edge Masks Faders */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #080808 0%, transparent 12%, transparent 88%, #080808 100%)", zIndex: 3, pointerEvents: "none" }} />

      {/* Infinite Moving Rail Wrapper */}
      <div className="marquee-moving-rail" style={{ gap: "40px", alignItems: "center" }}>
        {marqueePool.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "40px", flexShrink: 0 }}>
            
            {/* Core Marquee Text Layer Tag */}
            <span 
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(245, 240, 232, 0.45)",
                whiteSpace: "nowrap"
              }}
            >
              {item}
            </span>

            {/* Custom Luxury Diamond Spacing Token Component Vector */}
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, opacity: 0.75 }}>
              <path d="M3 0L6 3L3 6L0 3L3 0Z" fill="#C8960C" />
            </svg>

          </div>
        ))}
      </div>
    </div>
  );
}