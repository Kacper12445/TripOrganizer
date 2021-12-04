import React, { useState, useEffect } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";

export default function MapDirectionRenderer(props) {
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (props.places) {
      const { places, travelMode } = props;

      const waypoints = places.map((place) => ({
        location: { lat: place.latitude, lng: place.longitude },
        stopover: true,
      }));
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: travelMode,
          waypoints: waypoints,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            setError(result);
          }
        }
      );
    }
  }, [props]);

  if (error) {
    return <h1>{error}</h1>;
  }
  return directions && <DirectionsRenderer directions={directions} />;
}
