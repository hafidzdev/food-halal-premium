import { useEffect } from "react";
import PropTypes from "prop-types";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import { usePathname } from "@/routes/hooks";
import { useBoolean } from "@/hooks/use-boolean";

// import Logo from "src/components/logo";
import Iconify from "@/components/partials/Iconify";
import Scrollbar from "@/components/partials/scrollbar";

import { NavBasicMobile } from "@/components/partials/nav-basic";
import { NAV } from "@/layouts/config-layout";

// ----------------------------------------------------------------------

export default function NavMobile({ data }) {
  const pathname = usePathname();

  const mobileOpen = useBoolean();

  useEffect(() => {
    if (mobileOpen.value) {
      mobileOpen.onFalse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <IconButton onClick={mobileOpen.onTrue} sx={{ ml: 1, color: "inherit" }}>
        <Iconify icon="carbon:menu" />
      </IconButton>

      <Drawer
        open={mobileOpen.value}
        onClose={mobileOpen.onFalse}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_VERTICAL,
          },
        }}
      >
        <Scrollbar>
          {/* Logo */}
          {/* <Logo sx={{ mx: 2.5, my: 3 }} /> */}

          <NavBasicMobile data={data} />
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
};
