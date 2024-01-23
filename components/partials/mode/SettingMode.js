"use client";

//
import Iconify from "../Iconify";
import { useSettingsContext } from "@/components/settings";
import IconButtonAnimate from "../animate/IconButtonAnimate";

export default function SettingMode() {
  const settings = useSettingsContext();

  const isLight = settings.themeMode === "light";

  return (
    <IconButtonAnimate
      selected={!isLight}
      onClick={() =>
        settings.onUpdate(
          "themeMode",
          settings.themeMode === "dark" ? "light" : "dark"
        )
      }
    >
      <Iconify
        icon={isLight ? "carbon:asleep" : "carbon:asleep-filled"}
        sx={{
          width: 22,
          height: 22,
          color: isLight ? "inherit" : "primary.main",
        }}
      />
    </IconButtonAnimate>
  );
}
