"use client";

import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CartInfo from "../common/cart-info";
import CartPrice from "../common/cart-price";
import CartProduct from "../common/cart-product";
import Iconify from "@/components/partials/Iconify";

import { GetProductInCart } from "@/services/Purchase";
import { ModalPlaceCartOrder } from "@/components/partials/modal";

// ----------------------------------------------------------------------

export default function CartDetailsView({ cartId, cart }) {
  const [productInCart, setProductInCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await GetProductInCart(cartId);
      setProductInCart(productData);
    };

    fetchData();
  }, [cartId]);

  const refetchData = useCallback(async () => {
    const updatedProductData = await GetProductInCart(cartId);
    setProductInCart(updatedProductData);
  }, []);

  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: { xs: 5, md: 5 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Grid container justifyContent="center" spacing={{ xs: 5, md: 8 }}>
        <Grid item xs={12} md={8}>
          <Link underline="none" href="/cart" marginTop={10}>
            <Iconify icon="carbon:arrow-left" color="text.primary" />
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Typography variant="h5" alignItems={"center"}>
              Detail Cart
            </Typography>
          </Stack>

          <CartInfo cart={cart} />

          <CartPrice productCart={productInCart} />

          <CartProduct productCart={productInCart} refetchData={refetchData} />

          <ModalPlaceCartOrder cartId={cartId} />
        </Grid>
      </Grid>
    </Container>
  );
}

CartDetailsView.propTypes = {
  cartId: PropTypes.string.isRequired,
  cart: PropTypes.object.isRequired,
};
