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
      {options.map((option) => (
        <FormControlLabel
          key={option.slug}
          control={
            <Checkbox
              size="small"
              value={option.slug}
              checked={filterCategory.includes(option.slug)}
              onChange={() =>
                router.push(pathname + "?" + onChangeCategory(option.slug))
              }
            />
          }
          label={option.name}
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
