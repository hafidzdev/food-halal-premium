import PropTypes from "prop-types";
import MainLayouts from "@/layouts/main";
import EcommerceLayout from "@/layouts/e-commerce";

const menuLink = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Product",
  },
];

export default function Layout({ children }) {
  return (
    <MainLayouts>
      <EcommerceLayout menuLink={menuLink}>{children}</EcommerceLayout>
    </MainLayouts>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
