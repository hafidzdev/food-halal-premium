"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { PlaceCartOrder } from "@/services/Purchase";
import Image from "next/image";

const initialState = {
  isOpen: false,
  loading: false,
  isSuccess: false,
  error: "",
};

function ModalPlaceCartOrder({ cartId }) {
  const [openModal, setOpenModal] = useState(initialState);

  const handleClose = () => {
    setOpenModal(initialState);
  };

  const handleOrder = async () => {
    setOpenModal((prev) => ({ ...prev, loading: true }));
    const res = await PlaceCartOrder(cartId);

    if (res?.status === 200) {
      setOpenModal({
        isOpen: true,
        loading: false,
        isSuccess: true,
        error: "",
      });
    } else {
      setOpenModal({
        isOpen: true,
        loading: false,
        isSuccess: false,
        error: `Error ${res?.status}: ` + res?.message,
      });
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleOrder}
      >
        Place your order
      </Button>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openModal.loading}
      >
        <CircularProgress color="primary" />
      </Backdrop>

      <Dialog
        open={openModal.isOpen}
        maxWidth="sm"
        fullWidth={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {openModal.isSuccess
            ? "Yeayy.. Complete Your Order"
            : "Oopps Someting Wrong!"}
        </DialogTitle>
        <DialogContent>
          {openModal.isSuccess ? (
            <>
              <Box
                sx={{
                  bgcolor: "#f9f9f9",
                  color: "#202020",
                  border: "1px solid",
                  borderRadius: 1,
                  borderColor: "green",
                  px: 3,
                  py: 1.5,
                  my: 1,
                  cursor: "pointer",
                  "&:hover": { background: "#b0e8b4" },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={3}
                >
                  <Image
                    src={"/assets/icons/ic-whatsapp.svg"}
                    alt="Whatsapp"
                    width={35}
                    height={35}
                  />
                  <Typography variant="subtitle1">WhatsApp</Typography>
                </Stack>
              </Box>
              <Box
                sx={{
                  bgcolor: "#f9f9f9",
                  color: "#202020",
                  border: "1px solid",
                  borderRadius: 1,
                  borderColor: "green",
                  px: 3,
                  py: 1.5,
                  my: 1,
                  cursor: "pointer",
                  "&:hover": { background: "#b0e8b4" },
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={3}
                >
                  <Image
                    src={"/assets/icons/ic-line.svg"}
                    alt="Line"
                    width={35}
                    height={35}
                  />
                  <Typography variant="subtitle1">Line</Typography>
                </Stack>
              </Box>
            </>
          ) : (
            <Typography variant="h5" color="error" sx={{ textAlign: "center" }}>
              {openModal.error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

ModalPlaceCartOrder.propTypes = {
  cartId: PropTypes.string.isRequired,
};

export default ModalPlaceCartOrder;
