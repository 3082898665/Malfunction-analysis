import React, { useRef } from 'react'
import { useFrame, extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Suspense } from 'react'
import * as THREE from 'three'
import { Environment,Sky,useHelper, BakeShadows,SoftShadows } from '@react-three/drei'
import { useControls, button } from 'leva'
import Model from './Model'
import Sztest from './Sztest'
import Sztest1 from './Sztest_sec'
extend({ OrbitControls })

export default function Down() {
    const { position, color, choice } = useControls('Downliading', {
        position: {
            value: { x: -3, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#E3F2C1',

        choice: { options: ['Excel', 'txt', 'cmd'] },
        down: button(() => {
            console.log(choice)
        }),
    })
    const {sunPos}=useControls('sky',{
        sunPos:{value:[1,2,3]}
    })
    const { camera, gl } = useThree()
    const directlight = useRef()
    // useHelper(directlight, THREE.DirectionalLightHelper, 1)   //指示光线

    return <>
        {/* <Perf  position='top-left'/> */}
        {/* <BakeShadows /> */}

        <orbitControls args={[camera, gl.domElement]} />
        <directionalLight 
        ref={directlight} 
        castShadow 
        shadow-camera-near={1}
        // shadow-camera-top={5}
        // shadow-camera-bottom={-5}
        // shadow-camera-left={5}
        // shadow-camera-right={-5}     控制光线方向
        shadow-mapSize={[1024,1024*2]}
        position={[1, 2, 3]} 
        intensity={1.5} 
        shadow-normalBias={0.5}></directionalLight>
        <ambientLight intensity={0.5} />
        {/* <Sky sunPosition={sunPos}/> */}
  
        <group rotation-x={Math.PI * 0.125} rotation-y={Math.PI * 0.105}>

            {/* <mesh castShadow position={[position.x, position.y, 0]} >
                <sphereGeometry />
                <meshStandardMaterial color={color} />
            </mesh>
*/}

            <mesh receiveShadow position-y={-1} scale={3} rotation-x={Math.PI * 1.5} >           
                <circleGeometry />
                <meshStandardMaterial />
            </mesh>
            <Sztest1 position-y={-1} scale={0.003}/>
            {/* <Suspense
    fallbake={<mesh position-y={1} scale={[2,3,2]}><boxGeometry args={[1,1,1,2,2,2]}/><meshBasicMaterial wireframe color="red"></meshBasicMaterial></mesh>}
    >
    <Model position-y={-0.04}/>
    </Suspense> */}
        </group>
    </>

}
