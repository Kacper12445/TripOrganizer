import React from "react";
import axios from "axios";
import Button from "../../common/Button";

export default function AirportSearching() {
  const searchAirPortByLocation = () => {
    let latitude = 51.1017037;
    let longitude = 17.040429;
    let airPortLimit = 20;
    let searchRangeKm = 100;
    let options = {
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_AERO_DATA_BOX_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
      params: { withFlightInfoOnly: "true" },
    };
    axios
      .get(
        `https://aerodatabox.p.rapidapi.com/airports/search/location/${latitude}/${longitude}/km/${searchRangeKm}/${airPortLimit}`,
        options
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <Button onClick={searchAirPortByLocation}>Find nearest airport</Button>
    </>
  );
}
