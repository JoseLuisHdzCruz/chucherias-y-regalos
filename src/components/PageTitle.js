// PageTitle.js
import React from 'react';
import { Helmet } from 'react-helmet';

const PageTitle = ({ title }) => (
  <Helmet>
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'" />
    <title>{title}</title>
  </Helmet>
);

export default PageTitle;
