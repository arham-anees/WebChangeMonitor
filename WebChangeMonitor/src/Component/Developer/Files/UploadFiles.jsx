import * as React from "react";
import axios from "axios";
import SelectedFile from "./SelectedFile";

// type UploadFilesState = {
//   filesToBeSent: FileList;
// };

//type UploadFilesProps = {};

class UploadFiles extends React.Component {
  state = {
    filesToBeSent: [],
  };

  onFileSelect = (event) => {
    console.log("Event fire");
    event.preventDefault();
    var apiBaseUrl = "https://localhost:44395/api/files/upload"; //axios.defaults.baseURL + "user/upload";
    if (this.state.filesToBeSent.length > 0) {
      let filesArray = this.state.filesToBeSent;
      let f = new FormData();
      for (var i in filesArray) {
        //make call for single file
        console.log("files", filesArray[i]);
        f = new FormData();
        f.append("file", filesArray[i]);
        axios.post(apiBaseUrl, f, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      console.log(this.state.filesToBeSent);

      //   }
    }
    //else{
    //    alert("Please select files first");
    //}
  };

  //this method handles change in file selection
  handleChange = (e) => {
    const files = [...this.state.filesToBeSent]; //get files from current state
    files.push([...e.target.files]); //push new files
    this.setState({
      //update state
      filesToBeSent: files,
    });
  };

  //display list of files selected for upload
  renderSelectedFiles() {
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
  }

  //this handles click of delete button on selectedFile to delete item from state
  handleDeleteClick = (index) => {
    //console.log(index);
    let files = [...this.state.filesToBeSent]; //get files from state
    console.log(files[0][index]); //display file to be deleted
    files[0].splice(index, 1); //remove item
    this.setState({ filesToBeSent: files }); //update state
  };
  // componentDidMount() {
  //   this.refs.x.directory = true;
  //   this.refs.x.webkitdirectory = true;
  // }
  // setFile(e: HTMLInputElement) {
  //   this.setState({ file: e.target.files[0] });
  // }
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
        {/* <SelectedFilesList
          filesList={this.state.filesToBeSent}
        ></SelectedFilesList> */}

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
