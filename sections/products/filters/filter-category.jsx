import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react"; // Import useState

export default function FilterCategory({
  options,
  filterCategory,
  onChangeCategory,
  ...other
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCheckboxChange = (categoryName) => {
    setSelectedCategory(
      categoryName === selectedCategory ? null : categoryName
    );
    router.push(pathname + "?" + onChangeCategory(categoryName));
  };

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
              disabled={
                selectedCategory !== null &&
                option?.categoryName !== selectedCategory
              }
              onChange={() => handleCheckboxChange(option?.categoryName)}
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
