import React from "react";
// import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
// import MailIcon from "@material-ui/icons/Mail";
// import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";
import { Fade } from "@material-ui/core";
import "./NavMenu.scss";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";

const classes = {
  desktop: "d-none d-md-inline-block desktop",
  mobile: "d-inline-block d-md-none mobile",
  link: "color-inherit link color-inherited",
  margin2: "m-2",
};

const style = {
  link: {},
};

type NavMenuProps = {
  IsLoggedIn: boolean;
};
export default function PrimarySearchAppBar(props: NavMenuProps) {
  const renderLogin = () => {
    return (
      <IconButton className={classes.link}>
        <a href="/Auth/">
          <AccountCircle className="m-2" />
          <span className={classes.mobile}>Login</span>
        </a>
      </IconButton>
    );
  };
  const renderUpload = () => {
    return (
      <IconButton>
        <CloudUploadIcon />
        <span className={classes.mobile}>Upload Files</span>
      </IconButton>
    );
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMobileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = () => {
    return (
      <React.Fragment>
        <div className={classes.desktop}>
          {renderUpload()}
          {renderLogin()}
        </div>
        <div className={classes.mobile}>
          <div>
            <IconButton
              aria-controls="fade-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuClick}
            >
              <MenuOutlinedIcon style={{ color: "white" }} />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
              className="color-black"
            >
              <MenuItem>{renderUpload()}</MenuItem>
              <MenuItem>{renderLogin()}</MenuItem>
            </Menu>
          </div>
        </div>
      </React.Fragment>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="ml-1">
          Web Change Monitor
        </Typography>
        <div className="ml-auto">{renderMenu()}</div>
      </Toolbar>
    </AppBar>
  );
}
