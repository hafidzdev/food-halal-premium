import { useState } from "react";

import PropTypes from "prop-types";

import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { alpha, Backdrop, CircularProgress } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import { useActiveLink } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { useResponsive } from "@/hooks/use-responsive";

import Iconify from "@/components/partials/Iconify";
import TextMaxLine from "@/components/partials/text-max-line";
import { useSession } from "next-auth/react";
import { UpdatePhotoProfile } from "@/services/Profile";

// ----------------------------------------------------------------------

const navigations = [
  {
    title: "Personal Info",
    path: "/account/personal",
    icon: <Iconify icon="carbon:user" />,
  },
  {
    title: "Wishlist",
    path: "#",
    icon: <Iconify icon="carbon:favorite" />,
  },
  {
    title: "Orders",
    path: "#",
    icon: <Iconify icon="carbon:document" />,
  },
  {
    title: "Payment",
    path: "#",
    icon: <Iconify icon="carbon:purchase" />,
  },
];

// ----------------------------------------------------------------------

export default function Nav({ open, onClose }) {
  const { data: session } = useSession();
  const profile = session?.user;

  const mdUp = useResponsive("up", "md");

  const [imageIsChanged, setImageIsChanged] = useState(""); // condition if image profile is change
  const [imageIsValidate, setImageIsValidate] = useState(false); // image upload validation
  const [openBackdrop, setOpenBackdrop] = useState(false); // backdrop after uploada json
  const [openNotif, setOpenNotif] = useState(false); // notification state
  const [openErrorNotif, setOpenErrorNotif] = useState({
    open: false,
    message: "",
  }); // eror notification state

  const handleUploadImage = async () => {
    setOpenBackdrop(true);
    const formData = new FormData();
    formData.append("image", imageIsChanged);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}product/v1/settings/upload/images`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (response?.status === 200) {
      UpdatePhotoProfile(session?.user?.slug, imageURL).then((res) => {
        if (res.error) {
          setOpenBackdrop(false);
          setOpenErrorNotif({
            open: true,
            message: `Eror, ${res.message}`,
          });
          setImageIsChanged(false);
        } else {
          update({
            image_url: res?.data?.image_url,
          });

          setOpenBackdrop(false);
          setOpenNotif(true);
          setImageIsChanged(false);
        }
      });
      let imageURL = data?.response;
    } else {
      setOpenBackdrop(false);
      setOpenErrorNotif({
        open: true,
        message: `Eror upload image`,
      });
    }
  };

  const renderContent = (
    <Stack
      sx={{
        flexShrink: 0,
        borderRadius: 2,
        width: 1,
        ...(mdUp && {
          width: 280,
          border: (theme) =>
            `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        }),
      }}
    >
      <Stack spacing={2} sx={{ p: 3, pb: 2 }}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar src={profile?.image_url} sx={{ width: 64, height: 64 }} />
          <Stack
            direction="row"
            alignItems="center"
            component="label"
            htmlFor="upload-image-input"
            sx={{
              typography: "caption",
              cursor: "pointer",
              "&:hover": { opacity: 0.72 },
            }}
          >
            <input
              type="file"
              id="upload-image-input"
              accept="image/*"
              style={{ display: "none" }}
              // onChange={handleUploadImage}
            />
            <Iconify icon="carbon:edit" sx={{ mr: 1 }} />
            Upload Image
          </Stack>
        </Stack>

        <Stack spacing={0.5}>
          <TextMaxLine variant="subtitle1" line={1}>
            {profile?.first_name} {profile?.last_name}
          </TextMaxLine>
          <TextMaxLine
            variant="body2"
            line={1}
            sx={{ color: "text.secondary" }}
          >
            {profile?.email}
          </TextMaxLine>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Stack sx={{ my: 1, px: 2 }}>
        {navigations.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: "dashed" }} />

      <Stack sx={{ my: 1, px: 2 }}>
        <ListItemButton
          sx={{
            px: 1,
            height: 44,
            borderRadius: 1,
          }}
        >
          <ListItemIcon>
            <Iconify icon="carbon:logout" />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{
              typography: "body2",
            }}
          />
        </ListItemButton>
      </Stack>
    </Stack>
  );

  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBackdrop}
  >
    <CircularProgress color="primary" />
  </Backdrop>;

  return (
    <>
      {mdUp ? (
        renderContent
      ) : (
        <Drawer
          open={open}
          onClose={onClose}
          PaperProps={{
            sx: {
              width: 280,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

Nav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const active = useActiveLink(item.path);

  return (
    <Link
      component={RouterLink}
      key={item.title}
      href={item.path}
      color={active ? "primary" : "inherit"}
      underline="none"
    >
      <ListItemButton
        sx={{
          px: 1,
          height: 44,
          borderRadius: 1,
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText
          primary={item.title}
          primaryTypographyProps={{
            typography: "body2",
            ...(active && {
              typography: "subtitle2",
            }),
          }}
        />
      </ListItemButton>
    </Link>
  );
}

NavItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    path: PropTypes.string,
    title: PropTypes.string,
  }),
};
