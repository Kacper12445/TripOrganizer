import React from "react";
import Card from "../../../common/Card";
import Button from "../../../common/Button";
import Text from "../../../common/Text";
import AutocompleteInput from "../../../GoogleMap/MapOperations.js/AutocompleteInput";
import FindRoad from "../../../GoogleMap/MapOperations.js/FindRoad";

const autoCompleteData = [
  {
    travelPoint: "origin",
    icon: "home",
  },
  {
    travelPoint: "destination",
    icon: "map-marked-alt",
  },
];

export default function TripForm() {
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
        {autoCompleteData.map((item, index) => {
          return (
            <AutocompleteInput
              key={index}
              travelPoint={item.travelPoint}
              icon={item.icon}
            />
          );
        })}
        {/* <FindRoad/> */}
      </Card>
      <FindRoad />
    </Card>
  );
}
