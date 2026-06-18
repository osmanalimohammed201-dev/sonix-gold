import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import headphones3d from "@/assets/headphones-3d.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonix — Deconstruct Sound" },
      {
        name: "description",
        content:
          "Sonix premium wireless headphones. Spatial audio, 60h battery, adaptive noise cancellation. Pre-order the future of sound.",
      },
      { property: "og:title", content: "Sonix — Deconstruct Sound" },
      {
        property: "og:description",
        content: "Premium headphones engineered for spatial audio, lossless playback, and active cancellation.",
      },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content:
          "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=85",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "Sonix Headphones",
          description:
            "Premium wireless over-ear headphones with spatial audio, lossless playback, and adaptive noise cancellation.",
          brand: { "@type": "Brand", name: "Sonix" },
          offers: {
            "@type": "Offer",
            price: "799",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
          },
        }),
      },
    ],
  }),
  component: Landing,
});

const VIDEO_A =
  "https://res.cloudinary.com/ddhlmtbg7/video/upload/v1781715113/v2_awv-65ad9d05562d3b6b_cw0bof.mp4";

const HERO_IMG =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1400&q=90";

function Landing() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollY, setScrollY] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [exploded, setExploded] = useState(false);
  const [color, setColor] = useState("Onyx");
  const [ncOn, setNcOn] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const dragRef = useRef<{ x: number; r: number } | null>(null);

  // E-commerce state
  const [cart, setCart] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const pushToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((t) => (t === msg ? null : t)), 2200);
  };
  const PRICE = 799;
  const ORIGINAL = 999;
  const DISCOUNT = Math.round((1 - PRICE / ORIGINAL) * 100);
  const deliveryDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    const e = new Date();
    e.setDate(e.getDate() + 7);
    const fmt = (x: Date) => x.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${fmt(d)} – ${fmt(e)}`;
  })();

  // Loader
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1200);
    return () => clearTimeout(t);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!loaded) return;
    const joined = "Deconstruct\nSound.";
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(joined.slice(0, i));
      if (i >= joined.length) {
        clearInterval(id);
        setTimeout(() => setTypingDone(true), 200);
      }
    }, 85);
    return () => clearInterval(id);
  }, [loaded]);

  // Scroll handler
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(y);
      setProgress(h > 0 ? (y / h) * 100 : 0);
      setShowTop(y > 600);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("jg-revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loaded]);

  // Theme
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // 360 drag
  const onViewerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, r: rotation };
    (e.target as Element).setPointerCapture(e.pointerId);
  };
  const onViewerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    setRotation(dragRef.current.r + dx * 0.6);
  };
  const onViewerUp = () => {
    dragRef.current = null;
  };

  const [linePart1, linePart2] = typed.split("\n");

  const colors: Record<string, string> = {
    Onyx: "#0a0a0a",
    Titanium: "#bdb6a8",
    Champagne: "#DFB92D",
    Midnight: "#1f2a44",
  };

  return (
    <div className={`jg-root jg-theme-${theme}`}>
      <style>{css}</style>

      {/* LOADER */}
      <div className={`jg-loader ${loaded ? "jg-loader-done" : ""}`} aria-hidden={loaded}>
        <div className="jg-loader-mark">SONIX</div>
        <div className="jg-loader-bar"><span /></div>
      </div>

      {/* PROGRESS BAR */}
      <div className="jg-progress" style={{ width: `${progress}%` }} />

      {/* NAV */}
      <nav className={`jg-nav ${scrollY > 30 ? "jg-nav-scrolled" : ""}`}>
        <a href="#top" className="jg-logo">Sonix</a>
        <div className="jg-nav-links">
          <a href="#highlights">Highlights</a>
          <a href="#viewer">360°</a>
          <a href="#specs">Specs</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
          <button
            className="jg-theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button
            className="jg-nav-icon"
            aria-label="Wishlist"
            onClick={() => { setWishlist(!wishlist); pushToast(wishlist ? "Removed from wishlist" : "Added to wishlist"); }}
          >
            <span className={wishlist ? "jg-heart jg-heart-on" : "jg-heart"}>♥</span>
          </button>
          <button className="jg-nav-icon jg-cart-btn" aria-label="Cart">
            <span>⛶</span>
            {cart > 0 && <span className="jg-cart-count">{cart}</span>}
          </button>
          <a href="#buy" className="jg-nav-cta">Buy Now</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="jg-hero">
        <div
          className="jg-hero-glow"
          style={{
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
          }}
        />
        <div className="jg-hero-top" data-reveal>
          <div className="jg-eyebrow">Sonix Pro · 2027</div>
          <h1 className="jg-headline">
            <span className="jg-headline-line">{linePart1 || "\u00A0"}</span>
            <span className="jg-headline-line jg-gold">
              {linePart2 || ""}
              <span className="jg-cursor" aria-hidden>|</span>
            </span>
          </h1>
          <p className={`jg-hero-sub ${typingDone ? "jg-in" : ""}`}>
            Hand-machined acoustic chambers. Magnetic planar drivers. A titanium
            frame engineered for a lifetime of listening.
          </p>
          <div className={`jg-hero-ctas ${typingDone ? "jg-in" : ""}`}>
            <a href="#buy" className="jg-pill">Buy Now · $799</a>
            <a href="#viewer" className="jg-pill-ghost">Explore in 3D →</a>
          </div>
        </div>

        <div
          className="jg-hero-media"
          style={{
            transform: `translate(${mouse.x * -10}px, ${mouse.y * -6}px)`,
          }}
        >
          <video
            src={VIDEO_A}
            autoPlay
            muted
            loop
            playsInline
            className="jg-hero-video"
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

        <div className="jg-scroll-cue" aria-hidden>SCROLL ↓</div>
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

      {/* HIGHLIGHTS */}
      <section id="highlights" className="jg-section" data-reveal>
        <div className="jg-eyebrow">Highlights</div>
        <h2 className="jg-h2">Everything you'd expect. Nothing you wouldn't.</h2>
        <div className="jg-hl-grid">
          {[
            { i: "◐", t: "Adaptive ANC", d: "32 Hz – 8 kHz cancellation, tuned in real time." },
            { i: "♪", t: "Spatial Audio", d: "Head-tracked Dolby Atmos with personal HRTF." },
            { i: "⚡", t: "60h Battery", d: "5 min charge → 8 hours of lossless playback." },
            { i: "✦", t: "Titanium Frame", d: "248g aerospace alloy, brushed by hand." },
            { i: "◉", t: "Touch Surface", d: "Capacitive temple — tap, slide, hold to control." },
            { i: "✧", t: "Lossless 24/192", d: "Hi-Res over USB-C, AAC + LDAC over Bluetooth 5.4." },
          ].map((h) => (
            <div className="jg-hl" key={h.t}>
              <div className="jg-hl-icon">{h.i}</div>
              <h3>{h.t}</h3>
              <p>{h.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NOISE CANCELLATION DEMO + BATTERY */}
      <section className="jg-section jg-duo" data-reveal>
        <div className="jg-panel">
          <div className="jg-eyebrow">Noise Cancellation</div>
          <h3 className="jg-h3">Silence on a switch.</h3>
          <div className={`jg-nc ${ncOn ? "jg-nc-on" : ""}`}>
            <div className="jg-nc-wave">
              {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
            <button className="jg-nc-toggle" onClick={() => setNcOn(!ncOn)}>
              <span className={`jg-switch ${ncOn ? "jg-switch-on" : ""}`}>
                <span />
              </span>
              <span>{ncOn ? "ANC ON · −38 dB" : "ANC OFF · ambient"}</span>
            </button>
          </div>
        </div>

        <div className="jg-panel">
          <div className="jg-eyebrow">Battery</div>
          <h3 className="jg-h3">Charge once. Play all week.</h3>
          <div className="jg-batt">
            <div className="jg-batt-ring">
              <svg viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" className="jg-batt-bg" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="jg-batt-fg"
                  style={{ strokeDashoffset: 326 * (1 - 0.87) }}
                />
              </svg>
              <div className="jg-batt-num"><b>87</b><span>%</span></div>
            </div>
            <ul className="jg-batt-list">
              <li><span>Playback</span><b>52h left</b></li>
              <li><span>Standby</span><b>21 days</b></li>
              <li><span>Quick charge</span><b>5 min → 8h</b></li>
            </ul>
          </div>
        </div>
      </section>

      {/* 360 VIEWER + HOTSPOTS */}
      <section id="viewer" className="jg-section" data-reveal>
        <div className="jg-eyebrow">360° Viewer</div>
        <h2 className="jg-h2">Turn it. Touch it. Take it apart.</h2>
        <div className="jg-viewer">
          <div
            className="jg-viewer-stage"
            onPointerDown={onViewerDown}
            onPointerMove={onViewerMove}
            onPointerUp={onViewerUp}
            onPointerCancel={onViewerUp}
          >
            <div
              className={`jg-viewer-img ${exploded ? "jg-exploded" : ""}`}
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              <img
                src={headphones3d}
                alt="Sonix headphones"
                draggable={false}
                style={{ filter: color === "Onyx" ? "none" : `hue-rotate(${color === "Midnight" ? 200 : color === "Champagne" ? 40 : 0}deg) saturate(${color === "Titanium" ? 0.2 : 1})` }}
              />
              {/* exploded layers */}
              <span className="jg-ex jg-ex-1" />
              <span className="jg-ex jg-ex-2" />
              <span className="jg-ex jg-ex-3" />

              {/* hotspots */}
              {[
                { id: "driver", x: 30, y: 45, t: "40mm Beryllium Driver" },
                { id: "mic", x: 62, y: 30, t: "8-mic ANC Array" },
                { id: "touch", x: 72, y: 55, t: "Touch Surface" },
                { id: "frame", x: 48, y: 18, t: "Titanium Headband" },
              ].map((h) => (
                <button
                  key={h.id}
                  className={`jg-hot ${activeHotspot === h.id ? "jg-hot-on" : ""}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onMouseEnter={() => setActiveHotspot(h.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                  aria-label={h.t}
                >
                  <span className="jg-hot-dot" />
                  <span className="jg-hot-label">{h.t}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="jg-viewer-controls">
            <div className="jg-viewer-hint">Drag to rotate</div>
            <div className="jg-viewer-actions">
              <button onClick={() => setRotation((r) => r - 45)}>↺ Rotate</button>
              <button onClick={() => setExploded(!exploded)}>
                {exploded ? "Reassemble" : "Exploded View"}
              </button>
            </div>
            <div className="jg-color-row">
              <span className="jg-eyebrow">Color · {color}</span>
              <div className="jg-swatches">
                {Object.entries(colors).map(([name, c]) => (
                  <button
                    key={name}
                    aria-label={name}
                    className={`jg-swatch ${color === name ? "jg-swatch-on" : ""}`}
                    style={{ background: c }}
                    onClick={() => setColor(name)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOUCH CONTROLS */}
      <section className="jg-section" data-reveal>
        <div className="jg-eyebrow">Touch Controls</div>
        <h2 className="jg-h2">Your fingertip is the remote.</h2>
        <div className="jg-touch-grid">
          {[
            { g: "Tap", t: "Play / Pause" },
            { g: "Double", t: "Skip Forward" },
            { g: "Slide ↑↓", t: "Volume" },
            { g: "Hold", t: "Voice Assistant" },
            { g: "Cup", t: "Conversation Mode" },
            { g: "Swipe →", t: "Switch Source" },
          ].map((t) => (
            <div key={t.t} className="jg-touch">
              <div className="jg-touch-g">{t.g}</div>
              <div className="jg-touch-t">{t.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="jg-section jg-gallery-section" data-reveal>
        <div className="jg-eyebrow">Gallery</div>
        <h2 className="jg-h2">Crafted to be seen.</h2>
        <div className="jg-gallery-grid">
          {[
            { img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1600&q=85", t: "Titanium Frame", d: "Aerospace-grade alloy, hand-brushed for a satin finish.", tag: "Material" },
            { img: "https://images.unsplash.com/photo-1545127398-14699f92334b?auto=format&fit=crop&w=1600&q=85", t: "Acoustic Chambers", d: "CNC-milled aluminium cups, tuned over 400 sessions.", tag: "Engineering" },
            { img: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1600&q=85", t: "Studio Pedigree", d: "Reference response, mastered with Abbey Road engineers.", tag: "Sound" },
            { img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=85", t: "Endless Comfort", d: "Memory foam in vegetable-tanned leather. 248 g.", tag: "Comfort" },
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

      {/* SPECS */}
      <section id="specs" className="jg-section" data-reveal>
        <div className="jg-eyebrow">Specifications</div>
        <h2 className="jg-h2">Engineered down to the micron.</h2>
        <dl className="jg-spec-list">
          {[
            ["Driver", "40mm Beryllium Planar"],
            ["Frequency", "5 Hz – 40 kHz"],
            ["Impedance", "32 Ω"],
            ["THD", "< 0.05%"],
            ["Weight", "248 g"],
            ["Materials", "Aerospace Titanium · Vegetable-tanned Leather"],
            ["Battery", "60 h Lossless · USB-C"],
            ["Wireless", "Bluetooth 5.4 · LDAC · AAC · SBC"],
            ["Microphones", "8 · Beamforming"],
            ["Warranty", "2 years international"],
          ].map(([k, v]) => (
            <div className="jg-spec-row" key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ACCESSORIES */}
      <section className="jg-section" data-reveal>
        <div className="jg-eyebrow">In the box · Accessories</div>
        <h2 className="jg-h2">Every detail accounted for.</h2>
        <div className="jg-acc-grid">
          {[
            { t: "Travel Case", d: "Hard-shell, magnetic close." , p: "Included" },
            { t: "Magnetic Cradle", d: "Wireless qi charge dock.", p: "Included" },
            { t: "USB-C Hi-Res Cable", d: "Braided, 1.5 m, OFC.", p: "Included" },
            { t: "Spare Earpads", d: "Vegetable-tanned leather.", p: "+$59" },
            { t: "Balanced 4.4mm Cable", d: "Audiophile lossless.", p: "+$89" },
            { t: "Airline Adapter", d: "Dual 3.5mm jack.", p: "+$19" },
          ].map((a) => (
            <div className="jg-acc" key={a.t}>
              <div>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </div>
              <span className="jg-acc-price">{a.p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="jg-section" data-reveal>
        <div className="jg-eyebrow">Compare</div>
        <h2 className="jg-h2">Side by side, the choice is clear.</h2>
        <div className="jg-compare">
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="jg-cmp-us">Sonix Pro</th>
                <th>Brand A</th>
                <th>Brand B</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Driver", "40mm Beryllium", "40mm Dynamic", "30mm Dynamic"],
                ["Battery", "60 h", "30 h", "40 h"],
                ["Lossless", "✓ USB-C + LDAC", "AAC only", "AptX"],
                ["ANC", "Adaptive 8-mic", "4-mic", "6-mic"],
                ["Weight", "248 g", "385 g", "254 g"],
                ["Warranty", "2 years", "1 year", "1 year"],
                ["Price", "$799", "$549", "$699"],
              ].map((row) => (
                <tr key={row[0]}>
                  <th>{row[0]}</th>
                  <td className="jg-cmp-us">{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="jg-section" data-reveal>
        <div className="jg-eyebrow">Reviews · 4.9 / 5</div>
        <h2 className="jg-h2">Loved by people who listen for a living.</h2>
        <div className="jg-reviews">
          {[
            { n: "Maya O.", r: "Mastering Engineer", q: "The most honest pair I've put on this year. Imaging is uncanny." },
            { n: "Daniel K.", r: "Composer", q: "Sub-bass without bloat. Highs without fatigue. Finally." },
            { n: "Ines R.", r: "Audio Reviewer", q: "Build quality belongs in a museum. ANC belongs in a cathedral." },
          ].map((r) => (
            <figure key={r.n} className="jg-review">
              <div className="jg-stars">★★★★★</div>
              <blockquote>"{r.q}"</blockquote>
              <figcaption>
                <b>{r.n}</b><span>{r.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WARRANTY & SUPPORT */}
      <section id="support" className="jg-section jg-duo" data-reveal>
        <div className="jg-panel">
          <div className="jg-eyebrow">Warranty</div>
          <h3 className="jg-h3">2 years, worldwide.</h3>
          <p>Every pair is covered against manufacturing defects for 24 months. Extend to 4 years with Sonix Care for $79.</p>
          <a href="#" className="jg-link">Register your pair →</a>
        </div>
        <div className="jg-panel">
          <div className="jg-eyebrow">Support</div>
          <h3 className="jg-h3">Real people, real fast.</h3>
          <p>24/7 chat with audio engineers. Average response: 3 minutes. No bots.</p>
          <a href="#contact" className="jg-link">Talk to support →</a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="jg-section" data-reveal>
        <div className="jg-eyebrow">FAQ</div>
        <h2 className="jg-h2">Questions, answered.</h2>
        <div className="jg-faq">
          {[
            { q: "When does Sonix Pro ship?", a: "First production run ships Spring 2027. Reserve now to secure a serial number." },
            { q: "Is it compatible with my phone?", a: "Yes — Bluetooth 5.4 with multipoint pairing for iOS, Android, macOS, and Windows." },
            { q: "Can I use them wired?", a: "Included USB-C cable supports 24-bit / 192 kHz lossless. Optional 4.4mm balanced cable for high-end DACs." },
            { q: "What's the return policy?", a: "30-day no-questions return with prepaid shipping, included with every order." },
            { q: "Can I replace the earpads?", a: "Yes. Magnetic mount, 10-second swap. Spares are vegetable-tanned leather." },
          ].map((f, i) => (
            <div key={f.q} className={`jg-faq-item ${openFaq === i ? "jg-faq-open" : ""}`}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                <span className="jg-faq-plus">{openFaq === i ? "−" : "+"}</span>
              </button>
              <div className="jg-faq-body"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* BUY NOW */}
      <section id="buy" className="jg-section jg-buy" data-reveal>
        <div className="jg-buy-right">
          <img
            src={HERO_IMG}
            alt="Sonix Pro"
            style={{ filter: color === "Onyx" ? "none" : `hue-rotate(${color === "Midnight" ? 200 : color === "Champagne" ? 40 : 0}deg) saturate(${color === "Titanium" ? 0.25 : 1})` }}
          />
          <span className="jg-discount-badge">−{DISCOUNT}%</span>
        </div>
        <div className="jg-buy-left">
          <div className="jg-eyebrow">Sonix Pro · {color}</div>
          <h2 className="jg-h2" style={{ marginBottom: 16 }}>Own the silence.</h2>

          <div className="jg-rate">
            <span className="jg-stars">★★★★★</span>
            <span className="jg-rate-num">4.9</span>
            <a href="#reviews" className="jg-rate-link">2,418 reviews</a>
          </div>

          <div className="jg-price-row">
            <span className="jg-price-now">${PRICE}</span>
            <span className="jg-price-was">${ORIGINAL}</span>
            <span className="jg-price-save">Save ${ORIGINAL - PRICE}</span>
          </div>

          <div className="jg-stock">
            <span className="jg-stock-dot" />
            <span><b>In stock</b> · Ready to ship</span>
          </div>

          <div className="jg-buy-section">
            <div className="jg-buy-label">Color · <b>{color}</b></div>
            <div className="jg-swatches">
              {Object.entries(colors).map(([name, c]) => (
                <button
                  key={name}
                  aria-label={name}
                  className={`jg-swatch ${color === name ? "jg-swatch-on" : ""}`}
                  style={{ background: c }}
                  onClick={() => setColor(name)}
                />
              ))}
            </div>
          </div>

          <div className="jg-buy-section">
            <div className="jg-buy-label">Quantity</div>
            <div className="jg-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease">−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="Increase">+</button>
            </div>
          </div>

          <div className="jg-delivery">
            <div><span className="jg-eyebrow-sm">Delivery</span><b>Free · {deliveryDate}</b></div>
            <div><span className="jg-eyebrow-sm">Returns</span><b>30-day free returns</b></div>
          </div>

          <div className="jg-buy-ctas">
            <button
              className="jg-pill jg-pill-lg"
              onClick={() => { setCart(cart + qty); pushToast(`Order placed · ${qty} × Sonix Pro`); }}
            >Buy Now · ${PRICE * qty}</button>
            <button
              className="jg-pill-ghost jg-pill-lg"
              onClick={() => { setCart(cart + qty); pushToast(`Added ${qty} to cart`); }}
            >Add to Cart</button>
            <button
              className={`jg-wish-btn ${wishlist ? "jg-wish-on" : ""}`}
              onClick={() => { setWishlist(!wishlist); pushToast(wishlist ? "Removed from wishlist" : "Added to wishlist"); }}
              aria-label="Wishlist"
            >♥</button>
          </div>

          <div className="jg-trust">
            <div className="jg-trust-item">🔒 Secure checkout</div>
            <div className="jg-trust-item">🚚 Free shipping over $99</div>
            <div className="jg-trust-item">↺ 30-day returns</div>
            <div className="jg-trust-item">🛡 2-year warranty</div>
          </div>

          <div className="jg-pay-row">
            <span>We accept</span>
            <div className="jg-pay-icons">
              <span>VISA</span><span>MC</span><span>AMEX</span><span>PayPal</span><span> Pay</span><span>G Pay</span>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="jg-section" data-reveal>
        <div className="jg-eyebrow">You may also like</div>
        <h2 className="jg-h2">Related products.</h2>
        <div className="jg-related-grid">
          {[
            { t: "Sonix Air", d: "Wireless earbuds · ANC", img: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=900&q=85", p: 249, was: 299, r: 4.8 },
            { t: "Sonix Studio", d: "Reference monitors", img: "https://images.unsplash.com/photo-1558537348-c0f8e733989d?auto=format&fit=crop&w=900&q=85", p: 1299, was: 1499, r: 4.9 },
            { t: "Sonix Stand", d: "Aluminium dock", img: "https://images.unsplash.com/photo-1612444530582-fc66183b16f7?auto=format&fit=crop&w=900&q=85", p: 89, was: 119, r: 4.7 },
            { t: "Sonix Cable+", d: "Balanced 4.4mm", img: "https://images.unsplash.com/photo-1631176093617-63490a3d785a?auto=format&fit=crop&w=900&q=85", p: 89, was: 109, r: 4.8 },
          ].map((r) => (
            <article className="jg-rcard" key={r.t}>
              <div className="jg-rcard-media">
                <img src={r.img} alt={r.t} loading="lazy" />
                <span className="jg-rcard-badge">−{Math.round((1 - r.p / r.was) * 100)}%</span>
              </div>
              <div className="jg-rcard-body">
                <h3>{r.t}</h3>
                <p>{r.d}</p>
                <div className="jg-rcard-rate"><span className="jg-stars">★★★★★</span><span>{r.r}</span></div>
                <div className="jg-rcard-foot">
                  <div>
                    <span className="jg-price-now-sm">${r.p}</span>
                    <span className="jg-price-was-sm">${r.was}</span>
                  </div>
                  <button
                    className="jg-rcard-add"
                    onClick={() => { setCart(cart + 1); pushToast(`Added ${r.t} to cart`); }}
                    aria-label={`Add ${r.t} to cart`}
                  >＋ Add</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT + NEWSLETTER */}
      <section id="contact" className="jg-section jg-duo" data-reveal>
        <div className="jg-panel">
          <div className="jg-eyebrow">Contact</div>
          <h3 className="jg-h3">Get in touch.</h3>
          <form className="jg-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Email" required />
            <textarea placeholder="How can we help?" rows={4} required />
            <button type="submit" className="jg-pill">Send message →</button>
          </form>
        </div>
        <div className="jg-panel">
          <div className="jg-eyebrow">Newsletter</div>
          <h3 className="jg-h3">First to know. First to listen.</h3>
          <p>Drops, engineering notes, and invitations to private listening sessions.</p>
          <form className="jg-form jg-form-row" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@studio.com" required />
            <button type="submit" className="jg-pill">Subscribe</button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="jg-footer">
        <div className="jg-footer-top">
          <div>
            <div className="jg-logo">Sonix</div>
            <p className="jg-footer-tag">Deconstruct sound. Rebuild it better.</p>
          </div>
          <div className="jg-footer-cols">
            <div>
              <h4>Product</h4>
              <a href="#highlights">Highlights</a>
              <a href="#specs">Specs</a>
              <a href="#buy">Buy</a>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Press</a>
              <a href="#">Careers</a>
            </div>
            <div>
              <h4>Help</h4>
              <a href="#support">Support</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
        <div className="jg-footer-bot">
          <div>© 2026 Sonix Audio Labs</div>
          <div className="jg-socials" aria-label="Social links">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="LinkedIn">IN</a>
          </div>
          <div className="jg-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <a
        href="#top"
        className={`jg-top ${showTop ? "jg-top-show" : ""}`}
        aria-label="Back to top"
      >↑</a>

      {/* TOAST */}
      <div className={`jg-toast ${toast ? "jg-toast-show" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

const css = `
:root { --bg:#0a0a0a; --fg:#f4f1ea; --muted:rgba(244,241,234,0.65); --line:rgba(244,241,234,0.1); --card:rgba(255,255,255,0.02); --gold:#DFB92D; }
.jg-theme-light { --bg:#f6f4ef; --fg:#0a0a0a; --muted:rgba(10,10,10,0.65); --line:rgba(10,10,10,0.1); --card:rgba(0,0,0,0.02); }

.jg-root { background: var(--bg); color: var(--fg); font-family: 'Inter', system-ui, sans-serif; min-height: 100vh; overflow-x: hidden; transition: background .4s ease, color .4s ease; scroll-behavior: smooth; }
html { scroll-behavior: smooth; }
.jg-root a { color: inherit; text-decoration: none; }

/* LOADER */
.jg-loader { position: fixed; inset: 0; z-index: 200; background: var(--bg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 24px; transition: opacity .6s ease, visibility .6s; }
.jg-loader-done { opacity: 0; visibility: hidden; pointer-events: none; }
.jg-loader-mark { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 28px; letter-spacing: 0.3em; color: var(--gold); }
.jg-loader-bar { width: 180px; height: 2px; background: var(--line); overflow: hidden; }
.jg-loader-bar span { display: block; width: 40%; height: 100%; background: var(--gold); animation: jg-load 1.1s ease-in-out infinite; }
@keyframes jg-load { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }

/* PROGRESS */
.jg-progress { position: fixed; top: 0; left: 0; height: 2px; background: var(--gold); z-index: 100; transition: width .1s linear; }

/* NAV */
.jg-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 22px 48px; transition: padding .3s ease, background .3s ease, backdrop-filter .3s; }
.jg-nav-scrolled { padding: 14px 48px; background: color-mix(in srgb, var(--bg) 70%, transparent); backdrop-filter: blur(14px); border-bottom: 1px solid var(--line); }
.jg-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: 0.14em; font-size: 22px; text-transform: uppercase; }
.jg-nav-links { display: flex; gap: 28px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; align-items: center; }
.jg-nav-links a { opacity: 0.75; transition: opacity .2s; }
.jg-nav-links a:hover { opacity: 1; color: var(--gold); }
.jg-nav-cta { color: var(--bg) !important; background: var(--gold); padding: 10px 18px; border-radius: 999px; opacity: 1 !important; font-weight: 600; }
.jg-nav-cta:hover { color: var(--bg) !important; }
.jg-theme-toggle { background: none; border: 1px solid var(--line); color: var(--fg); width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 14px; transition: border-color .2s; }
.jg-theme-toggle:hover { border-color: var(--gold); }

/* HERO */
.jg-hero { position: relative; min-height: 100vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 110px 48px 40px; }
.jg-hero-glow { position: absolute; top: 20%; left: 50%; width: 800px; height: 800px; transform: translate(-50%,-50%); background: radial-gradient(circle, color-mix(in srgb, var(--gold) 25%, transparent), transparent 60%); pointer-events: none; filter: blur(80px); }
.jg-hero-top { position: relative; z-index: 2; text-align: center; max-width: 820px; display: flex; flex-direction: column; align-items: center; opacity: 0; transform: translateY(20px); transition: opacity 1s ease, transform 1s ease; }
.jg-hero-top.jg-revealed { opacity: 1; transform: none; }
.jg-hero-media { position: relative; width: 100%; max-width: 960px; aspect-ratio: 16/9; margin: 28px 0; display: flex; align-items: center; justify-content: center; transition: transform .4s ease; }
.jg-hero-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 14px; filter: brightness(1.05) contrast(1.08) saturate(1.05); }
.jg-hero-vignette { position: absolute; inset: 0; border-radius: 14px; background: radial-gradient(circle at center, transparent 55%, color-mix(in srgb, var(--bg) 40%, transparent) 100%); pointer-events: none; }
.jg-hero-bottom { position: relative; z-index: 2; display: flex; align-items: center; gap: 24px; font-family: 'Space Grotesk', sans-serif; border: 1px solid color-mix(in srgb, var(--gold) 30%, transparent); background: color-mix(in srgb, var(--bg) 60%, transparent); backdrop-filter: blur(10px); padding: 14px 26px; border-radius: 999px; opacity: 0; transform: translateY(12px); transition: opacity 1s ease .35s, transform 1s ease .35s; flex-wrap: wrap; justify-content: center; }
.jg-hero-bottom.jg-in { opacity: 1; transform: translateY(0); }
.jg-hud-title { font-size: 10px; letter-spacing: 0.3em; color: var(--gold); }
.jg-hero-bottom ul { list-style: none; margin: 0; padding: 0; display: flex; gap: 22px; font-size: 12px; flex-wrap: wrap; }
.jg-hero-bottom li { display: flex; align-items: center; gap: 8px; color: var(--muted); letter-spacing: 0.08em; text-transform: uppercase; }
.jg-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 12px var(--gold); animation: jg-pulse 2s ease-in-out infinite; }
@keyframes jg-pulse { 50% { opacity: 0.5; } }

.jg-headline { font-family: 'Space Grotesk', sans-serif; font-size: clamp(44px, 7vw, 96px); line-height: 0.95; font-weight: 500; letter-spacing: -0.03em; margin: 12px 0 0; display: flex; flex-direction: column; min-height: 1.9em; }
.jg-headline-line { display: block; white-space: pre; }
.jg-gold { color: var(--gold); }
.jg-cursor { display: inline-block; margin-left: 4px; color: var(--gold); animation: jg-blink 1s steps(2) infinite; }
@keyframes jg-blink { 50% { opacity: 0; } }
.jg-hero-sub { margin: 22px 0 24px; max-width: 520px; font-size: 16px; line-height: 1.6; color: var(--muted); opacity: 0; transform: translateY(12px); transition: opacity .8s ease, transform .8s ease; }
.jg-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; opacity: 0; transform: translateY(12px); transition: opacity .8s ease .15s, transform .8s ease .15s; }
.jg-pill { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; border-radius: 999px; background: var(--gold); color: #0a0a0a !important; font-weight: 600; font-size: 14px; letter-spacing: 0.04em; transition: transform .2s, background .2s; }
.jg-pill:hover { background: #f0cc3f; transform: translateY(-2px); }
.jg-pill-lg { padding: 18px 36px; font-size: 15px; }
.jg-pill-ghost { display: inline-flex; align-items: center; gap: 10px; padding: 14px 26px; border-radius: 999px; border: 1px solid var(--line); color: var(--fg); font-weight: 500; font-size: 14px; transition: border-color .2s, color .2s; }
.jg-pill-ghost:hover { border-color: var(--gold); color: var(--gold); }
.jg-in { opacity: 1 !important; transform: translateY(0) !important; }
.jg-scroll-cue { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); font-family: 'Space Grotesk', sans-serif; font-size: 10px; letter-spacing: 0.4em; color: var(--muted); animation: jg-bounce 2s ease-in-out infinite; }
@keyframes jg-bounce { 50% { transform: translate(-50%, 6px); opacity: .5; } }

/* MARQUEE */
.jg-marquee { background: var(--gold); color: #0a0a0a; overflow: hidden; padding: 14px 0; font-family: 'Space Grotesk', sans-serif; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; }
.jg-marquee-track { display: flex; gap: 48px; width: max-content; animation: jg-scroll 40s linear infinite; }
.jg-marquee-group { display: flex; gap: 48px; padding-right: 48px; }
@keyframes jg-scroll { to { transform: translateX(-50%); } }

/* SECTIONS + REVEAL */
.jg-section { max-width: 1280px; margin: 0 auto; padding: 120px 48px; }
[data-reveal] { opacity: 0; transform: translateY(30px); transition: opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1); }
.jg-revealed { opacity: 1 !important; transform: none !important; }
.jg-eyebrow { font-family: 'Space Grotesk', sans-serif; font-size: 12px; letter-spacing: 0.3em; color: var(--gold); text-transform: uppercase; margin-bottom: 18px; }
.jg-h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(34px, 5vw, 60px); font-weight: 500; line-height: 1.05; letter-spacing: -0.02em; margin: 0 0 48px; }
.jg-h3 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(22px, 2.5vw, 30px); font-weight: 500; margin: 0 0 14px; letter-spacing: -0.01em; }

/* HIGHLIGHTS */
.jg-hl-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.jg-hl { padding: 32px 26px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); transition: transform .4s ease, border-color .4s; }
.jg-hl:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--gold) 60%, transparent); }
.jg-hl-icon { font-size: 24px; color: var(--gold); margin-bottom: 18px; }
.jg-hl h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 500; margin: 0 0 8px; }
.jg-hl p { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0; }

/* DUO PANELS */
.jg-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.jg-panel { padding: 40px; border: 1px solid var(--line); border-radius: 18px; background: var(--card); }
.jg-panel p { color: var(--muted); line-height: 1.6; }
.jg-link { color: var(--gold); font-weight: 500; display: inline-block; margin-top: 14px; }
.jg-link:hover { text-decoration: underline; }

/* NC DEMO */
.jg-nc { margin-top: 20px; }
.jg-nc-wave { display: flex; align-items: center; justify-content: center; gap: 4px; height: 80px; margin-bottom: 20px; }
.jg-nc-wave span { display: block; width: 4px; height: 100%; background: color-mix(in srgb, var(--gold) 60%, transparent); border-radius: 2px; animation: jg-wave 1.2s ease-in-out infinite; transform-origin: center; }
.jg-nc-on .jg-nc-wave span { animation: jg-wave-quiet 1.2s ease-in-out infinite; background: color-mix(in srgb, var(--gold) 25%, transparent); }
@keyframes jg-wave { 0%,100% { transform: scaleY(.2); } 50% { transform: scaleY(1); } }
@keyframes jg-wave-quiet { 0%,100% { transform: scaleY(.1); } 50% { transform: scaleY(.18); } }
.jg-nc-toggle { display: flex; align-items: center; gap: 14px; background: none; border: 1px solid var(--line); padding: 12px 18px; border-radius: 999px; color: var(--fg); cursor: pointer; font-family: 'Space Grotesk', sans-serif; font-size: 13px; letter-spacing: 0.1em; }
.jg-switch { position: relative; width: 38px; height: 22px; background: var(--line); border-radius: 999px; transition: background .3s; display: inline-block; }
.jg-switch span { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; background: var(--fg); border-radius: 50%; transition: transform .3s; }
.jg-switch-on { background: var(--gold); }
.jg-switch-on span { transform: translateX(16px); background: #0a0a0a; }

/* BATTERY */
.jg-batt { display: flex; gap: 30px; align-items: center; margin-top: 16px; flex-wrap: wrap; }
.jg-batt-ring { position: relative; width: 140px; height: 140px; }
.jg-batt-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.jg-batt-bg { fill: none; stroke: var(--line); stroke-width: 6; }
.jg-batt-fg { fill: none; stroke: var(--gold); stroke-width: 6; stroke-linecap: round; stroke-dasharray: 326; transition: stroke-dashoffset 1s ease; }
.jg-batt-num { position: absolute; inset: 0; display: flex; align-items: baseline; justify-content: center; gap: 2px; font-family: 'Space Grotesk', sans-serif; }
.jg-batt-num b { font-size: 36px; font-weight: 500; }
.jg-batt-num span { font-size: 14px; color: var(--muted); }
.jg-batt-list { list-style: none; margin: 0; padding: 0; flex: 1; min-width: 180px; }
.jg-batt-list li { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
.jg-batt-list span { color: var(--muted); }

/* 360 VIEWER */
.jg-viewer { display: grid; grid-template-columns: 1.5fr 1fr; gap: 40px; align-items: center; }
.jg-viewer-stage { aspect-ratio: 4/3; background: radial-gradient(circle at center, color-mix(in srgb, var(--gold) 12%, transparent), transparent 70%), var(--card); border: 1px solid var(--line); border-radius: 24px; position: relative; overflow: hidden; cursor: grab; perspective: 1200px; touch-action: none; }
.jg-viewer-stage:active { cursor: grabbing; }
.jg-viewer-img { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: transform .15s linear; transform-style: preserve-3d; }
.jg-viewer-img img { max-width: 70%; max-height: 80%; object-fit: contain; user-select: none; pointer-events: none; transition: filter .5s ease; filter: drop-shadow(0 30px 60px rgba(0,0,0,.5)); }
.jg-ex { position: absolute; width: 60px; height: 60px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--gold) 40%, transparent); opacity: 0; transition: all .8s cubic-bezier(.2,.7,.2,1); pointer-events: none; }
.jg-exploded .jg-ex { opacity: 1; }
.jg-exploded .jg-ex-1 { transform: translate(-180px, -80px); }
.jg-exploded .jg-ex-2 { transform: translate(180px, -80px); }
.jg-exploded .jg-ex-3 { transform: translate(0, 140px); }
.jg-exploded img { transform: scale(.85); }

/* HOTSPOTS */
.jg-hot { position: absolute; transform: translate(-50%,-50%); background: none; border: none; cursor: pointer; padding: 0; }
.jg-hot-dot { display: block; width: 14px; height: 14px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 0 0 color-mix(in srgb, var(--gold) 60%, transparent); animation: jg-hot 2s ease-out infinite; }
@keyframes jg-hot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--gold) 70%, transparent); } 100% { box-shadow: 0 0 0 14px transparent; } }
.jg-hot-label { position: absolute; left: 22px; top: -4px; white-space: nowrap; background: var(--bg); border: 1px solid var(--line); padding: 6px 12px; border-radius: 6px; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0; pointer-events: none; transition: opacity .25s; }
.jg-hot:hover .jg-hot-label, .jg-hot-on .jg-hot-label { opacity: 1; }

.jg-viewer-controls { display: flex; flex-direction: column; gap: 24px; }
.jg-viewer-hint { font-family: 'Space Grotesk', sans-serif; font-size: 11px; letter-spacing: 0.3em; color: var(--muted); text-transform: uppercase; }
.jg-viewer-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.jg-viewer-actions button { padding: 12px 18px; border-radius: 999px; border: 1px solid var(--line); background: none; color: var(--fg); cursor: pointer; font-size: 13px; transition: border-color .2s, color .2s; }
.jg-viewer-actions button:hover { border-color: var(--gold); color: var(--gold); }
.jg-swatches { display: flex; gap: 10px; margin-top: 10px; }
.jg-swatch { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--line); cursor: pointer; transition: transform .2s, border-color .2s; }
.jg-swatch:hover { transform: scale(1.1); }
.jg-swatch-on { border-color: var(--gold); transform: scale(1.15); }

/* TOUCH */
.jg-touch-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.jg-touch { padding: 28px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); transition: transform .3s, border-color .3s; }
.jg-touch:hover { transform: translateY(-4px); border-color: color-mix(in srgb, var(--gold) 60%, transparent); }
.jg-touch-g { font-family: 'Space Grotesk', sans-serif; color: var(--gold); font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 8px; }
.jg-touch-t { font-size: 18px; }

/* GALLERY */
.jg-gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.jg-gcard { position: relative; border-radius: 18px; overflow: hidden; background: var(--card); border: 1px solid var(--line); transition: transform .5s, border-color .5s, box-shadow .5s; }
.jg-gcard:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--gold) 50%, transparent); box-shadow: 0 30px 80px -30px rgba(0,0,0,0.6); }
.jg-gcard-media { position: relative; aspect-ratio: 4/3; overflow: hidden; background: var(--bg); }
.jg-gcard-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 1.2s cubic-bezier(.2,.7,.2,1); }
.jg-gcard:hover .jg-gcard-media img { transform: scale(1.06); }
.jg-gcard-body { padding: 26px 30px 30px; }
.jg-gcard-tag { display: inline-block; font-family: 'Space Grotesk', sans-serif; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
.jg-gcard h3 { font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 500; margin: 0 0 10px; }
.jg-gcard p { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 0; }

/* SPECS */
.jg-spec-list { margin: 0; padding: 0; border-top: 1px solid var(--line); }
.jg-spec-row { display: grid; grid-template-columns: 220px 1fr; gap: 24px; padding: 18px 0; border-bottom: 1px solid var(--line); }
.jg-spec-row dt { font-family: 'Space Grotesk', sans-serif; color: var(--muted); font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0; }
.jg-spec-row dd { margin: 0; font-size: 15px; }

/* ACCESSORIES */
.jg-acc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.jg-acc { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; padding: 24px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); }
.jg-acc h3 { font-family: 'Space Grotesk', sans-serif; font-size: 16px; font-weight: 500; margin: 0 0 4px; }
.jg-acc p { font-size: 13px; color: var(--muted); margin: 0; }
.jg-acc-price { color: var(--gold); font-family: 'Space Grotesk', sans-serif; font-size: 13px; white-space: nowrap; }

/* COMPARE */
.jg-compare { overflow-x: auto; border: 1px solid var(--line); border-radius: 16px; }
.jg-compare table { width: 100%; border-collapse: collapse; min-width: 600px; }
.jg-compare th, .jg-compare td { padding: 16px 20px; text-align: left; font-size: 14px; border-bottom: 1px solid var(--line); }
.jg-compare thead th { font-family: 'Space Grotesk', sans-serif; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; font-size: 12px; color: var(--muted); }
.jg-compare tbody th { font-weight: 500; color: var(--muted); }
.jg-cmp-us { color: var(--gold) !important; font-weight: 600; background: color-mix(in srgb, var(--gold) 6%, transparent); }

/* REVIEWS */
.jg-reviews { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.jg-review { margin: 0; padding: 32px; border: 1px solid var(--line); border-radius: 16px; background: var(--card); }
.jg-stars { color: var(--gold); letter-spacing: 4px; margin-bottom: 16px; }
.jg-review blockquote { margin: 0 0 18px; font-size: 17px; line-height: 1.5; }
.jg-review figcaption { display: flex; flex-direction: column; gap: 2px; font-size: 13px; }
.jg-review figcaption span { color: var(--muted); }

/* FAQ */
.jg-faq { border-top: 1px solid var(--line); }
.jg-faq-item { border-bottom: 1px solid var(--line); }
.jg-faq-item button { width: 100%; background: none; border: none; color: var(--fg); padding: 22px 0; display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-family: inherit; font-size: 17px; text-align: left; }
.jg-faq-plus { color: var(--gold); font-size: 22px; }
.jg-faq-body { max-height: 0; overflow: hidden; transition: max-height .4s ease, padding .4s ease; }
.jg-faq-body p { margin: 0; padding: 0 0 22px; color: var(--muted); line-height: 1.6; }
.jg-faq-open .jg-faq-body { max-height: 200px; }

/* BUY */
.jg-buy { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
.jg-buy-price { font-family: 'Space Grotesk', sans-serif; font-size: 32px; margin: 8px 0 24px; }
.jg-buy-price span { font-size: 14px; color: var(--muted); margin-left: 10px; }
.jg-buy-list { list-style: none; margin: 0 0 30px; padding: 0; display: flex; flex-direction: column; gap: 8px; color: var(--muted); }
.jg-buy-right img { width: 100%; border-radius: 18px; aspect-ratio: 4/3; object-fit: cover; }

/* FORMS */
.jg-form { display: flex; flex-direction: column; gap: 12px; margin-top: 18px; }
.jg-form-row { flex-direction: row; flex-wrap: wrap; }
.jg-form-row input { flex: 1; min-width: 200px; }
.jg-form input, .jg-form textarea { background: var(--bg); border: 1px solid var(--line); color: var(--fg); padding: 14px 18px; border-radius: 10px; font-family: inherit; font-size: 14px; resize: vertical; }
.jg-form input:focus, .jg-form textarea:focus { outline: none; border-color: var(--gold); }
.jg-form button { align-self: flex-start; border: none; cursor: pointer; }

/* FOOTER */
.jg-footer { border-top: 1px solid var(--line); padding: 60px 48px 24px; max-width: 1280px; margin: 0 auto; }
.jg-footer-top { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; margin-bottom: 60px; }
.jg-footer-tag { color: var(--muted); margin-top: 12px; max-width: 280px; font-size: 14px; }
.jg-footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
.jg-footer-cols h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 13px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin: 0 0 14px; }
.jg-footer-cols a { display: block; padding: 6px 0; font-size: 14px; color: var(--muted); }
.jg-footer-cols a:hover { color: var(--fg); }
.jg-footer-bot { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid var(--line); font-size: 13px; color: var(--muted); flex-wrap: wrap; gap: 16px; }
.jg-socials { display: flex; gap: 10px; }
.jg-socials a { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 11px; font-family: 'Space Grotesk', sans-serif; letter-spacing: 0.05em; transition: border-color .2s, color .2s; }
.jg-socials a:hover { border-color: var(--gold); color: var(--gold); }
.jg-footer-links { display: flex; gap: 22px; }
.jg-footer-links a:hover { color: var(--gold); }

/* BACK TO TOP */
.jg-top { position: fixed; right: 24px; bottom: 24px; width: 46px; height: 46px; border-radius: 50%; background: var(--gold); color: #0a0a0a !important; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; z-index: 60; opacity: 0; transform: translateY(20px); pointer-events: none; transition: opacity .3s, transform .3s; box-shadow: 0 10px 30px rgba(0,0,0,.3); }
.jg-top-show { opacity: 1; transform: none; pointer-events: auto; }
.jg-top:hover { transform: translateY(-4px); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .jg-nav { padding: 16px 20px; }
  .jg-nav-scrolled { padding: 12px 20px; }
  .jg-nav-links { gap: 14px; font-size: 10px; }
  .jg-nav-links a:not(.jg-nav-cta) { display: none; }
  .jg-hero { padding: 100px 20px 40px; }
  .jg-section { padding: 70px 20px; }
  .jg-hl-grid, .jg-touch-grid, .jg-acc-grid, .jg-reviews { grid-template-columns: 1fr; }
  .jg-duo, .jg-viewer, .jg-buy, .jg-gallery-grid { grid-template-columns: 1fr; }
  .jg-spec-row { grid-template-columns: 140px 1fr; gap: 16px; }
  .jg-footer { padding: 40px 20px 24px; }
  .jg-footer-top { grid-template-columns: 1fr; }
  .jg-footer-cols { grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .jg-h2 { margin-bottom: 30px; }
}
@media (max-width: 520px) {
  .jg-footer-cols { grid-template-columns: 1fr 1fr; }
}

/* NAV ICONS / CART / WISHLIST */
.jg-nav-icon { background: none; border: 1px solid var(--line); color: var(--fg); width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 14px; transition: border-color .2s, color .2s; position: relative; display: inline-flex; align-items: center; justify-content: center; }
.jg-nav-icon:hover { border-color: var(--gold); color: var(--gold); }
.jg-heart { font-size: 14px; transition: color .2s, transform .2s; }
.jg-heart-on { color: var(--gold); transform: scale(1.15); }
.jg-cart-count { position: absolute; top: -4px; right: -4px; background: var(--gold); color: #0a0a0a; font-size: 10px; font-weight: 700; min-width: 16px; height: 16px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; padding: 0 4px; font-family: 'Space Grotesk', sans-serif; }

/* BUY ENHANCEMENTS */
.jg-buy-right { position: relative; }
.jg-discount-badge { position: absolute; top: 18px; left: 18px; background: var(--gold); color: #0a0a0a; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.06em; padding: 8px 14px; border-radius: 999px; box-shadow: 0 6px 20px rgba(0,0,0,.25); }
.jg-rate { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; font-size: 14px; }
.jg-rate-num { font-weight: 600; }
.jg-rate-link { color: var(--muted); text-decoration: underline; }
.jg-rate-link:hover { color: var(--gold); }
.jg-price-row { display: flex; align-items: baseline; gap: 14px; margin: 0 0 14px; flex-wrap: wrap; }
.jg-price-now { font-family: 'Space Grotesk', sans-serif; font-size: 40px; font-weight: 500; letter-spacing: -0.02em; }
.jg-price-was { font-size: 18px; color: var(--muted); text-decoration: line-through; }
.jg-price-save { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); border: 1px solid color-mix(in srgb, var(--gold) 50%, transparent); padding: 4px 10px; border-radius: 999px; }
.jg-stock { display: inline-flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); margin-bottom: 28px; }
.jg-stock-dot { width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 12px #3ddc84; animation: jg-pulse 2s ease-in-out infinite; }
.jg-stock b { color: var(--fg); }
.jg-buy-section { margin: 0 0 22px; }
.jg-buy-label { font-family: 'Space Grotesk', sans-serif; font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
.jg-buy-label b { color: var(--fg); margin-left: 4px; }
.jg-qty { display: inline-flex; align-items: center; border: 1px solid var(--line); border-radius: 999px; overflow: hidden; }
.jg-qty button { background: none; border: none; color: var(--fg); width: 40px; height: 40px; font-size: 18px; cursor: pointer; transition: color .2s, background .2s; }
.jg-qty button:hover { color: var(--gold); }
.jg-qty span { padding: 0 18px; font-family: 'Space Grotesk', sans-serif; font-weight: 600; min-width: 30px; text-align: center; }
.jg-delivery { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 18px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); margin-bottom: 28px; }
.jg-delivery b { display: block; font-size: 14px; margin-top: 4px; font-weight: 500; }
.jg-eyebrow-sm { font-family: 'Space Grotesk', sans-serif; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold); }
.jg-buy-ctas { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 26px; }
.jg-buy-ctas .jg-pill-ghost { padding: 18px 28px; font-size: 15px; }
.jg-wish-btn { width: 56px; height: 56px; border-radius: 50%; border: 1px solid var(--line); background: none; color: var(--fg); font-size: 20px; cursor: pointer; transition: all .2s; }
.jg-wish-btn:hover { border-color: var(--gold); color: var(--gold); }
.jg-wish-on { background: var(--gold); color: #0a0a0a; border-color: var(--gold); }
.jg-trust { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px 18px; padding: 18px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); margin-bottom: 18px; }
.jg-trust-item { font-size: 13px; color: var(--muted); }
.jg-pay-row { display: flex; align-items: center; gap: 12px; font-size: 12px; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
.jg-pay-icons { display: flex; gap: 6px; flex-wrap: wrap; }
.jg-pay-icons span { padding: 4px 8px; border: 1px solid var(--line); border-radius: 4px; font-family: 'Space Grotesk', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.08em; }

/* RELATED PRODUCTS */
.jg-related-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.jg-rcard { display: flex; flex-direction: column; border: 1px solid var(--line); border-radius: 16px; overflow: hidden; background: var(--card); transition: transform .4s, border-color .4s, box-shadow .4s; }
.jg-rcard:hover { transform: translateY(-6px); border-color: color-mix(in srgb, var(--gold) 50%, transparent); box-shadow: 0 20px 50px -20px rgba(0,0,0,.5); }
.jg-rcard-media { position: relative; aspect-ratio: 1/1; overflow: hidden; background: var(--bg); }
.jg-rcard-media img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s; }
.jg-rcard:hover .jg-rcard-media img { transform: scale(1.05); }
.jg-rcard-badge { position: absolute; top: 12px; left: 12px; background: var(--gold); color: #0a0a0a; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 11px; padding: 4px 10px; border-radius: 999px; }
.jg-rcard-body { padding: 18px 20px 20px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
.jg-rcard-body h3 { font-family: 'Space Grotesk', sans-serif; font-size: 17px; font-weight: 500; margin: 0; }
.jg-rcard-body p { color: var(--muted); font-size: 13px; margin: 0; }
.jg-rcard-rate { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--muted); }
.jg-rcard-rate .jg-stars { letter-spacing: 2px; font-size: 12px; margin: 0; }
.jg-rcard-foot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px; }
.jg-price-now-sm { font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 600; }
.jg-price-was-sm { font-size: 12px; color: var(--muted); text-decoration: line-through; margin-left: 6px; }
.jg-rcard-add { background: var(--fg); color: var(--bg); border: none; padding: 8px 14px; border-radius: 999px; font-family: inherit; font-size: 12px; font-weight: 600; cursor: pointer; transition: background .2s; }
.jg-rcard-add:hover { background: var(--gold); color: #0a0a0a; }

/* TOAST */
.jg-toast { position: fixed; bottom: 32px; left: 50%; transform: translate(-50%, 30px); background: var(--fg); color: var(--bg); padding: 14px 24px; border-radius: 999px; font-size: 14px; font-weight: 500; z-index: 90; opacity: 0; pointer-events: none; transition: opacity .3s, transform .3s; box-shadow: 0 20px 50px rgba(0,0,0,.35); }
.jg-toast-show { opacity: 1; transform: translate(-50%, 0); }

@media (max-width: 900px) {
  .jg-related-grid { grid-template-columns: repeat(2, 1fr); }
  .jg-buy { grid-template-columns: 1fr; }
}
@media (max-width: 520px) {
  .jg-related-grid { grid-template-columns: 1fr; }
  .jg-trust { grid-template-columns: 1fr; }
  .jg-delivery { grid-template-columns: 1fr; }
}
`;