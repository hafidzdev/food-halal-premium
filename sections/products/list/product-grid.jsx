/* eslint-disable jsx-a11y/alt-text */
import { useState } from "react";
import PropTypes from "prop-types";
import { useCart } from "@/context/CartContext";
import { AddToCart, GetCart } from "@/services/Purchase";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

import { RouterLink } from "@/routes/components";

// import Label from "@/components/partials/label";
// import Image from "next/legacy/image";
import Image from "@/components/partials/image/image";
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

export default function ProductGrid({ product, sx, ...other }) {
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
          // onClick={() => handleAddToCart(product.id)}
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
          src={
            product.image !== "null"
              ? product.image
              : "/assets/images/no-image-product.webp"
          }
          style={{
            objectFit: "cover",
            flexShrink: 0,
            borderRadius: 1.5,
            bgcolor: "background.neutral",
            borderRadius: 5,
            height: "150px",
            width: "150px",
          }}
        />
      </Box>

      <Stack spacing={0.5}>
        <TextMaxLine variant="caption" line={1} sx={{ color: "text.disabled" }}>
          {/* {Array.isArray(product.category) &&
            product.category.map((item) => item.name + " ")} */}
          {product?.category}
        </TextMaxLine>

        <Link
          component={RouterLink}
          href={`/product/${product.id}`}
          color="inherit"
        >
          <TextMaxLine
            variant="body2"
            line={1}
            sx={{ fontWeight: "fontWeightMedium" }}
          >
            {product?.name}
          </TextMaxLine>
        </Link>

        <ProductPrice price={product.price} priceSale={0} />
        {/* 
        <ProductRating
          ratingNumber={product.rating.avg}
          label={`${product.delivery_weight} sold`}
        /> */}
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

ProductGrid.propTypes = {
  product: PropTypes.shape({
    barcode: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    sku: PropTypes.string.isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    inStock: PropTypes.number.isRequired,
    updatedAt: PropTypes.string.isRequired,
    availableForSale: PropTypes.bool.isRequired,
  }),
  sx: PropTypes.object,
};
