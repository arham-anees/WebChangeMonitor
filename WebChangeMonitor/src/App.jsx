import React from "react";
import Route from "./Router/Routes";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}
