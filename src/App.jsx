import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import WatchTest from "./test-asset.js";

function SmartWatch() {
  const { scene, animations } = useGLTF("/watch.glb", true);
  const watchRef = useRef();
  const mixerRef = useRef();
  const scrollSpeed = useRef(0);

  console.log(animations);

  useEffect(() => {
    if (animations.length) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });
    }

    // Apply an enhanced material
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: "#2C3E50", // Dark grey
          metalness: 0.8,
          roughness: 0.2,
          clearcoat: 0.5,
          reflectivity: 0.6
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta * scrollSpeed.current);
  });

  useEffect(() => {
    const handleScroll = () => {
      scrollSpeed.current = window.scrollY * 0.0005; // Adjust animation speed on scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <group ref={watchRef} scale={[5, 5, 5]} position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function App() {
  return (
    // <Canvas shadows camera={{ position: [0, 2, 5], fov: 45 }}>
    //   {/* Improved lighting */}
    //   <ambientLight intensity={0.8} />
    //   <directionalLight position={[3, 3, 3]} intensity={1.5} castShadow />
    //   <spotLight position={[5, 5, 5]} angle={0.3} intensity={2} castShadow />
    //   <SmartWatch />
    //   <OrbitControls enablePan enableZoom enableRotate />
    // </Canvas>
    <WatchTest/>
  );
}

export default App;
