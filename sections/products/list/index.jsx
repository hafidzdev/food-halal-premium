import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import ProductList from "./products-list";
import ProductGrid from "./product-grid";
import ProductListSkeleton from "../skeleton/product-list-skeleton";
import ProductGridSkeleton from "../skeleton/product-grid-skeleton";

// ----------------------------------------------------------------------

export default function ProductListCard({ loading, viewMode, products }) {
  return (
    <>
      {viewMode === "grid" ? (
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          }}
        >
          {(loading ? [...Array(16)] : products).map((product, index) =>
            product ? (
              <ProductGrid key={product.id} product={product} />
            ) : (
              <ProductGridSkeleton key={index} />
            )
          )}
        </Box>
      ) : (
        <Stack spacing={4}>
          {(loading ? [...Array(16)] : products).map((product, index) =>
            product ? (
              <ProductList key={product.id} product={product} />
            ) : (
              <ProductListSkeleton key={index} />
            )
          )}
        </Stack>
      )}

      <Pagination
        count={10}
        color="primary"
        sx={{
          mt: 10,
          mb: 5,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: "center",
          },
        }}
      />
    </>
  );
}

ProductList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
  viewMode: PropTypes.string,
};
