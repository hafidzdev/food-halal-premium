/* eslint-disable react/no-unescaped-entities */
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { useResponsive } from "@/hooks/use-responsive";

import { bgGradient } from "@/theme/css";

import Image from "next/legacy/image";

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();

  const mdUp = useResponsive("up", "md");

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "",
        }),
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          py: 10,
          display: { md: "flex" },
          alignItems: { md: "center" },
          height: { md: `100vh` },
        }}
      >
        <Grid container columnSpacing={{ xs: 0, md: 10 }}>
          <Grid
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h3" sx={{ my: 3 }}>
              Halal Food Premium E-Commerce Platform
            </Typography>

            <p style={{ color: "text.secondary" }}>
              Welcome to our exclusive e-commerce platform, where we bring the
              essence of Japan's finest and Halal-certified premium cuisine
              right to your doorstep.
            </p>

            <Stack
              spacing={3}
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", md: "unset" }}
              justifyContent={{ xs: "center", md: "unset" }}
              sx={{ mt: 5 }}
            >
              <Button
                variant="contained"
                color="inherit"
                size="large"
                href="/get-started"
              >
                Get Started
              </Button>

              {/* <Stack direction="row" alignItems="center" sx={{ typography: 'h6' }}>
                <Fab size="medium" sx={{ mr: 1 }}>
                  <Iconify width={24} icon="carbon:play" />
                </Fab>
                See Examples
              </Stack> */}
            </Stack>
          </Grid>

          {mdUp && (
            <Grid xs={12} md={6} lg={7}>
              <Image
                height={150}
                width={250}
                alt="marketing market"
                src="https://previews.123rf.com/images/kaisorn/kaisorn1608/kaisorn160800032/61904824-halal-food-on-a-wooden-background-vector-halal-food-top-view.jpg"
                layout="responsive"
                // loading="lazy"
                priority
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
