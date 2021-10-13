import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../common/Button";

export default function FindAttractions(props) {
  const [areaData, setAreaData] = useState({
    location: {
      latitude: 0,
      longitude: 0,
    },
    radius: 50000,
    attractionType: "",
  });

  const handleSelect = (e) => {
    console.log(e.target.value);
    setAreaData({ ...areaData, attractionType: e.target.value });
  };

  useEffect(() => {
    let tempAreaData = areaData;
    if (
      props.destinationCoords.lat !== 0 &&
      props.destinationCoords.lng !== 0
    ) {
      tempAreaData.location.longitude = props.destinationCoords.lng;
      tempAreaData.location.latitude = props.destinationCoords.lat;
      setAreaData(tempAreaData);
    }
  }, [props.destinationCoords.lng, props.destinationCoords.lat, areaData]);
  console.log(
    `area: ${areaData.location.latitude} ${areaData.location.longitude}`
  );

  const find_attraction = () => {
    if (areaData.location.latitude !== 0 && areaData.location.longitude !== 0) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${areaData.location.latitude}%2C${areaData.location.longitude}&radius=${areaData.radius}&type=${areaData.attractionType}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
        .then((response) => {
          console.log(response);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <label>Choose type of attraction that interests you</label>
      <select onChange={handleSelect}>
        <option value="night_club">Night club</option>
        <option value="car_rental">Car rental</option>
        <option value="restaurant">Restaurant</option>
        <option value="zoo">Zoo</option>
        <option value="bar">Bar</option>
        <option value="cafe">Cafe</option>
        <option value="tourist_attraction">Tourist attraction</option>
        <option value="airport">Airport</option>
      </select>
      <Button onClick={find_attraction}>Znajdz cos fajnego</Button>
    </>
  );
}
