import React, { useState } from "react";
import Input from "../../common/Input";

export default function SelectTravelMode(props) {
  const [transitSelected, setTransitSelected] = useState(null);

  const selectOptionHandler = (event) => {
    console.log("wchodzi");
    props.passTravelMode(event.target.value);
    if (event.target.value === "transit") {
      setTransitSelected(true);
    } else {
      setTransitSelected(false);
    }
  };

  return (
    <>
      <label>Choose travel mode</label>
      <select onChange={selectOptionHandler}>
        <option value="driving">Driving</option>
        <option value="bicycling">Bicycling</option>
        <option value="walking">Walking</option>
        <option value="transit">Transit</option>
      </select>
      {transitSelected && (
        <>
          <label>Select departue time</label>
          <Input />
        </>
      )}
    </>
  );
}
