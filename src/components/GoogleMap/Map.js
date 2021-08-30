import React, { useState, useCallback, useRef } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import MapStyles from "./MapStyles";

export default function Map() {
  const libraries = ["places"];
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const center = {
    lat: 51.107883,
    lng: 17.038538,
  };
  const options = {
    styles: MapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: libraries,
  });

  const [coords, setCoords] = useState([]);
  const [selected, setSelected] = useState(null);

  const mapClickHandler = useCallback((event) => {
    setCoords((current) => [
      ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={mapClickHandler}
        onLoad={onLoad}
      >
        {coords.map((coord) => (
          <Marker
            key={coord.time.toISOString()}
            position={{ lat: coord.lat, lng: coord.lng }}
            // icon={
            //     url:"",
            // scaledSize: new window.google.maps.Size(30,30),
            // origin: new window.google.maps.Point(0,0),
            // anchor: new window.google.maps.Point(15,15)
            // }
            onClick={() => {
              setSelected(coord);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>Coords</h2>
              <p>
                {selected.lat} - {selected.lng}
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  );
}
