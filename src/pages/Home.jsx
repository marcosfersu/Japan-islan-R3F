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
import Spaceship from "./../models/SpaceShip";
import HomeInfo from "../components/HomeInfo";

{
	/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */
}

const Home = () => {
	const [isRotating, setIsRotating] = useState(false);
	const [currentStage, setCurrentStage] = useState(1);
	const [limitRotation, setLimitRotation] = useState(0);
	const [isMoving, setIsMoving] = useState(false);

	const ajutIslandForScreenSize = () => {
		let screenScale = null;
		let screenPosition = [0, -1.3, -4.5];
		let islandRotation = [0.2, 0.5, 0];

		if (window.innerWidth < 768) {
			screenScale = [0.9, 0.9, 0.9];
		} else {
			screenScale = [1, 1, 1];
		}

		return [screenScale, screenPosition, islandRotation];
	};
	const [screenScale, screenPosition, islandRotation] =
		ajutIslandForScreenSize();

	const ajustSpaceshipScreenSize = () => {
		let screenSpaceshipScale = null;
		let screenSpaceshipPosition = null;

		if (window.innerWidth < 768) {
			screenSpaceshipScale = [0.5, 0.5, 0.5];
			screenSpaceshipPosition = [0, -1.92, 2];
		} else {
			screenSpaceshipScale = [0.35, 0.35, 0.35];
			screenSpaceshipPosition = [0, -1.92, 2];
		}

		return [screenSpaceshipPosition, screenSpaceshipScale];
	};

	const [screenSpaceshipPosition, screenSpaceshipScale] =
		ajustSpaceshipScreenSize();

	return (
		<section
			className={`w-full h-screen relative bg ${
				isRotating ? "cursor-grabbing" : "cursor-grab"
			} `}
		>
			<div className="absolute top-28 left-0 right-0 z-10 flex justify-center items-center text-white">
				{currentStage && <HomeInfo currentStage={currentStage} />}
			</div>
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
						setIsMoving={setIsMoving}
						isMoving={isMoving}
					/>
					<Spaceship
						isRotating={isRotating}
						setIsRotating={setIsRotating}
						rotation={[Math.PI * 0.4, Math.PI * -0.5, Math.PI * 0.5]}
						limitRotation={limitRotation}
						isMoving={isMoving}
						position={screenSpaceshipPosition}
						scale={screenSpaceshipScale}
					/>
				</Suspense>

				<OrbitControls enableZoom={true} minDistance={1.5} maxDistance={8} />

				<Stars radius={500} depth={50} count={1000} factor={10} noise={20} />
			</Canvas>
		</section>
	);
};

export default Home;
