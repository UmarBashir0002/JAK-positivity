import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Globe, TrendingUp, ShieldCheck, Network, ChevronDown, Mail,
  Phone, MapPin, ArrowRight, Menu, X, Star, Users, Briefcase,
  Award, CheckCircle, Send, Linkedin, Twitter, Facebook, Layers, Target, Shield, Zap
} from "lucide-react";

/* ─── EMAILJS CONFIG ─────────────────────────────────────────────────────────
   Replace these with your actual EmailJS credentials:
   1. Go to https://www.emailjs.com and create a free account
   2. Create an Email Service (Gmail, Outlook, etc.)
   3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{service}}, {{message}}
   4. Copy your Service ID, Template ID, and Public Key below
   ─────────────────────────────────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  serviceId: "service_xf0usrp",
  templateId: "template_4atccm9",
  publicKey: "xaLAa1wrh8IxfhBk7",
};

/* ─── COLOUR TOKENS ──────────────────────────────────────────────────────── */
const C = {
  obsidian: "#050A14",
  charcoal: "#0B101A",
  slate: "#172033",
  slateLight: "#22304A",
  gold: "#B8860B",
  goldLight: "#FFD700",
  white: "#FFFFFF",
  offWhite: "#F7F4EE",
  text: "#0B101A",
  muted: "#667085",
  border: "rgba(255,215,0,0.18)",

  // Compatibility aliases used by the merged content
  bgDeep: "#050A14",
  bgCard: "#0B101A",
  glassBase: "rgba(255,255,255,0.05)",
  glassHover: "rgba(255,255,255,0.08)",
  indigo: "#B8860B",
  purple: "#FFD700",
  cyan: "#FFD700",
  teal: "#69D7B6",
  violetGlow: "#C79BFF",
  skyGlow: "#FFD700",
  silver: "#F7F4EE",
  grayText: "#667085",
  borderGlass: "rgba(255,215,0,0.18)",
  borderGlow: "rgba(255,215,0,0.25)",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1800&q=80";

/* ─── HOOKS ───────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

function useIsMobile(breakpoint = 768) {
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

function MagneticButton({ children, onClick, variant = "primary", style = {}, type = "button" }) {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    if (isMobile || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 140) {
      setOffset({
        x: distanceX * 0.14,
        y: distanceY * 0.14,
      });
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
        background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
        color: C.obsidian,
        boxShadow: "0 16px 40px rgba(184,134,11,0.22)",
      }
      : {
        background: "rgba(255,255,255,0.04)",
        color: C.white,
        border: "1px solid rgba(255,255,255,0.14)",
      };

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      whileHover={isMobile ? undefined : { scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        ...baseStyle,
        borderRadius: 14,
        padding: "15px 30px",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 700,
        fontSize: 15,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        letterSpacing: "0.02em",
        border: "none",
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
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

/* ─── STICKY NAV ──────────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Home", "About", "Services", "Results", "Contact"];
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
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 120,
        background: scrolled ? "rgba(5,10,20,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "none",
        transition: "background 0.4s, border 0.4s, backdrop-filter 0.4s",
        padding: "0 5vw",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 76 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", zIndex: 2 }} onClick={() => scroll("home")}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 24px rgba(184,134,11,0.25)"
          }}>
            <Globe size={20} color={C.obsidian} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700, fontSize: 17, color: C.white, letterSpacing: "0.01em", lineHeight: 1 }}>JAK</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: C.goldLight, letterSpacing: "0.18em", textTransform: "uppercase", lineHeight: 1, marginTop: 2 }}>Positivity</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 34, alignItems: "center" }} className="nav-desktop">
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
                color: "rgba(255,255,255,0.82)",
                letterSpacing: "0.04em",
                padding: 0,
                transition: "color 0.2s",
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.goldLight)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
            >
              {l}
            </button>
          ))}
          <MagneticButton onClick={() => scroll("contact")} variant="primary" style={{ padding: "10px 20px", fontSize: 13 }}>
            Book Alpha Meeting
          </MagneticButton>
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: C.white,
            cursor: "pointer",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
          className="nav-mobile"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "rgba(5,10,20,0.98)",
              borderTop: `1px solid ${C.border}`,
              padding: "16px 5vw 24px",
            }}
          >
            {links.map((l) => (
              <button
                key={l}
                onClick={() => scroll(l)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: "14px 0",
                  color: "rgba(255,255,255,0.82)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 16,
                  borderBottom: `1px solid ${C.border}`,
                  cursor: "pointer",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {l}
              </button>
            ))}
            <MagneticButton onClick={() => scroll("contact")} variant="primary" style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>
              Book Alpha Meeting
            </MagneticButton>
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
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  const overlayY = useTransform(scrollY, [0, 700], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.92]);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: C.obsidian,
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(135deg, rgba(5,10,20,0.92), rgba(5,10,20,0.72)),
            url("${HERO_IMAGE}")
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y,
          pointerEvents: "none",
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at top center, rgba(255,215,0,0.12), transparent 30%), radial-gradient(circle at bottom left, rgba(184,134,11,0.14), transparent 32%), radial-gradient(circle at bottom right, rgba(255,215,0,0.08), transparent 28%)",
          y: overlayY,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 28%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 28%, transparent 85%)",
          pointerEvents: "none",
          opacity: 0.22,
        }}
      />

      <motion.div
        style={{
          opacity,
          position: "relative",
          zIndex: 20,
          padding: "130px 5vw 80px",
          maxWidth: 1280,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            alignItems: "center",
          }}
          className="hero-grid-layout"
        >
          <div
            style={{
              maxWidth: 760,
              justifySelf: "center",
              textAlign: "center",
              margin: "0 auto",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.12 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,215,0,0.08)",
                  border: `1px solid rgba(255,215,0,0.22)`,
                  borderRadius: 100,
                  padding: "6px 16px",
                  marginBottom: 24,
                  boxShadow: "inset 0 0 18px rgba(255,215,0,0.06)",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: C.goldLight,
                    boxShadow: "0 0 12px rgba(255,215,0,0.5)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12,
                    color: C.goldLight,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  International Business Development
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.22 }}
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: C.white,
                lineHeight: 1.06,
                margin: "0 auto 22px",
                letterSpacing: "-0.03em",
                maxWidth: 820,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(32px, 4.2vw, 58px)",
                  fontWeight: 700,
                }}
              >
                International Business Development
              </span>

              <span
                style={{
                  display: "block",
                  fontSize: "clamp(16px, 1.45vw, 21px)",
                  marginTop: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "rgba(255,255,255,0.68)",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase",
                }}
              >
                & Management
              </span>

              <span
                style={{
                  display: "block",
                  fontSize: "clamp(17px, 1.9vw, 25px)",
                  marginTop: "18px",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ color: "#C89666", fontStyle: "italic" }}>
                  Brownfield Transformation
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.52)",
                    fontWeight: 400,
                  }}
                >
                  {" "}And{" "}
                </span>
                <span style={{ color: "#34D399", fontStyle: "italic" }}>
                  Greenfield Launch
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 95, damping: 18, delay: 0.32 }}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 17,
                color: "rgba(255,255,255,0.72)",
                lineHeight: 1.82,
                margin: "0 auto 36px",
                maxWidth: 640,
                letterSpacing: "0.01em",
              }}
            >
              JAK Positivity drives international business growth by enabling strategic trade expansion, launching scalable greenfield ventures, and transforming brownfield operations into high-performing businesses. We deliver sustainable growth, operational excellence, and long-term commercial value across regional and global markets       </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 110, damping: 18, delay: 0.42 }}
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <MagneticButton onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                Initiate Expansion <ArrowRight size={16} />
              </MagneticButton>

              <MagneticButton
                onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
                variant="secondary"
              >
                Explore Matrix Pillars
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18, delay: 0.52 }}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 18,
                marginTop: 42,
                maxWidth: 620,
                marginLeft: "auto",
                marginRight: "auto",
              }}
              className="hero-stats"
            >
              {[
                ["120+", "Global Clients"],
                ["35", "Countries Reached"],
                ["98%", "Client Satisfaction"],
              ].map(([val, label]) => (
                <div
                  key={label}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,215,0,0.10)",
                    borderRadius: 18,
                    padding: "18px 14px",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: C.goldLight,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: "rgba(255,255,255,0.55)",
                      marginTop: 8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 88, damping: 17, delay: 0.26 }}
            className="hero-card-wrap"
            style={{ justifySelf: "center", width: "100%", maxWidth: 470 }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(30px)",
                WebkitBackdropFilter: "blur(30px)",
                border: "1px solid rgba(255,215,0,0.14)",
                borderRadius: 26,
                padding: 34,
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 24px 70px rgba(0,0,0,0.24)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(255,215,0,0.06), transparent 35%, rgba(255,255,255,0.04))",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 42,
                  right: 42,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${C.goldLight}, transparent)`,
                }}
              />

              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: C.goldLight,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 18,
                }}
              >
                Strategic Velocity Metrics
              </div>

              <div
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 18,
                  padding: 22,
                  marginBottom: 22,
                  minHeight: 180,
                }}
              >
                <svg viewBox="0 0 340 160" style={{ width: "100%", opacity: 0.9 }}>
                  <ellipse cx="170" cy="80" rx="155" ry="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  {[
                    [60, 60], [120, 45], [200, 55], [265, 70], [310, 90],
                    [270, 115], [190, 110], [130, 105], [80, 100], [45, 85]
                  ].map(([x, y], i) => (
                    <g key={i}>
                      <circle cx={x} cy={y} r={3} fill={C.goldLight} opacity={0.7} />
                      <circle cx={x} cy={y} r={7} fill="none" stroke={C.goldLight} strokeWidth="0.6" opacity={0.28} />
                    </g>
                  ))}
                  {[
                    [60, 60, 200, 55],
                    [200, 55, 310, 90],
                    [120, 45, 265, 70],
                    [80, 100, 190, 110],
                  ].map(([x1, y1, x2, y2], i) => (
                    <path
                      key={i}
                      d={`M${x1},${y1} Q${(x1 + x2) / 2},${Math.min(y1, y2) - 30} ${x2},${y2}`}
                      fill="none"
                      stroke={C.goldLight}
                      strokeWidth="0.8"
                      strokeDasharray="3 4"
                      opacity={0.42}
                    />
                  ))}
                  <motion.circle
                    cx="170"
                    cy="80"
                    r="10"
                    fill="none"
                    stroke={C.goldLight}
                    strokeWidth="1.5"
                    animate={{ r: [10, 22, 10], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <circle cx="170" cy="80" r="5" fill={C.goldLight} />
                </svg>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[
                  ["Market Capture", "+31.4% Growth Mode"],
                  ["Compliance Rating", "100% Risk Insulated"],
                ].map(([lbl, val]) => (
                  <div
                    key={lbl}
                    style={{
                      background: "rgba(255,255,255,0.01)",
                      borderRadius: 14,
                      padding: "16px",
                      border: `1px solid ${C.borderGlass}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11,
                        color: C.muted,
                        textTransform: "uppercase",
                      }}
                    >
                      {lbl}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: C.white,
                        marginTop: 4,
                      }}
                    >
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            pointerEvents: "auto",
          }}
          onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
          <ChevronDown size={18} color="rgba(255,255,255,0.3)" />
        </motion.div>
      </motion.div>

      <style>{`
        .hero-grid-layout {
          position: relative;
        }

        @media (max-width: 992px) {
          .hero-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 42px !important;
          }

          .hero-card-wrap {
            display: none !important;
          }
        }

        @media (max-width: 768px) {
          #home {
            min-height: auto !important;
          }

          .hero-stats {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─── SERVICES ────────────────────────────────────────────────────────────── */
/* ─── SERVICES ────────────────────────────────────────────────────────────── */
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
      "Global exhibitions and trade show participation",
      "Channel specific needs",
      "Multi-channel strategies including mainstream and ethnic"
    ],
    accent: C.goldLight,
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
    accent: "#8FB7FF",
  },
  {
    icon: Layers,
    title: "Greenfield Project Launch & Brownfield Transformation",
    desc: "Translate new venture concepts and existing business operations into scalable, commercially viable, and operationally efficient growth platforms through structured execution and long-range strategic planning.",
    points: [
      "GREENFIELD PROJECT LAUNCH",
      "New business and market opportunity development",
      "Business feasibility, commercial validation, and investment assessment",
      "Operating model design and business planning",
      "Entity setup, infrastructure development, and operational launch",
      "Early-stage go-to-market execution and channel activation",
      "3–5 year strategic growth planning and scale-up roadmap",
      "Portfolio expansion and geographic market entry strategy",
      "",
      "BROWNFIELD TRANSFORMATION",
      "Existing business operational assessment and diagnostics",
      "Business restructuring and performance turnaround initiatives",
      "Supply chain, capability, and process optimization",
      "Commercial transformation including pricing, margin, and portfolio enhancement",
      "Distribution restructuring and channel efficiency improvement",
      "Brand revitalization and market repositioning",
      "Digitalization, governance, and compliance enhancement",
      "Capacity expansion, productivity improvement, and cost optimization",
      "Integration of new systems, processes, and performance management frameworks",
      "Sustainable growth and transformation roadmap development for 3–5 years",
    ],
    accent: "#69D7B6",
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
    accent: "#C79BFF",
  },
  {
    icon: Users, // Feel free to swap this with standard Lucide icons like 'Briefcase', 'Handshake', or 'MapPin'
    title: "In-Country Distributor & Principal Representation",
    desc: "Based in Dubai, we provide on-ground representation for international distributors and their principals across the GCC, Middle East, South Asia, and Far East, enabling consistent, high-quality customer engagement without frequent travel.",
    points: [
      "Representing distributors and principals in local customer meetings and engagements across the GCC, Middle East, South Asia, and Far East",
      "Facilitating commercial discussions, follow-ups, and coordination with end customers on their behalf",
      "Maintaining continuous customer relationship engagement for international teams based outside the region",
      "Providing structured market intelligence, customer feedback, and opportunity validation from on-ground interactions",
      "Supporting deal progression through timely local coordination and sustained engagement",
      "Reducing international travel requirements while strengthening regional presence and responsiveness"
    ],
    accent: "#FF9F84", // A new complementary accent color block for this service
  },
];

