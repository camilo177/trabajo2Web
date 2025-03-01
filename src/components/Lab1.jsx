import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { OrbitControls } from "@react-three/drei";

const Lab1 = () => {
  // Load textures for each figure from the /assets folder
  const cubeAlbedo = useLoader(TextureLoader, "/assets/cube_albedo.jpg");
  const cubeAlpha = useLoader(TextureLoader, "/assets/cube_alpha.png");
  const sphereTexture = useLoader(TextureLoader, "/assets/sphere_texture.jpg");
  const coneTexture = useLoader(TextureLoader, "/assets/cone_texture.jpg");
  const torusTexture = useLoader(TextureLoader, "/assets/torus_texture.jpg");
  const cylinderTexture = useLoader(TextureLoader, "/assets/cylinder_texture.jpg");

  // Create a ref for the sphere to animate its rotation
  const sphereRef = useRef();
  useFrame((state, delta) => {
    if (sphereRef.current) {
      // Apply a slight continuous rotation around the Y axis
      sphereRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Canvas camera={{ position: [0, 5, 15], fov: 50 }} shadows>
      {/* Lighting: ambient light for overall illumination and a directional light that casts shadows */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />

      {/* OrbitControls: allows interactive camera movement (rotate, pan, zoom) */}
      <OrbitControls />

      {/* Cube: Demonstrates dual texturing with an albedo and an alpha texture for transparency */}
      <mesh position={[-6, 2, 0]} castShadow>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial
          map={cubeAlbedo}
          alphaMap={cubeAlpha}
          transparent={true}
        />
      </mesh>

      {/* Sphere: Has a texture and a slight rotation animation (using useFrame) */}
      <mesh ref={sphereRef} position={[-2, 2, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial map={sphereTexture} />
      </mesh>

      {/* Cone: Applies a texture to showcase another geometry type */}
      <mesh position={[2, 2, 0]} castShadow>
        <coneGeometry args={[1, 3, 32]} />
        <meshStandardMaterial map={coneTexture} />
      </mesh>

      {/* Torus (doughnut shape): Uses its own texture */}
      <mesh position={[6, 2, 0]} castShadow>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial map={torusTexture} />
      </mesh>

      {/* Cylinder: Uses a dedicated texture */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[1, 1, 3, 32]} />
        <meshStandardMaterial map={cylinderTexture} />
      </mesh>

      {/* Ground Plane: A large horizontal plane that receives shadows to ground the scene */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -3.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="lightgray" />
      </mesh>
    </Canvas>
  );
};

export default Lab1;
