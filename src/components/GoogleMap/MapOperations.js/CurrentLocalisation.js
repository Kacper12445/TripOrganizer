import React from "react";
import axios from "axios";
import Button from "../../common/Button";

export default function CurrentLocalisation(props) {
  const geoCode = (lat, lng) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then((resp) => {
        props.passValue(resp.data.results[0].formatted_address);
        // setOriginName(`${resp.data.results[0].formatted_address}`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            props.panTo(
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              props.travelPoint
            );
            props.passValue(
              position.coords.latitude,
              position.coords.longitude
            );
            geoCode(position.coords.latitude, position.coords.longitude);
          },
          () => null
        );
      }}
      height="100%"
      width="25%"
    >
      Locate
    </Button>
  );
}
