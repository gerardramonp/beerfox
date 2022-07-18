import {
  AppBar,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
  IconButton,
} from "@mui/material";
import { FC, ReactElement } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
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

interface IHeaderProps {
  toggleMenuOpen: () => void;
}

const Header: FC<IHeaderProps> = ({ toggleMenuOpen }) => (
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
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton onClick={toggleMenuOpen}>
          <MenuRoundedIcon sx={{ color: "white" }} />
        </IconButton>

        <Typography variant="h1">Jairo</Typography>
        <Typography variant="h1">Jairo</Typography>
        <Typography variant="h1">Jairo</Typography>
        <Typography variant="h1">Jairo</Typography>
      </Toolbar>
    </AppBar>
  </HideOnScroll>
);

export default Header;
