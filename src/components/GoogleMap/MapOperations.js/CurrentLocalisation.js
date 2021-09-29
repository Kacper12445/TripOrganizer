import React from "react";

export default function CurrentLocalisation(props) {
  return (
    <button
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
            props.geoCode(position.coords.latitude, position.coords.longitude);
          },
          () => null
        );
      }}
    >
      Locate
    </button>
  );
}
