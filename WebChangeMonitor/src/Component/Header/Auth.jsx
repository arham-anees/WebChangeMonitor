import React from "react";
import { Link } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { getUser, setUser } from "../../Helper/LocalStorage";

function Auth(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => (
    <React.Fragment>
      <Link
        style={styles.link}
        key="//"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <AccountCircleIcon />
      </Link>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            setUser();
            props.refresh(false);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );

  const login = () => (
    <Link style={styles.link} to="/login">
      <ExitToAppIcon />
    </Link>
  );

  const isLoggedIn = props.user !== null && props.user !== undefined;
  console.log("isLoggedIn", isLoggedIn);
  if (isLoggedIn) {
    return <React.Fragment>{logout()}</React.Fragment>;
  } else {
    return <React.Fragment>{login()}</React.Fragment>;
  }
}
export default Auth;
const styles = {
  container: { background: "#0017a8", color: "white" },
  header: { height: "10vh", width: "100%" },
  link: { color: "white", marginLeft: "10px" },
};
