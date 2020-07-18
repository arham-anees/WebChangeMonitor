import React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import { getVersionsList } from "../../../RequestToServer/Versions";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import CheckIcon from "@material-ui/icons/Check";

class VersionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      versions: [],
    };
  }
  //#region version item

  statusIcon = (statusId) => {
    if (statusId === 1) {
      return (
        <ListItemIcon>
          <CheckIcon edge="start" tabIndex={-1} />
        </ListItemIcon>
      );
    }
    if (statusId === 2) {
      return (
        <ListItemIcon>
          <CloudDoneIcon edge="start" tabIndex={-1} color="primary" />
        </ListItemIcon>
      );
    }
    if (statusId === 3) {
      return (
        <ListItemIcon>
          <SettingsBackupRestoreIcon edge="start" tabIndex={-1} />
        </ListItemIcon>
      );
    }
  };

  items = () => {
    return (
      <div>
        <List>
          {this.state.versions !== undefined &&
          this.state.versions !== null &&
          this.state.versions.length !== 0 ? (
            this.state.versions.map((version) => {
              const labelId = `checkbox-list-label-${version.id}`;

              return (
                <React.Fragment key={version.id}>
                  <ListItem
                    key={version.id}
                    button
                    onClick={() => {
                      this.props.history.push(`/versions/${version.id}`);
                    }}
                    className="d-flex justify-content-between row"
                  >
                    <span className="d-flex flex-row col-5">
                      <ListItemIcon>
                        <FlipCameraAndroidIcon edge="start" tabIndex={-1} />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${version.version}`}
                      />
                    </span>
                    <span className="d-flex flex-row col-5">
                      <ListItemIcon>
                        <ScheduleIcon edge="start" tabIndex={-1} />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${version.createdOn}`}
                      />
                    </span>
                    <span className="d-flex flex-row col-2">
                      {this.statusIcon(version.status)}
                    </span>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })
          ) : (
            <h4>No Version Found</h4>
          )}
        </List>
      </div>
    );
  };
  //#endregion

  componentDidMount() {
    getVersionsList()
      .then((res) => this.setState({ versions: res }))
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return <div>{this.items()}</div>;
  }
}

export default VersionsList;
