import React from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Card from "../../common/Card";
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
      <Card height="75%" width="100%" justifyContent="center">
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={`Enter ${props.travelPoint}`}
          height="100%"
          width="50%"
          padding="22px 18px"
        />
        {props.travelPoint === "origin" ? (
          <CurrentLocalisation
            panTo={props.panTo}
            travelPoint={props.travelPoint}
            passValue={setValue}
          />
        ) : null}
        <Button onClick={clearInput} height="100%" width="25%">
          Clear
        </Button>
        {<ul>{status === "OK" && renderSuggestion()}</ul>}
      </Card>
    </>
  );
}
