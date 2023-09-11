import React from 'react'
import {Canvas} from '@react-three/fiber'
import Load from './Down'

export default function Test() {
  return (
    <Canvas
    shadows

 
    >
<color  args={['rgb(255,255,255)']} attach={'background'}/>
        <Load/>
    </Canvas>
  )
}
