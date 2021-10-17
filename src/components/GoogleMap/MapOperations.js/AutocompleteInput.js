import React from "react";
import Input from "../../common/Input";
import Card from "../../common/Card";
import SuggestionItem from "../../UI/SearchSide/Form/SuggestionItem";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import CurrentLocalisation from "./CurrentLocalisation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { coordActions } from "../../../store/Slices/coord";
import { useDispatch } from "react-redux";

export default function AutocompleteInput(props) {
  const dispatch = useDispatch();

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
    debounce: 300,
  });
  console.log(ready);

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const clearCoordsHandler = () => {
    setValue("");
    dispatch(coordActions.resetCoords({ key_value: props.travelPoint }));
  };

  const handleSelect =
    ({ description }) =>
    () => {
      setValue(description, false);
      clearSuggestions();

      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          // props.panTo({ lat: lat, lng: lng }, props.travelPoint);
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
        // <li key={place_id} onClick={handleSelect(suggestion)}>
        //   <strong>{main_text} </strong>
        //   <small> {secondary_text}</small>
        // </li>
      );
    });
  return (
    <>
      <Card
        height="75%"
        width="49.5%"
        justifyContent="space-between"
        alignItems="center"
      >
        <FontAwesomeIcon
          icon={props.icon}
          style={{
            fontSize: "35px",
            margin: "0 0 0 5%",
            borderLeft: "3px solid lightgreen",
            padding: "0 0 0 5px",
          }}
        />
        <Input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={`Enter ${props.travelPoint}`}
          height="100%"
          width="60%"
          padding="22px 18px"
          fontSize="15px"
        />
        {props.travelPoint === "origin" ? (
          <CurrentLocalisation
            // panTo={props.panTo}
            travelPoint={props.travelPoint}
            passValue={setValue}
          />
        ) : null}
        <FontAwesomeIcon
          icon="eraser"
          style={{
            fontSize: "25px",
            cursor: "pointer",
          }}
          onClick={clearCoordsHandler}
          height="100%"
          width="25%"
        />
        {status === "OK" && <ul>{renderSuggestion()}</ul>}
      </Card>
    </>
  );
}
