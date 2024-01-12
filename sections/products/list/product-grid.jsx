/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { RouterLink } from "@/routes/components";

import Label from "@/components/partials/label";
import Image from "next/image";
import Iconify from "@/components/partials/Iconify";
import TextMaxLine from "@/components/partials/text-max-line/text-max-line";
import ProductPrice from "../common/product-price";
import ProductRating from "../common/product-rating";

// ----------------------------------------------------------------------

export default function ProductGrid({ product, sx, ...other }) {
  return (
    <Stack
      sx={{
        position: "relative",
        "&:hover .add-to-cart": {
          opacity: 1,
        },
        ...sx,
      }}
      {...other}
    >
      {product.label === "new" && (
        <Label
          color="info"
          sx={{ position: "absolute", m: 1, top: 0, right: 0, zIndex: 9 }}
        >
          NEW
        </Label>
      )}

      {product.label === "sale" && (
        <Label
          color="error"
          sx={{ position: "absolute", m: 1, top: 0, right: 0, zIndex: 9 }}
        >
          SALE
        </Label>
      )}

      <Box sx={{ position: "relative", mb: 2 }}>
        <Fab
          component={RouterLink}
          href={"/product-detail"}
          className="add-to-cart"
          color="primary"
          size="small"
          sx={{
            right: 8,
            zIndex: 9,
            bottom: 8,
            opacity: 0,
            position: "absolute",
            transition: (theme) =>
              theme.transitions.create("opacity", {
                easing: theme.transitions.easing.easeIn,
                duration: theme.transitions.duration.shortest,
              }),
          }}
        >
          <Iconify icon="carbon:shopping-cart-plus" />
        </Fab>

        <Image
          src={product.coverUrl}
          style={{
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: "background.neutral",
            borderRadius: 5,
          }}
          height={200}
          width={200}
          layout="fixed" // Mengubah layout menjadi "fixed"
          loading="lazy"
          alt="product cover"
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: "text.disabled" }}>
          {product.category}
        </TextMaxLine>

        <Link component={RouterLink} href={"/product-detail"} color="inherit">
          <TextMaxLine
            variant="body2"
            line={1}
            sx={{ fontWeight: "fontWeightMedium" }}
          >
            {product.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} priceSale={product.priceSale} />

        <ProductRating
          ratingNumber={product.ratingNumber}
          label={`${product.sold} sold`}
        />
      </Stack>
    </Stack>
  );
}

ProductGrid.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    sold: PropTypes.number,
    label: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    coverUrl: PropTypes.string,
    priceSale: PropTypes.number,
    ratingNumber: PropTypes.number,
  }),
  sx: PropTypes.object,
};
