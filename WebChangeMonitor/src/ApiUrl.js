let baseUrl = "https://localhost:5001/api";
//let baseUrl = "https://localhost:44395/api";
const ApiUrls = {
  FileList: baseUrl + "/files",
  FileContent: baseUrl + "/files/",
  CheckFiles: baseUrl + "/files/check",
  TestUpload: baseUrl + "/files/testUpload",
  SetVersion: baseUrl + "/version",
  CheckUserName: baseUrl + "/auth/IsUsernameAvailable",
  CheckEmail: baseUrl + "/auth/IsEmailAvailable",
  SignUp: baseUrl + "/auth/Register",
};

export default ApiUrls;
