import React, { Component } from "react";
import ApiUrls from "../../../ApiUrl";

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
    fetch(ApiUrls.FileContent + param)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json(); //we only get here if there is no error
      })
      .then((json) => {
        this.setState({
          encodedName: json.encodedName,
          content: json.content,
          fileType: "",
        });
      })
      .catch((err) => {
        if (typeof err.text === "function") {
          err.text().then((errorMessage) => {
            this.props.dispatch(console.log(errorMessage));
          });
        } else {
          console.log(err);
        }
      });
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
