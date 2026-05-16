import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe, TrendingUp, ShieldCheck, Network, ChevronDown, Mail,
  Phone, MapPin, ArrowRight, Menu, X, Star, Users, Briefcase,
  Award, CheckCircle, Send, Shield, Zap, Target, Layers
} from "lucide-react";

/* ─── EMAILJS CONFIGURATION ────────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};

/* ─── PREMIUM SYSTEM COLOURED TOKENS ───────────────────────────────────────── */
const C = {
  bgDeep: "#060816",         // Deep midnight navy canvas
  bgCard: "#0B1020",         // Layered charcoal background
  glassBase: "rgba(11, 16, 32, 0.45)",
  glassHover: "rgba(17, 24, 39, 0.75)",
  
  // Luxury Strategic Accents
  indigo: "#4F46E5",
  purple: "#7C3AED",
  cyan: "#06B6D4",
  teal: "#14B8A6",
  violetGlow: "#8B5CF6",
  skyGlow: "#38BDF8",
  
  // Cinematic Typography Engine
  white: "#FFFFFF",
  silver: "#E5E7EB",         // Sharp silver tint for headings & structure
  grayText: "#9CA3AF",       // Highly readable soft gray for copy
  muted: "#6B7280",          // Structural architectural text
  
  borderGlass: "rgba(255, 255, 255, 0.06)",
  borderGlow: "rgba(79, 70, 229, 0.25)"
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80";

/* ─── DATA ENGINE: REPLACED WITH STRATEGIC DOCUMENT MATRICES ──────────────── */
const SERVICES = [
  {
    icon: Globe,
    title: "International Business Development & Market Expansion",
    desc: "Navigate the complexities of global scaling confidently. We map targets, uncover market entry white spaces, and isolate execution risks.",
    points: [
      "Market entry strategy and expansion planning",
      "Market feasibility and opportunity assessment",
      "Competitive positioning and market intelligence",
      "Product portfolio optimisation for target markets",
      "Identification and activation of market white spaces",
      "Go-to-market strategy and execution support",
      "Regulatory and compliance mapping",
      "Distributor and channel partner selection",
      "Global exhibitions and trade show participation"
    ],
    accent: C.cyan
  },
  {
    icon: TrendingUp,
    title: "Business Turnaround, P&L Optimization & Reorganisation",
    desc: "Strengthen and manage the core operational engines. We institute absolute financial discipline, performance diagnostics, and margin recovery paths.",
    points: [
      "Business diagnostics and performance assessment",
      "Brownfield restructuring and operational cleanup",
      "P&L optimisation and financial discipline setup",
      "Cost and margin improvement strategies",
      "KPI and OKR framework implementation",
      "Business reorganisation and scaling readiness"
    ],
    accent: C.purple
  },
  {
    icon: Layers,
    title: "Greenfield Project Development & New Venture Creation",
    desc: "Translate venture architecture blueprints into highly stable, validated, and operational commercial realities with long-range planning accuracy.",
    points: [
      "Greenfield project development",
      "Business feasibility and validation",
      "Operating model and business planning",
      "Entity setup and operational launch",
      "Early-stage go-to-market execution",
      "3–5 year strategic growth planning",
      "Portfolio and expansion strategy"
    ],
    accent: C.teal
  },
  {
    icon: Network,
    title: "JV, Distribution & Investment Partnering",
    desc: "Secure market-making institutional alliances, distribution channels, investor matchmaking, and robust cross-border capital pipelines.",
    points: [
      "Joint venture structuring and strategic alliances",
      "Distributor and channel partner development",
      "Partner matchmaking and negotiation support",
      "Investor sourcing and capital facilitation",
      "Pitch deck and investment positioning",
      "Due diligence and deal support",
      "Roadshow and investor engagement planning",
      "Distribution ecosystem development"
    ],
    accent: C.indigo
  }
];

const TESTIMONIALS = [
  { name: "Amara Nwosu", role: "CEO, NovaTech Africa", text: "JCK Positivity executed our tri-regional expansion script flawlessly within 11 months. Their network assets are unprecedented.", signature: "NW" },
  { name: "David Chen", role: "MD, AsiaLink Corp", text: "Exceptional quantitative risk insulation frameworks. They corrected critical legal positioning vectors ahead of market entry.", signature: "DC" },
  { name: "Sophie Laurent", role: "Founder, Maison Lumière", text: "They operate like an ultra-luxury tactical unit rather than a consulting vendor. Our Middle East alpha capture loop has yielded unprecedented scale.", signature: "SL" }
];

/* ─── HOOKS & UTILITIES ───────────────────────────────────────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

function useIsMobile(breakpoint = 992) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [breakpoint]);
  return isMobile;
}

/* ─── CINEMATIC GLOWING LIGHT ORBS ────────────────────────────────────────── */
function GlowOrb({ delay = 0, size = 400, color = C.purple, left = "10%", top = "20%" }) {
  return (
    <motion.div
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -60, 40, 0],
        scale: [1, 1.15, 0.9, 1],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left,
        top,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.2,
        filter: "blur(70px)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}

/* ─── INTERACTIVE KINETIC MAGNETIC BUTTON ─────────────────────────────────── */
function MagneticButton({ children, onClick, variant = "primary", style = {}, type = "button" }) {
  const ref = useRef(null);
  const isMobile = useIsMobile(768);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 130) {
      setOffset({ x: distanceX * 0.15, y: distanceY * 0.15 });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  };

  useEffect(() => {
    if (isMobile) return;
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isMobile]);

  const baseStyle =
    variant === "primary"
      ? {
          background: `linear-gradient(135deg, ${C.indigo}, ${C.purple})`,
          color: C.white,
          boxShadow: `0 12px 35px rgba(124, 92, 246, 0.35), inset 0 1px 0 rgba(255,255,255,0.2)`,
        }
      : {
          background: "rgba(255, 255, 255, 0.03)",
          color: C.white,
          border: `1px solid ${C.borderGlass}`,
          backdropFilter: "blur(12px)",
        };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02, boxShadow: variant === "primary" ? `0 16px 40px rgba(124, 92, 246, 0.5)` : `0 10px 25px rgba(56, 189, 248, 0.15)` }}
      whileTap={{ scale: 0.98 }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{
        ...baseStyle,
        borderRadius: 14,
        padding: "16px 34px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        letterSpacing: "0.01em",
        border: variant === "primary" ? "none" : `1px solid ${C.borderGlass}`,
        position: "relative",
        zIndex: 2,
        willChange: "transform",
        ...style,
      }}
    >
      {children}
    </motion.button>
  );
}

