import { Box, Drawer } from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useWindowSize } from "react-use";
import DrawerMenu from "./DrawerMenu";
import Header from "./Header";
import { BREAKPOINT_SM, BREAKPOINT_LG } from "./themeOptions";

interface IMainLayoutProps {
  children: JSX.Element;
}
const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { width } = useWindowSize();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      <Header toggleMenuOpen={toggleMenu} />
      <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
        <DrawerMenu />
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: width >= BREAKPOINT_SM ? "64px" : "56px",
          height:
            width >= BREAKPOINT_SM ? "calc(100% - 64px)" : "calc(100% - 56px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: BREAKPOINT_LG,
            padding: width >= BREAKPOINT_SM ? "1.5rem" : "1rem",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
