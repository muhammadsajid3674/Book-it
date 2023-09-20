import { configureStore } from "@reduxjs/toolkit";
const { combineReducers } = require("redux");
const { commonApi } = require("./common.api");

const preloadedState = {};

const rootReducer = combineReducers({
   [commonApi.reducerPath]: commonApi.reducer,
});

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(commonApi.middleware),
   preloadedState,
   devTools: process.env.NODE_ENV !== "production",
});
