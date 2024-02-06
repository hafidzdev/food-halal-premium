import PropTypes from "prop-types";

import { Stack, Typography, alpha, useTheme } from "@mui/material";
import TextMaxLine from "@/components/partials/text-max-line";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useCallback, useEffect } from "react";

// ----------------------------------------------------------------------

const getSelected = (selectedItem, item) => {
  return selectedItem.includes(item)
    ? selectedItem.filter((value) => value !== item)
    : [...selectedItem, item];
};

export default function CategoriesGrid({ category }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const { categoryName, count } = category;

  const router = useRouter();
  const pathname = usePathname();

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
      onChange={() =>
        router.push(pathname + "?" + handleChangeCategory(categoryName))
      }
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
