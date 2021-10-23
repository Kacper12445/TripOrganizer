import React, { useState, useCallback, useRef, useEffect } from "react";
import MapStyles from "./MapStyles";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { coordActions } from "../../../store/Slices/coord";
import { mapActions } from "../../../store/Slices/map";
import Card from "../../common/Card";
import Text from "../../common/Text";
import MapDirectionRenderer from "./MapDirectionRenderer";

const PLACES = [
  { latitude: 25.8103146, longitude: -80.1751609 },
  // { latitude: 27.9947147, longitude: -82.5943645 },
  { latitude: 28.4813018, longitude: -81.4387899 },
];

export default function Map() {
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coord.coords);
  const [routeCoords, setRouteCoords] = useState([]);
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
  const [focusCoord, setFocusCoord] = useState({ lat: 51, lng: 17 });

  useEffect(() => {
    if (coords.originCoords.isSet && coords.destinationCoords.isSet) {
      setRouteCoords([
        {
          latitude: coords.originCoords.lat,
          longitude: coords.originCoords.lng,
        },
        {
          latitude: coords.destinationCoords.lat,
          longitude: coords.destinationCoords.lng,
        },
      ]);
    }
    console.log(
      `Coord z reduxa: ${coords.originCoords.lat}, ${coords.originCoords.lng}`
    );
    console.log(
      `Coord z reduxa: ${coords.destinationCoords.lat}, ${coords.destinationCoords.lng}`
    );
  }, [coords]);

  // const clearCoordsHandler = (key_value) => {
  //   dispatch(coordActions.resetCoords({ key_value: key_value }));
  // };

  const mapClickHandler = useCallback(
    (event) => {
      dispatch(
        coordActions.changeCoords({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          key_value: "origin",
        })
      );
    },
    [dispatch]
  );

  const mapRef = useRef();
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    setFocusCoord({ lat, lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  useEffect(() => {
    dispatch(mapActions.setMapState(isLoaded));
  }, [isLoaded, dispatch]);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading map";
  return (
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
          icon={{
            url: coord[1].icon,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
          onClick={() => {
            setSelected(coord[1]);
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
          <Card flexDirection="column">
            <Card>
              <Text fontSize="18px" fontWeight="bold">
                Coords of {selected.id}
              </Text>
            </Card>
            <Card>
              <Text fontSize="14px">
                {selected.lat.toFixed(3)} - {selected.lng.toFixed(3)}
              </Text>
            </Card>
          </Card>
        </InfoWindow>
      ) : null}
      <MapDirectionRenderer
        places={routeCoords.length === 0 ? null : routeCoords}
        travelMode={window.google.maps.TravelMode.TRANSIT}
      />
    </GoogleMap>
  );
}
