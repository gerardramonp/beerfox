import styled from "@emotion/styled";
import { Box, Button, Paper, Typography } from "@mui/material";
import { BREAKPOINT_SM } from "../../ui/themeOptions";

export const StyledLiteBeerCardContainer = styled(Paper)`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    flex-direction: row;
    padding: 2rem;
  }
`;

export const StyledImageContainer = styled(Box)`
  width: 4rem;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin-bottom: 0;
    margin-right: 2rem;
  }
`;

export const StyledLiteBeerInfoContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    align-items: flex-start;
  }
`;

export const StyledLiteBeerImage = styled.img`
  height: 6rem;
`;

export const StyledLiteBeerName = styled(Typography)`
  margin-bottom: 0.5rem;
`;

export const StyledLiteBeerDescriptionContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const StyledLiteBeerCollapsedDescription = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: justify;
`;

export const StyledLiteBeerExpandedDescription = styled(Typography)`
  text-align: justify;
`;

export const StyledLiteBeerSeeMore = styled(Button)`
  text-transform: none;
  &:hover {
    background: none;
  }

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    text-align: left;
    display: flex;
    justify-content: flex-end;
  }
`;
