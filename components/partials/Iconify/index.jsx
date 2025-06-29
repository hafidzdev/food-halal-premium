import PropTypes from "prop-types";
import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Iconify = forwardRef(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  sx: PropTypes.object,
  width: PropTypes.number,
};

export default Iconify;
