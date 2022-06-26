import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { storeProps } from "../Interface";

const init = {
  movies: [],
  user: {},
  httpError: ""
};

const reducer = (state = init, action: any) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload
      };
    case "SET_HTTP_ERROR":
      return {
        ...state,
        httpError: action.payload
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "movies"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools());

const persistore = persistStore(store);

const StateProvider: React.FC<storeProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading..."} persistor={persistore}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export { store, StateProvider };
