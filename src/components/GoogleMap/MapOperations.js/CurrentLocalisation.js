import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { coordActions } from "../../../store/Slices/coord";

export default function CurrentLocalisation(props) {
  const dispatch = useDispatch();

  const geoCode = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then((resp) => {
        props.passValue(resp.data.results[0].formatted_address);
      })
      .catch((error) => console.log(error));
  };
  const getCurrentLocalisation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // props.panTo(
        //   {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude,
        //   },
        //   props.travelPoint
        // );
        dispatch(
          coordActions.changeCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            key_value: "origin",
          })
        );
        props.passValue(position.coords.latitude, position.coords.longitude);
        geoCode(position.coords.latitude, position.coords.longitude);
      },
      () => null
    );
  };

  return (
    <FontAwesomeIcon
      icon="map-marker-alt"
      style={{ fontSize: "25px", cursor: "pointer" }}
      onClick={getCurrentLocalisation}
      height="100%"
      width="25%"
    />
  );
}
