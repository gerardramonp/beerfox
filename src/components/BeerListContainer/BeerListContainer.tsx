import styled from "@emotion/styled";
import { Box, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC, useCallback } from "react";
import useBeersFilters from "../../hooks/useBeersFilters";
import useGetBeersQuery from "../../queries/useGetBeersQuery";
import { downVariants, leftVariants } from "../../ui/FramerMotionVariants";
import { BREAKPOINT_SM } from "../../ui/themeOptions";
import BeerCardError from "../BeerCard/BeerCardError";
import BeerCardWarning from "../BeerCard/BeerCardWarning";
import BeersFilters from "../BeersFilters/BeersFilters";
import LiteBeerCard from "../LiteBeerCard/LiteBeerCard";

const StyledBeerListContainer = styled(Box)`
  margin-top: 1rem;

  @media only screen and (min-width: ${BREAKPOINT_SM}px) {
    margin-top: 2rem;
  }
`;

const StyledBeerList = styled(Box)`
  margin-top: 1rem;
`;

const BeerListContainer: FC = () => {
  const { filters, setFilters } = useBeersFilters();

  const getBeersQuery = useGetBeersQuery(filters);

  const handleSearchClick = useCallback(() => getBeersQuery.refetch(), []);

  return (
    <StyledBeerListContainer
      component={motion.div}
      // @ts-ignore
      initial="initial"
      animate="animate"
      variants={downVariants}
    >
      <Typography variant="h4">Search</Typography>
      <BeersFilters
        filters={filters}
        setFilters={setFilters}
        onSearchClick={handleSearchClick}
      />

      {!getBeersQuery.isError &&
        (getBeersQuery.isLoading || getBeersQuery.isFetching) && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress sx={{ height: "2px" }} />
          </Box>
        )}

      <StyledBeerList>
        {getBeersQuery.isError && <BeerCardError />}

        {!getBeersQuery.error &&
          !getBeersQuery.isLoading &&
          getBeersQuery.data?.length === 0 && <BeerCardWarning />}

        {!getBeersQuery.error &&
          !getBeersQuery.isLoading &&
          getBeersQuery.data && (
            <motion.div
              initial="initial"
              animate="animate"
              variants={leftVariants}
            >
              {getBeersQuery.data.map((beer) => (
                <LiteBeerCard beer={beer} key={`beer${beer.id}`} />
              ))}
            </motion.div>
          )}
      </StyledBeerList>
    </StyledBeerListContainer>
  );
};

export default BeerListContainer;
