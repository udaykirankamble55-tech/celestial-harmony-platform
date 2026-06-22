"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const CURSOR_NOTATIONS = [
  { char: "𝄞", accidental: "" },
  { char: "♪", accidental: "" },
  { char: "♫", accidental: "♯" }, 
  { char: "♩", accidental: "" },
  { char: "♬", accidental: "" },
  { char: "♪", accidental: "♭" }  
];

export default function CustomCursor() {
  const leaderRef = useRef<HTMLDivElement>(null);
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      const mobileOrTouch = window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches;
      setIsMobile(mobileOrTouch);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile === true || isMobile === null) return;

    const leader = leaderRef.current;
    const container = dotsContainerRef.current;
    if (!leader || !container) return;

    const totalDots = CURSOR_NOTATIONS.length;
    const dots: HTMLDivElement[] = [];
    
    // Tuning parameters for spacing and motion delegation
    const HISTORY_GAP = 5;      // Distance between trailing notes
    const START_OFFSET = 4;     // FIX: Prevents treble clef from overlapping the head during action
    const MAX_HISTORY = (totalDots * HISTORY_GAP) + START_OFFSET + 5;
    
    for (let i = 0; i < totalDots; i++) {
      const item = CURSOR_NOTATIONS[i];
      const dot = document.createElement('div');
      const calculatedFontSize = `${22 - (i * 1.2)}px`;

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
        zIndex: '9999998',
        willChange: 'transform',
        lineHeight: '1',
        whiteSpace: 'nowrap',
        margin: '0',
        padding: '0',
        textShadow: "0 0 4px #C8960C, 0 0 10px rgba(232, 184, 75, 0.85), 0 0 1px #856408",
        transform: 'translate3d(0,0,0)'
      });

      dot.innerHTML = `
        <span style="position: relative; display: flex; align-items: center; justify-content: center; line-height: 1; white-space: nowrap;">
          ${item.char}
          ${item.accidental ? `
            <span style="
              position: absolute;
              top: -0.22em;
              right: -0.42em;
              font-size: 0.58em;
              font-family: sans-serif;
              font-weight: 700;
              color: #FFECA0;
              text-shadow: 0 0 3px #C8960C, 0 0 8px rgba(232, 184, 75, 0.9);
            ">${item.accidental}</span>
          ` : ''}
        </span>
      `;
      container.appendChild(dot);
      dots.push(dot);
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const leaderPos = { x: mouse.x, y: mouse.y };
    
    let lastMouseX = mouse.x;
    let lastMouseY = mouse.y;
    let idleProgress = 0; 
    let idleTime = 0;

    const coordsHistory = Array.from({ length: MAX_HISTORY }, () => ({ x: mouse.x, y: mouse.y }));

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.closest('a') || target.closest('button') || target.closest('input') || target.closest('textarea') || target.closest('select') || target.closest('[role="button"]'))) {
        gsap.to(leader, { scale: 1.4, duration: 0.15, ease: "power1.out" });
      } else {
        gsap.to(leader, { scale: 1, duration: 0.15, ease: "power1.out" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const ticker = gsap.ticker.add(() => {
      const movementX = Math.abs(mouse.x - lastMouseX);
      const movementY = Math.abs(mouse.y - lastMouseY);
      
      lastMouseX = mouse.x;
      lastMouseY = mouse.y;

      if (movementX < 0.2 && movementY < 0.2) {
        idleProgress += (1 - idleProgress) * 0.05; 
      } else {
        idleProgress += (0 - idleProgress) * 0.2;  
      }

      idleTime += 0.03;

      leaderPos.x += (mouse.x - leaderPos.x) * 0.92;
      leaderPos.y += (mouse.y - leaderPos.y) * 0.92;
      
      leader.style.transform = `translate3d(${leaderPos.x}px, ${leaderPos.y}px, 0) translate(-50%, -50%)`;

      coordsHistory.unshift({ x: leaderPos.x, y: leaderPos.y });
      if (coordsHistory.length > MAX_HISTORY) {
        coordsHistory.pop();
      }

      for (let i = 0; i < totalDots; i++) {
        // FIX: Start tracking from START_OFFSET instead of index 0 so it stays back during action
        const historyIndex = START_OFFSET + (i * HISTORY_GAP);
        const point = coordsHistory[historyIndex] || leaderPos;
        
        const headGap = 18 * idleProgress;
        const fanOutY = headGap + (i * 22 * idleProgress); 
        
        const floatingSwayX = Math.sin(idleTime + i * 0.5) * 4 * idleProgress;
        
        const finalX = point.x + floatingSwayX;
        const finalY = point.y + fanOutY;

        dots[i].style.transform = `translate3d(${finalX}px, ${finalY}px, 0) translate(-50%, -50%)`;
      }
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      gsap.ticker.remove(ticker);
      container.innerHTML = '';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body, a, button, input, textarea, select, iframe, [role="button"], .clickable { 
          cursor: none !important; 
        }
        .custom-cursor-el { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999999; will-change: transform; }
        .cursor-head { 
          width: 10px; height: 10px; 
          background: #FFFFFF;
          border: 1px solid #C8960C;
          border-radius: 50% !important; 
          box-shadow: 0 0 8px #C8960C; 
          transform: translate3d(0,0,0);
        }
      `}} />
      <div ref={leaderRef} className="custom-cursor-el cursor-head" />
      <div ref={dotsContainerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999998 }} />
    </>
  );
}