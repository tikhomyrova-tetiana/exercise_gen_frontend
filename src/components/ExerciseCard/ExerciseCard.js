import { ThemeProvider } from "@emotion/react";
import { CardContent, CardMedia, Grid, Typography } from "@mui/material";
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

export default function ExerciseCard(props) {
  const { name, bodyPart, image, reps } = props;
  return (
    <>
      <CardContent>
        <ThemeProvider theme={theme}>
          <Typography variant="body1" color="secondary">
            {name.toUpperCase()}
          </Typography>
          <Typography variant="body1" color="secondary" align="center">
            {bodyPart}
          </Typography>
        </ThemeProvider>
      </CardContent>
      <CardMedia
        image={image}
        alt={name}
        sx={{
          maxHeight: "360px",
          maxWidth: "360px",
          minHeight: "250px",
          minWidth: "250px",
          height: "100%",
          width: "100%",
        }}
      ></CardMedia>
      <Grid item sx={{ maxWidth: "370px" }}>
        <ThemeProvider theme={theme}>
          <Typography variant="h6" color="secondary">
            <CardContent>{reps}</CardContent>
          </Typography>
        </ThemeProvider>
      </Grid>
    </>
  );
}
