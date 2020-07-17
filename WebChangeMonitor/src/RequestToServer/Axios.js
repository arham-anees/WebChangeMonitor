import Axios from "axios";

export function Post(url, body) {
  return new Promise((resolve, reject) => {
    try {
      Axios.post(url, body, { headers: { "content-type": "application/json" } })
        .then((response) => {
          if (response.response.status) {
            throw response.response;
          }
          resolve(response);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
export function Get(url, body) {
  return new Promise((resolve, reject) => {
    try {
      Axios.get(url, body, { headers: { "content-type": "application/json" } })
        .then((response) => {
          if (response.response.status) {
            throw response.response;
          }
          resolve(response);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
