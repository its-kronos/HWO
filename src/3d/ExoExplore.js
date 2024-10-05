import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line, OrbitControls, useAspect } from '@react-three/drei';
import * as THREE from 'three';

const scale = 1e+16;
export const ExoExplore = () => {

  return (
    <Canvas
      id='canvas'
      gl={{ alpha: false, antialias: true }}
      style={{ background: 'black', width: '100%', height: '100%' }}
      camera={{ position: [0, 0, 40000], far: 100000, near: 0.0001 }}
    >
      <OrbitControls />
    </Canvas>
  );
};
