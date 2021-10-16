import { createStore } from "redux";

const coordsReducer = (
  {
    state = {
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
    },
  },
  action
) => {
  return state;
};

const store = createStore(coordsReducer);

export default store;
