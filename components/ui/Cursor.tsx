"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Structural data matrix pairing accidentals natively to their parent notation heads (Exactly 10 notes)
const CURSOR_NOTATIONS = [
  { char: "𝄞", accidental: "" },
  { char: "♪", accidental: "" },
  { char: "♫", accidental: "♯" }, // Sharp nested cleanly to the top-right
  { char: "♩", accidental: "" },
  { char: "♬", accidental: "" },
  { char: "♪", accidental: "♭" }, // Flat nested cleanly to the top-right
  { char: "♫", accidental: "" },
  { char: "♬", accidental: "" },
  { char: "♩", accidental: "" },
  { char: "♬", accidental: "" }
];

export default function CustomCursor() {
  const leaderRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leader = leaderRef.current;
    const container = dotsContainerRef.current;
    if (!leader || !container) return;

    const totalDots = CURSOR_NOTATIONS.length;
    const dots: HTMLDivElement[] = [];
    
    // Construct insulated notation nodes using uniform flex boxing
    for (let i = 0; i < totalDots; i++) {
      const item = CURSOR_NOTATIONS[i];
      const dot = document.createElement('div');
      
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
        // FIX: Advanced layer priority block to keep trail notes above full-screen lightboxes
        zIndex: '9999998',
        willChange: 'transform',
        lineHeight: '1',
        whiteSpace: 'nowrap',
        margin: '0',
        padding: '0',
        // Maintained the beautifully balanced 8% toned-down glittering aura text profiles
        textShadow: "0 0 3px #C8960C, 0 0 8px rgba(232, 184, 75, 0.85), 0 0 1px #856408",
        animation: `shimmerGlitter 2s ease-in-out infinite`,
        animationDelay: `${i * 0.15}s`
      });

      // Internal layout template guaranteeing absolute accidentals do not alter font tracking paths
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

    // Optimized event delegation listener dynamically updates core scale when passing over forms
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

      // FIX: Accelerated tracking response step from 0.55 to 0.75 to hit zero pointer lag
      leaderPos.x += (mouse.x - leaderPos.x) * 0.75;
      leaderPos.y += (mouse.y - leaderPos.y) * 0.75;
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
        
        // FIX: Accelerated ease weights from 0.52/0.28 to 0.68/0.38 for pure high-altitude precision
        const followSpeed = 0.68 - (i * 0.016); 
        const smoothEase = Math.max(0.38, followSpeed);
        
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
        /* Absolute global suppression of all default browser user-agent cursor profiles across forms */
        html, body, a, button, input, textarea, select, iframe, [role="button"], .clickable { 
          cursor: none !important; 
        }
        
        /* Core Circle Leader Pointer - FIX: Stepped up stacking index parameter straight to 9999999 */
        .custom-cursor-el { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999999; will-change: transform; }
        
        .cursor-head { 
          width: 12px; height: 12px; 
          background: radial-gradient(circle, #FFFFFF 0%, #C8960C 70%, #614906 100%); 
          border-radius: 50% !important; 
          box-shadow: 0 0 12px #C8960C, 0 0 4px rgba(200,150,12,0.8); 
          margin-left: -6px; margin-top: -6px; 
        }

        /* Calibrated peak radiant loops protected down by 8% */
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
      {/* FIX: Stepped up tracking sub-container wrapper cleanly to 9999998 */}
      <div ref={dotsContainerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999998 }} />
    </>
  );
}