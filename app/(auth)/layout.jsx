"use client";

import React from "react";
import { Container, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Layout({ children }) {
  const theme = useTheme();

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          padding: theme.spacing(12, 0),
          [theme.breakpoints.up("md")]: {
            padding: theme.spacing(22, 0),
          },
        }}
      >
        <Container>
          <Grid container justifyContent="center" alignItems={"center"}>
            <Grid item xs={12} md={7} lg={6}>
              {children}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
}
