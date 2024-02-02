import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import ProductDetailsCarousel from "../details/product-details-carousel";
import ProductDetailsInfo from "../details/product-details-info";
import ProductDetailsDescription from "../details/product-details-description";

// ----------------------------------------------------------------------

export default function ProductView({ product }) {
  return (
    <>
      <Container sx={{ overflow: "hidden", mt: 5 }}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid item xs={12} md={6} lg={7}>
            <ProductDetailsCarousel images={product.image} />
          </Grid>

          <Grid item xs={12} md={6} lg={5}>
            <ProductDetailsInfo
              name={product.name}
              price={product.price}
              barcode={product.barcode}
              caption={product.description}
              priceSale={product.price}
              ratingNumber={5}
              totalReviews={5}
              inStock={product.inStock}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid item xs={12} md={6} lg={7}>
            <ProductDetailsDescription
              weight={0}
              measure=""
              discount={0}
              quantity={product.inStock}
              storeName=""
              composition=""
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
    updatedAt: PropTypes.string.isRequired,
    inStock: PropTypes.number.isRequired,
    availableForSale: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string,
    barcode: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};
