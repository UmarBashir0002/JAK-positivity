import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe, TrendingUp, ShieldCheck, Network, ChevronDown, Mail,
  Phone, MapPin, ArrowRight, Menu, X, Star, Users, Briefcase,
  Award, CheckCircle, Send, Linkedin, Twitter, Facebook
} from "lucide-react";

/* ─── EMAILJS CONFIG ─────────────────────────────────────────────────────────
   Replace these with your actual EmailJS credentials:
   1. Go to https://www.emailjs.com and create a free account
   2. Create an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{service}}, {{message}}
   4. Copy your Service ID, Template ID, and Public Key below
   ─────────────────────────────────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};

/* ─── COLOUR TOKENS ──────────────────────────────────────────────────────── */
const C = {
  navy: "#0B1D3A",
  navyLight: "#132849",
  slate: "#1E3A5F",
  slateLight: "#2D5282",
  gold: "#C9A84C",
  goldLight: "#E2C97E",
  goldPale: "#F7EDD5",
  white: "#FFFFFF",
  offWhite: "#F8F9FC",
  text: "#0B1D3A",
  muted: "#64748B",
  border: "rgba(201,168,76,0.25)",
};

/* ─── HOOK: scroll-reveal ─────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

/* ─── STICKY NAV ──────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "Services", "About", "Results", "Contact"];
  const scroll = (id) => {
    setOpen(false);
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(11,29,58,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "background 0.4s, border 0.4s, backdrop-filter 0.4s",
        padding: "0 5vw",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scroll("home")}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            display: "flex", alignItems: "center", justifyContent: "center"
          }}>
            <Globe size={20} color={C.navy} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 17, color: C.white, letterSpacing: "0.01em", lineHeight: 1 }}>JAK</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.goldLight, letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Positivity</div>
          </div>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="nav-desktop">
          {links.map((l) => (
            <button key={l} onClick={() => scroll(l)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.82)", letterSpacing: "0.04em", padding: 0, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.goldLight}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.82)"}
            >{l}</button>
          ))}
          <button onClick={() => scroll("Contact")}
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, border: "none", borderRadius: 8, padding: "10px 22px", color: C.navy, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, cursor: "pointer", letterSpacing: "0.05em" }}>
            Book a Call
          </button>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: C.white, cursor: "pointer" }} className="nav-mobile">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ background: "rgba(11,29,58,0.98)", borderTop: `1px solid ${C.border}`, padding: "16px 5vw 24px" }}>
            {links.map((l) => (
              <button key={l} onClick={() => scroll(l)}
                style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 0", color: "rgba(255,255,255,0.82)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
                {l}
              </button>
            ))}
            <button onClick={() => scroll("Contact")}
              style={{ marginTop: 20, width: "100%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, border: "none", borderRadius: 8, padding: 14, color: C.navy, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
              Book a Call
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: C.navy }}>
      {/* Animated gradient mesh background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <motion.div style={{ y }} animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="hero-blob hero-blob-1" />
        <motion.div style={{ y }} animate={{ scale: [1, 1.08, 1], rotate: [0, -4, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="hero-blob hero-blob-2" />
        <div className="hero-grid" />
      </div>

      {/* Floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.5 }}
          style={{
            position: "absolute",
            width: 6 + i * 3, height: 6 + i * 3,
            borderRadius: "50%",
            background: C.gold,
            top: `${15 + i * 12}%`,
            left: `${8 + i * 14}%`,
            opacity: 0.4,
          }} />
      ))}

      <motion.div style={{ opacity, position: "relative", zIndex: 2, padding: "120px 5vw 80px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid-layout">
          {/* Left – text */}
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(201,168,76,0.12)", border: `1px solid rgba(201,168,76,0.3)`,
                borderRadius: 100, padding: "6px 16px", marginBottom: 28,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.gold }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.goldLight, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  International Business Development
                </span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35 }}
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(38px, 5vw, 68px)", fontWeight: 700, color: C.white, lineHeight: 1.1, margin: "0 0 24px" }}>
              Expand Your Business{" "}
              <span style={{ color: C.gold, fontStyle: "italic" }}>Across Borders.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "rgba(255,255,255,0.68)", lineHeight: 1.75, margin: "0 0 40px", maxWidth: 500 }}>
              JAK Positivity is your strategic partner in navigating global markets — from market entry to trade compliance, we turn your international ambitions into measurable results.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, border: "none", borderRadius: 10, padding: "16px 32px", color: C.navy, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.02em" }}>
                Book a Free Consultation <ArrowRight size={16} />
              </button>
              <button onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", border: `1.5px solid rgba(255,255,255,0.25)`, borderRadius: 10, padding: "16px 32px", color: C.white, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, cursor: "pointer", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.gold}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"}>
                Explore Services
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
              {[["120+", "Global Clients"], ["35", "Countries Reached"], ["98%", "Client Satisfaction"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: C.gold }}>{val}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4, letterSpacing: "0.04em" }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right – glassmorphism card */}
          <motion.div initial={{ opacity: 0, x: 60, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hero-card-wrap">
            <div style={{
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 24,
              padding: 40,
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Gold accent top edge */}
              <div style={{ position: "absolute", top: 0, left: 40, right: 40, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />

              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.goldLight, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 20 }}>Global Reach Dashboard</div>

              {/* Mock world nodes */}
              <div style={{ position: "relative", background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 24, marginBottom: 24, minHeight: 180 }}>
                <svg viewBox="0 0 340 160" style={{ width: "100%", opacity: 0.9 }}>
                  {/* Simplified world outline paths */}
                  <ellipse cx="170" cy="80" rx="155" ry="70" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                  {[
                    [60, 60], [120, 45], [200, 55], [265, 70], [310, 90],
                    [270, 115], [190, 110], [130, 105], [80, 100], [45, 85]
                  ].map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r={3} fill={C.gold} opacity={0.6} />
                      <circle cx={x} cy={y} r={7} fill="none" stroke={C.gold} strokeWidth="0.6" opacity={0.3} />
                    </g>
                  ))}
                  {/* Connecting arcs */}
                  {[[60, 60, 200, 55], [200, 55, 310, 90], [120, 45, 265, 70], [80, 100, 190, 110]].map(([x1, y1, x2, y2], i) => (
                    <path key={i} d={`M${x1},${y1} Q${(x1 + x2) / 2},${Math.min(y1, y2) - 30} ${x2},${y2}`}
                      fill="none" stroke={C.gold} strokeWidth="0.8" strokeDasharray="3 4" opacity={0.4} />
                  ))}
                  {/* HQ pulse */}
                  <motion.circle cx="170" cy="80" r="10" fill="none" stroke={C.gold} strokeWidth="1.5"
                    animate={{ r: [10, 22, 10], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2.5, repeat: Infinity }} />
                  <circle cx="170" cy="80" r="5" fill={C.gold} />
                </svg>
              </div>

              {/* Mini metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[["Active", "23", "Markets"], ["Deals", "48", "Closed Q2"], ["ROI", "3.4×", "Average"]].map(([label, val, sub]) => (
                  <div key={label} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 12px", textAlign: "center", border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.gold, margin: "4px 0 2px" }}>{val}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{sub}</div>
                  </div>
                ))}
              </div>

              {/* Bottom accent */}
              <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ADE80" }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Live global operations · 14 time zones</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}
          onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Scroll</span>
          <ChevronDown size={18} color="rgba(255,255,255,0.3)" />
        </motion.div>
      </motion.div>

      <style>{`
        .hero-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .hero-blob-1 {
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(201,168,76,0.18) 0%, transparent 70%);
          top: -200px; right: -150px;
        }
        .hero-blob-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(45,82,130,0.4) 0%, transparent 70%);
          bottom: -100px; left: -100px;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
        }
        @media (max-width: 768px) {
          .hero-grid-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-card-wrap { display: none; }
        }
      `}</style>
    </section>
  );
}

