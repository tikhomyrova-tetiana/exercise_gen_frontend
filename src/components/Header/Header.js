import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <SportsGymnasticsIcon />
        <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
          Fitness dice{" "}
        </Typography>
        <DarkModeIcon />
        <Button color="inherit">Login</Button>
        <Button color="inherit">Sign up</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
