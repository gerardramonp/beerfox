import { Box } from "@mui/material";
import { FC } from "react";
import { useWindowSize } from "react-use";
import Footer from "../components/Footer/Footer";
import Header from "./Header";
import { BREAKPOINT_SM, BREAKPOINT_LG } from "./themeOptions";

interface IMainLayoutProps {
  children: JSX.Element;
}
const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  const { width } = useWindowSize();

  return (
    <>
      <Header />
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

        <Footer />
      </Box>
    </>
  );
};

export default MainLayout;
