import PropTypes from "prop-types";
import { Box, Card, Stack, Divider } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CartListSkeleton from "../skeleton/cart-list-skeleton";
import { useBoolean } from "@/hooks/use-boolean";
import { useEffect } from "react";

const CartPrice = ({ productCart }) => {
  const loading = useBoolean(true);

  const isClient = () => typeof window !== "undefined";

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 700));
      loading.onFalse();
    };

    if (isClient()) {
      fakeLoading();
    } else {
      loading.onFalse();
    }
  }, [loading]);

  if (loading.value) {
    return <CartListSkeleton />;
  }

  const totalPrice = productCart.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  return (
    <Card
      sx={{
        boxShadow: 2,
        boxShadow: `0px 4px 10px rgba(0, 0, 0, 0.3)`,
        my: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          pb: 0,
        }}
      >
        <Table>
          <TableBody>
            {productCart.map((product, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    padding: "6px",
                    borderBottom: "none",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {product.productName}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "6px",
                    borderBottom: "none",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {product.amount}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "6px",
                    borderBottom: "none",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {"¥" + product.price}
                </TableCell>
                <TableCell
                  sx={{
                    padding: "6px",
                    borderBottom: "none",
                    "&:last-child": {
                      borderBottom: "none",
                    },
                  }}
                >
                  {"¥" + product.amount * product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Divider sx={{ mt: 1 }} />
      <Box
        sx={{
          p: 3,
          pb: 0,
        }}
      >
        <Stack spacing={1} sx={{ mb: 2 }}>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box component="span" sx={{ typography: "body2" }}>
              Price
            </Box>
            <Box component="span" sx={{ typography: "subtitle2" }}>
              {"¥" + totalPrice}
            </Box>
          </Stack>
          <Stack
            spacing={1}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box component="span" sx={{ typography: "body2" }}>
              Total
            </Box>
            <Box component="span" sx={{ typography: "subtitle2" }}>
              {"¥" + totalPrice} + Tax
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

CartPrice.propTypes = {
  productCart: PropTypes.array,
};

export default CartPrice;
