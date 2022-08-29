import { configureStore } from "@reduxjs/toolkit"
import pokemonSlice from "./slice";

export const store = configureStore({
  reducer: {
    collection: pokemonSlice
  },
})