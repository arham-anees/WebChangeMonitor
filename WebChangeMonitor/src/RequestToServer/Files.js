import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

//this method retrieves all file of a website from server
export function getAllFiles() {
	return new Promise((resolve, reject) => {
		Axios.get(ApiUrls.FileList)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => reject(error));
	});
}

export function getFileContent(props) {
	return new Promise((resolve, reject) => {
		Axios.get(ApiUrls.FileContent + props)
			.then((response) => resolve(response.data))
			.catch((error) => reject(error));
	});
}

export function getWebsiteFiles() {
	return new Promise((resolve, reject) => {
		Axios.get(ApiUrls.FileList)
			.then((response) => {
				console.log(response);
				if (response.status === 200 || response.status === 204) resolve(response);
				else reject(response);
			})
			.catch((error) => reject(error));
	});
}
export function uploadFile(file) {
	return new Promise((resolve, reject) => {
		var form = new FormData();
		form.append("file", file);
		Axios.post(ApiUrls.FileList, form, {
			headers: { "content-type": "multipart/form-data" },
		})
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});
}

export function getLastTwoVersions(encodedName) {
	return new Promise((resolve, reject) => {
		Axios.get(ApiUrls.compare + encodedName)
			.then((response) => resolve(response))
			.catch((error) => reject(error));
	});
}

export function uploadOutputFile(file) {
	return new Promise((resolve, reject) => {
		let form = new FormData();
		form.append("file", file);
		Axios.post(ApiUrls.uploadOutputFile, form, {
			headers: { "content-type": "multipart/form-data" },
		})
			.then((response) => {
				if (response.response !== undefined) {
					reject(response.resolve);
				}
				if (response.status === 201) {
					resolve(response.data);
				}
				reject(response);
			})
			.catch((err) => reject(err));
	});
}
