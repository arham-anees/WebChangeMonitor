import { sha256 } from "js-sha256";
import * as FileRequests from "../../../RequestToServer/Files";

import axios from "axios";

export function getModifiedFiles(filesArray, serverFiles) {
  return new Promise((resolve, reject) => {
    let promises = [];
    //console.log([...serverFiles]);
    filesArray.forEach((element, index) => {
      //console.log(serverFiles);
      let serverFileIndex = serverFiles.findIndex(
        (file) => file.localPath === element.file.webkitRelativePath
      );
      // console.log(
      //   "modified function is calling",
      //   element.file,
      //   serverFiles[serverFileIndex],
      //   "index",
      //   serverFileIndex
      // );
      if (serverFileIndex !== -1) {
        const myPromise = isFileModified(
          element.file,
          serverFiles[serverFileIndex],
          index
        );
        promises.push(myPromise);
      }
    });
    Promise.all(promises).then((result) => {
      result.forEach((element) => {
        if (element.isModified) {
          filesArray[element.index].isModified = true;
        }
        filesArray[element.index].isAdded = false;
      });

      resolve(filesArray);
    });
  });
}
export function getDeletedFiles(filesArray, serverFiles, selectedFiles) {
  return new Promise((resolve, reject) => {
    console.log("checking files list for deleted files");

    let deletedFiles = [];
    serverFiles.forEach((element, index) => {
      //console.log(element);
      let localIndex = filesArray.findIndex(
        (item) => item.file.webkitRelativePath === element.localPath
      );
      if (localIndex === -1) {
        deletedFiles.push({
          file: element,
          isDeleted: true,
          isModified: false,
          isUploadFailed: false,
          isUploaded: false,
          isUploading: false,
          isAdded: false,
          number: -1,
        });
      }
    });
    resolve(deletedFiles);
  });
}
export function uploadFile(obj) {
  return new Promise((resolve, reject) => {
    try {
      FileRequests.uploadFile(obj)
        .then((response) => {
          console.log("response.data", response.data);
          console.log("response", response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}
function isFileModified(localFile, serverFile, selectedIndex) {
  return new Promise(async (resolve, reject) => {
    try {
      //console.log("check is file modified");
      let obj = {
        localFileHash: "",
        serverFileHash: "",
      };
      await readFile(localFile).then(
        (value) => (obj.localFileHash = sha256(value))
      );

      //
      //    obj.localFileHash = sha256(await readFile(localFile));
      console.log("undefined server file", { ...serverFile });
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
    } catch (error) {
      console.log(error);
      reject(error);
    }
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
