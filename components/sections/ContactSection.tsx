"use client";
import { useRef, useEffect, useState } from "react";
import { motion, Variants, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Form { name: string; phone: string; email: string; instrument: string; age: string; message: string; }
const EMPTY: Form = { name: "", phone: "", email: "", instrument: "", age: "", message: "" };

const up: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.23, 1, 0.32, 1] } },
};
const stag: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

function MLine({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties; }) {
  return (
    <div style={{ overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.04em" }}>
      <motion.div variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: "0%", opacity: 1, transition: { duration: 0.88, ease: [0.23, 1, 0.32, 1], delay } } }} style={style}>
        {children}
      </motion.div>
    </div>
  );
}

/* ── SECURELY SCOPED CARD COMPONENT ── */
function ContactInteractiveCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties; }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`contact-premium-card ${isHovered ? "is-hovering" : ""}`} 
      style={{ position: "relative", height: "100%", ...style }}
    >
      <div className="contact-beam-spin"></div>
      <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", height: "100%", borderRadius: "3px" }}>
        {children}
      </div>
    </div>
  );
}

/* ── PURE MAGNETIC SUBMIT TRIGGER ── */
function SecureSubmitButton({ children, onClick, sent }: { children: React.ReactNode; onClick: () => void; sent: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const transX = useMotionValue(0);
  const transY = useMotionValue(0);

  const springX = useSpring(transX, { stiffness: 150, damping: 15 });
  const springY = useSpring(transY, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const pullX = Math.max(-2, Math.min(2, (e.clientX - centerX) * 0.04));
    const pullY = Math.max(-2, Math.min(2, (e.clientY - centerY) * 0.04));

    transX.set(pullX);
    transY.set(pullY);
  };

  const handleMouseLeave = () => {
    transX.set(0);
    transY.set(0);
  };

  return (
    <motion.button
      type="button"
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`contact-submit-engine ${sent ? "form-dispatched" : ""}`}
      style={{ x: springX, y: springY }}
    >
      <div className="contact-btn-slider"></div>
      <span className="contact-btn-text-node">{children}</span>
    </motion.button>
  );
}

