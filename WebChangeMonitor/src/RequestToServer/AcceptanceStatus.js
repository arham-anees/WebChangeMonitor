import Axios from "axios";
import ApiUrls from "../Helper/ApiUrl";

export function CreateAcceptanceStatus(props) {
	return new Promise((resolve, reject) => {
		try {
			let form = new FormData();
			form.append("VersionId", props.versionId);
			form.append("IsAccepted", props.isAccepted);
			form.append("Remarks", props.remarks);
			Axios.post(ApiUrls.acceptanceStatus, form, {
				headers: {
					"content-type": "multipart/form-data",
				},
			})
				.then((response) => {
					resolve(response);
				})
				.catch((err) => reject(err));
		} catch (error) {
			reject(error);
		}
	});
}

export function GetLatestAcceptanceStatus(versionId) {
	return new Promise((resolve, reject) => {
		try {
			Axios.get(`${ApiUrls.acceptanceStatusByUser}/${versionId}`)
				.then((response) => resolve(response))
				.catch((err) => reject(err));
		} catch (error) {
			reject(error);
		}
	});
}
export function GetAcceptanceStatusesList(versionId) {
	return new Promise((resolve, reject) => {
		try {
			Axios.get(ApiUrls.acceptanceStatusByVersion + versionId)
				.then((response) => resolve(response))
				.catch((err) => reject(err));
		} catch (error) {
			reject(error);
		}
	});
}