function ServiceCard({ svc, index }) {
  const [ref, inView] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);
  const Icon = svc.icon;
  const isMobile = useIsMobile();

  const items = svc.points || svc.features || [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 110, damping: 18, delay: (index % 3) * 0.10 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(5,10,20,0.96)" : "rgba(255,255,255,0.78)",
        border: `1px solid ${hovered ? svc.accent : "rgba(5,10,20,0.06)"}`,
        borderRadius: 22,
        padding: 36,
        transition: "transform 0.35s ease, background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
        transform: hovered && !isMobile ? "translateY(-8px)" : "none",
        boxShadow: hovered
          ? `0 24px 60px rgba(5,10,20,0.22), 0 0 0 1px ${svc.accent}22, inset 0 0 40px ${svc.accent}10`
          : "0 4px 18px rgba(5,10,20,0.05)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        willChange: "transform",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "auto -30px -40px auto",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${svc.accent}20 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
          pointerEvents: "none",
        }}
      />

      <div style={{ width: 54, height: 54, borderRadius: 16, background: hovered ? `${svc.accent}18` : `${svc.accent}10`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, transition: "background 0.3s" }}>
        <Icon size={24} color={svc.accent} strokeWidth={1.8} />
      </div>

      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: hovered ? C.white : C.obsidian, margin: "0 0 12px", transition: "color 0.3s" }}>
        {svc.title}
      </h3>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: hovered ? "rgba(255,255,255,0.72)" : C.muted, lineHeight: 1.75, margin: "0 0 24px", transition: "color 0.3s" }}>
        {svc.desc}
      </p>

      <div style={{ borderTop: `1px solid ${hovered ? `${svc.accent}33` : "rgba(5,10,20,0.06)"}`, paddingTop: 18 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: hovered ? svc.accent : C.muted, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14 }}>
          Operational Matrices
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: hovered ? "rgba(255,255,255,0.76)" : C.muted, transition: "color 0.3s" }}>
              <CheckCircle size={14} color={svc.accent} strokeWidth={2} style={{ flexShrink: 0 }} />
              {f}
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

