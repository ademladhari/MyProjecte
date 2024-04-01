import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/reducerauth2";
import medicationReducer from "../reducers/ReducerData";
import patchReducer from "../reducers/UpdateDemande";
import userDataReducer from "../reducers/reducerUserData";
import NotificationReducer from "../reducers/NotificationReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    demandes: medicationReducer,
    updatedData: patchReducer,
    userData: userDataReducer,
    notification: NotificationReducer,
  },
});