/* ─── NAVIGATION DISPATCH PROTOCOL ────────────────────────────────────────── */
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
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 120,
        background: scrolled ? "rgba(6, 8, 22, 0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.borderGlass}` : "none",
        transition: "background 0.4s, border 0.4s, backdrop-filter 0.4s",
        padding: "0 5vw",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 85 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer", zIndex: 2 }} onClick={() => scroll("home")}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `linear-gradient(135deg, ${C.cyan}, ${C.indigo})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: `0 8px 24px rgba(6, 182, 212, 0.3)`
          }}>
            <Globe size={22} color={C.white} />
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 21, color: C.white, letterSpacing: "0.02em", lineHeight: 1 }}>JCK</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.skyGlow, letterSpacing: "0.22em", textTransform: "uppercase", lineHeight: 1, marginTop: 5 }}>Positivity</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, alignItems: "center" }} className="nav-desktop">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => scroll(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: C.grayText,
                letterSpacing: "0.03em",
                fontWeight: 500,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.skyGlow)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.grayText)}
            >
              {l}
            </button>
          ))}
          <MagneticButton onClick={() => scroll("contact")} variant="primary" style={{ padding: "10px 24px", fontSize: 13 }}>
            Book Alpha Meeting
          </MagneticButton>
        </div>

        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: C.white, cursor: "pointer" }} className="nav-mobile">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ background: "rgba(6, 8, 22, 0.98)", borderTop: `1px solid ${C.borderGlass}`, padding: "16px 5vw 32px" }}>
            {links.map((l) => (
              <button key={l} onClick={() => scroll(l)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "16px 0", color: C.silver, fontFamily: "'DM Sans', sans-serif", fontSize: 16, borderBottom: `1px solid ${C.borderGlass}` }}>
                {l}
              </button>
            ))}
            <MagneticButton onClick={() => scroll("contact")} variant="primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }}>
              Book Alpha Meeting
            </MagneticButton>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`@media (max-width: 992px) { .nav-desktop { display: none !important; } .nav-mobile { display: block !important; } }`}</style>
    </motion.nav>
  );
}

