import React, { useState } from "react";

export default function SearchTrip() {
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
      method: "GET",
      headers: {
        "x-rapidapi-key": "c6939485b1msh554bb1848fd05e3p17c4eajsnff0e7a27fd8b",
        "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${latitude}&lon=${longitude}&accept-language=en&polygon_threshold=0.0`,
      requestOptions
    );
    const data = await response.json();
    setLocalization({
      cityName: data.address.town,
      Latitude: latitude,
      Longitude: longitude,
    });
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

  // useEffect(() => {});

  const searchTripHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={searchTripHandler}>
      <label htmlFor="origin">
        <input id="origin" placeholder={localization.cityName}></input>
      </label>
      <button onClick={getPositionHandler}>Get Current Location</button>
      <label htmlFor="destination">
        <input id=" destination"></input>
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
