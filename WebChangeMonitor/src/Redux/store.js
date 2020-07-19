import { createStore } from "redux";
import { getUser, setUser } from "../Helper/LocalStorage";
const reducer = (state = getUser(), action) => {
  switch (action.type) {
    case "LOGIN":
      setUser(action.payload.user);
      return (state = action.payload);
    case "LOGOUT":
      return (state = null);
    default:
      return { ...state };
  }
};
export const store = createStore(reducer);
