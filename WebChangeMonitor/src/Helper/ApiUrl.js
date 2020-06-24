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
  CheckEmailForUpdate: baseUrl + "/auth/IsEmailAvailableForUpdate",
  SignUp: baseUrl + "/auth/Register",
  Login: baseUrl + "/auth/authenticate",
  profile: baseUrl + "/User",
  compare: baseUrl + "/files/compare/",
  acceptanceStatus: baseUrl + "/acceptancestatus",
  acceptanceStatusByUser: baseUrl + "/acceptancestatus/user",
  acceptanceStatusByVersion: baseUrl + "/acceptancestatus/version/",
};

export default ApiUrls;
