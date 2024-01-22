/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */

import PropTypes from "prop-types";
import { Container, Box, Grid, Button, alpha, useTheme } from "@mui/material";
import { bgGradient } from "@/theme/css";

import { RouterLink } from "@/routes/components";
import Carousel, {
  useCarousel,
  CarouselDots,
} from "@/components/partials/carousel";
import Image from "@/components/partials/image";
import Label from "@/components/partials/label";
import TextMaxLine from "@/components/partials/text-max-line";
import Iconify from "@/components/partials/Iconify";

import { carouselData } from "@/__mocks__/carousel";

const HomeCarousel = () => {
  const theme = useTheme();

  const carousel = useCarousel({
    fade: true,
    speed: 100,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    ...CarouselDots({
      rounded: true,
      sx: {
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 40,
        mx: "auto",
        position: "absolute",
      },
    }),
  });

  return (
    <Container
      sx={{
        py: 5,
      }}
    >
      <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.background.default, 0.9),
            imgUrl: "/assets/background/overlay_1.jpg",
          }),
          borderRadius: 3,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {carouselData.map((product) => (
            <ProductItem key={product.id} product={product} theme={theme} />
          ))}
        </Carousel>
      </Box>
    </Container>
  );
};

export default HomeCarousel;
function ProductItem({ product, theme }) {
  const { label, title, caption, coverUrl } = product;

  return (
    <Grid
      container
      rowSpacing={{
        xs: 5,
        md: 0,
      }}
      sx={{
        py: 10,
        px: { xs: 3, md: 10 },
      }}
    >
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            maxWidth: { md: 440 },
            textAlign: { xs: "center", md: "unset" },
          }}
        >
          <Label color="warning" sx={{ mb: 2 }}>
            {label}
          </Label>

          <TextMaxLine variant="h3" sx={{ mb: 2 }}>
            {title}
          </TextMaxLine>

          <TextMaxLine variant="body2" sx={{ mb: 5, color: "text.secondary" }}>
            {caption}
          </TextMaxLine>

          <Button
            component={RouterLink}
            href={"/product"}
            size="large"
            color="inherit"
            variant="contained"
            endIcon={<Iconify icon="carbon:chevron-right" />}
          >
            Shop Now
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Image
          src={coverUrl}
          sx={{
            filter: `drop-shadow(20px 20px 24px ${alpha(
              theme.palette.common.black,
              0.16
            )})`,
            maxWidth: 350,
            maxHeight: 300,
            ml: "auto",
            mr: { xs: "auto", md: "unset" },
          }}
        />
      </Grid>
    </Grid>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    caption: PropTypes.string,
    coverUrl: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
  }),
  theme: PropTypes.object,
};
