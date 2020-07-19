import { createStore } from "redux";
import { setUser } from "../Helper/LocalStorage";
const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      setUser(action.payload.user);
      return (state = action.payload);
    case "LOGOUT":
      setUser();
      return (state = null);
    default:
      return { ...state };
  }
};
export const store = createStore(reducer);
