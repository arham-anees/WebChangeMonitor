import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import * as FileApi from "../../../../RequestToServer/Files";
import { getCookie } from "../../../../Helper/Cookie";
import FilesListItem from "./FilesListItem";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //this.handleLoad,
    };
  }

  handleAcceptClick = (event) => {
    console.log("changes accepted");
  };
  handleRejectClick = (event) => {
    console.log("changes Rejected");
  };

  renderButtons = () => {
    var jfx = (
      <div className="my-2">
        <input
          type="button"
          className="btn btn-sm btn-danger ml-auto"
          value="Reject Changes"
          onClick={this.handleRejectClick}
        />
        <input
          type="button"
          className="btn btn-sm btn-success ml-2"
          value="Accept Changes"
          onClick={this.handleAcceptClick}
        />
      </div>
    );
    if (this.state.role === "1") {
      jfx = (
        <React.Fragment>
          <span className="alert alert-success">this is CEO of this web</span>
          {jfx}

          <input
            type="button"
            className="btn btn-sm btn-warning ml-2"
            value="Upload Changes"
            onClick={this.handleAcceptClick}
          />
        </React.Fragment>
      );
    }

    return jfx;
  };
  render() {
    return (
      <div className={classes.container}>
        {this.renderButtons()}
        {this.listItems()}
      </div>
    );
  }

  componentDidMount = async () => {
    await FileApi.getAllFiles() //to call this method only once
      .then((res) => {
        console.log("Files:", res);
        this.setState({ files: res.versionFiles, role: getCookie("role") });
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
          <React.Fragment
            key={(file.file.encodedName + file.file.localPath).toString()}
          >
            <FilesListItem
              file={file.file}
              fileStatus={file.fileStatus}
              fileStatusId={file.fileStatusId}
            />
            <Divider />
          </React.Fragment>
        );
      });
    }
  };

  //design single file of list
}

export default FilesList;

const classes = {
  container: "container",
  listItem: "d-flex justify-content-between w-100 align-items-center",
  contentVerticalCenter: "d-flex align-items-center",
};
