import * as React from "react";
import axios from "axios";

type UploadFilesState = {
  filesToBeSent: FileList;
};

type UploadFilesProps = {};

class UploadFiles extends React.Component<UploadFilesProps, UploadFilesState> {
  constructor(props: UploadFilesProps) {
    super(props);
    this.state = {
      filesToBeSent: {} as FileList,
    };
  }

  onFileSelect = (event: React.MouseEvent<HTMLButtonElement, Event>) => {
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
  handleChange(selectorFiles: FileList | null) {
    this.setState({
      filesToBeSent: selectorFiles as FileList,
    });
    console.log(this.state.filesToBeSent);
  }

  // setFile(e: HTMLInputElement) {
  //   this.setState({ file: e.target.files[0] });
  // }
  render() {
    return (
      <div>
        <input
          type="file"
          multiple
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.handleChange(e.target.files)
          }
        />
        <button onClick={this.onFileSelect}>click me</button>
      </div>
    );
  }
}

export default UploadFiles;
