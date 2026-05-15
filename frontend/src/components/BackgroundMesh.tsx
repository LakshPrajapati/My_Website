import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function ParticleField() {
  const ref = useRef<any>();
  // Generate random points in a sphere
  const sphere = random.inSphere(new Float32Array(3000), { radius: 1.5 });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
      {/* Cinematic dark vignette over the particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/50 to-[#050816] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050816_100%)] pointer-events-none" />
    </div>
  );
};

export default BackgroundMesh;
