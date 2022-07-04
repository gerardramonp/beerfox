/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, FC, ReactNode, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { TTheme } from "../ui/themeOptions";
import useMaterialTheme from "../hooks/useMaterialTheme";

interface IThemeContext {
  theme: TTheme;
  setTheme: React.Dispatch<React.SetStateAction<TTheme>>;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
});

interface IThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContextProvider: FC<IThemeContextProviderProps> = ({ children }) => {
  const [usedTheme, setUsedTheme] = useState<TTheme>("light");

  const theme = useMaterialTheme(usedTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme: usedTheme,
        setTheme: setUsedTheme,
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
