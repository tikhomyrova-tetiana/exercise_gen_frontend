import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import {
  selectUserExercises,
  selectCompletedExercises,
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
  CardMedia,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { updateUser } from "../../store/user/actions";
import {
  fetchFavourites,
  fetchExercises,
  fetchCompleted,
} from "../../store/exercises/thunk";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  // const [password, setPassword] = useState("");
  const genders = [{ value: "female" }, { value: "male" }, { value: "other" }];
  console.log("bahjbajbak", favourites);

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
            <InputLabel>Your Name: {user?.name}</InputLabel>
            <TextField
              sx={{ maxWidth: "250px" }}
              id="outlined-textarea"
              label="Name"
              placeholder="Name"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></TextField>
            <InputLabel>Email: {user?.email}</InputLabel>
            <TextField
              sx={{ maxWidth: "250px" }}
              id="outlined-textarea"
              label="Email"
              placeholder="Email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
            <InputLabel>Age: {user?.age}</InputLabel>

            <TextField
              sx={{ maxWidth: "250px" }}
              id="outlined-textarea"
              label="Age"
              placeholder="Age"
              size="small"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            ></TextField>
            <InputLabel>Gender: {user?.gender}</InputLabel>
            <TextField
              sx={{ maxWidth: "250px" }}
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
          ? "You didn't like any exercise"
          : favourites.map((ex) => (
              <div className="exerciseInfo">
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h6" color="secondary">
                      {ex.name}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                      {ex.bodyPart}
                    </Typography>
                  </ThemeProvider>
                </CardContent>
                <CardMedia
                  image={ex.gifUrl}
                  alt="name"
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
            ))}
      </div>
      <div>
        <h3>Statistics</h3>
      </div>
      <div>
        {!completed.length
          ? "You haven't accomplished any exercises yet"
          : completed.map((e) => (
              <div>
                <CardContent>
                  <ThemeProvider theme={theme}>
                    <Typography variant="h6" color="secondary">
                      {e.name}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                      {e.bodyPart}
                    </Typography>
                    <Typography variant="body1" color="secondary">
                      {moment(e.createdAt).format("MMM Do YY")}
                    </Typography>
                  </ThemeProvider>
                </CardContent>
              </div>
            ))}
      </div>
    </div>
  );
}
