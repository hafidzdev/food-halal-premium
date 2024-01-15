"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/routes/components";

import { dummyProducts } from "@/__mocks__/product";

import Iconify from "@/components/partials/Iconify";

import CartList from "../cart/cart-list";
import CartSummary from "../cart/cart-summary";

// ----------------------------------------------------------------------

export default function CartView() {
  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={8}>
          <CartList products={dummyProducts} />
        </Grid>

        <Grid xs={12} md={4}>
          <CartSummary
            tax={7}
            total={357.09}
            subtotal={89.09}
            shipping={55.47}
            discount={16.17}
          />
        </Grid>
      </Grid>

      <Button
        component={RouterLink}
        href={"/products"}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 3 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
