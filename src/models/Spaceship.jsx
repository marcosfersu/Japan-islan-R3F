import { useRef, useState, useEffect } from "react";

import spaceship from "../assets/spaceship.glb";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const Spaceship = ({ isRotating, setIsRotating, limitRotation, ...props }) => {
  const { scene } = useGLTF(spaceship);

  const islandRef = useRef();

  const { gl, viewport } = useThree();

  const lastY = useRef(0);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    lastY.current = clientY;
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      const deltaY = (clientY - lastY.current) / viewport.height;

      if (limitRotation <= 0.4 && limitRotation >= 0) {
        console.log(limitRotation);
        islandRef.current.position.y -= deltaY * 0.035 * Math.PI;
        islandRef.current.rotation.x += deltaY * 0.01 * Math.PI;
      }

      lastY.current = clientY;
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerMove]);

  return (
    <mesh ref={islandRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Spaceship;
