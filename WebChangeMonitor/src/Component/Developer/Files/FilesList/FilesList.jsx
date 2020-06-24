import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import * as FileApi from "../../../../RequestToServer/Files";
import { getCookie } from "../../../../Helper/Cookie";
import FilesListItem from "./FilesListItem";
import AcceptanceStatus from "./AcceptanceStatus";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //this.handleLoad,
      error: 0,
      versionId: 0,
    };
  }

  render() {
    return (
      <div className={classes.container}>
        <AcceptanceStatus versionId={this.state.versionId} />
        {this.errorView()}
        <div className={classes.listItemsContainer}>
          <div className="font-weight-bold font-italic font-xl text-center my-3">
            Files list
          </div>
          {this.listItems()}
        </div>
      </div>
    );
  }

  componentDidMount = async () => {
    let role = getCookie("role");
    if (role === null) {
      window.location.href = "/login";
    }
    await FileApi.getAllFiles() //to call this method only once
      .then((res) => {
        console.log("Files:", res.data);
        this.setState({
          files: res.data.versionFiles,
          role: role,
          versionId: res.data.id,
        });
      })
      .catch((err) => {
        console.log("Error", err);
        this.setState({ error: 1 });
      });
  };

  errorView = () => {
    if (this.state.error === 0) {
      return <div></div>;
    }
    return (
      <div className="mt-4">
        <span className={classes.error}>
          An Error occurred while getting files from server
        </span>
      </div>
    );
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
  error: "alert alert-danger font-lg",
  listItemsContainer: "mt-4 rounded border border-secondary",
};
