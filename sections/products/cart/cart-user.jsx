import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Popover,
  Divider,
  Stack,
  MenuItem,
  IconButton,
  Box,
  Paper,
  useTheme,
  Link,
} from "@mui/material";
import Iconify from "@/components/partials/Iconify";
import { RouterLink } from "@/routes/components";
import { ConfirmDialog } from "@/components/partials/modal";
import { DeleteCart, GetAllCart } from "@/services/Purchase";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";
import { useCart } from "@/context/CartContext";

const CartUser = ({ cart }) => {
  const [, setCart] = useCart();

  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [snackbars, setSnackbars] = useState([]);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleDelete = useCallback(() => {
    handleClose();
    handleOpenConfirmDelete();
  }, []);

  const handleOpenConfirmDelete = useCallback(() => {
    setOpenConfirmDelete(true);
  }, []);
  const handleCloseConfirmDelete = useCallback(() => {
    setOpenConfirmDelete(false);
  }, []);

  const handleConfirmation = useCallback(async () => {
    const res = await DeleteCart(id);

    if (res?.status === 200) {
      const getAllCart = await GetAllCart();
      setCart(getAllCart);
      setSnackbars((prevSnackbars) => [
        ...prevSnackbars,
        {
          id: Date.now(),
          message: "Successfully delete your cart",
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
  }, []);

  const handleCloseSnackbar = (id) => {
    setSnackbars((prevSnackbars) =>
      prevSnackbars.filter((snackbar) => snackbar.id !== id)
    );
  };

  const { id, receiveName, paymentType } = cart;

  return (
    <>
      <Paper
        variant={isLight ? "outlined" : "elevation"}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          boxShadow: isLight
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: isLight ? "#DFE3E8" : "",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: "subtitle1" }}
          spacing={4}
        >
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <Box component="span">
              {receiveName}
              <Typography variant="body2">{paymentType}</Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </Stack>
      </Paper>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Link
          component={RouterLink}
          color="inherit"
          underline="none"
          href={`/cart/${id}`}
        >
          <MenuItem onClick={handleClose}>
            <Iconify icon="carbon:accessibility-color-filled" sx={{ mr: 2 }} />{" "}
            Details
          </MenuItem>
        </Link>

        <Divider sx={{ borderStyle: "dashed", mt: 0.5 }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 2 }} /> Delete
        </MenuItem>
      </Popover>

      <ConfirmDialog
        open={openConfirmDelete}
        onClose={handleCloseConfirmDelete}
        onAgree={handleConfirmation}
        title="Menghapus Keranjang"
        description={`Apakah Anda yakin ingin menghapus keranjang "${receiveName}"? Anda tidak dapat memulihkannya kembali.`}
      />

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
};

CartUser.propTypes = {
  cart: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  }),
};

export default CartUser;
