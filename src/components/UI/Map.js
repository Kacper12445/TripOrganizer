import React, { useState, useCallback, useRef, useEffect } from "react";
// import AutocompleteInput from "../GoogleMap/MapOperations.js/AutocompleteInput";
// import FindRoad from "../GoogleMap/MapOperations.js/FindRoad";
// import SelectTravelMode from "../GoogleMap/MapOperations.js/SelectTravelMode";
import MapStyles from "./MapStyles";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { coordActions } from "../../store/Slices/coord";

// import FindAttractions from "../Trip/FindAttractions";
// import RouteAlgorithm from "../Trip/RouteAlgorithm";
// import TripForm from "./SearchSide/TripForm";

export default function Map() {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coord.coords);

  // Przyklad
  // dispatch({type: "cos tam"});
  // Z payloadem
  // dispatch({type: 'cos tam', 'nazwa wlasna': "wartosc payloadu"})
  // z payloadem
  // dispatch(counterActions.increase(10) ){ type : Some unique id, payload: 10}

  const [libraries] = useState(["places"]);
  const mapContainerStyle = {
    height: "100%",
    width: "35%",
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

  const changeCoordsHandler = (lat, lng, key_value) => {
    dispatch(
      coordActions.changeCoords({ lat: lat, lng: lng, key_value: key_value })
    );
  };

  useEffect(() => {
    console.log(
      `Coord z reduxa: ${coords.originCoords.lat}, ${coords.originCoords.lng}`
    );
    console.log(
      `Coord z reduxa: ${coords.destinationCoords.lat}, ${coords.destinationCoords.lng}`
    );
  }, [coords]);

  const clearCoordsHandler = (key_value) => {
    dispatch(coordActions.resetCoords({ key_value: key_value }));
  };

  const mapClickHandler = useCallback((event) => {
    console.log("Mapa kliknieta");
    changeCoordsHandler(event.latLng.lat(), event.latLng.lng(), "origin");
  }, []);

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }, key_value) => {
    console.log("Wchodzi do funkcji");
    changeCoordsHandler(lat, lng, key_value);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  return (
    // {/* <TripForm panTo={panTo} /> */}
    //     <FindRoad
    //       travelMode={travelMode}
    //       originCoords={getCoords("origin")}
    //       destinationCoords={getCoords("destination")}
    //     />
    //     <SelectTravelMode passTravelMode={setTravelMode} />
    //     <FindAttractions destinationCoords={getCoords("destination")} />
    //   <RouteAlgorithm
    //     originCoords={getCoords("origin")}
    //     destinationCoords={getCoords("destination")}
    //   />
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
      center={{ lat: focusCoord.lat, lng: focusCoord.lng }}
      options={options}
      onClick={mapClickHandler}
      onLoad={onLoad}
    >
      {Object.entries(coords).map((coord) => (
        <Marker
          key={coord[1].id}
          position={{ lat: coord[1].lat, lng: coord[1].lng }}
          visible={coord[1].visible}
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
  );
}
