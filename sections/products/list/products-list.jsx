/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Fab from "@mui/material/Fab";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

import { RouterLink } from "@/routes/components";

import Image from "@/components/partials/image/image";

import Iconify from "@/components/partials/Iconify";
import TextMaxLine from "@/components/partials/text-max-line/text-max-line";
import ProductPrice from "../common/product-price";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";

import { AddProductCartDialog } from "@/components/partials/modal";

// ----------------------------------------------------------------------

export default function ProductList({ product, ...other }) {
  const { status } = useSession();
  const router = useRouter();

  const [openCartDialog, setOpenCartDialog] = useState({
    isOpen: false,
    product: {},
    isSuccess: "",
  });
  const [snackbars, setSnackbars] = useState([]);

  useEffect(() => {
    if (openCartDialog.isSuccess === "success") {
      setSnackbars((prevSnackbars) => [
        ...prevSnackbars,
        {
          id: Date.now(),
          message: "Successfully added item to cart",
          severity: "success",
        },
      ]);
    }
  }, [openCartDialog.isSuccess]);

  const handleOpenCartModal = (product) =>
    setOpenCartDialog({ isOpen: true, product, isSuccess: "" });

  const handleCloseCartModal = (successRes) =>
    setOpenCartDialog({ isOpen: false, product: {}, isSuccess: successRes });

  const handleCloseSnackbar = (id) => {
    setSnackbars((prevSnackbars) =>
      prevSnackbars.filter((snackbar) => snackbar.id !== id)
    );
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
      <Fab
        onClick={() =>
          status === "unauthenticated"
            ? router.push("/signin")
            : handleOpenCartModal(product)
        }
        className="add-to-cart"
        color="primary"
        size="small"
        sx={{
          right: 8,
          zIndex: 9,
          top: 8,
          opacity: 1,
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

      <Link
        component={RouterLink}
        href={`/product/${product.id}`}
        color="inherit"
      >
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
          }}
          height={100}
          width={100}
          alt="cover"
          priority
        />
      </Link>

      <Stack spacing={1} sx={{ ml: 3 }}>
        <Stack spacing={0.5}>
          <TextMaxLine
            variant="caption"
            line={1}
            sx={{ color: "text.disabled" }}
          >
            {product?.category}
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

        <Stack direction="column" justifyContent="normal" spacing={0.5}>
          <ProductPrice price={product.price} priceSale={0} />
          <Typography variant="subtitle2">
            Stock: {product?.inStock > 0 ? product?.inStock : "0"}
          </Typography>
        </Stack>
      </Stack>

      <AddProductCartDialog
        open={openCartDialog}
        onClose={handleCloseCartModal}
      />

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
};
