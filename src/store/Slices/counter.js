import { createSlice } from "@reduxjs/toolkit";

const initialCoordState = {
  coords: {
    originCoords: {
      id: "origin",
      lat: 0,
      lng: 0,
      time: 0,
      visible: false,
    },
    destinationCoords: {
      id: "destination",
      lat: 0,
      lng: 0,
      time: 0,
      visible: false,
    },
  },
};
const coordSlice = createSlice({
  name: "coords",
  initialState: initialCoordState,
  reducers: {
    //  tu podajemy nazwy funkcji
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      //    jesli chcemy payload to musimy dodac action
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

export const coordActions = coordSlice.actions;
export default coordSlice.reducer;
