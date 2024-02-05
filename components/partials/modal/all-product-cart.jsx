import { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Alert,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../Iconify";
import { GetAllCart } from "@/services/Purchase";
import { useCart } from "@/context/CartContext";
import { CreateCart } from ".";

const AllProductCart = memo(({ selectedCart }) => {
  const [cart] = useCart();

  const [openModalCreateCart, setOpenModalCreateCart] = useState({
    isOpen: false,
    isSuccess: "",
  });
  const [chooseCart, setChooseCart] = useState("");

  const handleChangeChooseCart = (event) => {
    setChooseCart(event.target.value);
    selectedCart(event.target.value);
  };

  const handleOpenCreateModal = () =>
    setOpenModalCreateCart({ isOpen: true, isSuccess: "" });
  const handleCloseCreateModal = () =>
    setOpenModalCreateCart({ isOpen: false, isSuccess: "" });
  const handleSuccessCreateModal = (msg) =>
    setOpenModalCreateCart({ isOpen: false, isSuccess: msg });

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
          open={openModalCreateCart.isOpen}
          onClose={handleCloseCreateModal}
          setResult={handleSuccessCreateModal}
        />
      </>
    );
  }

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
        <InputLabel htmlFor="option-field">My Cart</InputLabel>
        <Select
          label="My Cart"
          id="option-field"
          value={chooseCart}
          onChange={handleChangeChooseCart}
        >
          {cart.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.receiveName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ mt: 1 }}
      >
        <Typography>Or</Typography>
        <Button variant="outlined" onClick={handleOpenCreateModal}>
          Creat New Cart
        </Button>
      </Stack>
      <Alert
        severity="success"
        sx={{
          visibility:
            openModalCreateCart.isSuccess !== "" ? "visible" : "hidden",
        }}
      >
        {openModalCreateCart.isSuccess}
      </Alert>
      <CreateCart
        open={openModalCreateCart.isOpen}
        onClose={handleCloseCreateModal}
        setResult={handleSuccessCreateModal}
      />
    </>
  );
});

export default AllProductCart;
