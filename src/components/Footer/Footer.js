import * as React from "react";
import "./styles.css";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" gutterBottom>
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Exercise gen
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <div className="footer">
      <Copyright />
      <div className="icons">
        <InstagramIcon />
        <TwitterIcon />
        <GoogleIcon />
      </div>
    </div>
  );
}
