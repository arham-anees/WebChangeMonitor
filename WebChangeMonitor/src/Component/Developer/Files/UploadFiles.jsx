import * as React from "react";
import SelectedFile from "./SelectedFile";
import * as Utils from "./UploadFilesUtils";
import * as FileApi from "../../../RequestToServer/Files";

import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToBeSent: [],
      filesFromServer: [],
      modifiedFiles: [],
      deletedFiles: [],
      selectedFiles: [],
      filesCheck: false,
      uploadFiles: false,
      uploading: false,
      disableUploadBtn: true,
      isProcessing: false,
      sortBy: "none",
    };
    this.child = React.createRef();
  }

  onFileSelect = async (event) => {
    event.preventDefault();
    if (this.state.uploading) {
      alert(
        "upload is in progress. please wait and donot close browser or tab"
      );
      return;
    }

    this.setState({ uploadFiles: true, uploading: true });
    //var apiBaseUrl = ApiUrls.FileList; //axios.defaults.baseURL + "user/upload";
    if (this.state.filesToBeSent.length > 0) {
      //upload modified files
      await this.uploadModifiedFiles();
    }
  };

  //this method handles change in file selection
  handleChange = async (e) => {
    const files = []; ///...this.state.filesToBeSent]; //get files from current state
    files.push([...e.target.files]); //push new files
    await this.setState({
      //update state
      filesToBeSent: files,
    });

    this.setState({ isProcessing: true });
    let selectedFiles = [];
    await files[0].forEach((element, index) => {
      let obj = {
        file: element,
        number: index,
        isModified: false,
        isDeleted: false,
        isUploaded: false,
        isUploading: false,
        isUploadFailed: false,
      };

      selectedFiles.push(obj);
    });
    if (selectedFiles.length > 0) {
      await this.setState({
        selectedFiles: selectedFiles,
      });
      await this.getWebsiteFiles();
      //check modified files
      await this.checkModifiedFiles().then((res) => {
        this.setState({ selectedFiles: res });
      });
      await this.checkDeletedFiles();
      //console.log("work completed");
      this.setState({ disableUploadBtn: false, isProcessing: false });
    }
  };

  getWebsiteFiles = async () => {
    console.log("getting files list from server");
    await FileApi.getWebsiteFiles()
      .then((response) => {
        this.setState({ filesFromServer: response });
        console.log("files list got successfully");
      })
      .catch((error) => console.log(error));
  };

  checkDeletedFiles = () => {
    const s = this.state;
    Utils.getDeletedFiles([...s.selectedFiles], s.filesFromServer, [
      ...s.selectedFiles,
    ]).then((res) =>
      this.setState({
        deletedFiles: res,
        selectedFiles: this.state.selectedFiles.concat(res),
      })
    );
  };

  checkModifiedFiles = () => {
    return new Promise((resolve, reject) => {
      console.log("checking files for modification");
      let s = this.state;

      Utils.getModifiedFiles([...s.selectedFiles], s.filesFromServer).then(
        (res) => {
          let modifiedFiles = res.filter((item) => {
            return item.isModified;
          });
          console.log("checking files for modification completed");
          this.setState({ modifiedFiles: modifiedFiles });
          resolve(res);
        }
      );
    });
  };

  uploadModifiedFiles = () => {
    let filesArray = [...this.state.modifiedFiles];
    filesArray.forEach((file) => {
      console.log("uploading file, please wait");
      //update isUploading
      const selectedFiles = [...this.state.selectedFiles];
      const index = selectedFiles.findIndex((x) => x.file === file.file);
      //console.log("local index:", fileIndex);
      let SelectedObj = selectedFiles[index];
      SelectedObj.isUploading = true;
      this.setState({ selectedFiles: selectedFiles });
      ///console.log("SelectedObject:", { ...SelectedObj }, { ...file });
      Utils.uploadFile(file.file)
        .then((result) => {
          if (result === 201) {
            SelectedObj.isUploaded = true;
          } else {
            SelectedObj.isUploadFailed = true;
          }
          SelectedObj.isUploading = false;
          //console.log("SelectedObject:", { ...SelectedObj });
        })
        .catch((error) => {
          SelectedObj.isUploadFailed = true;
        })
        .finally(() => {
          this.setState({ selectedFiles: selectedFiles });
        });
    });
  };

  //this handles click of delete button on selectedFile to delete item from state
  handleDeleteClick = (index) => {
    //console.log(index);
    let files = [...this.state.filesToBeSent]; //get files from state
    console.log(files[0][index]); //display file to be deleted
    files[0].splice(index, 1); //remove item
    this.setState({ filesToBeSent: files }); //update state
  };

  //this method renders selected files when they are changed
  renderSelectedFiles = () => {
    let files = [...this.state.selectedFiles]; //get list of files

    //TODO: sort data here and then apply to files list
    //underscoreJs can help
    if (this.state.sortBy === "name") {
      console.log(files.sort((a, b) => a.file.name - b.file.name));
    } else if (this.state.sortBy === "lastModifiedDate") {
    }
    if (files[0] != null) {
      let array = []; //this array stores selectedFile as list for display
      files.forEach((file) => {
        array.push(
          <SelectedFile
            file={file.file}
            id={file.number}
            key={file.number}
            isModified={file.isModified}
            isDeleted={file.isDeleted}
            isUploadCompleted={file.isUploaded}
            isUploading={file.isUploading}
            isUploadFailed={file.isUploadFailed}
            handleClick={this.handleDeleteClick.bind(this)}
          />
        );
      });
      return <div>{array}</div>; //display this as array
    }
  };

  handleSelectedIndexChanged = (event) => {
    const sortBy = event.target.value;
    console.log(sortBy);
    this.setState({ sortBy: sortBy });
  };
  renderUnderProgressMessage = () => {
    return <div>renderUnderProgressMessage</div>;
  };
  renderDropDown = () => {
    return (
      <div className={classes.dropDownContainer}>
        <div className="row">
          <div className="col-2">Sort By</div>
          <div className="col-10">
            <select
              name="SortBy"
              id="sortBy"
              className={classes.dropDown}
              onChange={this.handleSelectedIndexChanged}
              disabled={this.state.disableUploadBtn}
            >
              <option value="none">None</option>
              <option value="name">Name</option>
              <option value="path">Location</option>
              <option value="lastModfiedDate">Last Modified Date</option>
            </select>
          </div>
        </div>
      </div>
    );
  };
  renderUploadBtn = () => {
    return (
      <Fab
        variant="extended"
        style={styles.floatingButton}
        disabled={this.state.disableUploadBtn}
        onClick={this.onFileSelect}
      >
        <CloudUploadIcon className="m-1" />
        Upload
      </Fab>
    );
  };
  renderFileInput = () => {
    return (
      <React.Fragment>
        <input
          webkitdirectory=""
          multiple
          className="d-none"
          type="file"
          onChange={this.handleChange}
        />
        <button
          className={classes.select}
          onClick={() => {
            let element = document.getElementsByClassName("d-none")[0];
            element.click();
          }}
        >
          Select Folder
        </button>
      </React.Fragment>
    );
  };
  renderView = () => {
    if (this.state.isProcessing) {
      return (
        <React.Fragment>
          {this.renderUnderProgressMessage()}
          {this.renderSelectedFiles()}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {this.renderDropDown()}
        {this.renderSelectedFiles()}
        {this.renderUploadBtn()}
      </React.Fragment>
    );
  };
  render() {
    return (
      <div className={classes.container}>
        {this.renderFileInput()}
        {this.renderView()}
      </div>
    );
  }
}
export default UploadFiles;

const classes = {
  container: "container mt-3",
  select: "btn btn-block btn-primary",
  upload: "btn btn-block btn-success",
  dropDownContainer: "my-2",
  dropDown: "form-control",
};
const styles = {
  floatingButton: {
    position: "absolute",
    top: "90vh",
    left: "80%",
    transform: "translate(-50%, -100%)",
  },
};
