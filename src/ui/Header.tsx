import {
  AppBar,
  FormControlLabel,
  FormGroup,
  Slide,
  Switch,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import { FC, ReactElement, useCallback, useContext } from "react";
import BeerABVSelect from "../components/BeerABVSelect/BeerABVSelect";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { BREAKPOINT_LG } from "./themeOptions";

interface IHideOnScrollProps {
  children: ReactElement;
}

const HideOnScroll = ({ children }: IHideOnScrollProps) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

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
    <HideOnScroll>
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

          <BeerABVSelect />

          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onChange={handleSwitchTheme}
                  checked={theme === "dark"}
                />
              }
              label="Dark mode"
              sx={{ marginRight: 0 }}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
