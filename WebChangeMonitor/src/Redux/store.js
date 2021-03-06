import { createStore } from "redux";
const reducer = (state = getState(), action) => {
	switch (action.type) {
		case "LOGIN":
			setState(action.payload.user);
			return (state = action.payload);
		case "LOGOUT":
			setState();
			return (state = null);
		default:
			return { ...state };
	}
};
export const store = createStore(reducer);

function setState(value) {
	window.localStorage.setItem("state", value === undefined ? undefined : JSON.stringify({ ...value, time: Date.now() }));
}

export function getState() {
	try {
		try{
		var state = JSON.parse(window.localStorage.getItem("state"));
		console.log("state", state);
		
		if ((Date.now() - parseInt(state.time)) / (1000 * 60 * 60 * 24) < 1) return state;
		}catch(e){}
		return null;
	} catch (error) {
		console.error(error);
		return null;
	}
}
