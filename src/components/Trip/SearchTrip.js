import React, { useEffect, useState } from "react";

export default function SearchTrip() {
  const [localization, setLocalization] = useState({
    cityName: "",
    Latitude: "",
    Longitude: "",
  });

  const success = (pos) => {
    let crd = pos.coords;

    setLocalization({ Latitude: crd.latitude, Longitude: crd.longitude });
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const getLocalization = () => {
    let options = {
      enableHighAccuracy: true,
      //   timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            alert("Denied");
          }
          result.onchange = () => {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  };

  useEffect(() => {
    getLocalization();
  });

  const searchTripHandler = (event) => {
    event.preventDefault();
  };

  const getPositionHandler = () => {
    getLocalization();
    console.log(localization);
  };

  return (
    <form onSubmit={searchTripHandler}>
      <label htmlFor="origin">
        <input id="origin"></input>
      </label>
      <button onClick={getPositionHandler}>Get Current Location</button>
      <label htmlFor="destination">
        <input id=" destination"></input>
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
