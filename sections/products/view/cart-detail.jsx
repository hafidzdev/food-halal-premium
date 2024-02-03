"use client";
import {
  Container,
  Grid,
  Button,
  Stack,
  Typography,
  Link,
} from "@mui/material";

import CartInfo from "../common/cart-info";
import CartPrice from "../common/cart-price";
import CartProduct from "../common/cart-product";
import Iconify from "@/components/partials/Iconify";

import { RouterLink } from "@/routes/components";

// ----------------------------------------------------------------------

const userCart = {
  name: "Agus Setiawan",
  phone_number: "081776554338",
  address: "Shinjuku, Japan",
  postal_code: "5670006",
  payment_type: "COD",
  delivery_type: "Delivery",
  delivery_condition: "Standart",
  email: "agus@xetia.io",
  note: "lorem ipsum dolor si atmet",
};

const productCart = [
  {
    id: 1,
    name: "Product 1",
    image:
      "https://cdn.shopify.com/s/files/1/0147/9445/7136/products/image_2e8f9eb4-d566-4c72-91cd-ea5149e3525a.jpg?v=1673878789",
    amount: 1,
    price: "$100",
  },
  {
    id: 2,
    name: "Product 2",
    image:
      "https://cdn.shopify.com/s/files/1/0147/9445/7136/products/image_2e8f9eb4-d566-4c72-91cd-ea5149e3525a.jpg?v=1673878789",
    amount: 1,
    price: "$100",
  },
  {
    id: 3,
    name: "Product 3",
    image:
      "https://cdn.shopify.com/s/files/1/0147/9445/7136/products/image_2e8f9eb4-d566-4c72-91cd-ea5149e3525a.jpg?v=1673878789",
    amount: 1,
    price: "$100",
  },
];

export default function CartDetailsView() {
  return (
    <Container
      sx={{
        overflow: "hidden",
        pt: { xs: 5, md: 5 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Grid container justifyContent="center" spacing={{ xs: 5, md: 8 }}>
        <Grid item xs={12} md={6}>
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            href="/cart"
            marginTop={10}
          >
            <Button
              variant="text"
              startIcon={<Iconify icon="carbon:arrow-left" />}
              sx={{ ml: -2 }}
            />
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Typography variant="h5" alignItems={"center"}>
              Detail Cart
            </Typography>
          </Stack>

          {/* Cart User */}
          <CartInfo userCart={userCart} />
          {/* Cart Price */}
          <CartPrice productCart={productCart} />
          {/* Cart Product */}
          <CartProduct productCart={productCart} />
        </Grid>
      </Grid>
    </Container>
  );
}
