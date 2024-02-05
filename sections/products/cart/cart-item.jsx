/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";
import { useState } from "react";

import { DeleteCart, GetAllCart, UpdateCart } from "@/services/Purchase";
import { useCart } from "@/context/CartContext";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { fCurrency } from "@/utils/format-number";

import Image from "@/components/partials/image";
import Iconify from "@/components/partials/Iconify";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";

// ----------------------------------------------------------------------

export default function CartItem({ product, wishlist }) {
  const [, setCart] = useCart();
  const [quantity, setQuantity] = useState(product.quantity);
  const [snackbars, setSnackbars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const handleCloseSnackbar = (id) => {
    setSnackbars((prevSnackbars) =>
      prevSnackbars.filter((snackbar) => snackbar.id !== id)
    );
  };

  const handleUpdateCart = async (event) => {
    try {
      setLoading(true);

      const updateCartQty = await UpdateCart(product.id, event.target.value);
      if (updateCartQty.status === 200) {
        const getAllCart = await GetAllCart();
        setCart(getAllCart);
        setQuantity(event.target.value);

        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: "Successfully update product quantity",
            severity: "success",
          },
        ]);
      } else {
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: updateCartQty.message,
            severity: "error",
          },
        ]);
      }
    } catch (error) {
      setSnackbars((prevSnackbars) => [
        ...prevSnackbars,
        {
          id: Date.now(),
          message: "An error occurred while processing the request",
          severity: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCart = async () => {
    try {
      setLoading(true);
      const deleteCart = await DeleteCart(product.id);

      if (deleteCart.status === 200) {
        const getAllCart = await GetAllCart();
        setCart(getAllCart);
      }
    } catch (error) {
      console.error(`Deleting cart unsuccessfull: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConfirmDialog = () => setConfirmDialog(true);
  const handleCloseConfirmDialog = () => setConfirmDialog(false);

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        py: 3,
        minWidth: 720,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Image
          src={product.thumbnail}
          sx={{
            width: 80,
            height: 80,
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: "background.neutral",
          }}
        />
        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Typography variant="subtitle2">{product.name}</Typography>
        </Stack>
      </Stack>

      <Stack sx={{ width: 120 }}>
        <FormControl sx={{ width: "70%" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            size="small"
            value={quantity}
            label="Qty"
            onChange={handleUpdateCart}
            sx={{ pb: 2, maxHeight: 45 }}
          >
            {[...Array(product.status.quantity)].map((_, index) => (
              <MenuItem key={index} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <TextField
          select
          size="small"
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
          inputRef={textFieldRef}
          value={product.quantity}
          onChange={handleUpdateCart}
        >
          {[...Array(product.status.quantity)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </TextField> */}
      </Stack>

      <Stack sx={{ width: 120, typography: "subtitle2" }}> - </Stack>

      <Stack sx={{ width: 120, typography: "subtitle2" }}>
        {" "}
        {fCurrency(product.sub_total_price)}{" "}
      </Stack>

      <IconButton onClick={handleOpenConfirmDialog}>
        <Iconify icon="carbon:trash-can" />
      </IconButton>

      {wishlist && (
        <IconButton>
          <Iconify icon="carbon:shopping-cart-plus" />
        </IconButton>
      )}

      {/* Confirm Dialog */}
      <Dialog open={confirmDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product in your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            variant="contained"
            onClick={handleCloseConfirmDialog}
            color="warning"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant="contained"
            onClick={handleDeleteCart}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Loader */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Notification PopUp */}
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
    </Stack>
  );
}

CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.string, // Assuming it's a URL to an image, could be null
    }).isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      image: PropTypes.string, // Assuming it's a URL to an image, could be null
    }).isRequired,
    role: PropTypes.string.isRequired,
    product_id: PropTypes.string.isRequired,
    product_slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    storefronts: PropTypes.arrayOf(PropTypes.object).isRequired,
    thumbnail: PropTypes.string.isRequired, // Assuming it's a URL to an image
    quantity: PropTypes.number.isRequired,
    delivery_weight: PropTypes.number, // Could be null
    status: PropTypes.shape({
      availability: PropTypes.bool.isRequired,
      quantity: PropTypes.number.isRequired,
    }).isRequired,
    sub_total_price: PropTypes.number.isRequired,
  }),
  wishlist: PropTypes.bool,
};
