import { useState } from "react";

import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel, {
  formControlLabelClasses,
} from "@mui/material/FormControlLabel";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

import { useResponsive } from "@/hooks/use-responsive";
import Iconify from "@/components/partials/Iconify";

// ----------------------------------------------------------------------

export default function CheckoutShippingAddress({ options }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const mdUp = useResponsive("up", "md");

  const [inputName, setInputName] = useState("");
  const [inputRecipentName, setInputRecipentName] = useState("");
  const [inputFullAddress, setInputFullAddress] = useState("");
  const [inputZipcode, setInputZipcode] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  return (
    <>
      <RadioGroup
        sx={{
          rowGap: 2.5,
          columnGap: 2,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(2, 1fr)" },
        }}
      >
        {options.map((option) => (
          <OptionItem
            key={option.name}
            option={option}
            selected={option.name}
            click={handleClickOpen}
          />
        ))}
      </RadioGroup>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 1, float: "right" }}
        onClick={handleClickOpen}
      >
        Add Address
      </Button>

      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        // fullScreen
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "550px", // Set your width here
            },
          },
        }}
      >
        <IconButton
          size="large"
          onClick={onClose}
          sx={{
            top: 45,
            right: mdUp ? 350 : 25,
            zIndex: 9,
            position: "fixed",
            color: (theme) => alpha(theme.palette.common.white, 0.72),
            bgcolor: (theme) => alpha(theme.palette.common.white, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.16),
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

        <DialogContent dividers>
          <Grid container>
            <form>
              <TextField
                label="Name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                sx={{ mt: 1 }}
                fullWidth
              />
              <TextField
                label="Recipient Name"
                sx={{ mt: 1 }}
                fullWidth
                value={inputRecipentName}
                onChange={(e) => setInputRecipentName(e.target.value)}
              />
              <TextField
                label="Full Address"
                fullWidth
                sx={{ mt: 1 }}
                value={inputFullAddress}
                onChange={(e) => setInputFullAddress(e.target.value)}
              />
              <TextField
                label="Phone"
                fullWidth
                sx={{ mt: 1 }}
                value={inputPhone}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              <TextField
                label="Zipcode"
                fullWidth
                sx={{ mt: 1 }}
                value={inputZipcode}
                onChange={(e) => setInputZipcode(e.target.value)}
              />
            </form>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="warning">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

CheckoutShippingAddress.propTypes = {
  options: PropTypes.array,
};

// ----------------------------------------------------------------------

function OptionItem({ option, selected, click }) {
  const { name, fullAddress } = option;

  const renderLabel = (
    <Stack flexGrow={1} spacing={0.5} sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center">
        <Box component="span" sx={{ typography: "subtitle1", flexGrow: 1 }}>
          {name}
        </Box>

        <IconButton
          size="large"
          onClick={click}
          sx={{
            color: (theme) => alpha(theme.palette.common.white, 0.72),
            bgcolor: (theme) => alpha(theme.palette.common.white, 0.08),
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.common.white, 0.16),
            },
          }}
        >
          <Iconify icon={"carbon:edit"} width={20} />
        </IconButton>
      </Stack>

      <Box
        component="span"
        sx={{ typography: "body2", color: "text.secondary" }}
      >
        {fullAddress}
      </Box>
    </Stack>
  );

  return (
    <>
      <FormControlLabel
        value={name}
        control={
          <Radio
            disableRipple
            checkedIcon={<Iconify icon="carbon:checkmark-outline" />}
            sx={{ mx: 1, mt: -3 }}
          />
        }
        label={renderLabel}
        sx={{
          m: 0,
          py: 2.5,
          pr: 2,
          borderRadius: 1,
          border: (theme) =>
            `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
          ...(selected && {
            boxShadow: (theme) => `0 0 0 2px ${theme.palette.text.primary}`,
          }),
          [`& .${formControlLabelClasses.label}`]: {
            width: 1,
          },
        }}
      />
    </>
  );
}

OptionItem.propTypes = {
  option: PropTypes.shape({
    name: PropTypes.string,
    fullAddress: PropTypes.string,
  }),
  selected: PropTypes.string, // type bool if field selected
  click: PropTypes.func,
};
