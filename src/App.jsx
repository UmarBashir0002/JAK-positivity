import { useState, useEffect, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  Globe,
  TrendingUp,
  ShieldCheck,
  Network,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Star,
  Users,
  Briefcase,
  Award,
  CheckCircle,
  Send,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

const EMAILJS_CONFIG = {
  serviceId: "YOUR_SERVICE_ID",
  templateId: "YOUR_TEMPLATE_ID",
  publicKey: "YOUR_PUBLIC_KEY",
};

const C = {
  obsidian: "#050A14",
  obsidianSoft: "#09111F",
  charcoal: "#101826",
  champagne: "#B8860B",
  gold: "#FFD700",
  goldSoft: "#F6D36A",
  goldDeep: "#8C6500",
  ivory: "#F5F1E8",
  white: "#FFFFFF",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80";

const scrollToId = (id) => {
  const el = document.getElementById(id.toLowerCase());
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

function MagneticButton({ children, onClick, variant = "solid", className = "", style, type = "button", disabled = false, ariaLabel }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.7 });

  const handleMove = (e) => {
    if (reduceMotion || disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(Math.min(dx * 0.18, 16), -16));
    y.set(Math.max(Math.min(dy * 0.18, 16), -16));
  };
  const reset = () => { x.set(0); y.set(0); };

  const base = variant === "ghost" ? {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.16)",
    color: C.ivory,
  } : {
    background: "linear-gradient(135deg, rgba(184,134,11,0.95) 0%, rgba(255,215,0,0.95) 48%, rgba(246,211,106,0.98) 100%)",
    border: "1px solid rgba(255, 226, 128, 0.4)",
    color: "#0C1322",
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onFocus={reset}
      onBlur={reset}
      disabled={disabled}
      whileHover={reduceMotion || disabled ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.985 }}
      style={{
        x: springX,
        y: springY,
        position: "relative",
        overflow: "hidden",
        ...base,
        boxShadow: variant === "ghost"
          ? "0 10px 30px rgba(0,0,0,0.15)"
          : "0 18px 40px rgba(184,134,11,0.18), 0 0 0 1px rgba(255,215,0,0.08) inset",
        borderRadius: 16,
        padding: "15px 28px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        letterSpacing: "0.02em",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        transition: "box-shadow 240ms ease, transform 240ms ease, border-color 240ms ease",
        ...style,
      }}
      className={className}
    >
      <span style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, transparent 25%, rgba(255,255,255,0.14) 45%, transparent 65%)", transform: "translateX(-140%)", animation: variant === "ghost" ? "none" : "shimmerSweep 5.5s ease-in-out infinite", pointerEvents: "none", mixBlendMode: "screen" }} />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </motion.button>
  );
}

