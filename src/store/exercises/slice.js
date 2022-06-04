import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  exercises: [],
  repetition: [],
  favourites: [],
};

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    exercisesFetched: (state, action) => {
      state.exercises = action.payload;
      state.loading = false;
    },
    repetitionFetched: (state, action) => {
      state.repetition = action.payload;
      state.loading = false;
    },
    favouritesFetched: (state, action) => {
      state.favourites = action.payload;
      state.loading = false;
    },
    addFavourites: (state, action) => {
      state.favourites = [...state.favourites, action.payload];
    },
  },
});

export const {
  startLoading,
  exercisesFetched,
  repetitionFetched,
  favouritesFetched,
  addFavourites,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
