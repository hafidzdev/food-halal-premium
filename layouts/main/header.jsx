import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

import { useResponsive } from "@/hooks/use-responsive";
import useOffSetTop from "@/hooks/use-off-set-top";

import { bgBlur } from "@/theme/css";

import { signIn, signOut, useSession } from "next-auth/react";

import { NavBasicDesktop } from "@/components/partials/nav-basic";
import NavMobile from "./nav/mobile";
import { HEADER } from "../config-layout";
import HeaderShadow from "../common/header-shadow";
import SettingMode from "@/components/partials/mode/SettingMode";
import { useCart } from "@/context/CartContext";

// ----------------------------------------------------------------------
const mainNav = [
  {
    title: "Home",
    path: "/",
  },
  // {
  //   title: "Examples",
  //   path: "/examples",
  //   children: [
  //     { title: "Travel", path: "/examples/travel" },
  //     { title: "Education", path: "/examples/education" },
  //   ],
  // },
  {
    title: "E-Commerce",
    path: "/e-commerce",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Privacy Policy",
    path: "/privacy-policy",
  },
];

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <Typography variant="body2">
          {session?.user?.first_name} {session?.user?.last_name}
        </Typography>
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
      <Typography variant="body2">Not signed in</Typography>
    </>
  );
}

export default function Header({ headerOnDark }) {
  const theme = useTheme();
  const [cart] = useCart();

  const offset = useOffSetTop();

  const mdUp = useResponsive("up", "md");

  const navData = mainNav;

  const renderContent = (
    <>
      <Box sx={{ lineHeight: 0, position: "relative" }}>
        {/* <Logo /> */}
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, display: "flex", alignItems: "baseline" }}
        >
          {"Food Halal Premium"}
        </Typography>
      </Box>

      {mdUp ? (
        // <Stack >
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
        // </Stack>
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
          {cart?.length} Cart
          {/* <SettingsButton /> */}
          <AuthButton />
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
