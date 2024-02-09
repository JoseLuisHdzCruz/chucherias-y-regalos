// PageTitle.js
import React from "react";
import { Helmet } from "react-helmet";
import contentSecurityPolicy from "./contentSecurityPolicy";

const PageTitle = ({ title }) => (
  <Helmet>
    {/* <meta http-equiv="Content-Security-Policy" content="default-src 'self'" /> */}
    {/* <meta
      http-equiv="Content-Security-Policy"
      content=
    />}
    <title>{title}</title>
  </Helmet>
);

export default PageTitle;