import React from "react";
import Button from "../../common/Button";
import Input from "../../common/Input";
import Card from "../../common/Card";
import SuggestionItem from "../../UI/SearchSide/Form/SuggestionItem";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import CurrentLocalisation from "./CurrentLocalisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <SuggestionItem
          key={place_id}
          text={suggestion.structured_formatting}
          onClick={handleSelect(suggestion)}
        />
      );
      // <strong>{main_text} </strong>
      // <small> {secondary_text}</small>
    });
  return (
    <>
      <Card
        height="75%"
        width="49%"
        justifyContent="space-around"
        alignItems="center"
      >
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={`Enter ${props.travelPoint}`}
          height="100%"
          width="70%"
          padding="22px 18px"
          margin="0 0 0 5%"
          fontSize="15px"
          borderLeft="2px solid lightgreen"
        />
        {props.travelPoint === "origin" ? (
          <CurrentLocalisation
            panTo={props.panTo}
            travelPoint={props.travelPoint}
            passValue={setValue}
          />
        ) : null}
        <FontAwesomeIcon
          icon="eraser"
          style={{ fontSize: "25px", cursor: "pointer" }}
          onClick={clearInput}
          height="100%"
          width="25%"
        >
          Clear
        </FontAwesomeIcon>
        {<ul>{status === "OK" && renderSuggestion()}</ul>}
      </Card>
    </>
  );
}
