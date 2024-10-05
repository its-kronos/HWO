import * as THREE from "three"
import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
export const Galaxy = ({ imageUrl, position = [0, 0, 0], size = [1, 1], rotation = [0, 0, 0] }) => {
    // Load the image as a texture
    const texture = useLoader(THREE.TextureLoader, imageUrl);
    
    const imageRef = useRef();
  
    return (
      <mesh position={position} ref={imageRef} rotation={rotation}>
        {/* Plane geometry to display the 2D image */}
        <planeGeometry args={size} />
        {/* Applying the texture to the mesh material */}
        <meshBasicMaterial map={texture} transparent={true} />
      </mesh>
    );
  };