import React from "react";
class FrontPage extends React.Component {
  render() {
    return (
      <div style={styles.home}>
        <div style={styles.overlay}>
          <div style={styles.title}>
            Monitor your <br />
            <span className="text-warning">Website</span>
            <br />
            with us
          </div>
        </div>
      </div>
    );
  }
}

export default FrontPage;
const styles = {
  home: {
    backgroundImage: `url(
      "https://www.web24.com.au/wp-content/uploads/2016/10/iStock_71952335_LARGE-1024x683.jpg"
    )`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "90vh",
  },
  overlay: {
    background:
      "radial-gradient(circle, #3e3c3c 22%, hsla(0, 0%, 62%, 0) 100%)",
    height: "inherit",
    textAlign: "center",
    fontSize: "44px",
    color: "#fff",
  },
  title: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontWeight: "800",
  },
};
