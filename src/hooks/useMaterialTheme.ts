import { createTheme } from "@mui/material";
import { buildThemeOptions, TTheme } from "../ui/themeOptions";

export default function useMaterialTheme(theme: TTheme) {
  const themeOptions = buildThemeOptions(theme);

  return createTheme(themeOptions);
}
