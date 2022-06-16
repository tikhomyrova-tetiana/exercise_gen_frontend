import React, { useState } from "react";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { selectToken } from "../../store/user/selectors";
import {
  selectExercises,
  selectRepetitions,
  selectArmsExercise,
  selectLegsExercise,
  selectBackExercise,
  selectWaistExercise,
  selectChestExercise,
  selectCardioExercise,
} from "../../store/exercises/selectors";
import {
  fetchExercises,
  fetchRepetitions,
  //   addUserExercise,
  //   fetchFavourites,
  //   fetchCompleted,
  //   addCompletedExercise,
} from "../../store/exercises/thunk";
import {
  Grid,
  Button,
  CardMedia,
  CardContent,
  Typography,
  //   Link,
} from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises);
  const repetitions = useSelector(selectRepetitions);
  const arms = useSelector(selectArmsExercise);
  const legs = useSelector(selectLegsExercise);
  const back = useSelector(selectBackExercise);
  const waist = useSelector(selectWaistExercise);
  const chest = useSelector(selectChestExercise);
  const cardio = useSelector(selectCardioExercise);
  //   const token = useSelector(selectToken);
  console.log(exercises.length);
  console.log("reps", repetitions);

  const [legsExercId, setLegsExercId] = useState(0);
  const [armsExercId, setArmsExercId] = useState(0);
  const [waistExercId, setWaistExercId] = useState(0);
  const [backExercId, setBackExercId] = useState(0);
  const [chestExercId, setChestExercId] = useState(0);
  const [cardioExercId, setCardioExercId] = useState(0);
  const [exercId, setExercId] = useState(0);
  const [repsId, setRepsId] = useState(0);

  //This is the necessary step to fetch the data and put it in the Redux store.
  useEffect(() => {
    dispatch(fetchExercises) && dispatch(fetchRepetitions);
  }, [dispatch]);

  const diceExer = (min, max) => {
    min = 1;
    max = exercises.length - 1;
    return Math.floor(Math.random() * (max - min + 1) + min); //Максимум и минимум включаются
  };

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
    setExercId(diceExer);
    setRepsId(diceTime);
  };
  const onClickArms = () => {
    setArmsExercId(diceArmsExer);
    setRepsId(diceTime);
  };
  const onClickLegs = () => {
    setLegsExercId(diceLegsExer);
    setRepsId(diceTime);
  };
  const onClickBack = () => {
    setBackExercId(diceBackExer);
    setRepsId(diceTime);
  };
  const onClickWaist = () => {
    setWaistExercId(diceWaistExer);
    setRepsId(diceTime);
  };
  const onClickChest = () => {
    setChestExercId(diceChestExer);
    setRepsId(diceTime);
  };
  const onClickCardio = () => {
    setCardioExercId(diceCardioExer);
    setRepsId(diceTime);
  };

  //   const onClickLike = (event) => {
  //     event.preventDefault();
  //     dispatch(fetchFavourites);
  //     dispatch(addUserExercise(exercises[exercId].id));
  //   };

  //   const onClickDone = (event) => {
  //     event.preventDefault();
  //     dispatch(fetchCompleted);
  //     dispatch(
  //       addCompletedExercise(
  //         exercises[exercId].id,
  //         exercises[exercId].name,
  //         exercises[exercId].bodyPart
  //       )
  //     );
  //   };
  //   const addFavourites = token ? (
  //     <div className="buttons">
  //       {/* <ThemeProvider theme={theme}>
  //         <Button color="primary" onClick={onClickLike}>
  //           Add to favourites <FavoriteIcon />
  //         </Button>
  //       </ThemeProvider> */}
  //       <ThemeProvider theme={theme}>
  //         <Button color="primary" onClick={onClickDone}>
  //           Done <CheckCircleIcon />
  //         </Button>
  //       </ThemeProvider>
  //     </div>
  //   ) : null;

  return (
    <div className="page">
      <div className="mainpart">
        {!exercises.length ? (
          "Loading"
        ) : (
          <div className="part">
            <div className="firstcolumn">
              <div>
                <ThemeProvider theme={theme}>
                  <Button color="primary" variant="outlined" onClick={onClick}>
                    All body parts
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {exercises[exercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={exercises[exercId].gifUrl}
                    alt={exercises.name}
                    sx={{
                      maxHeight: "360px",
                      maxWidth: "360px",
                      minHeight: "360px",
                      minWidth: "360px",
                      height: "100%",
                      width: "100%",
                    }}
                  ></CardMedia>
                  {/* {addFavourites} */}
                </div>
              </div>
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickArms}
                  >
                    Arms
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {arms[armsExercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={arms[armsExercId].gifUrl}
                    alt={arms[armsExercId].name}
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
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickLegs}
                  >
                    Legs
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {legs[legsExercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={legs[legsExercId].gifUrl}
                    alt={legs[legsExercId].name}
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
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickBack}
                  >
                    Back
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {back[backExercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={back[backExercId].gifUrl}
                    alt={back[backExercId].name}
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
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickWaist}
                  >
                    Waist
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {waist[waistExercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={waist[waistExercId].gifUrl}
                    alt={waist[waistExercId].name}
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
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickCardio}
                  >
                    Cardio
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {cardio[cardioExercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={cardio[cardioExercId].gifUrl}
                    alt={cardio[cardioExercId].name}
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
              <div>
                <ThemeProvider theme={theme}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={onClickChest}
                  >
                    Chest
                  </Button>
                </ThemeProvider>
                <div className="exerciseInfo">
                  <CardContent>
                    <ThemeProvider theme={theme}>
                      <Typography variant="h6" color="secondary">
                        {chest[chestExercId].name.toUpperCase()}
                      </Typography>
                    </ThemeProvider>
                  </CardContent>
                  <CardMedia
                    image={chest[chestExercId].gifUrl}
                    alt={chest[chestExercId].name}
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
              <div></div>
            </div>
            <div className="secondcolumn">
              <Grid item sx={{ maxWidth: "370px" }}>
                <ThemeProvider theme={theme}>
                  <Typography variant="h3" color="secondary">
                    <CardContent>{repetitions[repsId]?.time}</CardContent>
                  </Typography>
                </ThemeProvider>
              </Grid>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
