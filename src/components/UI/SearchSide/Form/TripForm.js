import React from "react";
import Card from "../../../common/Card";
import AutocompleteInput from "../../../GoogleMap/MapOperations.js/AutocompleteInput";
import FindRoad from "../../../GoogleMap/MapOperations.js/FindRoad";
import { useSelector } from "react-redux";

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
  const isLoaded = useSelector((state) => state.map.isLoaded);
  console.log(isLoaded);
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
        {isLoaded
          ? autoCompleteData.map((item, index) => {
              return (
                <AutocompleteInput
                  key={index}
                  travelPoint={item.travelPoint}
                  icon={item.icon}
                />
              );
            })
          : null}
      </Card>
      <FindRoad />
    </Card>
  );
}
