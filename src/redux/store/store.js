import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/reducerauth2";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
});