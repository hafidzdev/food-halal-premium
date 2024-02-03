"use client";

import PropTypes from "prop-types";
import { Box, Card, Typography, Stack, Divider, useTheme } from "@mui/material";

const CartPrice = ({ productCart }) => {
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
        my: 2,
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Stack spacing={1}>
          {productCart.map((product, index) => (
            <Stack
              key={index}
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1">{product.name}</Typography>
              <Typography variant="body1">{product.amount}</Typography>
              <Typography variant="body1">{product.price}</Typography>
              <Typography variant="body1">{product.price}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Price</Typography>
            <Typography variant="subtitle1">{"$300"}</Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">{"$310 + Tax"}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

CartPrice.propTypes = {
  productCart: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.string,
    price: PropTypes.string,
  }),
};

export default CartPrice;
