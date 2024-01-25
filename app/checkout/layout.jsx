import PropTypes from "prop-types";
import MainLayouts from "@/layouts/main";

export default function Layout({ children }) {
  return <MainLayouts>{children}</MainLayouts>;
}

Layout.propTypes = {
  children: PropTypes.node,
};
