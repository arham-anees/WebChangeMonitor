import React, { Component } from "react";
import * as FileApi from "../../../RequestToServer/Files";

class FileContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      encodedName: "",
      content: "",
      fileType: "",
    };
  }

  componentDidMount() {
    let param = this.props.location.search.substring(1);
    FileApi.getFileContent(param)
      .then((response) => {
        this.setState({
          encodedName: response.data.encodedName,
          content: response.data.content,
          fileType: "",
        });
      })
      .catch((error) => console.log(error));
    // fetch()
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw response;
    //     }
    //     return response.json(); //we only get here if there is no error
    //   })
    //   .then((json) => {

    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  data = () => {
    return (
      <span>
        {this.state.encodedName} | {this.state.content}
      </span>
    );
  };
  render() {
    return (
      <div className={classes.main}>
        <div className={classes.container}>
          <h3>{this.state.encodedName}</h3>
          <h6>{this.state.fileType}</h6>
          <p>{this.state.content}</p>
        </div>
      </div>
    );
  }
}

export default FileContent;

const classes = {
  main: "bg-white",
  container: "container bg-light",
};
