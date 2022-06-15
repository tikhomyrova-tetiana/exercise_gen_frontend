import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import moment from "moment";
import chroma from "chroma-js";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import {
  selectUserExercises,
  selectCompletedExercises,
  selectCompletedArms,
  selectCompletedBack,
  selectCompletedCardio,
  selectCompletedChest,
  selectCompletedLegs,
  selectCompletedWaist,
} from "../../store/exercises/selectors";
import { useNavigate } from "react-router";
import "./styles.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { updateUser } from "../../store/user/actions";
import {
  fetchFavourites,
  fetchExercises,
  fetchCompleted,
  deleteUserExercise,
} from "../../store/exercises/thunk";
import BodyView from "../../components/BodyView/BodyView";
import Statistics from "../../components/Statistics/Statistics";
import Favourites from "../../components/Favourites/Favourites";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

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

export default function Profile() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const favourites = useSelector(selectUserExercises);
  const completed = useSelector(selectCompletedExercises);
  const arms = useSelector(selectCompletedArms);
  const legs = useSelector(selectCompletedLegs);
  const waist = useSelector(selectCompletedWaist);
  const cardio = useSelector(selectCompletedCardio);
  const back = useSelector(selectCompletedBack);
  const chest = useSelector(selectCompletedChest);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  // const [password, setPassword] = useState("");
  const genders = [{ value: "female" }, { value: "male" }, { value: "other" }];
  console.log("favourites", favourites);
  console.log("completed", completed);
  console.log(arms, legs, waist, back, chest, cardio);

  useEffect(() => {
    if (!token) navigate("/");
    dispatch(fetchFavourites) &&
      dispatch(fetchExercises) &&
      dispatch(fetchCompleted);
  }, [token, navigate, dispatch]);

  // const [values, setValues] = useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   showPassword: false,
  // });
  // const handleClickShowPassword = () => {
  //   setValues({
  //     ...values,
  //     showPassword: !values.showPassword,
  //   });
  // };
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const onClickUnlike = (id) => {
    dispatch(deleteUserExercise(id));
  };

  const submit = (event) => {
    event.preventDefault();
    dispatch(
      updateUser(
        user?.id,
        name !== "" ? name : user?.name,
        email !== "" ? email : user?.email,
        age !== "" ? age : user?.age,
        gender !== "" ? gender : user?.gender,
        // password !== "" ? password : user?.password,
        photo !== "" ? photo : user?.photo
      )
    );
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    // setPassword("");
  };

  // Cloudinary part  image,
  const [photo, setPhoto] = useState("");
  const Input = styled("input")({
    display: "none",
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset from your clooudinary website
    data.append("upload_preset", "c1xpd3rm");
    //post request to Cloudinary, remember to change to your own link, dwpyp7i9h - cloud name
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dwpyp7i9h/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    // we can use Axios(first import it) request instead of Fetch
    // axios.post("https://api.cloudinary.com/v1_1/dwpyp7i9h/image/upload", data);
    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    setPhoto(file.url); //put the url in local state, next step you can send it to the backend
  };
  // Cloudinary part

  return (
    <div className="profilePage">
      <div className="profile">
        <div className="photo">
          <Img alt="userphoto" src={photo ? photo : user?.photo} />
          <ThemeProvider theme={theme}>
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                type="file"
                onChange={uploadImage}
              />
              <Button variant="outlined" component="span">
                Upload
              </Button>
            </label>
          </ThemeProvider>
        </div>
        <div>
          <div className="info">
            <h3>Personal information</h3>
            <InputLabel color="primary">Your Name: {user?.name}</InputLabel>
            <TextField
              sx={{ maxWidth: "250px", margin: "5px 0" }}
              id="outlined-textarea"
              label="Name"
              placeholder="Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <InputLabel>Email: {user?.email}</InputLabel>
            <TextField
              sx={{ maxWidth: "250px", margin: "5px 0" }}
              id="outlined-textarea"
              label="Email"
              placeholder="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <InputLabel>Age: {user?.age}</InputLabel>

            <TextField
              sx={{ maxWidth: "250px", margin: "5px 0" }}
              id="outlined-textarea"
              label="Age"
              placeholder="Age"
              size="small"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            ></TextField>
            <InputLabel>Gender: {user?.gender}</InputLabel>
            <TextField
              sx={{ maxWidth: "250px", margin: "5px 0" }}
              id="outlined-select-gender"
              select
              size="small"
              value={gender}
              onChange={handleChangeGender}
            >
              {genders.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
            {/* <InputLabel>Password</InputLabel> */}
            <FormControl variant="outlined">
              {/* <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={password}
              size="medium"
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            /> */}
              <ThemeProvider theme={theme}>
                <Button
                  sx={{ maxWidth: "250px" }}
                  onClick={submit}
                  className="custom-link"
                  color="secondary"
                >
                  Save changes
                </Button>
              </ThemeProvider>
            </FormControl>
          </div>
        </div>
      </div>
      <div>
        <h3>Favourites</h3>
      </div>
      <div className="fav">
        {!favourites.length
          ? "You didn't like any exercises"
          : favourites.map((ex) => (
              <div>
                <Favourites
                  key={ex.id}
                  name={ex.name}
                  bodyPart={ex.bodyPart}
                  gif={ex.gifUrl}
                  btn={
                    <ThemeProvider theme={theme}>
                      <Button
                        color="primary"
                        onClick={() => onClickUnlike(ex.id)}
                      >
                        Remove from favourites <HeartBrokenIcon />
                      </Button>
                    </ThemeProvider>
                  }
                />
              </div>
            ))}
      </div>
      <div>
        <h3>Statistics</h3>
      </div>
      <div>
        <div className="statisticsInfo">
          <Table>
            <TableHead>
              <TableRow>
                <th align="left">Exercise</th>
                <th align="left">Body Part</th>
                <th align="right">Date</th>
              </TableRow>
            </TableHead>
            {!completed.length
              ? "You haven't accomplished any exercises yet"
              : completed.map((e) => (
                  // <Statistics
                  //   key={e.id}
                  //   name={e.name.toUpperCase()}
                  //   bodyPart={e.bodyPart}
                  //   date={moment(e.createdAt).format("MMM Do YY")}
                  // />
                  <Statistics
                    key={e.id}
                    name={e.name.toUpperCase()}
                    bodyPart={e.bodyPart}
                    date={moment(e.createdAt).format("MMM Do YY")}
                  />
                ))}
          </Table>
        </div>
        <div>
          <ThemeProvider theme={theme}>
            <Typography variant="h5" color="secondary">
              Check which body part you work on the most:{" "}
            </Typography>
          </ThemeProvider>
        </div>

        {!completed.length ? null : (
          <div className="statisticsBody">
            <div>
              <CardContent>
                <ThemeProvider theme={theme}>
                  <Typography variant="body1" color="secondary">
                    Arms exercises completed {arms} -{" "}
                    {Math.round((arms / completed.length) * 100)} %
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    Legs exercises completed {legs} -{" "}
                    {Math.round((legs / completed.length) * 100)} %
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    Chest exercises completed {chest} -{" "}
                    {Math.round((chest / completed.length) * 100)} %
                  </Typography>

                  <Typography variant="body1" color="secondary">
                    Back exercises completed {back} -{" "}
                    {Math.round((back / completed.length) * 100)} %
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    Waist exercises completed {waist} -{" "}
                    {Math.round((waist / completed.length) * 100)} %
                  </Typography>
                  <Typography variant="body1" color="secondary">
                    Cardio exercises completed {cardio} -{" "}
                    {Math.round((cardio / completed.length) * 100)} %
                  </Typography>
                </ThemeProvider>
              </CardContent>
            </div>
            <div class="human-body">
              <BodyView
                waistFrontColor={
                  chroma.scale(["white", "#00e676"]).mode("lch").colors(100)[
                    Math.round((waist / completed.length) * 100)
                  ]
                }
                armsColor={
                  chroma.scale(["white", "#00e676"]).mode("lch").colors(100)[
                    Math.round((arms / completed.length) * 100)
                  ]
                }
                legsColor={
                  chroma.scale(["white", "#00e676"]).mode("lch").colors(100)[
                    Math.round((legs / completed.length) * 100)
                  ]
                }
                chestColor={
                  chroma.scale(["white", "#00e676"]).mode("lch").colors(100)[
                    Math.round((chest / completed.length) * 100)
                  ]
                }
                backColor={
                  chroma.scale(["white", "#00e676"]).mode("lch").colors(100)[
                    Math.round((back / completed.length) * 100)
                  ]
                }
                heartColor={
                  chroma.scale(["white", "#00e676"]).mode("lch").colors(100)[
                    Math.round((cardio / completed.length) * 100)
                  ]
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
