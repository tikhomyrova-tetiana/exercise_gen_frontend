import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/slice";
import { exercisesFetched } from "./slice";

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
