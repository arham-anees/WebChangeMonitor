import React from "react";
import "./About.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

export default class FrontPage extends React.Component {
  sections = [
    {
      title: "section 1",
      body:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      icon: faCoffee,
    },
    {
      title: "section 2",
      body:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum",
      icon: faCoffee,
    },
    {
      title: "section 3",
      body:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      icon: faCoffee,
    },
  ];
  renderSections = () => {
    const jsx = this.sections.map((section) => {
      return (
        <div
          className={classes.sectionMain}
          data-wow-offset="200"
          key={section.title}
        >
          <span>
            <FontAwesomeIcon icon={section.icon} />
          </span>
          <h2>{section.title}</h2>
          <p className={classes.sectionBody}>{section.body}</p>
        </div>
      );
    });
    return jsx;
  };
  render() {
    return (
      <section className={classes.container}>
        <h1>About US</h1>
        <div className="container">
          <div className="row">{this.renderSections()}</div>
        </div>
      </section>
    );
  }
}

const classes = {
  container: "text-center about",
  sectionMain: "col-lg-4 col-sm-6 col-ex-12 about-item wow lightSpeedIn",
  sectionBody: "lead",
};
