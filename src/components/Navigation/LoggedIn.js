import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/slice";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";
import { Button, Link, createTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const theme = createTheme({
  palette: {
    primary: {
      light: "#b2dfdb",
      main: "#80cbc4",
      dark: "#00695c",
      contrastText: "#fff",
    },
  },
});

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <Button color="inherit" onClick={() => dispatch(logOut())}>
        <Link href="/login" color="inherit" underline="none" theme={theme}>
          Logout
        </Link>
      </Button>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user?.name}</Nav.Item>
      <Avatar alt="photo" src={user?.photo} />
    </>
  );
}
