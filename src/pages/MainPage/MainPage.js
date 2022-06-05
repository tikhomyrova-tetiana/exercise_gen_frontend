import React, { useState } from "react";
import "./styles.css";
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
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#00695c",
    },
    secondary: {
      main: "#004d40",
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <Button color="primary" onClick={onClickLike}>
        Add to favourites <FavoriteIcon />
      </Button>
    </ThemeProvider>
  ) : null;

  // console.log(exercises[exercId].id);

  return (
    <div className="page">
      <div className="mainpart">
        <div className="text">
          <h5>WELCOME to Exercise Gen!</h5>
          <p align="center">
            For fitness lovers of all levels. Generate random exercises or a
            complete workout to make your fitness training more interesting.
            Create an account for a better experience and expanded
            functionality.
          </p>
        </div>

        {!exercises.length ? (
          "Loading"
        ) : (
          <div className="genpart">
            <div className="firstcolumn">
              <div>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {exercises[exercId].name}
                        {/* 3/4 sit-up */}
                      </Typography>
                    </ThemeProvider>
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
                </div>
              </div>
              {addFavourites}
            </div>
            <div className="secondcolumn">
              <Grid item sx={{ maxWidth: "370px" }}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" color="secondary">
                    <CardContent>{repetitions[repsId]?.time}</CardContent>
                  </Typography>
                </ThemeProvider>
              </Grid>
              <div>
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="outlined" onClick={onClick}>
                    Generate
                  </Button>
                </ThemeProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
