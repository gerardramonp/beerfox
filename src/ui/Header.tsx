import {
  AppBar,
  FormControlLabel,
  FormGroup,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC, useCallback, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { BREAKPOINT_LG } from "./themeOptions";

const Header: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleSwitchTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [theme]);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: BREAKPOINT_LG,
        }}
      >
        <Typography variant="h1" sx={{ flexGrow: 1 }}>
          Beerfox
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch onChange={handleSwitchTheme} checked={theme === "dark"} />
            }
            label="Dark mode"
            sx={{ marginRight: 0 }}
          />
        </FormGroup>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
