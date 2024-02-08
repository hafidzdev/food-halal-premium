import CartView from "@/sections/products/view/cart-view";
import EcommerceLayout from "@/layouts/e-commerce";

const menuLink = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Product",
    href: "/product",
  },
  {
    name: "Cart",
  },
];

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Cart`,
};

export default function Page() {
  return (
    <EcommerceLayout menuLink={menuLink}>
      <CartView />
    </EcommerceLayout>
  );
}
