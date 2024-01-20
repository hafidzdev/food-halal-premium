"use client";

import PropTypes from "prop-types";

import Breadcrumbs from "./breadcrumbs";

// ----------------------------------------------------------------------

export default function EcommerceLayout({ menuLink, children }) {
  return (
    <>
      <Breadcrumbs menuLink={menuLink} />

      {children}
    </>
  );
}

EcommerceLayout.propTypes = {
  children: PropTypes.node,
};
