"use client";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { useBoolean } from "@/hooks/use-boolean";

import ProductsList from "./common/ProductsList";
import { GetAllProducts } from "@/services/Product";
// import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------
const initialLimitProduct = 18;

export default function HomeProducts() {
  const [product, setProduct] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  const loading = useBoolean(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await GetAllProducts("", initialLimitProduct, 1);

        setProduct([...newData]);
        setPage(2);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.onFalse();
      }
    };
    getData();
  }, []);

  const fetchProduct = async () => {
    try {
      const newData = await GetAllProducts("", initialLimitProduct, page);
      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    return null;
  };

  const fetchData = async () => {
    const resultFormServer = await fetchProduct();

    setProduct((currentData) => [...currentData, ...resultFormServer]);
    if (
      resultFormServer.length === 0 ||
      resultFormServer.length < initialLimitProduct
    ) {
      sethasMore(false);
    }

    setPage((prevData) => prevData + 1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box
        sx={{
          flexGrow: 1,
          pl: { md: 8 },
          ml: { md: 3.5, sm: 2 },
          width: { md: `calc(100% - ${100}px)` },
        }}
      >
        <ProductsList
          dataLength={product.length}
          next={fetchData}
          hasMore={hasMore}
          loading={loading.value}
          viewMode="grid"
          products={product}
        />
      </Box>
    </Container>
  );
}
