/* eslint-disable jsx-a11y/alt-text */

import PropTypes from "prop-types";
import { Stack, Typography, alpha, useTheme } from "@mui/material";
import TextMaxLine from "@/components/partials/text-max-line";

const CategoriesList = ({ category }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  const { categoryName, count } = category;

  return (
    <>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          px: 1,
          py: 1,
          borderRadius: 2,
          cursor: "pointer",
          border: (theme) =>
            `solid 1px ${alpha(theme.palette.grey[700], 0.24)}`,
          boxShadow: isLight
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: isLight ? "#DFE3E8" : "",
          "&:hover": {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
          },
        }}
      >
        <TextMaxLine variant="subtitle2" line={1}>
          {categoryName}
        </TextMaxLine>

        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          {count}
        </Typography>
      </Stack>
    </>
  );
};

CategoriesList.propTypes = {
  category: PropTypes.shape({
    categoryName: PropTypes.string,
    count: PropTypes.number,
  }),
};

export default CategoriesList;