/* ── INTERACTIVE MAPPED AUTO-LAYOUT CARD STRIP COMPONENT ── */
function ContactStripCard({ card, i, activeIndex, setActiveIndex }: { card: any; i: number; activeIndex: number | null; setActiveIndex: (index: number | null) => void; }) {
  const isHovered = activeIndex === i;

  return (
    <motion.a
      href={card.href} target="_blank" rel="noopener"
      initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setActiveIndex(i)}
      onMouseLeave={() => setActiveIndex(null)}
      className={`contact-premium-card contact-strip-item-node ${isHovered ? "is-hovering" : ""}`}
      style={{
        padding: "2px", textDecoration: "none", display: "flex", flexDirection: "column",
        flex: isHovered ? 1.35 : 1,
        zIndex: isHovered ? 10 : 1,
        transition: "flex 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease"
      }}
    >
      <div className="contact-beam-spin"></div>
      <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", padding: "18px 24px", borderRadius: "3px", display: "flex", gap: "20px", alignItems: "center", height: "100%" }}>
        <div style={{ width: 42, height: 40, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${card.highlight}24`, color: card.highlight, background: "rgba(8,8,8,0.3)", flexShrink: 0, borderRadius: "1px", transition: "transform 0.4s ease" }} className="strip-icon-box">
          <svg width="18" height="18" viewBox="0 0 24 24" fill={card.strokeOnly ? "none" : "currentColor"} stroke={card.strokeOnly ? "currentColor" : "none"} strokeWidth={card.strokeOnly ? "1.5" : "none"}>
            {card.svg}
          </svg>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ffffff", fontWeight: 700, margin: "0 0 2px 0" }}>
            {card.label}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(245,240,232,0.35)", margin: "0 0 4px 0", fontWeight: 500 }}>
            {card.sub}
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 700, color: card.highlight, margin: 0, letterSpacing: "0.01em" }}>
            {card.value}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

/* ── MAIN EXPORT MODULE ── */
export default function ContactSection() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);
  
  // FIX: Added explicit validation state hook to enforce compliance requirements seamlessly
  const [consentChecked, setConsentChecked] = useState(false);
  
  const [isFormHovered, setIsFormHovered] = useState(false);
  const [activeStripIndex, setActiveStripIndex] = useState<number | null>(null);
  const [isPrivacyHovered, setIsPrivacyHovered] = useState(false);
  
  const gridContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (key: keyof Form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [key]: e.target.value }));

  const executeFormSubmit = () => {
    if (!form.name || !form.phone || !form.instrument) {
      alert("Please enter your Name, Phone Number, and Instrument of interest.");
      return;
    }
    
    // FIX: Client side error-guard catching missing checkbox validations instantly
    if (!consentChecked) {
      alert("Please review and accept the Privacy Policy and Terms of Use options to initialize your inquiry.");
      return;
    }

    const enquiryRef = "INQ-" + Date.now().toString(36).toUpperCase();
    const politeWhatsAppText = `Greetings Celestial Harmony Academy! ✨\n\nI hope this message finds you well. I am highly interested in joining your esteemed academy and beginning my musical training under your guidance. Here are my baseline details:\n\n🎫 *Enquiry Reference:* ${enquiryRef}\n👤 *Full Name:* ${form.name}\n📞 *Contact Number:* ${form.phone}\n✉️ *Email Address:* ${form.email || "Not Provided"}\n🎸 *Instrument of Interest:* ${form.instrument}\n🎂 *Student Age Group:* ${form.age || "Not Provided"}\n\n💬 *My Personal Note:* ${form.message || "I would love to learn more about your curriculum paths and available schedule slots!"}\n\nThank you very much for your time, patience, and assistance. Looking forward to speaking with the director soon! 👋`;
    
    window.open(`https://wa.me/919885297005?text=${encodeURIComponent(politeWhatsAppText)}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const handleGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gridContainerRef.current.style.setProperty("--mouse-x", `${x}px`);
    gridContainerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  const CONTACT_CARDS_DATA = [
    { label: "WhatsApp Direct", sub: "Fastest tracking delivery window", value: "Open Immediate Chat ↗", href: "https://wa.me/919885297005?text=Greetings+Celestial+Harmony+Academy%21+I+would+love+to+connect+and+enquire+about+beginning+my+music+lessons.", highlight: "#25D366", svg: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/> },
    { label: "Call Academy", sub: "Open 7 Days · Evenings 5:00 PM – 8:30 PM", value: "+91 98852 97005", href: "tel:+919885297005", highlight: "#C8960C", svg: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.85a16 16 0 006.29 6.29l1.21-1.22a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/> },
    { label: "Find Us on Maps", sub: "Phase 2, Near Vayuputra Towers, KPHB", value: "Open Google Maps Layout ↗", href: "https://maps.google.com/?q=Celestial+Harmony+Academy+of+Music+KPHB+Hyderabad", highlight: "#EA4335", strokeOnly: true, svg: <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/> },
    { label: "Official Email", sub: "Academic & Corporate Correspondence", value: "johnson.medi@gmail.com", href: "mailto:johnson.medi@gmail.com", highlight: "#4285F4", strokeOnly: true, svg: <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/> },
    { label: "Instagram Feed", sub: "Recitals, updates & student milestones", value: "@celestialharmonyacademy", href: "https://www.instagram.com/celestialharmonyacademy?igsh=MXFsMjI1YWVxZmZqOQ==", highlight: "#E1306C", strokeOnly: true, svg: <g strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></g> }
  ];

  return (
    <section id="contact" style={{ position: "relative", background: "#080808", padding: "100px 0", overflow: "hidden" }}>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .contact-premium-card { border-radius: 4px; position: relative; padding: 2px; background: rgba(255,255,255,0.14); transition: border-color 0.4s ease, box-shadow 0.4s ease; }
        .contact-beam-spin { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; z-index: -1; }
        .contact-beam-spin::before { content: ""; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: transparent; transition: opacity 0.4s ease; }
        .contact-premium-card.is-hovering .contact-beam-spin::before { background: conic-gradient(from 0deg, transparent 70%, #C8960C 85%, #FFFFFF 95%, #C8960C 100%); animation: spinGlow 3s linear infinite; }
        
        .contact-premium-card.is-hovering { border-color: transparent; background: transparent; box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); }
        .contact-premium-card.is-hovering .strip-icon-box { transform: scale(1.04); border-color: rgba(255,255,255,0.15); }

        .secure-form-input { width: 100%; background: #0e1114; border: 1px solid rgba(255,255,255,0.07); padding: 14px 18px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #ffffff; border-radius: 2px; transition: border-color 0.3s ease, box-shadow 0.3s ease; outline: none; }
        .secure-form-input:focus { border-color: #C8960C; box-shadow: 0 0 14px rgba(200, 150, 12, 0.1); }
        .secure-form-label { display: block; font-family: 'DM Sans', sans-serif; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(245,240,232,0.4); font-weight: 700; margin-bottom: 8px; }

        .contact-submit-engine { position: relative; width: 100%; overflow: hidden; background: transparent; border: 1px solid rgba(200, 150, 12, 0.4); color: white; padding: 22px 48px; font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 0.24em; text-transform: uppercase; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; line-height: 1; cursor: pointer; transition: border-color 0.4s ease, box-shadow 0.4s ease, transform 0.3s ease; border-radius: 2px; }
        .contact-submit-engine::before { content: ''; position: absolute; top: 50%; left: 50%; width: 300%; height: 300%; background: conic-gradient(from 0deg, transparent 60%, #C8960C 75%, #FFFFFF 85%, #C8960C 95%, transparent 100%); transform: translate(-50%, -50%) rotate(0deg); animation: spinGlow 2.5s linear infinite; opacity: 0; transition: opacity 0.4s ease; z-index: 0; pointer-events: none; }
        .contact-btn-slider { position: absolute; inset: 1px; background-image: linear-gradient(to right, #C8960C 50%, #0d0d0d 50%); background-size: 200% 100%; background-position: 100% 0; transition: background-position 0.45s cubic-bezier(0.25, 1, 0.5, 1); z-index: 1; border-radius: 1px; }
        .contact-btn-text-node { position: relative; z-index: 2; transition: color 0.4s ease; }
        
        .contact-submit-engine:hover::before { opacity: 1; }
        .contact-submit-engine:hover { box-shadow: 0 12px 24px rgba(200, 150, 12, 0.08); border-color: transparent !important; transform: scale(1.005); }
        .contact-submit-engine:hover .contact-btn-slider { background-position: 0 0; }
        .contact-submit-engine:hover .contact-btn-text-node { color: #080808 !important; }

        .art-wall-collage { display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: minmax(160px, auto); gap: 20px; position: relative; width: 100%; }
        .art-wall-collage::before { content: ""; position: absolute; inset: 0; background: #111111; z-index: 0; opacity: 0; transition: opacity 0.4s ease; }
        .art-wall-collage.fluid-active::before { background-image: radial-gradient(circle 350px at var(--mouse-x, 50%) var(--mouse-y, 50%), #C8960C 0%, rgba(200,150,12,0.4) 40%, transparent 70%); opacity: 0.38; }

        @keyframes spinGlow { 100% { transform: translate(-50%, -50%) rotate(360deg); } }
        @media (max-width: 992px) { .contact-split-row { grid-template-columns: 1fr !important; } .contact-strip-container { height: auto !important; } }
      `}} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 5 }}>

        {/* ── HEADER ROW ── */}
        <motion.div variants={stag} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} style={{ textAlign: "center", marginBottom: 52 }}>
          <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#C8960C", marginBottom: 12, fontWeight: 500 }}>
            004 — Get In Touch
          </motion.p>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={stag} style={{ fontFamily: "'DM Serif Display', serif", lineHeight: 1.05 }}>
            <MLine delay={0} style={{ fontSize: "clamp(2.4rem,5vw,4.5rem)", fontWeight: 400, color: "#ffffff" }}>
              Begin Your <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#E8B84B,#C8960C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Journey</span>
            </MLine>
          </motion.div>
          <motion.p variants={up} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(245,240,232,0.55)", maxWidth: "500px", margin: "0 auto", lineHeight: "1.7" }}>
            Fill in your details to open an immediate WhatsApp conversation — fast, fully personal, and entirely secure.
          </motion.p>
        </motion.div>

        {/* ── BALANCED WORKSPACE DUAL-GRID CANVAS ── */}
        <div 
          ref={gridContainerRef}
          onPointerMove={handleGridPointerMove}
          style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "32px", alignItems: "stretch", marginBottom: "24px" }} 
          className={`contact-split-row ${activeStripIndex !== null ? "fluid-active" : ""}`}
        >
          {/* LEFT SIDE: ENQUIRY CARD COMPONENT */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <ContactInteractiveCard>
              <div 
                onMouseEnter={() => {
                  setIsFormHovered(true);
                  setActiveStripIndex(99); 
                }}
                onMouseLeave={() => {
                  setIsFormHovered(false);
                  setActiveStripIndex(null);
                }}
                style={{ padding: "40px 36px" }}
              >
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "24px", color: "#ffffff", fontStyle: "italic", fontWeight: 400, margin: "0 0 28px 0", letterSpacing: "0.01em", textAlign: "center" }}>
                  Send an Inquiry
                </h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label className="secure-form-label">Full Name *</label>
                    <input className="secure-form-input" placeholder="Your full name" value={form.name} onChange={handleInputChange("name")} />
                  </div>
                  <div>
                    <label className="secure-form-label">Phone Number *</label>
                    <input className="secure-form-input" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleInputChange("phone")} />
                  </div>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label className="secure-form-label">Email Address</label>
                  <input className="secure-form-input" type="email" placeholder="name@example.com" value={form.email} onChange={handleInputChange("email")} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label className="secure-form-label">Instrument of Interest *</label>
                    <select className="secure-form-input" style={{ appearance: "none", cursor: "pointer" }} value={form.instrument} onChange={handleInputChange("instrument")}>
                      <option value="">Select targeted instrument</option>
                      {["Guitar", "Keyboard / Piano", "Violin", "Vocals", "Drums & Percussion", "Music Theory", "Summer Camp Highlight", "Undecided"].map(opt => (
                        <option key={opt} value={opt} style={{ background: "#0e1114", color: "#fff" }}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="secure-form-label">Student Age Group</label>
                    <select className="secure-form-input" style={{ appearance: "none", cursor: "pointer" }} value={form.age} onChange={handleInputChange("age")}>
                      <option value="">Select age group</option>
                      {["Under 6 (Pre-School)", "6–10 Years", "11–15 Years", "16–18 Years", "Adult (18–30)", "Adult (30+)"].map(opt => (
                        <option key={opt} value={opt} style={{ background: "#0e1114", color: "#fff" }}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label className="secure-form-label">Tell Us More (optional)</label>
                  <textarea className="secure-form-input" rows={3} placeholder="Prior experience, preferred timing, or specific training questions..." value={form.message} onChange={handleInputChange("message")} style={{ resize: "none" }} />
                </div>

                {/* FIX: Integrated layout-safe DPDPA compliance option segment without touching external containers */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "28px" }}>
                  <input 
                    type="checkbox" 
                    id="legalPrivacyConsentNode" 
                    checked={consentChecked} 
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    style={{ 
                      accentColor: "#C8960C", 
                      marginTop: "3px", 
                      width: "14px", 
                      height: "14px", 
                      cursor: "pointer",
                      flexShrink: 0
                    }} 
                  />
                  <label htmlFor="legalPrivacyConsentNode" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11.5px", color: "rgba(245,240,232,0.45)", lineHeight: "1.5", cursor: "pointer", userSelect: "none" }}>
                    I authorize the processing of my basic profile parameters to initialize communication lines according to the{" "}
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: "#C8960C", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</a> and {" "}
                    <a href="/terms-of-use" target="_blank" rel="noopener noreferrer" style={{ color: "#C8960C", textDecoration: "none", fontWeight: 600 }}>Terms of Use</a>.
                  </label>
                </div>

                <SecureSubmitButton onClick={executeFormSubmit} sent={sent}>
                  {sent ? "Enquiry Dispatched! ✓" : "Send Securely via WhatsApp →"}
                </SecureSubmitButton>
              </div>
            </ContactInteractiveCard>
          </div>

          {/* RIGHT SIDE: DYNAMIC STRIPS STACK */}
          <div className="contact-strip-container" style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%", width: "100%" }}>
            {CONTACT_CARDS_DATA.map((card, i) => (
              <ContactStripCard key={i} card={card} i={i} activeIndex={activeStripIndex} setActiveIndex={setActiveStripIndex} />
            ))}
          </div>
        </div>

        {/* ── FULL WIDTH PRIVACY ASSURANCE NODE ── */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          onMouseEnter={() => setIsPrivacyHovered(true)}
          onMouseLeave={() => setIsPrivacyHovered(false)}
          className={`contact-premium-card ${isPrivacyHovered ? "is-hovering" : ""}`}
          style={{ width: "100%", padding: "2px", background: "rgba(255,255,255,0.14)", transition: "border-color 0.4s ease, box-shadow 0.4s ease" }}
        >
          <div className="contact-beam-spin"></div>
          <div style={{ position: "relative", zIndex: 2, background: "#0a0c0f", padding: "18px 24px", borderRadius: "3px", display: "flex", gap: "16px", alignItems: "center" }}>
            <svg width="18" height="20" viewBox="0 0 18 20" fill="none" stroke="#C8960C" strokeWidth="1.5" style={{ flexShrink: 0 }}>
              <rect x="2" y="9" width="14" height="10" rx="2" ry="2" />
              <path d="M4.5 9V5.5a4.5 4.5 0 019 0V9" />
            </svg>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.45)", lineHeight: "1.5", margin: 0 }}>
              <strong style={{ color: "#ffffff", fontWeight: 600 }}>Privacy Shield Secure Node:</strong> Fields route over secure parameter channels straight to the director's device playhead. Absolutely zero information caching or student log replication occurs on external web data servers.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}