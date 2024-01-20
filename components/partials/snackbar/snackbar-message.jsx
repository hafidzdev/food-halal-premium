import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarMessage = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackbarMessage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.oneOf(["success", "info", "warning", "error"]),
};

export default SnackbarMessage;
