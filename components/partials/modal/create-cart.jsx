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
import { CreateShopCart, GetAllCart, UpdateCart } from "@/services/Purchase";
import { LoadingButton } from "@mui/lab";
import { useCart } from "@/context/CartContext";

const filterKeys = (responseObject) => {
  return {
    receiveName: responseObject?.receiveName,
    phoneNumber: responseObject?.phoneNumber?.toString(),
    deliveryAddress: responseObject?.deliveryAddress,
    postalCode: responseObject?.postalCode?.toString(),
    paymentType: responseObject?.paymentType,
    deliveryType: responseObject?.deliveryType,
    deliveryCondition: responseObject?.deliveryCondition,
    emailAddress: responseObject?.emailAddress,
    receiveTime: responseObject?.receiveTime,
    note: responseObject?.note,
  };
};

const CreateCart = memo(({ open, onClose, setResult, cartId, editValue }) => {
  const { data: session } = useSession();
  const [, setCart] = useCart();
  const initializeData = cartId ? filterKeys(editValue) : {};

  const [formData, setFormData] = useState(initializeData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const mdUp = useResponsive("up", "md");

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const allData = {
      ...formData,
      emailAddress: session?.user?.email,
      receiveTime: date,
    };

    try {
      setLoading(true);
      setError(null);

      const res = cartId
        ? await UpdateCart(cartId, allData)
        : await CreateShopCart(allData);

      if (res.status === 200) {
        const getAllCart = await GetAllCart();
        setCart(getAllCart);
        setResult(
          `Success ${cartId ? "update" : "create new"} cart "${
            allData?.receiveName
          }"`
        );
      } else {
        setError(`Error ${res?.status}: ${res?.message}`);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setError(null);
    setFormData({});
    onClose();
  };

  const handleChangeDate = useCallback((newValue) => {
    setDate(newValue);
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <IconButton
        size="large"
        onClick={handleCloseDialog}
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
              name="receiveName"
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
              value={formData?.receiveName || ""}
              onChange={handleChangeData}
            />
            <TextField
              name="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData?.phoneNumber || ""}
              onChange={handleChangeData}
            />
            <TextField
              name="deliveryAddress"
              label="Address"
              placeholder="Enter Address"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData?.deliveryAddress || ""}
              onChange={handleChangeData}
            />{" "}
            <TextField
              name="postalCode"
              label="Post Code"
              placeholder="Enter Post Code"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formData?.postalCode || ""}
              onChange={handleChangeData}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field">Payment Type</InputLabel>
              <Select
                name="paymentType"
                label="Payment Type"
                id="option-field"
                value={formData?.paymentType || ""}
                onChange={handleChangeData}
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
                value={formData?.deliveryType || ""}
                onChange={handleChangeData}
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
                name="deliveryCondition"
                label="option-field-label3"
                id="option-field"
                value={formData?.deliveryCondition || ""}
                onChange={handleChangeData}
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
              name="emailAddress"
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
              value={formData?.note || ""}
              onChange={handleChangeData}
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
  cartId: PropTypes.string,
  editValue: PropTypes.object,
};

export default CreateCart;
