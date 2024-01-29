"use client";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useCart } from "@/context/CartContext";

import { RouterLink } from "@/routes/components";

import Iconify from "@/components/partials/Iconify";

import CartList from "../cart/cart-list";
import CartSummary from "../cart/cart-summary";

// ----------------------------------------------------------------------

export default function CartView() {
  const [cart] = useCart();

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
          <CartList products={cart} />
        </Grid>

        <Grid xs={12} md={4}>
          <CartSummary products={cart} tax={0} shipping={0} discount={0} />
        </Grid>
      </Grid>

      <Button
        component={RouterLink}
        href={"/product"}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 3 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}
