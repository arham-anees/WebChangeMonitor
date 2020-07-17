import React from "react";
import "typeface-roboto";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import { getCookie } from "../../Helper/Cookie";
import Auth from "./Auth";

export default class Header extends React.Component {
  renderAuth = () => {
    if (getCookie("token") === "") {
    } else {
    }
  };
  renderLinks = () => {
    return links.map((link) => (
      <Link style={styles.link} to={link.to} key={link.to}>
        {link.icon}
      </Link>
    ));
  };

  render() {
    return (
      <div className={classes.container} style={styles.container}>
        <div style={styles.header} className={classes.header}>
          <Link style={styles.link} className={classes.brand} to="/">
            <Typography>Web Change Monitor</Typography>
          </Link>

          <span className={classes.links}>
            {this.renderLinks()}
            <Auth refresh={this.props.ChangeAuthStatus} />
          </span>
        </div>
      </div>
    );
  }
}
const classes = {
  links: "ml-auto my-auto",
  header: "d-flex justify-content-center",
  container: "px-5",
  brand: "my-auto text-decoration-none",
};
const styles = {
  container: { background: "#0017a8", color: "white" },
  header: { height: "10vh", width: "100%" },
  link: { color: "white", marginLeft: "10px" },
};
const links = [
  { to: "/versions", icon: <ListAltIcon /> },
  { to: "/files/upload", icon: <CloudUploadIcon /> },
  { to: "/about", icon: <InfoIcon /> },
];
