import PropTypes from "prop-types";

import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { usePathname, useRouter } from "next/navigation";

// ----------------------------------------------------------------------

export default function FilterCategory({
  options,
  filterCategory,
  onChangeCategory,
  ...other
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack {...other}>
      {options?.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              size="small"
              value={option?.categoryName}
              checked={filterCategory.includes(option?.categoryName)}
              onChange={() =>
                router.push(
                  pathname + "?" + onChangeCategory(option?.categoryName)
                )
              }
            />
          }
          label={option?.categoryName}
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
