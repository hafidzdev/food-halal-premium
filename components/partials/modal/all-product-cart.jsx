import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Grid, IconButton, Stack, Typography } from "@mui/material";
import Iconify from "../Iconify";
import { GetAllCart } from "@/services/Purchase";
import { useCart } from "@/context/CartContext";
import { CreateCart } from ".";

const AllProductCart = memo(({ open, onClose }) => {
  const [cart] = useCart();
  console.log(cart);

  const [openModalCreateCart, setOpenModalCreateCart] = useState(false);

  const handleOpenCreateModal = () => setOpenModalCreateCart(true);
  const handleCloseCreateModal = () => setOpenModalCreateCart(false);

  const handleClose = () => {
    setOrder(1);
    onClose();
  };
  const handleAgree = () => {
    // onAgree();
    onClose();
  };

  if (cart.length === 0) {
    return (
      <>
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={handleOpenCreateModal}
            >
              CREATE
            </Button>
          }
        >
          Don't have a shopping basket yet? Let's create it now
        </Alert>
        <CreateCart
          open={openModalCreateCart}
          onClose={handleCloseCreateModal}
        />
      </>
    );
  }

  return <p>Your List Cart</p>;
});
// <Dialog open={open.isOpen} fullWidth={false} maxWidth="sm">
//   <DialogTitle>Add Product to Cart</DialogTitle>
//   <DialogContent>
//     <DialogContentText>
//       Anda akan menambahkan produk ini ke dalam cart:
//     </DialogContentText>
//   </DialogContent>
//   <DialogActions>
//     <Button color="primary" onClick={handleClose} sx={{ mt: 2, mx: 1 }}>
//       Batal
//     </Button>
//     <Button
//       variant="contained"
//       color="success"
//       onClick={handleAgree}
//       autoFocus
//       sx={{ mt: 2, mx: 1 }}
//     >
//       Add Product
//     </Button>
//   </DialogActions>
// </Dialog>

// AllProductCart.propTypes = {
//   open: PropTypes.shape({
//     isOpen: PropTypes.bool.isRequired,
//     product: PropTypes.object,
//   }),
//   onClose: PropTypes.func.isRequired,
// };

export default AllProductCart;
