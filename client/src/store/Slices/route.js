import { createSlice } from "@reduxjs/toolkit";

const initialRouteState = {
  routeHint: [
    {
      text: "",
      distance: "",
      distanceValue: 0,
      duration: "",
    },
  ],
};

const routeSlice = createSlice({
  name: "routes",
  initialState: initialRouteState,
  reducers: {
    setRoute(state, action) {
      let tempArray = [];
      action.payload.instruction.steps.forEach((element) => {
        tempArray.push({
          text: element.html_instructions,
          distance: element.distance.text,
          distanceValue: element.distance.value,
          duration: element.duration.text,
          durationValue: element.duration.value,
        });
      });
      state.routeHint = tempArray;
    },
    resetRoute(state) {
      state.routeHint = initialRouteState;
    },
  },
});

export const routeActions = routeSlice.actions;
export default routeSlice.reducer;
