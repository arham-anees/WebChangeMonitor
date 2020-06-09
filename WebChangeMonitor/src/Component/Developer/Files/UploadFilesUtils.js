import { sha256 } from "js-sha256";
import * as FileRequests from "../../../RequestToServer/Files";
import { setVersion } from "../../../RequestToServer/Versions";

import axios from "axios";

export function getModifiedFiles(filesArray, serverFiles, newVersionFiles) {
  return new Promise((resolve, reject) => {
    let promises = [];
    //console.log(filesArray);
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
        //console.log(serverFileIndex);
        const myPromise = isFileModified(
          element.file,
          serverFiles[serverFileIndex],
          index
        );
        promises.push(myPromise);
      } else {
        console.log(element);
        filesArray[element.number].status = 1;
      }
    });
    Promise.all(promises).then((result) => {
      let updateVersionFiles = [...newVersionFiles];
      result.forEach((element) => {
        if (element.isModified) {
          filesArray[element.index].isModified = true;
          filesArray[element.index].status = 2;
          console.log("modified element :", element);
          //get index
          const index = newVersionFiles.findIndex(
            (x) => x.encodedName === element.serverFile.encodedName
          );
          console.log("before item removed", [...updateVersionFiles]);
          console.log(
            "item removed :",
            updateVersionFiles.splice(index, 1),
            index
          ); //].statusId = 2;
          console.log("after item removed", [...updateVersionFiles]);
        }
        filesArray[element.index].isAdded = false;
      });
      console.log("updateVersionFiles:", updateVersionFiles);
      resolve({ filesArray: filesArray, newVersionFiles: updateVersionFiles });
    });
  });
}
export function getDeletedFiles(filesArray, serverFiles) {
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
          status: 3,
          number: -1,
        });
      }
    });
    resolve(deletedFiles);
  });
}

export function uploadFiles(filesArray, selectedFiles, callback) {
  return new Promise((resolve, reject) => {
    var uploadedFilesList = [];
    let promises = [];
    filesArray.forEach((file) => {
      console.log("uploading file, please wait");
      //update isUploading
      //const selectedFiles = [...this.state.selectedFiles];
      const index = selectedFiles.findIndex((x) => x.file === file.file);
      //console.log("local index:", fileIndex);
      let SelectedObj = selectedFiles[index];
      SelectedObj.isUploading = true;
      callback({ selectedFiles: selectedFiles });
      ///console.log("SelectedObject:", { ...SelectedObj }, { ...file });
      let obj = uploadFile(file.file);
      promises.push(obj);
      obj
        .then((result) => {
          if (result.status === 201) {
            SelectedObj.isUploaded = true;
            //if (SelectedObj.status === 1) {
            uploadedFilesList.push({
              //File: { ...result.data.file },
              EncodedName: result.data.file.encodedName,
              StatusId: SelectedObj.status,
            });
            //}
          } else {
            SelectedObj.isUploadFailed = true;
          }
          SelectedObj.isUploading = false;
        })
        .catch((error) => {
          SelectedObj.isUploadFailed = true;
        })
        .finally(() => {
          //console.log("uploadedFilesList", selectedFiles);

          callback({ selectedFiles: selectedFiles });
        });
    });
    try {
      Promise.all(promises).then(() => {
        console.log("sending request to create version");
        if (uploadedFilesList.length > 0) {
          console.log("uploadedFilesList", uploadedFilesList);
          //callback({newVersionFiles})
          console.log("sending request to create version");
          resolve(uploadedFilesList);
          //setVersion("1.0.0", uploadedFilesList);
        } else {
          console.log("uploadedFiles length is zero");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

// function setVersion() {
//   return new Promise((resolve, reject) => {
//     try {
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

function uploadFile(obj) {
  return new Promise((resolve, reject) => {
    try {
      FileRequests.uploadFile(obj)
        .then((response) => {
          //console.log("response.data", response.data);
          //console.log("response", response);
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
      //console.log("undefined server file", { ...serverFile });
      //TODO:this line will be deleted while deploying to server
      serverFile.serverPath = serverFile.serverPath.replace(
        "D:\\FYP\\WEBCHANGEMONITOR\\WEBCHANGEMONITOR.API\\",
        "http://127.0.0.1:5002/"
      );
      serverFile.serverPath = serverFile.serverPath.replace("\\", "/");
      console.log(serverFile.serverPath);

      await axios
        .get(serverFile.serverPath)
        .then((response) => {
          //console.log(response);
          obj.serverFileHash = sha256(response.data);
        })
        .catch((error) => reject(error));
      //console.log(obj);
      const result = !(obj.serverFileHash === obj.localFileHash);
      //console.log("checked is file modified", result);
      resolve({
        file: localFile,
        index: selectedIndex,
        isModified: result,
        serverFile: serverFile,
      });
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
