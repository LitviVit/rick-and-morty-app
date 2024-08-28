import { configureStore } from "@reduxjs/toolkit";
import { charactersReducer } from "./reducers";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
});
