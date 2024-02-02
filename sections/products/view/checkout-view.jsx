"use client";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import CheckoutOrderSummary from "../checkout/checkout-order-summary";
import CheckoutShippingMethod from "../checkout/checkout-shipping-method";
import CheckoutShippingAddress from "../checkout/checkout-shipping-address";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Alert } from "@mui/material";
import CheckoutPaymentMethod from "../checkout/checkout-shipping-payment";

export default function CheckoutView({
  addressList,
  deliveryList,
  paymentList,
}) {
  const [cart] = useCart();
  const [purchase, setPurchase] = useState({
    purchaseShipAddress: addressList.find((item) => item.is_main),
    purchaseShipDelivery: "",
    purchasePayment: "",
    purchaseShipping: "",
    purchaseId: "",
  });

  const totalSubTotalPrice = Array.isArray(cart)
    ? cart?.reduce((accumulator, item) => accumulator + item.sub_total_price, 0)
    : 0;

  console.log("purchase: ", purchase);
  // console.log("select delv: ", purchase);
  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Checkout
      </Typography>
      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={8}>
          <Stack
            spacing={5}
            divider={<Divider sx={{ borderStyle: "dashed" }} />}
          >
            <div>
              <StepLabel title="Shipping Address" step="1" />
              <CheckoutShippingAddress
                addressList={addressList}
                purchase={purchase}
                setPurchase={setPurchase}
              />
            </div>

            {purchase.purchaseShipAddress && (
              <div>
                <StepLabel title="Shipping Method" step="2" />
                {deliveryList.length < 1 ? (
                  <Alert severity="warning">
                    There are no shipping types to choose.
                  </Alert>
                ) : (
                  <CheckoutShippingMethod
                    deliveryList={deliveryList}
                    purchase={purchase}
                    setPurchase={setPurchase}
                  />
                )}
              </div>
            )}

            {purchase.purchaseShipDelivery && (
              <div>
                <StepLabel title="Select Payment" step="2" />
                {paymentList.length < 1 ? (
                  <Alert severity="warning">
                    There are no payment method to choose.
                  </Alert>
                ) : (
                  <CheckoutPaymentMethod
                    paymentList={paymentList}
                    purchase={purchase}
                    setPurchase={setPurchase}
                  />
                )}
              </div>
            )}
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutOrderSummary
            tax={0}
            total={totalSubTotalPrice}
            subtotal={totalSubTotalPrice}
            shipping={0}
            discount={0}
            products={cart}
            loading={false}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: "h6" }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: "flex",
          typography: "h6",
          borderRadius: "50%",
          alignItems: "center",
          bgcolor: "primary.main",
          justifyContent: "center",
          color: "primary.contrastText",
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}

CheckoutView.propTypes = {
  addressList: PropTypes.array,
};

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
