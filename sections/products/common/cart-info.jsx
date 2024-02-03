"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Card, Typography, Stack, Divider, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Iconify from "@/components/partials/Iconify";
import TextMaxLine from "@/components/partials/text-max-line";

const CartInfo = ({ userCart }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  return (
    <Card
      sx={{
        boxShadow: 2,
        boxShadow: isLight
          ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
          : "0px 4px 10px rgba(0, 0, 0, 0.5)",
        backgroundColor: isLight ? "#DFE3E8" : "",
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Stack direction={"column"} spacing={1} sx={{ mb: 2 }}>
          <TextMaxLine variant="body1">Name: {userCart?.name}</TextMaxLine>
          <TextMaxLine variant="body1">
            Phone Number: {userCart?.phone_number}
          </TextMaxLine>
          <TextMaxLine variant="body1">
            Address: {userCart?.address}
          </TextMaxLine>{" "}
          <TextMaxLine variant="body1">
            Postal Code: {userCart?.postal_code}
          </TextMaxLine>{" "}
          <TextMaxLine variant="body1">
            Payment Type: {userCart?.payment_type}
          </TextMaxLine>{" "}
          <TextMaxLine variant="body1">
            Delivery Type: {userCart?.delivery_type}
          </TextMaxLine>
          <TextMaxLine variant="body1">
            Delivery Condition: {userCart?.delivery_condition}
          </TextMaxLine>
          <TextMaxLine variant="body1">Email: {userCart?.email}</TextMaxLine>{" "}
          <TextMaxLine variant="body1">Note: {userCart?.note}</TextMaxLine>
        </Stack>
      </Box>
    </Card>
  );
};

CartInfo.propTypes = {
  userCart: PropTypes.shape({
    name: PropTypes.string,
    phone_number: PropTypes.number,
    address: PropTypes.string,
    postal_code: PropTypes.number,
    payment_type: PropTypes.string,
    delivery_type: PropTypes.string,
    delivery_condition: PropTypes.string,
    email: PropTypes.string,
    note: PropTypes.string,
  }),
};

export default CartInfo;
