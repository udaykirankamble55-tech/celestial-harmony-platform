"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

const CURSOR_NOTATIONS = [
  { char: "𝄞", accidental: "" },
  { char: "♪", accidental: "" },
  { char: "♫", accidental: "♯" },
  { char: "♩", accidental: "" },
  { char: "♬", accidental: "" },
  { char: "♪", accidental: "♭" },
  { char: "♫", accidental: "" },
  { char: "♬", accidental: "" },
  { char: "♩", accidental: "" },
  { char: "♬", accidental: "" }
];

function LocalCustomCursor() {
  const leaderRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leader = leaderRef.current;
    const container = dotsContainerRef.current;
    if (!leader || !container) return;

    const totalDots = CURSOR_NOTATIONS.length;
    const dots: HTMLDivElement[] = [];
    
    for (let i = 0; i < totalDots; i++) {
      const item = CURSOR_NOTATIONS[i];
      const dot = document.createElement('div');
      dot.innerText = item.char;
      
      const calculatedFontSize = `${24 - (i * 0.45)}px`;

      Object.assign(dot.style, {
        position: 'fixed',
        top: '0', 
        left: '0',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#C8960C',
        fontSize: calculatedFontSize, 
        pointerEvents: 'none',
        zIndex: '9998',
        willChange: 'transform',
        lineHeight: '1',
        whiteSpace: 'nowrap',
        margin: '0',
        padding: '0',
        textShadow: "0 0 3px #C8960C, 0 0 8px rgba(232, 184, 75, 0.85), 0 0 1px #856408",
        animation: `shimmerGlitter 2s ease-in-out infinite`,
        animationDelay: `${i * 0.15}s`
      });

      dot.innerHTML = `
        <span style="position: relative; display: flex; align-items: center; justify-content: center; line-height: 1; white-space: nowrap;">
          ${item.char}
          ${item.accidental ? `
            <span style="
              position: absolute;
              top: -0.25em;
              right: -0.45em;
              font-size: 0.58em;
              font-family: sans-serif;
              font-weight: 700;
              color: #FFFFFF;
              text-shadow: 0 0 3px #C8960C, 0 0 6px rgba(255,255,255,0.8);
            ">${item.accidental}</span>
          ` : ''}
        </span>
      `;

      container.appendChild(dot);
      dots.push(dot);
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const leaderPos = { x: mouse.x, y: mouse.y };
    const dotPositions = Array.from({ length: totalDots }, () => ({ x: mouse.x, y: mouse.y }));
    
    let lastMouseX = mouse.x;
    let lastMouseY = mouse.y;
    let lastScrollY = window.scrollY;
    
    let smoothScrollInertia = 0;
    let globalVelocity = 0;
    let idleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('select') || target.closest('[role="button"]'))) {
        gsap.to(leader, { scale: 1.5, duration: 0.25, ease: "power2.out" });
      } else {
        gsap.to(leader, { scale: 1, duration: 0.25, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const ticker = gsap.ticker.add(() => {
      const currentScrollY = window.scrollY;
      const scrollDeltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      smoothScrollInertia += (scrollDeltaY - smoothScrollInertia) * 0.05;

      const dx = mouse.x - lastMouseX;
      const dy = mouse.y - lastMouseY;
      
      const effectiveMoveDistance = Math.sqrt(dx * dx + (dy + scrollDeltaY) * (dy + scrollDeltaY));
      globalVelocity += (effectiveMoveDistance - globalVelocity) * 0.1;
      
      lastMouseX = mouse.x; 
      lastMouseY = mouse.y;

      leaderPos.x += (mouse.x - leaderPos.x) * 0.55;
      leaderPos.y += (mouse.y - leaderPos.y) * 0.55;
      gsap.set(leader, { x: leaderPos.x, y: leaderPos.y });

      idleTime += 0.05;

      if (Math.abs(smoothScrollInertia) > 0.01) {
        dotPositions.forEach((pos, i) => {
          pos.y -= smoothScrollInertia * 0.22 * (1.0 - i * 0.03);
        });
      }

      let prevX = leaderPos.x;
      let prevY = leaderPos.y;

      const totalSystemKineticEnergy = globalVelocity + Math.abs(smoothScrollInertia);
      const glidePathBlendFactor = Math.max(0, Math.min(1, (totalSystemKineticEnergy - 0.4) / 2.5));

      dotPositions.forEach((pos, i) => {
        const fixedSpacingDistance = i === 0 ? 22 : 26; 

        let targetX = prevX;
        let targetY = prevY + fixedSpacingDistance;

        const vX = pos.x - prevX;
        const vY = pos.y - prevY;
        const currentLinkDistance = Math.sqrt(vX * vX + vY * vY) || 1;

        if (glidePathBlendFactor > 0) {
          const kineticTargetX = prevX + (vX / currentLinkDistance) * fixedSpacingDistance;
          const kineticTargetY = prevY + (vY / currentLinkDistance) * fixedSpacingDistance;

          targetX = gsap.utils.interpolate(targetX, kineticTargetX, glidePathBlendFactor);
          targetY = gsap.utils.interpolate(targetY, kineticTargetY, glidePathBlendFactor);
        }
        
        const followSpeed = 0.52 - (i * 0.016); 
        const smoothEase = Math.max(0.28, followSpeed);
        
        pos.x += (targetX - pos.x) * smoothEase;
        pos.y += (targetY - pos.y) * smoothEase;
        
        const sideSway = (glidePathBlendFactor > 0.3) ? 0 : Math.sin(idleTime * 1.8 + i * 0.4) * 1.5;
        const breathingScale = (glidePathBlendFactor > 0.3) ? 1 : 1 + Math.sin(idleTime * 2 + i) * 0.04;

        gsap.set(dots[i], { 
          x: pos.x + sideSway, 
          y: pos.y,
          xPercent: -50,
          yPercent: -50,
          scale: breathingScale
        });
        
        prevX = pos.x;
        prevY = pos.y;
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(ticker);
      container.innerHTML = '';
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body, a, button, input, textarea, select, iframe, [role="button"], .clickable { 
          cursor: none !important; 
        }
        .custom-cursor-el { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999; will-change: transform; }
        .cursor-head { 
          width: 12px; height: 12px; 
          background: radial-gradient(circle, #FFFFFF 0%, #C8960C 70%, #614906 100%); 
          border-radius: 50% !important; 
          box-shadow: 0 0 12px #C8960C, 0 0 4px rgba(200,150,12,0.8); 
          margin-left: -6px; margin-top: -6px; 
        }
        @keyframes shimmerGlitter {
          0%, 100% {
            filter: drop-shadow(0 0 2px #C8960C) drop-shadow(0 0 3px rgba(255,215,0,0.25));
            color: #C8960C;
          }
          50% {
            filter: drop-shadow(0 0 3px rgba(255,255,255,0.9)) drop-shadow(0 0 8px #C8960C) drop-shadow(0 0 12px rgba(232,184,75,0.85));
            color: #FFECA0;
          }
        }
      `}} />
      <div ref={leaderRef} className="custom-cursor-el cursor-head" />
      <div ref={dotsContainerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998 }} />
    </>
  );
}

export default function CookiePolicyPage() {
  return (
    // FIX: Reduced top layout bounds margin from 160px down to a beautiful, balanced 100px
    <main style={{ background: "#080808", color: "#ffffff", minHeight: "100vh", padding: "100px 40px 100px", position: "relative" }}>
      <LocalCustomCursor />

      <div style={{ maxWidth: "800px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
        
        <p style={{ color: "#C8960C", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, marginBottom: "12px" }}>
          Tracking &amp; Telemetry Disclosures
        </p>
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 400, marginBottom: "16px", lineHeight: 1.1 }}>
          Cookie Policy
        </h1>
        <p style={{ color: "rgba(245,240,232,0.4)", fontSize: "13px", marginBottom: "48px" }}>Last Updated: June 2026</p>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", lineHeight: "1.8", color: "rgba(245,240,232,0.65)", fontSize: "14.5px", textAlign: "justify" }}>
          
          <section>
            <h2 style={{ color: "#ffffff", fontSize: "19px", fontFamily: "'DM Serif Display', serif", fontWeight: 400, marginBottom: "14px", letterSpacing: "0.01em" }}>1. Understanding Tracking Cookies</h2>
            <p>
              Cookies are ultra-lightweight alphanumeric telemetry files positioned inside your {"browser's"} local sandbox memory profile when interacting with digital web applications. They allow the server architecture to recall your unique screen layouts, active session metrics, and structural viewport preferences across visits.
            </p>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "19px", fontFamily: "'DM Serif Display', serif", fontWeight: 400, marginBottom: "14px", letterSpacing: "0.01em" }}>2. Our Minimal Tracking Footprint</h2>
            <p>Celestial Harmony Academy of Music enforces a privacy-first tracking model. We use minimal functional tracking nodes, which execute the following strict performance rules:</p>
            <ul style={{ paddingLeft: "20px", marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <li><strong style={{ color: "#fff" }}>Functional Essentials:</strong> Internal memory cookies that store framework metrics so layout animations, video timelines, and grid parameters render efficiently.</li>
              <li><strong style={{ color: "#fff" }}>Performance Tokens:</strong> Cached data layers that remember form states so inputs in your admission modal {"aren't"} erased if the window refreshes.</li>
              <li><strong style={{ color: "#fff" }}>Anonymized Telemetry:</strong> Basic system data used to trace total site visits and page weights, helping us optimize the application performance for mobile devices.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ color: "#ffffff", fontSize: "19px", fontFamily: "'DM Serif Display', serif", fontWeight: 400, marginBottom: "14px", letterSpacing: "0.01em" }}>3. Managing Browser Preferences</h2>
            <p>Users have absolute authority over their personal browser memory storage structures. You can configure your local browser engine (e.g., Google Chrome, Apple Safari) to automatically block cookies, reject tracking files, or incinerate current local session histories at any time. Note that disabling tracking settings may limit smooth interactive transitions across some canvas or video-heavy components.</p>
          </section>

        </div>

        <div style={{ marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "32px" }}>
          <Link href="/" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C8960C", textDecoration: "none", fontWeight: 600 }}>
            {`← Return to Home`}
          </Link>
        </div>

      </div>
    </main>
  );
}