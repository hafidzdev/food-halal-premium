"use client";

import PropTypes from "prop-types";
import { createContext, useContext } from "react";
// hooks
import useLocalStorage from "@/hooks/useLocalStorage";

// ----------------------------------------------------------------------
const defaultSettings = {
  // light | dark
  themeMode: "light",
  themeColorPresets: "default",
  // locale: 'en',
};

const settingStorage =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("settings"))
    : false;
const currentSettings = settingStorage ? settingStorage : defaultSettings;

const initialState = {
  ...currentSettings,
  onToggleMode: () => {},
  onToggleDirection: () => {},
  onChangeColorPresets: () => {},
  onResetSetting: () => {},
  colorOption: [],
};

const SettingsContext = createContext(initialState);

const useSettingsContext = () => {
  const context = useContext(SettingsContext);

  if (!context)
    throw new Error("useSettingsContext must be use inside SettingsProvider");

  return context;
};

// eslint-disable-next-line no-use-before-define
SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function SettingsProvider({ children }) {
  const settingStorage =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("settings"))
      : false;
  const currentSettings = settingStorage ? settingStorage : defaultSettings;

  const [settings, setSettings] = useLocalStorage("settings", {
    ...currentSettings,
  });

  const onToggleMode = (value) => {
    setSettings({
      ...settings,
      themeMode: value,
    });
  };

  const onToggleLocale = (value) => {
    setSettings({
      ...settings,
      locale: value,
    });
  };

  const onResetSetting = () => {
    setSettings({
      ...defaultSettings,
    });
  };

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onToggleMode,
        onToggleLocale,

        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext, useSettingsContext };
