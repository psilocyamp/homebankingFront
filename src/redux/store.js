import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./reducers/authenticationReducer";

const store = configureStore({
  reducer: {
    authenticationReducer: authenticationReducer, 
  },
});

export default store;