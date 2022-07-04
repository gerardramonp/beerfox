import styled from "@emotion/styled";
import { Box, Button, FormControl } from "@mui/material";
import { BREAKPOINT_SM } from "../../ui/themeOptions";

export const StyledFiltersContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin-top: 1rem;
    flex-direction: row;
    padding-right: 2rem;
    align-items: flex-start;
  }
`;

export const StyledInputsContainer = styled(Box)`
  display: flex;
  flex-direction: column-reverse;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const StyledFiltersTypeContainer = styled(FormControl)`
  margin: 1rem 0;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin: 0;
    margin-left: 1rem;
  }
`;

export const StyledFlexGrow = styled(Box)`
  flex: 1;
`;

export const StyledSearchButton = styled(Button)`
  margin-top: 1rem;
  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin-top: 0;
  }
`;
