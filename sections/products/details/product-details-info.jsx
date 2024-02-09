"use client";

import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Barcode from "react-barcode";

import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";

import Label from "@/components/partials/label";
import Iconify from "@/components/partials/Iconify";

import ProductPrice from "../common/product-price";
import { useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AddProductCartDialog } from "@/components/partials/modal";
import SnackbarMessage from "@/components/partials/snackbar/snackbar-message";

// ----------------------------------------------------------------------

export default function ProductDetailsInfo({ product }) {
  console.log(product);
  const { barcode, description, inStock, name, price } = product;
  const { status } = useSession();
  const router = useRouter();

  const mdUp = useResponsive("up", "md");
  const getTheme = useTheme();

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
            value={0}
            defaultValue={0}
            precision={0.5}
            readOnly
          />

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            ({0} reviews)
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <ProductPrice
          price={price}
          inStock={inStock}
          priceSale={0}
          sx={{ typography: "h5" }}
        />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description && description !== "null"
            ? description
            : "Without description"}
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
        <Stack direction="row" spacing={2} sx={{ my: 3 }}>
          <Button
            component={RouterLink}
            href={""}
            fullWidth={!mdUp}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
            onClick={() =>
              status === "unauthenticated"
                ? router.push("/signin")
                : handleOpenCartModal(product)
            }
          >
            Add to Cart
          </Button>

          {/* <Button
            component={RouterLink}
            href={""}
            fullWidth={!mdUp}
            size="large"
            color="primary"
            variant="contained"
            onClick={() =>
              status === "unauthenticated"
                ? router.push("/signin")
                : handleOpenCartModal(product)
            }
          >
            Buy Now
          </Button> */}
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
    </>
  );
}

ProductDetailsInfo.propTypes = {
  product: PropTypes.object,
};
