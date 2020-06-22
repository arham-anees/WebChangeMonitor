import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

export function GetUser() {
  return new Promise((resolve, reject) => {
    Axios.get(ApiUrls.profile)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
}
