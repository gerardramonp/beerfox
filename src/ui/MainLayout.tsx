import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { useWindowSize } from "react-use";
import { BREAKPOINT_SM, BREAKPOINT_LG } from "./themeOptions";

interface IMainLayoutProps {
  children: JSX.Element;
}
const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const { width } = useWindowSize();

  return (
    <>
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
            BFlox
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: width > BREAKPOINT_SM ? "64px" : "56px",
          height:
            width > BREAKPOINT_SM ? "calc(100% - 64px)" : "calc(100% - 56px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: BREAKPOINT_LG,
            padding: width > BREAKPOINT_SM ? "1.5rem" : "1rem",
          }}
        >
          {children}
        </Box>

        <footer>Footer</footer>
      </Box>
    </>
  );
};

export default MainLayout;
