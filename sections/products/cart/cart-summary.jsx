import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

import { RouterLink } from "@/routes/components";

import { fPercent, fCurrency } from "@/utils/format-number";

// ----------------------------------------------------------------------

export default function CartSummary({ products, tax, shipping, discount }) {
  const totalSubTotalPrice = products?.reduce(
    (accumulator, item) => accumulator + item.sub_total_price,
    0
  );

  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Summary </Typography>

      <Stack spacing={2}>
        <Row label="Item" value={products?.length} />

        <Row label="Subtotal" value={fCurrency(totalSubTotalPrice)} />

        <Row label="Shipping" value={fCurrency(shipping)} />

        <Row label="Discount (0%)" value={`-${fCurrency(discount)}`} />

        <Row label="Tax" value={fPercent(tax)} />
      </Stack>

      <TextField
        hiddenLabel
        placeholder="Discount Code"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button>Apply</Button>
            </InputAdornment>
          ),
        }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <Row
        label="Total"
        value={fCurrency(totalSubTotalPrice)}
        sx={{
          typography: "h6",
          "& span": { typography: "h6" },
        }}
      />

      <Button
        component={RouterLink}
        href={"/checkout"}
        size="large"
        variant="contained"
        color="inherit"
      >
        Checkout
      </Button>
    </Stack>
  );
}

CartSummary.propTypes = {
  products: PropTypes.array.isRequired,
  tax: PropTypes.number,
  discount: PropTypes.number,
  shipping: PropTypes.number,
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: "subtitle2", ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: "body2" }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}

Row.propTypes = {
  sx: PropTypes.object,
  label: PropTypes.string,
  value: PropTypes.any,
};
