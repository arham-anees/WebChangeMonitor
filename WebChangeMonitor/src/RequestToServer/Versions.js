import Axios from "axios";
import ApiUrls from "../ApiUrl";

export function setVersion(version, files) {
  return new Promise((resolve, reject) => {
    try {
      var form = new FormData();
      form.append("version", version);
      form.append("files", files);
      Axios.post(ApiUrls.SetVersion, form, {
        headers: { "content-type": "multipart/form-data" },
      });
    } catch (error) {
      reject(error);
    }
  });
}
