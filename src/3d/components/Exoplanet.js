import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { habitZoneRadii } from '../../utils/utils';
import { updateLabel } from './utils';

const BCmap = {
    "B" : -0.2,
    "A": -0.3,
    "F": -0.15,
    "G": -0.4,
    "K": -0.8,
    "M": -2.0
}


const ExoplanetScene = ({ params }) => {

    const pl_name = params.pl_name;
    const PLradius = params.pl_rade / 23450; // Planet radius (Earth Radii converted to AU)
    const STradius = params.st_rad / 215 ; // Star radius (Sun radii converted to AU)
    const BC = BCmap[params.st_spectype[0]];
    const apparentMag = params.sy_vmag;
    const d = params.sy_dist;
    const [ri, ro] = habitZoneRadii(4.72, apparentMag, d, BC);
    const a = params.pl_orbsmax; // (AU)
    const e = params.pl_orbeccen; // Eccentricity
    const b = a * Math.sqrt(1 - e ** 2); // Semi-minor axis

  const planetRef = useRef(); 
  const labelRef = useRef(); 
  const textPosition = new THREE.Vector3(); 



  // Update label position every frame
const Animation = () => {
    const { camera, scene } = useThree(); // Get camera and scene from useThree
    useFrame(() => {
        if (planetRef.current && labelRef.current) {
          updateLabel(planetRef.current, labelRef.current, document.getElementById('canvas'), camera, textPosition);
        }
      });
}

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
        camera={{ position: [0, 2, 2], far: 100000000, near: 0.0001 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1.5} />

        {/* Star */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[STradius, 32, 32]} />
          <meshStandardMaterial emissive={'yellow'} emissiveIntensity={1} />
        </mesh>

        {/* Planet */}
        <mesh position={[a, 0, 0]} ref={planetRef}>
          <sphereGeometry args={[PLradius, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>

        {/* Habitable Zone (inner ring) */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ri, ro, 64]} />
          <meshBasicMaterial color="#64e892" transparent opacity={0.3} />
        </mesh>

        {/* Orbit (Ellipse) */}
        <line rotation={[-Math.PI / 2, 0, 0]}>
          <bufferGeometry attach="geometry" {...orbitGeometry} />
          <lineBasicMaterial attach="material" color="blue" />
        </line>

        {/* Controls */}
        <OrbitControls />
        <Animation />
      </Canvas>

      <div ref={labelRef} id={pl_name} className="absolute z-50 text-white hover:cursor-pointer">
        {pl_name}
      </div>
    </>
  );
};

export default ExoplanetScene;
