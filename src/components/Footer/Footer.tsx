import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { FC, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { COLOR_MAIN_DARK, COLOR_MAIN_LIGHT } from "../../ui/themeOptions";

const StyledFooter = styled.footer`
  padding: 1rem 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Footer: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <StyledFooter
      style={{
        backgroundColor: theme === "light" ? COLOR_MAIN_LIGHT : COLOR_MAIN_DARK,
      }}
    >
      <Typography
        sx={{
          color: "white",
        }}
      >
        Created by Gerard Ramon Monte
      </Typography>
    </StyledFooter>
  );
};

export default Footer;
