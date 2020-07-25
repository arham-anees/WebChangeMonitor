import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import { getState } from "./Redux/store";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

Axios.interceptors.request.use(
	(request) => {
		console.log("new " + request.method + " request sending to ", request);
		var user = getState();

		if (user !== null) {
			request.headers.Authorization = "Bearer " + user.token;
			//console.log("token added to request", token);
		}
		return request;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
Axios.interceptors.response.use(
	(response) => {
		console.log("response", response);
		return response;
	},
	(error) => {
		console.log(error);
		return error;
	}
);

ReactDOM.render(
	<React.StrictMode>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
