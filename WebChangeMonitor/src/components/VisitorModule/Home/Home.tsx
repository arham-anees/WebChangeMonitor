import * as React from "react";

import "./style.scss";
export interface HomeProps {}

export interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return (
      <div className="home">
        <div className="overlay">
          <div className="title">
            Monitor your <br />
            <span className="text-warning">under-construction website</span>
            <br />
            with us
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
