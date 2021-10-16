import React from "react";
import Card from "../../../common/Card";
import AutocompleteInput from "../../../GoogleMap/MapOperations.js/AutocompleteInput";
import FindRoad from "../../../GoogleMap/MapOperations.js/FindRoad";

export default function TripForm(props) {
  return (
    <Card flexDirection="column" flexBasis="25%" alignItems="center">
      <Card
        flexBasis="30%"
        width="90%"
        backGroundColor="white"
        alignItems="center"
        borderRad="25px"
        justifyContent="space-between"
      >
        <AutocompleteInput
          panTo={props.panTo}
          travelPoint="origin"
          // clearMarker={clearMarkers}
        />
        <AutocompleteInput
          panTo={props.panTo}
          travelPoint="destination"
          // clearMarker={clearMarkers}
        />

        {/* <FindRoad
        travelMode={travelMode}
        originCoords={getCoords("origin")}
        destinationCoords={getCoords("destination")}
      /> */}
      </Card>
      <Card>
        <button>Search</button>
      </Card>
    </Card>
  );
}
