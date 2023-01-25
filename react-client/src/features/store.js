import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { authReducer } from "./";

const store = configureStore({
  reducer: { auth: authReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
