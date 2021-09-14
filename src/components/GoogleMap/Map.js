import React, { useState, useCallback, useRef } from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import MapStyles from "./MapStyles";

export default function Map() {
  const libraries = ["places"];
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

  const [coords, setCoords] = useState();
  const [selected, setSelected] = useState(null);

  const mapClickHandler = useCallback((event) => {
    setCoords({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    });
  }, []);

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  return (
    <>
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={{ lat: 51.107883, lng: 17.038538 }}
        options={options}
        onClick={mapClickHandler}
        onLoad={onLoad}
      >
        {/* {coords.map((coord) => ( */}
        {coords && (
          <Marker
            key={coords.time.toISOString()}
            position={{ lat: coords.lat, lng: coords.lng }}
            // icon={
            //     url:"",
            // scaledSize: new window.google.maps.Size(30,30),
            // origin: new window.google.maps.Point(0,0),
            // anchor: new window.google.maps.Point(15,15)
            // }
            onClick={() => {
              setSelected(coords);
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

function Locate({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    ></button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.107883, lng: () => 17.038538 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("Coordinates:", { lat, lng });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

  const renderSuggestion = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong>
          <small>{secondary_text}</small>
        </li>
      );
    });
  return (
    <>
      <div>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter an address"
        />
        {<ul>{status === "OK" && renderSuggestion()}</ul>}
      </div>
      {/* <div
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          console.log(address);
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error");
          }
        }}
      >
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Enter an adress"
        />
        <div>
          <div>
            {status === "Ok" &&
              data.map(({ id, description }) => (
                <div key={id} value={description}>
                  {description}
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </>
  );
}
