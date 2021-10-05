import React, { useState } from "react";
import axios from "axios";

export default function FindAttractions() {
  const [areaData, setAreaData] = useState({
    location: {
      latitude: 51.110612128826006,
      longitude: 17.03289461135866,
    },
    radius: 50000,
    attractionType: "",
  });

  const handleSelect = (e) => {
    console.log(e.target.value);
    setAreaData({ ...areaData, attractionType: e.target.value });
  };

  const find_attraction = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${areaData.location.latitude}%2C${areaData.location.longitude}&radius=${areaData.radius}&type=${areaData.attractionType}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
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
      </select>
      <button onClick={find_attraction}>Znajdz cos fajnego</button>
    </>
  );
}
