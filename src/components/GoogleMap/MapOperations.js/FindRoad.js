import React from "react";
import axios from "axios";

export default function FindRoad(props) {
  const buttonHandler = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${props.originCoords.lat},${props.originCoords.lng}&destination=${props.destinationCoords.lat},${props.destinationCoords.lng}&mode=${props.travelMode}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      )
      .then((res) => {
        console.log(res.data.routes[0].legs[0]);
        console.log(res.data.routes[0].legs[0].steps);
        // console.log(res.data.routes[0].legs[0].start_address);
        // console.log(res.data.routes[0].legs[0].end_address);
        // console.log(res.data.routes[0].legs[0].distance.text);
        // console.log(res.data.routes[0].legs[0].duration.text);
      })
      .catch((err) => console.log(err));
  };

  return <button onClick={buttonHandler}>Search</button>;
}
