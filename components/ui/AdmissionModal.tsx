"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface F { 
  name: string; 
  dob: string; 
  parent: string; 
  phone: string; 
  email: string; 
  instrument: string; 
  grade: string; 
}

const E: F = { 
  name: "", 
  dob: "", 
  parent: "", 
  phone: "", 
  email: "", 
  instrument: "", 
  grade: "" 
};

export default function AdmissionModal() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<F>(E);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsTouch(window.innerWidth < 1024 || window.matchMedia("(hover: none)").matches);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (validationError) {
      const fallbackTimer = setTimeout(() => setValidationError(null), 5000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [validationError]);

  const handleInputChange = (k: keyof F) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = e.target.value;
    
    // ── STRICT DATE YEAR LENGTH LIMITATION FILTER ──
    if (k === "dob" && val) {
      const parts = val.split("-"); // HTML format standard: YYYY-MM-DD
      if (parts[0] && parts[0].length > 4) {
        parts[0] = parts[0].slice(0, 4);
        setForm(f => ({ ...f, [k]: parts.join("-") }));
        return;
      }
    }
    
    setForm(f => ({ ...f, [k]: val }));
  };

  const closeWorkspace = () => {
    const el = document.getElementById("admModal");
    if (el) {
      el.style.display = "none";
      document.body.style.overflow = "";
    }
    setStep(1);
    setForm(E);
    setValidationError(null);
    setShowExitConfirm(false);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!form.name.trim()) {
        setValidationError("Please enter the student's full name to initialize enrollment profile tracking.");
        return;
      }
      
      const uniformPhone = form.phone.replace(/\s+/g, "");
      const domesticIndianPhoneRegex = /^[6-9]\d{9}$/;
      if (!domesticIndianPhoneRegex.test(uniformPhone)) {
        setValidationError("Please specify a valid 10-digit Indian contact number so our director can coordinate testing schedules.");
        return;
      }

      if (form.email.trim()) {
        const structuralEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!structuralEmailRegex.test(form.email.trim())) {
          setValidationError("The email format specified appears incomplete. Please update it or leave the field blank.");
          return;
        }
      }
    }

    if (step === 2) {
      if (!form.instrument) {
        setValidationError("Please select your targeted instrument core course track selection.");
        return;
      }
      if (!form.grade) {
        setValidationError("Please define your current Trinity College London reference grade milestone target.");
        return;
      }
    }

    setValidationError(null);
    setStep(s => s + 1);
  };

  const fireOutboundWhatsAppDispatch = () => {
    const stringRefID = "ADM-" + Date.now().toString(36).toUpperCase();
    
    const compiledMonospaceSlip = 
`CELESTIAL HARMONY ACADEMY OF MUSIC
OFFICIAL DIGITAL ADMISSION REGISTRATION
---------------------------------------
Reference ID      : ${stringRefID}
Student Name      : ${form.name.trim()}
Date of Birth     : ${form.dob ? form.dob.split("-").reverse().join("/") : "Not Specified"}
Parent/Guardian   : ${form.parent.trim() ? form.parent.trim() : "Self-Reg / Adult"}
Contact Number    : +91 ${form.phone.replace(/\s+/g, "")}
Email Address     : ${form.email.trim() ? form.email.trim() : "Not Provided"}
Selected Track    : ${form.instrument}
Trinity Objective : ${form.grade}
---------------------------------------
Registration compiled via Secure Admission playhead panel loops.`;

    window.open(`https://wa.me/919885297005?text=${encodeURIComponent(compiledMonospaceSlip)}`, "_blank");
    closeWorkspace();
  };

  const handleCloseAttempt = () => {
    if (!form.name.trim() && !form.phone.trim() && !form.instrument) {
      closeWorkspace();
    } else {
      setShowExitConfirm(true);
    }
  };

  return (
    <div 
      id="admModal" 
      onClick={(e) => e.target === e.currentTarget && handleCloseAttempt()}
      style={{ 
        position: "fixed", inset: 0, zIndex: 99999, display: "none", 
        alignItems: "center", justifyContent: "center", background: "rgba(4,4,4,0.95)", 
        backdropFilter: "blur(16px)", padding: "16px" 
      }}
    >
      {/* ── METRIC RESET & LAYOUT PROTECTION CSS HOOKS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .adm-modal-field { box-sizing: border-box !important; width: 100% !important; max-width: 100% !important; height: 48px; background: #0e1114; border: 1px solid rgba(255,255,255,0.08); padding: 0 16px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #ffffff; border-radius: 2px; outline: none; transition: border-color 0.3s ease; display: block; -webkit-appearance: none; -moz-appearance: none; appearance: none; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
        .adm-modal-field:focus { border-color: #C8960C; }
        
        /* Chromatic Gold Filter Calendar Picker Overrides */
        .adm-modal-field::-webkit-calendar-picker-indicator { filter: invert(61%) sepia(82%) saturate(541%) hue-rotate(5deg) brightness(93%) contrast(95%); cursor: pointer; opacity: 0.85; transition: opacity 0.2s; }
        .adm-modal-field::-webkit-calendar-picker-indicator:hover { opacity: 1; }
        
        /* ── DROPDOWN FLUSH ALIGNMENT CONSTRAINTS: Table-fixed structures prevent viewport escape leaks ── */
        select.adm-modal-field { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23C8960C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>"); background-repeat: no-repeat; background-position: right 14px center; background-size: 16px; padding-right: 40px !important; table-layout: fixed; }
        select.adm-modal-field option { background: #0a0c0f; color: #ffffff; max-width: 100% !important; overflow: hidden; text-overflow: ellipsis; }

        .adm-primary-action-btn { position: relative; overflow: hidden; width: 100%; height: 50px; background: #C8960C; color: #0a0c0f; font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; border: 1px solid #C8960C; border-radius: 2px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.35s, color 0.35s, border-color 0.35s; padding: 0 16px; text-align: center; white-space: nowrap; }
        .adm-ghost-action-btn { width: 100%; height: 50px; background: transparent; color: rgba(255,255,255,0.6); font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; border: 1px solid rgba(255,255,255,0.15); border-radius: 2px; cursor: pointer; transition: border-color 0.3s, color 0.3s; padding: 0 16px; text-align: center; white-space: nowrap; }
        
        @media (hover: hover) and (pointer: fine) {
          .adm-primary-action-btn:hover { background: transparent; color: #C8960C; }
          .adm-ghost-action-btn:hover { border-color: #ffffff; color: #ffffff; }
        }

        @media (max-width: 480px) {
          .adm-primary-action-btn { font-size: 10.5px !important; letter-spacing: 0.12em !important; height: 46px !important; padding: 0 8px !important; }
          .adm-ghost-action-btn { font-size: 10.5px !important; letter-spacing: 0.12em !important; height: 46px !important; padding: 0 8px !important; }
          .adm-modal-panel-box { padding: 24px 20px !important; }
        }
      `}} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} 
        className="adm-modal-panel-box"
        style={{ position: "relative", width: "100%", maxWidth: "440px", background: "#0a0c0f", border: "1px solid rgba(200,150,12,0.2)", borderRadius: "4px", padding: "32px", maxHeight: "94vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <AnimatePresence mode="wait">
          {showExitConfirm ? (
            /* Exit confirmation dialog interface */
            <motion.div key="exitConfirm" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "16px 0" }}>
              <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#ffffff", fontWeight: 400, margin: "0 0 12px 0", textAlign: "center" }}>Cancel Admission Process?</h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(255,255,255,0.5)", lineHeight: "1.6", textAlign: "center", margin: "0 0 24px 0" }}>
                Your current application parameter entries will be discarded. Are you sure you want to exit and return to the homepage?
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={closeWorkspace} className="adm-primary-action-btn" style={{ background: "#8a1f1f", borderColor: "#ff4444", color: "#ffffff", flex: 1 }}>Yes, Exit Process</button>
                <button onClick={() => setShowExitConfirm(false)} className="adm-ghost-action-btn" style={{ flex: 1 }}>No, Resume</button>
              </div>
            </motion.div>
          ) : (
            /* Main Application workspace */
            <motion.div key="formContent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8960C", margin: "0 0 4px 0", fontWeight: 600 }}>Celestial Harmony</p>
                  <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "22px", color: "#ffffff", fontWeight: 400, margin: 0 }}>Digital Admission</h3>
                </div>
                <button onClick={handleCloseAttempt} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff", padding: "6px 12px", cursor: "pointer", fontSize: "12px", borderRadius: "1px", transition: "border-color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C8960C"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}>✕</button>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[1, 2, 3].map(s => (
                  <div key={s} style={{ flex: 1, height: 2, background: step >= s ? "#C8960C" : "rgba(255,255,255,0.06)", transition: "background 0.4s" }} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {validationError && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: 16 }}>
                    <div style={{ background: "rgba(234, 67, 53, 0.06)", borderLeft: "3px solid #EA4335", padding: "10px 14px" }}>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", color: "#EA4335", margin: 0, fontWeight: 500, lineHeight: "1.4" }}>{validationError}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ flex: 1, overflowY: "auto", paddingRight: "2px" }}>
                <AnimatePresence mode="wait">
                  
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <input className="adm-modal-field" placeholder="Student Full Name *" value={form.name} onChange={handleInputChange("name")} />
                      
                      <div>
                        <label style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "6px", fontWeight: 600 }}>Date of Birth (Optional)</label>
                        <input className="adm-modal-field" type="date" value={form.dob} onChange={handleInputChange("dob")} />
                      </div>

                      <input className="adm-modal-field" placeholder="Parent / Guardian Name (Adults leave blank)" value={form.parent} onChange={handleInputChange("parent")} />
                      <input className="adm-modal-field" type="tel" placeholder="Contact Phone Number *" value={form.phone} onChange={handleInputChange("phone")} />
                      <input className="adm-modal-field" type="email" placeholder="Email Address (Optional)" value={form.email} onChange={handleInputChange("email")} />
                      
                      <button onClick={handleNext} className="adm-primary-action-btn" style={{ marginTop: 8 }}>Continue Profile Track →</button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      {/* ── CONSTRAINED STRINGS: Form placeholders set compact to prevent menu bleeding bugs ── */}
                      <select className="adm-modal-field" value={form.instrument} onChange={handleInputChange("instrument")}>
                        <option value="">Select Instrument *</option>
                        {["Guitar", "Piano", "Violin", "Vocals", "Drums"].map(o => <option key={o}>{o}</option>)}
                      </select>
                      
                      <select className="adm-modal-field" value={form.grade} onChange={handleInputChange("grade")}>
                        <option value="">Select Target Grade *</option>
                        {["Initial / Absolute Beginner", "Grade 1 Certification", "Grade 2 Certification", "Grade 3 Certification", "Grade 4 Certification", "Grade 5 Certification", "Grade 6 Technical Track", "Grade 7 Advanced Track", "Grade 8 Distinction Track"].map(g => <option key={g}>{g}</option>)}
                      </select>
                      
                      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                        <button onClick={() => setStep(1)} className="adm-ghost-action-btn" style={{ flex: 1 }}>Back</button>
                        <button onClick={handleNext} className="adm-primary-action-btn" style={{ flex: 1.8 }}>Generate Slip Sheet →</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, scale: 0.99 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ background: "#0e1114", border: "1px solid rgba(255,255,255,0.06)", padding: "20px", borderRadius: "2px" }}>
                        <h4 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "16px", color: "#ffffff", fontWeight: 400, margin: "0 0 12px 0", letterSpacing: "0.02em" }}>Admission Summary Slip</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(245,240,232,0.6)" }}>
                          <p style={{ margin: 0 }}><strong style={{ color: "#C8960C", fontWeight: 600 }}>Student:</strong> {form.name}</p>
                          <p style={{ margin: 0 }}><strong style={{ color: "#C8960C", fontWeight: 600 }}>Phone:</strong> +91 {form.phone}</p>
                          <p style={{ margin: 0 }}><strong style={{ color: "#C8960C", fontWeight: 600 }}>Course Track:</strong> {form.instrument}</p>
                          <p style={{ margin: 0 }}><strong style={{ color: "#C8960C", fontWeight: 600 }}>Objective:</strong> {form.grade}</p>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 12 }}>
                        <button onClick={() => setStep(2)} className="adm-ghost-action-btn" style={{ flex: 1 }}>Back</button>
                        <button onClick={fireOutboundWhatsAppDispatch} className="adm-primary-action-btn" style={{ flex: 2.2 }}>Notify via WhatsApp</button>
                      </div>
                    </motion.div>
                  )}
                  
                </AnimatePresence>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}