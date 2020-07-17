import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

export function setVersion(version, files) {
  return new Promise((resolve, reject) => {
    try {
      Axios.post(
        ApiUrls.SetVersion,
        JSON.stringify({ Version: version, Files: files }),
        {
          headers: { "content-type": "application/json" },
        }
      ).then((response) => resolve(response));
    } catch (error) {
      reject(error);
    }
  });
}

export function getVersion(versionId) {
  return new Promise((resolve, reject) => {
    try {
      Axios.get(ApiUrls.versions + `/${versionId}`)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(response.status);
          }
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

export function getVersionsList() {
  return new Promise((resolve, reject) => {
    try {
      Axios.get(ApiUrls.versions)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            resolve({});
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      reject(err);
    }
  });
}
