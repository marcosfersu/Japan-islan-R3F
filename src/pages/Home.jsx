import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "../components/Loader";

import Insland from "../models/Island";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import Spaceship from "../models/SpaceShip";

{
  /* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */
}

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [limitRotation, setLimitRotation] = useState(0);

  const ajutIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, 0, -4.5];
    let islandRotation = [0.2, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, islandRotation];
  };
  const [screenScale, screenPosition, islandRotation] =
    ajutIslandForScreenSize();

  return (
    <section
      className={`w-full h-screen relative bg ${
        isRotating ? "cursor-grabbing" : "cursor-grab"
      } `}
    >
      <Canvas
        dpr={[1.5, 2]}
        shadows
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <fog attach="fog" args={["#ffff", 16, 30]} />
        <directionalLight
          castShadow
          position={[1, 1.5, 2]}
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          intensity={0.5}
        />
        <ambientLight intensity={1} />
        <hemisphereLight
          skyColor="b1e1ff"
          groundColor="#000000"
          intensity={2}
        />

        <Suspense fallback={<Loader />}>
          <Insland
            scale={screenScale}
            position={screenPosition}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            limitRotation={limitRotation}
            setLimitRotation={setLimitRotation}
          />
          <Spaceship
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            rotation={[Math.PI * 0.3, Math.PI, Math.PI * 0.5]}
            limitRotation={limitRotation}
            position={[0, -1.8, 0.5]}
            scale={0.45}
          />
        </Suspense>

        <OrbitControls enableZoom={true} minDistance={1.5} maxDistance={8} />

        <Stars radius={500} depth={50} count={1000} factor={10} noise={20} />
      </Canvas>
    </section>
  );
};

export default Home;
