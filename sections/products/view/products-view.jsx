"use client";

import { useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { useBoolean } from "@/hooks/use-boolean";

import Iconify from "@/components/partials/Iconify";

import ProductsFilters from "../filters";
import ProductListCard from "../list";
import { GetAllProducts } from "@/services/Product";
import { useSearchParams } from "next/navigation";

// ----------------------------------------------------------------------

const VIEW_OPTIONS = [
  { value: "list", icon: <Iconify icon="carbon:list-boxes" /> },
  { value: "grid", icon: <Iconify icon="carbon:grid" /> },
];

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
];

// ----------------------------------------------------------------------
const initialLimitProduct = 20;

export default function ProductsView() {
  const searchParams = useSearchParams();

  const [product, setProduct] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);

  const mobileOpen = useBoolean();

  const [sort, setSort] = useState("latest");

  const loading = useBoolean(true);

  const [viewMode, setViewMode] = useState("grid");

  const resultString = searchParams.get("fcategory");

  useEffect(() => {
    const getData = async () => {
      try {
        const newData = await GetAllProducts(
          resultString,
          initialLimitProduct,
          1
        );
        setProduct([...newData]);
        setPage(2);
        sethasMore(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        loading.onFalse();
      }
    };
    getData();
  }, [resultString]);

  const fetchProduct = async () => {
    try {
      const newData = await GetAllProducts(
        resultString,
        initialLimitProduct,
        page
      );
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

  const handleChangeViewMode = useCallback((event, newAlignment) => {
    if (newAlignment !== null) {
      setViewMode(newAlignment);
    }
  }, []);

  const handleChangeSort = useCallback((event) => {
    setSort(event.target.value);
  }, []);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          py: 5,
        }}
      >
        <Typography variant="h3">Catalog</Typography>

        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon="carbon:filter" width={18} />}
          onClick={mobileOpen.onTrue}
          sx={{
            display: { md: "none" },
          }}
        >
          Filters
        </Button>
      </Stack>

      <Stack
        direction={{
          xs: "column-reverse",
          md: "row",
        }}
        sx={{ mb: { xs: 8, md: 10 } }}
      >
        <Stack spacing={5} divider={<Divider sx={{ borderStyle: "dashed" }} />}>
          <ProductsFilters
            open={mobileOpen.value}
            onClose={mobileOpen.onFalse}
          />
        </Stack>

        <Box
          sx={{
            flexGrow: 1,
            pl: { md: 8 },
            width: { md: `calc(100% - ${280}px)` },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 5 }}
          >
            <ToggleButtonGroup
              exclusive
              size="small"
              value={viewMode}
              onChange={handleChangeViewMode}
              sx={{ borderColor: "transparent" }}
            >
              {VIEW_OPTIONS.map((option) => (
                <ToggleButton key={option.value} value={option.value}>
                  {option.icon}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            <FormControl size="small" hiddenLabel sx={{ width: 120 }}>
              <Select value={sort} onChange={handleChangeSort}>
                {SORT_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <ProductListCard
            dataLength={product.length}
            next={fetchData}
            hasMore={hasMore}
            loading={loading.value}
            viewMode={viewMode}
            products={product}
          />
        </Box>
      </Stack>
    </Container>
  );
}
