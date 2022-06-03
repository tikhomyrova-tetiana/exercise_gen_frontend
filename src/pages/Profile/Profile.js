import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/selectors";
import { selectToken } from "../../store/user/selectors";
import { useNavigate } from "react-router";
import "./styles.css";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  TextField,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function Profile() {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

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
  const genders = [{ value: "female" }, { value: "male" }, { value: "other" }];
  const [gender, setGender] = useState("");

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="profilePage">
      <div className="photo">
        <Img alt="userphoto" src={user?.photo} />
        <Button>Upload</Button>
      </div>
      <div>
        <div className="info">
          <h3>Personal information</h3>
          <InputLabel>
            Your Name {user?.name}
            <Link>change</Link>
          </InputLabel>
          <TextField
            id="outlined-textarea"
            label="Name"
            placeholder="Name"
            multiline
            //     value={value}
            //   onChange={handleChange}
          ></TextField>
          <InputLabel>
            Email {user?.email}
            <Link>change</Link>
          </InputLabel>
          <TextField
            id="outlined-textarea"
            label="Email"
            placeholder="Email"
            multiline
            //     value={value}
            //   onChange={handleChange}
          ></TextField>
          <InputLabel>
            Age {user?.age}
            <Link>change</Link>
          </InputLabel>
          <TextField
            id="outlined-textarea"
            label="Date of birth"
            placeholder="Date of birth"
            multiline
            //     value={value}
            //   onChange={handleChange}
          ></TextField>
          <InputLabel>
            Gender {user?.gender}
            <Link>change</Link>
          </InputLabel>
          <TextField
            id="outlined-select-gender"
            select
            value={gender}
            onChange={handleChangeGender}
          >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <InputLabel>
            Password <Link>change</Link>
          </InputLabel>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
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
