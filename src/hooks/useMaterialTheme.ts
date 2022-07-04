import { createTheme } from "@mui/material";
import { buildThemeOptions, TTheme } from "../ui/themeOptions";

export default function useMaterialTheme(theme: TTheme) {
  const themeOptions = buildThemeOptions(theme);

  const muiTheme = createTheme(themeOptions);

  return muiTheme;
}
