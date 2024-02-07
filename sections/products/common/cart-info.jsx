import PropTypes from "prop-types";
import { Box, Card, Stack } from "@mui/material";

const CartInfo = ({ cart }) => {
  return (
    <Card
      sx={{
        boxShadow: 2,
        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
      }}
    >
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Stack direction={"column"} spacing={1} sx={{ mb: 2 }}>
          <Box component="span" sx={{ typography: "body1" }}>
            Cart Name: {cart?.receiveName}
          </Box>
          <Box component="span" sx={{ typography: "body1" }}>
            Phone Number: {cart?.phoneNumber}
          </Box>
          <Box component="span" sx={{ typography: "body1" }}>
            Address: {cart?.deliveryAddress}
          </Box>{" "}
          <Box component="span" sx={{ typography: "body1" }}>
            Postal Code: {cart?.postalCode}
          </Box>{" "}
          <Box component="span" sx={{ typography: "body1" }}>
            Payment Type: {cart?.paymentType}
          </Box>{" "}
          <Box component="span" sx={{ typography: "body1" }}>
            Delivery Type: {cart?.deliveryType}
          </Box>
          <Box component="span" sx={{ typography: "body1" }}>
            Delivery Condition: {cart?.deliveryCondition}
          </Box>
          <Box component="span" sx={{ typography: "body1" }}>
            Email: {cart?.emailAddress}
          </Box>{" "}
          <Box component="span" sx={{ typography: "body1" }}>
            Note: {cart?.note}
          </Box>
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
    postalCode: PropTypes.number,
    phoneNumber: PropTypes.number,
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
