import PropTypes from "prop-types";
import CartDetailsView from "@/sections/products/view/cart-detail";
import { GetDetailCart } from "@/services/Purchase";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Cart Detail`,
};

export default async function Page({ params }) {
  const cart = await GetDetailCart(params.cartId);

  return cart ? (
    <CartDetailsView cartId={params.cartId} cart={cart} />
  ) : (
    <Container
      sx={{
        overflow: "hidden",
        pt: { xs: 5, md: 5 },
        pb: { xs: 5, md: 10 },
      }}
    >
      <Alert severity="warning" variant="filled">
        <AlertTitle>Oppss</AlertTitle>
        We can't display your cart list.
      </Alert>
    </Container>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    cartId: PropTypes.string.isRequired,
  }).isRequired,
};
