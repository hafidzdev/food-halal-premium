import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Card,
  Popover,
  Stack,
  MenuItem,
  Typography,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import Iconify from "@/components/partials/Iconify";
import { RouterLink } from "@/routes/components";
import { ConfirmDialog, CreateCart } from "@/components/partials/modal";
import { DeleteCart, GetAllCart } from "@/services/Purchase";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";
import { useCart } from "@/context/CartContext";
import { fDate } from "@/utils/format-time";
import { useBoolean } from "@/hooks/use-boolean";
import Label from "@/components/partials/label/label";

const CartUser = ({ cart }) => {
  const [, setCart] = useCart();

  const [open, setOpen] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [snackbars, setSnackbars] = useState([]);
  const editDialog = useBoolean(false);

  const [isIconButtonHovered, setIsIconButtonHovered] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleOpen = useCallback((event) => {
    setScrollPosition(window.scrollY);
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(
    (event) => {
      event.preventDefault;
      window.scrollTo(0, scrollPosition);
      setOpen(null);
    },
    [scrollPosition]
  );

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

  const editIsSuccess = (msg) => {
    editDialog.onFalse();
    setSnackbars((prevSnackbars) => [
      ...prevSnackbars,
      {
        id: Date.now(),
        message: msg,
        severity: "success",
      },
    ]);
    router.push(`/cart`);
    setOpen(null);
  };

  const handleCloseSnackbar = (id) => {
    setSnackbars((prevSnackbars) =>
      prevSnackbars.filter((snackbar) => snackbar.id !== id)
    );
  };

  const {
    id,
    receiveName,
    emailAddress,
    phoneNumber,
    receiveTime,
    deliveryAddress,
    status,
    totalPrice,
    totalProducts,
    postalCode,
    paymentType,
    deliveryType,
    deliveryCondition,
  } = cart;

  return (
    <>
      <Link
        component={RouterLink}
        color="inherit"
        underline="none"
        href={isIconButtonHovered ? "/cart" : `/cart/${id}`}
      >
        <Card
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? "grey.200" : "",
            "&:hover": {
              boxShadow: (theme) => theme.customShadows.z24,
            },
          }}
        >
          <Stack direction="row" alignItems="flex-start" flexGrow={1}>
            {status === "new" ? (
              <Label
                color="success"
                startIcon={<Iconify icon="lets-icons:order-fill" />}
                sx={{ ml: 2.8, mt: 3 }}
              >
                New
              </Label>
            ) : (
              <Label
                color="warning"
                startIcon={<Iconify icon="lets-icons:order-fill" />}
                sx={{ ml: 2.8, mt: 3 }}
              >
                Order
              </Label>
            )}
          </Stack>
          <IconButton
            onClick={handleOpen}
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              pointerEvents: "auto",
            }}
            onMouseEnter={() => setIsIconButtonHovered(true)}
            onMouseLeave={() => setIsIconButtonHovered(false)}
          >
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>

          <Stack sx={{ p: 3, pb: 0 }}>
            <Stack spacing={0.5} sx={{ mt: 3, mb: 2 }}>
              <Typography variant="h6" line={1}>
                {receiveName}
              </Typography>

              <Typography variant="body2" sx={{ color: "info.main" }}>
                {emailAddress}
              </Typography>

              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2", color: "text.secondary" }}
              >
                <Iconify icon="carbon:phone" width={18} sx={{ mr: 0.5 }} />
                {phoneNumber}
              </Stack>
            </Stack>

            <Typography
              variant="caption"
              sx={{ color: "text.secondary", fontWeight: 700 }}
            >
              Delivery Address:
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {deliveryAddress} - {postalCode}
            </Typography>
          </Stack>

          <Divider sx={{ borderStyle: "dashed", my: 2 }} />

          <Grid
            container
            spacing={1}
            sx={{
              p: 3,
              pt: 0,
              typography: "body2",
              color: "text.secondary",
              textTransform: "capitalize",
            }}
          >
            <Grid item xs={6} marginY={0.3}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2" }}
              >
                <Iconify icon="carbon:time" sx={{ mr: 1 }} />
                {fDate(receiveTime)}
              </Stack>
            </Grid>

            <Grid item xs={6} marginY={0.3}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2", ml: 4 }}
              >
                <Iconify icon="carbon:purchase" sx={{ mr: 1 }} />

                {paymentType}
              </Stack>
            </Grid>

            <Grid item xs={6} marginY={0.3}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2" }}
              >
                <Iconify icon="carbon:delivery" sx={{ mr: 1 }} />

                {deliveryType}
              </Stack>
            </Grid>

            <Grid item xs={6} marginY={0.3}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2", ml: 4 }}
              >
                <Iconify icon="carbon:delivery-parcel" sx={{ mr: 1 }} />

                {deliveryCondition}
              </Stack>
            </Grid>

            <Grid item xs={6} marginY={0.3}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2" }}
              >
                <Iconify icon="fluent-mdl2:product" sx={{ mr: 1 }} />
                {totalProducts} products
              </Stack>
            </Grid>

            <Grid item xs={6} marginY={0.3}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{ typography: "body2", ml: 4 }}
              >
                <Iconify icon="carbon:money" sx={{ mr: 1 }} />¥{totalPrice}
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Link>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={() => editDialog.onTrue()}>
          <Iconify icon="tabler:edit" sx={{ mr: 2 }} /> Edit
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed", mt: 0.5 }} />

        <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 2 }} /> Delete
        </MenuItem>
      </Popover>

      <CreateCart
        open={editDialog.value}
        onClose={() => editDialog.onFalse()}
        setResult={editIsSuccess}
        cartId={id}
        editValue={cart}
      />

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
    id: PropTypes.string,
    receiveName: PropTypes.string,
    emailAddress: PropTypes.string,
    phoneNumber: PropTypes.number,
    receiveTime: PropTypes.string,
    deliveryAddress: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.number,
    totalProducts: PropTypes.number,
    postalCode: PropTypes.number,
    paymentType: PropTypes.string,
    deliveryType: PropTypes.string,
    deliveryCondition: PropTypes.string,
  }),
};

export default CartUser;
