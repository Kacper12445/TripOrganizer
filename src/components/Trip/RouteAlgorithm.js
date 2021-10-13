import React, { useState } from "react";
import axios from "axios";

export default function RouteAlgorithm(props) {
  const [resultList, setResultList] = useState([
    { duration: null, mode: null },
  ]);
  const getBestResult = (resultArray) => {
    let bestResult = resultArray.reduce((prev, curr) => {
      return prev.duration < curr.duration ? prev : curr;
    });
    console.log(
      `Najlepszy wynik ${bestResult.duration / 60} minutes by ${
        bestResult.mode
      }`
    );
  };
  const getRoutesTime = () => {
    let tempArray = [];
    let travelModeList = ["driving", "bicycling", "walking", "transit"];
    travelModeList.forEach((element, index) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${props.originCoords.lat},${props.originCoords.lng}&destinations=${props.destinationCoords.lat},${props.destinationCoords.lng}&mode=${element}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        )
        .then((resp) => {
          if (resp.data.rows[0].elements[0].duration.value && element) {
            tempArray[index] = {
              duration: resp.data.rows[0].elements[0].duration.value,
              mode: element,
            };
            setResultList(tempArray);
          }
          console.log(resp.data.rows[0].elements[0].duration.value, element);
          if (tempArray.length === travelModeList.length) {
            getBestResult(tempArray);
          }
        });
    });

    return tempArray;
  };

  console.log(resultList);
  return (
    <>
      <button onClick={getRoutesTime}>Find faster type of travel</button>
    </>
  );
}
