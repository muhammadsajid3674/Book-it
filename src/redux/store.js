import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "./services/user.api";
import { roomApi } from "./services/room.api";

export const store = configureStore({
   reducer: {
      [roomApi.reducerPath]: roomApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
   },
   devTools: process.env.NODE_ENV !== "production",
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([roomApi.middleware, userApi.middleware]),
});

setupListeners(store.dispatch);
