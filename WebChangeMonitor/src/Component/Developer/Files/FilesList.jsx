import React, { Component } from "react";
import ApiUrls from "../../../ApiUrl";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Axios from "axios";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //this.handleLoad,
    };
  }
  render() {
    return <div className={classes.container}>{this.listItems()}</div>;
  }

  componentDidMount = () => {
    this.handleLoad(); //to call this method only once
  };

  //get data from server
  handleLoad = () => {
    //console.log("Event fire");
    Axios.get(ApiUrls.FileList)
      .then((response) => {
        console.log(response.data);
        this.setState({
          files: response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  //design list of files
  listItems = () => {
    let files = [...this.state.files]; //TODO sort files to show in directory structure

    if (files.length > 0) {
      return files.map((file) => (
        <React.Fragment key={file.encodedName + file.localPath}>
          {this.listItem(file)}
          <Divider />
        </React.Fragment>
      ));
    }
  };

  //design single file of list
  listItem = (props) => {
    const date = new Date(props.lastModifiedDate);
    const user = "user";
    const name = props.name;
    return (
      <ListItem button onClick={(e) => this.navigateToFile(props.encodedName)}>
        <div className={classes.listItem}>
          <span>
            <InsertDriveFileIcon color="primary" />
            {name}
          </span>
          <span>{date.toLocaleDateString()}</span>
          <span>{user}</span>
        </div>
      </ListItem>
    );
  };

  //navigate to display content of files
  navigateToFile = (encodedName) => {
    console.log(encodedName);
    window.location = "/files/content?" + encodedName;
  };
}

export default FilesList;

const classes = {
  container: "container",
  listItem: "d-flex justify-content-between w-100",
};
