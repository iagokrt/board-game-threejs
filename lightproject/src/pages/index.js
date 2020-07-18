import React, { useRef, useState } from 'react';
import './style.css';

import { Canvas, useFrame } from 'react-three-fiber';

import { softShadows, MeshWobbleMaterial, OrbitControls } from 'drei';

import { useSpring, a } from 'react-spring/three'; 

softShadows();

const Card = ({locale, args, color, speed}) => {
  const mesh = useRef(null)
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  // expand state of the mesh. change size on click event
  const [expand, setExpand] = useState(false);

  const props = useSpring({ 
    scale: expand ? [1.4, 1.4, 1.4]: [1,1,1],
  })

  return (
    <a.mesh 
      onClick={() => setExpand(!expand)} 
      scale={props.scale} 
      castShadow 
      position={locale} 
      ref={mesh}>
          <boxBufferGeometry attach='geometry' args={args} />
          <MeshWobbleMaterial attach='material' color={color} speed={speed} factor={0.6}  />
    </a.mesh> 
  )
}

function Home() {
  
  return (
    <>
      <Canvas shadowMap colorManagement camera={{position: [-5, 2, 10], fov: 60}}>
        <group>
        <ambientLight intensity={0.3} />
        <directionalLight 
          position={[0,10,0]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-width={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5}  />
        <pointLight position={[0, -10, 0]} intensity={1.5}  />
        </group>

        <group>
          <mesh receiveShadow  rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} >
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
        {/* <meshStandardMaterial attach='material' color='lightblue' /> */}
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>

          {/* 4 x 4 cards */}
          <Card locale={[-2, 1, -2]} color={'navy'}  speed={6} />
          <Card locale={[0, 1, -2]} color={'navy'} speed={6} />
          <Card locale={[2, 1, -2]} color={'navy'}  speed={6} />
          <Card locale={[4, 1, -2]} color={'navy'} speed={6} />

          <Card locale={[-2, 3, -2]} color={'teal'}  speed={3} />
          <Card locale={[0, 3, -2]} color={'teal'} speed={3} />
          <Card locale={[2, 3, -2]} color={'teal'}  speed={3} />
          <Card locale={[4, 3, -2]} color={'teal'} speed={3} />
          
          <Card locale={[-2, 5, -2]} color={'blue'}  speed={9} />
          <Card locale={[0, 5, -2]} color={'blue'} speed={9} />
          <Card locale={[2, 5, -2]} color={'blue'}  speed={9} />
          <Card locale={[4, 5, -2]} color={'blue'} speed={9} />
          
          <Card locale={[-2, -1, -2]} color={'aqua'}  speed={2} />
          <Card locale={[0, -1, -2]} color={'aqua'} speed={2} />
          <Card locale={[2, -1, -2]} color={'aqua'}  speed={2} />
          <Card locale={[4, -1, -2]} color={'aqua'} speed={2} />

        </group>


        <OrbitControls />

      </Canvas>
    </>
    );
}

export default Home;