function SectionBadge({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "rgba(255,215,0,0.07)", border: "1px solid rgba(255,215,0,0.15)", color: C.goldSoft, fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: `linear-gradient(135deg, ${C.champagne}, ${C.gold})`, boxShadow: "0 0 18px rgba(255,215,0,0.55)" }} />
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, subtitle, light = false }) {
  return (
    <div style={{ textAlign: "center" }}>
      <SectionBadge>{eyebrow}</SectionBadge>
      <h2 style={{ margin: "18px 0 14px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4.3vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.02em", color: light ? C.white : C.obsidian, fontWeight: 700 }}>
        {title}
      </h2>
      <p style={{ margin: "0 auto", maxWidth: 620, color: light ? "rgba(245,241,232,0.68)" : "rgba(16,24,38,0.64)", fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.8, letterSpacing: "0.01em" }}>
        {subtitle}
      </p>
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Home", "Services", "About", "Results", "Contact"];
  return (
    <motion.nav initial={{ y: -36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 5vw", background: scrolled ? "rgba(5,10,20,0.72)" : "transparent", backdropFilter: scrolled ? "blur(34px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,215,0,0.12)" : "1px solid transparent", boxShadow: scrolled ? "0 12px 40px rgba(0,0,0,0.22)" : "none", transition: "background 240ms ease, box-shadow 240ms ease, border-color 240ms ease" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", height: 78, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <button onClick={() => scrollToId("home")} style={{ display: "flex", alignItems: "center", gap: 12, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(184,134,11,0.95), rgba(255,215,0,0.95))", boxShadow: "0 10px 28px rgba(255,215,0,0.16)" }}>
            <Globe size={20} color="#08111E" strokeWidth={2.2} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 700, color: C.white, lineHeight: 1 }}>JAK</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: C.goldSoft, marginTop: 4 }}>Positivity</div>
          </div>
        </button>

        <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 34 }}>
          {links.map((label) => <button key={label} onClick={() => scrollToId(label)} style={{ background: "transparent", border: "none", color: "rgba(245,241,232,0.76)", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 14, letterSpacing: "0.06em", padding: 0, transition: "color 180ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.color = C.goldSoft)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,241,232,0.76)")}>{label}</button>)}
          <MagneticButton onClick={() => scrollToId("contact")} style={{ minWidth: 150 }}>Book a Call</MagneticButton>
        </div>

        <button className="nav-mobile" onClick={() => setOpen((v) => !v)} style={{ display: "none", background: "transparent", border: "none", color: C.white, cursor: "pointer" }}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: "easeOut" }} style={{ overflow: "hidden", borderTop: "1px solid rgba(255,215,0,0.12)", background: "rgba(5,10,20,0.88)", backdropFilter: "blur(34px)" }}>
            <div style={{ padding: "18px 0 24px" }}>
              {links.map((label) => <button key={label} onClick={() => { setOpen(false); scrollToId(label); }} style={{ display: "block", width: "100%", textAlign: "left", border: "none", background: "transparent", color: "rgba(245,241,232,0.82)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, padding: "15px 0", cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{label}</button>)}
              <div style={{ marginTop: 20 }}><MagneticButton onClick={() => { setOpen(false); scrollToId("contact"); }} style={{ width: "100%" }}>Book a Call</MagneticButton></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 800px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const yBg = useTransform(scrollY, [0, 900], [0, 140]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.78]);
  return (
    <section id="home" style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: C.obsidian }}>
      <motion.div aria-hidden="true" style={{ position: "absolute", inset: 0, y: reduceMotion ? 0 : yBg, scale: 1.08, backgroundImage: `url("${HERO_IMAGE}")`, backgroundSize: "cover", backgroundPosition: "center", filter: "saturate(0.55) contrast(1.05) brightness(0.55)", transformOrigin: "center" }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,10,20,0.42) 0%, rgba(5,10,20,0.72) 40%, rgba(5,10,20,0.94) 100%), radial-gradient(circle at 20% 20%, rgba(255,215,0,0.10), transparent 32%), radial-gradient(circle at 80% 10%, rgba(184,134,11,0.12), transparent 30%)" }} />
      <div aria-hidden="true" className="hero-grid" style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(circle at center, black 22%, transparent 82%)", opacity: 0.6 }} />
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(140deg, rgba(255,215,0,0.06) 0%, transparent 30%, transparent 70%, rgba(255,215,0,0.04) 100%)", mixBlendMode: "screen", pointerEvents: "none" }} />

      <motion.div style={{ position: "relative", zIndex: 2, opacity: fade, padding: "124px 5vw 84px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="hero-layout" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 54, alignItems: "center" }}>
            <motion.div initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}>
              <motion.div variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}>
                <SectionBadge>International Consultancy</SectionBadge>
              </motion.div>
              <motion.h1 variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } }} style={{ margin: "24px 0 20px", fontFamily: "'Playfair Display', Georgia, serif", color: C.white, fontSize: "clamp(42px, 6vw, 78px)", lineHeight: 1.02, letterSpacing: "-0.04em", maxWidth: 760 }}>
                Expand your business with <span style={{ background: "linear-gradient(135deg, #B8860B, #FFD700 52%, #F6D36A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>precision, trust,</span> and global reach.
              </motion.h1>
              <motion.p variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } }} style={{ margin: "0 0 34px", maxWidth: 620, color: "rgba(245,241,232,0.72)", fontFamily: "'DM Sans', sans-serif", fontSize: 18, lineHeight: 1.85, letterSpacing: "0.01em" }}>
                JAK Positivity is your strategic partner for cross-border growth — from market entry and compliance to high-value connections and long-term expansion strategy.
              </motion.p>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center", marginBottom: 44 }}>
                <MagneticButton onClick={() => scrollToId("contact")}>Book a Free Consultation <ArrowRight size={16} /></MagneticButton>
                <MagneticButton onClick={() => scrollToId("services")} variant="ghost" style={{ borderColor: "rgba(255,255,255,0.18)", boxShadow: "0 10px 30px rgba(0,0,0,0.16)" }}>Explore Services</MagneticButton>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, maxWidth: 640 }} className="hero-stats">
                {[["120+", "Global Clients"], ["35", "Countries Reached"], ["98%", "Client Satisfaction"]].map(([value, label]) => <div key={label} style={{ padding: "18px 18px 16px", borderRadius: 20, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,215,0,0.12)", backdropFilter: "blur(30px)", boxShadow: "0 18px 38px rgba(0,0,0,0.14)" }}><div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 30, lineHeight: 1, color: C.goldSoft, marginBottom: 8 }}>{value}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(245,241,232,0.52)" }}>{label}</div></div>)}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 54, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.22 }} className="hero-panel" style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: 530, borderRadius: 28, padding: 1, background: "linear-gradient(135deg, rgba(255,215,0,0.35), rgba(255,255,255,0.10), rgba(184,134,11,0.28))", boxShadow: "0 28px 80px rgba(0,0,0,0.36)" }}>
                <div style={{ borderRadius: 27, padding: 28, background: "rgba(10,16,28,0.45)", backdropFilter: "blur(34px)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", position: "relative" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: -1, background: "radial-gradient(circle at top right, rgba(255,215,0,0.12), transparent 35%), radial-gradient(circle at bottom left, rgba(184,134,11,0.10), transparent 30%)", pointerEvents: "none" }} />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.goldSoft, letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 8 }}>Global Reach Dashboard</div><div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: C.white, lineHeight: 1.15 }}>Strategy in motion</div></div>
                      <div style={{ width: 54, height: 54, borderRadius: 18, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(184,134,11,0.18), rgba(255,215,0,0.10))", border: "1px solid rgba(255,215,0,0.16)" }}><Globe size={22} color={C.goldSoft} /></div>
                    </div>
                    <div style={{ borderRadius: 22, padding: 20, background: "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.08)", minHeight: 240, position: "relative", overflow: "hidden" }}>
                      <svg viewBox="0 0 360 200" style={{ width: "100%", height: "auto" }}>
                        <defs><radialGradient id="pulse" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#FFD700" stopOpacity="0.75" /><stop offset="100%" stopColor="#FFD700" stopOpacity="0" /></radialGradient></defs>
                        <ellipse cx="180" cy="100" rx="140" ry="70" fill="none" stroke="rgba(255,255,255,0.07)" />
                        {[[74,78],[126,58],[190,65],[246,88],[286,124],[228,150],[164,138],[108,126],[66,112]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="3" fill={C.goldSoft} /><circle cx={x} cy={y} r="10" fill="none" stroke="rgba(255,215,0,0.22)" /></g>)}
                        {[[74,78,190,65],[190,65,286,124],[126,58,246,88],[108,126,228,150]].map(([x1,y1,x2,y2],i)=><path key={i} d={`M${x1},${y1} Q${(x1+x2)/2},${Math.min(y1,y2)-42} ${x2},${y2}`} fill="none" stroke="rgba(255,215,0,0.36)" strokeDasharray="4 6" />)}
                        <circle cx="180" cy="102" r="24" fill="url(#pulse)"><animate attributeName="r" values="18;31;18" dur="2.8s" repeatCount="indefinite" /></circle>
                        <circle cx="180" cy="102" r="6" fill={C.goldSoft} />
                      </svg>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginTop: 14 }}>
                      {[["23", "Active Markets"], ["48", "Closed Q2"], ["3.4×", "Average ROI"]].map(([value, label]) => <div key={label} style={{ borderRadius: 18, padding: "14px 12px", textAlign: "center", background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.08)" }}><div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.goldSoft, fontSize: 24, lineHeight: 1, marginBottom: 5 }}>{value}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(245,241,232,0.46)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{label}</div></div>)}
                    </div>
                    <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, color: "rgba(245,241,232,0.62)", fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}><span style={{ width: 9, height: 9, borderRadius: "50%", background: "#5CFF8B", boxShadow: "0 0 18px rgba(92,255,139,0.5)" }} />Live global operations · 14 time zones</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.button onClick={() => scrollToId("services")} aria-label="Scroll to services" animate={reduceMotion ? {} : { y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} style={{ margin: "34px auto 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "transparent", border: "none", color: "rgba(245,241,232,0.54)", cursor: "pointer", padding: 0 }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase" }}>Scroll</span>
            <ChevronDown size={18} />
          </motion.button>
        </div>
      </motion.div>
      <style>{`
        @keyframes shimmerSweep { 0%, 55% { transform: translateX(-140%); opacity: 0; } 65% { opacity: 0.8; } 100% { transform: translateX(140%); opacity: 0; } }
        @media (max-width: 980px) { .hero-layout { grid-template-columns: 1fr !important; gap: 32px !important; } .hero-panel { display: none !important; } }
        @media (max-width: 680px) { .hero-stats { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

const SERVICES = [
  { icon: Globe, title: "Market Entry Strategy", desc: "We map the regulatory landscape, pinpoint opportunity, and define a precise route to market with credibility from day one.", features: ["Market Feasibility Studies", "Competitive Positioning", "Regulatory Mapping", "Go-to-Market Execution"], accent: C.goldSoft },
  { icon: Network, title: "Global Networking", desc: "Access a curated network of executives, institutional partners, and decision-makers to open the right doors at the right time.", features: ["Executive Introductions", "Trade Delegations", "Partnership Brokering", "Industry Summits"], accent: "#8FC6FF" },
  { icon: ShieldCheck, title: "Trade Compliance", desc: "Navigate import/export rules, customs requirements, and international trade obligations with clarity and confidence.", features: ["Export Controls & Licensing", "Customs Classification", "Sanctions Screening", "Compliance Audits"], accent: "#7EF0B0" },
  { icon: TrendingUp, title: "Business Growth Advisory", desc: "Strategic advisory for international scale — from market sequencing to growth architecture and cross-border expansion.", features: ["Cross-Border M&A", "Joint Venture Structuring", "International Finance", "KPI & OKR Frameworks"], accent: "#D59BFF" },
  { icon: Briefcase, title: "Investment Facilitation", desc: "Connect with institutional investors and private capital sources aligned to your international growth thesis.", features: ["Investor Matchmaking", "Due Diligence Support", "Pitch Deck Strategy", "Roadshow Planning"], accent: "#FFCB7A" },
  { icon: Users, title: "Cross-Cultural Leadership", desc: "Equip teams with the cultural intelligence, communication frameworks, and protocol support needed for global deal-making.", features: ["Culture Workshops", "Negotiation Training", "Language Briefings", "Protocol Coaching"], accent: "#FF8BB8" },
];

function ServiceCard({ svc, index }) {
  const [ref, inView] = useReveal(0.12);
  const Icon = svc.icon;
  return (
    <motion.article ref={ref} initial={{ opacity: 0, y: 34 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 72, damping: 16, mass: 0.9, delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.015 }} style={{ position: "relative", borderRadius: 24, padding: 1, background: "linear-gradient(145deg, rgba(255,215,0,0.24), rgba(255,255,255,0.08), rgba(184,134,11,0.16))", boxShadow: "0 18px 44px rgba(5,10,20,0.08)" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 1, borderRadius: 23, background: "radial-gradient(circle at top right, rgba(255,215,0,0.14), transparent 30%), radial-gradient(circle at bottom left, rgba(255,255,255,0.06), transparent 35%)", opacity: 0, transition: "opacity 240ms ease" }} className="service-glow" />
      <div style={{ position: "relative", zIndex: 1, height: "100%", borderRadius: 23, padding: 30, background: "linear-gradient(180deg, rgba(12,19,34,0.92) 0%, rgba(12,19,34,0.78) 100%)", backdropFilter: "blur(32px)", border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(255,215,0,0.06), transparent 28%, transparent 70%, rgba(255,215,0,0.03))", pointerEvents: "none" }} />
        <div style={{ width: 56, height: 56, borderRadius: 18, display: "grid", placeItems: "center", marginBottom: 22, background: "linear-gradient(135deg, rgba(255,215,0,0.16), rgba(255,255,255,0.04))", border: "1px solid rgba(255,215,0,0.18)", boxShadow: `0 0 0 1px rgba(255,255,255,0.02) inset, 0 0 26px ${svc.accent}1F` }}><Icon size={24} color={svc.accent} strokeWidth={1.8} /></div>
        <h3 style={{ margin: "0 0 12px", color: C.white, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, lineHeight: 1.2 }}>{svc.title}</h3>
        <p style={{ margin: "0 0 24px", color: "rgba(245,241,232,0.68)", fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, lineHeight: 1.8 }}>{svc.desc}</p>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
          {svc.features.map((item) => <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", color: "rgba(245,241,232,0.74)", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, lineHeight: 1.5 }}><CheckCircle size={16} color={svc.accent} strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} /><span>{item}</span></li>)}
        </ul>
      </div>
      <style>{`.service-glow { opacity: 0; } article:hover .service-glow { opacity: 1; }`}</style>
    </motion.article>
  );
}

function Services() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="services" style={{ padding: "104px 5vw", background: "linear-gradient(180deg, #F6F1E8 0%, #ECE6DA 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18 }} style={{ marginBottom: 56 }}>
          <SectionHeading eyebrow="What We Do" title="Consulting services built for serious expansion." subtitle="A premium blend of strategy, execution, and international relationships — designed to help your brand scale with confidence." />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          {SERVICES.map((svc, index) => <ServiceCard key={svc.title} svc={svc} index={index} />)}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useReveal(0.12);
  const pillars = useMemo(() => ([
    { icon: Award, title: "Decade of Expertise", desc: "10+ years guiding international growth across complex business environments." },
    { icon: Globe, title: "35+ Country Network", desc: "Strong relationships with decision-makers, regulators, and operators worldwide." },
    { icon: ShieldCheck, title: "Full Compliance", desc: "Every recommendation is built to be legally sound and commercially robust." },
    { icon: TrendingUp, title: "Measurable Growth", desc: "Clear outcomes, monitored milestones, and a focus on long-term ROI." },
  ]), []);
  return (
    <section id="about" style={{ padding: "104px 5vw", background: C.obsidian, position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: -160, right: -140, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 65%)", filter: "blur(10px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: -200, left: -180, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(184,134,11,0.12) 0%, transparent 65%)", filter: "blur(12px)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 54, alignItems: "center" }}>
          <motion.div ref={ref} initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: "spring", stiffness: 72, damping: 18 }}>
            <SectionBadge>Who We Are</SectionBadge>
            <h2 style={{ margin: "20px 0 18px", fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(32px, 4vw, 54px)", lineHeight: 1.08, color: C.white, letterSpacing: "-0.03em" }}>Built on trust,<br /><span style={{ background: "linear-gradient(135deg, #B8860B, #FFD700 54%, #F6D36A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>driven by results.</span></h2>
            <div style={{ display: "grid", gap: 18, color: "rgba(245,241,232,0.70)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, lineHeight: 1.9, letterSpacing: "0.01em", marginBottom: 32 }}>
              <p style={{ margin: 0 }}>JAK Positivity was built on a simple belief: every business should have access to global markets, regardless of where it starts. We combine strategic insight, international relationships, and operational clarity to make expansion feel precise rather than overwhelming.</p>
              <p style={{ margin: 0 }}>Our team works as an extension of yours — bringing a premium consultancy experience that is rigorous, responsive, and commercially grounded.</p>
            </div>
            <MagneticButton onClick={() => scrollToId("contact")}>Partner With Us <ArrowRight size={16} /></MagneticButton>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: "spring", stiffness: 72, damping: 18, delay: 0.08 }}>
            <div style={{ display: "grid", gap: 14 }}>
              {pillars.map((pillar, index) => { const Icon = pillar.icon; return <motion.div key={pillar.title} initial={{ opacity: 0, x: 18 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.08 * index }} style={{ position: "relative", display: "flex", gap: 18, padding: 22, borderRadius: 22, background: "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(255,215,0,0.12)", backdropFilter: "blur(32px)", boxShadow: "0 18px 46px rgba(0,0,0,0.18)" }}><div style={{ width: 46, height: 46, borderRadius: 16, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(255,215,0,0.16), rgba(255,255,255,0.03))", border: "1px solid rgba(255,215,0,0.14)", flexShrink: 0 }}><Icon size={20} color={C.goldSoft} /></div><div><div style={{ color: C.white, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 6, letterSpacing: "0.02em" }}>{pillar.title}</div><div style={{ color: "rgba(245,241,232,0.60)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, lineHeight: 1.7 }}>{pillar.desc}</div></div></motion.div>; })}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`@media (max-width: 920px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

const TESTIMONIALS = [
  { name: "Amara Nwosu", role: "CEO, NovaTech Africa", text: "JAK Positivity helped us enter three European markets in under 12 months. Their network and strategic guidance were unmatched.", stars: 5 },
  { name: "David Chen", role: "Managing Director, AsiaLink Corp", text: "The compliance support saved us from a costly regulatory mistake. Their attention to detail is exceptional.", stars: 5 },
  { name: "Sophie Laurent", role: "Founder, Maison Lumière", text: "From day one it felt like a true partnership. Our Middle East launch was executed flawlessly and the ROI has been extraordinary.", stars: 5 },
];

function Results() {
  const [ref, inView] = useReveal(0.12);
  return (
    <section id="results" style={{ padding: "104px 5vw", background: "linear-gradient(180deg, #F6F1E8 0%, #EEE8DD 100%)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18 }} style={{ marginBottom: 56 }}>
          <SectionHeading eyebrow="Client Results" title="Premium outcomes backed by real experience." subtitle="The strongest consultancy work should be measurable, dependable, and easy to trust." />
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 22 }}>
          {TESTIMONIALS.map((t, index) => { const [cardRef, cardInView] = useReveal(0.12); return <motion.article key={t.name} ref={cardRef} initial={{ opacity: 0, y: 26 }} animate={cardInView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 72, damping: 18, delay: index * 0.08 }} whileHover={{ y: -6, scale: 1.01 }} style={{ borderRadius: 24, padding: 1, background: "linear-gradient(145deg, rgba(184,134,11,0.18), rgba(255,255,255,0.12), rgba(184,134,11,0.10))" }}><div style={{ borderRadius: 23, padding: 28, height: "100%", background: "linear-gradient(180deg, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0.64) 100%)", border: "1px solid rgba(255,255,255,0.55)", backdropFilter: "blur(30px)", boxShadow: "0 20px 48px rgba(16,24,38,0.08)" }}><div style={{ display: "flex", gap: 4, marginBottom: 20 }}>{Array.from({ length: t.stars }).map((_, i) => <Star key={i} size={15} color={C.goldSoft} fill={C.goldSoft} />)}</div><p style={{ margin: "0 0 24px", fontFamily: "'DM Sans', sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(16,24,38,0.72)", fontStyle: "italic" }}>“{t.text}”</p><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 46, height: 46, borderRadius: "50%", display: "grid", placeItems: "center", background: "linear-gradient(135deg, #09111F 0%, #22314A 100%)", color: C.goldSoft, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14 }}>{t.name.split(" ").map((part) => part[0]).join("")}</div><div><div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.obsidian, fontSize: 14, marginBottom: 4 }}>{t.name}</div><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(16,24,38,0.58)", letterSpacing: "0.01em" }}>{t.role}</div></div></div></div></motion.article>; })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useReveal(0.12);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault(); setStatus("loading"); setErrorMsg("");
    try {
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          script.onload = resolve; script.onerror = reject; document.head.appendChild(script);
        });
        window.emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
      }
      await window.emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, { from_name: form.name, from_email: form.email, service: form.service, message: form.message, to_name: "JAK Positivity Team" });
      setStatus("success"); setForm({ name: "", email: "", service: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err); setStatus("error"); setErrorMsg(EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID" ? "EmailJS is not configured yet. Update EMAILJS_CONFIG at the top of the file." : "Something went wrong. Please try again or contact us directly.");
    }
  };
  const inputStyle = { width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 14, padding: "15px 16px", color: C.white, fontFamily: "'DM Sans', sans-serif", fontSize: 15, outline: "none", transition: "border-color 180ms ease, box-shadow 180ms ease, background 180ms ease" };
  const labelStyle = { display: "block", marginBottom: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,241,232,0.62)", letterSpacing: "0.14em", textTransform: "uppercase" };
  return (
    <section id="contact" style={{ position: "relative", overflow: "hidden", padding: "104px 5vw", background: C.obsidian }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 15% 80%, rgba(255,215,0,0.10), transparent 28%), radial-gradient(circle at 80% 20%, rgba(184,134,11,0.10), transparent 24%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18 }} style={{ marginBottom: 54 }}>
          <SectionHeading eyebrow="Get In Touch" title="Book your free consultation." subtitle="Share your goals and we’ll respond with a clear, tailored approach within 24 hours." light />
        </motion.div>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 36, alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18 }} style={{ padding: 28, borderRadius: 26, background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(255,215,0,0.12)", backdropFilter: "blur(32px)", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.white, fontSize: 24, marginBottom: 26 }}>Let’s talk global growth.</div>
            <div style={{ display: "grid", gap: 18 }}>
              {[
                { icon: Mail, label: "Email", value: "hello@jakpositivity.com" },
                { icon: Phone, label: "Phone", value: "+1 (888) 525-0199" },
                { icon: MapPin, label: "HQ", value: "New York · London · Dubai" },
              ].map(({ icon: Icon, label, value }) => <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}><div style={{ width: 44, height: 44, borderRadius: 16, display: "grid", placeItems: "center", flexShrink: 0, background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,255,255,0.04))", border: "1px solid rgba(255,215,0,0.12)" }}><Icon size={18} color={C.goldSoft} strokeWidth={1.9} /></div><div><div style={labelStyle}>{label}</div><div style={{ color: "rgba(245,241,232,0.84)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}>{value}</div></div></div>)}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 34 }}>
              {[Linkedin, Twitter, Facebook].map((Icon, idx) => <button key={idx} aria-label="social link" style={{ width: 42, height: 42, borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", display: "grid", placeItems: "center", cursor: "pointer", transition: "transform 180ms ease, background 180ms ease, border-color 180ms ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,215,0,0.10)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.18)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0px)"; }}><Icon size={17} color="rgba(245,241,232,0.72)" strokeWidth={1.8} /></button>)}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.08 }} style={{ borderRadius: 28, padding: 1, background: "linear-gradient(145deg, rgba(255,215,0,0.24), rgba(255,255,255,0.10), rgba(184,134,11,0.16))" }}>
            <div style={{ borderRadius: 27, padding: 30, background: "rgba(10,16,28,0.66)", backdropFilter: "blur(34px)", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 28px 80px rgba(0,0,0,0.26)" }}>
              {status === "success" ? <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "36px 0" }}><div style={{ width: 76, height: 76, borderRadius: "50%", margin: "0 auto 22px", display: "grid", placeItems: "center", background: "rgba(255,215,0,0.14)", border: "1px solid rgba(255,215,0,0.22)" }}><CheckCircle size={36} color={C.goldSoft} /></div><div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.white, fontSize: 26, marginBottom: 10 }}>Message Sent</div><p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", color: "rgba(245,241,232,0.68)", fontSize: 15, lineHeight: 1.8 }}>Thank you. Our team will be in touch within 24 hours with a personalised strategy brief.</p><div style={{ marginTop: 26 }}><MagneticButton onClick={() => setStatus("idle")}>Send Another</MagneticButton></div></motion.div> : <form onSubmit={handleSubmit} noValidate><div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}><div><label style={labelStyle}>Full Name *</label><input name="name" required value={form.name} onChange={handleChange} placeholder="Jane Smith" style={inputStyle} /></div><div><label style={labelStyle}>Email Address *</label><input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="jane@company.com" style={inputStyle} /></div></div><div style={{ marginBottom: 18 }}><label style={labelStyle}>Service of Interest *</label><select name="service" required value={form.service} onChange={handleChange} style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(245,241,232,0.50)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}><option value="" disabled style={{ background: C.obsidian }}>Select a service…</option><option value="Market Entry Strategy" style={{ background: C.obsidian }}>Market Entry Strategy</option><option value="Global Networking" style={{ background: C.obsidian }}>Global Networking</option><option value="Trade Compliance" style={{ background: C.obsidian }}>Trade Compliance</option><option value="Business Growth Advisory" style={{ background: C.obsidian }}>Business Growth Advisory</option><option value="Investment Facilitation" style={{ background: C.obsidian }}>Investment Facilitation</option><option value="Cross-Cultural Leadership" style={{ background: C.obsidian }}>Cross-Cultural Leadership</option><option value="General Inquiry" style={{ background: C.obsidian }}>General Inquiry</option></select></div><div style={{ marginBottom: 22 }}><label style={labelStyle}>Your Message *</label><textarea name="message" required rows={6} value={form.message} onChange={handleChange} placeholder="Tell us about your business, target markets, and goals…" style={{ ...inputStyle, resize: "vertical", minHeight: 144, lineHeight: 1.7 }} /></div>{status === "error" && <div style={{ marginBottom: 18, padding: "12px 14px", borderRadius: 14, background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.24)", color: "#FFB3B3", fontFamily: "'DM Sans', sans-serif", fontSize: 13, lineHeight: 1.6 }}>{errorMsg || "An error occurred. Please try again."}</div>}<MagneticButton type="submit" disabled={status === "loading"} style={{ width: "100%" }}>{status === "loading" ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid #0C1322`, borderTopColor: "transparent" }} />Sending…</> : <><Send size={16} />Send My Enquiry</>}</MagneticButton></form>}
            </div>
          </motion.div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) { .form-grid { grid-template-columns: 1fr !important; } }
        input::placeholder, textarea::placeholder { color: rgba(245,241,232,0.28); }
        select option { background: ${C.obsidian}; color: ${C.white}; }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "30px 5vw", background: "#03060C", borderTop: "1px solid rgba(255,215,0,0.12)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, display: "grid", placeItems: "center", background: "linear-gradient(135deg, rgba(184,134,11,0.95), rgba(255,215,0,0.95))" }}><Globe size={17} color="#08111E" strokeWidth={2.2} /></div>
            <div><div style={{ fontFamily: "'Playfair Display', Georgia, serif", color: C.white, fontWeight: 700, fontSize: 15, lineHeight: 1 }}>JAK Positivity</div><div style={{ marginTop: 4, fontFamily: "'DM Sans', sans-serif", fontSize: 9, color: C.goldSoft, letterSpacing: "0.24em", textTransform: "uppercase" }}>International Business Development</div></div>
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,241,232,0.40)", fontSize: 13, textAlign: "center" }}>© {new Date().getFullYear()} JAK Positivity Ltd. All rights reserved.</div>
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>{["Privacy Policy", "Terms of Service"].map((item) => <span key={item} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(245,241,232,0.45)", cursor: "pointer" }}>{item}</span>)}</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        :root { color-scheme: dark; }
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${C.obsidian}; color: ${C.obsidian}; font-family: 'DM Sans', sans-serif; text-rendering: optimizeLegibility; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        button, input, textarea, select { font: inherit; }
        button { -webkit-tap-highlight-color: transparent; }
        ::selection { background: rgba(255,215,0,0.28); color: ${C.white}; }
        ::-webkit-scrollbar { width: 7px; height: 7px; }
        ::-webkit-scrollbar-track { background: ${C.obsidian}; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, rgba(184,134,11,0.72), rgba(255,215,0,0.90)); border-radius: 999px; }
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
