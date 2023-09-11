
import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Sztest(props) {
  const { nodes, materials } = useGLTF("/model.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.defaultMat}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/model.gltf");
