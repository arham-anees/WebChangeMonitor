import * as React from "react";

import "./Page404.scss";

export interface Page404Props {}

export interface Page404State {}

class Page404 extends React.Component<Page404Props, Page404State> {
  render() {
    return (
      <React.Fragment>
        <div className="error-page">
          <div>
            {/* <!--h1(data-h1='400') 400-->
          <!--p(data-p='BAD REQUEST') BAD REQUEST-->
          <!--h1(data-h1='401') 401-->
          <!--p(data-p='UNAUTHORIZED') UNAUTHORIZED-->
          <!--h1(data-h1='403') 403-->
          <!--p(data-p='FORBIDDEN') FORBIDDEN--> */}
            <h1 data-h1="404">404</h1>
            <p data-p="NOT FOUND">NOT FOUND</p>
            {/* <!--h1(data-h1='500') 500-->
          <!--p(data-p='SERVER ERROR') SERVER ERROR--> */}
          </div>
        </div>
        <div id="particles-js"></div>
        {/* <!--a(href="#").back GO BACK-->); */}
      </React.Fragment>
    );
  }
}

export default Page404;
