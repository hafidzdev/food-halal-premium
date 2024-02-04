import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import Iconify from "../Iconify";
import { AllProductCart } from ".";

const AddProductCartDialog = memo(({ open, onClose }) => {
  const product = open?.product;

  const [order, setOrder] = useState(1);

  const handleIncrement = () => {
    if (product?.inStock > order) setOrder((prevOrder) => prevOrder + 1);
  };

  const handleDecrement = () => {
    if (order > 1) setOrder((prevOrder) => prevOrder - 1);
  };

  const handleClose = () => {
    setOrder(1);
    onClose();
  };
  const handleAgree = () => {
    // onAgree();
    onClose();
  };
  return (
    <Dialog open={open.isOpen} fullWidth={false} maxWidth="sm">
      <DialogTitle>Add Product to Cart</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Anda akan menambahkan produk ini ke dalam cart:
        </DialogContentText>
        <Grid container alignItems="center" sx={{ mt: 2 }}>
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
                  width="16"
                  height="16"
                />
              </IconButton>
              <span style={{ margin: "0 10px" }}>{order}</span>
              <IconButton
                color="success"
                onClick={handleIncrement}
                disabled={product?.inStock === order}
              >
                <Iconify icon="carbon:add-alt" width="16" height="16" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

        <AllProductCart />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose} sx={{ mt: 2, mx: 1 }}>
          Batal
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleAgree}
          autoFocus
          sx={{ mt: 2, mx: 1 }}
        >
          Add Product
        </Button>
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
