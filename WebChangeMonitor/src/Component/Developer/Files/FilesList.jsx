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
        console.log("Files:", res);
        this.setState({ files: res.versionFiles });
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
          <React.Fragment key={file.file.encodedName + file.file.localPath}>
            {this.listItem(file)}
            <Divider />
          </React.Fragment>
        );
      });
    }
  };

  //design single file of list
  listItem = (props) => {
    console.log("props", props);
    return (
      <ListItem
        button
        onClick={(e) => this.navigateToFile(props.file.encodedName)}
      >
        <div className={classes.listItem}>
          <span className={("d-inline-block", classes.contentVerticalCenter)}>
            <span>
              <InsertDriveFileIcon color="primary" />
            </span>
            <span className="d-inline-block">
              <span>{props.file.localName}</span>
              <div style={styles.fileLocalPath}>
                {props.file.localRelativePath}
              </div>
            </span>
          </span>
          <span className={"d-inline-block"}>
            <div>{props.file.lastLocalModifiedDate}</div>
            <div style={styles.fileLocalPath}>
              {props.file.lastLocalModifiedTime}
            </div>
          </span>
          <span className="d-inline-block">{props.fileStatus.name}</span>
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
