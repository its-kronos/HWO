import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const ExoplanetScene = ({ params }) => {
//   const pl_name = params.pl_name;
//   const PLradius = params.pl_rade / 23450; // Planet radius (Earth Radii converted to AU)
//   const STradius = params.st_rad / 215 ; // Star radius (Sun radii converted to AU)
//   const ri = 150; // (AU)
//   const ro = 190; // (AU)
//   const a = 250; // (AU)
//   const e = 0.5; // Eccentricity


  const pl_name = "Greg"; 
  const PLradius = 10; // Planet radius
  const STradius = 100; // Star radius
  const ri = 150; // Habitable zone inner radius
  const ro = 190; // Habitable zone outer radius
  const a = 250; // Semi-major axis
  const e = 0.5; // Eccentricity
  const b = a * Math.sqrt(1 - e ** 2); // Semi-minor axis

  // Define the elliptical orbit using EllipseCurve
  const orbitCurve = new THREE.EllipseCurve(
    0, 0, // xCenter, yCenter of the ellipse
    a, b, // semi-major axis and semi-minor axis
    0, 2 * -Math.PI, // start angle, end angle
    false, // clockwise
    0 // rotation
  );

  // Convert the curve to points to create a line
  const points = orbitCurve.getPoints(64); // Increase to make smoother
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <>
    <Canvas
      id='canvas'
      gl={{ alpha: false, antialias: true }}
      style={{ background: 'black', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 400], far: 100000000, near: 0.0001 }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={1.5} />

      {/* Star */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[STradius, 32, 32]} />
        <meshStandardMaterial emissive={'yellow'} emissiveIntensity={1} />
      </mesh>

      {/* Planet */}
      <mesh position={[a, 0, 0]}>
        <sphereGeometry args={[PLradius, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Habitable Zone (inner ring) */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ri, ro, 64]} />
        <meshBasicMaterial color="#64e892" transparent opacity={0.3} />
      </mesh>

      {/* Orbit (Ellipse) */}
      <line rotation={[-Math.PI/2,0,0]}>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial attach="material" color="white" />
      </line>

      {/* Controls */}
      <OrbitControls />
    </Canvas>
    {/* <div>{pl_name}</div> */}
    <div key={pl_name} id={pl_name} >
            {pl_name}
    </div>
    </>
  );
};

export default ExoplanetScene;
