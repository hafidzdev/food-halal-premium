/* eslint-disable jsx-a11y/alt-text */
import PropTypes from "prop-types";

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

export default function ProductList({ product, ...other }) {
  return (
    <Stack
      direction="row"
      sx={{
        position: "relative",
        "&:hover .add-to-cart": {
          opacity: 1,
        },
      }}
      {...other}
    >
      {product.label === "new" && (
        <Label
          color="info"
          sx={{ position: "absolute", m: 1, top: 0, left: 0, zIndex: 9 }}
        >
          NEW
        </Label>
      )}

      {product.label === "sale" && (
        <Label
          color="error"
          sx={{ position: "absolute", m: 1, top: 0, left: 0, zIndex: 9 }}
        >
          SALE
        </Label>
      )}

      <Fab
        component={RouterLink}
        href={"/product-detail"}
        className="add-to-cart"
        color="primary"
        size="small"
        sx={{
          right: 8,
          zIndex: 9,
          top: 8,
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
          // mr: 5,
          // width: 160,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: "background.neutral",
          borderRadius: 5,
        }}
        height={100}
        width={100}
        layout="fixed" // Mengubah layout menjadi "fixed"
        loading="lazy"
        alt="cover"
      />

      <Stack spacing={1} sx={{ ml: 3 }}>
        <Stack spacing={0.5}>
          <TextMaxLine
            variant="caption"
            line={1}
            sx={{ color: "text.disabled" }}
          >
            {product.category}
          </TextMaxLine>

          <Link component={RouterLink} href={"/product-detail"} color="inherit">
            <TextMaxLine variant="h6" line={1}>
              {product.name}
            </TextMaxLine>
          </Link>
        </Stack>

        <ProductRating
          ratingNumber={product.ratingNumber}
          label={`${product.sold} sold`}
        />

        <TextMaxLine variant="body2" line={1} sx={{ color: "text.secondary" }}>
          {product.caption}
        </TextMaxLine>

        <ProductPrice
          price={product.price}
          priceSale={product.priceSale}
          sx={{ typography: "h6" }}
        />
      </Stack>
    </Stack>
  );
}

ProductList.propTypes = {
  product: PropTypes.shape({
    caption: PropTypes.string,
    category: PropTypes.string,
    coverUrl: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sold: PropTypes.number,
    ratingNumber: PropTypes.number,
  }),
};
