"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";

const ModeContext = createContext();

export const useModeContext = () => {
  const context = useContext(ModeContext);

  return context;
};

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setMode(storedTheme);
  }, []);

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
        localStorage.setItem("theme", mode === "light" ? "dark" : "light");
      },
    }),
    [mode]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}
