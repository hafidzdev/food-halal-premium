import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// ----------------------------------------------------------------------

export default function FilterCategory({
  options,
  filterCategory,
  onChangeCategory,
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
              checked={filterCategory.includes(option)}
              onChange={() => onChangeCategory(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );
}

FilterCategory.propTypes = {
  filterCategory: PropTypes.arrayOf(PropTypes.string),
  onChangeCategory: PropTypes.func,
  options: PropTypes.array,
};
