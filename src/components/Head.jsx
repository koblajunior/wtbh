import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Head = ({ ...props }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{props.title ? props.title + " - " : null} Write To Be Heard</title>
      </Helmet>
    </HelmetProvider>
  );
};
export default Head;