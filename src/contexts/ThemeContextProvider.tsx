/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, FC, ReactNode, useCallback, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { TTheme } from "../ui/themeOptions";
import useMaterialTheme from "../hooks/useMaterialTheme";

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  toggleTheme: () => {},
});

interface IThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContextProvider: FC<IThemeContextProviderProps> = ({ children }) => {
  const [usedTheme, setUsedTheme] = useState<TTheme>("light");

  const theme = useMaterialTheme(usedTheme);

  const handleToggleTheme = useCallback(() => {
    if (usedTheme === "light") {
      setUsedTheme("dark");
    } else {
      setUsedTheme("light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: usedTheme,
        toggleTheme: handleToggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
