import { AppBar, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { BREAKPOINT_LG } from "./themeOptions";

const Header: FC = () => (
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
    </Toolbar>
  </AppBar>
);

export default Header;
