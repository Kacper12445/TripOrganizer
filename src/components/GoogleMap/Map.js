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
import axios from "axios";

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
  const [originValue, setOriginValue] = useState();

  const [coords, setCoords] = useState([
    {
      id: "origin",
      lat: 0,
      lng: 0,
      time: 0,
    },
    {
      id: "destination",
      lat: 0,
      lng: 0,
      time: 0,
    },
  ]);

  const geoCode = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then((resp) => {
        setOriginValue(`${resp.data.results[0].formatted_address}`);
      });
  };

  const changeCoords = (lat, lng, key_value) => {
    const updatedCoords = [...coords];
    let coordToUpdate = updatedCoords.find(({ id }) => id === key_value);
    coordToUpdate.lat = lat;
    coordToUpdate.lng = lng;
    coordToUpdate.time = new Date();
    if ((key_value = "origin")) {
      geoCode(lat, lng);
    }

    setCoords(updatedCoords);
  };

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
        travelPoint="origin"
        originValue={originValue}
        setOriginValue={setOriginValue}
        geoCode={geoCode}
      />
      <AutocompleteInput panTo={panTo} travelPoint="destination" />
      <FindRoad
        travelMode={travelMode}
        originCoords={getCoords("origin")}
        destinationCoords={getCoords("destination")}
      />
      <CurrentLocalisation
        panTo={panTo}
        travelPoint="origin"
        geoCode={geoCode}
      />
      <SelectTravelMode passTravelMode={setTravelMode} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={{ lat: 51.107883, lng: 17.038538 }}
        options={options}
        onClick={mapClickHandler}
        onLoad={onLoad}
      >
        {coords.map((coord) => (
          <Marker
            key={coord.id}
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
