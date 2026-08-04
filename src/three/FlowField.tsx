import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { Quality3D } from "@/three/use3D";

/**
 * The site-wide flow layer: a field of particles advected along a curl-noise
 * flow, drifting endlessly in the brand green→blue gradient.
 *
 * This is the ambient backdrop that sits behind every section — the "3D flow"
 * that makes the whole page feel alive, as opposed to the single hero orb in
 * HeroObject.tsx. It is deliberately quiet: low opacity, slow motion, and a
 * gentle parallax response to scroll and cursor, never scroll-jacking.
 *
 * Everything is local: no textures, no HDR, no network. The flow field is a
 * cheap divergence-free curl of layered sines, evaluated per particle on the
 * CPU each frame — plenty smooth for a few thousand points, and far simpler to
 * reason about than a GPGPU pass.
 */

// Palette matched to HeroObject.tsx and the DOM green-400 → blue-500 gradient.
const GREEN = new THREE.Color("#4ade80"); // green-400
const BLUE = new THREE.Color("#3b82f6"); // blue-500

const BOUNDS = 9; // half-extent of the cube the flow lives in; wrap at ±BOUNDS

/**
 * Per-tier cost. Particles are advected on the CPU each frame, so `count` is
 * the dominant knob; `dpr` is the other, since a 3x phone screen would
 * otherwise shade nine times the pixels of a 1x one.
 *
 * The low tier also draws slightly larger, more opaque points: at 900 particles
 * spread over a phone-sized viewport the default 0.045/0.55 reads as a faint
 * haze rather than a flow.
 */
const TIERS = {
  high: { count: 2500, dpr: [1, 2] as [number, number], size: 0.045, opacity: 0.55 },
  low: { count: 900, dpr: [1, 1.5] as [number, number], size: 0.07, opacity: 0.7 },
};

/**
 * Divergence-free (curl) flow field. Taking the curl of a vector potential
 * guarantees the flow has no sources or sinks, so particles swirl and fold
 * rather than collapsing onto attractors — that is what reads as "flow".
 */
function curl(x: number, y: number, z: number, out: THREE.Vector3) {
  const s = 0.35; // spatial frequency of the field
  // Potential field P = (p1, p2, p3) built from layered sines.
  // curl = ( dP3/dy - dP2/dz, dP1/dz - dP3/dx, dP2/dx - dP1/dy )
  const dP3dy = Math.cos(y * s + z * s) * s;
  const dP2dz = Math.cos(z * s + x * s) * s;
  const dP1dz = Math.cos(z * s + y * s) * s;
  const dP3dx = Math.cos(x * s + z * s) * s;
  const dP2dx = Math.cos(x * s + y * s) * s;
  const dP1dy = Math.cos(y * s + x * s) * s;
  out.set(dP3dy - dP2dz, dP1dz - dP3dx, dP2dx - dP1dy);
}

function Particles({ tier }: { tier: (typeof TIERS)[keyof typeof TIERS] }) {
  const { count: COUNT, size, opacity } = tier;
  const points = useRef<THREE.Points>(null);
  const group = useRef<THREE.Group>(null);
  const scratch = useRef(new THREE.Vector3()).current;

  // Build initial positions + per-particle colour once. Colour is lerped
  // green→blue by height so the field reads as a soft vertical gradient.
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const c = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() * 2 - 1) * BOUNDS;
      const y = (Math.random() * 2 - 1) * BOUNDS;
      const z = (Math.random() * 2 - 1) * BOUNDS;
      positions.set([x, y, z], i * 3);
      c.copy(GREEN).lerp(BLUE, (y / BOUNDS) * 0.5 + 0.5);
      colors.set([c.r, c.g, c.b], i * 3);
    }
    return { positions, colors };
  }, [COUNT]);

  useFrame((state, rawDelta) => {
    const geo = points.current?.geometry;
    if (!geo) return;
    // Clamp so a stalled tab (large delta on resume) can't fling every
    // particle across the field — same guard HeroObject.tsx uses.
    const delta = Math.min(rawDelta, 1 / 30);

    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const speed = delta * 0.6;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;
      let x = arr[ix];
      let y = arr[ix + 1];
      let z = arr[ix + 2];

      curl(x, y, z, scratch);
      x += scratch.x * speed;
      y += scratch.y * speed;
      z += scratch.z * speed;

      // Wrap around the cube so the flow never empties out.
      if (x > BOUNDS) x = -BOUNDS;
      else if (x < -BOUNDS) x = BOUNDS;
      if (y > BOUNDS) y = -BOUNDS;
      else if (y < -BOUNDS) y = BOUNDS;
      if (z > BOUNDS) z = -BOUNDS;
      else if (z < -BOUNDS) z = BOUNDS;

      arr[ix] = x;
      arr[ix + 1] = y;
      arr[ix + 2] = z;
    }
    attr.needsUpdate = true;

    // Gentle parallax: the whole field leans toward the cursor and drifts with
    // the scroll position, so the flow feels connected to the page without
    // driving the camera or hijacking the scroll.
    if (group.current) {
      const scroll = window.scrollY * 0.0006;
      const targetX = state.pointer.y * 0.12 + scroll * 0.5;
      const targetY = -state.pointer.x * 0.12 + scroll;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 2, delta);
      group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 2, delta);
    }
  });

  return (
    <group ref={group}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          sizeAttenuation
          vertexColors
          transparent
          opacity={opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function FlowField({ quality = "high" }: { quality?: Exclude<Quality3D, "off"> }) {
  const tier = TIERS[quality];

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={tier.dpr}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      // A wider field of view on the low tier pulls more of the flow into a
      // narrow viewport, so the backdrop still reads as a field of particles
      // rather than the handful that happen to fall inside a phone's frustum.
      camera={{ position: [0, 0, 12], fov: quality === "low" ? 70 : 55 }}
    >
      <Particles tier={tier} />
    </Canvas>
  );
}

export default FlowField;
