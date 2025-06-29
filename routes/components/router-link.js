import Link from "next/link";
import { forwardRef } from "react";

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const RouterLink = forwardRef(({ ...other }, ref) => (
  <Link ref={ref} {...other} />
));

export default RouterLink;
