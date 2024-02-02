import PropTypes from "prop-types";
import { GetProductDetail } from "@/services/Product";
import ProductView from "@/sections/products/view/product-view";

export async function generateMetadata({ params }, parent) {
  const product = await GetProductDetail(params.productSlug);

  const previousImages = (await parent).openGraph?.images || [];
  const imageUrl = product?.image;

  return {
    title: `${product?.name} - Premium Halal Food at ${process.env.NEXT_PUBLIC_STORE_NAME}`,
    description: `Indulge in the finest product at ${process.env.NEXT_PUBLIC_STORE_NAME}. Our ${product?.name} is carefully sourced and curated to bring you the ultimate culinary delight. Order now and elevate your dining experience.`,
    openGraph: {
      images: [imageUrl, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  const product = await GetProductDetail(params.productSlug);

  return product ? (
    <ProductView product={product} />
  ) : (
    <h1>Oppss, product not found.</h1>
  );
}

Page.propTypes = {
  params: PropTypes.shape({
    productSlug: PropTypes.string.isRequired,
  }).isRequired,
};
