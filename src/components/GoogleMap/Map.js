import React, { useState, useCallback, useRef } from "react";
import AutocompleteInput from "./MapOperations.js/AutocompleteInput";
import CurrentLocalisation from "./MapOperations.js/CurrentLocalisation";
import FindRoad from "./MapOperations.js/FindRoad";
import SelectTravelMode from "./MapOperations.js/SelectTravelMode";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import MapStyles from "./MapStyles";

export default function Map() {
  const [libraries] = useState(["places"]);
  const mapContainerStyle = {
    width: "100vw",
    height: "100vh",
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

  const [originCoords, setOriginCoords] = useState();
  const [destinationCoords, setDestinationCoords] = useState();
  const [selected, setSelected] = useState(null);
  const [travelMode, setTravelMode] = useState("Driving");

  const [coords, setCoords] = useState([
    {
      id: "origin",
      lat: null,
      lng: null,
      time: null,
    },
    { id: "destination", lat: null, lng: null, time: null },
  ]);

  const changeCoords = (lat, lng, key_value) => {
    const updatedCoords = [...coords];
    let coordToUpdate = updatedCoords.find(({ id }) => id === key_value);
    coordToUpdate.lat = lat;
    coordToUpdate.lng = lng;
    coordToUpdate.time = new Date();

    setCoords(updatedCoords);
  };

  const mapClickHandler = useCallback((event) => {
    setOriginCoords({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
  }, []);

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }, key_value) => {
    changeCoords(lat, lng, key_value);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  console.log(coords);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  return (
    <>
      <AutocompleteInput
        panTo={panTo}
        destinationCoords={setDestinationCoords}
      />
      <FindRoad
        travelMode={travelMode}
        originCoords={originCoords}
        destinationCoords={destinationCoords}
      />
      <CurrentLocalisation panTo={panTo} />
      <SelectTravelMode passTravelMode={setTravelMode} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={{ lat: 51.107883, lng: 17.038538 }}
        options={options}
        onClick={mapClickHandler}
        onLoad={onLoad}
      >
        {/* {coords.map((coord) => ( */}
        {originCoords && (
          <Marker
            key={originCoords.time.toISOString()}
            position={{ lat: originCoords.lat, lng: originCoords.lng }}
            // icon={
            //     url:"",
            // scaledSize: new window.google.maps.Size(30,30),
            // origin: new window.google.maps.Point(0,0),
            // anchor: new window.google.maps.Point(15,15)
            // }
            onClick={() => {
              setSelected(originCoords);
            }}
          />
        )}

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
