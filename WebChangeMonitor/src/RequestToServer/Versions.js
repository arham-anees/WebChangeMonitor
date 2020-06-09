import Axios from "axios";
import ApiUrls from "../ApiUrl";

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
