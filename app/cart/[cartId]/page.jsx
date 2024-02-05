import PropTypes from "prop-types";
import CartDetailsView from "@/sections/products/view/cart-detail";
import { GetDetailCart } from "@/services/Purchase";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Cart Detail`,
};

export default async function Page({ params }) {
  const cart = await GetDetailCart(params.cartId);

  return cart ? (
    <CartDetailsView cartId={params.cartId} cart={cart} />
  ) : (
    <h1>Oppss, product not found.</h1>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    cartId: PropTypes.string.isRequired,
  }).isRequired,
};
