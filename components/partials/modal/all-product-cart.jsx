"use client";

import { memo, useState } from "react";
import PropTypes from "prop-types";
import {
  Alert,
  Button,
  Collapse,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import { CreateCart } from ".";

const AllProductCart = memo(({ selectedCart }) => {
  const [cart] = useCart();

  const [openModalCreateCart, setOpenModalCreateCart] = useState(false);
  const [successAlert, setSuccessAlert] = useState({
    isOpen: false,
    message: "",
  });
  const [chooseCart, setChooseCart] = useState("");

  const handleChangeChooseCart = (event) => {
    setChooseCart(event.target.value);
    selectedCart(event.target.value);
  };

  const handleOpenCreateModal = () => setOpenModalCreateCart(true);
  const handleCloseCreateModal = () => setOpenModalCreateCart(false);
  const handleOpenSuccessAlert = (msg) =>
    setSuccessAlert({ isOpen: true, message: msg });
  const handleCloseSuccessAlert = () =>
    setSuccessAlert({ isOpen: false, message: "" });

  if (cart.length === 0) {
    return (
      <>
        <Alert
          severity="warning"
          sx={{ my: 1 }}
          action={
            <Button
              variant="contained"
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
          setResult={handleOpenSuccessAlert}
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
      <Collapse in={successAlert.isOpen}>
        <Alert
          severity="success"
          sx={{ mt: 1 }}
          onClose={handleCloseSuccessAlert}
        >
          {successAlert.message}
        </Alert>
      </Collapse>
      <CreateCart
        open={openModalCreateCart}
        onClose={handleCloseCreateModal}
        setResult={handleOpenSuccessAlert}
      />
    </>
  );
});

AllProductCart.propTypes = {
  selectedCart: PropTypes.func.isRequired,
};

export default AllProductCart;
