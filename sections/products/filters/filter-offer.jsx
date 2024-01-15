import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { usePathname, useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export default function FilterOffer({
  options,
  filterOffer,
  onChangeOffer,
  ...other
}) {
  const router = useRouter();
  const pathname = usePathname();

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
              onChange={() =>
                router.push(pathname + "?" + onChangeOffer(option))
              }
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
