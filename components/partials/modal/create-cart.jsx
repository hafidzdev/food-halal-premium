"use client";

import PropTypes from "prop-types";
import { memo, useCallback, useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

import Iconify from "../Iconify";
import { useResponsive } from "@/hooks/use-responsive";
import FilterTime from "@/sections/products/filters/filter-time";
import { useSession } from "next-auth/react";
import { CreateShopCart, GetAllCart } from "@/services/Purchase";
import { LoadingButton } from "@mui/lab";
import { useCart } from "@/context/CartContext";

const CreateCart = memo(({ open, onClose, setResult }) => {
  const { data: session } = useSession();
  const [, setCart] = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const mdUp = useResponsive("up", "md");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const allData = {
      receiveName: data.get("name"),
      phoneNumber: data.get("phone"),
      deliveryAddress: data.get("address"),
      postalCode: data.get("postCode"),
      paymentType: data.get("paymentType"),
      deliveryType: data.get("deliveryType"),
      deliveryCondition: data.get("delivaryCondition"),
      emailAddress: session?.user?.email,
      receiveTime: date,
      note: data.get("note"),
    };

    try {
      setLoading(true);
      setError(null);

      const res = await CreateShopCart(allData);

      if (res.status === 200) {
        const getAllCart = await GetAllCart();
        setCart(getAllCart);
        setResult(`Success create new cart "${allData.receiveName}"`);
      } else {
        setError(`Error ${res?.status}: ${res?.message}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDate = useCallback((newValue) => {
    setDate(newValue);
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <IconButton
        size="large"
        onClick={onClose}
        sx={{
          top: 10,
          right: mdUp ? 5 : 25,
          zIndex: 9,
          position: "absolute",
          color: (theme) => alpha(theme.palette.text.primary, 0.72),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.text.primary, 0.16),
          },
        }}
      >
        <Iconify icon="carbon:close-filled" width={24} />
      </IconButton>
      <DialogTitle>
        <Typography color="textPrimary" gutterBottom>
          Create Cart
        </Typography>
        {error !== "" && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent dividers sx={{ p: 3 }}>
        <Box component="form" noValidate onSubmit={handleOnSubmit}>
          <Stack spacing={2.5} marginBottom={6}>
            <TextField
              name="name"
              label="Name"
              placeholder="Enter Your Name"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: {
                  "&::placeholder": {
                    fontWeight: "bold",
                  },
                },
              }}
            />
            <TextField
              name="phone"
              label="Phone Number"
              placeholder="Phone Number"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="address"
              label="Address"
              placeholder="Enter Address"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />{" "}
            <TextField
              name="postCode"
              label="Post Code"
              placeholder="Enter Post Code"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field">Payment Type</InputLabel>
              <Select
                name="paymentType"
                label="Payment Type"
                id="option-field"
                defaultValue="cod"
              >
                <MenuItem value="cod">COD</MenuItem>
                <MenuItem value="transfer">Transfer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field2">Delivery Type</InputLabel>
              <Select
                name="deliveryType"
                label="option-field-label2"
                id="option-field"
                defaultValue="pos"
              >
                <MenuItem value="pos">POS</MenuItem>
                <MenuItem value="pickup">Pickup</MenuItem>
                <MenuItem value="shop_delivery">Shop Delivery</MenuItem>
                <MenuItem value="delivery_service">Delivery Service</MenuItem>
              </Select>
            </FormControl>{" "}
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field3">
                Delivery Condition
              </InputLabel>
              <Select
                name="delivaryCondition"
                label="option-field-label3"
                id="option-field"
                defaultValue="standard"
              >
                <MenuItem value="standard">Standard</MenuItem>
                <MenuItem value="refrigerated">Refrigerated</MenuItem>
                <MenuItem value="frozen">Frozen</MenuItem>
              </Select>
            </FormControl>
            <Box
              sx={{
                py: 0.5,
                px: 1.5,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              }}
            >
              <FilterTime date={date} onChangeDate={handleChangeDate} />
            </Box>
            <TextField
              name="email"
              label="Email"
              value={session?.user?.email}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <TextField
              name="note"
              label="Note"
              placeholder="Enter Note"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={4}
            />
          </Stack>
          <Box
            sx={{
              mt: 2,
              px: 5,
              py: 2,
              zIndex: 2,
              width: "90%",
              position: "absolute",
              bottom: 0,
              bgcolor: "background.paper",
            }}
          >
            <LoadingButton
              loading={loading ? true : false}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              <span>{loading ? "Loading..." : "Create"}</span>
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
});

CreateCart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  setResult: PropTypes.func.isRequired,
};

export default CreateCart;
