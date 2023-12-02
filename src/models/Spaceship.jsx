import { useRef, useState, useEffect } from "react";

import spaceship from "../assets/spaceship.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const Spaceship = ({
  isRotating,
  setIsRotating,
  limitRotation,
  isMoving,
  ...props
}) => {
  const spaceshipRef = useRef();
  const { scene, animations } = useGLTF(spaceship);
  const { actions } = useAnimations(animations, spaceshipRef);

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
        spaceshipRef.current.position.y -= deltaY * 0.035 * Math.PI;
        spaceshipRef.current.rotation.x += deltaY * 0.01 * Math.PI;
      }

      lastY.current = clientY;
    }
  };

  useFrame((state, delta) => {
    // implement delta in animation
    isMoving
      ? scene.rotation.x > Math.PI * -0.5
        ? (scene.rotation.x -= 0.1)
        : null
      : scene.rotation.x <= -0.1
      ? (scene.rotation.x += 0.1)
      : null;
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);

    if (isMoving) {
      actions["rockedAction.001"].play();
      actions["partcles.006"].play();
      actions["partcles.007"].play();
      actions["partcles.008"].play();
      actions["partcles.010"].play();
      actions["partcles.1"].play();
      actions["stop"].stop();
      actions["stop-fire"].stop();
      // scene.rotation.set(Math.PI * 0.4, Math.PI, Math.PI * 0.5);
    } else {
      actions["rockedAction.001"].stop();
      actions["partcles.006"].stop();
      actions["partcles.007"].stop();
      actions["partcles.008"].stop();
      actions["partcles.010"].stop();
      actions["partcles.1"].stop();
      actions["stop"].play();
      actions["stop-fire"].play();
      scene.children[0].scale.set(0);
      scene.children[1].scale.set(0);
      scene.children[2].scale.set(0);
      scene.children[3].scale.set(0);
      scene.children[4].scale.set(0);
      // scene.rotation.set(Math.PI * 0.4, Math.PI * -0.5, Math.PI * 0.5);
    }

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerMove]);

  return (
    <mesh ref={spaceshipRef} {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Spaceship;
