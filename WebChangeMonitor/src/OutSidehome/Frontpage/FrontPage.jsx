import React from "react";
import "../Frontpage/FrontPage.css";
export default class FrontPage extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="overlay">
          <div className="title">
            Monitor your <br />
            <span className="text-warning">Online Tutor Finding System</span>
            <br />
            with us
          </div>
        </div>
      </div>
    );
  }
}
