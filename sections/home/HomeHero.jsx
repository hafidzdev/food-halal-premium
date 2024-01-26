import { useRef } from "react";
// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
} from "@mui/material";
// hooks
import useBoundingClientRect from "@/hooks/useBoundingClientRect";
// components
import Image from "@/components/partials/image";

// ----------------------------------------------------------------------

const RootStyle = styled(Container)(({ theme }) => ({
  // padding: theme.spacing(8, 0),
  // overflow: "hidden",
  // position: "relative",
  // [theme.breakpoints.up("md")]: {
  //   padding: theme.spacing(5, 0, 15, 0),
  // },
}));
// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const containerRef = useRef(null);
  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  return (
    <RootStyle maxWidth="xl">
      <Container maxWidth="lg">
        <Grid container columnSpacing={3} alignItems="center">
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: { md: "none" },
                mt: 5,
              }}
            >
              <br />
              <br />
              <Image
                alt="home-hero"
                src={
                  "https://uploads-ssl.webflow.com/5ef11a90e077558caad294c1/5ef11a90e0775563bbd29746_halal-food-airline.jpg"
                }
              />
            </Box>
            <Stack
              spacing={5}
              alignItems={{ xs: "center", md: "flex-start" }}
              justifyContent="center"
              sx={{
                py: { md: 15, xs: 10 },
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography variant="h3">
                <Box
                  component="span"
                  sx={{
                    color: "primary.main",
                  }}
                >
                  Halal Food Premium E-Commerce Platform
                </Box>
              </Typography>

              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Welcome to our exclusive e-commerce platform, where we bring the
                essence of Japan's finest and Halal-certified premium cuisine
                right to your doorstep.
              </Typography>

              <Button
                variant="contained"
                color="inherit"
                size="large"
                href="/product"
              >
                Get Started
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Box ref={containerRef} />
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                width: { md: `calc(100% - ${offsetLeft}px)` },
                ml: 15,
                // mt: 10,
                // pt: 5,
              }}
            >
              <Image
                alt="home-hero"
                src={
                  "https://uploads-ssl.webflow.com/5ef11a90e077558caad294c1/5ef11a90e0775563bbd29746_halal-food-airline.jpg"
                }
                sx={{
                  width: "500px",
                  height: "300px",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
