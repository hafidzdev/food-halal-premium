import { useEffect } from "react";
import PropTypes from "prop-types";

import Drawer from "@mui/material/Drawer";
import { Stack, Button, IconButton } from "@mui/material";

import { usePathname } from "@/routes/hooks";
import { useBoolean } from "@/hooks/use-boolean";

// import Logo from "src/components/logo";
import Iconify from "@/components/partials/Iconify";
import Scrollbar from "@/components/partials/scrollbar";

import { NavBasicMobile } from "@/components/partials/nav-basic";
import { NAV } from "@/layouts/config-layout";

import Link from "next/link";
import { useSession } from "next-auth/react";

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

  const { status } = useSession();

  return (
    <>
      <IconButton
        aria-label="nav menu"
        onClick={mobileOpen.onTrue}
        sx={{ ml: 1, color: "inherit" }}
      >
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

          {status !== "authenticated" ? (
            <Stack spacing={2} sx={{ p: 2.5, pb: 5 }}>
              <Link href="/login" passHref legacyBehavior>
                <Button fullWidth variant="outlined" color="inherit">
                  Login
                </Button>
              </Link>

              <Link href="/register" passHref legacyBehavior>
                <Button fullWidth variant="contained" color="inherit">
                  Register
                </Button>
              </Link>
            </Stack>
          ) : (
            ""
          )}
        </Scrollbar>
      </Drawer>
    </>
  );
}

NavMobile.propTypes = {
  data: PropTypes.array,
};
