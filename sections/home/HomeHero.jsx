import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useTheme, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useResponsive } from "@/hooks/use-responsive";
import useBoundingClientRect from "@/hooks/useBoundingClientRect";
import Iconify from "@/components/partials/Iconify";
import Carousel, { useCarousel } from "@/components/partials/carousel";

import Image from "next/legacy/image";
import ImageList from "./common/ImageList";
import { GetEntityInfo } from "@/services/Entity";

// ----------------------------------------------------------------------

export default function HomeHero() {
  const theme = useTheme();
  const mdUp = useResponsive("up", "md");

  const containerRef = useRef(null);
  const container = useBoundingClientRect(containerRef);
  const offsetLeft = container?.left;

  const carousel = useCarousel({
    slidesToShow: 5,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    // cssEase: "linear",
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2 },
      },
    ],
  });

  const [entity, setEntity] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await GetEntityInfo();
        setEntity(data);
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        overflow: "hidden",
        position: "relative",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container
        sx={{
          mb: { md: 0 },
          left: { md: 0 },
          right: { md: 0 },
          position: { md: "absolute" },
          height: { md: "calc(100% - 320px)" },
        }}
      >
        <Grid container spacing={6} justifyContent="center">
          <Grid xs={12} md={4}>
            {entity?.logo && (
              <Image
                alt="Logo Company"
                src={entity.logo}
                width={350}
                height={350}
                style={{
                  borderRadius: 2,
                  mx: "auto",
                  display: "block",
                }}
                // layout="responsive"
                // loading="lazy"
                // priority
              />
            )}
          </Grid>

          <Grid xs={12} md={7}>
            <Stack
              alignItems={{ xs: "center", md: "flex-start" }}
              sx={{
                pt: { md: 0, xs: 3 },
                textAlign: { xs: "center", md: "unset" },
              }}
            >
              <Typography variant="h3">{entity?.name}</Typography>

              <Typography variant="subtitle1" sx={{ color: "text.primary" }}>
                {entity?.address}
              </Typography>

              <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ my: 2 }}>
                {entity?.socialMediaLink?.instagram && (
                  <SocialLink
                    name={"Instagram"}
                    link={entity?.socialMediaLink?.instagram}
                    icon={"carbon:logo-instagram"}
                    color={"#E02D69"}
                  />
                )}
                {entity?.socialMediaLink?.facebook && (
                  <SocialLink
                    name={"Facebook"}
                    link={entity?.socialMediaLink?.facebook}
                    icon={"carbon:logo-facebook"}
                    color={"#1877F2"}
                  />
                )}
                {entity?.socialMediaLink?.line && (
                  <SocialLink
                    name={"Line"}
                    link={entity?.socialMediaLink?.line}
                    icon={"carbon:checkmark-outline"}
                    color={"#05a500"}
                  />
                )}
              </Stack>

              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  textAlign: {
                    xs: "left",
                    sm: "left",
                  },
                  mt: 1,
                }}
              >
                {entity?.description}
              </Typography>
            </Stack>

            <Box ref={containerRef} />
          </Grid>
        </Grid>
      </Container>

      <Box
        sx={{
          mt: mdUp ? 30 : 0,
          pl: `${offsetLeft}px`,
          width: { md: `calc(100% + 100px)` },
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {entity?.images.map((item, index) => (
            <Box
              key={index}
              sx={{
                ml: "-1px",
                py: 8,
                pr: { xs: 2, md: 4 },
                pl: { xs: 2, md: 0 },
                color: "common.white",
              }}
            >
              <ImageList item={item} />
            </Box>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}

function SocialLink({ name, link, color, icon }) {
  return (
    <Link href={`${link}`} color="inherit" target={"_blank"}>
      <Button
        key={link}
        size="small"
        variant="contained"
        startIcon={<Iconify icon={icon} sx={{ color: color }} />}
        color="inherit"
        sx={{
          flexShrink: 0,
        }}
      >
        {name}
      </Button>
    </Link>
  );
}

SocialLink.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string,
};
