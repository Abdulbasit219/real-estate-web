import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/Userslice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({ user: userReducer });

const persisConfig = {
  key: "root",
  storage,
  version: 1
};

const persistedReducer = persistReducer(persisConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export const persistor = persistStore(store);