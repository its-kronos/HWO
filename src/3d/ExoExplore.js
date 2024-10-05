import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, OrbitControls, useAspect } from '@react-three/drei';
import * as THREE from 'three';
import data from './exo.json';
import { ExoplanetPoints } from './components/planets';
import { HWOLOS } from './components/HWO';
import { Galaxy } from './components/galaxy';
import { coords } from './components/planets';


const pointInCone = (points, coneProp) => {
    let y = 0;
    let n = 0;
    points.forEach(data => {
        const point = new THREE.Vector3(data.x, data.y, data.z);
        const apex = coneProp.v2;
        const direction = new THREE.Vector3().subVectors(coneProp.v1, apex).normalize();
        const h = apex.distanceTo(coneProp.v1); // Height of the cone
        const r = coneProp.r; 
      
        // Calculate the vector from the apex to the point
        const toPoint = new THREE.Vector3().subVectors(point, apex);
      
        // Project the point onto the direction vector to find the distance along the axis
        const coneDist = toPoint.dot(direction);
      
        // Calculate the radius at that point along the axis
        const coneRadius = (coneDist / h) * r;
      
        // Calculate the orthogonal distance from the point to the axis
        const orthDistance = toPoint.length() - coneDist; // Length of toPoint minus the projection length
      
        if(orthDistance < coneRadius && data.SNR > 5 && data.sy_dist < data.ESmax){
            y++;
        }else{
            n++;
        }
    });
    return([y,n, n+y])
};


const scale = 1e+16;
export const ExoExplore = ({params, coords, setCoords, setCoordsExtremes, coordsExtremes}) => {
  const orbitRadius = 2542864.0; 

  const [d, setD] = useState(6);
  const [LOS, setLOS] = useState(new THREE.Vector3(50000, 0, 0));
  const [coneProp, setConeProp] = useState({v1: LOS, v2: new THREE.Vector3(0,0,0)})
  const [angle, setAngle] = useState(0);
  
  const tiltAngle = THREE.MathUtils.degToRad(60); // Tilt the orbit by 60 degrees
  


  // Create points for the orbit circle
  const createOrbitPoints = (radius, segments = 100) => {
    const points = [];
    
    // Create an Euler object for the given pitch, yaw, and roll
    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(params.pitch),
      THREE.MathUtils.degToRad(params.yaw),
      THREE.MathUtils.degToRad(params.roll),
      'XYZ'
    );
  
    // Create a quaternion from the Euler angles
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
  
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const x = radius * Math.cos(theta);
      const y = 0; 
      const z = radius * Math.sin(theta);
      
      const point = new THREE.Vector3(x, y, z).applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltAngle);
  
      // Apply pitch, yaw, and roll
      point.applyQuaternion(quaternion);
  
      points.push(point);
    }
  
    return points;
  };
  
  // Animated target moving along the orbit
// Animated target moving along the orbit, rotating only once upon startup
const AnimatedTarget = ({ radius }) => {
  const [hasRotated, setHasRotated] = useState(false);

  useFrame((state, delta) => {
    if (hasRotated) return;

    const newAngle = angle + delta;

    if (newAngle >= Math.PI * 2) {
      setAngle(Math.PI * 2); // Ensure it stops at exactly one full rotation
      setHasRotated(true);    // Mark as completed
      return;
    }

    setAngle(newAngle);
    
    const x = radius * Math.cos(newAngle);
    const y = 0;
    const z = radius * Math.sin(newAngle);
  
    // Create the LOS vector
    let losVector = new THREE.Vector3(x, y, z);
  
    // Apply tilt
    losVector.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltAngle); // Tilt the same way as the orbit
  
    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(params.pitch), 
      THREE.MathUtils.degToRad(params.yaw),
      THREE.MathUtils.degToRad(params.roll), 
      'XYZ'
    );
  
    // Apply rotation to the LOS vector
    const quaternion = new THREE.Quaternion().setFromEuler(euler);
    losVector.applyQuaternion(quaternion);
    
    const HFOV = Math.atan(params.sensorSize/(2*params.focalLength * 1000))
    const r = losVector.distanceTo(coneProp.v2) *Math.tan(HFOV)
    setLOS(losVector);
    setConeProp({ v1: losVector, v2: new THREE.Vector3(0, 0, 0), r:r});
    // console.log(pointInCone(coords, coneProp))
  });
};


  return (
    <Canvas
      id='canvas'
      gl={{ alpha: false, antialias: true }}
      style={{ background: 'black', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 40000], far: 100000000, near: 0.0001 }}
    >
      <Sphere position={[1000, 3000, 2000]} args={[60, 100, 100]}>
        <meshBasicMaterial color="white" />
      </Sphere>
      {/* <Galaxy imageUrl={"./galaxy.png"} /> */}

      {/* Draw orbit curve */}
      <Line
        points={createOrbitPoints(orbitRadius)} // Points to create the orbit path
        color="blue" // Color of the orbit line
        lineWidth={1} // Thickness of the line
      />

      <AnimatedTarget radius={orbitRadius} />
      <ExoplanetPoints data={data} params={params} coords={coords} setCoords={setCoords} setCoordsExtremes={setCoordsExtremes} coordsExtremes={coordsExtremes}/>
      <HWOLOS v1={LOS} v2={new THREE.Vector3(0, 0, 0)} params={params} />
      <OrbitControls />
    </Canvas>
  );
};
