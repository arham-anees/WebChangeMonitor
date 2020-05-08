import * as React from "react";
import axios from "axios";

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

  handleChange = (e) => {
    const files = [...this.state.filesToBeSent];
    files.push([...e.target.files]);
    this.setState({
      filesToBeSent: files,
    });
  };

  renderSelectedFiles(props) {
    if (props != null) {
      const files = [...this.state.filesToBeSent];
      const listFiles = files.map(function (f) {
        return <li key={f}>f</li>;
      });
      return <ul>{listFiles}</ul>;
    }
  }

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
        {this.renderSelectedFiles(this.state.filesToBeSent)}
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
