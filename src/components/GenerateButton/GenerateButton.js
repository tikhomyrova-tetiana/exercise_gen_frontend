import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import React from "react";

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

export default function GenerateButton({ click }) {
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary" variant="outlined" onClick={click}>
        Generate
      </Button>
    </ThemeProvider>
  );
}