/* ─── SERVICES ────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: Globe,
    title: "Market Entry Strategy",
    desc: "We analyze target markets, assess regulatory landscapes, and build a bespoke roadmap so your brand lands with authority and traction from day one.",
    features: ["Market Feasibility Studies", "Competitive Positioning", "Regulatory Mapping", "Go-to-Market Execution"],
    accent: C.gold,
  },
  {
    icon: Network,
    title: "Global Networking",
    desc: "Leverage our curated network of C-suite executives, government liaisons, and industry gatekeepers across 35+ countries to open doors that matter.",
    features: ["Executive Introductions", "Trade Delegations", "Partnership Brokering", "Industry Summits"],
    accent: "#4A9EDB",
  },
  {
    icon: ShieldCheck,
    title: "Trade Compliance",
    desc: "Navigate complex import/export regulations, tariff structures, and international trade agreements with confidence — keeping your operations both legal and optimized.",
    features: ["Export Controls & Licensing", "Customs Classification", "Sanctions Screening", "Compliance Audits"],
    accent: "#3DBE8A",
  },
  {
    icon: TrendingUp,
    title: "Business Growth Advisory",
    desc: "Strategic consulting on international scaling — from cross-border M&A to joint ventures — designed to accelerate sustainable revenue growth globally.",
    features: ["Cross-Border M&A", "Joint Venture Structuring", "International Finance", "KPI & OKR Frameworks"],
    accent: "#A855F7",
  },
  {
    icon: Briefcase,
    title: "Investment Facilitation",
    desc: "Connect with the right institutional investors, sovereign wealth funds, and private equity partners for your international expansion capital needs.",
    features: ["Investor Matchmaking", "Due Diligence Support", "Pitch Deck Strategy", "Roadshow Planning"],
    accent: "#F59E0B",
  },
  {
    icon: Users,
    title: "Cross-Cultural Leadership",
    desc: "Equip your teams with the cultural intelligence and communication frameworks to build trust and close deals across diverse international environments.",
    features: ["Culture Workshops", "Negotiation Training", "Language Briefings", "Protocol Coaching"],
    accent: "#EC4899",
  },
];

function ServiceCard({ svc, index }) {
  const [ref, inView] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: (index % 3) * 0.12 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.navyLight : C.white,
        border: `1px solid ${hovered ? svc.accent : "rgba(11,29,58,0.08)"}`,
        borderRadius: 20, padding: 36,
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered ? `0 24px 60px rgba(11,29,58,0.15), 0 0 0 1px ${svc.accent}22` : "0 2px 12px rgba(11,29,58,0.05)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Glow */}
      <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${svc.accent}18 0%, transparent 70%)`, transform: "translate(30%, -30%)", opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />

      <div style={{ width: 52, height: 52, borderRadius: 14, background: hovered ? `${svc.accent}22` : `${svc.accent}12`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, transition: "background 0.3s" }}>
        <Icon size={24} color={svc.accent} strokeWidth={1.8} />
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: hovered ? C.white : C.navy, margin: "0 0 12px", transition: "color 0.3s" }}>
        {svc.title}
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: hovered ? "rgba(255,255,255,0.65)" : C.muted, lineHeight: 1.7, margin: "0 0 24px", transition: "color 0.3s" }}>
        {svc.desc}
      </p>

      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {svc.features.map((f) => (
          <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: hovered ? "rgba(255,255,255,0.7)" : C.muted, transition: "color 0.3s" }}>
            <CheckCircle size={14} color={svc.accent} strokeWidth={2} style={{ flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function Services() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="services" style={{ background: C.offWhite, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, padding: "6px 18px", background: `${C.gold}15`, borderRadius: 100 }}>What We Do</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 700, color: C.navy, margin: "0 0 18px" }}>Our Core Services</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            Everything you need to expand confidently into new international markets — under one strategic roof.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {SERVICES.map((s, i) => <ServiceCard key={s.title} svc={s} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ───────────────────────────────────────────────────────────────── */
function About() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="about" style={{ background: C.navy, padding: "100px 5vw", position: "relative", overflow: "hidden" }}>
      {/* decorative */}
      <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.08)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.12)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="about-grid">
          {/* Left */}
          <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 20, padding: "6px 18px", background: `${C.gold}15`, borderRadius: 100 }}>Who We Are</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: C.white, lineHeight: 1.15, margin: "0 0 24px" }}>
              Built on Trust,<br />
              <span style={{ color: C.gold, fontStyle: "italic" }}>Driven by Results.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: "0 0 20px" }}>
              JAK Positivity was founded on a simple belief: that every business deserves access to global markets, regardless of their starting point. We combine decades of international business experience with on-the-ground relationships in emerging and established markets alike.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, margin: "0 0 40px" }}>
              Our multidisciplinary team of strategists, lawyers, and network architects work in concert — giving clients a holistic, end-to-end advantage that single-service firms simply cannot match.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, border: "none", borderRadius: 10, padding: "14px 28px", color: C.navy, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                Partner With Us <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>

          {/* Right – value pillars */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: Award, title: "Decade of Expertise", desc: "10+ years navigating complex international business environments across 6 continents." },
                { icon: Globe, title: "35+ Country Network", desc: "Established relationships with key decision-makers, regulators, and industry leaders worldwide." },
                { icon: ShieldCheck, title: "Full Compliance", desc: "Every strategy is built to be legally sound, culturally sensitive, and commercially robust." },
                { icon: TrendingUp, title: "Measurable Growth", desc: "Our clients see an average 3.4× ROI on international expansion projects within 24 months." },
              ].map((p, i) => {
                const Icon = p.icon;
                return (
                  <motion.div key={p.title} initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15 * i + 0.3 }}
                    style={{ display: "flex", gap: 20, padding: 24, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${C.gold}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={C.gold} strokeWidth={1.8} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, color: C.white, marginBottom: 6 }}>{p.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{p.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }`}</style>
    </section>
  );
}

