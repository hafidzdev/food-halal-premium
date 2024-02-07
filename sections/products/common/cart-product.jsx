"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Link,
  Paper,
  Stack,
  useTheme,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import { RouterLink } from "@/routes/components";
import Image from "@/components/partials/image";
import ProductPrice from "./product-price";
import Iconify from "@/components/partials/Iconify";

// ----------------------------------------------------------------------

export default function CartProduct({ productCart }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const [productQuantity, setProductQuantity] = useState({});

  const handleIncrement = (productId, e) => {
    e.preventDefault();
    setProductQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: (prevQuantity[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId, e) => {
    e.preventDefault();
    setProductQuantity((prevQuantity) => {
      const currentQuantity = prevQuantity[productId] || 0;
      if (currentQuantity > 0) {
        return {
          ...prevQuantity,
          [productId]: currentQuantity - 1,
        };
      }
      return prevQuantity;
    });
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${0}px)` },
          mb: 2,
        }}
      >
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          }}
        >
          {productCart?.map((product, index) => (
            <Box
              sx={{
                position: "relative",
              }}
              key={index}
            >
              <Link
                component={RouterLink}
                href={`/product/${product?.productId}`}
                color="inherit"
                underline="none"
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    boxShadow: isLight
                      ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
                      : "0px 4px 10px rgba(0, 0, 0, 0.5)",
                    backgroundColor: isLight ? "#DFE3E8" : "",
                    transition: (theme) =>
                      theme.transitions.create("background-color", {
                        easing: theme.transitions.easing.easeIn,
                        duration: theme.transitions.duration.shortest,
                      }),
                    "&:hover": {
                      bgcolor: "background.neutral",
                    },
                  }}
                >
                  <Image
                    src={product?.productImage}
                    sx={{
                      mb: 2,
                      borderRadius: 1.5,
                      width: "100px",
                      height: "100px",
                    }}
                  />

                  <Stack spacing={0.5}>
                    <Typography
                      variant="body2"
                      line={1}
                      sx={{ fontWeight: "fontWeightMedium" }}
                    >
                      {product?.productName}
                    </Typography>
                    <Divider />

                    <ProductPrice
                      price={product?.price}
                      inStock={product?.currentStock}
                    />
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={"space-between"}
                    sx={{ mt: 0 }}
                  >
                    <IconButton onClick={(e) => handleIncrement(product.id, e)}>
                      <Iconify icon="carbon:add-alt" width="10" height="10" />
                    </IconButton>
                    <span style={{ margin: "0 10px" }}>
                      {product?.amount || 0}
                    </span>
                    <IconButton
                      onClick={(e) => handleDecrement(product.id, e)}
                      disabled={!productQuantity[product.id]}
                    >
                      <Iconify
                        icon="simple-line-icons:minus"
                        width="10"
                        height="10"
                      />
                    </IconButton>
                  </Stack>
                </Paper>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

CartProduct.propTypes = {
  productCart: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    amount: PropTypes.string,
    price: PropTypes.string,
  }),
};
