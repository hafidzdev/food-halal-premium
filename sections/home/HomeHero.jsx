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

import Image from "next/image";

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
          py: 20,
          display: { md: "flex" },
          alignItems: { md: "center" },
          height: { md: `100vh` },
          my: 5,
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
              right to your doorstep. Immerse yourself in the world of exquisite
              flavors and culinary excellence, carefully curated to meet the
              highest standards of Halal practices.
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
                height={300}
                width={300}
                alt="marketing market"
                src="https://assets-global.website-files.com/6364b6fd26e298b11fb9391f/6364b6fd26e298cf3bb93c3f_6309fc4305a883fc64b964cc_DrawKit0041_E-commerce_and_Online_Shopping_Banner.png"
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
