import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";

import Scrollbar from "@/components/partials/scrollbar";

import CartItem from "./cart-item";

// ----------------------------------------------------------------------

export default function CartList({ products, wishlist = false }) {
  return (
    <Scrollbar>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          py: 2,
          minWidth: 720,
          typography: "subtitle2",
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Stack flexGrow={1}>Item</Stack>
        <Stack sx={{ width: 120 }}>Qty</Stack>
        <Stack sx={{ width: 120 }}>Berat</Stack>
        <Stack sx={{ width: 120 }}>Subtotal</Stack>
        <Stack sx={{ width: 36 }} />
        {wishlist && <Stack sx={{ width: 36 }} />}
      </Stack>

      {products.map((product) => (
        <CartItem key={product.id} product={product} wishlist={wishlist} />
      ))}
    </Scrollbar>
  );
}

CartList.propTypes = {
  products: PropTypes.array,
  wishlist: PropTypes.bool,
};
