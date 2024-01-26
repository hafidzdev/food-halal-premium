import PropTypes from "prop-types";
import { useState } from "react";
import Link from "next/link";
// @mui
import { Avatar, MenuItem, Stack } from "@mui/material";
// components
import IconButtonAnimate from "../animate/IconButtonAnimate";
import MenuPopover from "../menu-popover/MenuPopover";
// locales
import { useSession, signOut } from "next-auth/react";

// eslint-disable-next-line no-use-before-define
ProfilePopover.propTypes = {
  sx: PropTypes.object,
};

export default function ProfilePopover({ sx }) {
  const { data: session, status } = useSession();
  const profile = session?.user;

  const [openPopover, setOpenPopover] = useState(null);

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  if (status === "authenticated") {
    return (
      <>
        <IconButtonAnimate
          color="inherit"
          onClick={handleOpenPopover}
          sx={{
            width: 40,
            height: 40,
            ...(openPopover && {
              bgcolor: "action.selected",
            }),
          }}
        >
          <Avatar
            src={profile?.image_url}
            alt="My profile"
            sx={{ width: 26, height: 26 }}
          />
        </IconButtonAnimate>

        <MenuPopover
          open={openPopover}
          onClose={handleClosePopover}
          sx={{ width: 180 }}
        >
          <Stack spacing={0}>
            <Link
              href="account/personal"
              prefetch={false}
              passHref
              legacyBehavior
            >
              <MenuItem onClick={handleClosePopover}>Profile</MenuItem>
            </Link>
            <Link href="/cart" prefetch={false} passHref legacyBehavior>
              <MenuItem>Cart</MenuItem>
            </Link>
            <Link href={signOut()} prefetch={false} passHref legacyBehavior>
              <MenuItem>Logout</MenuItem>
            </Link>
          </Stack>
        </MenuPopover>
      </>
    );
  }
  return null;
}
