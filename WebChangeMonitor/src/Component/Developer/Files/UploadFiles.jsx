import * as React from "react";
import axios from "axios";
import SelectedFile from "./SelectedFile";
import ApiUrls from "../../../ApiUrl";
import { sha256 } from "js-sha256";
import * as Utils from "./UploadFilesUtils";

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
    let target = event.target;
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

    //
    //
    //
    //these files are read and content is hashed and store in an array
    // let hashedContent = new Array();
    // await files[0].forEach((element) => {
    //   //selected files
    //   let hash = "";
    //   var reader = new FileReader(); //to read file
    //   reader.onload = function (event) {
    //     //event binding
    //     const obj = {
    //       hash: sha256(event.target.result),
    //       file: element.webkitRelativePath,
    //     };
    //     hashedContent.push(obj);
    //     return obj;
    //   };
    //   console.log("reader:", reader.readAsText(element)); //read content
    // });

    // console.log("array", hashedContent); //display list
    // console.log("first item", hashedContent);

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
      // var reader = new FileReader();
      // reader.onload = function (event) {
      //   obj.hash = sha256(event.target.result);
      // };
      // reader.readAsText(element);
      selectedFiles.push(obj);
    });

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
  };

  getWebsiteFiles = async () => {
    console.log("getting files list from server");
    await axios.get(ApiUrls.FileList).then((response) => {
      this.setState({ filesFromServer: response.data });
      console.log("files list got successfully");
    });
  };

  checkDeletedFiles = async () => {
    console.log("checking files list for deleted files");

    let filesArray = [...this.state.selectedFiles];
    let serverFiles = this.state.filesFromServer;
    let deletedFiles = [];
    await serverFiles.forEach((element, index) => {
      //console.log(element);
      let localIndex = filesArray.findIndex(
        (item) => item.file.webkitRelativePath === element.localPath
      );
      if (localIndex === -1) {
        deletedFiles.push({
          file: element,
          isDeleted: true,
          isModified: false,
          isUploadFailed: false,
          isUploaded: false,
          isUploading: false,
          number: -1,
        });
      }
    });
    await this.setState({
      deletedFiles: deletedFiles,
    });

    let selectedFiles = [...this.state.selectedFiles];
    //let deletedFiles = [...this.state.deletedFiles];
    selectedFiles = selectedFiles.concat(deletedFiles);
    //console.log(selectedFiles);
    await this.setState({
      selectedFiles: selectedFiles,
    });
    console.log("checking files list for deleted files completed");
  };

  checkModifiedFiles = () => {
    return new Promise((resolve, reject) => {
      console.log("checking files for modification");
      let filesArray = [...this.state.selectedFiles];
      const serverFiles = this.state.filesFromServer;
      //console.log([...serverFiles]);
      //let modifiedFiles = [];
      Utils.getModifiedFiles(filesArray, serverFiles).then((res) => {
        let modifiedFiles = res.filter((item) => {
          return item.isModified;
        });
        console.log("checking files for modification completed");
        resolve(res);
      });
    });
  };

  uploadModifiedFiles = async () => {
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

      const obj = filesList[fileIndex]; //, HashedContent: "" };
      {
        var form = new FormData();
        form.append("file", obj);

        // let response = axios.post(ApiUrls.FileList, form, {
        //   headers: { "content-type": "multipart/form-data" },
        // });
        // //if (response.state == "rejected") {
        // console.log("response : ", response);
        // response.catch((error) => {
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // });
        // //response.catch((error) => console.log());
        // //} else {
        // //}
        // return;
        //make call for single file
        axios
          .post(ApiUrls.FileList, form, {
            headers: { "content-type": "multipart/form-data" },
          })
          .then((response) => {
            console.log("response.data", response.data);
            console.log("response", response);
            if (response.status === 201) {
              SelectedObj.isUploaded = true;
            } else {
              SelectedObj.isUploadFailed = true;
            }
            this.setState({ selectedFiles: selectedFiles });
          })
          .catch((error) => {
            SelectedObj.isUploadFailed = true;
            this.setState({ selectedFiles: selectedFiles });
            console.log(error);
          });
      }
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
    //console.log(files);

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
