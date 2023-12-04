/* eslint-disable react/no-unknown-property */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import IslandScene from "../assets/japan-island3.glb";

const Island = ({
  isRotating,
  setIsRotating,
  setCurrentStage,
  limitRotation,
  setLimitRotation,
  setIsMoving,
  ...props
}) => {
  const islandRef = useRef();

  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(IslandScene);

  const lastX = useRef(0);
  const lastY = useRef(0);
  const rotationSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    setIsMoving(true);

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    lastX.current = clientX;
    lastY.current = clientY;
  };
  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
    if (Math.abs(rotationSpeed.current) < 0.12) setIsMoving(false);
  };
  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;
      const clientY = event.touches ? event.touches[0].clientY : event.clientY;

      const deltaX = (clientX - lastX.current) / viewport.width;
      const deltaY = (clientY - lastY.current) / viewport.height;

      islandRef.current.rotation.y += deltaX * 0.01 * Math.PI;

      setLimitRotation(islandRef.current.rotation.x + deltaY * 0.01 * Math.PI);
      if (limitRotation <= 0.4 && limitRotation >= 0) {
        islandRef.current.rotation.x += deltaY * 0.01 * Math.PI;
      } else if (limitRotation > 0.4) islandRef.current.rotation.x = 0.4;
      else if (limitRotation < 0) islandRef.current.rotation.x = 0;

      lastX.current = clientX;
      lastY.current = clientY;
      rotationSpeed.current = deltaX * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key == "ArrowLeft") {
      if (!isRotating) {
        setIsMoving(true);
        setIsRotating(true);
      }

      islandRef.current.rotation.y -= 0.005 * Math.PI;
    } else if (e.key == "ArrowRight") {
      if (!isRotating) {
        setIsMoving(true);
        setIsRotating(true);
      }

      islandRef.current.rotation.y += 0.005 * Math.PI;
    }
  };

  const handleKeyup = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      setIsRotating(false);
      setIsMoving(false);
    }
  };

  useFrame(() => {
    if (!isRotating && Math.abs(rotationSpeed.current) > 0) {
      if (Math.abs(rotationSpeed.current) < 0.01) setIsMoving(false);
    }
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;

      if (Math.abs(rotationSpeed.current) < 0.001) rotationSpeed.current = 0;

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      const rotation = islandRef.current.rotation.y;

      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  return (
    <a.group ref={islandRef} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001.geometry}
        material={materials.Land}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_1.geometry}
        material={materials["Land-3"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_2.geometry}
        material={materials["Land-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle001_3.geometry}
        material={materials["Land-4"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cube.geometry}
        material={materials.Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.grass.geometry}
        material={materials["Leaf-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rire.geometry}
        material={materials.Balcony}
      />
      <group position={[0, 0, 0.351]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Vert004.geometry}
          material={materials["Wood-3"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Vert004_1.geometry}
          material={materials.Metal}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Vert004_2.geometry}
          material={materials["Metal-2"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Vert004_3.geometry}
          material={materials["Balcony-2"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tree.geometry}
        material={materials["Wood-3"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vert005.geometry}
        material={materials.cable}
        position={[0, 0.425, 0.103]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.water.geometry}
        material={materials.Water}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061.geometry}
        material={materials.Rock}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061_1.geometry}
        material={materials["Rock-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061_2.geometry}
        material={materials.red}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061_3.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube061_4.geometry}
        material={materials["Wood-door"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder012.geometry}
        material={materials.Bamboo}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder012_1.geometry}
        material={materials["Wood-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube084.geometry}
        material={materials.Box}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube084_1.geometry}
        material={materials["Box.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle005.geometry}
        material={materials["Metal-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle005_1.geometry}
        material={materials["red-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube042.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube042_1.geometry}
        material={materials.Orange}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube075.geometry}
        material={materials.Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube075_1.geometry}
        material={materials["Metal-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube075_2.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle030.geometry}
        material={materials["Balcony-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle030_1.geometry}
        material={materials.cable}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={materials.Roof}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_1.geometry}
        material={materials.Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_2.geometry}
        material={materials["Wood-door"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_3.geometry}
        material={materials.Estructure}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_4.geometry}
        material={materials["Balcony-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_5.geometry}
        material={materials.Door}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_6.geometry}
        material={materials.Balcony}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_7.geometry}
        material={materials.Leaf}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_8.geometry}
        material={materials["Estructure-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_9.geometry}
        material={materials["Wood-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_10.geometry}
        material={materials.Flowerpot}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_11.geometry}
        material={materials["Leaf-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_12.geometry}
        material={materials.Sing}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_13.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_14.geometry}
        material={materials["Leaf-b-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_15.geometry}
        material={materials.Water}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_16.geometry}
        material={materials.Land}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_17.geometry}
        material={materials["Land-4"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_18.geometry}
        material={materials["Wood-3"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_19.geometry}
        material={materials.Metal}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_20.geometry}
        material={materials.cable}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_21.geometry}
        material={materials.red}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_22.geometry}
        material={materials.Bamboo}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_23.geometry}
        material={materials.glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006_24.geometry}
        material={materials["Metal-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle016.geometry}
        material={materials["Land-6"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle016_1.geometry}
        material={materials["Land-5"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_2.geometry}
        material={materials["Leaf-b-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_3.geometry}
        material={materials["Leaf-b"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube080.geometry}
        material={materials["Rock-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube080_1.geometry}
        material={materials.Rock}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle013.geometry}
        material={materials["Land-6"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle013_1.geometry}
        material={materials.Orange}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle013_2.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle013_3.geometry}
        material={materials.Balcony}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle013_4.geometry}
        material={materials["Wood-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Circle013_5.geometry}
        material={materials.Sing}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Wood-door"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_1.geometry}
        material={materials.glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_2.geometry}
        material={materials.Estructure}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_3.geometry}
        material={materials["Leaf-b"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_4.geometry}
        material={materials["Metal-2"]}
      />
    </a.group>
  );
};

export default Island;
