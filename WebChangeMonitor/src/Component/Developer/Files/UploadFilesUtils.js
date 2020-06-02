import ApiUrls from "../../../ApiUrl";
import { sha256 } from "js-sha256";

import axios from "axios";

export function getModifiedFiles(filesArray, serverFiles) {
  return new Promise((resolve, reject) => {
    let modifiedFiles = [];
    let checkFile = [];
    let promises = [];
    filesArray.forEach((element, index) => {
      //console.log(serverFiles);
      let serverFileIndex = serverFiles.findIndex(
        (file) => file.localPath === element.file.webkitRelativePath
      );

      //TODO: wait is required here
      let isModified = false;
      console.log("modified function is calling");
      const myPromise = isFileModified(
        element.file,
        serverFiles[serverFileIndex],
        index
      );
      promises.push(myPromise);
    });
    Promise.all(promises).then((result) => {
      result.forEach((element) => {
        if (element.isModified) {
          filesArray[element.index].isModified = true;
        }
      });

      resolve(filesArray);
    });
  });
}
function temp(element, index, serverFiles) {}

function isFileModified(localFile, serverFile, selectedIndex) {
  return new Promise(async (resolve, reject) => {
    console.log("check is file modified");
    let obj = {
      localFileHash: "",
      serverFileHash: "",
    };
    await readFile(localFile).then(
      (value) => (obj.localFileHash = sha256(value))
    );

    //
    //    obj.localFileHash = sha256(await readFile(localFile));

    //TODO:this line will be deleted while deploying to server
    serverFile.serverPath = serverFile.serverPath.replace(
      "D:\\fyp\\webchangemonitor\\webchangemonitor.api\\",
      "http://127.0.0.1:5002/"
    );
    serverFile.serverPath = serverFile.serverPath.replace("\\", "/");
    //console.log(serverFile.serverPath);

    await axios.get(serverFile.serverPath).then((response) => {
      //console.log(response);
      obj.serverFileHash = sha256(response.data);
    });
    //console.log(obj);
    const result = !(obj.serverFileHash === obj.localFileHash);
    //console.log("checked is file modified", result);
    resolve({ file: localFile, index: selectedIndex, isModified: result });
    //return result;
  });
  //return myPromise;
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsText(file);
  });
}
