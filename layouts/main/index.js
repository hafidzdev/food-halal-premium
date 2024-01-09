"use client";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";

export default function MainLayouts({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      {/* Header */}
      <h1>Main Layouts</h1>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <h1>Footer</h1>
    </Box>
  );
}

MainLayouts.propTypes = {
  children: PropTypes.node,
};
