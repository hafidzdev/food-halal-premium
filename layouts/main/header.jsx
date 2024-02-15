import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { Typography, Divider, Link, Button } from "@mui/material";
import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";
import useOffSetTop from "@/hooks/use-off-set-top";

import { bgBlur } from "@/theme/css";

import { useSession } from "next-auth/react";

import { NavBasicDesktop } from "@/components/partials/nav-basic";
import NavMobile from "./nav/mobile";
import { HEADER } from "../config-layout";
import HeaderShadow from "../common/header-shadow";
import SettingMode from "@/components/partials/mode/SettingMode";
import ProfilePopover from "@/components/partials/profile-popover/ProfilePopover";

import Image from "next/legacy/image";

// ----------------------------------------------------------------------
const mainNav = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Products",
    path: "/product",
  },
  {
    title: "Cart",
    path: "/cart",
  },
  {
    title: "About Us",
    path: "#",
  },
  {
    title: "Privacy Policy",
    path: "#",
  },
];

export default function Header({ headerOnDark }) {
  const { status } = useSession();
  const theme = useTheme();

  const offset = useOffSetTop();
  const mdUp = useResponsive("up", "md");

  const navData = mainNav;

  // initialize locales
  // const { translate } = useLocales();

  const renderContent = (
    <>
      <Box
        sx={{
          lineHeight: 0,
          position: "relative",
          flexGrow: 1,
          display: "flex",
          mt: 1,
        }}
      >
        <Link component={RouterLink} href="/">
          <Image
            alt="Logo"
            src="https://firebasestorage.googleapis.com/v0/b/staging-xetia-io-01.appspot.com/o/entity-info%2FWhatsApp%20Image%202024-01-29%20at%2013.36.25.jpeg?alt=media&token=64f18e64-2b26-4223-bf1a-16c550e48f09"
            width={"40"}
            height={"40"}
            priority
            style={{ borderRadius: 2 }}
          />
        </Link>
        <Typography variant="h5" component="div" sx={{ ml: 2, mt: 0.5 }}>
          {"Shop Manager"}
        </Typography>
      </Box>

      {mdUp ? (
        <NavBasicDesktop
          flexGrow={1}
          alignItems="center"
          sx={{ height: 1 }}
          justifyContent="center"
          slotProps={{
            rootItem: {
              "& .icon": { display: "none" },
            },
          }}
          data={navData}
        />
      ) : (
        <Box sx={{ flexGrow: 1 }} />
      )}

      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Searchbar /> */}
          <SettingMode />
          {/* 
          <LanguagePopover
            sx={{
              ...(isScrolling && { color: "text.primary" }),
            }}
          /> */}

          {status === "authenticated" ? (
            <>
              <ProfilePopover />
            </>
          ) : (
            <>
              {mdUp ? (
                <>
                  <Divider orientation="vertical" sx={{ height: 24 }} />
                  <Stack direction="row" spacing={1}>
                    <Link component={RouterLink} href="/signup">
                      <div>
                        <Button
                          color="inherit"
                          variant="outlined"
                          sx={{
                            color: "text.primary",
                          }}
                        >
                          Register
                        </Button>
                      </div>
                    </Link>

                    <Link component={RouterLink} href="/signin">
                      <div>
                        <Button variant="contained">Login</Button>
                      </div>
                    </Link>
                  </Stack>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </Stack>
      </Stack>

      {!mdUp && <NavMobile data={navData} />}
    </>
  );

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(["height", "background-color"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: "common.white",
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: "text.primary",
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {renderContent}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
