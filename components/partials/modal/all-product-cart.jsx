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
  const handleOpenSuccessAlert = (msg) =>
    setOpenModalCreateCart({ isOpen: true, isSuccess: msg });
  const handleCloseSuccessAlert = () =>
    setOpenModalCreateCart((prev) => ({ ...prev, isSuccess: "" }));

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
      <Collapse in={openModalCreateCart.isSuccess !== ""}>
        <Alert
          severity="success"
          sx={{ mt: 1 }}
          onClose={handleCloseSuccessAlert}
        >
          {openModalCreateCart.isSuccess}
        </Alert>
      </Collapse>
      <CreateCart
        open={openModalCreateCart.isOpen}
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
