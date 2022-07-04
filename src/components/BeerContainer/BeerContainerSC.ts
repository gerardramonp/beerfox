import styled from "@emotion/styled";
import { Paper, Button, Box } from "@mui/material";
import { BREAKPOINT_SM } from "../../ui/themeOptions";

export const BEER_INFO_WIDTH = 75;

export const StyledBeerCardContainer = styled(Paper)`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    flex-direction: row;
    padding: 2rem;
    align-items: center;
  }
`;

export const StyledBeerActionsContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    width: calc(100% - ${BEER_INFO_WIDTH}%);
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    align-self: flex-end;
  }
`;

export const StyledActionButton = styled(Button)<{ $lastchild?: boolean }>`
  margin-bottom: ${({ $lastchild }) => ($lastchild ? 0 : "1rem")};
`;
