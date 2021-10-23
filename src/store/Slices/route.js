import { createSlice } from "@reduxjs/toolkit";

const initialRouteState = {
  routeHint: [
    {
      text: "",
      distance: "",
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
      console.log(action.payload.instruction);
      action.payload.instruction.steps.forEach((element) => {
        tempArray.push({
          text: element.html_instructions,
          distance: element.distance.text,
          duration: element.duration.text,
        });
      });
      state.routeHint = tempArray;
    },
  },
});

export const routeActions = routeSlice.actions;
export default routeSlice.reducer;
