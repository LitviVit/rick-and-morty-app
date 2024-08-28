import { createSlice } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
  name: 'characters',
  initialState: { characters: [] },
  reducers: {
    setCharacters(state, action) {
      state.characters = action.payload;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export const charactersReducer = charactersSlice.reducer;
