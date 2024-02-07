import PropTypes from "prop-types";
import { Box, Card, Stack, Divider } from "@mui/material";

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
            <Stack spacing={2} key={index}>
              <Row
                label1={product.productName}
                label2={product.amount}
                label3={"¥" + product.price}
                label4={"¥" + product.amount * product.price}
              />
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
            <Box component="span" sx={{ typography: "body1" }}>
              Price
            </Box>
            <Box component="span" sx={{ typography: "body1" }}>
              {"¥" + totalPrice}
            </Box>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box component="span" sx={{ typography: "body1" }}>
              Total
            </Box>
            <Box component="span" sx={{ typography: "body1" }}>
              {"¥" + totalPrice} + Tax
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

CartPrice.propTypes = {
  productCart: PropTypes.array,
};

function Row({ label1, label2, label3, label4, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: "subtitle2", ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: "body1" }}>
        {label1}
      </Box>

      <Box component="span" sx={{ typography: "body1" }}>
        {label2}
      </Box>

      <Box component="span" sx={{ typography: "body1" }}>
        {label3}
      </Box>

      <Box component="span" sx={{ typography: "body1" }}>
        {label4}
      </Box>
    </Stack>
  );
}

export default CartPrice;
