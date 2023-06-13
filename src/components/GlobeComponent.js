import React, {useEffect, useRef, useState} from 'react';
import Globe from "react-globe.gl";

export default function GlobeComponent() {

    // const [countries, setCountries] = useState({ features: []});
    const [countries, setCountries] = useState({ countries: []});

    useEffect(() => {
        // fetch('/data/custom.geojson').then(res => res.json()).then(setCountries);
        fetch('/data/countries.json').then(res => res.json()).then(setCountries);
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
            // backgroundColor={'#040d21'}
            animateIn={true}
            //Texture
            globeImageUrl="/assets/earth-night.jpg"
            backgroundImageUrl="/assets/night-sky.png"
            enableGlobeGlow={true}
            //Point Data
            labelsData={countries.countries}
            labelColor={() => 'rgba(255, 165, 0, 0.75)'}
            labelSize={0.8}
            labelDotRadius={0.5}
            labelResolution={2}
        />
    );
}

