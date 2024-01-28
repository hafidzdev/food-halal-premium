import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";

import { alpha } from "@mui/material/styles";

import Iconify from "../Iconify";
import { useResponsive } from "@/hooks/use-responsive";

function CreateAddressDialog({ open, onClose }) {
  const mdUp = useResponsive("up", "md");
  return (
    <Dialog open={open} fullWidth={true} maxWidth="sm">
      <IconButton
        size="large"
        onClick={onClose}
        sx={{
          top: 10,
          right: mdUp ? 5 : 25,
          zIndex: 9,
          position: "absolute",
          color: (theme) => alpha(theme.palette.text.primary, 0.72),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.text.primary, 0.16),
          },
        }}
      >
        <Iconify icon="carbon:close-filled" width={24} />
      </IconButton>
      <DialogTitle>
        <Typography color="textPrimary" gutterBottom>
          Add Address
        </Typography>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 5 }}>
        <TextField
          label="Nama Penerima"
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          label="Nomor HP"
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{ maxLength: 50 }}
        />
        <TextField
          label="Label Alamat"
          variant="outlined"
          fullWidth
          size="small"
          inputProps={{ maxLength: 50 }}
        />
      </DialogContent>
    </Dialog>
  );
}

CreateAddressDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateAddressDialog;
