import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";

import CustomBreadcrumbs from "@/components/partials/custom-breadcrumbs";
import { RouterLink } from "@/routes/components";
import { bgGradient } from "@/theme/css";
import Iconify from "@/components/partials/Iconify";

// ----------------------------------------------------------------------

export default function Breadcrumbs({ menuLink }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: "/assets/background/overlay_1.jpg",
        }),
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          height: { xs: 64, md: 72 },
        }}
      >
        <CustomBreadcrumbs
          links={menuLink}
          sx={{
            mt: 8,
            mb: { xs: 5, md: 8 },
            "& a": {
              color: "text.primary",
            },
          }}
        />
        <Stack
          spacing={3}
          direction="row"
          alignItems="center"
          flexGrow={1}
          justifyContent="flex-end"
        >
          <Badge badgeContent={2} color="info">
            <IconButton
              component={RouterLink}
              href={"#"}
              size="small"
              color="inherit"
              sx={{ p: 0 }}
            >
              <Iconify icon="carbon:favorite" width={24} />
            </IconButton>
          </Badge>

          <Badge badgeContent={4} color="error">
            <IconButton
              component={RouterLink}
              href={"#"}
              size="small"
              color="inherit"
              sx={{ p: 0 }}
            >
              <Iconify icon="carbon:shopping-cart" width={24} />
            </IconButton>
          </Badge>

          <IconButton
            component={RouterLink}
            href={""}
            size="small"
            color="inherit"
            sx={{ p: 0 }}
          >
            <Iconify icon="carbon:user" width={24} />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

Breadcrumbs.propTypes = {
  menuLink: PropTypes.array,
};