/* ─── RESULTS / TESTIMONIALS ──────────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Amara Nwosu", role: "CEO, NovaTech Africa", text: "JAK Positivity helped us enter three European markets in under 12 months. Their network and strategic guidance were unparalleled. We closed partnerships we thought would take years.", stars: 5 },
  { name: "David Chen", role: "Managing Director, AsiaLink Corp", text: "The trade compliance team saved us from a costly regulatory mistake. Their due diligence is exceptional. I recommend them to every business leader looking East.", stars: 5 },
  { name: "Sophie Laurent", role: "Founder, Maison Lumière", text: "From our first consultation, JAK felt like a true partner, not a vendor. Our Middle East launch was executed flawlessly. The ROI has been extraordinary.", stars: 5 },
];

function Results() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="results" style={{ background: C.offWhite, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, padding: "6px 18px", background: `${C.gold}15`, borderRadius: 100 }}>Client Results</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: C.navy, margin: "0 0 16px" }}>What Our Clients Say</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: C.muted, maxWidth: 500, margin: "0 auto" }}>Real outcomes for real businesses across every continent.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => {
            const [tRef, tInView] = useReveal(0.1);
            return (
              <motion.div key={t.name} ref={tRef} initial={{ opacity: 0, y: 40 }} animate={tInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: i * 0.15 }}
                style={{ background: C.white, border: `1px solid rgba(11,29,58,0.08)`, borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(11,29,58,0.06)" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={15} color={C.gold} fill={C.gold} />)}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.75, margin: "0 0 28px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.navy}, ${C.slateLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.gold }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.navy }}>{t.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT FORM ────────────────────────────────────────────────────────── */
