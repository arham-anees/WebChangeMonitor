import * as React from "react";
import axios from "axios";
import SelectedFile from "./SelectedFile";
import ApiUrls from "../../../ApiUrl";
import SelectedFilesList from "./SelectedFilesList";
//import { CheckFileModification } from "../../../Interfaces/CheckFileModification";

// type UploadFilesState = {
//   filesToBeSent: FileList;
// };

//type UploadFilesProps = {};

class UploadFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToBeSent: [],
      modifiedFiles: [],
      selectedFiles: [],
      filesCheck: false,
    };
    this.child = React.createRef();
  }

  getChildEvent = () => {
    this.child.current.getAlert();
  };

  onFileSelect = (event) => {
    event.preventDefault();
    //var apiBaseUrl = ApiUrls.FileList; //axios.defaults.baseURL + "user/upload";
    if (this.state.filesToBeSent.length > 0) {
      //check modified files
      this.checkModifiedFiles();
      //upload modified files
      //      this.uploadModifiedFiles(); //TODO: this method is moved to above function for time being and will be called here finally. study call back
      //);
    }
    //else{
    //    alert("Please select files first");
    //}
  };

  //this method handles change in file selection
  handleChange = (e) => {
    const files = []; ///...this.state.filesToBeSent]; //get files from current state
    files.push([...e.target.files]); //push new files
    this.setState({
      //update state
      filesToBeSent: files,
    });
    let selectedFiles = [];
    files[0].forEach((element) => {
      selectedFiles.push({
        file: element,
        isModified: false,
        isDeleted: false,
        isUploaded: false,
      });
    });
  };

  checkModifiedFiles = () => {
    let filesArray = this.state.filesToBeSent;
    let checkFile = [];
    filesArray[0].forEach((element) => {
      checkFile.push({
        Number: 0,
        LocalPath: element.webkitRelativePath,
        HashedContent: element.webkitRelativePath,
      });
    });
    // var myJSON = JSON.stringify(checkFile);
    // console.log(myJSON);
    //form.append("checkChangedFiles", filesArray);

    axios
      .post(ApiUrls.CheckFiles, checkFile)
      .then((response) => {
        console.log(response.data[0], "response ended");
        this.setState({ checkFile: true });
        this.setState({ modifiedFiles: response.data }, () =>
          this.uploadModifiedFiles()
        );
      })
      .catch((error) => {
        console.log(error);
      });

    //this.uploadModifiedFiles();

    //   fetch(ApiUrls.CheckFiles, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: myJSON,
    //   })
    //     .then(
    //       //async
    //       (response) => {
    //         const data = response.json(); //await

    //         // check for error response
    //         if (!response.ok) {
    //           // get error message from body or default to response status
    //           const error = (data && data.message) || response.status;
    //           console.log(error);
    //           return Promise.reject(error);
    //         }

    //         console.log("data:" + data);
    //         this.setState({ modifiedFiles: data });
    //       }
    //     )
    //     .catch((error) => {
    //       this.setState({ errorMessage: error.toString() });
    //       console.error("There was an error!", error);
    //     });
    // };
  };

  uploadModifiedFiles = () => {
    let filesArray = [...this.state.modifiedFiles];
    for (var i in filesArray) {
      //get file from state.filesToBeSent
      const index = this.state.filesToBeSent.findIndex(
        (element) => element.LocalPath === filesArray[i].LocalPath
      );

      const obj = this.state.filesToBeSent[0][index];
      console.log("uploading :", obj);

      var form = new FormData();
      form.append("file", obj);

      //make call for single file
      axios
        .post(ApiUrls.FileList, form, {
          headers: { "content-type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("response", response.data);
          console.log("response", response);
        })
        .catch((error) => {
          console.log(error);
        });

      //f.append("files", filesArray[0]);
      // fetch(ApiUrls.FileList, {
      //   method: "POST",
      //   //headers: { "Content-Type": "multipart/form-data" },
      //   body: f,
      // })
      //   .then((res) => res.json())
      //   .then((result) => console.log(result))
      //   // console.log(f);
      //   // axios
      //   //   .post(apiBaseUrl, f, {
      //   //     headers: { "Content-Type": "multipart/form-data" },
      //   //   })

      //   .catch((error) => {
      //     console.log(error);
      //     if (error.response != undefined) {
      //       console.log(error.response.data);
      //       console.log(error.response.status);
      //       console.log(error.response.headers);
      //     }
      //   });
    }
  };

  //this handles click of delete button on selectedFile to delete item from state
  handleDeleteClick = (index) => {
    //console.log(index);
    let files = [...this.state.filesToBeSent]; //get files from state
    console.log(files[0][index]); //display file to be deleted
    files[0].splice(index, 1); //remove item
    this.setState({ filesToBeSent: files }); //update state
  };

  renderSelectedFiles = () => {
    // let filesToBeSent = [...this.state.filesToBeSent];
    // console.log("files", filesToBeSent[0]);
    // return <SelectedFilesList files={filesToBeSent[0]} />;
    const files = [...this.state.filesToBeSent]; //get list of files
    if (files[0] != null) {
      let array = []; //this array stores selectedFile as list for display
      for (let i = 0; i < files[0].length; i++) {
        array.push(
          <SelectedFile
            file={files[0][i]}
            id={i}
            key={i}
            handleClick={this.handleDeleteClick.bind(this)}
          />
        );
      }
      return <div>{array}</div>; //display this as array
    }
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
};
