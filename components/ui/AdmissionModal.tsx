"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface F { name:string;dob:string;gender:string;parent:string;phone:string;email:string;instrument:string;grade:string;exp:string;schedule:string;area:string; }
const E: F = {name:"",dob:"",gender:"",parent:"",phone:"",email:"",instrument:"",grade:"",exp:"Complete Beginner",schedule:"Flexible",area:""};

function Row({l,v}:{l:string;v:string}) {
  return <div className="slip-row"><span className="slip-lbl">{l}</span><span className="slip-val">{v||"—"}</span></div>;
}

export default function AdmissionModal() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<F>(E);
  const token = `ADM-${Date.now().toString(36).toUpperCase()}`;
  const set = (k:keyof F)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setForm(f=>({...f,[k]:e.target.value}));
  const close = ()=>{ document.getElementById("admModal")?.classList.remove("open"); document.body.style.overflow=""; };
  const today = new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});

  const notifyWA = () => {
    const text=`*Celestial Harmony Academy — New Admission*\n\n🎫 *${token}*\n👤 *Student:* ${form.name}\n👪 *Parent:* ${form.parent}\n📞 *Phone:* ${form.phone}\n🎸 *Instrument:* ${form.instrument} — ${form.grade}\n📅 *Date:* ${today}\n\n_Please confirm next steps._`;
    window.open(`https://wa.me/919885297005?text=${encodeURIComponent(text)}`,"_blank");
  };

  const lbl:React.CSSProperties={ fontFamily:"var(--font-b)", fontSize:10, letterSpacing:".16em", color:"var(--dim)", display:"block", marginBottom:7, textTransform:"uppercase" };
  const g2:React.CSSProperties={ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 };

  return (
    <div id="admModal" className="modal-bg" onClick={e=>{if(e.target===e.currentTarget)close();}}>
      <motion.div initial={{scale:.92,opacity:0,y:30}} animate={{scale:1,opacity:1,y:0}} transition={{duration:.4,ease:[0.23,1,0.32,1]}}
        className="modal-box glass" style={{ padding:"36px" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:28 }}>
          <div>
            <p className="label" style={{ marginBottom:6 }}>Celestial Harmony Academy</p>
            <h3 style={{ fontFamily:"var(--font-h)", fontSize:"clamp(1.3rem,2.5vw,1.8rem)", color:"var(--white)", fontStyle:"italic" }}>Digital Admission</h3>
          </div>
          <button onClick={close} style={{ width:30,height:30,background:"rgba(255,255,255,.06)",border:"1px solid var(--border)",color:"var(--muted)",fontSize:13,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center" }}>✕</button>
        </div>
        {/* Steps */}
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:28 }}>
          {[1,2,3].map(s=>(
            <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className={`sdot ${step===s?"act":step>s?"done":""}`} />
              {s<3&&<div style={{ width:48, height:1, background:step>s?"rgba(200,150,12,.4)":"var(--border)", transition:"background .3s" }} />}
            </div>
          ))}
          <p style={{ fontFamily:"var(--font-b)", fontSize:10, letterSpacing:".1em", color:"var(--dim)", marginLeft:8 }}>
            Step {step} / 3 — {["","Personal Info","Music Details","Admission Slip"][step]}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step===1&&(
            <motion.div key="s1" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}} transition={{duration:.28}}>
              <div style={g2}>
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={lbl}>Student Full Name *</label>
                  <input className="field" placeholder="As per school records" value={form.name} onChange={set("name")} />
                </div>
                <div><label style={lbl}>Date of Birth *</label><input className="field" type="date" value={form.dob} onChange={set("dob")} /></div>
                <div><label style={lbl}>Gender</label>
                  <select className="field" value={form.gender} onChange={set("gender")}>
                    <option value="">Select</option><option>Male</option><option>Female</option><option>Prefer not to say</option>
                  </select>
                </div>
                <div style={{ gridColumn:"1/-1" }}><label style={lbl}>Parent / Guardian *</label><input className="field" placeholder="Parent or guardian name" value={form.parent} onChange={set("parent")} /></div>
                <div><label style={lbl}>Phone *</label><input className="field" type="tel" placeholder="+91 98852 97005" value={form.phone} onChange={set("phone")} /></div>
                <div><label style={lbl}>Email</label><input className="field" type="email" placeholder="email@example.com" value={form.email} onChange={set("email")} /></div>
              </div>
              <button onClick={()=>setStep(2)} className="btn-primary" style={{ width:"100%", marginTop:24 }}><span>Continue →</span></button>
            </motion.div>
          )}
          {step===2&&(
            <motion.div key="s2" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}} transition={{duration:.28}}>
              <div style={g2}>
                <div><label style={lbl}>Instrument *</label>
                  <select className="field" value={form.instrument} onChange={set("instrument")}>
                    <option value="">Select</option>
                    {["Guitar","Keyboard / Piano","Violin","Vocals","Drums & Percussion","Music Theory","Other"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Trinity Grade Target</label>
                  <select className="field" value={form.grade} onChange={set("grade")}>
                    <option value="">Select</option>
                    {["Beginner","Grade 1","Grade 2","Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Diploma ATCL/LTCL"].map(g=><option key={g}>{g}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Prior Experience</label>
                  <select className="field" value={form.exp} onChange={set("exp")}>
                    {["Complete Beginner","1–2 Yrs Informal","1–2 Yrs Formal","3–5 Years","5+ Years"].map(e=><option key={e}>{e}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Preferred Schedule</label>
                  <select className="field" value={form.schedule} onChange={set("schedule")}>
                    {["Flexible","Weekday Mornings","Weekday Evenings","Weekend Mornings","Weekend Afternoons"].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn:"1/-1" }}><label style={lbl}>Your Locality / Area</label><input className="field" placeholder="KPHB, Kukatpally, Miyapur…" value={form.area} onChange={set("area")} /></div>
              </div>
              <div style={{ display:"flex", gap:12, marginTop:24 }}>
                <button onClick={()=>setStep(1)} className="btn-ghost" style={{ flex:1 }}>← Back</button>
                <button onClick={()=>setStep(3)} className="btn-primary" style={{ flex:2 }}><span>Generate Slip →</span></button>
              </div>
            </motion.div>
          )}
          {step===3&&(
            <motion.div key="s3" initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-24}} transition={{duration:.28}}>
              <div className="slip">
                <div style={{ textAlign:"center", borderBottom:"1px solid var(--border)", paddingBottom:16, marginBottom:16 }}>
                  <p className="label" style={{ color:"var(--gold)", marginBottom:6 }}>Celestial Harmony Academy of Music</p>
                  <p style={{ fontFamily:"var(--font-b)", fontSize:11, color:"var(--dim)" }}>HIG-68, KPHB Colony Phase 3, Hyderabad 500072</p>
                  <h4 style={{ fontFamily:"var(--font-h)", fontSize:"1.4rem", color:"var(--white)", fontStyle:"italic", marginTop:8 }}>Digital Admission Slip</h4>
                  <p className="label" style={{ color:"var(--gold)", marginTop:6 }}>{token}</p>
                </div>
                <Row l="Student Name"    v={form.name}  />
                <Row l="Date of Birth"   v={form.dob}   />
                <Row l="Parent/Guardian" v={form.parent}/>
                <Row l="Phone"           v={form.phone} />
                <Row l="Email"           v={form.email} />
                <Row l="Instrument"      v={form.instrument}/>
                <Row l="Grade Target"    v={form.grade} />
                <Row l="Experience"      v={form.exp}   />
                <Row l="Schedule"        v={form.schedule}/>
                <Row l="Area"            v={form.area}  />
                <Row l="Applied On"      v={today}      />
                <div style={{ marginTop:14, padding:"10px 14px", border:"1px solid rgba(200,150,12,.15)", background:"rgba(200,150,12,.04)" }}>
                  <p style={{ fontFamily:"var(--font-b)", fontSize:11, color:"var(--dim)", lineHeight:1.7, textAlign:"center" }}>📌 This confirms your expression of interest. Enrollment finalised upon fee receipt and faculty confirmation. Screenshot or print this slip.</p>
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:18 }}>
                <button onClick={()=>setStep(2)} className="btn-ghost" style={{ flex:"0 0 auto", padding:"12px 20px" }}>← Edit</button>
                <button onClick={()=>window.print()} className="btn-ghost" style={{ flex:1 }}>🖨 Print</button>
                <button onClick={notifyWA} className="btn-primary" style={{ flex:2 }}><span>Notify via WhatsApp →</span></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
