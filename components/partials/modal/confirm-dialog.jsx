import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Iconify from "../Iconify";

const ConfirmDialog = ({ open, onClose, onAgree, title, description }) => {
  const handleClose = () => {
    onClose();
  };

  const handleAgree = () => {
    onAgree();
    handleClose();
  };

  return (
    <Modal
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", top: -10, right: 0 }}
        >
          <Iconify icon="carbon:close-filled" width={20} height={20} />
        </IconButton>

        <Box
          sx={{
            my: 2,
            color: "primary.main",
            bgcolor: "background.neutral",
            borderRadius: "50%",
            p: 1,
            display: "inline-block",
          }}
        >
          <Iconify icon="carbon:information-filled" width={50} height={50} />
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="warning"
            onClick={handleClose}
            sx={{ mt: 2, mx: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAgree}
            autoFocus
            sx={{ mt: 2, mx: 1 }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAgree: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default ConfirmDialog;
