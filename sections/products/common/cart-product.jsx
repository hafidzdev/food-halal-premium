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
  Button,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { RouterLink } from "@/routes/components";
import Image from "@/components/partials/image";
import ProductPrice from "./product-price";
import Iconify from "@/components/partials/Iconify";
import { ConfirmDialog } from "@/components/partials/modal";
import { DeleteProductInCart, UpdateProductInCart } from "@/services/Purchase";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";
import Label from "@/components/partials/label/label";

// ----------------------------------------------------------------------

export default function CartProduct({ productCart, refetchData }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const [openConfirmDelete, setOpenConfirmDelete] = useState({
    isOpen: false,
    productData: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbars, setSnackbars] = useState([]);

  const handleUpdateAmount = async (product, isUp) => {
    const newAmount = isUp ? product.amount + 1 : product.amount - 1;

    try {
      setLoading(true);
      const res = await UpdateProductInCart(product, newAmount);

      if (res?.status === 200) {
        refetchData();
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: "Successfully update product",
            severity: "success",
          },
        ]);
      } else {
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: res?.message,
            severity: "error",
          },
        ]);
      }
    } catch (error) {
      setSnackbars((prevSnackbars) => [
        ...prevSnackbars,
        {
          id: Date.now(),
          message: error?.message,
          severity: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConfirmDelete = (data) =>
    setOpenConfirmDelete({ isOpen: true, productData: { ...data } });
  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete((prev) => ({ ...prev, isOpen: false }));
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await DeleteProductInCart(
        openConfirmDelete?.productData?.cartId,
        openConfirmDelete?.productData?.id
      );

      if (res?.status === 200) {
        refetchData();
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: "Successfully product in cart",
            severity: "success",
          },
        ]);
      } else {
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: res?.message,
            severity: "error",
          },
        ]);
      }
    } catch (error) {
      setSnackbars((prevSnackbars) => [
        ...prevSnackbars,
        {
          id: Date.now(),
          message: error?.message,
          severity: "error",
        },
      ]);
    } finally {
      setOpenConfirmDelete((prev) => ({ ...prev, productData: "" }));
      setLoading(false);
    }
  };

  const handleCloseSnackbar = (id) => {
    setSnackbars((prevSnackbars) =>
      prevSnackbars.filter((snackbar) => snackbar.id !== id)
    );
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
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          {productCart?.map((product, index) => (
            <Paper
              variant="outlined"
              sx={{
                p: 1,
                borderRadius: 2,
                boxShadow: isLight
                  ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
                  : "0px 4px 10px rgba(0, 0, 0, 0.5)",

                transition: (theme) =>
                  theme.transitions.create("background-color", {
                    easing: theme.transitions.easing.easeIn,
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
              key={index}
            >
              <Box
                sx={{
                  position: "relative",
                }}
              >
                <Link
                  component={RouterLink}
                  href={`/product/${product?.productId}`}
                  color="inherit"
                  underline="none"
                >
                  <Image
                    src={product?.productImage}
                    sx={{
                      mb: 2,
                      borderRadius: 1,
                      width: "100%",
                      height: "120px",
                    }}
                  />
                </Link>

                <Label color="success" sx={{ mb: 1 }}>
                  Stock: {product?.currentStock > 0 ? product?.currentStock : 0}
                </Label>

                <Stack>
                  <Link
                    component={RouterLink}
                    href={`/product/${product?.productId}`}
                    color="inherit"
                    underline="none"
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "fontWeightMedium" }}
                    >
                      {product?.productName}
                    </Typography>
                  </Link>

                  <ProductPrice price={product?.price} />
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      border: 1,
                      lineHeight: 0,
                      borderRadius: 1,
                      display: "flex",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      borderColor: "grey.600",
                    }}
                  >
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleUpdateAmount(product, false)}
                      disabled={product?.amount === 1}
                    >
                      <Iconify
                        icon="simple-line-icons:minus"
                        width={16}
                        height={16}
                      />
                    </IconButton>
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{
                        width: 40,
                        textAlign: "center",
                        display: "inline-block",
                      }}
                    >
                      {product?.amount || 0}
                    </Typography>
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => handleUpdateAmount(product, true)}
                      disabled={product?.amount >= product?.currentStock}
                    >
                      <Iconify icon="carbon:add-alt" width={16} height={16} />
                    </IconButton>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenConfirmDelete(product)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <ConfirmDialog
        open={openConfirmDelete.isOpen}
        onClose={handleCloseConfirmDelete}
        onAgree={handleDelete}
        title="Menghapus Product"
        description={`Apakah Anda yakin ingin menghapus product ini didalam keranjang? Anda tidak dapat memulihkannya kembali.`}
      />

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {snackbars.map((snackbar) => (
        <SnackbarMessage
          key={snackbar.id}
          open={true}
          autoHideDuration={4000}
          onClose={() => handleCloseSnackbar(snackbar.id)}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      ))}
    </>
  );
}

CartProduct.propTypes = {
  productCart: PropTypes.array.isRequired,
  refetchData: PropTypes.func.isRequired,
};
