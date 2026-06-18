import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

export const Route = createFileRoute("/viewer")({
  component: ViewerPage,
  head: () => ({
    meta: [
      { title: "Sonix 3D — Premium Headphone Viewer" },
      {
        name: "description",
        content:
          "Interactive 360° 3D headphone product viewer with color customization, HDR lighting, and premium animations.",
      },
    ],
  }),
});

type ColorKey =
  | "black"
  | "white"
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "gold";

const COLORS: Record<
  ColorKey,
  { label: string; hex: string; accent: string; bg: string; swatch: string }
> = {
  black: {
    label: "Onyx Black",
    hex: "#111114",
    accent: "#DFB92D",
    bg: "radial-gradient(circle at 30% 20%, #2a2418 0%, #0b0b0d 55%, #000 100%)",
    swatch: "linear-gradient(135deg,#1a1a1a,#DFB92D)",
  },
  white: {
    label: "Silver White",
    hex: "#f4f1ea",
    accent: "#c9c9d1",
    bg: "radial-gradient(circle at 30% 20%, #ffffff 0%, #d9d9e0 55%, #a8a8b0 100%)",
    swatch: "linear-gradient(135deg,#ffffff,#c9c9d1)",
  },
  blue: {
    label: "Deep Ocean",
    hex: "#1a4dd6",
    accent: "#5aa3ff",
    bg: "radial-gradient(circle at 30% 20%, #1e3a8a 0%, #0b1e52 55%, #050a25 100%)",
    swatch: "linear-gradient(135deg,#1a4dd6,#0b1e52)",
  },
  red: {
    label: "Crimson",
    hex: "#c8102e",
    accent: "#ff5b6e",
    bg: "radial-gradient(circle at 30% 20%, #7a0a1c 0%, #3d0510 55%, #150207 100%)",
    swatch: "linear-gradient(135deg,#c8102e,#3d0510)",
  },
  green: {
    label: "Emerald",
    hex: "#0f9d58",
    accent: "#4fd39a",
    bg: "radial-gradient(circle at 30% 20%, #0b6e3f 0%, #04331e 55%, #02110a 100%)",
    swatch: "linear-gradient(135deg,#0f9d58,#04331e)",
  },
  purple: {
    label: "Neon Purple",
    hex: "#7c3aed",
    accent: "#c084fc",
    bg: "radial-gradient(circle at 30% 20%, #6d28d9 0%, #2a0a5e 55%, #0a0220 100%)",
    swatch: "linear-gradient(135deg,#7c3aed,#2a0a5e)",
  },
  gold: {
    label: "Luxury Gold",
    hex: "#DFB92D",
    accent: "#fff0b3",
    bg: "radial-gradient(circle at 30% 20%, #b8862b 0%, #6b4a10 55%, #1a1205 100%)",
    swatch: "linear-gradient(135deg,#DFB92D,#6b4a10)",
  },
};

function Headphones({ color }: { color: string }) {
  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const matRefs = useRef<THREE.MeshStandardMaterial[]>([]);

  useFrame(() => {
    for (const m of matRefs.current) {
      if (!m) continue;
      m.color.lerp(targetColor, 0.08);
    }
  });

  const setRef = (i: number) => (m: THREE.MeshStandardMaterial | null) => {
    if (m) matRefs.current[i] = m;
  };

  return (
    <group rotation={[0, 0, 0]} position={[0, -0.1, 0]}>
      {/* Headband — outer torus arc */}
      <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.07, 32, 80, Math.PI]} />
        <meshStandardMaterial
          ref={setRef(0)}
          color={color}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      {/* Headband cushion */}
      <mesh position={[0, 1.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.93, 0.05, 24, 60, Math.PI]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Left arm */}
      <mesh position={[-0.95, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.55, 24]} />
        <meshStandardMaterial
          ref={setRef(1)}
          color={color}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.95, 0.45, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.55, 24]} />
        <meshStandardMaterial
          ref={setRef(2)}
          color={color}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Left ear cup */}
      <EarCup side={-1} matRef={setRef(3)} color={color} />
      {/* Right ear cup */}
      <EarCup side={1} matRef={setRef(4)} color={color} />
    </group>
  );
}

function EarCup({
  side,
  color,
  matRef,
}: {
  side: number;
  color: string;
  matRef: (m: THREE.MeshStandardMaterial | null) => void;
}) {
  return (
    <group position={[side * 0.95, 0.1, 0]} rotation={[0, 0, 0]}>
      {/* outer shell */}
      <mesh rotation={[0, (Math.PI / 2) * side, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.18, 64]} />
        <meshStandardMaterial
          ref={matRef}
          color={color}
          metalness={0.85}
          roughness={0.18}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* metallic ring */}
      <mesh position={[side * 0.095, 0, 0]} rotation={[0, (Math.PI / 2) * side, 0]}>
        <torusGeometry args={[0.4, 0.018, 16, 64]} />
        <meshStandardMaterial color="#cfcfd4" metalness={1} roughness={0.15} />
      </mesh>
      {/* cushion */}
      <mesh position={[side * -0.1, 0, 0]} rotation={[0, (Math.PI / 2) * side, 0]}>
        <torusGeometry args={[0.34, 0.09, 24, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} metalness={0.02} />
      </mesh>
      {/* inner mesh */}
      <mesh position={[side * -0.09, 0, 0]} rotation={[0, (Math.PI / 2) * side, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.005, 48]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
}

function FullCanvas({
  color,
  autoRotate,
  resetKey,
}: {
  color: string;
  autoRotate: boolean;
  resetKey: number;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, preserveDrawingBuffer: true }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.3, 3.6]} fov={38} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 4, 3]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <Headphones color={color} />
        </Float>
        <Environment preset="studio" />
      </Suspense>
      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.55}
        scale={6}
        blur={2.6}
        far={2}
      />
      <Rig key={resetKey} autoRotate={autoRotate} />
    </Canvas>
  );
}

