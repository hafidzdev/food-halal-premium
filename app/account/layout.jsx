"use client";

import PropTypes from "prop-types";
import MainLayouts from "@/layouts/main";
import EcommerceLayout from "@/layouts/e-commerce";
import AccountLayout from "@/layouts/account";

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
      <EcommerceLayout menuLink={menuLink}>
        <AccountLayout>{children}</AccountLayout>
      </EcommerceLayout>
    </MainLayouts>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
