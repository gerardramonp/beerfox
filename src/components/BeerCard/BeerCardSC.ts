import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { BREAKPOINT_SM } from "../../ui/themeOptions";
import { BEER_INFO_WIDTH } from "../BeerContainer/BeerContainerSC";

export const StyledBeerInfoContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    width: ${BEER_INFO_WIDTH}%;
    margin-bottom: 0;
    align-items: flex-start;
  }
`;

export const StyledBeerName = styled(Typography)`
  text-align: left;
  margin-bottom: 1rem;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin-bottom: 2rem;
  }
`;

export const StyledBeerBody = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const StyledBeerImage = styled.img`
  height: 200px;
  border-radius: 0.5rem;
  margin-bottom: 1rem;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin-bottom: 0;
    margin-right: 3rem;
  }
`;

export const StyledBeerDescription = styled(Typography)`
  text-align: justify;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    flex: 1;
    padding-right: 1.5rem;
  }
`;
