import React, { useState } from "react";

export default function SelectTravelMode(props) {
  const [transitSelected, setTransitSelected] = useState(null);

  const selectOptionHandler = (event) => {
    props.passTravelMode(event.target.value);
    if (event.target.value === "Transit") {
      setTransitSelected(true);
    } else {
      setTransitSelected(false);
    }
  };

  return (
    <>
      <label>Choose travel mode</label>
      <select onChange={selectOptionHandler}>
        <option>Driving</option>
        <option>Bicycling</option>
        <option>Walking</option>
        <option>Transit</option>
      </select>
      {transitSelected && (
        <>
          <label>Select departue time</label>
          <input />
        </>
      )}
    </>
  );
}
