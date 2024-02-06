import PropTypes from "prop-types";
import { Box, Card, Stack, Typography } from "@mui/material";

const CartInfo = ({ cart }) => {
  return (
    <Card
      sx={{
        boxShadow: 2,
        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
        bgcolor: "background.neutral",
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Stack direction={"column"} spacing={1} sx={{ mb: 2 }}>
          <Typography variant="body1">
            Cart Name: {cart?.receiveName}
          </Typography>
          <Typography variant="body1">
            Phone Number: {cart?.phoneNumber}
          </Typography>
          <Typography variant="body1">
            Address: {cart?.deliveryAddress}
          </Typography>{" "}
          <Typography variant="body1">
            Postal Code: {cart?.postalCode}
          </Typography>{" "}
          <Typography variant="body1">
            Payment Type: {cart?.paymentType}
          </Typography>{" "}
          <Typography variant="body1">
            Delivery Type: {cart?.deliveryType}
          </Typography>
          <Typography variant="body1">
            Delivery Condition: {cart?.deliveryCondition}
          </Typography>
          <Typography variant="body1">Email: {cart?.emailAddress}</Typography>{" "}
          <Typography variant="body1">Note: {cart?.note}</Typography>
        </Stack>
      </Box>
    </Card>
  );
};

CartInfo.propTypes = {
  cart: PropTypes.shape({
    receiveName: PropTypes.string,
    createdAt: PropTypes.string,
    id: PropTypes.string,
    receiveTime: PropTypes.string,
    deliveryCondition: PropTypes.string,
    emailAddress: PropTypes.string,
    postalCode: PropTypes.string,
    phoneNumber: PropTypes.string,
    note: PropTypes.string,
    paymentType: PropTypes.string,
    status: PropTypes.string,
    userId: PropTypes.string,
    cartExpiredDate: PropTypes.string,
    updatedAt: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryType: PropTypes.string,
    handledByName: PropTypes.string,
  }).isRequired,
};

export default CartInfo;
