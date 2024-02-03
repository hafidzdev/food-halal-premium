import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Popover,
  Divider,
  Stack,
  MenuItem,
  IconButton,
  Box,
  Paper,
  useTheme,
  Link,
} from "@mui/material";
import Iconify from "@/components/partials/Iconify";
import { RouterLink } from "@/routes/components";

const CartUser = ({ cart }) => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";
  const [open, setOpen] = useState(null);

  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const { name, code } = cart;

  return (
    <>
      <Paper
        variant={isLight ? "outlined" : "elevation"}
        sx={{
          p: 3,
          borderRadius: 2,
          boxShadow: 2,
          boxShadow: isLight
            ? "0px 4px 10px rgba(0, 0, 0, 0.1)"
            : "0px 4px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: isLight ? "#DFE3E8" : "",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: "subtitle1" }}
          spacing={4}
        >
          <Stack direction="row" alignItems="center" flexGrow={1}>
            <Box component="span">
              {name}
              <Typography variant="body2">{code}</Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleOpen}>
            <Iconify icon="carbon:overflow-menu-vertical" />
          </IconButton>
        </Stack>
      </Paper>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleClose}>
          <Iconify icon="carbon:accessibility-color-filled" sx={{ mr: 2 }} />{" "}
          <Link
            component={RouterLink}
            color="inherit"
            underline="none"
            href={"/cart/detail"}
          >
            Details
          </Link>
        </MenuItem>

        <Divider sx={{ borderStyle: "dashed", mt: 0.5 }} />

        <MenuItem onClick={handleClose} sx={{ color: "error.main" }}>
          <Iconify icon="carbon:trash-can" sx={{ mr: 2 }} /> Delete
        </MenuItem>
      </Popover>
    </>
  );
};

CartUser.propTypes = {
  cart: PropTypes.shape({
    name: PropTypes.string,
    code: PropTypes.string,
  }),
};

export default CartUser;
