import styled from "@emotion/styled";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { FC } from "react";
import Brightness4RoundedIcon from "@mui/icons-material/Brightness4Rounded";
import SportsBarRoundedIcon from "@mui/icons-material/SportsBarRounded";
import BeerABVSelect from "../components/BeerABVSelect/BeerABVSelect";
import ThemeSwitch from "../components/ThemeSwitch/ThemeSwitch";

const StyledDrawerMenuContainer = styled(List)`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100%;
  width: 100%;
  width: 300px;
`;

const DrawerMenu: FC = () => (
  <StyledDrawerMenuContainer
    subheader={
      <ListSubheader
        sx={{
          backgroundColor: "background.default",
          fontSize: "1.3rem",
          marginBottom: "1rem",
        }}
      >
        Settings
      </ListSubheader>
    }
  >
    <ListItem sx={{ marginBottom: "1.5rem" }}>
      <ListItemIcon>
        <Brightness4RoundedIcon />
      </ListItemIcon>
      <ListItemText id="switch-list-label-theme" primary="Dark theme" />

      <ThemeSwitch />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <SportsBarRoundedIcon />
      </ListItemIcon>
      <BeerABVSelect />
    </ListItem>
  </StyledDrawerMenuContainer>
);

export default DrawerMenu;
