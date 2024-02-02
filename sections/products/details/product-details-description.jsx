import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// ----------------------------------------------------------------------

function ProductDescription({ type, value }) {
  return (
    <Stack
      spacing={0.5}
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "center" }}
      sx={{ typography: "body2" }}
    >
      <Box component="span" sx={{ width: 160, color: "text.secondary" }}>
        {type}
      </Box>
      <Box component="span">{value || "-"}</Box>
    </Stack>
  );
}

export default function ProductDetailsDescription({
  weight,
  measure,
  discount,
  quantity,
  storeName,
  composition,
}) {
  return (
    <Stack
      spacing={4}
      sx={{
        py: { xs: 5, md: 10 },
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6"> Specifications </Typography>

        <ProductDescription type="Weight" value={weight + " " + measure} />
        <ProductDescription type="Discount" value={discount + " %"} />
        <ProductDescription type="Stock" value={quantity} />
        <ProductDescription type="Store" value={storeName} />
        <ProductDescription type="Ingredients" value={composition} />
      </Stack>
    </Stack>
  );
}

ProductDetailsDescription.propTypes = {
  weight: PropTypes.number,
  measure: PropTypes.string,
  discount: PropTypes.number,
  quantity: PropTypes.number,
  storeName: PropTypes.string,
  composition: PropTypes.string,
};
