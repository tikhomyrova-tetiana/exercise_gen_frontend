import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectToken } from "../../store/user/selectors";
import {
  selectExercises,
  selectRepetitions,
  selectArmsExercise,
  selectBackExercise,
  selectCardioExercise,
  selectChestExercise,
  selectLegsExercise,
  selectWaistExercise,
} from "../../store/exercises/selectors";
import {
  fetchExercises,
  fetchRepetitions,
  //   addUserExercise,
  //   fetchFavourites,
} from "../../store/exercises/thunk";
import {
  Grid,
  Button,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
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

export default function Workout() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const arms = useSelector(selectArmsExercise);
  const legs = useSelector(selectLegsExercise);
  const back = useSelector(selectBackExercise);
  const waist = useSelector(selectWaistExercise);
  const chest = useSelector(selectChestExercise);
  const cardio = useSelector(selectCardioExercise);
  const repetitions = useSelector(selectRepetitions);
  //   const token = useSelector(selectToken);
  // console.log(exercises.length);
  // console.log("arms", arms);
  // console.log("legs", legs);
  // console.log("back", back);
  // console.log("waist", waist);
  // console.log("chest", chest);
  // console.log("cardio", cardio);

  const [legsExercId, setLegsExercId] = useState(0);
  const [armsExercId, setArmsExercId] = useState(0);
  const [waistExercId, setWaistExercId] = useState(0);
  const [backExercId, setBackExercId] = useState(0);
  const [chestExercId, setChestExercId] = useState(0);
  const [cardioExercId, setCardioExercId] = useState(0);
  const [reps1Id, setReps1Id] = useState(0);
  const [reps2Id, setReps2Id] = useState(0);
  const [reps3Id, setReps3Id] = useState(0);
  const [reps4Id, setReps4Id] = useState(0);
  const [reps5Id, setReps5Id] = useState(0);
  const [reps6Id, setReps6Id] = useState(0);

  //This is the necessary step to fetch the data and put it in the Redux store.
  useEffect(() => {
    dispatch(fetchExercises) && dispatch(fetchRepetitions);
  }, [dispatch]);

  const diceLegsExer = (min, max) => {
    min = 1;
    max = legs.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceArmsExer = (min, max) => {
    min = 1;
    max = arms.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceBackExer = (min, max) => {
    min = 1;
    max = back.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceWaistExer = (min, max) => {
    min = 1;
    max = waist.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceChestExer = (min, max) => {
    min = 1;
    max = chest.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceCardioExer = (min, max) => {
    min = 1;
    max = cardio.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };
  const diceTime = (min, max) => {
    min = 1;
    max = repetitions.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };

  const onClick = () => {
    setLegsExercId(diceLegsExer);
    setArmsExercId(diceArmsExer);
    setWaistExercId(diceWaistExer);
    setBackExercId(diceBackExer);
    setChestExercId(diceChestExer);
    setCardioExercId(diceCardioExer);
    setReps1Id(diceTime);
    setReps2Id(diceTime);
    setReps3Id(diceTime);
    setReps4Id(diceTime);
    setReps5Id(diceTime);
    setReps6Id(diceTime);
  };

  //   const onClickLike = (event) => {
  //     event.preventDefault();
  //     dispatch(fetchFavourites);
  //     dispatch(addUserExercise(exercises[exercId].id));
  //   };
  //   const addFavourites = token ? (
  //     <ThemeProvider theme={theme}>
  //       <Button color="primary" onClick={onClickLike}>
  //         Add to favourites <FavoriteIcon />
  //       </Button>
  //     </ThemeProvider>
  //   ) : null;

  // console.log(exercises[exercId].id);

  return (
    <div className="pageworkout">
      <div className="mainpart">
        {!exercises.length ? (
          "Loading"
        ) : (
          <div className="genpart">
            <div className="firstcolumn">
              <div className="cards">
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="p" color="secondary">
                        {arms[armsExercId].name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        align="center"
                      >
                        {arms[armsExercId].bodyPart}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={arms[armsExercId].gifUrl}
                    alt={arms[armsExercId].name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "250px",
                      minWidth: "250px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  <Grid item sx={{ maxWidth: "370px" }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        <CardContent>{repetitions[reps1Id]?.time}</CardContent>
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="p" color="secondary">
                        {legs[legsExercId].name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        align="center"
                      >
                        {legs[legsExercId].bodyPart}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={legs[legsExercId].gifUrl}
                    alt={legs[legsExercId].name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "250px",
                      minWidth: "250px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  <Grid item sx={{ maxWidth: "370px" }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        <CardContent>{repetitions[reps2Id]?.time}</CardContent>
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="p" color="secondary">
                        {waist[waistExercId].name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        align="center"
                      >
                        {waist[waistExercId].bodyPart}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={waist[waistExercId].gifUrl}
                    alt={waist[waistExercId].name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "250px",
                      minWidth: "250px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  <Grid item sx={{ maxWidth: "370px" }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        <CardContent>{repetitions[reps3Id]?.time}</CardContent>
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
              </div>
              <div className="cards">
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="p" color="secondary">
                        {back[backExercId].name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        align="center"
                      >
                        {back[backExercId].bodyPart}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={back[backExercId].gifUrl}
                    alt={back[backExercId].name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "250px",
                      minWidth: "250px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  <Grid item sx={{ maxWidth: "370px" }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        <CardContent>{repetitions[reps4Id]?.time}</CardContent>
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="p" color="secondary">
                        {chest[chestExercId].name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        align="center"
                      >
                        {chest[chestExercId].bodyPart}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={chest[chestExercId].gifUrl}
                    alt={chest[chestExercId].name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "250px",
                      minWidth: "250px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  <Grid item sx={{ maxWidth: "370px" }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        <CardContent>{repetitions[reps5Id]?.time}</CardContent>
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="p" color="secondary">
                        {cardio[cardioExercId].name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="secondary"
                        align="center"
                      >
                        {cardio[cardioExercId].bodyPart}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={cardio[cardioExercId].gifUrl}
                    alt={cardio[cardioExercId].name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "250px",
                      minWidth: "250px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  <Grid item sx={{ maxWidth: "370px" }}>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        <CardContent>{repetitions[reps6Id]?.time}</CardContent>
                      </Typography>
                    </ThemeProvider>
                  </Grid>
                </div>
              </div>
              {/* {addFavourites} */}
            </div>
            <div className="secondcolumn">
              <ThemeProvider theme={theme}>
                <Button color="primary" variant="outlined" onClick={onClick}>
                  Generate
                </Button>
              </ThemeProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
