"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

function MagneticBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px,${y}px) rotate(${x * 0.05}deg)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0) rotate(0deg)";
  };
  return (
    <button ref={ref} onClick={onClick} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform .4s cubic-bezier(.23,1,.32,1)", background: "none", border: "none", padding: 0, cursor: "pointer", display: "inline-block" }}>
      {children}
    </button>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");

  const goto = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-link { position: relative; color: rgba(245,240,232,0.8); text-decoration: none; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: color 0.3s ease; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; display: flex; align-items: center; height: 100%; padding: 0 4px; cursor: pointer; }
        
        .nav-link::after { content: ''; position: absolute; left: 0; bottom: 28px; width: 0%; height: 2px; background-color: var(--gold, #C8960C); transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1); box-shadow: 0 0 8px var(--gold, #C8960C); }
        .nav-link:hover, .nav-link.active { color: #fff; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .nav-cta-beam { position: relative; overflow: hidden; background: #C8960C; color: white; padding: 12px 28px; border-radius: 2px; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; display: flex; align-items: center; justify-content: center; line-height: 1; box-shadow: 0 0 15px rgba(200, 150, 12, 0.25); }
        .nav-cta-beam::before { content: ''; position: absolute; top: 50%; left: 50%; width: 250%; height: 250%; background: conic-gradient(from 0deg, transparent 60%, var(--gold, #C8960C) 75%, #FFFFFF 85%, var(--gold, #C8960C) 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: spin 2.5s linear infinite; opacity: 1; z-index: 0; }
        .nav-cta-beam:hover { box-shadow: 0 0 25px rgba(200, 150, 12, 0.5), 0 0 8px #ffffff; transition: box-shadow 0.4s ease; }
        
        .nav-cta-inner { position: absolute; inset: 1.5px; background: #080808; z-index: 1; border-radius: 1px; }
        .nav-cta-text { position: relative; z-index: 2; font-weight: 600; color: #ffffff; letter-spacing: 0.12em; }
        
        /* Premium utility icon interaction variables definitions */
        .nav-utility-icon-anchor { color: rgba(245, 240, 232, 0.45); display: flex; align-items: center; justify-content: center; transition: color 0.3s ease, transform 0.3s ease; }
        .nav-utility-icon-anchor:hover { color: #C8960C; transform: translateY(-1px); }

        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

        .brand-subtext {
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px; 
          color: #C8960C;
          text-transform: uppercase;
          font-weight: 600;
          line-height: 1;
          margin: 0;
          margin-top: 4px;
          letter-spacing: 0.365em; 
          white-space: nowrap;
        }
      `}} />

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "#080808", borderBottom: "1px solid rgba(255,255,255,.06)", height: "90px" }}>
        {/* Adjusted grid footprint to naturally host expanded actions tracking row cleanly */}
        <div style={{ maxWidth: "1280px", height: "100%", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "260px 1fr auto", alignItems: "center", width: "100%" }}>
          
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", width: "100%", justifySelf: "start" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(200,150,12,.4)", overflow: "hidden", flexShrink: 0 }}>
              <Image src="/academylogo.jpeg" alt="Logo" width={44} height={44} style={{ objectFit: "cover" }} />
            </div>
            
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: "#fff", margin: 0, lineHeight: 1.1, whiteSpace: "nowrap" }}>
                Celestial Harmony
              </p>
              <p className="brand-subtext">
                Academy of Music
              </p>
            </div>
          </a>

          {/* Central Menu Links Row */}
          <nav style={{ display: "flex", gap: "40px", height: "100%", alignItems: "center", justifySelf: "center" }}>
            {LINKS.map(l => (
              <a key={l.href} onClick={() => goto(l.href)} className="nav-link">{l.label}</a>
            ))}
          </nav>

          {/* Right Action Block Component System Container */}
          <div style={{ display: "flex", alignItems: "center", justifySelf: "end", gap: "28px" }}>
            
            {/* Integrated Symmetrical Clickable Utilities Hub */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              
              {/* WhatsApp Trigger */}
              <a href="https://wa.me/919885297005?text=Greetings+Celestial+Harmony+Academy%21+I+would+love+to+connect+and+enquire+about+beginning+my+music+lessons." target="_blank" rel="noopener" className="nav-utility-icon-anchor" title="WhatsApp Chat">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              {/* Instagram Feed Trigger */}
              <a href="https://www.instagram.com/celestialharmonyacademy?igsh=MXFsMjI1YWVxZmZqOQ==" target="_blank" rel="noopener" className="nav-utility-icon-anchor" title="Instagram Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Campus GeoLocation Maps Trigger */}
              <a href="https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad" target="_blank" rel="noopener" className="nav-utility-icon-anchor" title="Find Us on Maps">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </a>

            </div>

            {/* Right Action Button */}
            <MagneticBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <div className="nav-cta-beam">
                <div className="nav-cta-inner"></div>
                <span className="nav-cta-text">ADMISSION</span>
              </div>
            </MagneticBtn>

          </div>
        </div>
      </header>
    </>
  );
}