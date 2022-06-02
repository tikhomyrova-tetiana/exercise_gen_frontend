import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  exercises: [],
  repetition: [],
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
  },
});

export const { startLoading, exercisesFetched, repetitionFetched } =
  exerciseSlice.actions;

export default exerciseSlice.reducer;
