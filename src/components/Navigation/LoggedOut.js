import React from "react";
import { Button, Link, createTheme } from "@mui/material";

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

export default function LoggedOut() {
  return (
    <>
      <Button color="inherit">
        <Link href="/login" color="inherit" underline="none" theme={theme}>
          Login
        </Link>
      </Button>
      <Button color="inherit">
        <Link href="/signup" color="inherit" underline="none">
          Sign up
        </Link>
      </Button>
    </>
  );
}
