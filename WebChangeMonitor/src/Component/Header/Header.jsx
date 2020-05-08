import React from "react";
import "typeface-roboto";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InfoIcon from "@material-ui/icons/Info";
//import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Typography from "@material-ui/core/Typography";

export default class Header extends React.Component {
  render() {
    return (
      <div style={{ background: "#0017a8", height: 60, width: "100%" }}>
        <Link style={styles.brand} to="/">
          <Typography>Web Change Monitor</Typography>
        </Link>

        <Link style={styles.account} to="/Login">
          <AccountCircleIcon />
        </Link>

        <Link style={styles.about} to="/About">
          <InfoIcon />
        </Link>
        {/* <Link  style={{color :'white',right:80,position:'absolute',top:20 }} to="/About"> <CloudUploadIcon /></Link>
         */}
      </div>
    );
  }
}
const styles = {
  brand: {
    color: "white",
    left: 50,
    position: "absolute",
    fontSize: 24,
    top: 20,
    textDecoration: "none",
    margin: "auto",
  },
  account: { color: "white", right: 25, position: "absolute", top: 20 },
  about: { color: "white", right: 80, position: "absolute", top: 20 },
};
