import PropTypes from "prop-types";

import { Stack, Typography, alpha, useTheme } from "@mui/material";
import TextMaxLine from "@/components/partials/text-max-line";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

// ----------------------------------------------------------------------

const getSelected = (selectedItem, item) => {
  return selectedItem.includes(item)
    ? selectedItem.filter((value) => value !== item)
    : [...selectedItem, item];
};

export default function CategoriesGrid({ category, onChecked }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const { categoryName, count } = category;

  const router = useRouter();

  const searchParams = useSearchParams();
  let fCategory = searchParams.get("fcategory");
  let filterCategoryArray = fCategory && fCategory.split("+");

  const defaultValues = {
    filterCategory: filterCategoryArray || [],
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

  const isChecked = filters.filterCategory.includes(categoryName);

  const handleStackClick = (event) => {
    event.preventDefault();
    const updatedChecked = !isChecked;
    onChecked(updatedChecked);

    const newUrl = "/product?" + handleChangeCategory(categoryName);
    router.push(newUrl);
  };

  return (
    <Stack
      spacing={1}
      sx={{
        p: 1,
        borderRadius: 2,
        cursor: "pointer",
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[700], 0.24)}`,
        boxShadow: isLight
          ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
          : "0px 4px 10px rgba(0, 0, 0, 0.5)",
        backgroundColor: isLight ? "#DFE3E8" : "",
        "&:hover": {
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
        },
        mb: 3,
      }}
      onClick={handleStackClick}
    >
      <TextMaxLine variant="subtitle2" line={1}>
        {categoryName}
      </TextMaxLine>

      <Typography variant="caption" sx={{ color: "text.disabled" }}>
        {count}
      </Typography>
    </Stack>
  );
}

CategoriesGrid.propTypes = {
  category: PropTypes.shape({
    categoryName: PropTypes.string,
    count: PropTypes.number,
  }),
};
