"use client";

import { useState, useEffect } from "react";

import { Box, Stack, Container, useTheme } from "@mui/material";
import { useBoolean } from "@/hooks/use-boolean";

import CategoriesList from "./common/CategoriesList";
import CategoriesGrid from "./common/CategoriesGrid";
import ProductsList from "./common/ProductsList";
import { useResponsive } from "@/hooks/use-responsive";
import Carousel, {
  useCarousel,
  CarouselDots,
} from "@/components/partials/carousel";
import { GetAllProducts } from "@/services/Product";
import { GetAllCategory } from "@/services/Category";

// ----------------------------------------------------------------------
const initialLimitProduct = 18;

export default function HomeProducts() {
  const theme = useTheme();
  const mdUp = useResponsive("up", "md");

  const [category, setCategory] = useState([]);

  const [product, setProduct] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  const loading = useBoolean(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const dataCategory = await GetAllCategory();
        setCategory(dataCategory);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }

    fetchCategory();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await GetAllProducts("", initialLimitProduct, 1);

        setProduct([...newData]);
        setPage(2);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.onFalse();
      }
    };
    getData();
  }, []);

  const fetchProduct = async () => {
    try {
      const newData = await GetAllProducts("", initialLimitProduct, page);
      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    return null;
  };

  const fetchData = async () => {
    const resultFormServer = await fetchProduct();

    setProduct((currentData) => [...currentData, ...resultFormServer]);
    if (
      resultFormServer.length === 0 ||
      resultFormServer.length < initialLimitProduct
    ) {
      sethasMore(false);
    }

    setPage((prevData) => prevData + 1);
  };

  // carousel settings
  const carousel = useCarousel({
    dots: !mdUp,
    slidesToShow: 4,
    slidesToScroll: 1,
    ...CarouselDots({
      sx: {
        mt: 5,
      },
    }),
    responsive: [
      {
        // Down md
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2, slidesToScroll: 3 },
      },
      {
        // Down sm
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  });

  return (
    <Container maxWidth="xl" sx={{ pb: 5, pt: { md: 2, xs: 0, sm: 0 } }}>
      {/* Categories */}
      {mdUp ? (
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
          }}
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            ml: { md: 3.5, sm: 2 },
            width: { md: `calc(100% - ${100}px)` },
            mb: 5,
          }}
        >
          {category?.map((category, index) => (
            <CategoriesList category={category} key={index} />
          ))}
        </Box>
      ) : (
        <Box sx={{ mb: 5 }}>
          <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
            {category?.map((category, index) => (
              <Box key={index} sx={{ px: 1.5 }}>
                <CategoriesGrid category={category} key={index} />
              </Box>
            ))}
          </Carousel>
        </Box>
      )}

      {/* Products */}
      <Box
        sx={{
          flexGrow: 1,
          pl: { md: 8 },
          ml: { md: 3.5, sm: 2 },
          width: { md: `calc(100% - ${100}px)` },
        }}
      >
        <ProductsList
          dataLength={product.length}
          next={fetchData}
          hasMore={hasMore}
          loading={loading.value}
          viewMode="grid"
          products={product}
        />
      </Box>
    </Container>
  );
}
