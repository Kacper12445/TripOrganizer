import React from "react";
import Card from "../../../common/Card";
import AutocompleteInput from "../../../../services/AutocompleteInput";
import FindRoad from "../../../../services/FindRoad";
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
  return (
    <Card
      flexDirection="column"
      flexBasis="20%"
      alignItems="center"
      width="90%"
      flexWrap="wrap"
      margin="0 0 3% 0"
    >
      <Card
        flexBasis="35%"
        width="90%"
        backGroundColor="white"
        alignItems="center"
        borderRad="10px"
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
