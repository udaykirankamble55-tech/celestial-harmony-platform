"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const YEAR = new Date().getFullYear();

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

export default function Footer() {
  const isTouchDevice = useTouchDeviceGuard();

  return (
    <footer style={{ background: "#050505", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "clamp(48px, 6vw, 72px) 0 32px 0" }}>
      <div className="wrap" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 40px)" }}>
        
        {/* ── CORE FOOTER DATA LINKS COHORT GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: 64 }} className="footer-grid">
          
          {/* Brand Presentation Space */}
          <div>
            <p style={{ fontFamily: "var(--font-b)", fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "#ffffff", fontWeight: 600, margin: "0 0 6px 0" }}>Celestial Harmony</p>
            <p style={{ fontFamily: "var(--font-b)", fontSize: 9, letterSpacing: ".22em", textTransform: "uppercase", color: "#C8960C", margin: "0 0 20px 0", fontWeight: 600 }}>Academy of Music</p>
            <p className="body-sm" style={{ maxWidth: 280, marginBottom: 24, lineHeight: 1.9, color: "rgba(245,240,232,0.48)", fontSize: "13.5px" }}>
              The right way to learn music. Trinity College London Validated Course Provider. Hyderabad, Est. 2015.
            </p>
            
            {/* Outbound Social Channels Stack */}
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { href: "https://www.instagram.com/celestialharmonyacademy?igsh=MXFsMjI1YWVxZmZqOQ==", c: "#e1306c", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                { href: "https://wa.me/919885297005", c: "#25d366", icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg> },
                { href: "https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad", c: "#ea4335", icon: <svg width="13" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg> },
              ].map((s, i) => (
                <motion.a 
                  key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  whileHover={isTouchDevice ? {} : { scale: 1.06, borderColor: s.c }}
                  style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.08)", color: s.c, textDecoration: "none", background: "#0e1114", borderRadius: "2px", transition: "border-color 0.3s ease" }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Core Specialization Subsections */}
          <div>
            <p style={{ fontFamily: "var(--font-b)", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#ffffff", fontWeight: 600, marginBottom: 20 }}>Instruments</p>
            {["Guitar", "Keyboard & Piano", "Violin", "Drums", "Vocals", "Music Theory"].map(item => (
              <p key={item} style={{ lineHeight: 2.4, margin: 0, fontFamily: "var(--font-b)", fontSize: "13px", color: "rgba(245,240,232,0.55)" }}>{item}</p>
            ))}
          </div>

          {/* Quick Navigation Channels */}
          <div>
            <p style={{ fontFamily: "var(--font-b)", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#ffffff", fontWeight: 600, marginBottom: 20 }}>Quick Links</p>
            {[["About Us", "#about"], ["Programs", "#programs"], ["Gallery", "#gallery"], ["Contact", "#contact"], ["Admission", "modal"]].map(([label, href]) => (
              <a 
                key={label} href={href === "modal" ? "#" : href}
                onClick={href === "modal" ? e => { 
                  e.preventDefault(); 
                  const el = document.getElementById("admModal"); 
                  if (el) { el.style.display = "flex"; document.body.style.overflow = "hidden"; }
                } : undefined}
                style={{ display: "block", fontFamily: "var(--font-b)", fontSize: 13, color: "rgba(245,240,232,0.55)", textDecoration: "none", lineHeight: 2.5, transition: "color .3s" }}
                className="footer-nav-link-item"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Detailed Academy Core Location Parameters */}
          <div>
            <p style={{ fontFamily: "var(--font-b)", fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#ffffff", fontWeight: 600, marginBottom: 20 }}>Contact</p>
            {[
              "484 MIG 1, First Floor",
              "Beside Vayuputra Towers",
              "KPHB Phase 2, Hyderabad",
              "─",
              "9885297005",
              "7893344067",
              "85558 96145",
              "─",
              "7 Days a Week",
              "Evenings 5:00 PM – 8:30 PM",
            ].map((line, i) => line === "─"
              ? <div key={i} style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "14px 0" }} />
              : <p key={i} style={{ lineHeight: 2.1, margin: 0, fontFamily: "var(--font-b)", fontSize: "13px", color: "rgba(245,240,232,0.55)" }}>{line}</p>
            )}
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />
        
        {/* ── LOWER FOOTER ACCREDITATION ROW ── */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "16px" }} className="footer-bottom-row">
          <p style={{ fontFamily: "var(--font-b)", fontSize: 11, color: "rgba(245,240,232,0.35)", margin: 0 }}>© {YEAR} Celestial Harmony Academy of Music. All rights reserved.</p>
          
          <div style={{ display: "flex", gap: 24 }} className="footer-legal-links-cluster">
            {[
              { label: "Privacy Policy", path: "/privacy-policy" },
              { label: "Terms of Use", path: "/terms-of-use" },
              { label: "Cookie Policy", path: "/cookie-policy" }
            ].map(link => (
              <Link
                key={link.label} href={link.path}
                style={{ fontFamily: "var(--font-b)", fontSize: 11, color: "rgba(245,240,232,0.35)", textDecoration: "none", transition: "color 0.3s ease", cursor: "pointer" }}
                className="footer-legal-link-node"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <p style={{ fontFamily: "var(--font-b)", fontSize: 11, color: "rgba(245,240,232,0.35)", margin: 0, fontWeight: 500, letterSpacing: "0.02em" }}>Trinity College London · Validated Course Provider</p>
        </div>
      </div>

      {/* ── HIGHEST STRENGTH METRIC RESPONSIVE MEDIA HOOKS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (hover: hover) and (pointer: fine) {
          .footer-nav-link-item:hover { color: #C8960C !important; }
          .footer-legal-link-node:hover { color: #C8960C !important; }
        }
        @media (max-width: 991px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
        }
        @media (max-width: 767px) {
          .footer-bottom-row { flex-direction: column !important; align-items: flex-start !important; gap: 14px !important; }
          .footer-legal-links-cluster { width: 100% !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
      `}} />
    </footer>
  );
}