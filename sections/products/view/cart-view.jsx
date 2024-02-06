"use client";

import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import { Stack, Box, Typography } from "@mui/material";
import Iconify from "@/components/partials/Iconify";
import { useBoolean } from "@/hooks/use-boolean";

import { useCart } from "@/context/CartContext";
import CartUser from "../cart/cart-user";
import { CreateCart } from "@/components/partials/modal";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";
import CartListSkeleton from "../skeleton/cart-list-skeleton";

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

  const loading = useBoolean(true);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      loading.onFalse();
    };
    fakeLoading();
  }, []);

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
              columnGap: 4,
              display: "grid",
              rowGap: { xs: 4, md: 5 },
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
            }}
          >
            {loading.value
              ? [...Array(3)].map((_, index) => (
                  <CartListSkeleton key={index} />
                ))
              : cart.length > 0
              ? cart.map((item, index) => <CartUser key={index} cart={item} />)
              : "No Matching Data! "}
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
