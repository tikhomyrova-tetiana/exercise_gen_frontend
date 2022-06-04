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
      <Toolbar>
        <SportsGymnasticsIcon mr="20px" />
        <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
          <Link
            href="/"
            color="inherit"
            underline="none"
            variant="h5"
            hover="none"
          >
            {" "}
            Exercise Gen{" "}
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
        {loginLogoutControls}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
