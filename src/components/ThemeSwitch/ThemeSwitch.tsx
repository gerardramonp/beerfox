import { Switch } from "@mui/material";
import { FC, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContextProvider";

const ThemeSwitch: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch onChange={toggleTheme} checked={theme === "dark"} edge="end" />
  );
};

export default ThemeSwitch;
