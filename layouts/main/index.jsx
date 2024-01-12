"use client";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Header from "./header";
import Footer from "./footer";

import { HEADER } from "../config-layout";

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header headerOnDark={false} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {<Spacing />}

        {children}
      </Box>

      <Footer />
    </Box>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------
function Spacing() {
  return (
    <Box
      sx={{
        height: { xs: HEADER.H_MOBILE, md: HEADER.H_DESKTOP },
      }}
    />
  );
}
