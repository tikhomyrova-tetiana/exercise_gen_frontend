import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/slice";
import {
  exercisesFetched,
  repetitionFetched,
  addFavourites,
  favouritesFetched,
} from "./slice";

export async function fetchExercises(dispatch, getState) {
  try {
    dispatch(appLoading());
    const response = await axios.get(
      "http://localhost:4000/exercises/equipment/:equipment"
    );
    console.log("response", response);
    const exercises = response.data;
    dispatch(exercisesFetched(exercises));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
}

export async function fetchRepetitions(dispatch, getState) {
  try {
    dispatch(appLoading());
    const response = await axios.get("http://localhost:4000/repetitions");
    console.log("reps", response);
    const repetitions = response.data;
    dispatch(repetitionFetched(repetitions));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
}

export async function fetchFavourites(dispatch, getState) {
  try {
    dispatch(appLoading());
    const response = await axios.get(
      "http://localhost:4000/exercises/favourites"
    );
    console.log("fav", response);
    const favourites = response.data;
    dispatch(favouritesFetched(favourites));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
}

export const addUserExercise = (apiId) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    dispatch(appLoading());
    const userFav = await axios.post(
      "http://localhost:4000/exercises/favourites",
      { apiId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      // add Auth headers (token)
    );
    dispatch(addFavourites(userFav.data));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
};
