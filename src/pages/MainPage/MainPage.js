import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken } from "../../store/user/selectors";
import {
  selectExercises,
  selectRepetitions,
} from "../../store/exercises/selectors";
import {
  fetchExercises,
  fetchRepetitions,
  addUserExercise,
  fetchFavourites,
} from "../../store/exercises/thunk";
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Homepage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const repetitions = useSelector(selectRepetitions);
  const token = useSelector(selectToken);
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

  const onClickLike = (event) => {
    event.preventDefault();
    dispatch(fetchFavourites);
    dispatch(addUserExercise(exercises[exercId].id));
  };
  const addFavourites = token ? (
    <Button color="primary" onClick={onClickLike}>
      Add to favourites <FavoriteIcon />
    </Button>
  ) : null;

  // console.log(exercises[exercId].id);

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
          <Grid item direction="row" xs={7} columnSpacing={2} rowSpacing={2}>
            <Card sx={{ maxWidth: "370px" }}>
              <Grid item>
                <CardContent>
                  <Typography variant="h6">
                    {exercises[exercId].name}
                    {/* 3/4 sit-up */}
                  </Typography>
                </CardContent>
                <CardMedia
                  image={exercises[exercId].gifUrl}
                  // image="http://d205bpvrqc9yn1.cloudfront.net/0001.gif"
                  alt={exercises.name}
                  // alt="exercise"
                  sx={{
                    maxHeight: "360px",
                    maxWidth: "360px",
                    minHeight: "360px",
                    minWidth: "360px",
                    height: "100%",
                    width: "100%",
                  }}
                ></CardMedia>
              </Grid>
            </Card>
            <Card sx={{ maxWidth: "370px", mt: "20px" }}>
              <CardContent>{repetitions[repsId]?.time}</CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Grid container>
        {addFavourites}
        <Button variant="outlined" onClick={onClick}>
          Generate
        </Button>
      </Grid>
    </Grid>
  );
}
