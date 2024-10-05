// Utility functions go here
import * as THREE from 'three';

export function habitZoneRadii(bolMagSun=4.72,apparentMag,d,specType){
    var absMag = apparentMag-(5*Math.log10(d/10));
    var bolMagStar = absMag+specType;
    var absLum = Math.pow(10,(bolMagStar-bolMagSun)/-2.5);
    var radInner = Math.sqrt(absLum/1.1);
    var radOutter = Math.sqrt(absLum/0.54);
    return [radInner,radOutter];
}

export const pointInCone = (points, coneProp) => {
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
