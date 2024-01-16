"use client";

import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";

import Label from "@/components/partials/label";
import Iconify from "@/components/partials/Iconify";

import ProductPrice from "../common/product-price";

// ----------------------------------------------------------------------

export default function ProductDetailsInfo({
  name,
  price,
  ratingNumber,
  totalReviews,
  priceSale,
  caption,
}) {
  const mdUp = useResponsive("up", "md");

  return (
    <>
      <Label color="success" sx={{ mb: 3 }}>
        In Stock
      </Label>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating
            size="small"
            value={ratingNumber}
            defaultValue={0}
            precision={0.5}
            readOnly
          />

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            ({totalReviews} reviews)
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <ProductPrice
          price={price}
          priceSale={priceSale}
          sx={{ typography: "h5" }}
        />

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {caption}
        </Typography>
      </Stack>

      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
      >
        <TextField
          select
          hiddenLabel
          SelectProps={{
            native: true,
          }}
          sx={{
            minWidth: 100,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <Stack direction="row" spacing={2} sx={{ my: 3 }}>
          <Button
            component={RouterLink}
            href={""}
            fullWidth={!mdUp}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
          >
            Add to Cart
          </Button>

          <Button
            component={RouterLink}
            href={""}
            fullWidth={!mdUp}
            size="large"
            color="primary"
            variant="contained"
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

ProductDetailsInfo.propTypes = {
  caption: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  priceSale: PropTypes.number,
  ratingNumber: PropTypes.number,
  totalReviews: PropTypes.number,
};