function Rig({ autoRotate }: { autoRotate: boolean }) {
  const { camera, gl } = useThree();
  useEffect(() => {
    camera.position.set(0, 0.3, 3.6);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return (
    <OrbitControls
      args={[camera, gl.domElement]}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={2.2}
      maxDistance={6}
      autoRotate={autoRotate}
      autoRotateSpeed={1.2}
    />
  );
}

function ViewerPage() {
  const [color, setColor] = useState<ColorKey>("black");
  const [autoRotate, setAutoRotate] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);

  const palette = COLORS[color];

  const onFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const onDownload = () => {
    const canvas = canvasHostRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = (canvas as HTMLCanvasElement).toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `sonix-${color}.png`;
    a.click();
  };

  return (
    <div
      ref={wrapRef}
      className="relative min-h-screen w-full overflow-hidden text-white transition-[background] duration-700 ease-out"
      style={{ background: palette.bg }}
    >
      {/* subtle vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Nav */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <div className="flex items-center gap-2">
          <div
            className="h-7 w-7 rounded-full"
            style={{ background: palette.accent }}
          />
          <span className="text-lg font-semibold tracking-[0.2em]">SONIX</span>
        </div>
        <nav className="hidden gap-8 text-sm text-white/70 md:flex">
          <a href="/" className="hover:text-white">Home</a>
          <a href="#" className="hover:text-white">Shop</a>
          <a href="#" className="hover:text-white">Tech</a>
          <a href="#" className="hover:text-white">Support</a>
        </nav>
        <button
          className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur transition hover:bg-white/20"
          style={{ color: palette.accent, borderColor: palette.accent + "55" }}
        >
          Buy Now
        </button>
      </header>

      {/* Hero */}
      <main className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 pb-32 md:grid-cols-[1fr_1.4fr_1fr] md:px-12">
        {/* Left meta */}
        <div className="hidden flex-col justify-center gap-6 md:flex">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Studio Grade
          </p>
          <h1 className="text-4xl font-light leading-tight">
            Sonix <span style={{ color: palette.accent }}>Aero</span>
            <br />
            Pro Wireless
          </h1>
          <p className="text-sm text-white/70">
            Hand-tuned 40mm drivers, adaptive ANC, 48-hour battery. Crafted from
            aerospace aluminum and memory cushions.
          </p>
          <div className="flex gap-4 text-xs uppercase tracking-wider text-white/60">
            <div>
              <div className="text-2xl font-light text-white">48h</div>
              Battery
            </div>
            <div>
              <div className="text-2xl font-light text-white">-32db</div>
              ANC
            </div>
            <div>
              <div className="text-2xl font-light text-white">40mm</div>
              Driver
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div
          ref={canvasHostRef}
          className="relative h-[60vh] min-h-[420px] w-full md:h-[78vh]"
        >
          <FullCanvas
            color={palette.hex}
            autoRotate={autoRotate}
            resetKey={resetKey}
          />
          {/* floor glow */}
          <div
            className="pointer-events-none absolute inset-x-10 bottom-6 h-24 rounded-full opacity-50 blur-3xl"
            style={{ background: palette.accent }}
          />
        </div>

        {/* Right meta */}
        <div className="hidden flex-col justify-center gap-4 text-right md:flex">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            From
          </p>
          <div className="text-5xl font-light">
            $799<span className="text-base text-white/50"> /USD</span>
          </div>
          <p className="text-sm text-white/60 line-through">$999</p>
          <p className="text-xs text-white/70">
            Free express shipping · 30-day returns · 2-year warranty
          </p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black hover:bg-white/90"
              onClick={() => alert("Added to cart")}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      {/* Controls bar */}
      <div className="absolute inset-x-0 bottom-6 z-20 flex flex-col items-center gap-4 px-6">
        {/* Color swatches */}
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-4 py-3 backdrop-blur-xl">
          {(Object.keys(COLORS) as ColorKey[]).map((k) => {
            const c = COLORS[k];
            const active = k === color;
            return (
              <button
                key={k}
                title={c.label}
                aria-label={c.label}
                onClick={() => setColor(k)}
                className={`h-8 w-8 rounded-full border-2 transition-transform duration-300 ${
                  active
                    ? "scale-110 border-white shadow-[0_0_0_3px_rgba(255,255,255,0.15)]"
                    : "border-white/30 hover:scale-105"
                }`}
                style={{ background: c.swatch }}
              />
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <CtrlBtn onClick={() => setResetKey((k) => k + 1)}>Reset View</CtrlBtn>
          <CtrlBtn
            active={autoRotate}
            onClick={() => setAutoRotate((v) => !v)}
          >
            Auto Rotate {autoRotate ? "On" : "Off"}
          </CtrlBtn>
          <CtrlBtn onClick={onFullscreen}>Fullscreen</CtrlBtn>
          <CtrlBtn onClick={onDownload}>Download</CtrlBtn>
        </div>

        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Drag to rotate · Scroll to zoom · {palette.label}
        </p>
      </div>
    </div>
  );
}

function CtrlBtn({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 backdrop-blur-md transition ${
        active
          ? "border-white/60 bg-white/20 text-white"
          : "border-white/15 bg-white/5 text-white/80 hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}