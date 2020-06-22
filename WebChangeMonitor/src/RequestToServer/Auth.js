import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

export function IsUsernameAvailable(username) {
  return new Promise((resolve, reject) => {
    try {
      let form = new FormData();
      form.append("username", username);
      Post(ApiUrls.CheckUserName, form).then((response) => resolve(response));
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
export function IsEmailAvailable(email) {
  return new Promise((resolve, reject) => {
    try {
      let form = new FormData();
      form.append("email", email);
      Post(ApiUrls.CheckEmail, form).then((response) => resolve(response));
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
export function IsEmailAvailableForUpdate(email, username) {
  return new Promise((resolve, reject) => {
    try {
      let form = new FormData();
      form.append("email", email);
      form.append("username", username);
      Post(ApiUrls.CheckEmailForUpdate, form).then((response) =>
        resolve(response)
      );
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function SignUp(props) {
  return new Promise((resolve, reject) => {
    try {
      Post(ApiUrls.SignUp, props)
        .then((response) => resolve(response))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}

export function Login(props) {
  return new Promise((resolve, reject) => {
    try {
      Post(ApiUrls.Login, props).then((response) => resolve(response));
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
function Post(url, body) {
  return new Promise((resolve, reject) => {
    try {
      Axios.post(url, body, { headers: { "content-type": "application/json" } })
        .then((response) => resolve(response))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