/* ─── HERO PARALLAX MATRIX ────────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: C.bgDeep }}>
      <GlowOrb color={C.purple} size={550} left="-5%" top="10%" delay={0} />
      <GlowOrb color={C.cyan} size={500} left="65%" top="35%" delay={3} />

      <motion.div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(180deg, rgba(6,8,22,0.85) 0%, ${C.bgDeep} 100%), url("${HERO_IMAGE}")`, backgroundSize: "cover", backgroundPosition: "center", y, pointerEvents: "none" }} />

      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 90%)", opacity: 0.4, pointerEvents: "none" }} />

      <motion.div style={{ opacity, position: "relative", zIndex: 20, padding: "150px 5vw 80px", maxWidth: 1280, margin: "0 auto", width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }} className="hero-grid-layout">
          <div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(79, 70, 229, 0.12)", border: `1px solid ${C.borderGlow}`, borderRadius: 100, padding: "6px 20px", marginBottom: 30 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.cyan, boxShadow: `0 0 10px ${C.cyan}` }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.skyGlow, letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 600 }}>Global Business Transformation</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(44px, 5.2vw, 74px)", fontWeight: 700, color: C.white, lineHeight: 1.1, margin: "0 0 26px", letterSpacing: "-0.02em" }}>
              Commercial Dominance{" "}
              <span style={{ backgroundImage: `linear-gradient(135deg, ${C.skyGlow}, ${C.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Without Risks.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: C.grayText, lineHeight: 1.8, margin: "0 0 44px", maxWidth: 580 }}>
              JCK Positivity engineers premier market expansion pathways and cross-border distribution models. We minimize operational complexities to securely convert regional scaling ambitions into sustained market capture.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <MagneticButton onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                Initiate Expansion <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })} variant="secondary">
                Explore Matrix Pillars
              </MagneticButton>
            </motion.div>
          </div>

          {/* FUTURISTIC GLASS QUANT DASHBOARD */}
          <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.35 }} className="hero-card-wrap">
            <div style={{ background: C.glassBase, backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)", border: `1px solid ${C.borderGlass}`, borderRadius: 28, padding: 42, boxShadow: "0 35px 75px rgba(0,0,0,0.55), inset 0 1px 1px rgba(255,255,255,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 28, alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.skyGlow, letterSpacing: "0.15em", textTransform: "uppercase" }}>Strategic Velocity Metrics</span>
                <div style={{ display: "flex", gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} /><div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} /></div>
              </div>

              <div style={{ background: "rgba(5, 7, 20, 0.45)", borderRadius: 20, padding: 24, marginBottom: 28, border: `1px solid ${C.borderGlass}` }}>
                <svg viewBox="0 0 340 150" style={{ width: "100%" }}>
                  <def><linearGradient id="gGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={C.indigo} /><stop offset="100%" stopColor={C.cyan} /></linearGradient></def>
                  <path d="M10 120 Q 80 50 140 90 T 260 30 T 330 15" fill="none" stroke="url(#gGrad)" strokeWidth="3" />
                  {[120, 90, 30, 15].map((yVal, idx) => <circle key={idx} cx={[80, 140, 260, 330][idx]} cy={yVal} r={4.5} fill={C.skyGlow} />)}
                </svg>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["Market Capture", "+31.4% Growth Mode"], ["Compliance Rating", "100% Risk Insulated"]].map(([lbl, val]) => (
                  <div key={lbl} style={{ background: "rgba(255,255,255,0.01)", borderRadius: 14, padding: "16px", border: `1px solid ${C.borderGlass}` }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, textTransform: "uppercase" }}>{lbl}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: C.white, marginTop: 4 }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <style>{`@media (max-width: 992px) { .hero-grid-layout { grid-template-columns: 1fr !important; gap: 48px !important; } .hero-card-wrap { display: none !important; } }`}</style>
    </section>
  );
}

