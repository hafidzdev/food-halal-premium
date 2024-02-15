import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { alpha, useTheme } from "@mui/material/styles";

import CustomBreadcrumbs from "@/components/partials/custom-breadcrumbs";
import { bgGradient } from "@/theme/css";

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
      </Container>
    </Box>
  );
}

Breadcrumbs.propTypes = {
  menuLink: PropTypes.array,
};
