import { createSlice } from "@reduxjs/toolkit";

const initialLoadingState = {
  isLoaded: false,
};

const loadMapSlice = createSlice({
  name: "loadMap",
  initialState: initialLoadingState,
  reducers: {
    setMapState(state, action) {
      state.isLoaded = action.payload;
    },
  },
});

export const mapActions = loadMapSlice.actions;

export default loadMapSlice.reducer;
