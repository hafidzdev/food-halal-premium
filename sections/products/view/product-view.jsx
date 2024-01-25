import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import CustomBreadcrumbs from "@/components/partials/custom-breadcrumbs";

import ProductDetailsCarousel from "../details/product-details-carousel";
import ProductDetailsInfo from "../details/product-details-info";
import ProductDetailsDescription from "../details/product-details-description";

// ----------------------------------------------------------------------

export default function ProductView({ product }) {
  return (
    <>
      <Container sx={{ overflow: "hidden" }}>
        <CustomBreadcrumbs
          links={[
            {
              name: "Home",
            },
            {
              name: "Products",
            },
            {
              name: "Detail Products",
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={6} lg={7}>
            <ProductDetailsCarousel images={product.image} />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <ProductDetailsInfo
              name={product.name}
              price={product.sell_price}
              caption={product.description}
              priceSale={product.sell_price}
              ratingNumber={product.rating.avg}
              totalReviews={product.rating.count}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid item xs={12} md={6} lg={7}>
            <ProductDetailsDescription
              weight={product.weight}
              measure={product.measure}
              discount={product.discount}
              quantity={product.quantity}
              storeName={product.store_info.name}
              composition={product.composition}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ProductView.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    measure: PropTypes.string.isRequired,
    barcode: PropTypes.string.isRequired,
    delivery_weight: PropTypes.number,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    discount: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    sell_price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    price_in_currency: PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.object).isRequired,
    favorite: PropTypes.shape({
      favorite: PropTypes.bool.isRequired,
      total: PropTypes.number.isRequired,
      reaction_id: PropTypes.string,
    }).isRequired,
    rating: PropTypes.shape({
      avg: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
      star_5: PropTypes.number.isRequired,
      star_4: PropTypes.number.isRequired,
      star_3: PropTypes.number.isRequired,
      star_2: PropTypes.number.isRequired,
      star_1: PropTypes.number.isRequired,
    }).isRequired,
    store_info: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
    }).isRequired,
    storefront: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.shape({
      length: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    description: PropTypes.string.isRequired,
    composition: PropTypes.string,
    review: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};
