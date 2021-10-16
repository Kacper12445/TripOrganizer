import React from "react";
import Card from "../../../common/Card";
import Button from "../../../common/Button";
import Text from "../../../common/Text";
import AutocompleteInput from "../../../GoogleMap/MapOperations.js/AutocompleteInput";
import FindRoad from "../../../GoogleMap/MapOperations.js/FindRoad";

export default function TripForm(props) {
  return (
    <Card
      flexDirection="column"
      flexBasis="20%"
      alignItems="center"
      width="90%"
    >
      <Card
        flexBasis="35%"
        width="95%"
        backGroundColor="white"
        alignItems="center"
        borderRad="25px"
        justifyContent="space-between"
      >
        <AutocompleteInput
          panTo={props.panTo}
          travelPoint="origin"
          icon="home"
          // clearMarker={clearMarkers}
        />
        <AutocompleteInput
          panTo={props.panTo}
          travelPoint="destination"
          icon="map-marked-alt"
          // clearMarker={clearMarkers}
        />

        {/* <FindRoad
        travelMode={travelMode}
        originCoords={getCoords("origin")}
        destinationCoords={getCoords("destination")}
      /> */}
      </Card>
      <Card
        flexBasis="25%"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          backGroundColor="rgb(0,255,110)"
          height="100%"
          width="30%"
          borderRad="25px"
          alignItems="center"
          justifyContent="center"
        >
          <Text textAlign="center" fontSize="20px" color="white">
            Search
          </Text>
        </Button>
      </Card>
    </Card>
  );
}
