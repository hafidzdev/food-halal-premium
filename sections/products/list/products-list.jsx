/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "@/context/CartContext";
import { AddToCart, GetCart } from "@/services/Purchase";

import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { RouterLink } from "@/routes/components";

import Label from "@/components/partials/label";
import Image from "next/legacy/image";
import Iconify from "@/components/partials/Iconify";
import TextMaxLine from "@/components/partials/text-max-line/text-max-line";
import ProductPrice from "../common/product-price";
import ProductRating from "../common/product-rating";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

// ----------------------------------------------------------------------

export default function ProductList({ product, ...other }) {
  const [, setCart] = useCart();
  const router = useRouter();

  const [snackbars, setSnackbars] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCloseSnackbar = (id) => {
    setSnackbars((prevSnackbars) =>
      prevSnackbars.filter((snackbar) => snackbar.id !== id)
    );
  };

  const handleAddToCart = async (productId) => {
    try {
      setLoading(true);
      const session = await getSession();

      if (!session) {
        router.push("/signin");
        return;
      }

      const addProductToCart = await AddToCart(productId);
      if (addProductToCart.status === 200) {
        const getCart = await GetCart();
        setCart(getCart);
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: "Successfully added item to cart",
            severity: "success",
          },
        ]);
      } else {
        setSnackbars((prevSnackbars) => [
          ...prevSnackbars,
          {
            id: Date.now(),
            message: "Failed add product to cart",
            severity: "error",
          },
        ]);
      }
    } catch (error) {
      console.error(
        "An error occurred while processing the request:",
        error.message
      );
      setSnackbars((prevSnackbars) => [
        ...prevSnackbars,
        {
          id: Date.now(),
          message: "An error occurred while processing the request",
          severity: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
      {/* {product.label === "new" && (
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
      )} */}

      <Fab
        onClick={() => handleAddToCart(product.id)}
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
        src={product.image}
        style={{
          objectFit: "cover",
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: "background.neutral",
          borderRadius: 5,
        }}
        height={100}
        width={100}
        // layout="fixed" // Mengubah layout menjadi "fixed"
        // loading="lazy"
        alt="cover"
        priority
      />

      <Stack spacing={1} sx={{ ml: 3 }}>
        <Stack spacing={0.5}>
          <TextMaxLine
            variant="caption"
            line={1}
            sx={{ color: "text.disabled" }}
          >
            {Array.isArray(product.category) &&
              product.category.map((item) => item.name + " ")}
          </TextMaxLine>

          <Link
            component={RouterLink}
            href={`/product/${product.slug}`}
            color="inherit"
          >
            <TextMaxLine variant="h6" line={1}>
              {product.name}
            </TextMaxLine>
          </Link>
        </Stack>

        <ProductRating
          ratingNumber={product?.rating?.avg}
          label={`${product?.currency} sold`}
        />

        <TextMaxLine variant="body2" line={1} sx={{ color: "text.secondary" }}>
          {product?.brand}
        </TextMaxLine>

        <ProductPrice
          price={product?.price_in_currency}
          priceSale={product?.price_in_currency}
          sx={{ typography: "h6" }}
        />
      </Stack>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {snackbars.map((snackbar) => (
        <SnackbarMessage
          key={snackbar.id}
          open={true}
          onClose={() => handleCloseSnackbar(snackbar.id)}
          message={snackbar.message}
          severity={snackbar.severity}
        />
      ))}
    </Stack>
  );
}

ProductList.propTypes = {
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
};
