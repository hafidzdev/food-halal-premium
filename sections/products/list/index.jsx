import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import ProductList from "./products-list";
import ProductGrid from "./product-grid";
import ProductListSkeleton from "../skeleton/product-list-skeleton";
import ProductGridSkeleton from "../skeleton/product-grid-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";

// ----------------------------------------------------------------------

function LoadingData({ viewMode, hasMore, dataLength }) {
  if (!hasMore || dataLength === 0) return null;
  if (viewMode === "grid") {
    return (
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
        {[...Array(4)].map((_, index) => (
          <ProductGridSkeleton key={index} />
        ))}
      </Box>
    );
  }

  return (
    <Stack spacing={4}>
      {[...Array(4)].map((_, index) => (
        <ProductListSkeleton key={index} />
      ))}
    </Stack>
  );
}

export default function ProductListCard({
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
            {loading
              ? [...Array(4)].map((_, index) => (
                  <ProductGridSkeleton key={index} />
                ))
              : products.length > 0
              ? products.map((product, index) => (
                  <ProductGrid key={index} product={product} />
                ))
              : "No Matching Data! "}
          </Box>
        ) : (
          <Stack spacing={4}>
            {loading
              ? [...Array(4)].map((_, index) => (
                  <ProductListSkeleton key={index} />
                ))
              : products.length > 0
              ? products.map((product, index) => (
                  <ProductList key={index} product={product} />
                ))
              : "No Matching Data! "}
          </Stack>
        )}
      </InfiniteScroll>

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
