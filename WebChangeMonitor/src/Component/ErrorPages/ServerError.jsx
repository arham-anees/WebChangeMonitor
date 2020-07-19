import React from "react";
import { Button } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

export default function ServerError(props) {
  return (
    <div>
      <div className="text-center" style={{ marginTop: "10%" }}>
        <h2>OOPS!</h2>
        <h4>Server Error</h4>
        <p>
          Sorry, an internal server error occurred while handling your request.
          <br />
          Our technical team is working hard to bring you best services. Please
          try again later
        </p>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 10 }}
            startIcon={<HomeIcon />}
            href="/"
          >
            Home
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            startIcon={<LiveHelpIcon />}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
