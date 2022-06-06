import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  createTheme,
} from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
import LoggedIn from "../../components/Navigation/LoggedIn";
import LoggedOut from "../../components/Navigation/LoggedOut";

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

function Header() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <AppBar position="static" theme={theme}>
      <Toolbar className="header">
        <div>
          <SportsGymnasticsIcon viewBox="0 0 24 30" fontSize="large" />
          <Typography variant="h5" component="span">
            <Link
              href="/"
              color="inherit"
              underline="none"
              variant="h5"
              hover="none"
              className="custom-link"
            >
              {" "}
              Exercise Gen{" "}
            </Link>
          </Typography>
        </div>
        <div>
          <Button color="inherit">
            <Link
              href="/"
              color="inherit"
              underline="none"
              theme={theme}
              className="custom-link"
            >
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              href="/other"
              color="inherit"
              underline="none"
              className="custom-link"
            >
              Learn more
            </Link>
          </Button>
        </div>
        <div>
          <Button color="inherit">
            <DarkModeIcon />
          </Button>
          {loginLogoutControls}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
