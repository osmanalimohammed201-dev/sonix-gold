import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonix — Deconstruct Sound" },
      {
        name: "description",
        content:
          "Sonix premium headphones. Bespoke acoustics, absolute silence, limitless battery. Pre-order the future of sound.",
      },
      { property: "og:title", content: "Sonix — Deconstruct Sound" },
      {
        property: "og:description",
        content: "Premium headphones engineered for spatial audio, lossless playback, and active cancellation.",
      },
    ],
  }),
  component: Landing,
});

const VIDEO_A = "https://res.cloudinary.com/ddhlmtbg7/video/upload/v1781715113/v2_awv-65ad9d05562d3b6b_cw0bof.mp4";
const VIDEO_B = VIDEO_A; // headphones1.mp4 fallback to same asset

function Landing() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const heroA = useRef<HTMLVideoElement>(null);
  const heroB = useRef<HTMLVideoElement>(null);
  const specsVideo = useRef<HTMLVideoElement>(null);

  // Typewriter: "Deconstruct" then newline "Sound."
  useEffect(() => {
    const full = ["Deconstruct", "Sound."];
    const joined = full.join("\n");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(joined.slice(0, i));
      if (i >= joined.length) {
        clearInterval(id);
        setTimeout(() => setTypingDone(true), 250);
      }
    }, 95);
    return () => clearInterval(id);
  }, []);


  // Specs circle reveal
  const onSpecsEnter = () => specsVideo.current?.play().catch(() => {});
  const onSpecsLeave = () => {
    const v = specsVideo.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  const [linePart1, linePart2] = typed.split("\n");

  return (
    <div className="jg-root">
      <style>{css}</style>

      {/* NAV */}
      <nav className="jg-nav">
        <div className="jg-logo">Sonix</div>
        <div className="jg-nav-links">
          <a href="#architecture">Architecture</a>
          <a href="#acoustics">Acoustics</a>
          <a href="#support">Support</a>
          <a href="#preorder" className="jg-nav-cta">Pre-Order</a>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="jg-hero"
      >
        <div className="jg-hero-top">
          <h1 className="jg-headline">
            <span className="jg-headline-line">{linePart1 || "\u00A0"}</span>
            <span className="jg-headline-line jg-gold">
              {linePart2 || ""}
              <span className="jg-cursor" aria-hidden>|</span>
            </span>
          </h1>
          <p className={`jg-hero-sub ${typingDone ? "jg-in" : ""}`}>
            An obsession with detail. Hand-machined acoustic chambers, magnetic
            planar drivers, and a titanium frame engineered for a lifetime of
            listening.
          </p>
          <a
            href="#preorder"
            className={`jg-pill ${typingDone ? "jg-in" : ""}`}
          >
            Reserve Yours →
          </a>
        </div>

        <div className="jg-hero-media">
          <video
            ref={heroA}
            src={VIDEO_A}
            autoPlay
            muted
            loop
            playsInline
            className="jg-hero-video jg-hero-video-a"
          />
          <video
            ref={heroB}
            src={VIDEO_B}
            autoPlay
            muted
            loop
            playsInline
            className="jg-hero-video jg-hero-video-b"
          />
          <div className="jg-hero-vignette" />
        </div>

        <aside className={`jg-hero-bottom ${typingDone ? "jg-in" : ""}`}>
          <div className="jg-hud-title">SYSTEM · ACTIVE</div>
          <ul>
            <li><span className="jg-dot" /> Spatial Audio</li>
            <li><span className="jg-dot" /> Lossless Playback</li>
            <li><span className="jg-dot" /> Active Cancellation</li>
          </ul>
        </aside>
      </section>

      {/* MARQUEE */}
      <div className="jg-marquee">
        <div className="jg-marquee-track">
          {Array.from({ length: 2 }).map((_, k) => (
            <div className="jg-marquee-group" key={k}>
              <span>★ RED DOT DESIGN AWARD 2026</span>
              <span>★ WHAT HI-FI 5-STAR</span>
              <span>★ STEREOPHILE EDITORS' CHOICE</span>
              <span>★ IF GOLD AWARD</span>
              <span>★ ABSOLUTE SOUND GOLDEN EAR</span>
              <span>★ TIME BEST INVENTIONS</span>
            </div>
          ))}
        </div>
      </div>

      {/* GALLERY */}
      <section className="jg-section jg-gallery-section">
        <div className="jg-eyebrow">Gallery</div>
        <h2 className="jg-h2">Crafted to be seen.</h2>
        <div className="jg-gallery-grid">
          {[
            {
              img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=85",
              t: "Titanium Frame",
              d: "Aerospace-grade alloy, hand-brushed for a satin finish that ages with grace.",
              tag: "Material",
            },
            {
              img: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1600&q=85",
              t: "Acoustic Chambers",
              d: "CNC-milled aluminium cups tuned over four hundred listening sessions.",
              tag: "Engineering",
            },
            {
              img: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1600&q=85",
              t: "Studio Pedigree",
              d: "Reference-grade response, mastered with engineers from Abbey Road.",
              tag: "Sound",
            },
            {
              img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=85",
              t: "Endless Comfort",
              d: "Memory foam wrapped in vegetable-tanned leather. 248 grams, all day.",
              tag: "Comfort",
            },
          ].map((c) => (
            <article className="jg-gcard" key={c.t}>
              <div className="jg-gcard-media">
                <img src={c.img} alt={c.t} loading="lazy" />
              </div>
              <div className="jg-gcard-body">
                <span className="jg-gcard-tag">{c.tag}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="architecture" className="jg-section">
        <div className="jg-eyebrow">Architecture</div>
        <h2 className="jg-h2">Three pillars. One obsession.</h2>
        <div className="jg-grid">
          {[
            {
              t: "Bespoke Acoustics",
              d: "40mm beryllium drivers tuned over 400 listening sessions. Each pair signed by the engineer who voiced it.",
            },
            {
              t: "Absolute Silence",
              d: "Eight-microphone adaptive cancellation isolates you from 32Hz to 8kHz of ambient noise — without compromising tone.",
            },
            {
              t: "Limitless Battery",
              d: "60 hours of lossless playback. Five minutes on the cradle returns a full day of sound.",
            },
          ].map((f) => (
            <div className="jg-card" key={f.t}>
              <div className="jg-card-num">0{["Bespoke Acoustics","Absolute Silence","Limitless Battery"].indexOf(f.t) + 1}</div>
              <h3>{f.t}</h3>
              <p>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPECS */}
      <section id="acoustics" className="jg-section jg-specs">
        <div className="jg-specs-left">
          <div className="jg-eyebrow">Acoustics</div>
          <h2 className="jg-h2">Engineered down to the micron.</h2>
          <dl className="jg-spec-list">
            {[
              ["Driver", "40mm Beryllium Planar"],
              ["Frequency", "5 Hz – 40 kHz"],
              ["Impedance", "32 Ω"],
              ["THD", "< 0.05%"],
              ["Weight", "248 g"],
              ["Materials", "Aerospace Titanium · Vegetable-tanned Leather"],
              ["Battery", "60 h Lossless"],
              ["Charging", "USB-C · Magnetic Cradle"],
            ].map(([k, v]) => (
              <div className="jg-spec-row" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div
          className="jg-specs-circle"
          onMouseEnter={onSpecsEnter}
          onMouseLeave={onSpecsLeave}
        >
          <video
            ref={specsVideo}
            src={VIDEO_A}
            muted
            loop
            playsInline
            className="jg-specs-video"
          />
          <div className="jg-specs-hint">HOVER</div>
        </div>
      </section>

      {/* PREORDER CTA */}
      <section id="preorder" className="jg-section jg-cta">
        <h2 className="jg-h2">First production run. 500 pairs.</h2>
        <p>Reserve now — ships Spring 2027.</p>
        <a href="#" className="jg-pill jg-in">Reserve Yours →</a>
      </section>

      {/* FOOTER */}
      <footer id="support" className="jg-footer">
        <div>© 2026 Sonix Audio Labs</div>
        <div className="jg-footer-links">
          <a href="#">Support</a>
          <a href="#">Press</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}

const css = `
.jg-root {
  background: #0a0a0a;
  color: #f4f1ea;
  font-family: 'Inter', system-ui, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}
.jg-root a { color: inherit; text-decoration: none; }

/* NAV */
.jg-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 22px 48px;
  background: linear-gradient(to bottom, rgba(10,10,10,0.6), rgba(10,10,10,0));
  backdrop-filter: blur(6px);
}
.jg-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700; letter-spacing: 0.14em; font-size: 22px;
  text-transform: uppercase;
}
.jg-nav-links { display: flex; gap: 36px; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }
.jg-nav-links a { opacity: 0.75; transition: opacity .2s; }
.jg-nav-links a:hover { opacity: 1; }
.jg-nav-cta { color: #DFB92D !important; opacity: 1 !important; }

/* HERO */
.jg-hero {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 100px 48px 40px;
}
.jg-hero-top {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.jg-hero-media {
  position: relative;
  width: 100%;
  max-width: 960px;
  aspect-ratio: 16/9;
  margin: 32px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.jg-hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), filter 1.2s ease;
}
.jg-hero-video-a {
  opacity: 1;
  filter: brightness(0.95) contrast(1);
}
.jg-hero-video-b {
  opacity: 0;
  filter: brightness(1.45) contrast(1.25) saturate(0.65);
}
.jg-hero:hover .jg-hero-video-a { opacity: 0; }
.jg-hero:hover .jg-hero-video-b { opacity: 1; }

.jg-hero-media::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  opacity: 0;
  transition: opacity 1s ease;
  pointer-events: none;
  z-index: 2;
  background-image:
    linear-gradient(rgba(223,185,45,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(223,185,45,0.06) 1px, transparent 1px);
  background-size: 48px 48px;
}
.jg-hero:hover .jg-hero-media::before { opacity: 1; }

.jg-hero-bottom {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 32px;
  font-family: 'Space Grotesk', sans-serif;
  border: 1px solid rgba(223,185,45,0.25);
  background: rgba(10,10,10,0.45);
  backdrop-filter: blur(10px);
  padding: 16px 28px;
  border-radius: 6px;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 1s ease .35s, transform 1s ease .35s;
}
.jg-hero-bottom.jg-in { opacity: 1; transform: translateY(0); }
.jg-hero-bottom .jg-hud-title { font-size: 11px; letter-spacing: 0.25em; color: #DFB92D; margin-right: 8px; }
.jg-hero-bottom ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 24px; font-size: 13px; }
.jg-hero-bottom li { display: flex; align-items: center; gap: 10px; color: rgba(244,241,234,0.85); }

.jg-headline {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(44px, 7vw, 96px);
  line-height: 0.95; font-weight: 500;
  letter-spacing: -0.03em; margin: 0;
  display: flex; flex-direction: column;
  min-height: 1.9em;
}
.jg-headline-line { display: block; white-space: pre; }
.jg-gold { color: #DFB92D; }
.jg-cursor {
  display: inline-block; margin-left: 4px; color: #DFB92D;
  animation: jg-blink 1s steps(2) infinite;
}
@keyframes jg-blink { 50% { opacity: 0; } }

.jg-hero-sub {
  margin: 22px 0 28px; max-width: 520px;
  font-size: 16px; line-height: 1.6; color: rgba(244,241,234,0.7);
  opacity: 0; transform: translateY(12px); transition: opacity .8s ease, transform .8s ease;
}
.jg-pill {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 14px 30px; border-radius: 999px;
  background: #DFB92D; color: #0a0a0a;
  font-weight: 600; font-size: 14px; letter-spacing: 0.04em;
  opacity: 0; transform: translateY(12px); transition: opacity .8s ease .15s, transform .8s ease .15s, background .2s;
}
.jg-pill:hover { background: #f0cc3f; }
.jg-in { opacity: 1 !important; transform: translateY(0) !important; }

/* MARQUEE */
.jg-marquee {
  background: #DFB92D; color: #0a0a0a;
  overflow: hidden; padding: 14px 0;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
}
.jg-marquee-track { display: flex; gap: 48px; width: max-content; animation: jg-scroll 40s linear infinite; }
.jg-marquee-group { display: flex; gap: 48px; padding-right: 48px; }
@keyframes jg-scroll { to { transform: translateX(-50%); } }

/* SECTIONS */
.jg-section { max-width: 1280px; margin: 0 auto; padding: 140px 48px; }
.jg-eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 12px; letter-spacing: 0.3em; color: #DFB92D; text-transform: uppercase; margin-bottom: 20px; }
.jg-h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(36px, 5vw, 64px); font-weight: 500;
  line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 60px;
}

/* FEATURE CARDS */
.jg-gallery-section { padding-top: 120px; padding-bottom: 40px; }
.jg-gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}
.jg-gcard {
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: #111;
  border: 1px solid rgba(244,241,234,0.06);
  transition: transform .5s cubic-bezier(.2,.7,.2,1), border-color .5s ease, box-shadow .5s ease;
}
.jg-gcard:hover {
  transform: translateY(-6px);
  border-color: rgba(223,185,45,0.35);
  box-shadow: 0 30px 80px -30px rgba(0,0,0,0.8);
}
.jg-gcard-media {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #0a0a0a;
}
.jg-gcard-media::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(10,10,10,0) 55%, rgba(10,10,10,0.85) 100%);
  pointer-events: none;
}
.jg-gcard-media img {
  width: 100%; height: 100%; object-fit: cover; display: block;
  transition: transform 1.2s cubic-bezier(.2,.7,.2,1);
  filter: brightness(0.95) contrast(1.05);
}
.jg-gcard:hover .jg-gcard-media img { transform: scale(1.06); }
.jg-gcard-body { padding: 28px 32px 32px; }
.jg-gcard-tag {
  display: inline-block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase;
  color: #DFB92D; margin-bottom: 14px;
}
.jg-gcard h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px; font-weight: 500; margin: 0 0 10px; letter-spacing: -0.01em;
}
.jg-gcard p { color: rgba(244,241,234,0.65); font-size: 14px; line-height: 1.65; margin: 0; }

.jg-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.jg-card {
  border: 1px solid rgba(244,241,234,0.08);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0));
  padding: 40px 32px; border-radius: 4px;
  transition: transform .4s ease, border-color .4s ease, background .4s ease;
}
.jg-card:hover {
  transform: translateY(-8px);
  border-color: rgba(223,185,45,0.7);
  background: linear-gradient(180deg, rgba(223,185,45,0.05), rgba(255,255,255,0));
}
.jg-card-num { font-family: 'Space Grotesk', sans-serif; color: #DFB92D; font-size: 13px; letter-spacing: 0.2em; margin-bottom: 40px; }
.jg-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 22px; font-weight: 500; margin: 0 0 14px; }
.jg-card p { color: rgba(244,241,234,0.65); font-size: 14px; line-height: 1.65; margin: 0; }

/* SPECS */
.jg-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
.jg-spec-list { margin: 0; padding: 0; border-top: 1px solid rgba(244,241,234,0.1); }
.jg-spec-row {
  display: grid; grid-template-columns: 180px 1fr; gap: 24px;
  padding: 18px 0; border-bottom: 1px solid rgba(244,241,234,0.1);
}
.jg-spec-row dt { font-family: 'Space Grotesk', sans-serif; color: rgba(244,241,234,0.55); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }
.jg-spec-row dd { margin: 0; font-size: 15px; color: #f4f1ea; }

.jg-specs-circle {
  position: relative; width: 100%; max-width: 460px; aspect-ratio: 1;
  margin: 0 auto; border-radius: 50%; overflow: hidden;
  border: 1px solid rgba(223,185,45,0.4);
  background: #050505; cursor: pointer;
  transition: transform .5s ease, border-color .5s ease, box-shadow .5s ease;
}
.jg-specs-circle:hover {
  transform: scale(1.03);
  border-color: #DFB92D;
  box-shadow: 0 0 80px rgba(223,185,45,0.25);
}
.jg-specs-video { width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .6s ease; }
.jg-specs-circle:hover .jg-specs-video { opacity: 1; }
.jg-specs-hint {
  position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  font-family: 'Space Grotesk', sans-serif; color: #DFB92D;
  letter-spacing: 0.4em; font-size: 14px; pointer-events: none;
  transition: opacity .4s ease;
}
.jg-specs-circle:hover .jg-specs-hint { opacity: 0; }

/* CTA */
.jg-cta { text-align: center; }
.jg-cta p { color: rgba(244,241,234,0.65); margin: -40px 0 36px; }

/* FOOTER */
.jg-footer {
  border-top: 1px solid rgba(244,241,234,0.08);
  padding: 32px 48px;
  display: flex; justify-content: space-between; align-items: center;
  font-size: 13px; color: rgba(244,241,234,0.5);
}
.jg-footer-links { display: flex; gap: 28px; }
.jg-footer-links a:hover { color: #DFB92D; }

@media (max-width: 900px) {
  .jg-nav { padding: 18px 22px; }
  .jg-nav-links { gap: 18px; font-size: 11px; }
  .jg-hero-content { grid-template-columns: 1fr; padding: 100px 22px 40px; }
  .jg-hud { min-width: 0; }
  .jg-section { padding: 80px 22px; }
  .jg-grid { grid-template-columns: 1fr; }
  .jg-gallery-grid { grid-template-columns: 1fr; }
  .jg-specs { grid-template-columns: 1fr; gap: 50px; }
  .jg-spec-row { grid-template-columns: 120px 1fr; }
  .jg-footer { padding: 24px 22px; flex-direction: column; gap: 14px; }
}
`;