import React from "react";
import { Container, Grid } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container justifyContent="center" alignItems={"center"}>
        <Grid item xs={12} md={7} lg={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
