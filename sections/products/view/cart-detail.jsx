import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CartInfo from "../common/cart-info";
import Link from "next/link";
import CartPrice from "../common/cart-price";
import CartProduct from "../common/cart-product";

import { GetProductInCart } from "@/services/Purchase";
import { ModalPlaceCartOrder } from "@/components/partials/modal";

// ----------------------------------------------------------------------

export default async function CartDetailsView({ cartId, cart }) {
  const productInCart = await GetProductInCart(cartId);

  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: { xs: 5, md: 5 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Grid container justifyContent="center" spacing={{ xs: 5, md: 8 }}>
        <Grid item xs={12} md={6}>
          <Link underline="none" href="/cart" marginTop={10}>
            <Button variant="text" color="primary" sx={{ ml: -2 }}>
              Back
            </Button>
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

          <CartProduct productCart={productInCart} />

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