function Contact() {
  const [ref, inView] = useReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    /* ── EmailJS integration ──────────────────────────────────────────────────
       EmailJS sends an email via your connected email service without a backend.
       Template variables available in your EmailJS template:
         {{from_name}}   → form.name
         {{from_email}}  → form.email
         {{service}}     → form.service
         {{message}}     → form.message
         {{to_name}}     → "JAK Positivity Team"
       ─────────────────────────────────────────────────────────────────────── */
    try {
      // Dynamically load EmailJS SDK
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      }

      await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
        from_name: form.name,
        from_email: form.email,
        service: form.service,
        message: form.message,
        to_name: "JAK Positivity Team",
      });

      setStatus("success");
      setForm({ name: "", email: "", service: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      // If EmailJS credentials aren't configured yet, show a helpful message
      if (EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID") {
        setErrorMsg("EmailJS is not yet configured. Please update EMAILJS_CONFIG at the top of the file with your credentials.");
      } else {
        setErrorMsg("Something went wrong. Please try again or contact us directly.");
      }
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10, padding: "14px 18px", color: C.white, fontFamily: "'DM Sans', sans-serif", fontSize: 15,
    outline: "none", transition: "border-color 0.2s",
  };

  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em", display: "block", marginBottom: 8 };

  return (
    <section id="contact" style={{ background: C.navy, padding: "100px 5vw", position: "relative", overflow: "hidden" }}>
      {/* BG accent */}
      <div style={{ position: "absolute", bottom: -300, left: -200, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, padding: "6px 18px", background: `${C.gold}15`, borderRadius: 100 }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: C.white, margin: "0 0 16px" }}>Book Your Free Consultation</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto" }}>
            Tell us about your global ambitions. We'll respond within 24 hours with a tailored approach.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "start" }} className="contact-grid">
          {/* Left – contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 32 }}>Let's talk global growth.</div>
            {[
              { icon: Mail, label: "Email", value: "hello@jakpositivity.com" },
              { icon: Phone, label: "Phone", value: "+1 (888) 525-0199" },
              { icon: MapPin, label: "HQ", value: "New York · London · Dubai" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 28 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `${C.gold}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={C.gold} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{value}</div>
                </div>
              </div>
            ))}

            {/* Social icons */}
            <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <div key={i} style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = `${C.gold}20`}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                  <Icon size={17} color="rgba(255,255,255,0.5)" strokeWidth={1.8} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right – form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 36px" }}>
              {status === "success" ? (
                <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${C.gold}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <CheckCircle size={36} color={C.gold} />
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 12 }}>Message Sent!</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    Thank you! Our team will be in touch within 24 hours with a personalised strategy brief.
                  </p>
                  <button onClick={() => setStatus("idle")} style={{ marginTop: 28, background: `${C.gold}20`, border: `1px solid ${C.gold}40`, borderRadius: 10, padding: "12px 28px", color: C.gold, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="form-grid">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input name="name" required value={form.name} onChange={handleChange}
                        placeholder="Jane Smith"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = C.gold}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange}
                        placeholder="jane@company.com"
                        style={inputStyle}
                        onFocus={e => e.target.style.borderColor = C.gold}
                        onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Service of Interest *</label>
                    <select name="service" required value={form.service} onChange={handleChange}
                      style={{ ...inputStyle, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}>
                      <option value="" disabled style={{ background: C.navy }}>Select a service…</option>
                      <option value="Market Entry Strategy" style={{ background: C.navy }}>Market Entry Strategy</option>
                      <option value="Global Networking" style={{ background: C.navy }}>Global Networking</option>
                      <option value="Trade Compliance" style={{ background: C.navy }}>Trade Compliance</option>
                      <option value="Business Growth Advisory" style={{ background: C.navy }}>Business Growth Advisory</option>
                      <option value="Investment Facilitation" style={{ background: C.navy }}>Investment Facilitation</option>
                      <option value="Cross-Cultural Leadership" style={{ background: C.navy }}>Cross-Cultural Leadership</option>
                      <option value="General Inquiry" style={{ background: C.navy }}>General Inquiry</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>Your Message *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                      placeholder="Tell us about your business, target markets, and goals…"
                      style={{ ...inputStyle, resize: "vertical", minHeight: 130, lineHeight: 1.65 }}
                      onFocus={e => e.target.style.borderColor = C.gold}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
                  </div>

                  {status === "error" && (
                    <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#FCA5A5" }}>
                      {errorMsg || "An error occurred. Please try again."}
                    </div>
                  )}

                  <button type="submit" disabled={status === "loading"}
                    style={{
                      width: "100%", padding: "16px 32px",
                      background: status === "loading" ? "rgba(201,168,76,0.5)" : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                      border: "none", borderRadius: 12, color: C.navy,
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      transition: "opacity 0.2s",
                    }}>
                    {status === "loading" ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${C.navy}`, borderTopColor: "transparent" }} />
                        Sending…
                      </>
                    ) : (
                      <><Send size={16} /> Send My Enquiry</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#07132A", padding: "48px 5vw 32px", borderTop: `1px solid rgba(201,168,76,0.12)` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={17} color={C.navy} strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 15, color: C.white }}>JAK Positivity</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: C.goldLight, letterSpacing: "0.18em", textTransform: "uppercase" }}>International Business Development</div>
            </div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>
            © {new Date().getFullYear()} JAK Positivity Ltd. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service"].map(t => (
              <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.35)", cursor: "pointer" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── ROOT APP ────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.navy}; }
        ::selection { background: ${C.gold}55; color: ${C.white}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.navy}; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}60; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: ${C.navy}; color: ${C.white}; }
      `}</style>
      <Nav />
      <Hero />
      <Services />
      <About />
      <Results />
      <Contact />
      <Footer />
    </>
  );
}