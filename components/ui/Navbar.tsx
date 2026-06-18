"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isOpen, setIsOpen] = useState(false);

  const goto = (href: string) => {
    setIsOpen(false); 
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

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
        
        .nav-utility-icon-anchor { color: rgba(245, 240, 232, 0.45); display: flex; align-items: center; justify-content: center; transition: color 0.3s ease, transform 0.3s ease; }
        .nav-utility-icon-anchor:hover { color: #C8960C; transform: translateY(-1px); }

        /* FIX: Enforced strict native display none properties to override baseline configuration streams on desktop screens */
        .mobile-menu-btn { display: none !important; background: transparent; border: none; flex-direction: column; gap: 6px; cursor: pointer; padding: 4px; z-index: 250; position: relative; outline: none; }
        .hamburger-line { width: 22px; height: 1.5px; background-color: #ffffff; }
        
        .mobile-nav-overlay { position: fixed; inset: 0; background: #080808; z-index: 230; display: flex; flex-direction: column; padding: 140px 40px 60px; border-left: 1px solid rgba(255,255,255,0.06); }
        .mobile-nav-link { font-family: 'DM Serif Display', serif; font-size: 2.8rem; color: #ffffff; text-decoration: none; margin-bottom: 24px; display: block; cursor: pointer; transition: color 0.3s; }
        .mobile-nav-link:hover { color: #C8960C; }

        @keyframes spin { 100% { transform: translate(-50%, -50%) rotate(360deg); } }

        .brand-subtext { font-family: 'DM Sans', sans-serif; font-size: 8.5px; color: #C8960C; text-transform: uppercase; font-weight: 600; line-height: 1; margin: 0; margin-top: 4px; letter-spacing: 0.365em; white-space: nowrap; }

        @media (max-width: 1024px) {
          .navbar-grid-container { grid-template-columns: 1fr auto !important; }
          .desktop-center-links, .desktop-right-actions { display: none !important; }
          /* FIX: Safely override global structural states only when viewport media reaches responsive breaking point thresholds */
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          .navbar-grid-container { padding: 0 24px !important; }
        }
      `}} />

      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "#080808", borderBottom: "1px solid rgba(255,255,255,.06)", height: "90px" }}>
        <div className="navbar-grid-container" style={{ maxWidth: "1280px", height: "100%", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "260px 1fr auto", alignItems: "center", width: "100%" }}>
          
          {/* Brand/Logo Column Component Section */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", width: "100%", justifySelf: "start", zIndex: 250 }}>
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
          <nav className="desktop-center-links" style={{ display: "flex", gap: "40px", height: "100%", alignItems: "center", justifySelf: "center" }}>
            {LINKS.map(l => (
              <a key={l.href} onClick={() => goto(l.href)} className="nav-link">{l.label}</a>
            ))}
          </nav>

          {/* Right Action Block System Container */}
          <div className="desktop-right-actions" style={{ display: "flex", alignItems: "center", justifySelf: "end", gap: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              
              <a href="https://wa.me/919885297005?text=Greetings+Celestial+Harmony+Academy%21+I+would+love+to+connect+and+enquire+about+beginning+my+music+lessons." target="_blank" rel="noopener" className="nav-utility-icon-anchor" title="WhatsApp Chat">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/celestialharmonyacademy?igsh=MXFsMjI1YWVxZmZqOQ==" target="_blank" rel="noopener" className="nav-utility-icon-anchor" title="Instagram Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              <a href="https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad" target="_blank" rel="noopener" className="nav-utility-icon-anchor" title="Find Us on Maps">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </a>

            </div>

            <MagneticBtn onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              <div className="nav-cta-beam">
                <div className="nav-cta-inner"></div>
                <span className="nav-cta-text">ADMISSION</span>
              </div>
            </MagneticBtn>
          </div>

          {/* ── RESPONSIVE MOBILE MENU HAMBURGER ── */}
          {/* FIX: Dropped the inline display layout flex configuration attribute trigger to prevent desktop leakage loops */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>

        </div>
      </header>

      {/* ── HIGH PERFORMANCE SLIDE DRAWER PANEL OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-nav-overlay"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "30px",
                right: "40px",
                background: "transparent",
                border: "none",
                color: "#ffffff",
                fontSize: "26px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "32px",
                width: "32px",
                transition: "color 0.3s ease",
                zIndex: 260
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#C8960C"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#ffffff"}
              aria-label="Close Navigation Menu"
            >
              ✕
            </button>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  onClick={() => goto(l.href)}
                  className="mobile-nav-link"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "40px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", letterSpacing: "0.22em", color: "#C8960C", textTransform: "uppercase", marginBottom: "20px" }}>Quick Contact</p>
              <a href="tel:+919885297005" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "1.4rem", color: "#ffffff", textDecoration: "none", marginBottom: "12px", fontWeight: 700 }}>+91 98852 97005</a>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>484 MIG 1, First Floor, KPHB Phase 2, Hyderabad</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}