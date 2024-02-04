import PropTypes from "prop-types";

import Box from "@mui/material/Box";

import ProductGrid from "@/sections/products/list/product-grid";
import ProductGridSkeleton from "@/sections/products/skeleton/product-grid-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

// ----------------------------------------------------------------------

function LoadingData({ viewMode, hasMore, dataLength }) {
  if (!hasMore || dataLength === 0) return null;

  return (
    <Box
      rowGap={4}
      columnGap={3}
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(2, 1fr)",
        sm: "repeat(4, 1fr)",
        md: "repeat(6, 1fr)",
      }}
    >
      {[...Array(6)].map((_, index) => (
        <ProductGridSkeleton key={index} />
      ))}
    </Box>
  );
}

export default function ProductsList({
  dataLength,
  next,
  hasMore,
  loading,
  viewMode,
  products,
}) {
  return (
    <>
      <InfiniteScroll
        dataLength={dataLength}
        next={next}
        hasMore={hasMore}
        loader={
          <LoadingData
            viewMode={viewMode}
            hasMore={hasMore}
            dataLength={dataLength}
          />
        }
        endMessage={<h1>No more data...</h1>}
        style={{
          maxWidth: "100%",
          padding: 0,
          overflowX: "hidden",
          overflowY: "hidden",
        }}
      >
        <Box
          rowGap={4}
          columnGap={3}
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(6, 1fr)",
          }}
        >
          {loading
            ? [...Array(6)].map((_, index) => (
                <ProductGridSkeleton key={index} />
              ))
            : products.length > 0
            ? products.map((product, index) => (
                <ProductGrid key={index} product={product} />
              ))
            : "No Matching Data! "}
        </Box>
      </InfiniteScroll>
    </>
  );
}

ProductsList.propTypes = {
  dataLength: PropTypes.number,
  next: PropTypes.func,
  hasMore: PropTypes.bool,
  loading: PropTypes.bool,
  products: PropTypes.array,
  viewMode: PropTypes.string,
};

LoadingData.propTypes = {
  viewMode: PropTypes.string,
  hasMore: PropTypes.bool,
  dataLength: PropTypes.number,
};
