import React from "react";
import { Button } from "@mui/material";
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

export default function CheckButton({ click, text, icon }) {
  return (
    <div>
      {" "}
      <ThemeProvider theme={theme}>
        <Button color="primary" onClick={click}>
          {text}
          {icon}
        </Button>
      </ThemeProvider>
    </div>
  );
}
