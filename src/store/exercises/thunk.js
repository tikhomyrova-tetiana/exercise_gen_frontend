import axios from "axios";
import { appDoneLoading, appLoading } from "../appState/slice";
import {
  exercisesFetched,
  repetitionFetched,
  addFavourites,
  favouritesFetched,
  completedFetched,
  addCompleted,
  deleteFavourites,
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
    const { token } = getState().user;
    dispatch(appLoading());

    //getting the favourites from backend
    const response = await axios.get(
      "http://localhost:4000/exercises/favourites",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("fav", response);
    const favourites = response.data;

    //getting the whole favourites object from the API using the id's only
    const favoritesArray = await Promise.all(
      favourites.map(async (item) => {
        const getObject = await axios.get(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${item.exercise.apiId}`,
          {
            headers: {
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
              "X-RapidAPI-Key":
                "d067087cb5msh916566a37810f52p163719jsnf04db4e1577b",
            },
          }
        );
        return getObject;
      })
    );

    console.log("test", favoritesArray);

    //conver the favourites array to only have the data we are interested in
    const relevantData = favoritesArray.map((item) => item.data);
    console.log("relevant", relevantData);

    // axios.all(favourites.get)

    dispatch(favouritesFetched(relevantData));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
}

export async function fetchCompleted(dispatch, getState) {
  try {
    const { token } = getState().user;
    dispatch(appLoading());

    //getting the completed from backend
    const response = await axios.get(
      "http://localhost:4000/exercises/completed",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log("done", response);
    const completed = response.data;
    dispatch(completedFetched(completed));
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

export const deleteUserExercise = (apiId) => async (dispatch, getState) => {
  try {
    const { token } = getState().user;
    dispatch(appLoading());
    const userFav = await axios.delete(
      `http://localhost:4000/exercises/favourites/${apiId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("delete thunk", userFav.data);
    dispatch(deleteFavourites(apiId));
    dispatch(appDoneLoading());
  } catch (error) {
    console.log(error.message);
    dispatch(appDoneLoading());
  }
};

export const addCompletedExercise =
  (apiId, name, bodyPart) => async (dispatch, getState) => {
    try {
      const { token } = getState().user;
      dispatch(appLoading());
      const completed = await axios.post(
        "http://localhost:4000/exercises/completed",
        { apiId, name, bodyPart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        // add Auth headers (token)
      );
      dispatch(addCompleted(completed.data));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log(error.message);
      dispatch(appDoneLoading());
    }
  };
