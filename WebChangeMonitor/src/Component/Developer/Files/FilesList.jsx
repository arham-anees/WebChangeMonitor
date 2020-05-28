import React, { Component } from "react";
import ApiUrls from "../../../ApiUrl";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [], //this.handleLoad,
    };
  }
  render() {
    return <div>{this.listItems()}</div>;
  }

  componentDidMount = () => {
    this.handleLoad(); //to call this method only once
  };

  //get data from server
  handleLoad = () => {
    //console.log("Event fire");
    fetch(ApiUrls.FileList)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          files: result,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //design list of files
  listItems = () => {
    let files = [...this.state.files]; //TODO sort files to show in directory structure

    if (files.length > 0) {
      //to avoid undefined exception
      let array = []; //this is store each list item
      for (var i in files) {
        //console.log(files[i]);
        array.push(
          <React.Fragment key={i + files[i].encodedName + files[i].localPath}>
            {this.listItem({ file: files[i], index: i })}
            <Divider />
          </React.Fragment>
        );
      }
      return <List>{array}</List>;
    }
  };

  //design single file of list
  listItem = (props) => {
    return (
      <ListItem button onClick={(e) => this.navigateToFile(props.encodedName)}>
        <div className="d-flex justify-content-between">
          <span>
            {props.index} : {props.file.localPath}
          </span>
          {/* <span>{props.encodedName}</span>
          <span>{props.fileType}</span> */}
        </div>
      </ListItem>
    );
  };

  //navigate to display content of files
  navigateToFile = (props) => {
    console.log(props);
    window.location = "/files/content?" + props;
  };
}

export default FilesList;

// getData = () => {
//   var apiBaseUrl = ApiUrls.FilesList; //axios.defaults.baseURL + "user/upload";

//   //make call for single file
//   let array = [];
//   //axios.get(apiBaseUrl).then((response) => console.log(response));
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//       //console.log(this.responseText);
//       var jsonData = JSON.parse(this.responseText);

//       for (var i in jsonData) {
//         //console.log(jsonData[i]);
//         array.push([i, jsonData[i]]);
//       }

//       return array;
//     }
//   };
//   xhttp.open("GET", apiBaseUrl, true);

//   // xhttp.setRequestHeader(
//   //   "Access-Control-Allow-Origin",
//   //   "https://localhost:3000"
//   // );
//   //xhttp.setRequestHeader("Access-Control-Allow-Methods", "*");
//   xhttp.send();
//   //console.log(this.state.files);
// };
