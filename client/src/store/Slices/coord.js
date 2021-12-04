import { createSlice } from "@reduxjs/toolkit";
import home from "../../assets/home.webp";
import destination from "../../assets/destination.png";

const initialCoordState = {
  coords: {
    originCoords: {
      id: "origin",
      lat: 0,
      lng: 0,
      visible: false,
      icon: home,
      isSet: false,
    },
    destinationCoords: {
      id: "destination",
      lat: 0,
      lng: 0,
      visible: false,
      icon: destination,
      isSet: false,
    },
  },
};
const coordSlice = createSlice({
  name: "coords",
  initialState: initialCoordState,
  reducers: {
    changeCoords(state, action) {
      const updatedCoords = state.coords;
      let result;
      let coordToUpdate = Object.keys(updatedCoords).reduce(
        (accumulator, currValue) => {
          if (updatedCoords[currValue].id === action.payload.key_value)
            result = updatedCoords[currValue];
          return result;
        },
        {}
      );
      coordToUpdate.lat = action.payload.lat;
      coordToUpdate.lng = action.payload.lng;
      coordToUpdate.visible = true;
      coordToUpdate.isSet = true;

      state.coords = updatedCoords;
    },
    resetCoords(state, action) {
      const updatedCoords = state.coords;
      let result;
      let coordToUpdate = Object.keys(updatedCoords).reduce(
        (accumulator, currValue) => {
          if (updatedCoords[currValue].id === action.payload.key_value)
            result = updatedCoords[currValue];
          return result;
        },
        {}
      );
      coordToUpdate.lat = 0;
      coordToUpdate.lng = 0;
      coordToUpdate.visible = false;
      coordToUpdate.isSet = false;
      state.coords = updatedCoords;
    },
    getCoords(state, action) {
      if (action.payload === "origin") {
        return state.coords.originCoords;
      } else if (action.payload === "destination") {
        return state.coords.destinationCoords;
      }
    },
    changeToInitial(state) {
      state.coords = initialCoordState.coords;
    },
  },
});

export const coordActions = coordSlice.actions;
export default coordSlice.reducer;
