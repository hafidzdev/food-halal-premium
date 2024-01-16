import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Masonry from "@mui/lab/Masonry";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import Button, { buttonClasses } from "@mui/material/Button";

import { usePathname } from "next/navigation";
import { RouterLink } from "@/routes/components";

import { useBoolean } from "@/hooks/use-boolean";
import { useResponsive } from "@/hooks/use-responsive";

import Iconify from "@/components/partials/Iconify";

import { pageLinks, navConfig } from "../config-navigation";

// ----------------------------------------------------------------------

const StyledAppStoreButton = styled(Button)(({ theme }) => ({
  flexShrink: 0,
  padding: "5px 12px",
  color: theme.palette.common.white,
  border: `solid 1px ${alpha(theme.palette.common.black, 0.24)}`,
  background: `linear-gradient(180deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
  [`& .${buttonClasses.startIcon}`]: {
    marginLeft: 0,
  },
}));

const _socials = [
  {
    value: "facebook",
    label: "FaceBook",
    icon: "carbon:logo-facebook",
    color: "#1877F2",
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: "carbon:logo-instagram",
    color: "#E02D69",
  },
  {
    value: "linkedin",
    label: "Linkedin",
    icon: "carbon:logo-linkedin",
    color: "#007EBB",
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: "carbon:logo-twitter",
    color: "#00AAEC",
  },
];

// ----------------------------------------------------------------------

export default function Footer() {
  const mdUp = useResponsive("up", "md");

  const pathname = usePathname();

  const mobileList = navConfig.find((i) => i.title === "Pages")?.children || [];

  const desktopList = pageLinks.sort(
    (listA, listB) => Number(listA.order) - Number(listB.order)
  );

  const renderLists = mdUp ? desktopList : mobileList;

  const mainFooter = (
    <>
      <Divider />

      <Container
        sx={{
          overflow: "hidden",
          py: { xs: 8, md: 10 },
        }}
      >
        <Grid container spacing={3} justifyContent={{ md: "flex-start" }}>
          <Grid xs={12} md={5}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                {/* <Logo /> */}

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  The starting point for your next project based on
                  easy-to-customize Material-UI © helps you build apps faster
                  and better.
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Social</Typography>
                <Stack direction="row" alignItems="center">
                  {_socials.map((social) => (
                    <IconButton
                      aria-label="Media social"
                      key={social.value}
                      color="primary"
                    >
                      <Iconify icon={social.icon} />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Apps</Typography>
                <AppStoreButton />
              </Stack>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            {mdUp ? (
              <Masonry
                columns={4}
                spacing={2}
                defaultColumns={4}
                defaultSpacing={2}
              >
                {renderLists.map((list) => (
                  <ListDesktop key={list.subheader} list={list} />
                ))}
              </Masonry>
            ) : (
              <Stack spacing={1.5}>
                {renderLists.map((list) => (
                  <ListMobile key={list.subheader} list={list} />
                ))}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          spacing={2.5}
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: "center" }}
        >
          <Typography
            id="rights-reserved"
            variant="caption"
            sx={{ color: "text.secondary", marginX: "auto" }}
          >
            Food Halal Premium © 2023. All rights reserved
          </Typography>

          <Stack direction="row" spacing={3} justifyContent="center">
            <Link href="/" variant="caption" sx={{ color: "text.secondary" }}>
              Help Center
            </Link>

            <Link href="/" variant="caption" sx={{ color: "text.secondary" }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <footer>{mainFooter}</footer>;
}

// ----------------------------------------------------------------------

export function ListDesktop({ list }) {
  const pathname = usePathname();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography variant="subtitle1">{list.subheader}</Typography>
      {list.items?.map((link) => {
        const active = pathname === link.path || pathname === `${link.path}/`;
        return (
          <Link
            component={RouterLink}
            key={link.title}
            href={link.path}
            variant="body2"
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "text.primary",
              },
              // ...(active && {
              //   color: "text.primary",
              //   fontWeight: "fontWeightSemiBold",
              // }),
            }}
          >
            {link.title}
          </Link>
        );
      })}
    </Stack>
  );
}

ListDesktop.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

export function ListMobile({ list }) {
  const pathname = usePathname();

  const listExpand = useBoolean();

  return (
    <Stack spacing={1.5} alignItems="flex-start">
      <Typography
        variant="subtitle2"
        onClick={listExpand.onToggle}
        sx={{
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {list.subheader}
        <Iconify
          width={16}
          icon={
            listExpand.value ? "carbon:chevron-down" : "carbon:chevron-right"
          }
          sx={{ ml: 0.5 }}
        />
      </Typography>

      <Collapse in={listExpand.value} unmountOnExit sx={{ width: 1 }}>
        <Stack spacing={1.5} alignItems="flex-start">
          {list.items?.map((link) => (
            <Link
              component={RouterLink}
              key={link.title}
              href={link.path}
              variant="caption"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "text.primary",
                },
                ...(pathname === `${link.path}/` && {
                  color: "text.primary",
                  fontWeight: "fontWeightSemiBold",
                }),
              }}
            >
              {link.title}
            </Link>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}

ListMobile.propTypes = {
  list: PropTypes.shape({
    items: PropTypes.array,
    subheader: PropTypes.string,
  }),
};

// ----------------------------------------------------------------------

function AppStoreButton({ ...other }) {
  return (
    <Stack direction="row" flexWrap="wrap" spacing={2} {...other}>
      <StyledAppStoreButton
        startIcon={<Iconify icon="ri:apple-fill" width={28} />}
      >
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download on the
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Apple Store
          </Typography>
        </Stack>
      </StyledAppStoreButton>

      <StyledAppStoreButton
        startIcon={<Iconify icon="logos:google-play-icon" width={28} />}
      >
        <Stack alignItems="flex-start">
          <Typography variant="caption" sx={{ opacity: 0.72 }}>
            Download from
          </Typography>

          <Typography variant="h6" sx={{ mt: -0.5 }}>
            Google Play
          </Typography>
        </Stack>
      </StyledAppStoreButton>
    </Stack>
  );
}
