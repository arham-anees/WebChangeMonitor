import React, { Component } from "react";

import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import * as FileApi from "../../../RequestToServer/Files";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //this.handleLoad,
    };
  }
  render() {
    return <div className={classes.container}>{this.listItems()}</div>;
  }

  componentDidMount = async () => {
    await FileApi.getAllFiles() //to call this method only once
      .then((res) => {
        console.log("updated");
        this.setState({ files: res });
      });
    console.log("done");
  };

  //design list of files
  listItems = () => {
    let files = [...this.state.files]; //TODO sort files to show in directory structure

    if (files.length > 0) {
      return files.map((file) => {
        //console.log(file);
        return (
          <React.Fragment key={file.encodedName + file.localPath}>
            {this.listItem(file)}
            <Divider />
          </React.Fragment>
        );
      });
    }
  };

  //design single file of list
  listItem = (props) => {
    return (
      <ListItem button onClick={(e) => this.navigateToFile(props.encodedName)}>
        <div className={classes.listItem}>
          <span className={("d-inline-block", classes.contentVerticalCenter)}>
            <span>
              <InsertDriveFileIcon color="primary" />
            </span>
            <span className="d-inline-block">
              <span>{props.name}</span>
              <div style={styles.fileLocalPath}>{props.localPath}</div>
            </span>
          </span>
          <span className={"d-inline-block"}>
            <div>{props.lastLocalModifiedDate}</div>
            <div style={styles.fileLocalPath}>
              {props.lastLocalModifiedTime}
            </div>
          </span>
          <span className="d-inline-block">{"user"}</span>
        </div>
      </ListItem>
    );
  };

  //navigate to display content of files
  navigateToFile = (encodedName) => {
    console.log(encodedName);
    window.location = "/files/content?" + encodedName;
  };
}

export default FilesList;

const classes = {
  container: "container",
  listItem: "d-flex justify-content-between w-100 align-items-center",
  contentVerticalCenter: "d-flex align-items-center",
};
const styles = {
  fileName: {},
  fileLocalPath: {
    fontSize: 10,
  },
};
