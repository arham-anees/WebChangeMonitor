import React from "react";
import "typeface-roboto";
import { Link } from "react-router-dom";
import InfoIcon from "@material-ui/icons/Info";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import Auth from "./Auth";
import { BsFillPersonPlusFill, BsFillPeopleFill } from "react-icons/bs";

class Header extends React.Component {
  renderAuth = () => {};
  renderLinks = () => {
    return links.map((link) => {
      return this.props.user !== null && this.props.user !== undefined ? (
        link.role !== undefined ? (
          link.roles.includes(this.props.user.role) ? (
            <Link style={styles.link} to={link.to} key={link.to}>
              {link.icon}
            </Link>
          ) : null
        ) : (
          <Link style={styles.link} to={link.to} key={link.to}>
            {link.icon}
          </Link>
        )
      ) : null;
    });
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
            <Link style={styles.link} to="/about">
              <InfoIcon />
            </Link>
            <Auth
              refresh={this.props.ChangeAuthStatus}
              user={this.props.user}
            />
          </span>
        </div>
      </div>
    );
  }
}

export default Header;

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
  { to: "/versions", icon: <ListAltIcon />, auth: true, roles: [1, 2, 3, 4] },
  { to: "/files/upload", icon: <CloudUploadIcon />, auth: true, roles: [3, 4] },
  {
    to: "/RegisterResource",
    icon: <BsFillPersonPlusFill />,
    auth: true,
    roles: [1, 2],
  },
  {
    to: "/Domain/Users",
    icon: <BsFillPeopleFill />,
    auth: true,
    roles: [1, 2],
  },
];
