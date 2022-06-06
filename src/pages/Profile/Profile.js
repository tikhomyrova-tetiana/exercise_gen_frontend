import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
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
  // AlertTitle,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider } from "@emotion/react";
import { updateUser } from "../../store/user/actions";

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const genders = [{ value: "female" }, { value: "male" }, { value: "other" }];

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  const [values, setValues] = useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

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
        gender !== "" ? gender : user?.gender
      )
    );
    setName("");
    setEmail("");
    setAge("");
    setGender("");
  };

  // Cloudinary part  image, if we already have one??
  // const [image, setImage] = useState("");
  // фото может не быть?

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    //first parameter is always upload_preset, second is the name of the preset
    data.append("upload_preset", "lpsty2kc");

    //post request to Cloudinary, remember to change to your own link
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/delvoxvyc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    console.log("file", file); //check if you are getting the url back
    // setImage(file.url); //put the url in local state, next step you can send it to the backend
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
              : "https://i0.wp.com/i.pinimg.com/474x/58/f2/de/58f2de50bad0fb24c24d4757841d57c4.jpg"
          }
        />
        {/* {user?.photo ? (
          <AlertTitle style={{ fontSize: 20 }}>
            Succesfully uploaded!
          </AlertTitle>
        ) : (
          ""
        )} */}
        <ThemeProvider theme={theme}>
          <Button
            onClick={uploadImage}
            className="custom-link"
            color="secondary"
          >
            Upload
          </Button>
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
            onChange={(e) => setAge(e.target.value)}
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
              value={values.password}
              size="small"
              onChange={handleChange("password")}
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
        <div>
          <h3>Statistics</h3>
        </div>
      </div>
    </div>
  );
}
