// Utility functions go here

function habitZoneRadii(bolMagSun=4.72,apparentMag,d,specType){
    console.log(specType)
    var absMag = apparentMag-(5*Math.log(d/10));
    var bolMagStar = absMag+specType;
    var absLum = Math.pow(10,(bolMagStar-bolMagSun)/-2.5);
    var radInner = Math.sqrt(absLum/1.1);
    var radOutter = Math.sqrt(absLum/0.54);

    return [radInner,radOutter];
}
