import React from "react";
import "typeface-roboto";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import InfoIcon from "@material-ui/icons/Info";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";

export default class Header extends React.Component {
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

          <span className={classes.links}>{this.renderLinks()}</span>
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
  { to: "/files/list", icon: <ListAltIcon /> },
  { to: "/files/upload", icon: <CloudUploadIcon /> },
  { to: "/about", icon: <InfoIcon /> },
  { to: "/login", icon: <AccountCircleIcon /> },
];
