import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Loader from "../components/Loader";

import Insland from "../models/Island";

{
	/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
  POPUP
</div> */
}

const Home = () => {
	const ajutIslandForScreenSize = () => {
		let screenScale = null;
		let screenPosition = [0, -1, 0];
		let islandRotation = [0, 4.7, 0];

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
		<section className="w-full h-screen relative">
			<Canvas
				className="w-full h-screen bg-transparent"
				camera={{ near: 0.1, far: 1000 }}
			>
				<Suspense fallback={<Loader />}>
					<directionalLight />
					<ambientLight />
					<Insland
						scale={screenScale}
						position={screenPosition}
						rotation={islandRotation}
					/>
				</Suspense>
			</Canvas>
		</section>
	);
};

export default Home;
