import React from "react";
import axios from "axios";

export default function AirportSearching() {
  const searchAirPortByLocation = () => {
    let latitude = 51.1017037;
    let longitude = 17.040429;
    let airPortLimit = 20;
    let searchRangeKm = 100;
    const headers = {
      "x-rapidapi-host": process.env.AERO_DATA_BOX_API_HOST,
      "x-rapidapi-key": "c6939485b1msh554bb1848fd05e3p17c4eajsnff0e7a27fd8b",
    };
    const params = {
      params: { withFlightInfoOnly: "true" },
    };
    axios
      .get(
        `https://aerodatabox.p.rapidapi.com/airports/search/location/${latitude}/${longitude}/km/${searchRangeKm}/${airPortLimit}`,
        { headers: headers }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <button onClick={searchAirPortByLocation}>Find nearest airport</button>
    </>
  );
}
