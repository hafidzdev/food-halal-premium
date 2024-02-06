import PropTypes from "prop-types";
import { Box, Card, Typography, Stack, Divider } from "@mui/material";

const CartPrice = ({ productCart }) => {
  const totalPrice = productCart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <Card
      sx={{
        boxShadow: 2,
        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
        bgcolor: "background.neutral",
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
          {productCart.map((product) => (
            <Stack
              key={product.productId}
              spacing={1}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1">{product.productName}</Typography>
              <Typography variant="body1">{product.amount}</Typography>
              <Typography variant="body1">{"¥" + product.price}</Typography>
              <Typography variant="body1">
                {"¥" + product.amount * product.price}
              </Typography>
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
            <Typography variant="subtitle1">{"¥" + totalPrice}</Typography>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">Total</Typography>
            <Typography variant="subtitle1">
              {"¥" + totalPrice} + Tax
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

CartPrice.propTypes = {
  productCart: PropTypes.object.isRequired,
};

export default CartPrice;
