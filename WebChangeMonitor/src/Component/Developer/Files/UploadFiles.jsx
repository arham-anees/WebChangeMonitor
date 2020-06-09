import * as React from "react";
import SelectedFile from "./SelectedFile";
import * as Utils from "./UploadFilesUtils";
import * as FileApi from "../../../RequestToServer/Files";

import Fab from "@material-ui/core/Fab";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { setVersion } from "../../../RequestToServer/Versions";
import { uploadFiles } from "./UploadFilesUtils";

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToBeSent: [],
      filesFromServer: [],
      modifiedFiles: [],
      deletedFiles: [],
      newVersionFiles: [],
      selectedFiles: [],
      filesCheck: false,
      uploadFiles: false,
      uploading: false,
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
      await this.uploadModifiedFiles().then((res) => {
        setVersion("1.0.1", this.state.newVersionFiles);
      });
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
        isAdded: true,
        isModified: false,
        isDeleted: false,
        isUploaded: false,
        isUploading: false,
        isUploadFailed: false,
        status: 0,
      };

      selectedFiles.push(obj);
    });
    if (selectedFiles.length > 0) {
      console.log("work started");
      await this.setState({
        selectedFiles: selectedFiles,
      });
      await this.getWebsiteFiles();

      console.log("checkModifiedFiles");
      //check modified files
      await this.checkModifiedFiles().then((res) => {
        this.setState({ selectedFiles: res.filesArray });
      });

      console.log("checkDeletedFiles");
      await this.checkDeletedFiles();
      //console.log("work completed");
      this.setState({ isProcessing: false });
    }
  };

  getWebsiteFiles = () => {
    return new Promise((resolve, reject) => {
      console.log("getting files list from server");
      FileApi.getWebsiteFiles()
        .then((response) => {
          //console.log("Response :", response);
          let newVersionFiles = [];
          response.forEach((x) => {
            newVersionFiles.push({
              encodedName: x.encodedName,
              statusId: 4,
            });
          });
          //console.log(newVersionFiles);
          this.setState({
            filesFromServer: response,
            newVersionFiles: newVersionFiles,
          });
          resolve(response);
          console.log("files list got successfully");
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  checkDeletedFiles = () => {
    const s = this.state;
    if (s.selectedFiles.length > 0) {
      Utils.getDeletedFiles([...s.selectedFiles], s.filesFromServer).then(
        (res) => {
          console.log("Deleted Files :", res);
          let UpdatedVersionFiles = [...s.newVersionFiles];
          res.forEach((x) => {
            const index = s.newVersionFiles.findIndex(
              (f) => f.encodedName === x.file.encodedName
            );
            //TODO: change this approach to better approach by separating out object first
            UpdatedVersionFiles[index].statusId = 3;
          });
          this.setState({
            deletedFiles: res,
            selectedFiles: this.state.selectedFiles.concat(res),
            newVersionFiles: UpdatedVersionFiles,
          });
        }
      );
    } else {
      console.log("no file is selected, please select files");
    }
  };

  checkModifiedFiles = () => {
    return new Promise((resolve, reject) => {
      if (this.state.selectedFiles.length == 0) {
        reject("lenth of selected files is zero. please select files first");
      }
      console.log("checking files for modification");
      let s = this.state;

      Utils.getModifiedFiles(
        [...s.selectedFiles],
        s.filesFromServer,
        s.newVersionFiles
      ).then((res) => {
        const files = [...res.filesArray];
        let modifiedFiles = files.filter((item) => {
          return item.isModified;
        });
        //console.log("Res :", res);
        //console.log("modified files :", modifiedFiles);
        let UpdateVersionFiles = [...s.newVersionFiles];
        // modifiedFiles.forEach((x) => {
        //   const index = UpdateVersionFiles.findIndex(
        //     (f) => f.encodedName === x.file.encodedName
        //   );
        //   if (index > -1) {
        //     UpdateVersionFiles[index].statusId = 2;
        //   } else {
        //     //console.log()
        //   }
        //});
        console.log(res.newVersionFiles);
        console.log("checking files for modification completed");
        this.setState({
          modifiedFiles: modifiedFiles,
          newVersionFiles: res.newVersionFiles,
        });
        console.log(this.state.newVersionFiles);
        resolve(res);
      });
    });
  };

  uploadModifiedFiles = () => {
    return new Promise((resolve, reject) => {
      const items = this.state.selectedFiles.filter(
        (x) => x.status === 1 || x.status === 2
      );
      console.log(items);
      let updateVersionFiles = [...this.state.newVersionFiles];
      const promise = uploadFiles(
        items,
        [...this.state.selectedFiles],
        this.setState.bind(this)
      )
        .then((result) => {
          this.setState({
            newVersionFiles: updateVersionFiles.concat(result),
          });
          console.log("newVersionFiles:", this.state.newVersionFiles);
          resolve(updateVersionFiles.concat(result));
        })
        .catch((error) => console.log(error));
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
    //console.log("rendering files", this.state.selectedFiles);
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
            isAdded={file.isAdded}
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
    const disable = this.state.selectedFiles.length === 0;
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
              disabled={disable}
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
    const disable = this.state.selectedFiles.length === 0;

    return (
      <Fab
        variant="extended"
        style={styles.floatingButton}
        disabled={disable}
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
    opacity: 0.75,
    position: "fixed",
    top: "90vh",
    left: "80%",
    transform: "translate(-50%, -100%)",
  },
};
