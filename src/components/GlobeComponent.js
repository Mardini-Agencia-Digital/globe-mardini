import React, {useEffect, useRef, useState} from 'react';
import Globe from "react-globe.gl";

export default function GlobeComponent() {

    const [countries, setCountries] = useState({ features: []});
    const [countrys, setCountrys] = useState({ countrys: []});

    useEffect(() => {
        fetch('/data/custom.geojson').then(res => res.json()).then(setCountries);
        fetch('/data/countrys.json').then(res => res.json()).then(setCountrys);
    }, []);

    const globeRef = useRef();

    useEffect(() => {
        const globe = globeRef.current;
        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = -0.8;
    }, []);

    return (
        <Globe
            ref={globeRef}
            waitForGlobeReady={true}
            backgroundColor={'#040d21'}
            animateIn={true}
            //Texture
            globeImageUrl="/assets/color.jpg"
            enableGlobeGlow={true}
            //Pointed Map
            hexPolygonsData={countries.features}
            hexPolygonResolution={3}
            hexPolygonMargin={0.7}
            showAtmosphere={true}
            atmosphereColor={"#FFF"}
            atmosphereAltitude={0.2 /2}
            hexPolygonColor={(e) => {
                if (["PAK"].includes(e.properties.ISO_A3)) {
                    return "rgba(255,255,255, 1)";
                } else return "rgba(255,255,255, 0.7)";
            }}
            //Point Data
            pointsData={countrys.countrys}
            pointColor={() => '#FFF'}
            pointsMerge={true}
            pointAltitude={0.07}
            pointRadius={0.50}
            //
        />
    );
}

