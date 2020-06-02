import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import ErrorIcon from "@material-ui/icons/Error";
import CancelIcon from "@material-ui/icons/Cancel";

class SelectedFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: props.file,
      isModified: props.isModified,
      isDeleted: false,
      isUploading: false,
      isUploadCompleted: false,
    };
    //console.log(props);
  }

  handleClick = (index) => {
    this.props.handleClick(index);
  };

  // getProgressBar = () => {
  //   if (this.props.isUploading && !this.props.isUploadCompleted) {
  //     return (
  //       <div className={classes.progressBar}>
  //         <LinearProgress />
  //       </div>
  //     );
  //   }
  // };

  getDate = () => {
    if (this.props.file.lastModifiedDate === undefined) {
      return;
    }
    let date = this.props.file.lastModifiedDate;
    return (
      <div className={classes.date}>
        <div>{date.toLocaleDateString()} </div>
        <div>{date.toLocaleTimeString()}</div>
      </div>
    );
  };

  getUploadCompleteIndicator = () => {
    if (this.props.isDeleted) {
      return <CancelIcon color="secondary" />;
    }
    if (this.props.isUploadFailed) {
      return <ErrorIcon color="primary" />;
    }
    if (this.props.isUploadCompleted) {
      return <CheckCircleIcon color="primary" />;
    }
    if (this.props.isUploading) {
      return (
        <div style={styles.root}>
          <CircularProgress color="primary" />
        </div>
      );
    }

    let color = "";
    if (this.props.isModified) {
      color = "primary";
    } else {
      color = "disabled";
    }
    return <CloudUploadIcon color={color} />;
  };

  getName = () => {
    if (this.props.file === undefined) {
      console.log(this.props);
      return "this.props.file.localName";
    }
    return this.props.file.name;
  };

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.subContainer}>
          <span>
            <InsertDriveFileIcon color="primary" />
            <span className={classes.fileName}>{this.getName()}</span>
          </span>
          <span>{this.getDate()}</span>
          <span>{this.getUploadCompleteIndicator()}</span>
        </div>
      </div>
    );
  }
}

export default SelectedFile;

const classes = {
  container: "my-3 p-2 bg-light rounded",
  subContainer: " align-items-center d-flex justify-content-between",
  fileNameContainer: "",
  fileName: "pl-1",
  progressBar: "mt-2",
  date: "text-center small",
};

//TODO: convert this into makeStyles and apply style to progress bar
const styles = {
  root: {
    display: "flex",
  },
  spinner: {
    height: "25px !important",
    width: "25px !important",
  },
};
