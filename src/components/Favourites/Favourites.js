import React from "react";
import { CardContent, CardMedia, createTheme, Typography } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import "./styles.css";

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

export default function Favourites(props) {
  const { name, bodyPart, gif, btn } = props;
  return (
    <div className="exerciseInfo">
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography variant="p" color="secondary">
            {name.toUpperCase()}
          </Typography>
          <Typography variant="body1" color="secondary" align="center">
            {bodyPart}
          </Typography>
        </ThemeProvider>
      </CardContent>
      <CardMedia
        image={gif}
        alt="name"
        sx={{
          maxHeight: "360px",
          maxWidth: "360px",
          minHeight: "250px",
          minWidth: "250px",
          height: "100%",
          width: "100%",
        }}
      ></CardMedia>
      {btn}
    </div>
  );
}
