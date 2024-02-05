"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import { Stack, Box, Typography } from "@mui/material";

import { useCart } from "@/context/CartContext";
// import { RouterLink } from "@/routes/components";

import Iconify from "@/components/partials/Iconify";

// import CartList from "../cart/cart-list";
// import CartSummary from "../cart/cart-summary";
import CartUser from "../cart/cart-user";
import { CreateCart } from "@/components/partials/modal";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";

// ----------------------------------------------------------------------

export default function CartView() {
  const [cart] = useCart();

  const [open, setOpen] = useState(false);
  const [openModalCreateCart, setOpenModalCreateCart] = useState({
    isOpen: false,
    isSuccess: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenSuccessAlert = (msg) => {
    handleClose();
    setOpenModalCreateCart({ isOpen: true, isSuccess: msg });
  };
  const handleCloseSuccessAlert = () =>
    setOpenModalCreateCart({ isOpen: false, isSuccess: "" });

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
            {cart.map((item) => (
              <CartUser key={item.id} cart={item} />
            ))}
          </Box>
        </Grid>
      </Grid>

      <CreateCart
        open={open}
        onClose={handleClose}
        setResult={handleOpenSuccessAlert}
      />

      <SnackbarMessage
        open={openModalCreateCart.isOpen}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        message={openModalCreateCart.isSuccess}
        severity="success"
      />
    </Container>
  );
}
