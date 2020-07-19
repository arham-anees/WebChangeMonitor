import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

export function GetUser() {
  return new Promise((resolve, reject) => {
    Axios.get(ApiUrls.profile)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}

export function GetDomainUsers(domainId) {
  return new Promise((resolve, reject) => {
    try {
      Axios.get(ApiUrls.domainUsers + "/" + domainId)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data);
          }
          reject(response);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

export function DeleteUser(username) {
  return new Promise((resolve, reject) => {
    try {
      Axios.delete(ApiUrls.deleteUser + "/" + username)
        .then((response) => {
          if (response.status === 200) resolve(response);
          reject(response.statusText);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}

export function UpdateUser(props) {
  return new Promise((resolve, reject) => {
    try {
      Axios.put(ApiUrls.user + "/" + props.userName, props)
        .then((res) => {
          if (res.status === 200) resolve(res.data);
          else reject(res.statusText);
        })
        .catch((err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
}
