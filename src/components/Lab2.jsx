import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const Lab2 = () => {
  // Rotating Tetrahedron: continuously rotates on the Y axis and adds extra X rotation when clicked.
  const RotatingTetrahedron = () => {
    const meshRef = useRef();
    const [clicked, setClicked] = useState(false);
    useFrame((state, delta) => {
      meshRef.current.rotation.y += delta; // continuous rotation in Y
      if (clicked) {
        meshRef.current.rotation.x += delta; // extra rotation on X when clicked
      }
    });
    return (
      <mesh
        ref={meshRef}
        position={[-3, 1, 0]}
        onClick={() => setClicked(!clicked)}
        castShadow
      >
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    );
  };

  // Oscillating Torus: moves along the Y axis using a sine function and rotates slowly.
  const OscillatingTorus = () => {
    const meshRef = useRef();
    useFrame(({ clock }) => {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime()) * 2;
      meshRef.current.rotation.x += 0.01;
    });
    return (
      <mesh ref={meshRef} position={[0, 1, 0]} castShadow>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial color="teal" />
      </mesh>
    );
  };

  // Interactive Icosahedron: rotates continuously on Y; on click, it oscillates its scale.
  const InteractiveIcosahedron = () => {
    const meshRef = useRef();
    const [clicked, setClicked] = useState(false);
    useFrame((state, delta) => {
      meshRef.current.rotation.y += delta * 0.5;
      if (clicked) {
        // Oscillate scale when clicked
        const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.3;
        meshRef.current.scale.set(scale, scale, scale);
      } else {
        meshRef.current.scale.set(1, 1, 1);
      }
    });
    return (
      <mesh
        ref={meshRef}
        position={[3, 1, 0]}
        onClick={() => setClicked(!clicked)}
        castShadow
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  };

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }} shadows>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

      {/* Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Animated Geometries */}
      <RotatingTetrahedron />
      <OscillatingTorus />
      <InteractiveIcosahedron />
    </Canvas>
  );
};

export default Lab2;
