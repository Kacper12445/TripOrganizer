import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import CurrentLocalisation from "./CurrentLocalisation";

export default function AutocompleteInput(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 51.107883, lng: () => 17.038538 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => {
    setValue("");
    props.clearMarker();
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);

      clearSuggestions();
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          props.panTo({ lat: lat, lng: lng }, props.travelPoint);
          console.log("Coordinates:", { lat, lng });
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

  const renderSuggestion = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;
      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text} </strong>
          <small> {secondary_text}</small>
        </li>
      );
    });
  return (
    <>
      <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={`Enter ${props.travelPoint}`}
      />
      <button onClick={clearInput}>Clear</button>
      {props.travelPoint === "origin" ? (
        <CurrentLocalisation
          panTo={props.panTo}
          travelPoint={props.travelPoint}
          passValue={setValue}
        />
      ) : null}
      {<ul>{status === "OK" && renderSuggestion()}</ul>}
    </>
  );
}
