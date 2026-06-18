"use client";
import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ scrollY }: { scrollY: number }) {
  const mesh    = useRef<THREE.Points>(null!);
  const mouse   = useRef({ x: 0, y: 0 });
  const { size } = useThree();
  const count   = size.width < 768 ? 2400 : 5000;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const [positions, colors] = useMemo(() => {
    const pos  = new Float32Array(count * 3);
    const col  = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#c8961e"),
      new THREE.Color("#f0c040"),
      new THREE.Color("#00d4ff"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#ffffff"),
    ];
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r  = 15 + Math.random() * 40;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pos[i3 + 2] = (Math.random() - 0.5) * 50;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i3] = c.r; col[i3+1] = c.g; col[i3+2] = c.b;
    }
    return [pos, col];
  }, [count]);

  const texture = useMemo(() => {
    const c   = document.createElement("canvas");
    c.width   = c.height = 64;
    const ctx = c.getContext("2d")!;
    const g   = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0,   "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,.5)");
    g.addColorStop(1,   "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(c);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y  = t * 0.018 + mouse.current.x * 0.12;
    mesh.current.rotation.x  = t * 0.01  + mouse.current.y * 0.08;
    // scroll fade
    const pct = scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
    (mesh.current.material as THREE.PointsMaterial).opacity = Math.max(0, 0.75 - pct * 2);
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.35}
        map={texture}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// Musical staff lines — animated
function StaffLines() {
  const group = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    group.current.position.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3;
  });

  return (
    <group ref={group} position={[0, 0, -10]}>
      {[-2, -1, 0, 1, 2].map((y, i) => (
        <mesh key={i} position={[0, y * 0.8, 0]}>
          <boxGeometry args={[40, 0.012, 0.01]} />
          <meshBasicMaterial color={new THREE.Color("#c8961e")} transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroCanvas({ scrollY }: { scrollY: number }) {
  return (
    <Canvas
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      camera={{ position: [0, 0, 45], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ParticleField scrollY={scrollY} />
      <StaffLines />
    </Canvas>
  );
}
