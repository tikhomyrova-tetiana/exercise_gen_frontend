import { AppBar, Toolbar, Typography, Button, Link } from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#a2cf6e",
      main: "#80cbc4",
      dark: "#618833",
      contrastText: "#fff",
    },
  },
});

function Header() {
  return (
    <AppBar position="static" theme={theme}>
      <Toolbar>
        <SportsGymnasticsIcon />
        <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            color="inherit"
            underline="none"
            variant="h5"
            hover="none"
          >
            {" "}
            Fitness dice{" "}
          </Link>
        </Typography>
        <Button color="inherit">
          <Link href="/" color="inherit" underline="none" theme={theme}>
            Home
          </Link>
        </Button>
        <Button color="inherit" sx={{ flexGrow: 1 }}>
          <Link href="/other" color="inherit" underline="none">
            Learn more
          </Link>
        </Button>
        <Button color="inherit">
          <DarkModeIcon />
        </Button>
        <Button color="inherit">
          <Link href="/login" color="inherit" underline="none">
            Login
          </Link>
        </Button>
        <Button color="inherit">
          <Link href="/signup" color="inherit" underline="none">
            Sign up
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
