"use client";
import { useEffect, useState } from "react";

export default function HeroVideo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ position: "absolute", inset: 0, background: "#080808" }} />;
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1, background: "#000000" }}>
      
      {/* Light Ambient Overlay Mask — clean contrast without choking the video lighting */}
      <div 
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          pointerEvents: "none"
        }}
      />
      
      {/* Stable Hardware-Accelerated Continuous Video Loop */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.65, 
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "transform"
        }}
      >
        <source src="/assets/hero-ambient-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}