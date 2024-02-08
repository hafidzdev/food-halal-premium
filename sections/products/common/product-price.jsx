import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function ProductPrice({ price, priceSale = 0, sx, ...other }) {
  return (
    <Stack
      direction="row"
      spacing={4}
      sx={{ typography: "subtitle2", ...sx }}
      {...other}
    >
      {"¥" + price}
    </Stack>
  );
}

ProductPrice.propTypes = {
  price: PropTypes.number,
  priceSale: PropTypes.number,
  sx: PropTypes.object,
};
