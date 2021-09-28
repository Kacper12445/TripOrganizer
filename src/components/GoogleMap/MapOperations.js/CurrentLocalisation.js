import React from "react";

export default function CurrentLocalisation({ panTo }) {
  return (
    <button
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo(
              {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
              "origin"
            );
          },
          () => null
        );
      }}
    >
      Locate
    </button>
  );
}
