import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

// Scene component: All R3F hooks are called here, inside the Canvas context.
const Scene = () => {
  // Load available textures from the /assets folder
  const cubeTexture = useLoader(TextureLoader, "/assets/texture1.jpg");
  const sphereTexture = useLoader(TextureLoader, "/assets/texture2.jpg");
  const alphaTexture = useLoader(TextureLoader, "/assets/alpha.png");

  // Create a ref for the sphere to animate its rotation
  const sphereRef = useRef();
  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Apply a slight continuous rotation around the Y axis
      sphereRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <>
      {/* Lighting: ambient light for overall illumination and directional light that casts shadows */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />

      {/* OrbitControls: enables interactive camera movement (rotate, pan, zoom) */}
      <OrbitControls />

      {/* Cube: Uses dual textures (albedo and alpha) */}
      <mesh position={[-6, 2, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          map={cubeTexture}
          alphaMap={alphaTexture}
          transparent={true}
        />
      </mesh>

      {/* Sphere: Has a texture and a slight rotation animation */}
      <mesh ref={sphereRef} position={[-2, 2, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial map={sphereTexture} />
      </mesh>

      {/* Cone: Uses cubeTexture */}
      <mesh position={[2, 2, 0]} castShadow>
        <coneGeometry args={[1, 3, 32]} />
        <meshStandardMaterial map={cubeTexture} />
      </mesh>

      {/* Torus: Uses sphereTexture */}
      <mesh position={[6, 2, 0]} castShadow>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial map={sphereTexture} />
      </mesh>

      {/* Cylinder: Uses cubeTexture */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial map={cubeTexture} />
      </mesh>

      {/* Ground Plane: A large horizontal plane that receives shadows */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </>
  );
};

const Lab1 = () => {
  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }} shadows>
      <Scene />
    </Canvas>
  );
};

export default Lab1;
