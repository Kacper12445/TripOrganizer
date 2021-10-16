import React, { useState, useCallback, useRef } from "react";
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
// import FindAttractions from "../Trip/FindAttractions";
// import RouteAlgorithm from "../Trip/RouteAlgorithm";
import Card from "../common/Card";
// import TripForm from "./SearchSide/TripForm";
import Searching from "./SearchSide/Searching";

export default function Map() {
  const dispatch = useDispatch();
  const coordsStore = useSelector((state) => state.coords);

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
    // <Card height="90vh" justifyContent="space-between">
    // {/* <Card flexDirection="column" height="100%" flexBasis="65%"> */}
    // {/* <Card flexDirection="column" flexBasis="30%" backGroundColor="blue"> */}
    // {/* <TripForm panTo={panTo} /> */}
    // {/* <Card>
    //     <FindRoad
    //       travelMode={travelMode}
    //       originCoords={getCoords("origin")}
    //       destinationCoords={getCoords("destination")}
    //     />
    //   </Card> */}
    // {/* <Card>
    //     <SelectTravelMode passTravelMode={setTravelMode} />
    //   </Card> */}
    // {/* <Card>
    //     <FindAttractions destinationCoords={getCoords("destination")} />
    //   </Card> */}
    // {/* <Card>
    //   <RouteAlgorithm
    //     originCoords={getCoords("origin")}
    //     destinationCoords={getCoords("destination")}
    //   />
    //     </Card> */}
    // {/* </Card> */}
    // {/* <Card flexBasis="70%" backGroundColor="yellow"></Card>
    // </Card> */}
    // <Card flexBasis="35%" height="100%" backGroundColor="green">
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={4}
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
    // </Card>
    // {/* </Card> */}
  );
}