import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectExercises,
  selectRepetitions,
} from "../../store/exercises/selectors";
import { fetchExercises, fetchRepetitions } from "../../store/exercises/thunk";
import { Grid, Button } from "@mui/material";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const repetitions = useSelector(selectRepetitions);
  console.log(exercises.length);
  console.log("reps", repetitions);

  //This is the necessary step to fetch the data and put it in the Redux store.
  useEffect(() => {
    dispatch(fetchExercises) && dispatch(fetchRepetitions);
  }, [dispatch]);

  const diceExer = (min, max) => {
    min = 1;
    max = exercises.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceTime = (min, max) => {
    min = 1;
    max = repetitions.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };

  const onClick = () => {
    setExercId(diceExer);
    setRepsId(diceTime);
  };
  const [exercId, setExercId] = useState(0);
  const [repsId, setRepsId] = useState(0);

  return (
    <Grid container>
      <Grid container columnSpacing={{ xs: 1 }} direction="row" xs={12}>
        <Grid item mr="50px" direction="column" xs={3}>
          <Grid item variant="h6">
            Generate an exercise
          </Grid>
          <Grid item variant="span">
            text text text text text text text text text text text text text
            text text text{" "}
          </Grid>
        </Grid>

        {!exercises.length ? (
          "Loading"
        ) : (
          <Grid item direction="row" xs={7}>
            <Grid item direction="column">
              <Grid item>
                <p>{exercises[exercId].name}</p>
                <img src={exercises[exercId].gifUrl} alt="exercise"></img>
              </Grid>
            </Grid>
            <Grid item direction="column">
              <Grid item>
                <p>{repetitions[repsId].time}</p>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid container>
        <Button variant="outlined" onClick={onClick}>
          Generate
        </Button>
      </Grid>
    </Grid>
  );
}
