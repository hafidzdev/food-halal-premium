"use client";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { useBoolean } from "@/hooks/use-boolean";

import ProductsList from "./common/ProductsList";
import { GetProductData, GetAllProducts } from "@/services/Product";
import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function HomeProducts() {
  const searchParams = useSearchParams();

  const [product, setProduct] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  //   const mobileOpen = useBoolean();

  //   const [sort, setSort] = useState("latest");

  const loading = useBoolean(true);

  const [viewMode, setViewMode] = useState("grid");

  const params = new URLSearchParams(searchParams);
  const queryInArray = Array.from(params.values());

  const resultString = queryInArray
    .flatMap((item) =>
      item.split("+").map((category) => `&category=${category}`)
    )
    .join("");

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await GetAllProducts();

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
      const newData = await GetAllProducts();
      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    return null;
  };

  const fetchData = async () => {
    const resultFormServer = await fetchProduct();

    setProduct((currentData) => [...currentData, ...resultFormServer]);
    if (resultFormServer.length === 0 || resultFormServer.length < 20) {
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
          width: { md: `calc(100% - ${100}px)` },
        }}
      >
        <ProductsList
          dataLength={product.length}
          next={fetchData}
          hasMore={hasMore}
          loading={loading.value}
          viewMode={viewMode}
          products={product}
        />
      </Box>
    </Container>
  );
}