/* ─── SERVICES MATRICES GRID (INTEGRATED SUB-POINTS) ──────────────────────── */
function ServiceCard({ svc, index }) {
  const [ref, inView] = useReveal(0.08);
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 90, damping: 20, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.glassHover : C.glassBase,
        border: `1px solid ${hovered ? svc.accent : C.borderGlass}`,
        borderRadius: 24,
        padding: "40px",
        boxShadow: hovered ? `0 25px 60px rgba(0,0,0,0.45), 0 0 25px ${svc.accent}12` : "none",
        transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div>
        <div style={{
          width: 54, height: 54, borderRadius: 14,
          background: hovered ? `${svc.accent}20` : "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? svc.accent : C.borderGlass}`,
          display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28,
          transition: "all 0.3s"
        }}>
          <Icon size={24} color={svc.accent} />
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 16, lineHeight: 1.25 }}>{svc.title}</h3>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.grayText, lineHeight: 1.7, marginBottom: 28 }}>{svc.desc}</p>
      </div>

      <div style={{ borderTop: `1px solid ${C.borderGlass}`, paddingTop: 24, marginTop: "auto" }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: svc.accent, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Operational Matrices</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {svc.points.map((pt) => (
            <li key={pt} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.silver, lineHeight: 1.4 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: svc.accent, marginTop: 7, flexShrink: 0, boxShadow: `0 0 8px ${svc.accent}` }} />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function Services() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="services" style={{ background: C.bgCard, padding: "140px 5vw", position: "relative" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.skyGlow, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18, padding: "6px 20px", background: "rgba(56, 189, 248, 0.08)", border: `1px solid rgba(56, 189, 248, 0.15)`, borderRadius: 100 }}>System Frameworks</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 4.2vw, 56px)", fontWeight: 700, color: C.white, margin: 0 }}>Core Service Pillars</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: 32 }} className="services-grid-layout">
          {SERVICES.map((s, i) => <ServiceCard key={s.title} svc={s} index={i} />)}
        </div>
      </div>
      <style>{`@media (max-width: 600px) { .services-grid-layout { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── ABOUT SYSTEM: VERBATIM EXECUTIVE PARAGRAPH INTEGRATION ────────────── */
function About() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="about" style={{ background: C.bgDeep, padding: "140px 5vw", position: "relative", overflow: "hidden" }}>
      <GlowOrb color={C.indigo} size={600} left="45%" top="-15%" delay={1} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "center" }} className="about-grid">
          <motion.div ref={ref} initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.purple, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 22, padding: "6px 20px", background: "rgba(124, 58, 237, 0.08)", border: `1px solid rgba(124, 58, 237, 0.15)`, borderRadius: 100 }}>Corporate Charter</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: C.white, lineHeight: 1.15, margin: "0 0 28px" }}>
              Strategic Operational Management &<br />
              <span style={{ backgroundImage: `linear-gradient(135deg, ${C.cyan}, ${C.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>Domestic-Global Execution.</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: C.silver, lineHeight: 1.85, marginBottom: 36, textAlign: "justify" }}>
              jck Positivity partners with businesses to drive sustainable growth across global and domestic markets. Our expertise spans market entry, route-to-market strategy, distribution design, trade and product compliance, packaging solutions, and commercial execution. We help companies navigate the complexities of international markets by identifying the right opportunities, developing the right product portfolio, and connecting them with suitable strategic partners and distribution networks across diverse regions. With experience across multiple industries and geographies, we enable businesses to expand confidently while minimising risk and maximising commercial potential. Beyond business development, we provide strategic and operational management support, including P&L oversight, performance improvement, brownfield expansion, and end-to-end business optimisation. We work alongside organisations not only to unlock new opportunities, but to strengthen and manage the businesses behind them.
            </p>
            <MagneticButton onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
              Initiate Enterprise Partnership <ArrowRight size={15} />
            </MagneticButton>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { icon: Target, title: "Precision Target Matching", desc: "Aligning your cross-border roadmap with verified regional distribution networks." },
                { icon: Shield, title: "Insulated Risk Profiles", desc: "Rigorous product safety, structural packaging, and trade compliance architectures." },
                { icon: Zap, title: "End-to-End Core Optimization", desc: "Direct involvement inside P&L oversight setups and structural turnaround actions." }
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} style={{ display: "flex", gap: 22, padding: 28, background: C.glassBase, border: `1px solid ${C.borderGlass}`, borderRadius: 22, backdropFilter: "blur(20px)" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderGlass}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={20} color={C.skyGlow} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 16, color: C.white, marginBottom: 6 }}>{p.title}</div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.grayText, lineHeight: 1.6 }}>{p.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 992px) { .about-grid { grid-template-columns: 1fr !important; gap: 54px !important; } }`}</style>
    </section>
  );
}

/* ─── RESULTS METRIC VALIDATION ───────────────────────────────────────────── */
function Results() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="results" style={{ background: C.bgCard, padding: "140px 5vw" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.teal, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18, padding: "6px 20px", background: "rgba(20, 184, 166, 0.08)", border: `1px solid rgba(20, 184, 166, 0.15)`, borderRadius: 100 }}>System Validation</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, color: C.white, margin: 0 }}>Vouched Benchmarks</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32 }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ background: C.glassBase, border: `1px solid ${C.borderGlass}`, borderRadius: 24, padding: 42, boxShadow: "inset 0 1px 1px rgba(255,255,255,0.02)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={14} color={C.skyGlow} fill={C.skyGlow} />)}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.silver, lineHeight: 1.8, marginBottom: 36, fontStyle: "italic" }}>"{t.text}"</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${C.indigo}, ${C.cyan})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.white }}>
                  {t.signature}
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15, color: C.white }}>{t.name}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.muted, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT GLASS SIGNAL ENGINE ─────────────────────────────────────────── */
function Contact() {
  const [ref, inView] = useReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
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
        to_name: "JCK Positivity Management Terminal",
      });

      setStatus("success");
      setForm({ name: "", email: "", service: "", message: "" });
    } catch (err) {
      if (EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID") {
        setErrorMsg("System node credentials unconfigured. Map valid credentials into the top config block.");
      } else {
        setErrorMsg("Transmission interruption. Please restart routing execution loop.");
      }
      setStatus("error");
    }
  };

  const inputStyle = { width: "100%", boxSizing: "border-box", background: "rgba(5, 7, 20, 0.45)", border: `1px solid ${C.borderGlass}`, borderRadius: 14, padding: "16px 20px", color: C.white, fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", transition: "all 0.3s" };
  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.grayText, fontWeight: 500, display: "block", marginBottom: 8 };

  return (
    <section id="contact" style={{ background: C.bgDeep, padding: "140px 5vw", position: "relative" }}>
      <GlowOrb color={C.cyan} size={550} left="10%" top="45%" delay={4} />

      <div style={{ maxWidth: 1150, margin: "0 auto", position: "relative", zIndex: 10 }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.skyGlow, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 18, padding: "6px 20px", background: "rgba(56, 189, 248, 0.08)", border: `1px solid rgba(56, 189, 248, 0.15)`, borderRadius: 100 }}>Secure Channel</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 4vw, 54px)", fontWeight: 700, color: C.white, margin: 0 }}>Initiate Connection Protocol</h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64 }} className="contact-grid">
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: C.white, marginBottom: 36 }}>Advisory Terminals</div>
            {[
              { icon: Mail, label: "SECURE COMMS", value: "hello@jckpositivity.com" },
              { icon: Phone, label: "ROUTING ACCESS", value: "+1 (888) 525-0199" },
              { icon: MapPin, label: "GLOBAL SYNDICATE SYNC", value: "New York · London · Dubai" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: 18, marginBottom: 32 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(255,255,255,0.02)", border: `1px solid ${C.borderGlass}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={C.skyGlow} />
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.silver, marginTop: 4 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ background: C.glassBase, border: `1px solid ${C.borderGlass}`, borderRadius: 24, padding: 44, backdropFilter: "blur(30px)" }}>
              {status === "success" ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <CheckCircle size={46} color={C.teal} style={{ marginBottom: 18 }} />
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.white, marginBottom: 10 }}>Signal Routed Successfully</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif', size: 14", color: C.grayText }}>Our corporate strategy coordinators will initialize decryption sequences within 24 operational hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="form-grid">
                    <div>
                      <label style={labelStyle}>Identity Token *</label>
                      <input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Secure Routing Email *</label>
                      <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@corporation.com" style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Target Capability Protocol *</label>
                    <select name="service" required value={form.service} onChange={handleChange} style={inputStyle}>
                      <option value="" disabled>Select capability matrix pipeline...</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title} style={{ background: C.bgCard }}>{s.title}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: 32 }}>
                    <label style={labelStyle}>Macro Execution Objective *</label>
                    <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Define your domestic/global scaling goals, industry constraints, or operational bottlenecks..." style={{ ...inputStyle, resize: "none" }} />
                  </div>

                  {status === "error" && (
                    <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "14px 18px", marginBottom: 24, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#FCA5A5" }}>
                      {errorMsg}
                    </div>
                  )}

                  <MagneticButton type="submit" style={{ width: "100%", justifyContent: "center" }}>
                    {status === "loading" ? "Transmitting Signal Matrix..." : "Dispatch Connection Signal"}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 992px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
        @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr !important; gap: 20px !important; } }
      `}</style>
    </section>
  );
}

/* ─── CORPORATE ARCHITECTURAL FOOTER ──────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#040610", padding: "54px 5vw 36px", borderTop: `1px solid ${C.borderGlass}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: `linear-gradient(135deg, ${C.indigo}, ${C.purple})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Globe size={18} color={C.white} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 17, color: C.white }}>JCK Positivity Framework</span>
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.muted }}>
          © {new Date().getFullYear()} JCK Positivity Corporation. Secure Encryption Protocol standard Alpha-6.
        </div>
      </div>
    </footer>
  );
}

/* ─── RUNTIME SYSTEM ROOT ─────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bgDeep}; overflow-x: hidden; }
        ::selection { background: ${C.indigo}66; color: ${C.white}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bgDeep}; }
        ::-webkit-scrollbar-thumb { background: ${C.borderGlass}; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2) !important; }
        select { color-scheme: dark; }
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