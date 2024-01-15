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
      {/* {product.label === "new" && (
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
      )} */}

      <Box sx={{ position: "relative", mb: 2 }}>
        <Fab
          component={RouterLink}
          href={"#"}
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
          src={product.image}
          style={{
            objectFit: "cover",
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: "background.neutral",
            borderRadius: 5,
          }}
          height={150}
          width={150}
          // layout="fixed" // Mengubah layout menjadi "fixed"
          // loading="lazy"
          alt="product cover"
          priority
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: "text.disabled" }}>
          {Array.isArray(product.category) &&
            product.category.map((item) => item.name + " ")}
        </TextMaxLine>

        <Link component={RouterLink} href={"#"} color="inherit">
          <TextMaxLine
            variant="body2"
            line={1}
            sx={{ fontWeight: "fontWeightMedium" }}
          >
            {product?.name}
          </TextMaxLine>
        </Link>

        <ProductPrice
          price={product.price_in_currency}
          priceSale={product.price_in_currency}
        />

        <ProductRating
          ratingNumber={product.rating.avg}
          label={`${product.delivery_weight} sold`}
        />
      </Stack>
    </Stack>
  );
}

ProductGrid.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    brand: PropTypes.string,
    weight: PropTypes.number,
    measure: PropTypes.string,
    barcode: PropTypes.string,
    delivery_weight: PropTypes.number,
    image: PropTypes.string,
    discount: PropTypes.number,
    quantity: PropTypes.number,
    sell_price: PropTypes.number,
    currency: PropTypes.string,
    price_in_currency: PropTypes.number,
    category: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
        type: PropTypes.string,
      })
    ),
    favorite: PropTypes.shape({
      favorite: PropTypes.bool,
      total: PropTypes.number,
      reaction_id: PropTypes.string,
    }),
    rating: PropTypes.shape({
      avg: PropTypes.number,
      count: PropTypes.number,
      star_5: PropTypes.number,
      star_4: PropTypes.number,
      star_3: PropTypes.number,
      star_2: PropTypes.number,
      star_1: PropTypes.number,
    }),
    store_info: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      slug: PropTypes.string,
      location: PropTypes.string,
      latitude: PropTypes.string,
      longitude: PropTypes.string,
    }),
  }),
  sx: PropTypes.object,
};
