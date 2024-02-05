"use client";

import { memo, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../Iconify";
import { AllProductCart } from ".";
import { LoadingButton } from "@mui/lab";
import { AddProductToCart } from "@/services/Purchase";

const AddProductCartDialog = memo(({ open, onClose }) => {
  const product = open?.product;

  const [order, setOrder] = useState(1);
  const [idCart, setIdCart] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIncrement = () => {
    if (product?.inStock > order) setOrder((prevOrder) => prevOrder + 1);
  };

  const handleDecrement = () => {
    if (order > 1) setOrder((prevOrder) => prevOrder - 1);
  };

  const handleChooseCart = (value) => setIdCart(value);

  const handleClose = () => {
    setOrder(1);
    onClose();
  };

  const handleAgree = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await AddProductToCart(idCart, product?.id, order);

      if (res?.status === 200) {
        onClose("success");
      } else {
        setError(`Error ${res?.status}: ${res?.message}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open.isOpen} fullWidth={false} maxWidth="sm">
      <DialogTitle>
        Add Product to Cart
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Anda akan menambahkan produk ini ke dalam cart:
        </DialogContentText>
        <Grid container alignItems="center" sx={{ my: 2 }}>
          <Grid item xs={2}>
            Name
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={9}>
            {product?.name}
          </Grid>

          <Grid item xs={2}>
            Price
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={9}>
            {product?.price}
          </Grid>

          <Grid item xs={2}>
            Amount
          </Grid>
          <Grid item xs={1}>
            :
          </Grid>
          <Grid item xs={9}>
            <Stack direction="row" alignItems="center" sx={{ mt: 1 }}>
              <IconButton
                color="success"
                onClick={handleDecrement}
                disabled={order === 1}
              >
                <Iconify
                  icon="simple-line-icons:minus"
                  width={16}
                  height={16}
                />
              </IconButton>
              <span style={{ margin: "0 10px" }}>{order}</span>
              <IconButton
                color="success"
                onClick={handleIncrement}
                disabled={product?.inStock === order}
              >
                <Iconify icon="carbon:add-alt" width={16} height={16} />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <DialogContentText>Pilih keranjang:</DialogContentText>
        <AllProductCart selectedCart={handleChooseCart} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} sx={{ mt: 2, mx: 1 }}>
          Cancel
        </Button>
        <LoadingButton
          loading={loading ? true : false}
          fullWidth
          type="submit"
          variant="contained"
          color="success"
          onClick={handleAgree}
          autoFocus
          sx={{ mt: 2, mx: 1 }}
          disabled={order < 1 || !idCart}
        >
          <span>{loading ? "Loading..." : "Add Product to Cart"}</span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
});

AddProductCartDialog.propTypes = {
  open: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    product: PropTypes.object,
  }),
  onClose: PropTypes.func.isRequired,
};

export default AddProductCartDialog;
