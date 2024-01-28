import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Box>
          <Button color="primary" onClick={handleClose} sx={{ mt: 2, mx: 1 }}>
            Batal
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleAgree}
            autoFocus
            sx={{ mt: 2, mx: 1 }}
          >
            Jadikan Alamat Utama
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
  title: PropTypes.bool,
  description: PropTypes.bool,
};

export default ConfirmDialog;
