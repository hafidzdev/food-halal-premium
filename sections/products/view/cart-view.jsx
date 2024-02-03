"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import { Stack, Box, Typography } from "@mui/material";

// import { useCart } from "@/context/CartContext";
// import { RouterLink } from "@/routes/components";

import Iconify from "@/components/partials/Iconify";

// import CartList from "../cart/cart-list";
// import CartSummary from "../cart/cart-summary";
import CartUser from "../cart/cart-user";
import { CreateCart } from "@/components/partials/modal";

// ----------------------------------------------------------------------

const cartData = [
  {
    id: 1,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
  {
    id: 2,
    name: "Agus Setiawan",
    code: "9999CB9999CB",
  },
];

export default function CartView() {
  // const [cart] = useCart();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: { xs: 5, md: 7 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={8} lg={12}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 5 }}
          >
            <Typography variant="h5" alignItems={"center"}>
              Cart List
            </Typography>

            <Button
              variant="contained"
              size="medium"
              color="primary"
              startIcon={<Iconify icon="carbon:add" />}
              onClick={handleOpen}
            >
              Create Cart
            </Button>
          </Stack>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, md: 4 },
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                lg: "repeat(4, 1fr)",
              },
            }}
          >
            {cartData.map((cart) => (
              <CartUser key={cart.id} cart={cart} />
            ))}
          </Box>
        </Grid>
      </Grid>

      <CreateCart open={open} onClose={handleClose} />
    </Container>
  );
}
