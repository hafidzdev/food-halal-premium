import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ProductPrice({
  price,
  inStock,
  priceSale = 0,
  sx,
  ...other
}) {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ typography: "subtitle2", ...sx }}
      {...other}
    >
      {"¥" + price}

      <Box
        component="span"
        sx={{
          color: "text.disabled",
        }}
      >
        Stock: {inStock}
      </Box>
    </Stack>
  );
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  inStock: PropTypes.number,
  priceSale: PropTypes.number,
  sx: PropTypes.object,
};
