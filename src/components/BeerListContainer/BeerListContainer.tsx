import styled from "@emotion/styled";
import { Box, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FC, useCallback } from "react";
import useBeerListTemplateVisibility from "../../hooks/useBeerListTemplateVisibility";
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

  const { isLoadingVisible, isWarningVisible, isListVisible } =
    useBeerListTemplateVisibility(getBeersQuery);

  const handleSearchClick = useCallback(() => getBeersQuery.refetch(), []);

  return (
    <StyledBeerListContainer
      component={motion.div}
      initial="initial"
      animate="animate"
      variants={downVariants}
    >
      <Typography variant="h4">Search</Typography>
      <BeersFilters
        filters={filters}
        isQueryLoading={getBeersQuery.isLoading}
        setFilters={setFilters}
        onSearchClick={handleSearchClick}
      />

      {isLoadingVisible && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress sx={{ height: "2px" }} data-testid="search-loading" />
        </Box>
      )}

      <StyledBeerList>
        {getBeersQuery.isError && <BeerCardError />}

        {isWarningVisible && <BeerCardWarning />}

        {isListVisible && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={leftVariants}
          >
            {getBeersQuery?.data?.map((beer) => (
              <LiteBeerCard beer={beer} key={`beer${beer.id}`} />
            ))}
          </motion.div>
        )}
      </StyledBeerList>
    </StyledBeerListContainer>
  );
};

export default BeerListContainer;
