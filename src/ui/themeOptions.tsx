import { ThemeOptions } from "@mui/material";

export const BREAKPOINT_XS = 0;
export const BREAKPOINT_SM = 600;
export const BREAKPOINT_MD = 1000;
export const BREAKPOINT_LG = 1280;
export const BREAKPOINT_XL = 1920;

export const COLOR_MAIN_LIGHT = "#1876D1";
export const COLOR_MAIN_DARK = "#272727";

export type TTheme = "light" | "dark";

export function buildThemeOptions(theme: TTheme) {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: theme,
    },
    breakpoints: {
      values: {
        xs: BREAKPOINT_XS,
        sm: BREAKPOINT_SM,
        md: BREAKPOINT_MD,
        lg: BREAKPOINT_LG,
        xl: BREAKPOINT_XL,
      },
    },

    typography: {
      h1: {
        fontSize: "2rem",
        fontWeight: 600,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 600,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.4rem",
        fontWeight: 500,
      },
    },
  };

  return themeOptions;
}
