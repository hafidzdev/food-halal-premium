"use client";

//
import Iconify from "../Iconify";

import { IconButton } from "@mui/material";
import { useSettingsContext } from "@/components/settings";

export default function SettingMode() {
  const settings = useSettingsContext();

  return (
    <IconButton
      onClick={() =>
        settings.onUpdate(
          "themeMode",
          settings.themeMode === "dark" ? "light" : "dark"
        )
      }
    >
      <Iconify
        icon={settings.themeMode === "light" ? "carbon:asleep" : "carbon:light"}
        sx={{
          width: 20,
          height: 20,
          color: settings.themeMode === "light" ? "inherit" : "primary.main",
        }}
      />
    </IconButton>
  );
}
