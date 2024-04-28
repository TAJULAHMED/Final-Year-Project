import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoidGFqdWxhaG1lZCIsImEiOiJjbHNmcXh1MnUwZWVxMmlvdWs4a2lkc3k2In0.yBikMiA39mlGqE50rjW2uQ';

// Component to show the map of where the house is located
const MapboxMap = ({ longitude, latitude }) => {
	const mapContainerRef = useRef(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: 'mapbox://styles/mapbox/streets-v11',
			center: [longitude, latitude],
			zoom: 9,
		});

		new mapboxgl.Marker()
			.setLngLat([longitude, latitude])
			.addTo(map);

		return () => map.remove();
	}, [longitude, latitude]);

	return <div ref={mapContainerRef} style={{ height: '400px', width: '100%' }} />;
};

export default MapboxMap;
