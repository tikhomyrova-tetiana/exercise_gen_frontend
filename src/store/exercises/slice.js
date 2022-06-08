import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  exercises: [],
  repetition: [],
  favourites: [],
  completed: [],
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
    completedFetched: (state, action) => {
      state.completed = action.payload;
      state.loading = false;
    },
    addCompleted: (state, action) => {
      state.completed = [...state.completed, action.payload];
    },
  },
});

export const {
  startLoading,
  exercisesFetched,
  repetitionFetched,
  favouritesFetched,
  addFavourites,
  completedFetched,
  addCompleted,
} = exerciseSlice.actions;

export default exerciseSlice.reducer;
