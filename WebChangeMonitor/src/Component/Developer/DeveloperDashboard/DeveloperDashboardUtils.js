import { getUserVersions } from "../../../RequestToServer/Versions";

export function GetVersions(callback) {
	try {
		getUserVersions.then((x) => callback({ versions: x })).catch((err) => callback({ errorMessage: err.data, openDialog: true }));
	} catch (err) {
		callback({ errorMessage: err.message, openDialog: true });
	}
}

export function GetComments(callback) {
	try {
	} catch (err) {
		callback({ errorMessage: err.message, openDialog: true });
	}
}

export function GetLineChartData(callback) {
	try {
	} catch (err) {
		callback({ errorMessage: err.message, openDialog: true });
	}
}

export function GetPieChartData(callback) {
	try {
	} catch (err) {
		callback({ errorMessage: err.message, openDialog: true });
	}
}
