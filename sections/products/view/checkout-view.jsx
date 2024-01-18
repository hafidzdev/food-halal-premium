"use client";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { dummyProducts } from "@/__mocks__/product";

import CheckoutOrderSummary from "../checkout/checkout-order-summary";
import CheckoutShippingMethod from "../checkout/checkout-shipping-method";
import CheckoutShippingAddress from "../checkout/checkout-shipping-address";

// ----------------------------------------------------------------------

const SHIPPING_ADDRESS = [
  {
    name: "Demo 1",
    fullAddress: "Shibuya, Japan",
  },
  {
    name: "Demo 2",
    fullAddress: "Tokyo, Japan",
  },
  {
    name: "Demo 3",
    fullAddress: "Nagoya, Japan",
  },
];

const SHIPPING_METHOD = [
  {
    name: "Instan",
    delivery_entity_name: "Normal Delivery",
    price_per_km: 10000,
    description: "akan diproses dalam 5 sampai 10menit",
  },
  {
    name: "Kuroneko",
    delivery_entity_name: "Normal Delivery",
    price_per_km: 10,
    description: "Japan delivery service",
  },
  {
    name: "Sagawa",
    delivery_entity_name: "Normal Delivery",
    price_per_km: 20,
    description: "Japan delivery service",
  },
];

// ----------------------------------------------------------------------

export default function CheckoutView() {
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
              <CheckoutShippingAddress options={SHIPPING_ADDRESS} />
            </div>
            <div>
              <StepLabel title="Shipping Method" step="2" />
              <CheckoutShippingMethod options={SHIPPING_METHOD} />
            </div>
          </Stack>
        </Grid>

        <Grid xs={12} md={4}>
          <CheckoutOrderSummary
            tax={7}
            total={357.09}
            subtotal={89.09}
            shipping={55.47}
            discount={16.17}
            products={dummyProducts.slice(0, 3)}
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

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};
