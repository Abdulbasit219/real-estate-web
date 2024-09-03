import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/Userslice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";
import { version } from "react";

const rootReducer = combineReducers({ user: userReducer });

const persisConfig = {
  key: "root",
  storage,
  version: 1
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export const persistor = persistStore(store);