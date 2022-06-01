import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "./appState/slice";
import userReducer from "./user/slice";
import exerciseReducer from "./exercises/slice";

export default configureStore({
  reducer: {
    appState: appStateReducer,
    user: userReducer,
    exercises: exerciseReducer,
  },
});
