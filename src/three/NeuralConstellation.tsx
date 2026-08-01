import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The hero centrepiece: a layered feed-forward neural network living in 3D,
 * with pulses of light travelling along its edges like a live forward pass.
 *
 * This replaces the old distorting sphere — an abstract ball said nothing about
 * the work; a firing network is exactly on-theme for an ML / data-science
 * portfolio. It is still deliberately calm: a slow idle spin, a gentle float,
 * and a small lean toward the cursor. No scroll coupling.
 *
 * Everything is local: nodes and pulses are drawn as THREE.Points using a
 * one-time canvas-generated radial sprite (so the dots are round and glowing
 * without a bloom pass or any texture file), and edges are a single
 * LineSegments. No CDN, no HDR, no postprocessing deps.
 */

// Site palette, matched to the green→blue gradient used across the DOM.
const GREEN = new THREE.Color("#4ade80"); // green-400
const BLUE = new THREE.Color("#3b82f6"); // blue-500

// Feed-forward layer sizes, input → output. Varied counts read as organic.
const LAYERS = [4, 6, 5, 3];
const LAYER_GAP = 2.1; // spacing between layers along X
const LAYER_SPREAD = 3.2; // vertical extent a layer's nodes occupy
const Z_JITTER = 0.9; // random depth per node so the graph isn't flat

/** One-time round, soft sprite so THREE.Points render as glowing discs rather
 *  than hard squares. Reused for both nodes and pulses. */
function makeSprite(): THREE.CanvasTexture {
  const s = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = s;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.65)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface Edge {
  a: THREE.Vector3;
  b: THREE.Vector3;
  phase: number; // starting offset so pulses don't all fire in lockstep
  speed: number;
}

function Network() {
  const group = useRef<THREE.Group>(null);
  const pulses = useRef<THREE.Points>(null);
  const sprite = useMemo(makeSprite, []);

  // Build node positions, per-node colours, and the edge list once.
  const { nodePositions, nodeColors, edges } = useMemo(() => {
    const layerNodes: THREE.Vector3[][] = [];
    const positions: number[] = [];
    const colors: number[] = [];
    const c = new THREE.Color();
    const totalWidth = (LAYERS.length - 1) * LAYER_GAP;

    LAYERS.forEach((count, li) => {
      const x = -totalWidth / 2 + li * LAYER_GAP;
      const layer: THREE.Vector3[] = [];
      for (let n = 0; n < count; n++) {
        // Spread nodes evenly across the vertical span, then jitter in depth.
        const y = count === 1 ? 0 : (n / (count - 1) - 0.5) * LAYER_SPREAD;
        const z = (Math.random() * 2 - 1) * Z_JITTER;
        const v = new THREE.Vector3(x, y, z);
        layer.push(v);
        positions.push(v.x, v.y, v.z);
        c.copy(GREEN).lerp(BLUE, li / (LAYERS.length - 1));
        colors.push(c.r, c.g, c.b);
      }
      layerNodes.push(layer);
    });

    // Fully connect adjacent layers — an unmistakable feed-forward look.
    const edges: Edge[] = [];
    for (let li = 0; li < layerNodes.length - 1; li++) {
      layerNodes[li].forEach((a) => {
        layerNodes[li + 1].forEach((b) => {
          edges.push({ a, b, phase: Math.random(), speed: 0.35 + Math.random() * 0.4 });
        });
      });
    }

    return {
      nodePositions: new Float32Array(positions),
      nodeColors: new Float32Array(colors),
      edges,
    };
  }, []);

  // Flat edge endpoints for the LineSegments wiring.
  const edgePositions = useMemo(() => {
    const arr = new Float32Array(edges.length * 6);
    edges.forEach((e, i) => {
      arr.set([e.a.x, e.a.y, e.a.z, e.b.x, e.b.y, e.b.z], i * 6);
    });
    return arr;
  }, [edges]);

  // One travelling pulse per edge; positions are filled every frame.
  const { pulsePositions, pulseColors } = useMemo(() => {
    const pulsePositions = new Float32Array(edges.length * 3);
    const pulseColors = new Float32Array(edges.length * 3);
    const c = new THREE.Color();
    edges.forEach((e, i) => {
      // Tint the pulse toward the layer it is heading into.
      c.copy(GREEN).lerp(BLUE, 0.5).lerp(new THREE.Color("#ffffff"), 0.4);
      pulseColors.set([c.r, c.g, c.b], i * 3);
    });
    return { pulsePositions, pulseColors };
  }, [edges]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);

    // Advance every pulse along its edge; wrap at the far node.
    const geo = pulses.current?.geometry;
    if (geo) {
      const attr = geo.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const t = state.clock.elapsedTime;
      edges.forEach((e, i) => {
        // fract() of (time*speed + phase) gives a looping 0→1 sweep per edge.
        const p = (t * e.speed + e.phase) % 1;
        const ix = i * 3;
        arr[ix] = e.a.x + (e.b.x - e.a.x) * p;
        arr[ix + 1] = e.a.y + (e.b.y - e.a.y) * p;
        arr[ix + 2] = e.a.z + (e.b.z - e.a.z) * p;
      });
      attr.needsUpdate = true;
    }

    if (group.current) {
      // Slow idle spin so the depth of the graph always reads.
      group.current.rotation.y += delta * 0.15;
      // Small damped lean toward the cursor — eases rather than snaps.
      const targetX = state.pointer.y * 0.3;
      group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3, delta);
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={group}>
        {/* Wiring */}
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={BLUE} transparent opacity={0.14} />
        </lineSegments>

        {/* Nodes */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[nodeColors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={sprite}
            size={0.42}
            sizeAttenuation
            vertexColors
            transparent
            depthWrite={false}
            alphaTest={0.01}
          />
        </points>

        {/* Signal pulses */}
        <points ref={pulses}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pulsePositions, 3]} />
            <bufferAttribute attach="attributes-color" args={[pulseColors, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={sprite}
            size={0.22}
            sizeAttenuation
            vertexColors
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </Float>
  );
}

export function NeuralConstellation() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <Network />
    </Canvas>
  );
}

export default NeuralConstellation;
