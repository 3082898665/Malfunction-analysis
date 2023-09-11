import React,{useRef} from 'react'
import {useGLTF} from '@react-three/drei'
import {useFrame} from '@react-three/fiber'


export default function Model() {
    // const model=useLoader(GLTFLoader,'/model.gltf')
    const model=useGLTF('/deer.gltf')
    console.log(model)
    const cubref=useRef()
useFrame(()=>{
    //  cubref.current.rotation.y+=0.01
    //  gubref.current.rotation.y+=0.01
})
  return (
    <primitive object={model.scene} scale={0.0025} ref={cubref} position-y={-1}/>
  )
}
useGLTF.preload('/deer.gltf')
