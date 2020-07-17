import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

export function IsUsernameAvailable(username) {
  return new Promise((resolve, reject) => {
    try {
      Get(`${ApiUrls.CheckUserName}?username=${username}`).then((response) => {
        if (response.response !== undefined) {
          throw response.response;
        }
        resolve(response);
      });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
}
export function IsEmailAvailable(email) {
  return new Promise((resolve, reject) => {
    try {
      Get(`${ApiUrls.CheckEmail}?email=${email}`).then((response) => {
        if (response.response !== undefined) {
          throw response.response;
        }

        resolve(response);
      });
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
      Get(
        `${ApiUrls.CheckEmailForUpdate}?username=${username}&email=${email}`
      ).then((response) => {
        if (response.response !== undefined) {
          throw response.response;
        }
        resolve(response);
      });
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
        .then((response) => {
          if (response.response.status) {
            throw response.response;
          }
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      console.error(error);
      //reject(error);
      throw error;
    }
  });
}
export function Login(props) {
  return new Promise((resolve, reject) => {
    try {
      Get(
        ApiUrls.Login +
          `?Username=${props.Username}&HashedPassword=${props.HashedPassword}`
      )
        .then((response) => {
          if (response.response !== undefined) {
            throw response.response;
          }
          resolve(response);
        })
        .catch((error) => reject(error));
    } catch (error) {
      console.error(error);
      reject(error);
      //handleError(error);
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

function Get(url) {
  return new Promise((resolve, reject) => {
    try {
      Axios.get(url)
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
