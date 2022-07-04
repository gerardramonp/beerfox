import { Box, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { FC } from "react";
import { useWindowSize } from "react-use";
import { opacityVariants } from "../../ui/FramerMotionVariants";
import { BREAKPOINT_SM } from "../../ui/themeOptions";
import { StyledBeerBody, StyledBeerInfoContainer } from "./BeerCardSC";

const BeerCardSkeleton: FC = () => {
  const { width } = useWindowSize();

  return (
    <StyledBeerInfoContainer
      component={motion.div}
      // @ts-ignore --> This is cause TS does not recognise motion.div props in a MUI component
      animate="animate"
      initial="initial"
      variants={opacityVariants}
    >
      <Skeleton
        width={width < BREAKPOINT_SM ? "100%" : "50%"}
        variant="text"
        animation="wave"
        sx={{
          marginBottom: width < BREAKPOINT_SM ? "1rem" : "2rem",
        }}
        data-testid="beer-name-loading-skeleton"
      />
      <StyledBeerBody>
        <Skeleton
          height="188px"
          width={width < BREAKPOINT_SM ? "100%" : "300px"}
          variant="rectangular"
          animation="wave"
          sx={{ marginBottom: "1rem" }}
        />
        <Box
          sx={{
            width: "100%",
            padding: width < BREAKPOINT_SM ? 0 : "0 1.5rem 0 3rem",
          }}
        >
          <Skeleton variant="text" animation="wave" width="100%" />
          <Skeleton variant="text" animation="wave" width="100%" />
          <Skeleton variant="text" animation="wave" width="100%" />
        </Box>
      </StyledBeerBody>
    </StyledBeerInfoContainer>
  );
};

export default BeerCardSkeleton;
