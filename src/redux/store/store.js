import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/reducerauth2";
import medicationReducer from "../reducers/ReducerData";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    demandes: medicationReducer,
  },
});
