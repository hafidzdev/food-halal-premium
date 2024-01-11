"use client";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Header from "./header";
import Footer from "./footer";

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
        {/* {!actionPage(spacingLayout) && <Spacing />} */}

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
