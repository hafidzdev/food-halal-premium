import CartDetailsView from "@/sections/products/view/cart-detail";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Cart Detail`,
};

export default function Page() {
  return <CartDetailsView />;
}
