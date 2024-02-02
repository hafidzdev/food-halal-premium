"use client";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Barcode from "react-barcode";

import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";

import Label from "@/components/partials/label";
import Iconify from "@/components/partials/Iconify";

import ProductPrice from "../common/product-price";
import { useTheme } from "@mui/material";

// ----------------------------------------------------------------------

export default function ProductDetailsInfo({
  name,
  price,
  barcode,
  ratingNumber,
  totalReviews,
  priceSale,
  caption,
  inStock,
}) {
  const mdUp = useResponsive("up", "md");
  const getTheme = useTheme();

  return (
    <>
      {inStock && inStock > 0 ? (
        <Label color="success" sx={{ mb: 3 }}>
          In Stock
        </Label>
      ) : (
        <Label color="error" sx={{ mb: 3 }}>
          Out of Stock
        </Label>
      )}

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
        <ProductPrice price={price} priceSale={0} sx={{ typography: "h5" }} />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {caption && caption !== "null" ? caption : "Without description"}
        </Typography>
        <Box sx={{ margin: { xs: "auto", md: 0 } }}>
          <Barcode
            value={barcode}
            height={50}
            width={2}
            background={getTheme?.palette?.background?.default || "#ffffff"}
            lineColor={getTheme?.palette?.text?.primary || "#000000"}
            fontOptions="400"
            textMargin={5}
            margin={0}
            marginTop={15}
            marginBottom={15}
          />
        </Box>
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
  barcode: PropTypes.string,
  priceSale: PropTypes.number,
  ratingNumber: PropTypes.number,
  totalReviews: PropTypes.number,
  inStock: PropTypes.number,
};
