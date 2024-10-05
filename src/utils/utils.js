// Utility functions go here
import * as THREE from 'three';


export function habitZoneRadii(bolMagSun=4.72,apparentMag,d,specType){
    var absMag = apparentMag-(5*Math.log(d/10));
    var bolMagStar = absMag+specType;
    var absLum = Math.pow(10,(bolMagStar-bolMagSun)/-2.5);
    var radInner = Math.sqrt(absLum/1.1);
    var radOutter = Math.sqrt(absLum/0.54);

    return [radInner,radOutter];
}
export function pointInCone(loc,coneTip=new THREE.Vector3(0,0,0),coneBase,senSize,focalLen){

    var h = coneBase.distanceTo(coneTip);
    var FOV = Math.atan(senSize/(2*focalLen*1000));
    var r = h*Math.tan(FOV);

    var dir = new THREE.Vector3();
    dir.subVectors(coneTip,coneBase).normalize();
    var point = new THREE.Vector3();
    point.subVectors(loc,coneBase);

    var coneDist = point.dot(dir);
    var coneRad = (coneDist/h)*r;
    var orthoDist = point.length() - coneDist;
    if (orthoDist<=coneRad) {
        return true
    }
    return false
}