/* ─── ABOUT ───────────────────────────────────────────────────────────────── */
function About() {
  const [ref, inView] = useReveal(0.1);

  const highlights = [
    {
      icon: Award,
      title: "Decade of Expertise",
      desc: "More than 30 years of experience in international business environments, market expansion, and operational growth.",
    },
    {
      icon: Globe,
      title: "65+ Country Network",
      desc: "Strong relationships with business leaders, partners, and decision-makers across global markets.",
    },
    {
      icon: ShieldCheck,
      title: "Brownfield & Greenfield",
      desc: "We strengthen existing businesses and help build new ventures with a structured, practical approach.",
    },
    {
      icon: TrendingUp,
      title: "Measurable Growth",
      desc: "Focused on commercial clarity, sustainable scaling, and long-term business performance.",
    },
    {
      icon: Globe,
      title: "International Expansion",
      desc: "Proven execution across global landscapes, successfully entering 12 new countries and markets.",
    },
    {
      icon: Target,
      title: "Greenfield Success Rate",
      desc: "Delivering commercial targets on schedule with an 83% success rate for newly built ventures.",
    },
  ];

  return (
    <section
      id="about"
      style={{
        background: C.obsidian,
        padding: "110px 5vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          border: "1px solid rgba(255,215,0,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -180,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          border: "1px solid rgba(255,215,0,0.06)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 72, alignItems: "center" }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 90, damping: 18 }}
            className="about-left"
          >
            <div
              style={{
                display: "inline-block",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                color: C.goldLight,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 18,
                padding: "6px 18px",
                background: `${C.gold}15`,
                borderRadius: 100,
              }}
            >
              Who We Are
            </div>

            <h2
              className="about-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(30px, 3.8vw, 52px)",
                fontWeight: 700,
                color: C.white,
                lineHeight: 1.15,
                margin: "0 0 16px",
              }}
            >
              Route to Global Market,              <br />
              <span style={{
                fontSize: "clamp(15px, 1.6vw, 26px)",
                fontWeight: 350, color: C.goldLight, fontStyle: "italic"
              }}>International Business Management</span>
            </h2>

            <p
              className="about-text"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.85,
                margin: "0 0 18px",
                maxWidth: 620,
              }}
            >
              JAK Positivity partners with businesses to drive sustainable growth across global and domestic markets. Our expertise spans across but not limited to market entry, International business partnership development, Revamping product portfolio matching to regional needs,  route-to-market strategy, distribution design, product and packaging compliance, packaging solutions by channels, and commercial execution.                      </p>

            <p
              className="about-text"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.85,
                margin: "0 0 34px",
                maxWidth: 620,
              }}
            >
              We help companies navigate the complexities of international markets by identifying the right opportunities, developing the right product portfolio, and connecting them with suitable strategic partners and distribution networks across diverse regions. Beyond business development, we provide strategic and operational management support, including P&L oversight, performance improvement, brownfield expansion, and end-to-end business optimisation.
            </p>
            <p
              className="about-text"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.85,
                margin: "0 0 34px",
                maxWidth: 620,
              }}
            >
              Brownfield transformation initiatives have driven up to 45% growth in revenue and profitability through strategic modernization and operational optimization. Our trade and distribution expansion strategies have strengthened export volumes, channel reach, and international partnerships. By reducing costs, lead times, and process inefficiencies, businesses achieved greater operational efficiency and sustainable long-term value creation through improved CAGR, EBITDA growth, and enterprise performance.            </p>
            <p
              className="about-text"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.70)",
                lineHeight: 1.85,
                margin: "0 0 34px",
                maxWidth: 620,
              }}
            >
              Through disciplined execution, strategic transformation, and market-focused expansion, JAK Positivity enables businesses to unlock sustainable growth, stronger profitability, and long-term enterprise value.
              Because we believe in Jacking Up the Positivity.                      </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
              <MagneticButton onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                Partner With Us <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton
                onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
                variant="secondary"
              >
                Explore Services
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, type: "spring", stiffness: 90, damping: 18 }}
            className="about-right"
          >
            <div
              className="about-card"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,215,0,0.10)",
                borderRadius: 26,
                padding: 32,
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                boxShadow: "0 22px 60px rgba(0,0,0,0.22)",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  color: C.goldLight,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 22,
                }}
              >
                What Defines Us
              </div>

              <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {highlights.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 18,
                        padding: 20,
                        minHeight: 170,
                        display: "flex",
                        flexDirection: "column",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(255,215,0,0.08)",
                          border: "1px solid rgba(255,215,0,0.14)",
                        }}
                      >
                        <Icon size={22} color={C.goldLight} strokeWidth={1.8} />
                      </div>

                      <div>
                        <div
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 18,
                            fontWeight: 700,
                            color: C.white,
                            marginBottom: 8,
                            lineHeight: 1.25,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 14,
                            color: "rgba(255,255,255,0.66)",
                            lineHeight: 1.7,
                          }}
                        >
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 42px !important;
          }

          .about-left {
            text-align: center;
          }

          .about-left .about-text {
            margin-left: auto !important;
            margin-right: auto !important;
            text-align: left;
          }

          .about-right {
            max-width: 680px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          #about {
            padding: 84px 5vw !important;
          }

          .about-card {
            padding: 22px !important;
            border-radius: 22px !important;
          }

          .about-stats {
            grid-template-columns: 1fr !important;
          }

          .about-left {
            text-align: left;
          }

          .about-title {
            font-size: 34px !important;
            line-height: 1.2 !important;
          }

          .about-text {
            font-size: 15px !important;
            line-height: 1.8 !important;
          }
        }
      `}</style>
    </section>
  );
}
/* ─── RESULTS / TESTIMONIALS ──────────────────────────────────────────────── */
const TESTIMONIALS = [
  { name: "Amara Nwosu", role: "CEO, NovaTech Africa", text: "JAK Positivity executed our tri-regional expansion script flawlessly within 11 months. Their network assets are unprecedented.", signature: "NW" },
  { name: "David Chen", role: "MD, AsiaLink Corp", text: "Exceptional quantitative risk insulation frameworks. They corrected critical legal positioning vectors ahead of market entry.", signature: "DC" },
  { name: "Sophie Laurent", role: "Founder, Maison Lumière", text: "They operate like an ultra-luxury tactical unit rather than a consulting vendor. Our Middle East alpha capture loop has yielded unprecedented scale.", signature: "SL" }
];

function Results() {
  const [ref, inView] = useReveal(0.1);
  return (
    <section id="results" style={{ background: C.offWhite, padding: "100px 5vw" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, padding: "6px 18px", background: `${C.gold}15`, borderRadius: 100 }}>Client Results</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: C.obsidian, margin: "0 0 16px" }}>What Our Clients Say</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: C.muted, maxWidth: 500, margin: "0 auto" }}>Real outcomes for real businesses across every continent.</p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {TESTIMONIALS.map((t, i) => {
            const [tRef, tInView] = useReveal(0.1);
            return (
              <motion.div
                key={t.name}
                ref={tRef}
                initial={{ opacity: 0, y: 40 }}
                animate={tInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.15, type: "spring", stiffness: 90, damping: 18 }}
                style={{ background: C.white, border: `1px solid rgba(5,10,20,0.08)`, borderRadius: 20, padding: 36, boxShadow: "0 4px 24px rgba(5,10,20,0.06)" }}
              >
                <div style={{ display: "flex", gap: 3, marginBottom: 24 }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={15} color={C.goldLight} fill={C.goldLight} />)}
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: C.muted, lineHeight: 1.75, margin: "0 0 28px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.obsidian}, ${C.slateLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.goldLight }}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: C.obsidian }}>{t.name}</div>
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

/* ─── CONTACT ────────────────────────────────────────────────────────────── */
function Contact() {
  const [ref, inView] = useReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Track specific validation errors across all fields
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Dynamically clear the specific field error when typing or selecting
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    
    // Name Validation
    if (!form.name.trim()) {
      tempErrors.name = "Full name is required";
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    // Service Dropdown Validation
    if (!form.service) {
      tempErrors.service = "Please select a service of interest";
    }

    // Message Textarea Validation
    if (!form.message.trim()) {
      tempErrors.message = "Please write your message or inquiry details";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    
    // Stop form submission if UI local validation checks fail
    if (!validateForm()) return;

    setStatus("loading");

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
        to_name: "JAK Positivity Team",
      });

      setStatus("success");
      setForm({ name: "", email: "", service: "", message: "" });
      setErrors({});
    } catch (err) {
      console.error("EmailJS error:", err);
      if (EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID") {
        setErrorMsg("EmailJS is not yet configured. Please update EMAILJS_CONFIG at the top of the file with your credentials.");
      } else {
        setErrorMsg("Something went wrong. Please try again or contact us directly.");
      }
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "14px 18px",
    color: C.white,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s",
    touchAction: "manipulation",
    WebkitTapHighlightColor: "transparent",
  };

  const labelStyle = { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.05em", display: "block", marginBottom: 8 };

  return (
    <section id="contact" style={{ background: C.obsidian, padding: "100px 5vw", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -300, left: -200, width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, rgba(255,215,0,0.07) 0%, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,10,20,0.0), rgba(5,10,20,0.26))", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, type: "spring", stiffness: 90, damping: 18 }} style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-block", fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.goldLight, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, padding: "6px 18px", background: `${C.gold}15`, borderRadius: 100 }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, color: C.white, margin: "0 0 16px" }}>Book Your Free Consultation</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.55)", maxWidth: 520, margin: "0 auto" }}>
            Tell us about your global ambitions. We'll respond within 24 hours with a tailored approach.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 56, alignItems: "start" }} className="contact-grid">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, type: "spring", stiffness: 100, damping: 18 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: C.white, marginBottom: 32 }}>Let's talk global growth.</div>
            {[
              { icon: Mail, label: "Primary Email", value: "info@jakpositivity.com" },
              { icon: Mail, label: "Secondary Email", value: "naveedkhan@jakpositivity.com" },
              { icon: Phone, label: "Phone", value: "+971 50 413 1572" },
              { icon: MapPin, label: "HQ", value: "Dubai. Toronto. Islamabad" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: "flex", gap: 18, alignItems: "flex-start", marginBottom: 28 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `${C.gold}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={C.goldLight} strokeWidth={1.8} />
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)" }}>{value}</div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 14, marginTop: 40 }}>
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <div
                  key={i}
                  style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = `${C.gold}20`)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                >
                  <Icon size={17} color="rgba(255,255,255,0.5)" strokeWidth={1.8} />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 100, damping: 18 }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "40px 36px", backdropFilter: "blur(30px)", WebkitBackdropFilter: "blur(30px)" }}>
              {status === "success" ? (
                <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: `${C.gold}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <CheckCircle size={36} color={C.goldLight} />
                  </div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 12 }}> Thank you! Our team will be in touch within 24 hours for Initial discussions.</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                    Thank you! Our team will be in touch within 24 hours with a personalised strategy brief.
                  </p>
                  <MagneticButton onClick={() => setStatus("idle")} variant="secondary" style={{ marginTop: 28 }}>
                    Send Another
                  </MagneticButton>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }} className="form-grid">
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        style={{
                          ...inputStyle,
                          borderColor: errors.name ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)"
                        }}
                        onFocus={(e) => (e.target.style.borderColor = errors.name ? "rgb(239, 68, 68)" : C.goldLight)}
                        onBlur={(e) => (e.target.style.borderColor = errors.name ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)")}
                      />
                      {errors.name && (
                        <div style={{ color: "#FCA5A5", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 6, paddingLeft: 2 }}>
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        style={{
                          ...inputStyle,
                          borderColor: errors.email ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)"
                        }}
                        onFocus={(e) => (e.target.style.borderColor = errors.email ? "rgb(239, 68, 68)" : C.goldLight)}
                        onBlur={(e) => (e.target.style.borderColor = errors.email ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)")}
                      />
                      {errors.email && (
                        <div style={{ color: "#FCA5A5", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 6, paddingLeft: 2 }}>
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ marginBottom: 20 }}>
                    <label style={labelStyle}>Service of Interest *</label>
                    <select
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      style={{
                        ...inputStyle,
                        borderColor: errors.service ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = errors.service ? "rgb(239, 68, 68)" : C.goldLight)}
                      onBlur={(e) => (e.target.style.borderColor = errors.service ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)")}
                    >
                      <option value="" disabled style={{ background: C.obsidian }}>Select a service…</option>
                      <option value="International Business Expansion" style={{ background: C.obsidian }}>International Business Expansion</option>
                      <option value="International Business Management" style={{ background: C.obsidian }}>International Business Management</option>
                      <option value="Market Entry Strategy" style={{ background: C.obsidian }}>Market Entry Strategy</option>
                      <option value="Global Networking" style={{ background: C.obsidian }}>Global Networking</option>
                      <option value="Packaging Compliance" style={{ background: C.obsidian }}>Packaging Compliance</option>
                      <option value="Product Portfolio" style={{ background: C.obsidian }}>Product Portfolio</option>
                      <option value="Long Term Business Growth Advisory" style={{ background: C.obsidian }}>Long Term Business Growth Advisory</option>
                      <option value="Global Exhibitions End to End" style={{ background: C.obsidian }}>Global Exhibitions End to End</option>
                      <option value="Brown Field Venture Transformation" style={{ background: C.obsidian }}>Brown Field Venture Transformation</option>
                      <option value="Green Field Launch" style={{ background: C.obsidian }}>Green Field Launch</option>
                      <option value="M&A, Joint Venture Planning and Execution" style={{ background: C.obsidian }}>M&A, Joint Venture Planning and Execution</option>
                      <option value="General Inquiry" style={{ background: C.obsidian }}>General Inquiry</option>
                    </select>
                    {errors.service && (
                      <div style={{ color: "#FCA5A5", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 6, paddingLeft: 2 }}>
                        {errors.service}
                      </div>
                    )}
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={labelStyle}>Your Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business, target markets, and goals…"
                      style={{ 
                        ...inputStyle, 
                        borderColor: errors.message ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)",
                        resize: "vertical", 
                        minHeight: 130, 
                        lineHeight: 1.65 
                      }}
                      onFocus={(e) => (e.target.style.borderColor = errors.message ? "rgb(239, 68, 68)" : C.goldLight)}
                      onBlur={(e) => (e.target.style.borderColor = errors.message ? "rgba(239, 68, 68, 0.5)" : "rgba(255,255,255,0.12)")}
                    />
                    {errors.message && (
                      <div style={{ color: "#FCA5A5", fontSize: 12, fontFamily: "'DM Sans', sans-serif", marginTop: 6, paddingLeft: 2 }}>
                        {errors.message}
                      </div>
                    )}
                  </div>

                  {status === "error" && (
                    <div style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "12px 16px", marginBottom: 20, fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#FCA5A5" }}>
                      {errorMsg || "An error occurred. Please try again."}
                    </div>
                  )}

                  <MagneticButton
                    type="submit"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      padding: "16px 32px",
                      background: status === "loading" ? "rgba(184,134,11,0.52)" : `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                      color: C.obsidian,
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${C.obsidian}`, borderTopColor: "transparent" }}
                        />
                        Sending…
                      </>
                    ) : (
                      <><Send size={16} /> Send My Enquiry</>
                    )}
                  </MagneticButton>
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
    <footer style={{ background: "#07111E", padding: "48px 5vw 32px", borderTop: `1px solid rgba(255,215,0,0.12)` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24, marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Globe size={17} color={C.obsidian} strokeWidth={2.2} />
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

/* ─── APP ────────────────────────────────────────────────────────────────── */
function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500;1,700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.obsidian}; }
        ::selection { background: ${C.gold}55; color: ${C.white}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.obsidian}; }
        ::-webkit-scrollbar-thumb { background: ${C.gold}60; border-radius: 3px; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: ${C.obsidian}; color: ${C.white}; }
        button, a, input, textarea, select {
          -webkit-tap-highlight-color: transparent;
        }
        @media (max-width: 768px) {
          .nav-mobile { display: block !important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Results />
      <Contact />
      <Footer />
    </>
  );
}
export default App;