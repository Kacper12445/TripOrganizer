import React from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

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
    if (props.travelPoint === "origin") {
      props.setOriginValue(e.target.value);
    }

    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      props.travelPoint === "origin"
        ? props.setOriginValue(description)
        : setValue(description, false);

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
        value={props.travelPoint === "origin" ? props.originValue : value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={`Enter ${props.travelPoint}`}
      />
      {<ul>{status === "OK" && renderSuggestion()}</ul>}
    </>
  );
}
