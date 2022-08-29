import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  cards: [],
  originalData: [],
  filteredData: [],
  loading: false,
}

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setCards: (state, action) => {
      state.cards.push(action.payload)
    },
    setOriginalData: (state, action) => {
      state.originalData = [...action.payload]
    },
    setFilteredData: (state, action) => {
      state.filteredData = [...action.payload]
    },
    setLoadingOn: (state) => {
      state.loading = true
    },
    setLoadingOff: (state) => {
      state.loading = false
    }
  },
})

export const { setCards, setOriginalData, setFilteredData, setLoadingOn, setLoadingOff } = pokemonSlice.actions

export default pokemonSlice.reducer