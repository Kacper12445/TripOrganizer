import React, { useState, useCallback, useRef } from "react";
import AutocompleteInput from "./MapOperations.js/AutocompleteInput";
import FindRoad from "./MapOperations.js/FindRoad";
import SelectTravelMode from "./MapOperations.js/SelectTravelMode";
import MapStyles from "./MapStyles";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import FindAttractions from "../Trip/FindAttractions";
import RouteAlgorithm from "../Trip/RouteAlgorithm";

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

  const [selected, setSelected] = useState(null);
  const [travelMode, setTravelMode] = useState("Driving");
  const [focusCoord, setFocusCoord] = useState({ lat: 51, lng: 17 });
  const [coords, setCoords] = useState([
    {
      id: "origin",
      lat: 0,
      lng: 0,
      time: 0,
      visible: false,
    },
    {
      id: "destination",
      lat: 0,
      lng: 0,
      time: 0,
      visible: false,
    },
  ]);

  const changeCoords = (lat, lng, key_value) => {
    const updatedCoords = [...coords];
    let coordToUpdate = updatedCoords.find(({ id }) => id === key_value);
    coordToUpdate.lat = lat;
    coordToUpdate.lng = lng;
    coordToUpdate.time = new Date();
    coordToUpdate.visible = true;

    setCoords(updatedCoords);
    setFocusCoord({ lat: coordToUpdate.lat, lng: coordToUpdate.lng });
  };

  const clearMarkers = () => {
    // coords.forEach((coord) => (coord.visible = false));
    let tempCoords = coords;
    // tempCoords.forEach((coord) => (coord.visible = false));
    for (let i = 0; i < tempCoords.length; i++) {
      tempCoords[i].lat = null;
      tempCoords[i].lng = null;
      tempCoords[i].visible = false;
    }
    setCoords(tempCoords);
  };
  console.log(coords);

  const getCoords = (key_value) => {
    let coord = coords.find(({ id }) => id === key_value);
    return coord;
  };

  const mapClickHandler = useCallback((event) => {
    changeCoords(event.latLng.lat(), event.latLng.lng(), "origin");
  }, []);

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }, key_value) => {
    console.log("Wchodzi do funkcji");
    changeCoords(lat, lng, key_value);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  return (
    <>
      <AutocompleteInput
        panTo={panTo}
        travelPoint="origin"
        clearMarker={clearMarkers}
      />
      <AutocompleteInput
        panTo={panTo}
        travelPoint="destination"
        clearMarker={clearMarkers}
      />
      <FindRoad
        travelMode={travelMode}
        originCoords={getCoords("origin")}
        destinationCoords={getCoords("destination")}
      />
      <SelectTravelMode passTravelMode={setTravelMode} />
      <FindAttractions />
      <RouteAlgorithm
        originCoords={getCoords("origin")}
        destinationCoords={getCoords("destination")}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={{ lat: focusCoord.lat, lng: focusCoord.lng }}
        options={options}
        onClick={mapClickHandler}
        onLoad={onLoad}
      >
        {coords.map((coord) => (
          <Marker
            key={coord.id}
            position={{ lat: coord.lat, lng: coord.lng }}
            visible={coord.visible}
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
              <h3>{selected.id}</h3>
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
