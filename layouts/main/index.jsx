"use client";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Header from "./header";
import Footer from "./footer";

import { HEADER } from "../config-layout";
import NavBottom from "./nav-bottom";
import { useResponsive } from "@/hooks/use-responsive";

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const isMd = useResponsive("up", "md");

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

      {!isMd && <NavBottom />}
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
