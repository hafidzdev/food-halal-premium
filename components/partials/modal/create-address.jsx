"use client";

import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

import Iconify from "../Iconify";
import { useResponsive } from "@/hooks/use-responsive";

function CreateAddressDialog({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mdUp = useResponsive("up", "md");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      recipient_name: data.get("recipient_name"),
      address: data.get("address"),
      zipcode: 0,
      phone: data.get("phone"),
      latitude: 0,
      longitude: 0,
    };
    // try {
    //   const res = await signInWithEmailAndPassword(auth, email, password);

    //   if (res) {
    //     const loginExternalAPI = await signIn("credentials", {
    //       redirect: false,
    //       firebaseToken: res.user.accessToken,
    //       callbackUrl: `${window.location.origin}`,
    //     });
    //     if (loginExternalAPI) router.push(redirectUrl);
    //   }
    // } catch (err) {
    //   setError(err.message);
    // } finally {
    //   setLoading(false);
    // }
  };

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
          Add Address
        </Typography>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 5 }}>
        <Box component="form" noValidate onSubmit={handleOnSubmit}>
          <TextField
            name="recipient_name"
            label="Nama Penerima"
            variant="outlined"
            fullWidth
            size="small"
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            name="phone"
            label="Nomor HP"
            variant="outlined"
            fullWidth
            size="small"
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            name="name"
            label="Label Alamat"
            variant="outlined"
            fullWidth
            size="small"
            inputProps={{ maxLength: 50 }}
          />
          <TextField
            name="address"
            label="Detail Alamat"
            variant="outlined"
            fullWidth
            size="small"
            inputProps={{ maxLength: 50 }}
          />
          <Button type="submit">Create</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

CreateAddressDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateAddressDialog;
