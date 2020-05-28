import React, { Component } from "react";

import SelectedFile from "./SelectedFile";

class SelectedFilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filesToBeSent: this.props.files,
    };
    console.log("props", props);
    //console.log("state", state);
  }

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

  render() {
    return <React.Fragment>{this.renderSelectedFiles()}</React.Fragment>;
  }
}

export default SelectedFilesList;
