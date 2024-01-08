"use client";

import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { useModeContext } from "@/context/ThemeContext";

export default function Home() {
  const { mode, toggleColorMode } = useModeContext();

  return (
    <Container sx={{ bgcolor: "background.default" }}>
      <nav>
        <Button onClick={toggleColorMode} variant="contained">
          {mode === "dark" ? "light" : "dark"}
        </Button>
      </nav>
      <Box sx={{ minHeight: "900px" }}>
        <Typography variant="h2" color="text.primary">
          Hello KOPED HELAP
        </Typography>
        <Typography>
          current <strong>{mode}</strong> mode
        </Typography>
      </Box>
    </Container>
  );
}
