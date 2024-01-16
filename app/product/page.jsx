import ProductsView from "@/sections/products/view/products-view";

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_STORE_NAME} - Our Products`,
};

export default function Page() {
  return <ProductsView />;
}
