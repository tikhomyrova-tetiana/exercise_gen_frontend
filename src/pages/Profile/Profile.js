import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import {
  selectExercises,
  selectUserExercises,
} from "../../store/exercises/selectors";
import { useNavigate } from "react-router";
import "./styles.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  // Link,
  MenuItem,
  OutlinedInput,
  TextField,
  Button,
  CardContent,
  Typography,
  CardMedia,
  // AlertTitle,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@emotion/react";
import { updateUser, updateUserPhoto } from "../../store/user/actions";
import { fetchFavourites, fetchExercises } from "../../store/exercises/thunk";
import axios from "axios";

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
  const exercises = useSelector(selectExercises);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const genders = [{ value: "female" }, { value: "male" }, { value: "other" }];
  console.log("bahjbajbak", favourites);

  // const arr1 = [4, 6, 8, 3, 8];
  // const arr2 = [5, 9, 3, 5, 7];
  // const compare = (arr1, arr2) => {
  //   const final = [];
  //   arr1.forEach((e1) =>
  //     arr2.forEach((e2) => {
  //       if (e1 === e2) {
  //         final.push(e1);
  //       }
  //     })
  //   );
  //   return final;
  // };
  // console.log(compare(arr1, arr2));

  useEffect(() => {
    if (!token) navigate("/");
    dispatch(fetchFavourites) && dispatch(fetchExercises);
  }, [token, navigate, dispatch]);

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
        password !== "" ? password : null
      )
    );
    setName("");
    setEmail("");
    setAge("");
    setGender("");
    setPassword("");
  };

  // Cloudinary part  image,
  const [image, setImage] = useState("");
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
    setImage(file.url); //put the url in local state, next step you can send it to the backend
    dispatch(updateUserPhoto(user?.id, image));
  };
  // Cloudinary part

  return (
    <div className="profilePage">
      <div className="photo">
        <Img
          alt="userphoto"
          src={
            user?.photo
              ? user?.photo
              : image
              ? image
              : "https://i0.wp.com/i.pinimg.com/474x/58/f2/de/58f2de50bad0fb24c24d4757841d57c4.jpg"
          }
        />
        <ThemeProvider theme={theme}>
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
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
            id="outlined-textarea"
            label="Name"
            placeholder="Name"
            size="small"
            multiline
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <InputLabel>Email: {user?.email}</InputLabel>
          <TextField
            id="outlined-textarea"
            label="Email"
            placeholder="Email"
            multiline
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
          <InputLabel>Age: {user?.age}</InputLabel>

          <TextField
            id="outlined-textarea"
            label="Age"
            placeholder="Age"
            multiline
            size="small"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          ></TextField>
          <InputLabel>Gender: {user?.gender}</InputLabel>
          <TextField
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
          <InputLabel>Password</InputLabel>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
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
            />
            <ThemeProvider theme={theme}>
              <Button
                onClick={submit}
                className="custom-link"
                color="secondary"
              >
                Save changes
              </Button>
            </ThemeProvider>
          </FormControl>
        </div>
        <div>
          <h3>Favourites</h3>
        </div>

        {!favourites.length
          ? "You didn't like any exercise"
          : favourites.map((ex) => (
              // <div className="exerciseInfo">
              //   <CardContent>
              //     <ThemeProvider theme={theme}>
              //       <Typography variant="h6" color="secondary">
              //         {ex.name}
              //       </Typography>
              //     </ThemeProvider>
              //   </CardContent>
              //   <CardMedia
              //     image={ex.gifUrl}
              //     alt="name"
              //     sx={{
              //       maxHeight: "360px",
              //       maxWidth: "360px",
              //       minHeight: "360px",
              //       minWidth: "360px",
              //       height: "100%",
              //       width: "100%",
              //     }}
              //   ></CardMedia>
              // </div>
              <p>{ex}</p>
            ))}

        <div>
          <h3>Statistics</h3>
        </div>
      </div>
    </div>
  );
}
