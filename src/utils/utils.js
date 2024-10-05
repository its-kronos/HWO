// Utility functions go here

function habitZoneRadii(bolMagSun=4.72,apparentMag,d,specType){
    absMag = apparentMag-(5*Math.log(d/10));
    bolMagStar = absMag+specType;
    absLum = Math.pow(10,(bolMagStar-bolMagSun)/-2.5);

    radInner = Math.sqrt(absLum/1.1);
    radOutter = Math.sqrt(absLum/0.54);

    return [radInner,radOutter];
}
