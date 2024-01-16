import PropTypes from "prop-types";
import { GetProductDetail } from "@/services/Product";

export async function generateMetadata({ params, searchParams }, parent) {
  // fetch data
  const product = await GetProductDetail(params.productSlug);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const imageUrl = product.response.image[0];

  return {
    title: product.response.name,
    description: "Providing the best quality products for you",
    openGraph: {
      images: [imageUrl, ...previousImages],
    },
  };
}

export default async function Page({ params }) {
  const getProduct = await GetProductDetail(params.productSlug);
  const product = getProduct.response;
  return <div>Product detail {product.name}</div>;
}

Page.propTypes = {
  params: PropTypes.shape({
    productSlug: PropTypes.string.isRequired,
  }).isRequired,
};
