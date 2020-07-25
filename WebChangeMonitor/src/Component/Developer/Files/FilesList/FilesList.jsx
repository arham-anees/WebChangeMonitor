import React, { Component } from "react";

import Divider from "@material-ui/core/Divider";
import { getVersion } from "../../../../RequestToServer/Versions";
import FilesListItem from "./FilesListItem";
import AcceptanceStatus from "./AcceptanceStatus";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //this.handleLoad,
      error: 0,
      versionId: 0,
      versionStatus: 0,
    };
  }

  renderStatus = () => {
    if (this.state.versionId > 0) {
      return <AcceptanceStatus versionId={this.state.versionId} />;
    }
  };

  render() {
    return (
      <div className={classes.container}>
        {this.renderStatus()}
        {this.errorView()}
        <div className={classes.listItemsContainer}>
          <div className={classes.filesListTitle}>Files list</div>
          {this.listItems()}
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    //const history = useHistory();

    console.log("history", this.props.history);
    let user = this.props.user;
    if (user === null) {
      this.props.history.push("/login");
    }

    const versionId = this.props.match.params.versionId;
    console.log("param", versionId);
    if (parseInt(versionId) < 1) {
      this.props.history.push("/");
    } else {
      getVersion(versionId) //to call this method only once
        .then((res) => {
          console.log(res);
          this.setState({
            files: res.versionFiles,
            role: user.role,
            versionId: res.id,
          });
        })
        .catch((err) => {
          this.setState({ error: 1 });
        });
    }
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
}

export default FilesList;

const classes = {
  container: "container",
  listItem: "d-flex justify-content-between w-100 align-items-center",
  contentVerticalCenter: "d-flex align-items-center",
  error: "alert alert-danger font-lg",
  listItemsContainer: "mt-4 rounded border border-secondary",
  filesListTitle: "font-weight-bold font-italic font-xl text-center my-3",
};
