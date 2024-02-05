/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useState, useCallback, useEffect } from "react";

import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

import { useBoolean } from "@/hooks/use-boolean";
import { useResponsive } from "@/hooks/use-responsive";

import Iconify from "@/components/partials/Iconify";

import FilterCategory from "./filter-category";
import FilterOffer from "./filter-offer";
import FilterPrice from "./filter-price";
import FilterStock from "./filter-stock";
import { useRouter, useSearchParams } from "next/navigation";
import { GetAllCategory } from "@/services/Category";

const OFFER_OPTIONS = ["Cashback", "Gratis Ongkir", "COD", "Diskon"];

const getSelected = (selectedItem, item) => {
  return selectedItem.includes(item)
    ? selectedItem.filter((value) => value !== item)
    : [...selectedItem, item];
};

export default function ProductsFilters({ open, onClose }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  let fCategory = searchParams.get("fcategory");
  let filterCategoryArray = fCategory && fCategory.split("+");
  let fOffer = searchParams.get("foffer");
  let filterOfferArray = fOffer && fOffer.split("+");

  const mdUp = useResponsive("up", "md");

  const defaultValues = {
    filterCategory: filterCategoryArray || [],
    filterOffer: filterOfferArray || [],
    filterStock: false,
    filterPrice: {
      start: 0,
      end: 0,
    },
  };

  const [filters, setFilters] = useState(defaultValues);

  const handleChangeCategory = useCallback(
    (name) => {
      const isExist = getSelected(filters.filterCategory, name);
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterCategory: isExist,
      }));

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (isExist.length === 0) {
        current.delete("fcategory");
      } else {
        current.set("fcategory", isExist.join("+"));
      }

      const search = current.toString();

      return search;
    },
    [filters, searchParams]
  );

  const handleChangeOffer = useCallback(
    (name) => {
      const isExist = getSelected(filters.filterOffer, name);
      setFilters((prevFilters) => ({
        ...prevFilters,
        filterOffer: isExist,
      }));

      const current = new URLSearchParams(Array.from(searchParams.entries()));
      if (isExist.length === 0) {
        current.delete("foffer");
      } else {
        current.set("foffer", isExist.join("+"));
      }

      const search = current.toString();

      return search;
    },
    [filters, searchParams]
  );

  const handleChangeStartPrice = useCallback(
    (event) => {
      setFilters({
        ...filters,
        filterPrice: {
          ...filters.filterPrice,
          start: Number(event.target.value),
        },
      });
    },
    [filters]
  );

  const handleChangeEndPrice = useCallback(
    (event) => {
      setFilters({
        ...filters,
        filterPrice: {
          ...filters.filterPrice,
          end: Number(event.target.value),
        },
      });
    },
    [filters]
  );

  const handleChangeStock = useCallback(
    (event) => {
      setFilters({
        ...filters,
        filterStock: event.target.checked,
      });
    },
    [filters]
  );

  const handleClearAll = useCallback(() => {
    setFilters(defaultValues);
    router.push("/product");
  }, []);

  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const dataCategory = await GetAllCategory();
        setCategory(dataCategory);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    }

    fetchCategory();
  }, []);

  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: 280 },
      }}
    >
      <Block title="Category">
        <FilterCategory
          filterCategory={filters.filterCategory}
          onChangeCategory={handleChangeCategory}
          options={category}
          sx={{ mt: 2 }}
        />
      </Block>

      <Block title="Harga">
        <FilterPrice
          filterPrice={filters.filterPrice}
          onChangeStartPrice={handleChangeStartPrice}
          onChangeEndPrice={handleChangeEndPrice}
          sx={{ mt: 2 }}
        />
      </Block>

      <Block title="Penawaran">
        <FilterOffer
          filterOffer={filters.filterOffer}
          onChangeOffer={handleChangeOffer}
          options={OFFER_OPTIONS}
          sx={{ mt: 1 }}
        />
      </Block>

      <FilterStock
        filterStock={filters.filterStock}
        onChangeStock={handleChangeStock}
      />

      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        startIcon={<Iconify icon="carbon:trash-can" />}
        onClick={handleClearAll}
      >
        Clear All
      </Button>
    </Stack>
  );

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              pt: 3,
              px: 3,
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

ProductsFilters.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

function Block({ title, children, ...other }) {
  const contentOpen = useBoolean(true);

  return (
    <Stack alignItems="flex-start" sx={{ width: 1 }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={contentOpen.onToggle}
        sx={{ width: 1, cursor: "pointer" }}
      >
        <Typography variant="h6">{title}</Typography>

        <Iconify
          icon={contentOpen.value ? "carbon:subtract" : "carbon:add"}
          sx={{ color: "text.secondary" }}
        />
      </Stack>

      <Collapse unmountOnExit in={contentOpen.value} sx={{ px: 0.5 }}>
        {children}
      </Collapse>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
