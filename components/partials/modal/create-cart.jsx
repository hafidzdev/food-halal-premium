import PropTypes from "prop-types";
import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import { alpha } from "@mui/material/styles";

import Iconify from "../Iconify";
import { useResponsive } from "@/hooks/use-responsive";

function CreateCart({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mdUp = useResponsive("up", "md");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  };

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [selectedOption3, setSelectedOption3] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleOptionChange2 = (event) => {
    setSelectedOption2(event.target.value);
  };
  const handleOptionChange3 = (event) => {
    setSelectedOption3(event.target.value);
  };

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
          Create Cart
        </Typography>
      </DialogTitle>
      <Divider />

      <DialogContent dividers sx={{ p: 3 }}>
        <Box component="form" noValidate onSubmit={handleOnSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Name"
              placeholder="Enter Your Name"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                sx: {
                  "&::placeholder": {
                    fontWeight: "bold",
                  },
                },
              }}
            />
            <TextField
              value={"081776554338"}
              label="Phone Number"
              placeholder="Phone Number"
              InputLabelProps={{ shrink: true }}
              disabled
            />
            <TextField
              label="Address"
              placeholder="Enter Address"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />{" "}
            <TextField
              label="Post Code"
              placeholder="Enter Post Code"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field" shrink={!!selectedOption}>
                Payment Type
              </InputLabel>
              <Select
                label="Payment Type"
                id="option-field"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <MenuItem value="option1">COD</MenuItem>
                <MenuItem value="option2">Transfer</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field2" shrink={!!selectedOption2}>
                Delivery Type
              </InputLabel>
              <Select
                label="option-field-label2"
                id="option-field"
                value={selectedOption2}
                onChange={handleOptionChange2}
              >
                <MenuItem value="option1">Shop Delivery</MenuItem>
                <MenuItem value="option2">POS</MenuItem>
              </Select>
            </FormControl>{" "}
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="option-field3" shrink={!!selectedOption3}>
                Delivery Condition
              </InputLabel>
              <Select
                label="option-field-label3"
                id="option-field"
                value={selectedOption3}
                onChange={handleOptionChange3}
              >
                <MenuItem value="option1">Standart</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Email"
              placeholder="Enter Your Email"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Note"
              placeholder="Enter Note"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              multiline
              rows={4}
            />
          </Stack>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

CreateCart.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateCart;
