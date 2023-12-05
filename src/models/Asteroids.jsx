import React, { useEffect, useRef } from "react";
import asteorids from "../assets/asteorids.glb";
import { useAnimations, useGLTF } from "@react-three/drei";

const Asteroids = ({ ...props }) => {
  const asteroidsRef = useRef();
  const { scene, animations } = useGLTF(asteorids);
  const { actions } = useAnimations(animations, asteroidsRef);

  useEffect(() => {
    console.log(actions);
    actions["cadena1Action"].play();
    actions["cadena 2Action"].play();
    actions["cadena 2Action.001"].play();
  }, []);

  return (
    <mesh ref={asteroidsRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Asteroids;
