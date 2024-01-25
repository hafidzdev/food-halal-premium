import CartView from "@/sections/products/view/cart-view";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Cart`,
};

export default function Page() {
  return <CartView />;
}
