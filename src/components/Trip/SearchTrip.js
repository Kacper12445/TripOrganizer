import React, { useState, useRef } from "react";
import axios from "axios";

export default function SearchTrip() {
  const originName = useRef(null);
  const [localization, setLocalization] = useState({
    cityName: "",
    Latitude: "",
    Longitude: "",
  });

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  async function findLocalization(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    const requestOptions = {
      headers: {
        "x-rapidapi-key": "c6939485b1msh554bb1848fd05e3p17c4eajsnff0e7a27fd8b",
        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };
    const response = await axios.get(
      `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${latitude}&lon=${longitude}&accept-language=en&polygon_threshold=0.0`,
      requestOptions
    );
    console.log(response);
    setLocalization({
      cityName: response.data.address.hamlet,
      Latitude: latitude,
      Longitude: longitude,
    });
    originName.current = response.data.address.hamlet;
  }

  const getPositionHandler = () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
    };

    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(
              findLocalization,
              errors,
              options
            );
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              findLocalization,
              errors,
              options
            );
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
    const watchId = navigator.geolocation.watchPosition(
      findLocalization,
      errors
    );
    navigator.geolocation.clearWatch(watchId);
  };

  const searchTripHandler = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={searchTripHandler}>
        <label htmlFor="origin">
          <input
            id="origin"
            defaultValue={localization.cityName}
            ref={originName}
            placeholder="Origin"
          ></input>
        </label>
        <button onClick={getPositionHandler}>Get Current Location</button>
        <label htmlFor="destination">
          <input id=" destination" placeholder="Destination"></input>
        </label>
        <button type="submit">Search</button>
      </form>
    </>
  );
}
