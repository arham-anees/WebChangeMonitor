import * as React from "react";
import axios from "axios";
import SelectedFile from "./SelectedFile";
import ApiUrls from "../../../ApiUrl";

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToBeSent: [],
      modifiedFiles: [],
      selectedFiles: [],
      filesCheck: false,
      uploadFiles: false,
      sortBy: "none",
    };
    this.child = React.createRef();
  }

  onFileSelect = async (event) => {
    event.preventDefault();
    this.setState({ uploadFiles: true });
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

    //const modifiedFiles = this.checkModifiedFiles(files);
    //console.log("modifiedFiles :", this.checkModifiedFiles(files));

    let selectedFiles = [];
    await files[0].forEach((element, index) => {
      selectedFiles.push({
        file: element,
        number: index,
        isModified: false,
        isDeleted: false,
        isUploaded: false,
        isUploading: false,
      });
    });

    await this.setState({
      selectedFiles: selectedFiles,
    });

    //check modified files
    await this.checkModifiedFiles();
  };

  checkModifiedFiles = async () => {
    let filesArray = this.state.filesToBeSent;
    let checkFile = [];
    await filesArray[0].forEach((element, index) => {
      //console.log(element);
      checkFile.push({
        Number: index,
        LocalPath: element.webkitRelativePath,
        HashedContent: element.webkitRelativePath,
      });
    });

    await axios
      .post(ApiUrls.CheckFiles, checkFile)
      .then((response) => {
        //console.log(response.data, "response ended");
        this.setState({ modifiedFiles: response.data });
        const data = [...response.data];
        const selectedFiles = [...this.state.selectedFiles];
        data.forEach((item) => {
          let index = this.state.filesToBeSent[0].findIndex(
            (x) => x.webkitRelativePath === item.localPath
          );
          //get obj from selectedFiles
          let obj = selectedFiles[index];
          obj.isModified = true;
          console.log("obj :", obj);
        });

        this.setState({
          selectedFiles: selectedFiles,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  uploadModifiedFiles = () => {
    let filesArray = [...this.state.modifiedFiles];
    console.log(filesArray);
    filesArray.forEach((file, index) => {
      //update isUploading
      const selectedFiles = [...this.state.selectedFiles];
      // let selectedFileIndex = this.state.filesToBeSent[0].findIndex(
      //   (x) => x.webkitRelativePath === file.localPath
      // );
      let SelectedObj = selectedFiles[index];
      SelectedObj.isUploading = true;
      this.setState({ selectedFiles: selectedFiles });

      let filesList = [...this.state.filesToBeSent][0];
      const fileIndex = filesList.findIndex(
        (f) => f.webkitRelativePath === file.localPath
      );
      //end of updating isUploading

      const obj = filesList[fileIndex];
      if (index > 2) {
        var form = new FormData();
        form.append("file", obj);

        //make call for single file
        axios
          .post(ApiUrls.FileList, form, {
            headers: { "content-type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("response.data", response.data);
            console.log("response", response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      setTimeout(() => {
        SelectedObj.isUploaded = true;
        this.setState({ selectedFiles: selectedFiles });
      }, 100000);
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
    console.log(files);

    //TODO: sort data here and then apply to files list
    //underscoreJs can help
    if (this.state.sortBy === "name") {
      console.log(files.sort((a, b) => a.file.name - b.file.name));
    } else if (this.state.sortBy === "lastModifiedDate") {
      // console.log(
      //   files.sort(
      //     (a, b) =>
      //       new Date(a.file.lastModified) - new Date(b.file.lastModified)
      //   )
      // );
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
  renderDropDown = () => {
    return (
      <div className={classes.dropDownContainer}>
        <select
          name="SortBy"
          id="sortBy"
          className={classes.dropDown}
          onChange={this.handleSelectedIndexChanged}
        >
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="path">Location</option>
          <option value="lastModfiedDate">Last Modified Date</option>
        </select>
      </div>
    );
  };
  render() {
    return (
      <div className={classes.container}>
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
        {this.renderDropDown()}
        {this.renderSelectedFiles()}
        <button onClick={this.onFileSelect} className={classes.upload}>
          Upload update
        </button>
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
