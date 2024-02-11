import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Import useState and useEffect

export default function FilterCategory({ options, filterCategory, ...other }) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Update the selectedCategory based on the filterCategory prop
    setSelectedCategory(filterCategory);
  }, [filterCategory]);

  const handleRadioChange = (event) => {
    const categoryName = event.target.value;

    // Check if the clicked category is different from the current selected one
    if (categoryName !== selectedCategory) {
      setSelectedCategory(categoryName);

      // Update the URL directly
      const updatedUrl = categoryName
        ? `${pathname}?fcategory=${categoryName}`
        : pathname;
      router.push(updatedUrl);
    }
  };

  return (
    <RadioGroup
      value={selectedCategory}
      onChange={handleRadioChange}
      {...other}
    >
      {options?.map((option, index) => (
        <FormControlLabel
          key={index}
          control={<Radio size="small" />}
          value={option?.categoryName}
          label={option?.categoryName}
        />
      ))}
    </RadioGroup>
  );
}

FilterCategory.propTypes = {
  filterCategory: PropTypes.string,
  options: PropTypes.array,
};
