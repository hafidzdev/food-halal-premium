import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// ----------------------------------------------------------------------

export default function FilterOffer({
  options,
  filterOffer,
  onChangeOffer,
  ...other
}) {
  return (
    <Stack {...other}>
      {options.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              size="small"
              value={option}
              checked={filterOffer.includes(option)}
              onChange={() => onChangeOffer(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
}

FilterOffer.propTypes = {
  filterOffer: PropTypes.arrayOf(PropTypes.string),
  onChangeOffer: PropTypes.func,
  options: PropTypes.array,
};
