import React from "react";
import Input from "../../common/Input";
import Card from "../../common/Card";
import SuggestionDiv from "../../common/SuggestionDiv";
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
          // console.log("Coordinates:", { lat, lng });
          dispatch(
            coordActions.changeCoords({
              lat: lat,
              lng: lng,
              key_value: props.travelPoint,
            })
          );
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    };

  const renderSuggestion = () =>
    data.map((suggestion) => {
      const { place_id, structured_formatting } = suggestion;
      return (
        <SuggestionItem
          key={place_id}
          text={structured_formatting}
          value={suggestion}
          selectHandler={handleSelect}
        />
      );
    });
  return (
    <>
      <Card
        height="100%"
        width="100%"
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
        <Card width="60%" flexDirection="column" height="75%">
          <Input
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder={`Enter ${props.travelPoint}`}
            height="100%"
            width="100%"
            padding="22px 18px"
            fontSize="15px"
          />
          <Card position="relative" height="100%">
            {status === "OK" && (
              <SuggestionDiv>{renderSuggestion()}</SuggestionDiv>
            )}
          </Card>
        </Card>
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
            marginRight: "5%",
          }}
          onClick={clearCoordsHandler}
          height="100%"
          width="25%"
        />
      </Card>
    </>
  );
}
