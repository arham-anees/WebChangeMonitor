import React from "react";
import "./About.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt,faUserPlus,faChartBar } from "@fortawesome/free-solid-svg-icons";

export default class FrontPage extends React.Component {
  sections = [
    {
      title: "Register Your Team",
      body:
        `Register your Manager,Team Lead and Developer and let the Manager manage them, 
        Team Lead will lead the Developers while Managers will manage them all while Developer 
        will upload files while at last every one and every file will be manage and handle by CEO`,
      icon: faUserPlus,
    },
    {
      title: "Track Changes",
      body:
        `Track Changes accross versions of your website.You can track changes in each of your file version and changes by Developer or Team Lead.Comparison of two files clearly shows insertion,deletion or modification line by line .`,
      icon: faChartBar,
    },
    {
      title: "Deploy Your Website",
      body:
        `Your Website deployement is one click away.You can deploy your website from Web Change Monitor with a single click.Web Change Monitor also provides the easiest way to revert changes uploaded to targeted Domain.`,
      icon: faCloudUploadAlt,
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
          <p style={{color:"#0017a8"}} className={classes.sectionBody}>{section.body}</p>
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
